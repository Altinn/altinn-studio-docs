---
title: eFormidling service task
tags: [altinn-apps, process, bpmn, task, service task, eformidling, systemoppgave]
weight: 15
---

A service task for sending instance data via eFormidling is included with the app by default and can be added as a step in the process to be used.

{{<notice warning>}}
Previously, this functionality was not in a service task but was built into the general code for changing process steps. If your app was set up before version 8.9, you should disable the functionality running outside the process definition by removing the configuration in applicationMetadata.json and appsettings.json.
{{</notice>}}

## Prerequisites

Before setting up eFormidling, you must have the following in place:

{{% expandlarge id="maskinporten-integration-setup" header="Maskinporten integration" %}}

To enable eFormidling in your application, you must [set up an integration between your app and Maskinporten](/en/altinn-studio/v8/guides/integration/maskinporten/).

* The application automatically includes the built-in `IMaskinportenClient`. If you need custom configuration, you can use:
{{< code-title >}}
  App/Program.cs
{{< /code-title >}}

  ```csharp {hl_lines=[3,4]}
  void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
  {
    // Optional: Only necessary if you use a non-standard configuration path
    services.ConfigureMaskinportenClient("CustomMaskinportenSettingsPath");
  }
  ```

{{% /expandlarge %}}

{{% expandlarge id="event-subscription-setup" header="Event subscription" %}}

An [event subscription]( {{< relref "/altinn-studio/v8/reference/logic/events/subscribing/" >}}) must be set up to ensure that the application knows the delivery status of messages sent via eFormidling.

* Add a new secret `EventSubscription--SecretCode` in Azure key vault or create your own implementation of `IEventSecretCodeProvider`. You determine the value of the secret.

* In `Program.cs`, add the following to `RegisterCustomAppServices`:

```csharp  {hl_lines=[6,7,8]}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // Optional: Only necessary if you use a non-standard configuration path
  services.ConfigureMaskinportenClient("CustomMaskinportenSettingsPath");

  // Configure HTTP client for Events API with Maskinporten authorization
  services.AddHttpClient<IEventsSubscription, EventsSubscriptionClient>()
    .UseMaskinportenAltinnAuthorization("altinn:serviceowner/instances.read");
}
```
{{% /expandlarge %}}
***

## Setting up eFormidling in your application {#eFormidling-setup}

### Register eFormidling services {#eFormidling-setup-program}
To add support for eFormidling in your application, you must register the services by adding the following to the `RegisterCustomAppServices` method in `Program.cs`:

{{< code-title >}}
  App/Program.cs
{{< /code-title >}}

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  services.AddEFormidlingServices2<EFormidlingMetadata, EFormidlingReceivers>(config);
}
```

### Add eFormidling as a service task in your application's workflow {#eFormidling-setup-appsettings}
Integration with eFormidling is added to the workflow as a service task.
Remember that the task must have an incoming and an outgoing sequence flow.

**Note:** In the future, it will be possible to drag in eFormidling directly via the Workflow editor in Altinn Studio, but this functionality is unfortunately not yet available.

For now, the following procedure is recommended:
1. Drag in a regular data task in the Workflow editor
2. Share the changes in Studio
3. Manually edit `process.bpmn` on your own machine
4. Convert the data task to a `bpmn:serviceTask` (see example below)

This ensures that sequence flows and the diagram are correct.

{{< code-title >}}
  App/config/process.bpmn
{{< /code-title >}}

```xml
<bpmn:serviceTask id="Task_eFormidling" name="eFormidling">
  <bpmn:extensionElements>
      <altinn:taskExtension>
          <altinn:taskType>eFormidling</altinn:taskType>
          <altinn:eFormidlingConfig>
              <altinn:disabled env="local">true</altinn:disabled> <!-- Prevents it from running in local development environment. -->
              <altinn:receiver>991825827</altinn:receiver>
              <altinn:process>urn:no:difi:profile:arkivmelding:administrasjon:ver1.0</altinn:process>
              <altinn:standard>urn:no:difi:arkivmelding:xsd::arkivmelding</altinn:standard>
              <altinn:typeVersion>2.0</altinn:typeVersion>
              <altinn:type>arkivmelding</altinn:type>
              <altinn:securityLevel>3</altinn:securityLevel>
              <altinn:dpfShipmentType>digital</altinn:dpfShipmentType>
              <altinn:dataTypes>
                  <altinn:dataType>ref-data-as-pdf</altinn:dataType>
              </altinn:dataTypes>
          </altinn:eFormidlingConfig>
      </altinn:taskExtension>
  </bpmn:extensionElements>
  <bpmn:incoming>Flow_1uewkmg</bpmn:incoming>
  <bpmn:outgoing>Flow_0c1ure8</bpmn:outgoing>
</bpmn:serviceTask>
```

| **Property**     | **Type** | **Description**                                                                                                                                                                                                                                            |
|------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| receiver         | string   | Recipient's organization number (can be omitted). Only Norwegian organizations are supported.                                                                                                                                                              |
| process          | string   | Process type. See https://platform.altinn.no/eformidling/api/capabilities/{orgnumber}                                                                                                                                                                     |
| standard         | string   | Document standard                                                                                                                                                                                                                                          |
| typeVersion      | string   | Version of the message type                                                                                                                                                                                                                                |
| type             | string   | Document type, which can be found within the pages describing each <a href="https://docs.digdir.no/docs/eFormidling/Utvikling/Dokumenttyper/" target="_blank" rel="noopener noreferrer">document type</a> or here: https://platform.altinn.no/eformidling/api/capabilities/{orgnumber} |
| securityLevel    | number   | Security level to be set on the _StandardBusinessDocument_                                                                                                                                                                                                 |
| dpfShipmentType  | string   | DPF shipment type used for routing in the recipient system                                                                                                                                                                                                 |
| dataTypes        | array    | List of data types to be included in the shipment. Each dataType is added as `<altinn:dataType>ref-data-as-pdf</altinn:dataType>`                                                                                                                        |

### Generating message metadata in the application {#eFormidling-setup-eFormidlingMetadata}
It is the application developer's responsibility to create the message for the shipment sent via eFormidling.


To create the shipment message, you need a class that implements the `IEFormidlingMetadata` interface and creates your message in the `GenerateEFormidlingMetadata` method. Remember to register your class in [`Program.cs`](#eFormidling-setup-program).

You must replace `YourMessageType` and `yourMessage` with your shipment message type.

{{< code-title >}}
App/logic/EFormidling/EFormidlingMetadata.cs
{{< /code-title >}}

```cs
public class EFormidlingMetadata : IEFormidlingMetadata
{
  public async Task<(string MetadataFilename, Stream Metadata)> GenerateEFormidlingMetadata(Instance instance)
  {
      YourMessageType yourMessage = new YourMessageType();

      MemoryStream stream = new MemoryStream();
      XmlSerializer serializer = new XmlSerializer(typeof(YourMessageType));
      serializer.Serialize(stream, yourMessage);
      stream.Position = 0;
      StreamContent streamContent = new StreamContent(stream);
      streamContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/xml");

      return await Task.FromResult(("yourMessage.xml", stream));
  }
}
```

The following example shows a setup of an `EFormidlingMetadata` class with the message type `arkivmelding`.

For this example to work, we have created a class <a download href="Arkivmelding.cs" filename="Arkivmelding.cs">`Arkivmelding`</a> (based on <a href="https://github.com/felleslosninger/docs/blob/gh-pages/resources/arkivmelding/arkivmelding.xsd" target="_blank" rel="noopener noreferrer">arkivmelding.xsd</a>). Note that this only includes the **required** parts of the arkivmelding, so if you want to include other parts, you must do so yourself.
{{< code-title >}}
App/logic/EFormidling/EFormidlingMetadata.cs
{{< /code-title >}}

```cs
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Altinn.App.Core.EFormidling.Interface;
using Altinn.App.Core.Internal.App;
using Altinn.App.Core.Models;
using Altinn.App.Models.Arkivmelding;
using Altinn.Platform.Storage.Interface.Models;
using Microsoft.Extensions.Logging;

namespace Altinn.App.logic.EFormidling;

public class EFormidlingMetadata : IEFormidlingMetadata
{
    private readonly ApplicationMetadata _applicationMetadata;
    private readonly ILogger<EFormidlingMetadata> _logger;
    private readonly string _documentCreator = "Digitaliseringsdirektoratet";

    public EFormidlingMetadata(IAppMetadata appMetadata, ILogger<EFormidlingMetadata> logger)
    {
        _applicationMetadata = appMetadata.GetApplicationMetadata().Result;
        _logger = logger;
    }

    public async Task<(string MetadataFilename, Stream Metadata)> GenerateEFormidlingMetadata(Instance instance)
    {
        string title = $"{_applicationMetadata.Title["nb"]}";
        Guid mappeSystemID = Guid.NewGuid();

        List<Dokumentbeskrivelse> dokumentbeskrivelse = new List<Dokumentbeskrivelse>();

        int documentNumber = 1;
        DataElement pdf = instance.Data.First(dataElement => dataElement.DataType == "ref-data-as-pdf");
        dokumentbeskrivelse.Add(GetDokumentbeskrivelse(pdf.Filename, documentNumber, "Hoveddokument"));

        List<DataElement> attachments = new List<DataElement>(instance.Data.FindAll(dataElement => dataElement.DataType == "attachments"));

        foreach (DataElement attachment in attachments)
        {
            documentNumber += 1;
            dokumentbeskrivelse.Add(GetDokumentbeskrivelse(attachment.Filename, documentNumber, "Vedlegg"));
        }

        Arkivmelding arkivmelding = new()
        {
            System = "Altinn",
            MeldingId = Guid.NewGuid().ToString(),
            Tidspunkt = DateTime.Now,
            AntallFiler = documentNumber,
            Mappe = new List<Mappe> {
                new Mappe {
                    Type = "saksmappe",
                    SystemID = mappeSystemID,
                    Tittel = title,
                    OpprettetDato = DateTime.Now,
                    OpprettetAv = _documentCreator,
                    Basisregistrering = new Basisregistrering
                    {
                        Type = "journalpost",
                        SystemID = Guid.NewGuid(),
                        OpprettetDato = DateTime.Now,
                        OpprettetAv = _documentCreator,
                        ReferanseForelderMappe = mappeSystemID,
                        Dokumentbeskrivelse = dokumentbeskrivelse,
                        Tittel = title,
                        OffentligTittel = title,
                        Journalposttype = "Utgående dokument",
                        Journalstatus = "Journalført",
                        Journaldato = DateTime.Now,
                    },
                    Saksdato = DateTime.Now,
                    AdministrativEnhet = _documentCreator,
                    Saksansvarlig = "Ingen",
                    Saksstatus = "Under behandling"
                }
            }
        };

        MemoryStream stream = new MemoryStream();
        XmlSerializer serializer = new XmlSerializer(typeof(Arkivmelding));
        serializer.Serialize(stream, arkivmelding);
        stream.Position = 0;
        StreamContent streamContent = new StreamContent(stream);
        streamContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/xml");

        return await Task.FromResult(("arkivmelding.xml", stream));
    }

    private Dokumentbeskrivelse GetDokumentbeskrivelse(string fileName, int documentNumber, string tilknyttetRegistreringSom)
    {
        return new Dokumentbeskrivelse
        {
            SystemID = Guid.NewGuid(),
            Dokumenttype = "Skjema",
            Dokumentstatus = "Dokumentet er ferdigstilt",
            Tittel = fileName,
            OpprettetDato = DateTime.Now,
            OpprettetAv = _documentCreator,
            TilknyttetRegistreringSom = tilknyttetRegistreringSom,
            Dokumentnummer = documentNumber,
            TilknyttetDato = DateTime.Now,
            TilknyttetAv = _documentCreator,
            Dokumentobjekt = new Dokumentobjekt
            {
                Versjonsnummer = 1,
                Variantformat = "Produksjonsformat",
                OpprettetDato = DateTime.Now,
                OpprettetAv = _documentCreator,
                ReferanseDokumentfil = fileName,
            },
        };
    }
}
```

### Dynamically setting the shipment recipient {#eFormidling-setup-eFormidlingReceivers}

The recipient can be set in two ways:
- Statically via `<altinn:receiver>` in the BPMN configuration (see [table above](#eFormidling-setup-appsettings))
- Dynamically by implementing the `IEFormidlingReceivers` interface

If the recipient of a shipment must be set dynamically, a class implementing the `IEFormidlingReceivers` interface must be created and registered in [`Program.cs`](#eFormidling-setup-program).

{{< code-title >}}
App/logic/EFormidling/EFormidlingReceivers.cs
{{< /code-title >}}

```cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Core.EFormidling.Interface;
using Altinn.Common.EFormidlingClient.Models.SBD;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.logic.EFormidling;

public class EFormidlingReceivers : IEFormidlingReceivers
{
    public async Task<List<Receiver>> GetEFormidlingReceivers(Instance instance)
    {
        Identifier identifier = new()
        {
            Authority = "iso6523-actorid-upis",
            // All Norwegian organisations need a prefix of '0192:'
            Value = "0192:{organisationNumber}"
        };

        List<Receiver> receiverList = [new Receiver { Identifier = identifier }];

        return await Task.FromResult(receiverList);
    }
}
```

**Note:** Only Norwegian organizations are supported, and the prefix `0192:` is required before the organization number.

### Adding a feedback task to the application process {#eFormidling-setup-process}
Although not strictly necessary, it is recommended to add a [feedback task](/en/altinn-studio/v8/reference/process/tasks/#feedback-task) to your application. This is to ensure that the process moves forward when the message has been received.
No further changes are necessary once the task has been added, as the eFormidling service we added earlier will automatically move the process forward.
If you want to customize the texts presented to the user at this stage, you can do so by overriding the [text keys](/en/altinn-studio/v8/reference/configuration/process/customize/#feedback)

### Ensuring unique filenames {#eFormidling-setup-filenames}
Filenames of attachments sent via eFormidling must be unique. The integration contains logic to guarantee this and may change the filenames slightly before the files are sent.

## Testing
Thorough testing of the eFormidling integration in an application is recommended.
Security measures and retry mechanisms are in place to ensure that a shipment reaches the recipient when errors are due to weak network connections.
However, invalid shipments, including but not limited to missing attachments or errors in the `"arkivmelding"`, will cause the shipment to fail without explicit notification to the end user or app owner.

### Local
{{%notice warning%}}
Currently, it is **not** possible to test the eFormidling integration locally as <a href="https://github.com/felleslosninger/efm-mocks" target="_blank" rel="noopener noreferrer">efm-mocks</a>, which is necessary for local testing, is under renovation.
{{% /notice%}}

### Test environment (TT02)
You can monitor the status of a shipment sent in the test environment via the endpoint below.
```http
https://platform.tt02.altinn.no/eformidling/api/conversations?messageId={instanceGuid}
```
