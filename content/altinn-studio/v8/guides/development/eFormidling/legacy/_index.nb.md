---
title: eFormidling legacy
description: Hvordan konfigurere integrasjon med eFormidling for en app.
tags: [eFormidling]
weight: 15
---

{{%notice info%}}
Denne siden beskriver oppsettet for en **v8** Altinn-applikasjon. For tidligere versjoner, se [eFormidling-oppsettet for v7-dokumentasjonen]( {{< relref "/altinn-studio/v8/reference/configuration/eformidling/">}}).
Hvis du bruker versjon **v8.9** eller nyere, kan du kjøre eFormidling som en [systemoppgave](/nb/altinn-studio/v8/guides/development/eformidling/service-task/) i stedet, noe som passer bedre inn i den fremtidige arkitekturen for Altinn-apper.
{{% /notice%}}

I tillegg til dokumentasjonen nedenfor har vi laget en [eksempelapplikasjon](https://altinn.studio/repos/ttd/eformidling-sample-app) som viser komplett eFormidling-oppsett.

## Forutsetninger

Før du setter opp eFormidling må du ha følgende på plass:

{{% expandlarge id="maskinporten-integration-setup" header="Maskinporten-integrasjon" %}}

For å aktivere eFormidling i applikasjonen din må du [sette opp en integrasjon mellom appen din og Maskinporten](/nb/altinn-studio/v8/guides/integration/maskinporten/).

* Applikasjonen inkluderer automatisk den innebygde `IMaskinportenClient`. Hvis du trenger tilpasset konfigurasjon, kan du bruke:
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

{{% /expandlarge %}}

{{% expandlarge id="event-subscription-setup" header="Hendelsesabonnement" %}}

Et [hendelsesabonnement]( {{< relref "/altinn-studio/v8/reference/logic/events/subscribing/" >}}) må settes opp for å sikre at applikasjonen kjenner til leveringsstatus for meldinger som sendes via eFormidling.

* Legg til en ny hemmelighet `EventSubscription--SecretCode` i Azure key vault eller lag din egen implementasjon av `IEventSecretCodeProvider`. Verdien til hemmeligheten bestemmer du.

* I `Program.cs` legg til følgende i `RegisterCustomAppServices`:

```csharp  {hl_lines=[6,7,8]}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // Valgfritt: Kun nødvendig hvis du bruker ikke-standard konfigurasjonsbane
  services.ConfigureMaskinportenClient("CustomMaskinportenSettingsPath");

  // Konfigurer HTTP-klient for Events API med Maskinporten-autorisasjon
  services.AddHttpClient<IEventsSubscription, EventsSubscriptionClient>()
    .UseMaskinportenAltinnAuthorization("altinn:serviceowner/instances.read");
}
```
{{% /expandlarge %}}
***

## Sette opp eFormidling i applikasjonen din {#eFormidling-setup}

### Registrer eFormidling-tjenester {#eFormidling-setup-program}
For å legge til støtte for eFormidling i applikasjonen din må du registrere tjenestene ved å legge til følgende i `RegisterCustomAppServices`-metoden i `Program.cs`:

{{< code-title >}}
  App/Program.cs
{{< /code-title >}}

```cs{hl_lines=[3]}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  services.AddEFormidlingServices2<EFormidlingMetadata, EFormidlingReceivers>(config);
}
```

### Konfigurere forsendelsesmetadata {#eFormidling-setup-applicationmetadata}
Metadata relatert til eFormidling-forsendelsen er påkrevd, og dette settes opp i `applicationmetadata.json`.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Properties">}}
For å sette opp påkrevd metadata må du opprette en ny seksjon `"eFormidling"` i `applicationmetadata.json` og fylle ut verdier for
parameterne definert nedenfor.

|      **Property**          |      **Type**     |      **Beskrivelse**                                                                                              |
|------------------------|---------------|---------------------------------------------------------------------------------------------------------------|
|     serviceId **\***           |     string    |     ID som spesifiserer forsendelsestypen. (DPO, DPV, DPI eller DPF)                                                |
|     dpfShipmentType    |     string    |     DPF-forsendelsestypen som brukes til ruting i mottakersystemet                                          |
|     receiver           |     string    |     Organisasjonsnummer til mottaker (kan utelates). Kun norske organisasjoner støttes.        |
|     sendAfterTaskId    |     string    |     ID for oppgaven som må fullføres før forsendelsen sendes.   |
|     process **\*\***          |     string    |     Prosesstype                                                                                              |
|     standard **\*\*\***         |     string    |     Dokumentstandarden                                |
|     typeVersion        |     string    |     Versjon av meldingstypen                                                                               |
|     type **\*\*\***             |     string    |     Dokumenttypen                                                                 |
|     securityLevel **\*\*\***       |     number    |     Sikkerhetsnivå som skal settes på _StandardBusinessDocument_                                              |
|     dataTypes          |     array     |     Liste over datatyper som skal inkluderes i forsendelsen                                                            |

**\*** Altinn støtter kun DPF og DPO.

**\*\*** Tilgjengelige prosesser for hver mottaker kan finnes på:
```http
https://platform.altinn.no/eformidling/api/capabilities/{orgnumber}
```

**\*\*\*** Kan finnes innenfor sidene som beskriver hver <a href="https://docs.digdir.no/docs/eFormidling/Utvikling/Dokumenttyper/" target="_blank" rel="noopener noreferrer">dokumenttype</a> eller ved å bruke URL-en ovenfor.

{{</content-version-container>}}
{{<content-version-container version-label="Example">}}
Nedenfor er et eksempel på konfigurasjonen for meldingstypen `arkivmelding`.
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

### Aktiver eFormidling-integrasjon i applikasjonen din  {#eFormidling-setup-appsettings}
Integrasjon med eFormidling må eksplisitt aktiveres i applikasjonen.
I `appsettings.json` må du aktivere eFormidling i `"AppSettings"`-seksjonen samt legge til en ny seksjon `"EFormidlingClientSettings"`:

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
Hvis du ikke ønsker å teste eFormidling-integrasjonen lokalt, kan du legge til en `"AppSettings"`-seksjon i `appsettings.Development.json` og sette `"EnableEFormidling"` til `false`.

### Generering av meldingsmetadata i applikasjonen {#eFormidling-setup-eFormidlingMetadata}
Det er applikasjonsutviklerens ansvar å opprette meldingen til forsendelsen som sendes via eFormidling.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Code/Syntax">}}

For å opprette forsendelsesmeldingen trenger du en klasse som implementerer `IEFormidlingMetadata`-grensesnittet og oppretter meldingen din i `GenerateEFormidlingMetadata`-metoden. Husk å registrere klassen din i [`Program.cs`](#eFormidling-setup-program).

Du må erstatte `YourMessageType` og `yourMessage` med din forsendelsesmeldingstype.

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
Følgende eksempel viser et oppsett av en `EFormidlingMetadata`-klasse med meldingstypen `arkivmelding`.

For at dette eksempelet skal fungere har vi opprettet en klasse <a download href="Arkivmelding.cs" filename="Arkivmelding.cs">`Arkivmelding`</a> (basert på <a href="https://github.com/felleslosninger/docs/blob/gh-pages/resources/arkivmelding/arkivmelding.xsd" target="_blank" rel="noopener noreferrer">arkivmelding.xsd</a>). Merk at dette kun inkluderer de **påkrevde** delene av arkivmeldingen, så hvis du ønsker å inkludere andre deler må du gjøre det selv.
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

### Dynamisk setting av forsendelsesmottaker {#eFormidling-setup-eFormidlingReceivers}

Hvis mottakeren av en forsendelse må settes dynamisk, må en klasse som implementerer `IEFormidlingReceivers`-grensesnittet opprettes og registreres i [`Program.cs`](#eFormidling-setup-program).

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

**NB!** Merk at kun norske organisasjoner støttes, og at prefikset `0192:` er påkrevd før organisasjonsnummeret.
{{</content-version-container>}}
{{</content-version-selector>}}

### Legge til en tilbakemeldingsoppgave i applikasjonsprosessen {#eFormidling-setup-process}
Selv om det ikke er strengt nødvendig, anbefales det å legge til en [tilbakemeldingsoppgave](/nb/altinn-studio/v8/reference/process/tasks/#feedback-task) i applikasjonen din. Dette er for å sikre at prosessen flyttes videre når meldingen har blitt mottatt.
Ingen ytterligere endringer er nødvendige når oppgaven har blitt lagt til, da eFormidling-tjenesten vi la til tidligere automatisk vil flytte prosessen videre.
Hvis du ønsker å tilpasse tekstene som presenteres for brukeren i dette steget kan du gjøre det ved å overstyre [tekstnøklene](/nb/altinn-studio/v8/reference/configuration/process/customize/#feedback)

### Sikre unike filnavn {#eFormidling-setup-filenames}
Hvis meldingen som sendes av applikasjonen din inneholder flere vedlegg, er det viktig å sikre at disse har unike filnavn da forsendelsen ellers vil feile.
Hvis meldingen inkluderer den genererte PDF-en av skjemaet, må du sjekke at det/de andre filnavnet/navnene ikke er det samme som applikasjonsnavnet.
En måte å sikre unike filnavn på er gjennom bruk av [filvalidering](/nb/altinn-studio/v8/reference/logic/validation/files/).

## Testing
Grundig testing av eFormidling-integrasjonen i en applikasjon anbefales.
Sikkerhetstiltak og gjenforøksmekanismer er på plass for å sikre at en forsendelse når mottakeren når feil skyldes svake nettverksforbindelser.
Imidlertid vil ugyldige forsendelser, inkludert men ikke begrenset til manglende vedlegg eller feil i `"arkivmelding"`, føre til at forsendelsen feiler uten eksplisitt varsel til sluttbrukeren eller app-eieren.

### Lokalt
{{%notice warning%}}
For øyeblikket er det **ikke** mulig å teste eFormidling-integrasjonen lokalt da <a href="https://github.com/felleslosninger/efm-mocks" target="_blank" rel="noopener noreferrer">efm-mocks</a>, som er nødvendig for lokal testing, er under renovering.
{{% /notice%}}

### Testmiljø (TT02)
<!-- The following integration point exposes endpoints that allow you to monitor the status of a shipment in the test environment:
 -->Du kan overvåke statusen til en forsendelse sendt i testmiljøet via endepunktet nedenfor.
```http
https://platform.tt02.altinn.no/eformidling/api/conversations?messageId={instanceGuid}
```
- `{instanceGuid}`: GUID-en til instansen som har blitt arkivert.