---
draft: true
title: eFormidling
description: How to set up eFormidling integration for your app.
tags: [eFormidling]
toc: true
weight: 15
---

In v9, eFormidling is a **service task**. You add it as a step in the app's process (`process.bpmn`), and all shipment configuration lives on that task. There is no longer any eFormidling configuration in `applicationmetadata.json` or `appsettings.json`.

## Prerequisites

Before you set up eFormidling, you need to configure:
  * [Maskinporten integration](#maskinporten-integration)
  * [Events](#events)

### Maskinporten integration

To enable eFormidling in your app, you need to [set up integration between your app and Maskinporten](/en/altinn-studio/v9/develop-a-service/integration/maskinporten/).

* **Note:** The app automatically includes the built-in `IMaskinportenClient`. If you need custom configuration, you can use:

  {{< code-title >}}
    App/Program.cs
  {{< /code-title >}}
  ```csharp {hl_lines=[3,4]}
  void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
  {
    // Optional: Only needed if using non-default configuration path
    services.ConfigureMaskinportenClient("CustomMaskinportenSettingsPath");
  }
  ```

### Events

You need to set up an [event subscription](/en/altinn-studio/v8/reference/logic/events/subscribing/) so your app knows the delivery status of messages sent through eFormidling.

{{% expandlarge id="event-subscription-setup" header="Event subscription setup" %}}

* Add a new secret `EventSubscription--SecretCode` to Azure Key Vault.
* Create a new `.cs` file and add the following code:
{{< code-title >}}
  App/logic/Events/EventSecretCodeProvider.cs
{{< /code-title >}}

  ```csharp
  using Altinn.App.Core.Internal.Events;
  using System;
  using System.Threading.Tasks;
  using Altinn.App.Core.Internal.Secrets;

  namespace Altinn.App.logic.Events
  {
    public class EventSecretCodeProvider : IEventSecretCodeProvider
    {
      private readonly ISecretsClient _keyVaultClient;
      private string _secretCode = string.Empty;

      public EventSecretCodeProvider(ISecretsClient keyVaultClient)
      {
        _keyVaultClient = keyVaultClient;
      }

      public async Task<string> GetSecretCode()
      {
        if (!string.IsNullOrEmpty(_secretCode))
        {
          return _secretCode;
        }

        var secretKey = "EventSubscription--SecretCode";
        string secretCode = await _keyVaultClient.GetSecretAsync(secretKey);
        _secretCode = secretCode ?? throw new ArgumentException($"Unable to fetch event subscription secret code from Key Vault with the specified secret {secretKey}.");
        return _secretCode;
      }
    }
  }
  ```
* In `Program.cs`, add the following to `RegisterCustomAppServices`:
{{< code-title >}}
  App/Program.cs
{{< /code-title >}}

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  services.AddSingleton<IEventSecretCodeProvider, EventSecretCodeProvider>();

  // Configure HTTP client for Events API with Maskinporten authorisation
  services.AddHttpClient<IEventsSubscription, EventsSubscriptionClient>()
    .UseMaskinportenAltinnAuthorization("altinn:serviceowner/instances.read");
}
```
{{% /expandlarge %}}

## Set up eFormidling in your app {#eFormidling-setup}

### Register eFormidling services {#eFormidling-setup-program}
To add eFormidling support to your app, register its services by adding the following to the `RegisterCustomAppServices` method in `Program.cs`:

{{< code-title >}}
  App/Program.cs
{{< /code-title >}}

```cs{hl_lines=[3]}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  services.AddEFormidlingServices2<EFormidlingMetadata, EFormidlingReceivers>(config);
}
```

### Add eFormidling as a service task {#eFormidling-setup-servicetask}
eFormidling is added to the process as a service task, and the shipment is sent when the process reaches that task. Place the task where you want the shipment to be sent, typically after the task that produces the data you want to send. The task must have an incoming and an outgoing sequence flow.

**Note:** It is not yet possible to drag an eFormidling task directly into the Arbeidsflyt-editor in Altinn Studio. For now, the following procedure is recommended:

1. Drag a regular data task into the Arbeidsflyt-editor.
2. Share the changes in Studio.
3. Edit `process.bpmn` on your own machine.
4. Convert the data task to a `bpmn:serviceTask` (see the example below).

This ensures that the sequence flows and the diagram stay correct.

{{< code-title >}}
  App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:serviceTask id="Task_eFormidling" name="eFormidling">
  <bpmn:extensionElements>
      <altinn:taskExtension>
          <altinn:taskType>eFormidling</altinn:taskType>
          <altinn:eFormidlingConfig>
              <altinn:disabled env="development">true</altinn:disabled> <!-- Prevents the shipment from being sent during local development. -->
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

| **Property**    | **Type** | **Required** | **Description**                                                                                                                                                                                                                                            |
|-----------------|----------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| disabled        | boolean  | No           | Turns the shipment off without removing the configuration. Use the optional `env` attribute to disable it only in specific hosting environments (for example `env="development"` to skip sending during local development). Omit the element to enable it everywhere. |
| receiver        | string   | No           | Organisation number of the receiver. Only Norwegian organisations are supported.                                                                                                                                                          |
| process         | string   | Yes          | Process type. See `https://platform.altinn.no/eformidling/api/capabilities/{orgnumber}`                                                                                                                                                                    |
| standard        | string   | Yes          | The document standard                                                                                                                                                                                                                                      |
| typeVersion     | string   | Yes          | Version of the message type                                                                                                                                                                                                                                |
| type            | string   | Yes          | The document type, which you can find in the pages describing each <a href="https://docs.digdir.no/docs/eFormidling/Utvikling/Dokumenttyper/" target="_blank" rel="noopener noreferrer">document type</a> or at `https://platform.altinn.no/eformidling/api/capabilities/{orgnumber}` |
| securityLevel   | number   | Yes          | Security level to be set on the _StandardBusinessDocument_                                                                                                                                                                                                  |
| dpfShipmentType | string   | No           | The DPF shipment type used for routing in the receiving system                                                                                                                                                                                             |
| dataTypes       | array    | No           | List of data types to include in the shipment. Each data type is added as its own `<altinn:dataType>ref-data-as-pdf</altinn:dataType>` element.                                                                                                            |

**Note:** Altinn only supports the DPF and DPO shipment types. If a required property is missing, the service task stops with a configuration error when the process reaches it.

### Generate message metadata {#eFormidling-setup-eFormidlingMetadata}
You are responsible for creating the message for the shipment sent through eFormidling.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Code/Syntax">}}

To create the shipment message, you need a class that implements the `IEFormidlingMetadata` interface and creates your message in the `GenerateEFormidlingMetadata` method. Remember to register your class in [`Program.cs`](#eFormidling-setup-program).

You need to replace `YourMessageType` and `yourMessage` with your shipment message type.

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
{{</content-version-container>}}

{{<content-version-container version-label="Example">}}
The following example shows how to set up an `EFormidlingMetadata` class with the `arkivmelding` message type.

For this example to work, we have created a class <a download href="Arkivmelding.cs" filename="Arkivmelding.cs">`Arkivmelding`</a> (based on <a href="https://github.com/felleslosninger/docs/blob/gh-pages/resources/arkivmelding/arkivmelding.xsd" target="_blank" rel="noopener noreferrer">arkivmelding.xsd</a>). This only includes the **required** parts of the arkivmelding. If you want to include other parts, you must add them yourself.
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

{{</content-version-container>}}
{{</content-version-selector>}}

### Set the shipment receiver dynamically {#eFormidling-setup-eFormidlingReceivers}

You can set the receiver in two ways:
- Statically through `<altinn:receiver>` in the BPMN configuration (see the [table above](#eFormidling-setup-servicetask)).
- Dynamically by implementing the `IEFormidlingReceivers` interface.

If you need to set the receiver dynamically, create a class that implements the `IEFormidlingReceivers` interface and register it in [`Program.cs`](#eFormidling-setup-program).

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Code/Syntax">}}
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

**Note:** Only Norwegian organisations are supported, and you must use the prefix `0192:` before the organisation number.
{{</content-version-container>}}
{{</content-version-selector>}}

### Add a feedback task {#eFormidling-setup-process}
We recommend that you add a [feedback task](/en/altinn-studio/v9/develop-a-service/reference/process/tasks/#feedback-task) to your app process. This ensures that the process continues when the message has been received.
No further changes are needed once you have added the task, as the eFormidling service will automatically move the process forward.
If you want to customise the texts shown to the user during this step, you can override the [text keys](/nb/altinn-studio/v9/develop-a-service/reference/configuration/process/customize/#feedback) (documentation available in Norwegian only).

### Ensure unique filenames {#eFormidling-setup-filenames}
Filenames of attachments sent through eFormidling must be unique. The integration contains logic to guarantee this and may change the filenames slightly before the files are sent.

## Testing
We recommend thorough testing of the eFormidling integration in your app.
Safety measures and retry mechanisms are in place to ensure that a shipment reaches the receiver when errors are due to weak network connections.
However, invalid shipments (including missing attachments or mistakes in the `"arkivmelding"`) will cause the shipment to fail without warning to the end user or app owner.

### Local testing
{{%notice warning%}}
You **cannot** currently test the eFormidling integration locally, as <a href="https://github.com/felleslosninger/efm-mocks" target="_blank" rel="noopener noreferrer">efm-mocks</a> (required for local testing) is being renovated. In the meantime, set `<altinn:disabled env="development">true</altinn:disabled>` on the service task so the process completes locally without attempting to send.
{{% /notice%}}

### Test environment (TT02)
You can monitor the status of a shipment sent in the test environment through the endpoint below.
```http
https://platform.tt02.altinn.no/eformidling/api/conversations?messageId={instanceGuid}
```
- `{instanceGuid}`: the GUID of the instance that has been archived.
