---
draft: true
title: eFormidling
description: Slik setter du opp eFormidling-integrasjon for appen din.
tags: [eFormidling, needsReview]
toc: true
weight: 50
---

I v9 er eFormidling en **systemoppgave**. Du legger den til som et steg i app-prosessen (`process.bpmn`), og all konfigurasjon for meldingen ligger på denne oppgaven. `eFormidling`-seksjonen i `applicationmetadata.json` finnes ikke lenger.

## Forutsetninger

Før du setter opp eFormidling, må du ha [integrasjonen mot Maskinporten](#maskinporten-integrasjon) på plass.

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

## Sette opp eFormidling i appen {#eFormidling-oppsett}

### Registrere eFormidling-tjenester {#eFormidling-oppsett-program}
For å legge til eFormidling-støtte i appen din, må du registrere tjenestene ved å legge til følgende i `RegisterCustomAppServices`-metoden i `Program.cs`:

{{< code-title >}}
  App/Program.cs
{{< /code-title >}}

```cs{hl_lines=["3-6"]}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  services
    .AddEFormidling()
    .WithMetadata<EFormidlingMetadata>()
    .WithReceivers<EFormidlingReceivers>();
}
```

Utvidelsesmetodene ligger i navnerommet `Altinn.App.Core.EFormidling.Extensions`, så husk `using` for dette.

`AddEFormidling()` registrerer alt systemoppgaven trenger. Resten av registreringen fullfører du med dine egne implementasjoner:

- **`WithMetadata<T>()`** – påkrevd. Registrerer klassen som [genererer meldingsmetadataen](#eFormidling-oppsett-eFormidlingMetadata), vanligvis arkivmeldingen. Ingen standardimplementasjon kan tre inn i stedet, så dette er det eneste kallet du ikke kan utelate. Det er også det eneste `AddEFormidling()` lar deg kalle, og stopper du der, får du en byggefeil (`ALTINNAPP0701`).
- **`WithReceivers<T>()`** – valgfri. Registrerer en klasse som [setter mottakeren dynamisk](#eFormidling-oppsett-eFormidlingReceivers). Utelater du den, hentes mottakeren fra `<altinn:receiver>` på systemoppgaven.
- **`WithConfig(...)`** – valgfri. Binder klientinnstillingene for eFormidling til en annen konfigurasjonsseksjon, eller setter dem i kode. Som standard leses de fra seksjonen `EFormidlingClientSettings` i `appsettings.json`.

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
              <altinn:receiver>991825827</altinn:receiver> <!-- Bytt ut med organisasjonsnummeret til mottakeren du faktisk sender til. -->
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
| receiver        | string   | Nei         | Organisasjonsnummeret til mottakeren du sender til. Kun norske organisasjoner støttes.                                                                                                                                                                     |
| process         | string   | Ja          | Prosesstype. Se `https://platform.altinn.no/eformidling/api/capabilities/{orgnummer}`                                                                                                                                                                     |
| standard        | string   | Ja          | Dokumentstandarden                                                                                                                                                                                                                                        |
| typeVersion     | string   | Ja          | Versjon av meldingstypen                                                                                                                                                                                                                                  |
| type            | string   | Ja          | Dokumenttypen, som du finner på sidene som beskriver hver <a href="https://docs.digdir.no/docs/eFormidling/Utvikling/Dokumenttyper/" target="_blank" rel="noopener noreferrer">dokumenttype</a> eller på `https://platform.altinn.no/eformidling/api/capabilities/{orgnummer}` |
| securityLevel   | number   | Ja          | Sikkerhetsnivå som skal settes på _StandardBusinessDocument_                                                                                                                                                                                               |
| dpfShipmentType | string   | Nei         | DPF-forsendelsestype som brukes til ruting i mottakersystemet                                                                                                                                                                                             |
| dataTypes       | array    | Nei         | Liste over datatyper som skal inkluderes i meldingen. Hver datatype legges til som sitt eget element `<altinn:dataType>ref-data-as-pdf</altinn:dataType>`.                                                                                                 |

**Merk:** Altinn støtter kun forsendelsestypene DPF og DPO.

{{% notice info %}}
**Kommer du fra v8?** Flagget `EnableEFormidling` under `AppSettings` finnes ikke lenger. I v9 er det `<altinn:disabled>` på systemoppgaven som slår av meldingen, og `<altinn:disabled env="…">` tar over for å sette flagget ulikt i ulike `appsettings.<miljø>.json`-filer. `studioctl app upgrade v9` leser det gamle flagget, uttrykker det som `<altinn:disabled>` på den migrerte oppgaven og fjerner det fra `appsettings`-filene.

Seksjonen `EFormidlingClientSettings` i `appsettings.json` er uendret – den konfigurerer fortsatt selve eFormidling-klienten, og verdien settes for deg i test- og produksjonsmiljøene.
{{% /notice %}}

Appen kontrollerer eFormidling-konfigurasjonen når den starter, ikke når den første instansen kommer til oppgaven, og melder om alle problemene den finner samtidig. Appen nekter å starte hvis en eFormidling-oppgave mangler `<altinn:eFormidlingConfig>`-blokken, mangler en påkrevd innstilling for miljøet som startes, viser til en datatype som ikke er definert i `applicationmetadata.json`, eller er slått på uten at eFormidling-tjenestene er [registrert](#eFormidling-oppsett-program) – også når et `AddEFormidling()`-kall står ufullført, uten metadatagenerator. En oppgave som er slått av for miljøet som startes, trenger ikke tjenestene. En app som bruker eFormidling bare i produksjon, starter derfor fortsatt lokalt.

#### Miljøspesifikke verdier {#eFormidling-oppsett-env}

Alle elementene i `<altinn:eFormidlingConfig>` støtter det valgfrie attributtet `env`, ikke bare `disabled`. Du kan gjenta et element med ulike `env`-verdier, og verdien for gjeldende driftsmiljø går foran verdien uten `env`. Miljønavnene grupperes i tre miljøer: utvikling (`development`, `dev`, `local`, `localtest`), test (`staging`, `test`, `at22`, `at23`, `at24`, `tt02`, `yt01`) og produksjon (`production`, `prod`, `produksjon`).

For eksempel kan du sende til en testmottaker i TT02 og den reelle mottakeren i produksjon (bytt ut begge organisasjonsnumrene med dine egne):

```xml
<altinn:receiver env="staging">310075809</altinn:receiver>
<altinn:receiver>991825827</altinn:receiver>
```

### Generere meldingsmetadata {#eFormidling-oppsett-eFormidlingMetadata}
Du lager selv meldingen som sendes gjennom eFormidling.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Kode/Syntaks">}}

For å lage meldingen, trenger du en klasse som implementerer `IEFormidlingMetadata`-grensesnittet og lager meldingen din i `GenerateEFormidlingMetadata`-metoden. Registrer den med `WithMetadata<T>()` i [`Program.cs`](#eFormidling-oppsett-program).

Du må erstatte `YourMessageType` og `yourMessage` med meldingstypen din.

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

### Sette meldingsmottaker dynamisk {#eFormidling-oppsett-eFormidlingReceivers}

Du kan sette mottakeren på to måter:
- Statisk gjennom `<altinn:receiver>` i BPMN-konfigurasjonen (se [tabellen ovenfor](#eFormidling-oppsett-servicetask)).
- Dynamisk ved å implementere `IEFormidlingReceivers`-grensesnittet.

Hvis du må sette mottakeren dynamisk, må du lage en klasse som implementerer `IEFormidlingReceivers`-grensesnittet og registrere den med `WithReceivers<T>()` i [`Program.cs`](#eFormidling-oppsett-program).

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Kode/Syntaks">}}
{{< code-title >}}
App/logic/EFormidling/EFormidlingReceivers.cs
{{< /code-title >}}

```cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Core.EFormidling.Implementation;
using Altinn.App.Core.EFormidling.Interface;
using Altinn.App.Core.Features;
using Altinn.App.Models;
using Altinn.Common.EFormidlingClient.Models.SBD;

namespace Altinn.App.logic.EFormidling;

public class EFormidlingReceivers : IEFormidlingReceivers
{
    public async Task<List<Receiver>> GetEFormidlingReceivers(IInstanceDataAccessor dataAccessor, string? receiverFromConfig)
    {
        // Finn mottakeren ut fra instansen. Bytt ut YourDataModel og feltet nedenfor med din egen
        // modell og feltet der mottakeren faktisk ligger – å bestemme mottakeren per instans er
        // hele grunnen til å implementere dette grensesnittet.
        YourDataModel? formData = await dataAccessor.GetFormData<YourDataModel>();
        string? organisationNumber = formData?.ReceiverOrganisationNumber;

        // Ved å falle tilbake på <altinn:receiver> beholder du konfigurasjonen på systemoppgaven
        // som standardverdi, i stedet for å gjenta organisasjonsnummeret her.
        organisationNumber ??= receiverFromConfig;

        if (string.IsNullOrWhiteSpace(organisationNumber))
        {
            // Ingen å sende til, og ingenting som ordner seg av seg selv. La meldingen feile med
            // en gang, i stedet for å bli forsøkt på nytt.
            throw new EformidlingDeliveryException("Fant ingen eFormidling-mottaker for denne instansen.");
        }

        Identifier identifier = new()
        {
            Authority = "iso6523-actorid-upis",
            // Alle norske organisasjoner må ha prefikset '0192:'
            Value = $"0192:{organisationNumber}"
        };

        return [new Receiver { Identifier = identifier }];
    }
}
```

`receiverFromConfig` inneholder verdien fra `<altinn:receiver>` i konfigurasjonen av systemoppgaven, eller `null` når elementet mangler. Da kan koden din falle tilbake på mottakeren fra konfigurasjonen i stedet for å gjenta den. Standardimplementasjonen gjør bare det: den returnerer mottakeren fra konfigurasjonen, og en tom liste når det ikke finnes noen.

**Merk:** Kun norske organisasjoner støttes, og du må bruke prefikset `0192:` før organisasjonsnummeret.
{{</content-version-container>}}
{{</content-version-selector>}}

### Vente på leveringsbekreftelsen {#eFormidling-oppsett-process}
Systemoppgaven er ikke ferdig når meldingen er overlevert til integrasjonspunktet. Den er ferdig når integrasjonspunktet bekrefter at meldingen er levert. Oppgaven sender, og sjekker deretter leveringsstatusen selv – først etter 15 sekunder, så hvert minutt, så hvert femte minutt, og til slutt hvert kvarter. Prosessen går videre til neste steg først når leveringen er bekreftet.

Oppgaven venter i om lag to og en halv time til sammen. En melding har en egen levetid på to timer, og oppgaven venter med hensikt litt lenger enn det. Slik feiler en melding som går ut på tid, med integrasjonspunktets egen dom i stedet for et generisk tidsavbrudd.

Oppgaven feiler hvis meldingen blir avvist, eller hvis integrasjonspunktet melder at den har gått ut på tid. Feilen forsøkes ikke på nytt: id-en til en eFormidling-melding er knyttet til instans-id-en, så den samme meldingen kan aldri sendes igjen, og noen må følge den opp manuelt. Uansett utfall skriver appen den siste statusen integrasjonspunktet meldte, til instansen som dataverdien `eFormidlingShipmentStatus`. Slik kan du se hva som ble av en melding lenge etter at prosessen har gått videre.

Mens appen venter, ser sluttbrukeren den innebygde behandlingssiden. Den forteller at appen jobber, og at brukeren ikke trenger å gjøre noe. Etter 30 sekunder legger den til at dette tar uvanlig lang tid, og at siden trygt kan lukkes og åpnes igjen senere. Tekstene er tekstressurser (`process_workflow.advancing_title`, `process_workflow.advancing_body` og `process_workflow.still_working`) som appen din kan overstyre. Brukeren blir sendt videre til neste steg automatisk når prosessen går videre.

{{% notice warning %}}
**Ikke legg en tilbakemeldingsoppgave etter eFormidling-oppgaven.** I v8 trengte du en tilbakemeldingsoppgave for å holde instansen mens leveringen sto på vent, og en påminnelse bygget på Altinn Events flyttet prosessen videre når meldingen kom fram. Denne påminnelsen er borte i v9, fordi systemoppgaven nå venter selv. Ingenting flytter en tilbakemeldingsoppgave som ligger etter eFormidling-oppgaven, videre, og instanser som blir stående der, venter i det uendelige. Oppgraderer du en app fra v8, må du fjerne den – `studioctl app upgrade v9` melder om tilbakemeldingsoppgaver som ligger etter en systemoppgave.
{{% /notice %}}

### Sikre unike filnavn {#eFormidling-oppsett-filenames}
Filnavnene på vedlegg som sendes gjennom eFormidling må være unike. Integrasjonen inneholder logikk som sikrer dette, og kan endre filnavnene litt før filene sendes.

## Testing
Test eFormidling-integrasjonen i appen din grundig.
Sikkerhetstiltak og mekanismer for nye forsøk er på plass for å sikre at en melding når mottakeren når feil skyldes svake nettverksforbindelser.
En ugyldig melding – et manglende vedlegg, eller en feil i `"arkivmelding"` – gjør fortsatt at meldingen feiler, men i v9 feiler systemoppgaven også. Feilen blir dermed synlig i stedet for å gå upåaktet hen. Meldingen kan ikke sendes på nytt automatisk, så den må følges opp manuelt.

### Lokal testing
{{%notice warning%}}
For øyeblikket kan du ikke teste eFormidling-integrasjonen lokalt. Det er fordi vi renoverer <a href="https://github.com/felleslosninger/efm-mocks" target="_blank" rel="noopener noreferrer">efm-mocks</a> (nødvendig for lokal testing). Sett i mellomtiden `<altinn:disabled env="development">true</altinn:disabled>` på systemoppgaven, slik at prosessen fullfører lokalt uten å forsøke å sende. Hvis du lar eFormidling stå på lokalt, feiler sendingen, og prosessen stopper på systemoppgaven med en feil.
{{% /notice%}}

### Testmiljø (TT02)
Du kan overvåke statusen til en melding som er sendt i testmiljøet gjennom endepunktet nedenfor.
```http
https://platform.tt02.altinn.no/eformidling/api/conversations?messageId={instanceGuid}
```
- `{instanceGuid}`: GUID-en til instansen som er arkivert.
