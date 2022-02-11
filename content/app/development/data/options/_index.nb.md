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

For at denne implementasjonen skal plukkes opp av applikasjonen må den registreres i `Startup.cs`:
```csharp
services.AddTransient<IAppOptionsProvider, CountryAppOptionsProvider>();
```

Legg merke til at du kan ha mange implementasjoner av dette interfacet. Den rette implementasjonen finnes gjennom å se på hvilken kodeliste id det spørres etter.

Interfacene har en egenskap `Id`, som skal settes til til den id'en man skal spørre etter, og en metode `GetAppOptionsAsync` som returnerer selve kodelisten. Denne metoden tar i mot språk og en liste med key/value par som typisk er query parametre som plukkes opp av kontrolleren og sendes inn. Selv om språk kunne vært et key/value par og sånn sett hvert i listen, så er denne lagt utenfor for å være eksplisitt på språk.


> Språkkoder bør baseres på ISO 639-1 standarden eller W3C IANA Language Subtag Registry standarden. Sistnevnte bygger på ISO 639-1 standarden men garanterer at alle kodene er unike, noe ISO 639-1 ikke gjør.
> 

### Sikrede dynamiske kodelister
Under finner du et eksempel på man setter opp en sikret kodeliste. Her vil man få ut den oppsatte kodelisten i det appen får et kall mot `/{org}/{app}/instances/{instanceOwnerId}/{instanceGUID}/options/children`.

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

For at denne implementasjonen skal plukkes opp av applikasjonen må den registreres i `Startup.cs`:
```csharp
services.AddTransient<IInstanceAppOptionsProvider, ChildrenAppOptionsProvider>();
```

Legg merke til at du kan ha mange implementasjoner av dette interfacet. Den rette implementasjonen finnes gjennom å se på hvilken kodeliste id det spørres etter.

Interfacene har en egenskap `Id`, som skal settes til til den id'en man skal spørre etter, og en metode `GetAppOptionsAsync` som returnerer selve kodelisten. Denne metoden tar i mot språk og en liste med key/value par som typisk er query parametre som plukkes opp av kontrolleren og sendes inn. Selv om språk kunne vært et key/value par og sånn sett hvert i listen, så er denne lagt utenfor for å være eksplisitt på språk.


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
Disse parameterne må settes under instansiering for at de skal bli med. [Vi jobber med å forbedre dette](https://github.com/Altinn/altinn-studio/issues/7888) slik at options kan oppdateres dynamisk f.ex ved endring av andre felter.
