---
title: eFormidling legacy
description: How to configure integration with eFormidling for an app.
tags: [eFormidling]
toc: true
weight: 15
---

{{%notice info%}}
This page describes the setup for a **v8** Altinn Application, for prior versions please refer to [the eFormidling setup for v7 documentation]( {{< relref "/altinn-studio/v8/reference/configuration/eformidling/">}}).
If you are using version **v8.9** or above, you can run eFormidling as a [service task](/en/altinn-studio/v8/guides/development/eformidling/service-task/) instead, which better fits into the future architecture of altinn apps.
{{% /notice%}}

In addition to the documentation below, we have created a [sample application](https://altinn.studio/repos/ttd/eformidling-sample-app) showing the complete eFormidling setup.

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

## Setup eFormidling in your application {#eFormidling-setup}

### Register eFormidling Services {#eFormidling-setup-program}
In order to add support for eFormidling in your application you need to register its services by adding the following to the `RegisterCustomAppServices`-method in `Program.cs`:

{{< code-title >}}
  App/Program.cs
{{< /code-title >}}

```cs{hl_lines=[3]}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  services.AddEFormidlingServices2<EFormidlingMetadata, EFormidlingReceivers>(config);
}
```

### Configuring Shipment Metadata {#eFormidling-setup-applicationmetadata}
Metadata related to the eFormidling shipment is required, and this is set up in `applicationmetadata.json`.  

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Properties">}}
In order to setup the required metadata you will need to create a new section `"eFormidling"` in `applicationmetadata.json` and populate values for the 
parameters defined below.

|      **Property**          |      **Type**     |      **Description**                                                                                              |
|------------------------|---------------|---------------------------------------------------------------------------------------------------------------|
|     serviceId **\***           |     string    |     ID that specifies the shipment type. (DPO, DPV, DPI or DPF)                                                |
|     dpfShipmentType    |     string    |     The DPF shipment type used for routing in the receiving system                                          |
|     receiver           |     string    |     Organisation number of the receiver (can be omitted). Only Norwegian organisations are supported.        |
|     sendAfterTaskId    |     string    |     ID of the task to be completed before the shipment is sent.   |
|     process **\*\***          |     string    |     Process type                                                                                              |
|     standard **\*\*\***         |     string    |     The document standard                                |
|     typeVersion        |     string    |     Version of the message type                                                                               |
|     type **\*\*\***             |     string    |     The document type                                                                 |
|     securityLevel **\*\*\***       |     number    |     Security level to be set on the _StandardBusinessDocument_                                              |
|     dataTypes          |     array     |     List of data types to include in the shipment                                                            |

**\*** Altinn only supports DPF and DPO.

**\*\*** Available processes for each receiver can be found at:
```http
https://platform.altinn.no/eformidling/api/capabilities/{orgnumber}
```

**\*\*\*** Can be found within the pages describing each <a href="https://docs.digdir.no/docs/eFormidling/Utvikling/Dokumenttyper/" target="_blank" rel="noopener noreferrer">document type</a> or using the URL above.

{{</content-version-container>}}
{{<content-version-container version-label="Example">}}
Below is an example of the configuration for the message type `arkivmelding`.
{{< code-title >}}
  App/applicationmetadata.json
{{< /code-title >}}

```json
{
...
 "eFormidling": {
   "serviceId": "DPO",
   "receiver": "991825827",
   "sendAfterTaskId": "Task_1",
   "process": "urn:no:difi:profile:arkivmelding:administrasjon:ver1.0",
   "standard": "urn:no:difi:arkivmelding:xsd::arkivmelding",
   "typeVersion": "2.0",
   "type": "arkivmelding",
  "securityLevel": 3,
   "dataTypes": [
    "ref-data-as-pdf"
   ]
  },
...
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

### Activate eFormidling Integration in your application  {#eFormidling-setup-appsettings}
Integration with eFormidling needs to be explicitly activated in the application.  
In `appsettings.json` you need to enable eFormidling in the `"AppSettings"`-section as well as add a new section `"EFormidlingClientSettings"`:

{{< code-title >}}
  App/appsettings.json
{{< /code-title >}}

```json {hl_lines=[5,"7-9"]} 
{
  ...
  "AppSettings": {
    ...
    "EnableEFormidling": true
  },
  "EFormidlingClientSettings": {
    "BaseUrl": "http://localhost:9093/api/"
  }
}
```
If you do not wish to test the eFormidling integration locally, you can add an `"AppSettings"`-section to `appsettings.Development.json` and set `"EnableEFormidling"` to `false`.

### Message Metadata Generation in the application {#eFormidling-setup-eFormidlingMetadata}
It is the application developer's responsibility to create the message of the shipment sent through eFormidling.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Code/Syntax">}}

In order to create the shipment message you will need a class that implements the `IEFormidlingMetadata`-interface and create your message in the `GenerateEFormidlingMetadata`-method. Remember to register your class in [`Program.cs`](#eFormidling-setup-program).

You will need to replace `YourMessageType` and `yourMessage` with your shipment message type.

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
The following example shows a setup of an `EFormidlingMetadata`-class with the `arkivmelding` message type.

In order for this example to work we have created a class <a download href="Arkivmelding.cs" filename="Arkivmelding.cs">`Arkivmelding`</a> (based on <a href="https://github.com/felleslosninger/docs/blob/gh-pages/resources/arkivmelding/arkivmelding.xsd" target="_blank" rel="noopener noreferrer">arkivmelding.xsd</a>). Bear in mind that this only includes the **required** parts of the arkivmelding, so if you wish to include other parts you must do so yourself.
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

### Dynamically setting the shipment receiver {#eFormidling-setup-eFormidlingReceivers}

If the receiver of a shipment needs to be set dynamically, a class implementing the `IEFormidlingReceivers`-interface needs to be created and registered in [`Program.cs`](#eFormidling-setup-program).

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

**NB!** Note that only Norwegian organisations are supported, and that the prefix `0192:` is required before the organisation number.
{{</content-version-container>}}
{{</content-version-selector>}}

### Adding a feedback task to the application process {#eFormidling-setup-process}
While not strictly necessary, it is recommended to add a [feedback task](/en/altinn-studio/v8/reference/process/tasks/#feedback-task) to your application. This is to ensure that the process is moved along when the message has been received.  
No further changes are needed when the task has been added as the eFormidling service we added earlier will automatically move the process along.  
If you wish to customize the texts that are presented to the user during this step you can do so by overriding the [text keys](/en/altinn-studio/v8/reference/configuration/process/customize/#feedback)

### Ensuring unique filenames {#eFormidling-setup-filenames}
If the message sent by your application contains multiple attachments, it is important to ensure that these have unique filenames as the shipment will fail otherwise.  
If the message includes the generated PDF of the form, you need to check that the other filename(s) are not the same as the application name.  
One way to ensure unique filenames is through the use of [file validation](/en/altinn-studio/v8/reference/logic/validation/files/).

## Testing
Thorough testing for the eFormidling integration in an application is encouraged.  
Safety measures and retry mechanisms are in place to ensure that a shipment reaches the receiver when errors are due to weak network connections.  
However, invalid shipments, including but not limited to missing attachments or mistakes in the `"arkivmelding"`, will cause the shipment to fail without explicit warning to the end user or app owner.

### Local
{{%notice warning%}}
For the time being it is **not** possible to test the eFormidling integration locally as <a href="https://github.com/felleslosninger/efm-mocks" target="_blank" rel="noopener noreferrer">efm-mocks</a>, which is necessary for local testing, is under renovation.
{{% /notice%}}

### Test environment (TT02)
<!-- The following integration point exposes endpoints that allow you to monitor the status of a shipment in the test environment:
 -->You can monitor the status of a shipment sent in the test environment through the endpoint below.
```http
https://platform.tt02.altinn.no/eformidling/api/conversations?messageId={instanceGuid}
```
- `{instanceGuid}`: the GUID of the instance that has been archived.