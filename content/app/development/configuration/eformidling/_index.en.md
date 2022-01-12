---
title: eFormidling
description: How to configure integration with eFormidling for an app.
toc: true
weight: 400
---

## Activate eFormidling integration for your application

{{%notice info%}}
Nuget versions >= 4.22.0 are required for your application to support eFormidling.
[See how to update the nuget references of your application here](../update/#nuget-pakker).
{{% /notice%}}

Integration with eFormidling needs to be explicitly activated in the application. 

In the file `appsettings.json` in th efolder _App_, the following must be added to the _AppSettings_ section.

```json
"EnableEFormidling":  true
```

In addition, continuing in the same file, a new section; _EFormidlingClientSettings_ should be added.
The contents of the code snippet below can be copied in its entirety. 
This sets up the url for the integation point.
The link points to the mock that can be ran locally. 
[Read more about setting up the local mock for the integration point here](#-Kjøring-med-eFormidling-mock-lokalt).

When an application is deployed to TT02 or production,
this value will be substituted to point to the integration point hosted in Altinn Platfor.

```json
"EFormidlingClientSettings": {
   "BaseUrl": "http://localhost:9093/api/"
 }
```

In the case you do not wish to test the eFormidling integration when running your app locally, 
you can overide this configuration in  `appsettings.Development.json`.

Create the section _AppSettings_, if it does not already exist, and set `EnableEFormidling` to false.

```json
"AppSettings": {
    "EnableEFormidling": false
}
```

## Adding support for eForimdling in App.cs

The next step in setting up support of eFormidling , 
is to make the required services available for the appliction.
All changes are made in `App.cs`, which you fill find in the `App/logic` folder.

At the top of the file, among the library references, include the following three lines.

```cs
using Altinn.Common.EFormidlingClient.Models;
using Altinn.Common.EFormidlingClient;
using Altinn.Common.AccessTokenClient.Services;
```

Further, you need to inject services in the constructor of both the class and the base class.

Before making any changes, the constructor should look like the example below, 
but which services are included may vary from application to application.
This shows the most common setup.


```cs
public App(
IAppResources appResourcesService,
(...)
IHttpContextAccessor httpContextAccessor):base(
appResourcesService,
(...)
httpContextAccessor)
```

The list of services in the constructor should be extended with the four services listed below.

```cs
IEFormidlingClient eformidlingClient,
IOptions<AppSettings> appsettings,
IAccessTokenGenerator tokenGenerator,
IOptions<PlatformSettings> platformSettings
```

Further, these services should be forwarded to the base class as well, 
but in this case only include the names, not the types.


```cs
eformidlingClient,
appsettings,
platformSettings,
tokenGenerator
```

Final result should look like this:

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

## Configuring key values for eFormidling in your application

Metadata related to the eFormidling shipment is required, 
and this is set up in `applicationmetadata.json`.
You find the file in the `App/config` foorder

Det kreves en del metadata om eFormidlingsforsendelsen og denne defineres i `applicationmetadata.json`.
Filen finner du i repoet under mappen `App/config`.

Opprett seksjonen `eFormidling` og fyll ut verdier for følgende parametre.

| Id              | Beskrivelse                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| serviceId       | Id som spesifiserer type forsendelse DPO, DPV, DPI eller DPF*                                              |
| process         | Id som settes på scopet i StandardBusinessDocumentHeader**                                                 |
| dataTypes       | Liste av data typer som automatisk skal legges ved forsendelsenn                                           |
| sendAfterTaskId | Id på tasken som skal avsluttes før forsendelsen sendes. Det er anbefalt at dette er et confirmation steg  |                                                    |
| receiver        | Organsisasjonsnummer til mottaker. Støtter kun norske virksomheter. Kan sløyfes og defineres i applogikken |
| standard        | DocumentIdentification standard                                                                            |
| type            | DocumentIdentification type                                                                                |
| typeVersion     | DocumentIdentification type versjon                                                                        |
| securityLevel   | Sikkerhetsnivå som settes på StandardBusinessDocument                                                      |

\* per Januar 2022 støttes kun DPF.

\** tilgjengelige prosesser for mottaker er tilgjengelig på https://platform.altinn.no/eformidling/api/capabilities/{mottaker-orgnummer}


Et eksempel for en konfigurasjon i application metadata:

```json
"eFormidling": {
    "serviceId": "DPF",
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

Apputvikler er selv ansvarlig for å sette opp arkivmeldingen til en forsendelse som skal via eFormidling.
Dette gjøres ved å legge til funksjonen nedenfor i `App.cs`.

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

I App.cs kan man overstyre metoden som henter ut mottaker av forsendelsen fra `applicationmetadata.json`.
Denne funksjonaliteten kan benyttes dersom mottaker av forsendelsen skal avgjøres dynamisk.

Det må tre steg til for å sette mottaker i applikasjonslogikken, og alle endringer gjøres i `App.cs`.

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

3. Legg til egen logikk for å populere `identifier.Value` i funksjonen.
   Merk at det kun er norske organisasjonsnummer som støttes,
   og at prefiksen `0192:` er påkrevd før organisasjonsnummeret.


## Lokal test av applikasjon med eFormidling

Det er mulig å teste eFormidlingsintegrasjonen i applikasjonen lokalt på utviklingsmiljøet ditt.
I tillegg til Altinn Localtest og applikasjonen er det to ting som må kjøre:
1. eFormidling integrasjonspunkt
2. mock av eFormidling

### Forberedelser

1. Installer siste verjson av Java.

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
4. Kjør og kjører kommandoen `java -Xmx2g -Dspring.profiles.active=mock -jar integrasjonspunkt-2.2.0.jar`
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
Det oppfordres sterkt til grundig testing av eFormidlingsintegrasjonen i applikasjonene.
Det er lagt inn sikringer og retry mekanismer for å få en forsendelse fram til
mottaker dersom feil skyldes svakheter i nettverksforbindelse,
men ugyldige forsendelser, herunder manglende vedlegg eller feil i arkivmelding, vil forsendelsen feile uten eksplisitt varsling
til sluttbruker eller tjenesteeier.
{{% /notice%}}
