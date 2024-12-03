---
title: Dynamiske kodelister generert under kjøring av applikasjonen
linktitle: Dynamiske kodelister
description: Hvordan lage dynamiske kodelister som bygges opp når applikasjonen kjører?
toc: false
weight: 100
---

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

For at denne implementasjonen skal plukkes opp av applikasjonen må den registreres i `Program.cs`:

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
