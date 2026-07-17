---
draft: true
title: eFormidling
description: Slik setter du opp eFormidling-integrasjon for appen din.
tags: [eFormidling, needsReview]
toc: true
weight: 50
---

I v9 er eFormidling en **systemoppgave**. Du legger den til som et steg i app-prosessen (`process.bpmn`), og all konfigurasjon for meldingen ligger på denne oppgaven. Det finnes ikke lenger noen eFormidling-konfigurasjon i `applicationmetadata.json` eller `appsettings.json`.

## Forutsetninger

Før du setter opp eFormidling må du konfigurere:
  * [Maskinporten-integrasjon](#maskinporten-integrasjon)
  * [Hendelser](#hendelser)

### Maskinporten-integrasjon

For å aktivere eFormidling i appen din, må du [sette opp integrasjon mellom appen og Maskinporten](/nb/altinn-studio/v9/develop-a-service/integration/maskinporten/).

* **Merk:** Appen inkluderer automatisk den innebygde `IMaskinportenClient`. Hvis du trenger egendefinert konfigurasjon, kan du bruke:

  {{< code-title >}}
    App/Program.cs
  {{< /code-title >}}
  ```csharp {hl_lines=[3,4]}
  void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
  {
    // Valgfritt: Kun nødvendig hvis du bruker ikke-standard konfigurasjonsbane
    services.ConfigureMaskinportenClient("CustomMaskinportenSettingsPath");
  }
  ```

### Hendelser

Du må sette opp et [hendelsesabonnement](/nb/altinn-studio/v8/reference/logic/events/subscribing/) slik at appen din får vite leveringsstatusen til meldinger som sendes gjennom eFormidling.

{{% expandlarge id="event-subscription-setup" header="Sette opp hendelsesabonnement" %}}

* Legg til en ny hemmelighet `EventSubscription--SecretCode` i Azure Key Vault.
* Opprett en ny `.cs`-fil og legg til følgende kode:
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
* I `Program.cs`, legg til følgende i `RegisterCustomAppServices`:
{{< code-title >}}
  App/Program.cs
{{< /code-title >}}

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  services.AddSingleton<IEventSecretCodeProvider, EventSecretCodeProvider>();

  // Konfigurer HTTP-klient for Events API med Maskinporten-autorisasjon
  services.AddHttpClient<IEventsSubscription, EventsSubscriptionClient>()
    .UseMaskinportenAltinnAuthorization("altinn:serviceowner/instances.read");
}
```
{{% /expandlarge %}}

## Sette opp eFormidling i appen {#eFormidling-oppsett}

### Registrere eFormidling-tjenester {#eFormidling-oppsett-program}
For å legge til eFormidling-støtte i appen din, må du registrere tjenestene ved å legge til følgende i `RegisterCustomAppServices`-metoden i `Program.cs`:

{{< code-title >}}
  App/Program.cs
{{< /code-title >}}

```cs{hl_lines=[3]}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  services.AddEFormidlingServices2<EFormidlingMetadata, EFormidlingReceivers>(config);
}
```

### Legge til eFormidling som en systemoppgave {#eFormidling-oppsett-servicetask}
eFormidling legges til i prosessen som en systemoppgave, og meldingen sendes når prosessen når denne oppgaven. Plasser oppgaven der du vil at meldingen skal sendes, vanligvis etter oppgaven som produserer dataene du vil sende. Oppgaven må ha en innkommende og en utgående sekvensflyt.

**Merk:** Du kan ennå ikke dra en eFormidling-oppgave direkte inn i Arbeidsflyt-editoren i Altinn Studio. Inntil videre anbefaler vi denne fremgangsmåten:

1. Dra en vanlig dataoppgave inn i Arbeidsflyt-editoren.
2. Del endringene i Studio.
3. Rediger `process.bpmn` på din egen maskin.
4. Gjør dataoppgaven om til en `bpmn:serviceTask` (se eksemplet nedenfor).

Slik sikrer du at sekvensflytene og diagrammet holder seg korrekte.

{{< code-title >}}
  App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:serviceTask id="Task_eFormidling" name="eFormidling">
  <bpmn:extensionElements>
      <altinn:taskExtension>
          <altinn:taskType>eFormidling</altinn:taskType>
          <altinn:eFormidlingConfig>
              <altinn:disabled env="development">true</altinn:disabled> <!-- Hindrer at meldingen sendes under lokal utvikling. -->
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

| **Egenskap**    | **Type** | **Påkrevd** | **Beskrivelse**                                                                                                                                                                                                                                            |
|-----------------|----------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| disabled        | boolean  | Nei         | Slår av meldingen uten å fjerne konfigurasjonen. Bruk det valgfrie attributtet `env` for å slå den av kun i bestemte driftsmiljøer (for eksempel `env="development"` for å hoppe over sending under lokal utvikling). Utelat elementet for å aktivere den overalt. |
| receiver        | string   | Nei         | Organisasjonsnummer til mottaker. Kun norske organisasjoner støttes.                                                                                                                                                                       |
| process         | string   | Ja          | Prosesstype. Se `https://platform.altinn.no/eformidling/api/capabilities/{orgnummer}`                                                                                                                                                                     |
| standard        | string   | Ja          | Dokumentstandarden                                                                                                                                                                                                                                        |
| typeVersion     | string   | Ja          | Versjon av meldingstypen                                                                                                                                                                                                                                  |
| type            | string   | Ja          | Dokumenttypen, som du finner på sidene som beskriver hver <a href="https://docs.digdir.no/docs/eFormidling/Utvikling/Dokumenttyper/" target="_blank" rel="noopener noreferrer">dokumenttype</a> eller på `https://platform.altinn.no/eformidling/api/capabilities/{orgnummer}` |
| securityLevel   | number   | Ja          | Sikkerhetsnivå som skal settes på _StandardBusinessDocument_                                                                                                                                                                                               |
| dpfShipmentType | string   | Nei         | DPF-forsendelsestype som brukes til ruting i mottakersystemet                                                                                                                                                                                             |
| dataTypes       | array    | Nei         | Liste over datatyper som skal inkluderes i meldingen. Hver datatype legges til som sitt eget element `<altinn:dataType>ref-data-as-pdf</altinn:dataType>`.                                                                                                 |

**Merk:** Altinn støtter kun forsendelsestypene DPF og DPO. Mangler en påkrevd egenskap, stopper systemoppgaven med en konfigurasjonsfeil når prosessen når den.

### Generere meldingsmetadata {#eFormidling-oppsett-eFormidlingMetadata}
Du lager selv meldingen som sendes gjennom eFormidling.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Kode/Syntaks">}}

For å lage meldingen, trenger du en klasse som implementerer `IEFormidlingMetadata`-grensesnittet og lager meldingen din i `GenerateEFormidlingMetadata`-metoden. Husk å registrere klassen din i [`Program.cs`](#eFormidling-oppsett-program).

Du må erstatte `YourMessageType` og `yourMessage` med meldingstypen din.

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

{{<content-version-container version-label="Eksempel">}}
Følgende eksempel viser hvordan du setter opp en `EFormidlingMetadata`-klasse med meldingstypen `arkivmelding`.

For at dette eksemplet skal fungere, har vi opprettet en klasse <a download href="Arkivmelding.cs" filename="Arkivmelding.cs">`Arkivmelding`</a> (basert på <a href="https://github.com/felleslosninger/docs/blob/gh-pages/resources/arkivmelding/arkivmelding.xsd" target="_blank" rel="noopener noreferrer">arkivmelding.xsd</a>). Dette inkluderer kun de **påkrevde** delene av arkivmeldingen. Hvis du vil inkludere andre deler, må du legge dem til selv.
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

### Sette meldingsmottaker dynamisk {#eFormidling-oppsett-eFormidlingReceivers}

Du kan sette mottakeren på to måter:
- Statisk gjennom `<altinn:receiver>` i BPMN-konfigurasjonen (se [tabellen ovenfor](#eFormidling-oppsett-servicetask)).
- Dynamisk ved å implementere `IEFormidlingReceivers`-grensesnittet.

Hvis du må sette mottakeren dynamisk, må du lage en klasse som implementerer `IEFormidlingReceivers`-grensesnittet og registrere den i [`Program.cs`](#eFormidling-oppsett-program).

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Kode/Syntaks">}}
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
            // Alle norske organisasjoner må ha prefikset '0192:'
            Value = "0192:{organisasjonsnummer}"
        };

        List<Receiver> receiverList = [new Receiver { Identifier = identifier }];

        return await Task.FromResult(receiverList);
    }
}
```

**Merk:** Kun norske organisasjoner støttes, og du må bruke prefikset `0192:` før organisasjonsnummeret.
{{</content-version-container>}}
{{</content-version-selector>}}

### Legge til tilbakemeldingsoppgave {#eFormidling-oppsett-process}
Vi anbefaler at du legger til en [tilbakemeldingsoppgave](/nb/altinn-studio/v9/develop-a-service/reference/process/tasks/#feedback-task) i app-prosessen din. Dette sikrer at prosessen fortsetter når meldingen er mottatt.
Ingen ytterligere endringer er nødvendige når du har lagt til oppgaven, siden eFormidling-tjenesten automatisk flytter prosessen videre.
Hvis du vil tilpasse tekstene som vises til brukeren i dette steget, kan du overstyre [tekstnøklene](/nb/altinn-studio/v9/develop-a-service/reference/configuration/process/customize/#feedback).

### Sikre unike filnavn {#eFormidling-oppsett-filenames}
Filnavnene på vedlegg som sendes gjennom eFormidling må være unike. Integrasjonen inneholder logikk som sikrer dette, og kan endre filnavnene litt før filene sendes.

## Testing
Test eFormidling-integrasjonen i appen din grundig.
Sikkerhetstiltak og mekanismer for nye forsøk er på plass for å sikre at en melding når mottakeren når feil skyldes svake nettverksforbindelser.
Ugyldige meldinger (inkludert manglende vedlegg eller feil i `"arkivmelding"`) vil imidlertid føre til at meldingen feiler uten advarsel til sluttbrukeren eller tjenesteeieren.

### Lokal testing
{{%notice warning%}}
For øyeblikket kan du ikke teste eFormidling-integrasjonen lokalt. Det er fordi vi renoverer <a href="https://github.com/felleslosninger/efm-mocks" target="_blank" rel="noopener noreferrer">efm-mocks</a> (nødvendig for lokal testing). Sett i mellomtiden `<altinn:disabled env="development">true</altinn:disabled>` på systemoppgaven, slik at prosessen fullfører lokalt uten å forsøke å sende.
{{% /notice%}}

### Testmiljø (TT02)
Du kan overvåke statusen til en melding som er sendt i testmiljøet gjennom endepunktet nedenfor.
```http
https://platform.tt02.altinn.no/eformidling/api/conversations?messageId={instanceGuid}
```
- `{instanceGuid}`: GUID-en til instansen som er arkivert.
