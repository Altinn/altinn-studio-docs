---
title: eFormidling
description: Slik setter du opp eFormidling-integrasjon for appen din.
tags: [eFormidling, needsReview]
toc: true
weight: 15
---

Vi har laget en [eksempelapp](https://altinn.studio/repos/ttd/eformidling-sample-app) som viser det komplette eFormidling-oppsettet.

{{%notice info%}}
Denne siden beskriver oppsettet for en **v8** Altinn-app. For tidligere versjoner, se [eFormidling-oppsett for v7-dokumentasjonen](/nb/altinn-studio/v8/reference/configuration/eformidling/).
{{% /notice%}}

## Forutsetninger

Før du setter opp eFormidling må du konfigurere:
  * [Maskinporten-integrasjon](#maskinporten-integrasjon)
  * [Hendelser](#hendelser)

### Maskinporten-integrasjon

For å aktivere eFormidling i appen din, må du [sette opp integrasjon mellom appen og Maskinporten](/nb/altinn-studio/v8/guides/integration/maskinporten/).

* **Merk:** Appen inkluderer automatisk den innebygde `IMaskinportenClient`. Hvis du trenger tilpasset konfigurasjon, kan du bruke:

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

### Konfigurere metadata for meldingen {#eFormidling-oppsett-applicationmetadata}
Du må konfigurere metadata for meldingen i `applicationmetadata.json`.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Egenskaper">}}
For å sette opp nødvendig metadata, må du opprette en ny seksjon `"eFormidling"` i `applicationmetadata.json` og legge til verdier for parameterne som er definert nedenfor.

|      **Egenskap**          |      **Type**     |      **Beskrivelse**                                                                                              |
|------------------------|---------------|---------------------------------------------------------------------------------------------------------------|
|     serviceId **\***           |     string    |     ID som spesifiserer forsendelsestype. (DPO, DPV, DPI eller DPF)                                                |
|     dpfShipmentType    |     string    |     DPF-forsendelsestype som brukes til ruting i mottakersystemet                                          |
|     receiver           |     string    |     Organisasjonsnummer til mottaker (valgfritt). Kun norske organisasjoner støttes.        |
|     sendAfterTaskId    |     string    |     ID for oppgaven som må fullføres før meldingen sendes.   |
|     process **\*\***          |     string    |     Prosesstype                                                                                              |
|     standard **\*\*\***         |     string    |     Dokumentstandarden                                |
|     typeVersion        |     string    |     Versjon av meldingstypen                                                                               |
|     type **\*\*\***             |     string    |     Dokumenttypen                                                                 |
|     securityLevel **\*\*\***       |     number    |     Sikkerhetsnivå som skal settes på _StandardBusinessDocument_                                              |
|     dataTypes          |     array     |     Liste over datatyper som skal inkluderes i meldingen                                                            |

**\*** Altinn støtter kun DPF og DPO.

**\*\*** Du kan finne tilgjengelige prosesser for hver mottaker på:
```http
https://platform.altinn.no/eformidling/api/capabilities/{orgnummer}
```

**\*\*\*** Du kan finne denne informasjonen på sidene som beskriver hver <a href="https://docs.digdir.no/docs/eFormidling/Utvikling/Dokumenttyper/" target="_blank" rel="noopener noreferrer">dokumenttype</a>, eller ved å bruke URL-en ovenfor.

{{</content-version-container>}}
{{<content-version-container version-label="Eksempel">}}
Nedenfor er et eksempel på konfigurasjon for meldingstypen `arkivmelding`.
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

### Aktivere eFormidling-integrasjon  {#eFormidling-oppsett-appsettings}
Du må eksplisitt aktivere eFormidling-integrasjon i appen din.
I `appsettings.json`, aktiver eFormidling i `"AppSettings"`-seksjonen og legg til en ny seksjon `"EFormidlingClientSettings"`:

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
Hvis du ikke vil teste eFormidling-integrasjonen lokalt, kan du legge til en `"AppSettings"`-seksjon i `appsettings.Development.json` og sette `"EnableEFormidling"` til `false`.

### Generere meldingsmetadata {#eFormidling-oppsett-eFormidlingMetadata}
Du er ansvarlig for å opprette meldingen som sendes gjennom eFormidling.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Kode/Syntaks">}}

For å opprette meldingen, trenger du en klasse som implementerer `IEFormidlingMetadata`-grensesnittet og oppretter meldingen din i `GenerateEFormidlingMetadata`-metoden. Husk å registrere klassen din i [`Program.cs`](#eFormidling-oppsett-program).

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

Hvis du må sette meldingsmottakeren dynamisk, må du opprette en klasse som implementerer `IEFormidlingReceivers`-grensesnittet og registrere den i [`Program.cs`](#eFormidling-oppsett-program).

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
Vi anbefaler at du legger til en [tilbakemeldingsoppgave](/nb/altinn-studio/v8/reference/process/tasks/#feedback-task) i app-prosessen din. Dette sikrer at prosessen fortsetter når meldingen er mottatt.
Ingen ytterligere endringer er nødvendige når du har lagt til oppgaven, siden eFormidling-tjenesten automatisk flytter prosessen videre.
Hvis du vil tilpasse tekstene som vises til brukeren i dette steget, kan du overstyre [tekstnøklene](/nb/altinn-studio/v8/reference/configuration/process/customize/#feedback).

### Sikre unike filnavn {#eFormidling-oppsett-filenames}
Hvis meldingen din inneholder flere vedlegg, må du sikre at de har unike filnavn. Ellers vil meldingen feile.
Hvis meldingen din inkluderer den genererte PDF-en av skjemaet, må du sjekke at de andre filnavnene ikke er de samme som appnavnet.
En måte å sikre unike filnavn på er gjennom [filvalidering](/nb/altinn-studio/v8/reference/logic/validation/files/).

## Testing
Test eFormidling-integrasjonen i appen din grundig.
Sikkerhetstiltak og mekanismer for nye forsøk er på plass for å sikre at en melding når mottakeren når feil skyldes svake nettverksforbindelser.
Imidlertid vil ugyldige meldinger (inkludert manglende vedlegg eller feil i `"arkivmelding"`) føre til at meldingen feiler uten advarsel til sluttbrukeren eller appeieren.

### Lokal testing
{{%notice warning%}}
For øyeblikket kan du ikke teste eFormidling-integrasjonen lokalt. Det er fordi vi renoverer <a href="https://github.com/felleslosninger/efm-mocks" target="_blank" rel="noopener noreferrer">efm-mocks</a> (nødvendig for lokal testing).
{{% /notice%}}

### Testmiljø (TT02)
Du kan overvåke statusen til en melding som er sendt i testmiljøet gjennom endepunktet nedenfor.
```http
https://platform.tt02.altinn.no/eformidling/api/conversations?messageId={instanceGuid}
```
- `{instanceGuid}`: GUID-en til instansen som er arkivert.
