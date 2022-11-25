---
title: eFormidling
description: Hvordan konfigurere eFormidling integrasjon for en app.
toc: true
weight: 400
---

## Aktivere integrasjon med eFormidling i applikasjonen din

{{%notice info%}}
For at applikasjonen din skal kunne sende instansdata videre til eFormidling må den referere til nugetversjon >= 4.22.0.
[Se hvordan du oppdaterer nugetreferanser for applikasjonen din her](../update/#nuget-pakker).
{{% /notice%}}

{{%notice info%}}
I versjon 7 ble det innført en endring for å sikre at applikasjonen kjenner den endelige leveransestatsus for meldinger sent gjennom integrasjonspunktet til eFormidling og i tilfelle feilende leveranser vil disse logges eksplisitt. Denne endringer introduserer behovet for [hendelsestøtte i applikasjonen](/app/development/logic/events).
{{% /notice%}}

Dersom man har behov for integrasjon med eFormidling i applikasjonen må dette aktiveres.

I filen _appsettings.json_ i mappen _App_ må følgende legges til i seksjonen _AppSettings_

```json
"EnableEFormidling":  true
```

I tillegg må det i samme fil opprettes en ny seksjon; _EFormidlingClientSettings_.
Innholdet i kodesnutten nedenfor kan kopieres i sin helhet.
Denne setter opp url til integrasjonspunktet.
Lenken peker på mocken som kan kjøres opp lokalt.
[Les mer om oppsettet av eFormidlings mocken her](#lokal-test-av-applikasjon-med-eformidling).

Når en app deployes til TT02 eller produksjon vil denne verdien overskrives
og peke mot integrasjonspunktet i Altinn Platform.


```json
"EFormidlingClientSettings": {
   "BaseUrl": "http://localhost:9093/api/"
 }
```

Dersom det ikke er ønskelig å teste integrasjonen med eFormidling når man kjører applikasjonen lokalt kan man overstyre
denne konfigurasjonen i _appsettings.Development.json_.

Opprett `AppSettings` seksjonen dersom den ikke finnes og sett `EnableEFormidling` til false.

```json
"AppSettings": {
    "EnableEFormidling": false
}
```

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v4, v5, v6">}}
## Legge til støtte for eFormidling i App.cs

Neste steg for å få støtte for eFormidling i tjenesten din er å tilgjengeliggjøre services som appen behøver.
Endringene skal alle gjøres i filen _App.cs_ som ligger i mappen _App/logic.

Øverst i filen, blant bibliotekreferansene legges disse tre linjene til.

```cs
using Altinn.Common.EFormidlingClient.Models;
using Altinn.Common.EFormidlingClient;
using Altinn.Common.AccessTokenClient.Services;
```

Videre skal vi injecte services i konstruktøren til både klassen og base klassen. 

Konstruktøren vil se ut som eksempelet nedenfor, men hvilke services som sendes med kan variere fra tjeneste til tjeneste,
så her er kun et eksempel på det vanligste oppsettet.

```cs
public App(
IAppResources appResourcesService,
(...)
IHttpContextAccessor httpContextAccessor):base(
appResourcesService,
(...)
httpContextAccessor)
```

Listen med services i konstruktøren skal utvides med de fire servicene vist nedenfor.

```cs
IEFormidlingClient eformidlingClient,
IOptions<AppSettings> appsettings,
IAccessTokenGenerator tokenGenerator,
IOptions<PlatformSettings> platformSettings
```

Videre skal disse servicene sendes med videre til baseklassen, da er det kun navnene som sendes med og ikke typene.

```cs
eformidlingClient,
appsettings,
platformSettings,
tokenGenerator
```

Endelig resultat skal se slik ut:

```cs
public App(
IAppResources appResourcesService,
(...)
IHttpContextAccessor httpContextAccessor,
IEFormidlingClient eformidlingClient,
IOptions<AppSettings> appsettings,
IAccessTokenGenerator tokenGenerator,
IOptions<PlatformSettings> platformSettings):base(
appResourcesService,
(...)
httpContextAccessor,
eformidlingClient,
appsettings,
platformSettings,
tokenGenerator)
```
{{</content-version-container>}}

{{<content-version-container version-label="v7">}}
eFormidlingsintegrasjonen er en del av Altinn.App.Core nuget pakken, men er ikke aktivert som standard. For å aktivere støtte for eFormidling in applikasjonen må du registrere tjenestene ved å legge til følgende i _Program.cs_:

```csharp
services.AddEFormidlingServices<EFormidlingMetadata, EFormidlingReceivers>(config);
```
{{</content-version-container>}}

{{</content-version-selector>}}

## Konfigurere nøkkelverdier for eFormidling i applikasjonen din

Det kreves en del metadata om eFormidlingsforsendelsen og denne defineres i applicationmetadata.json_.
Filen finner du i repoet under mappen _App/config_.

Opprett seksjonen `eFormidling` og fyll ut verdier for følgende parametre.

| Id              | Beskrivelse                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------  |
| serviceId       | Id som spesifiserer type forsendelse [DPO](https://samarbeid.digdir.no/eformidling/offentlige-virksomheter-dpo/149), [DPV](https://samarbeid.digdir.no/eformidling/private-virksomheter-dpv/150), [DPI](https://samarbeid.digdir.no/eformidling/innbyggere-dpi/152) eller [DPF*](https://samarbeid.digdir.no/eformidling/kommunar-dpf/151) |
| dpfShipmentType | Forsendelsestype som benyttes til routing på mottakersiden                                                  |
| process         | Id som settes på scopet i StandardBusinessDocumentHeader**                                                  |
| dataTypes       | Liste av data typer som automatisk skal legges ved forsendelsen                                             |
| sendAfterTaskId | Id på tasken som skal avsluttes før forsendelsen sendes. Det er anbefalt at dette er et confirmation steg   |
| receiver        | Organisasjonsnummer til mottaker. Støtter kun norske virksomheter. Kan sløyfes og defineres i applogikken   |
| standard        | DocumentIdentification standard                                                                             |
| type            | Id på [meldingstypen](https://docs.digdir.no/eformidling_nm_message.html#meldingstypene)                    |
| typeVersion     | Versjon av meldingstypen                                                                                    |
| securityLevel   | Sikkerhetsnivå som settes på StandardBusinessDocument                                                       |

\* per Januar 2022 støttes kun DPF.

\** tilgjengelige prosesser for mottaker er tilgjengelig på https://platform.altinn.no/eformidling/api/capabilities/{mottaker-orgnummer}


Et eksempel for en konfigurasjon i application metadata:

```json
"eFormidling": {
    "serviceId": "DPF",
    "dpfShipmentType": "altinn3.skjema",
    "process": "urn:no:difi:profile:arkivmelding:administrasjon:ver1.0",
    "dataTypes": [ "ref-data-as-pdf" ],
    "sendAfterTaskId": "Task_2",
    "receiver": "910075918",
    "standard": "urn:no:difi:arkivmelding:xsd::arkivmelding",
    "type": "arkivmelding",
    "typeVersion": "2.0",
    "securityLevel":  3
}
```

## Generering av metadata til forsendelsen i applikasjonen

Apputvikler er selv ansvarlig for å sette opp meldingen til en forsendelse som skal via eFormidling.
[Les om de ulike meldingstypene tilgjengelig i eFormidling.](https://docs.digdir.no/eformidling_nm_message.html#meldingstypene)

I versjon 4, 5 og 6 ble dette gjort ved å legge til funksjonen nedenfor i _App.cs_. Mens i versjon gjør man dette ved å legge til en klasse som implementerer `IEFormidlingMetadata` grensesnittet som har samme metode og signatur. Husk at i versjon 7 må du også registrere implementeringen din i _Program.cs_.

Forventet output fra denne metoden er en tuppel som inneholder navnet på metadatafilen som første element
og en stream med metadataen som andre element.

```cs
/// <inheritdoc />
public override async Task<(string, Stream)> GenerateEFormidlingMetadata(Instance instance)
{
    Altinn.Common.EFormidlingClient.Models.Arkivmelding arkivmelding = new ();

    // bygg opp arkivmeldingen eller annet metadataobjekt her.

    MemoryStream stream = new MemoryStream();
    XmlSerializer serializer = new XmlSerializer(typeof(Altinn.Common.EFormidlingClient.Models.Arkivmelding));
    serializer.Serialize(stream, arkivmelding);
    stream.Position = 0;
    StreamContent streamContent = new StreamContent(stream);
    streamContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/xml");
    return await Task.FromResult(("arkivmelding.xml", stream));
}
```

## Sette mottaker for forsendelse i applikasjonslogikken
Denne funksjonaliteten kan benyttes dersom mottaker av forsendelsen skal avgjøres dynamisk.

I App.cs kan man overstyre metoden som henter ut mottaker av forsendelsen fra applicationmetadata.json_.

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v4, v5, v6">}}
Det må tre steg til for å sette mottaker i applikasjonslogikken, og alle endringer gjøres i _App.cs_.

1. Øverst i filen må det legges til en referanse til eFormidlings biblioteket.

  ```cs
  using Altinn.Common.EFormidlingClient.Models.SBD;
  ```

2. Legg til denne funksjonen i klassen.
   Forventet output fra denne metoden er en liste som inneholder minst ett receiver-objekt.

    ```cs
    public override async Task<List<Receiver>> GetEFormidlingReceivers(Instance instance)
    {
        Identifier identifier = new Identifier
        {
            Authority = "iso6523-actorid-upis"
        };

        // 0192 prefix for all Norwegian organisations.
        identifier.Value = "[INSERT ORGANISATION NUMBER HERE WITH PREFIX `0192:`]" ;

        Receiver receiver = new Receiver { Identifier = identifier };
        return new List<Receiver> { receiver };
    }
    ```

3. Legg til egen logikk for å populere _identifier.Value_ i funksjonen.
   Merk at det kun er norske organisasjonsnummer som støttes,
   og at prefiksen `0192:` er påkrevd før organisasjonsnummeret.
{{</content-version-container>}}
{{<content-version-container version-label="v7">}}
I versjon 7 er GetEformidlingReceivers metoden flyttet til `IEFormidlingReceivers` grensesnittet. Lag en klasse som implementerer dette grensesnittet og registrer den i _Program.cs_. Nedefor er et eksempel på rammene for en slik implementering:
```csharp
public async Task<List<Receiver>> GetEFormidlingReceivers(Instance instance)
{
    Identifier identifier = new Identifier
    {
        Authority = "iso6523-actorid-upis"
    };

    // 0192 prefix for all Norwegian organisations.
    identifier.Value = "[INSERT ORGANISATION NUMBER HERE WITH PREFIX `0192:`]" ;

    Receiver receiver = new Receiver { Identifier = identifier };
    return new List<Receiver> { receiver };
}
```
{{</content-version-container>}}

{{</content-version-selector>}}
## Lokal test av applikasjon med eFormidling

Det er mulig å teste eFormidlingsintegrasjonen i applikasjonen lokalt på utviklingsmiljøet ditt.
I tillegg til Altinn Localtest og applikasjonen er det to ting som må kjøre:
1. eFormidling integrasjonspunkt
2. mock av eFormidling

### Forberedelser


1. Installer siste versjon av Java.
   [Finn nedlastingslenke og beskrivelse av nødvendige steg her](https://docs.oracle.com/cd/E19182-01/821-0917/inst_jdk_javahome_t/index.html)
2.  Det skal nå lastes ned en rekke filer. Finn en egnet plassering for eFormidling lokalt på maskinen din og navigér dit i en terminal.
3.  Klon repoet som inneholder eFormidling mocken med følgende commando

    ```cmd
    git clone --branch development https://github.com/felleslosninger/efm-mocks.git
    ```

4. [Last ned integrasjonspunktet herfra](https://docs.digdir.no/eformidling_download_ip.html). Dette kan plasseres på samme nivå som mappen `efm-mocks`.
   

#### Kjøre eFormidling lokalt

1. Åpne en terminal og navigér til `efm-mocks` (Command prompt eller bash er anbefalt, PowerShell funker ikke. )
2. Kjør `docker-compose up -d`
3. Navigér til mappen der integrasjonspunkt-filen ligger
4. Kjør kommandoen `java -Xmx2g -Dspring.profiles.active=mock -jar integrasjonspunkt-2.2.0.jar`
    Dersom du har en nyere versjon av integrasjonspunktet enn `2.2.0`  må kommandoen siste ledd i siste linje justeres for dette.

#### Verifiser at eFormidling er satt opp korrekt

Dette steget krever [node og npm](https://www.npmjs.com/get-npm) på maskinen din, men er ikke nødvendig for å bruke mocken.

- Åpne en terminal og navigér til `efm-mocks/tests/`
- Kjør `npm i`
- Navigér inn i mappen `next-move`
- Kjør `node NextMove.js dpf`
- Verifiser i en broswer på [localhost:8001](http://localhost:8001/) at det er nye innslag i tabellen med de sendte meldingene.

Les mer om mockløsningen [her](https://github.com/felleslosninger/efm-mocks)

## Test av eFormidling integrasjon i testmiljø

{{%notice warning%}}
Det oppfordres til grundig testing av eFormidlingsintegrasjonen i applikasjonene.
Det er lagt inn sikringer og retry mekanismer for å få en forsendelse fram til
mottaker dersom feil skyldes svakheter i nettverksforbindelse.
I tilfellet ugyldige forsendelser, herunder manglende vedlegg eller feil i arkivmelding,
vil forsendelsen feile uten eksplisitt varsling til sluttbruker eller tjenesteeier.
{{% /notice%}}

Integrasjonspunktet eksponerer endepunkter der man kan følge statusen for en forsendelse. 
`https://platform.altinn.no/eformidling/api/conversations?messageId={instanceGuid}`

Bytt ut `{instanceGuid}` med guiden til instansen som er blitt innsendt.

