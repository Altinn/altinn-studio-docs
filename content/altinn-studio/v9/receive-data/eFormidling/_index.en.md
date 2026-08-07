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

Before you set up eFormidling, you need to configure [Maskinporten integration](#maskinporten-integration).

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

**Note:** Altinn only supports the DPF and DPO shipment types.

The app checks its eFormidling configuration when it starts, not when the first instance reaches the task, and reports every problem it finds at once. The app refuses to start if an eFormidling task has no `<altinn:eFormidlingConfig>` block, is missing a required setting for the environment being started, names a data type that is not defined in `applicationmetadata.json`, or is enabled without the eFormidling services having been [registered](#eFormidling-setup-program). A task that is turned off for the environment being started does not need the services, so an app that uses eFormidling only in production still starts locally.

#### Environment-specific values {#eFormidling-setup-env}

Every element in `<altinn:eFormidlingConfig>` supports the optional `env` attribute, not just `disabled`. You can repeat an element with different `env` values, and the value for the current hosting environment takes precedence over the value without `env`. The environment names are grouped into three environments: development (`development`, `dev`, `local`, `localtest`), test (`staging`, `test`, `at22`, `at23`, `at24`, `tt02`, `yt01`) and production (`production`, `prod`, `produksjon`).

For example, to send to a test receiver in TT02 and the real receiver in production:

```xml
<altinn:receiver env="staging">310075809</altinn:receiver>
<altinn:receiver>991825827</altinn:receiver>
```

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
  public async Task<(string MetadataFilename, Stream Metadata)> GenerateEFormidlingMetadata(IInstanceDataAccessor dataAccessor)
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
using Altinn.App.Core.Features;
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

    public async Task<(string MetadataFilename, Stream Metadata)> GenerateEFormidlingMetadata(IInstanceDataAccessor dataAccessor)
    {
        Instance instance = dataAccessor.Instance;
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
using Altinn.App.Core.Features;
using Altinn.Common.EFormidlingClient.Models.SBD;

namespace Altinn.App.logic.EFormidling;

public class EFormidlingReceivers : IEFormidlingReceivers
{
    public async Task<List<Receiver>> GetEFormidlingReceivers(IInstanceDataAccessor dataAccessor, string? receiverFromConfig)
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

`receiverFromConfig` carries the `<altinn:receiver>` value from the service task configuration, or `null` when the element is absent, so your implementation can fall back to the configured receiver rather than duplicating it. The default implementation does only that: it returns the configured receiver, and an empty list when there is none.

**Note:** Only Norwegian organisations are supported, and you must use the prefix `0192:` before the organisation number.
{{</content-version-container>}}
{{</content-version-selector>}}

### Wait for the delivery confirmation {#eFormidling-setup-process}
The service task is not finished when the shipment has been handed to the integrasjonspunkt. It is finished when the integrasjonspunkt confirms that the shipment has been delivered. The task sends, and then checks the delivery status itself — first after 15 seconds, then every minute, then every five minutes, and finally every quarter of an hour. The process moves on to the next step only once delivery is confirmed.

The task waits for about two and a half hours altogether. A shipment has a two-hour lifetime of its own, and the task deliberately waits a little longer than that, so a shipment that expires fails with the integrasjonspunkt's own verdict instead of a generic timeout.

The task fails if the shipment is rejected, or if the integrasjonspunkt reports that it has expired. That failure is not retried: the id of an eFormidling shipment is tied to the instance id, so the same shipment can never be sent again, and someone has to follow it up by hand. Either way, the last status the integrasjonspunkt reported is written to the instance as the data value `eFormidlingShipmentStatus`, so you can see what became of a shipment long after the process has moved on.

While the app waits, the end user sees the built-in processing page, which tells them that the app is working and that they do not need to do anything. After 30 seconds it adds that this is taking longer than usual and that the page can safely be closed and revisited later. The texts are text resources (`process_workflow.advancing_title`, `process_workflow.advancing_body` and `process_workflow.still_working`) that your app can override. The user is taken on to the next step automatically once the process advances.

{{% notice warning %}}
**Do not add a feedback task after the eFormidling task.** In v8 a feedback task was needed to hold the instance while delivery was pending, and a reminder built on Altinn Events moved the process past it once the shipment arrived. That reminder is gone in v9, because the service task now does the waiting itself. Nothing moves a feedback task behind the eFormidling task forward, so instances left there wait indefinitely. If you are upgrading an app from v8, remove it — `studioctl app upgrade v9` reports feedback tasks that sit behind a service task.
{{% /notice %}}

### Ensure unique filenames {#eFormidling-setup-filenames}
Filenames of attachments sent through eFormidling must be unique. The integration contains logic to guarantee this and may change the filenames slightly before the files are sent.

## Testing
We recommend thorough testing of the eFormidling integration in your app.
Safety measures and retry mechanisms are in place to ensure that a shipment reaches the receiver when errors are due to weak network connections.
An invalid shipment — a missing attachment, or a mistake in the `"arkivmelding"` — still makes the shipment fail, but in v9 that failure fails the service task as well, so it surfaces instead of passing unnoticed. The shipment cannot be sent again automatically, so it needs manual follow-up.

### Local testing
{{%notice warning%}}
You **cannot** currently test the eFormidling integration locally, as <a href="https://github.com/felleslosninger/efm-mocks" target="_blank" rel="noopener noreferrer">efm-mocks</a> (required for local testing) is being renovated. In the meantime, set `<altinn:disabled env="development">true</altinn:disabled>` on the service task so the process completes locally without attempting to send. If you leave eFormidling enabled locally, the send fails and the process stops on the service task with an error.
{{% /notice%}}

### Test environment (TT02)
You can monitor the status of a shipment sent in the test environment through the endpoint below.
```http
https://platform.tt02.altinn.no/eformidling/api/conversations?messageId={instanceGuid}
```
- `{instanceGuid}`: the GUID of the instance that has been archived.
