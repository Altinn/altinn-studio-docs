---
title: Kodelister (options)
linktitle: Kodelister
description: Hvordan konfigurere options/kodelister for en app.
toc: true
weight: 300
---

Altinn tilbyr i dag to ulike måter en app kan eksponere kodelister - statisk og dynamisk. Dette gjøres gjennom et options-api som er eksponert av appen, og kodelisten vil være tilgjengelig på endepunktet `{org}/{app}/api/options/{optionsId}`.
Checkbox, Dropdown og RadioButton komponenter vil automatisk kunne hente ut en slik liste om man kobler denne komponenten til en slik options-id.

## Statisk kodeliste fra app-repo

Ved å legge json-lister i options mappen i app repo vil appen automatisk lese denne filen og eksponere det gjennom options-apiet.
Options filene må ligge under `App/options/` og vil bli differensiert ved hjelp av navngivningen på json-filen. F.eks `land.json`. Her vil da optionsId være `land`, og vil være eksponert gjennom endepunktet `{org}/{app}/api/options/land`.
Kodelistene må være på et spesifikt format. Eksempel på en kodeliste som inneholder land (`App/options/land.json`):

```json
[
    {
        "value": "norway",
        "label": "Norge"
    },
    {
        "value": "denmark",
        "label": "Danmark"
    },
    {
        "value": "sweden",
        "label": "country.label.sweden"
    }
]
```

`label` feltet kan inneholde en tekstnøkkel til teskstressursene eller ren tekst.

## Dynamisk kodeliste generert runtime

I app-templaten har man også mulighet til å ha dynamisk kodelister som bestemmes under kjøringen av appen. Dette muligjør det å eksponere dynamiske verdier som kan filtreres eller hentes fra andre kilder. Dynamiske kodelister kan enten være åpne, dvs. alle brukere når de, eller de kan være sikret gjennom at du må ha tilgang til instansen for å se de.

I versjoner eldre enn 4.24.0 ble dette gjort ved å legge til kode i metoden `GetOptions` i `App.cs`. Denne metoden er nå erstattet ved at man legger til egne klasser for hver kodeliste som implementerer et interface og at man registrerer denne i applikasjonen sin 'dependency injection cointainer'. Dette gir bedre skille mellom de ulike kodelistene, muliggjør å sende avhengigheter inn i konstruktøren til klassen, sende inn språk og andre parametere og generelt håndtere alle aspekter av implementeringen slik du selv ønsker det.

For kodelister som er åpne implementerer man `IAppOptionsProvider` interfacet, mens for kodelister som skal være sikret implementerer man `IInstanceAppOptionsProvider`. Fremgangsmåten er den samme for begge to og modellen som returneres er lik. Men implementeringen holdes adskilt for ikke å eksponere verdier som skulle vært sikret.

### Åpne dynamiske kodelister

Under finner du et eksempel på hvordan dette kan settes opp for en åpen kodeliste. Her vil man få ut den oppsatte kodelisten i det appen får et kall mot `{org}/{app}/api/options/countries`.

```C#
using Altinn.App.Common.Models;
using Altinn.App.PlatformServices.Options;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Altinn.App.Core
{
    public class CountryAppOptionsProvider : IAppOptionsProvider
    {
        public string Id { get; set; } = "countries";

        public Task<AppOptions> GetAppOptionsAsync(string language, Dictionary<string, string> keyValuePairs)
        {
            var options = new AppOptions
            {
                Options = new List<AppOption>
                    {
                        new AppOption
                        {
                            Label = "Norway",
                            Value = "47"
                        },
                        new AppOption
                        {
                            Label = "Sweden",
                            Value = "46"
                        }
                    }
            };

            return Task.FromResult(options);
        }
    }
}

```

For at denne implementasjonen skal plukkes opp av applikasjonen må den registreres i `Startup.cs` (eller `Program.cs` i .NET 6):

```csharp
services.AddTransient<IAppOptionsProvider, CountryAppOptionsProvider>();
```

Legg merke til at du kan ha mange implementasjoner av dette interfacet. Den rette implementasjonen finnes gjennom å se på hvilken kodeliste id det spørres etter.

Interfacene har en egenskap `Id`, som skal settes til til den id'en man skal spørre etter, og en metode `GetAppOptionsAsync` som returnerer selve kodelisten. Denne metoden tar i mot språk og en liste med key/value par som typisk er query parametre som plukkes opp av kontrolleren og sendes inn. Selv om språk kunne vært et key/value par og sånn sett hvert i listen, så er denne lagt utenfor for å være eksplisitt på språk.

> Språkkoder bør baseres på ISO 639-1 standarden eller W3C IANA Language Subtag Registry standarden. Sistnevnte bygger på ISO 639-1 standarden men garanterer at alle kodene er unike, noe ISO 639-1 ikke gjør.
>

### Sikrede dynamiske kodelister

{{%notice warning%}}

**MERK:** for å benytte denne funksjonaliteten må man versjon >= 4.27.0 av nugetpakkene `Altinn.App.PlatformServices`, `Altinn.App.Common` og `Altinn.App.Api`.

{{%/notice%}}

Om du ønsker å eksponere kodelister som inneholder sensitive data som man ikke ønsker skal være tilgjengelige i et åpent API kan man benytte `IInstanceAppOptionsProvider`. Disse kodelistene validerer at brukeren har lesetilgang definert i applikasjonens `policy.xaml`-fil.
Under finner du et eksempel på man setter opp en sikret kodeliste. Interfacet `IInstanceAppOptionsProvider` må implementeres og en `secure` boolean må legges på komponenten.
Her vil man få ut den oppsatte kodelisten i det appen får et kall mot `/{org}/{app}/instances/{instanceOwnerId}/{instanceGUID}/options/children`.

```C#
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Common.Models;
using Altinn.App.PlatformServices.Models;

namespace Altinn.App.Core
{
    public class ChildrenAppOptionsProvider : IInstanceAppOptionsProvider
    {
        public string Id { get; set; } = "children";

        public Task<AppOptions> GetInstanceAppOptionsAsync(InstanceIdentifier instanceIdentifier, string language, Dictionary<string, string> keyValuePairs)
        {
            // ...
            // Some custom code to get the list of children from the instance owner
            // ...

            var options = new AppOptions
            {
                Options = new List<AppOption>
                    {
                        new AppOption
                        {
                            Label = "Ole",
                            Value = "1"
                        },
                        new AppOption
                        {
                            Label = "Dole",
                            Value = "2"
                        },
                        new AppOption
                        {
                            Label = "Doffen",
                            Value = "3"
                        }
                    }
            };

            return Task.FromResult(options);
        }
    }
}

```

For at denne implementasjonen skal plukkes opp av applikasjonen må den registreres i `Startup.cs` (eller `Program.cs` i .NET 6):

```csharp
services.AddTransient<IInstanceAppOptionsProvider, ChildrenAppOptionsProvider>();
```

Legg merke til at du kan ha mange implementasjoner av dette interfacet. Den rette implementasjonen finnes gjennom å se på hvilken kodeliste id det spørres etter.

Interfacene har en egenskap `Id`, som skal settes til til den id'en man skal spørre etter, og en metode `GetAppOptionsAsync` som returnerer selve kodelisten. Denne metoden tar i mot språk og en liste med key/value par som typisk er query parametre som plukkes opp av kontrolleren og sendes inn. Selv om språk kunne vært et key/value par og sånn sett hvert i listen, så er denne lagt utenfor for å være eksplisitt på språk.

Siste konfigurasjon som trengs er å legge til `secure`-boolean på den aktuelle komponenten. Eksempel:

```json {hl_lines=[13]}
      {
        "id": "dropdown-component",
        "type": "Dropdown",
        "textResourceBindings": {
          "title": "Some title",
          "description": "Some description"
        },
        "dataModelBindings": {
          "simpleBinding": "some.field"
        },
        "required": true,
        "optionsId": "children",
        "secure": true
      }
```

## Koble en komponent til kodeliste

Dette gjøres ved å legge til feltet optionsId som referer til hvilken option (kodeliste) man ønsker refere til. Eksempel:

```json
{
    "id": "8e6f7b2f-fcf0-438d-8336-c1a8e1e03f44",
    "type": "Dropdown",
    "componentType": 4,
    "textResourceBindings": {},
    "dataModelBindings": {},
    "optionsId": "biler",
}
```

## Sende med query parametere ved henting av options

Options støtter query parameters når det gjøres api kall. `language` er satt opp automatisk, men man kan også legge til egendefinerte parametere ved å sette opp `mapping` på den aktuelle komponenten.

```json
{
    "id": "c66d7b69-2e18-4786-af44-1fa913853618",
    "type": "Dropdown",
    "textResourceBindings": {
        "title": "NyGarantiLoyvetype"
    },
    "dataModelBindings": {
        "simpleBinding": "soknad.nyGaranti.loyvetype"
    },
    "required": true,
    "optionsId": "loyvetyper",
    "mapping": {
        "soknad.transportorOrgnummer": "orgnummer"
    }
},
```

I eksempelet over vil det bli satt på et query parameter `orgnummer={nr}`, hvor `{nr}` er verdien på feltet `soknad.transportorOrgnummer`.
Om man setter opp en kobling til et datafelt og dette feltet endrer seg så vil app-frontend hente options på nytt. På denne måten kan man dynamisk styre hvilke valg som vises basert på informasjon gitt av sluttbruker.

 Å sende med query parametere fra repeterende grupper er også støttet ved å legge ved en indeks-indikator for de relevante gruppene. Eksempel:

```json
      {
        "id": "dropdown-group",
        "type": "Dropdown",
        "textResourceBindings": {
          "title": "Select city"
        },
        "dataModelBindings": {
          "simpleBinding": "Group.City"
        },
        "required": true,
        "optionsId": "cities",
        "mapping": {
          "Group[{0}].Country": "country"
        }
      },
```

For nøsta repeterende grupper vil man følge det samme mønsteret, men med en ekstra indikator for den nøsta gruppa:

```json
      {
        "id": "dropdown-nested-group",
        "type": "Dropdown",
        "textResourceBindings": {
          "title": "Select city"
        },
        "dataModelBindings": {
          "simpleBinding": "Group.SubGroup.City"
        },
        "required": true,
        "optionsId": "cities",
        "mapping": {
          "Group[{0}].SubGroup[{1}].Country": "country"
        }
      },
```

For et komplett eksempel kan du se vår [demo app.](https://altinn.studio/repos/ttd/dynamic-options-rep)

{{%notice warning%}}
Under PDF-generering vil appen prøve å kalle det samme options-endepunktet som app-frontend gjør.
Vi har foreløpig en svakhet ved at eventuelle mapping-parametere ikke blir inkludert i denne forespørselen, se issue [#7903.](https://github.com/Altinn/altinn-studio/issues/7903)

En mulig workaround her er å returnere en tom array i det PDF-generatoren spør om options med tomme query-parametere, eksempel:

```c#
            string someArg = keyValuePairs.GetValueOrDefault("someArg");
            string someOtherArg = keyValuePairs.GetValueOrDefault("someOtherArg");

            if (string.IsNullOrEmpty(someArg) || string.IsNullOrEmpty(someOtherArg)) {
                return await Task.FromResult(new List<AppOption>());
            }
```

Merk at dette vil resultere i at PDF vil vise verdien valgt og ikke label som sluttbrukers svar.
{{% /notice%}}

## Options basert på repeterende grupper i datamodellen

Tradisjonelle options baserer seg på ressurser hentet fra backend.
Denne måten å gjøre ting på endrer seg litt på dette, da det muliggjør å sette opp en direkte kobling fra komponent til skjemadata som ligger lagret i app frontend.
Et typisk bruksområde for dette er om brukeren fyller ut en liste med data som man senere i skjema ønsker å kunne velge mellom i en nedtrekksliste eller liknende.

### Konfigurasjon

For å sette opp options fra datamodellen har vi laget en nytt objekt som kan brukes på komponentene `RadioButtons`, `Checkboxes` og `Dropdown` som vi har kalt `source`.
Dette nye objektet inneholder feltene `group`, `label` og `value`. Eksempel:

```json {hl_lines=["5-9"]}
      {
        "id": "dropdown-component-id",
        "type": "Dropdown",
        ...
        "source": {
          "group": "some.group",
          "label": "dropdown.label",
          "value": "some.group[{0}].someField"
        }
      },
```

Forklaring:

- **group** - gruppen i datamodellen man baserer options på.
- **label** - en referanse til en text id som brukes som label for hver iterasjon av gruppen. Se mer under.
- **value** - en referanse til det feltet i gruppen som skal bruke som option verdi. Legg merke til `[{0}]` syntaxen. Her vil `{0}` bli erstattet med den aktuelle indeksen for hvert element i gruppen.

Merk at **value** feltet må være unikt for hvert element. Om man ikke har et felt som er unik anbefales det å legge på et ekstra felt i datamodellen som kan benyttes som identifikator f.eks en GUID eller liknende.

For **label** feltet må vi definere en tekst ressurs som kan bli brukt som label for hver repetisjon av gruppen.
Dette følger samme syntax som **value**, og vil være kjent for deg om du har brukt [variabler i tekst](../../ux/texts).

Eksempel:

```json
{
  "language": "nb",
  "resources": [
    {
      "id": "dropdown.label",
      "value": "Person: {0}, Age: {1}",
      "variables": [
        {
          "key": "some.group[{0}].name",
          "dataSource": "dataModel.default"
        },
        {
          "key": "some.group[{0}].age",
          "dataSource": "dataModel.default"
        }
      ]
    }
  ]
}
```

I dette eksempelet har vi satt opp to parametere i teksten som refererer til felter i gruppen.
Vi kjenner også igjen `[{0}]` syntaksen i `key` feltet som muliggjør gjenbruk av labelen for hver index i gruppen.

## Options delt mellom flere apper (fra altinn 2)
Altinn 3 har foreløpig ikke noe system for å dele kodelister mellom ulike apper slik som det finnes i Altinn 2.
Hvis det er behov for enkel oppdatering av kodelister som deles mellom ulike apper er det mulig å koble til eksterne apier.
Altinn 2 har heldigvis et [API](https://altinn.github.io/docs/api/rest/metadata/#hente-oversikt-over-kodelister)
for kodelister som også kan nåes fra Altinn 3, og de kan registreres direkte i `Program.cs` om det er ønskelig.

```C#
using Altinn.App.Core.Features.Options;
...
services.AddAltinn2CodeList(
    id: "ASF_Land",
    transform: (code) => new (){ Value = code.Code, Label = code.Value1 }, 
    // filter: (code) => int.Parse(code.Value3) > 100,
    codeListVersion: 3994, // Optional (use latest version if missing)
    metadataApiId: "ASF_Land" // Code list name in Altinn 2 (use id if missing)
);
```
Det eneste som er påkrevd er `id` for hva kodelisten heter i Altinn 2, og `transform` for å fortelle hvilke kolonner du
ønsker å bruke som `Value` og `Label`. Oversetting fungerer automatisk. Etter versjon `v7.2.0` vil `nb` bli brukt om
listen manger språket brukeren har valgt. Om du ønsker to ulike transformasjoner av samme liste, blir `id` navnet
som brukes i Altinn 3 og `metadataApiId` brukes i oppslaget mot Altinn 2

Bruken er som alle andre kodelister der `id` kommer igjen som `optionsId` i komponenten.

```json
{
  "id": "landvelger",
  "type": "Dropdown",
  ...
  "optionsId": "ASF_Land"
},
```