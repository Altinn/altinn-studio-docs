---
draft: true
title: Dynamiske kodelister
linktitle: Dynamisk
description: Generert ved kjøring fra C#-kode
toc: false

tags: [needsReview, translate]
aliases:
  - /nb/altinn-studio/guides/development/options/dynamic-codelists
---

I en Altinn 3-app kan du lage dynamiske kodelister som genereres fortløpende ved kjøring av appen. Dette gjør det mulig å lage dynamiske verdier, for eksempel ved å hente og filtrere verdier fra andre kilder. Dynamiske kodelister kan enten være åpne (tilgjengelig for alle, uten autentisering), eller sikret slik at brukeren må ha tilgang til instansen for å hente kodelisten.

For åpne kodelister implementerer du `IAppOptionsProvider`-interfacet, mens for sikrede kodelister implementerer du `IInstanceAppOptionsProvider`. Fremgangsmåten er den samme for begge og modellen som returneres er lik. Hold implementeringen adskilt for ikke å eksponere kodelister som skulle vært sikret.

## Åpne kodelister

Under ser du et eksempel på hvordan du setter opp en åpen kodeliste.

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

Registrer implementasjonen i `Program.cs` slik at applikasjonen plukker den opp:

```C#
services.AddTransient<IAppOptionsProvider, CountryAppOptionsProvider>();
```

Implementasjonen blir tilgjengelig på endepunktet `{org}/{app}/api/options/countries`. Du kan bruke identifikatoren i komponenter. For å bruke kodelisten i en `Dropdown`-komponent, setter du `optionsId` som i følgende eksempel:

```json {hl_lines=[10]}
{
  "id": "dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "Some title"
  },
  "dataModelBindings": {
    "simpleBinding": "some.field"
  },
  "optionsId": "countries"
}
```

## Sikrede kodelister

Ønsker du å lage kodelister som inneholder sensitive data som ikke skal være tilgjengelige i et åpent API, kan du implementere `IInstanceAppOptionsProvider`. Slike sikrede kodelister kontrollerer at brukeren har lesetilgang som definert i applikasjonens `policy.xml`-fil før brukeren kan hente innholdet i kodelisten.
Under ser du et eksempel på hvordan du setter opp en sikret kodeliste.

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

Registrer implementasjonen i `Program.cs` slik at applikasjonen plukker den opp:

```C#
services.AddTransient<IInstanceAppOptionsProvider, ChildrenAppOptionsProvider>();
```

Implementasjonen blir tilgjengelig på endepunktet `{org}/{app}/instances/{instanceOwnerId}/{instanceGUID}/options/children`. Du kan bruke identifikatoren i komponenter. For å bruke kodelisten i en `Dropdown`-komponent, setter du `optionsId` som i følgende eksempel. Husk også å sette `secure`-egenskapen til `true` for å indikere at dette er en sikret kodeliste.

```json {hl_lines=["10-11"]}
{
  "id": "dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "Some title"
  },
  "dataModelBindings": {
    "simpleBinding": "some.field"
  },
  "optionsId": "children",
  "secure": true
}
```

## Spørringsparametre

Kodeliste-endepunktet du lager støtter spørringsparametre. Parameteren `language` sendes med automatisk, og du kan sende andre parametre fra komponentkonfigurasjonen. Du kan lese disse ut fra `keyValuePairs`-parameteren i implementasjonen. Dette er nyttig for å filtrere kodelisten basert på data i datamodellen, eller variere kodelisten basert på kontekst.

Tenk deg et skjema med to `Dropdown`-komponenter som er knyttet sammen. Den første lar brukeren velge et fylke, og den andre lar brukeren velge en kommune. Kommunene som vises i den andre komponenten skal være filtrert basert på fylket som er valgt i den første komponenten. Du løser dette ved å sende med fylket som et spørringsparameter til kodelisten for kommuner.

### Basert på uttrykk

{{%notice info%}}
Dynamiske parametre basert på uttrykk er tilgjengelig fra app-frontend versjon 4.9.0 eller høyere. Hvis appen din bruker den rullerende utgivelsen av hovedversjon 4, er dette allerede tilgjengelig.
{{% /notice%}}

Du kan legge til både statiske og dynamiske parametre ved å sette opp `queryParameters` på den aktuelle komponenten:

```json {hl_lines=["12-16"]}
{
  "id": "dropdown-komponent",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "NyGarantiLoyvetype"
  },
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype"
  },
  "required": true,
  "optionsId": "loyvetyper",
  "queryParameters": {
    "loyvetype": "garanti",
    "orgnummer": ["dataModel", "soknad.transportorOrgnummer"],
    "myndig": ["greaterThanEq", ["dataModel", "soknad.alder"], 18]
  }
}
```

I eksempelet over vil parameteret `loyvetype=garanti` alltid bli sendt med (dette er helt statisk og vil ikke endre seg). Parameteret `orgnummer={nr}` vil bli sendt med, hvor `{nr}` er verdien på feltet `soknad.transportorOrgnummer` i datamodellen. Parameteret `myndig={bool}` vil bli sendt med, hvor `{bool}` blir enten `true` eller `false` basert på om verdien på feltet `soknad.alder` er større enn eller lik 18.

Flere eksempler på uttrykk finner du i [dokumentasjonen for dynamikk](/nb/altinn-studio/v8/guides/development/dynamics/), og den fullstendige oversikten over tilgjengelige funksjoner finner du i [referanseoversikten over uttrykk](/nb/altinn-studio/v8/reference/logic/expressions/).

### Basert på datamodellen

{{%notice warning%}}
Vi fraråder denne tilnærmingen. Fra og med app-frontend versjon 4.9.0 kan du bruke `queryParameters`-egenskapen i stedet. Som beskrevet ovenfor, lar denne egenskapen deg legge til både statiske og dynamiske spørringsparametre ved hjelp av uttrykk - noe som gjør dem mer fleksible enn `mapping`.

`mapping`-egenskapen blir fjernet på et tidspunkt, men når det skjer vil du få verktøy for å migrere eksisterende konfigurasjoner til å bruke `queryParameters` i stedet.
{{% /notice%}}

Du kan legge til dynamiske parametre ved å sette opp `mapping` på den aktuelle komponenten:

```json {hl_lines=["12-14"]}
{
  "id": "dropdown-komponent",
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
}
```

I eksempelet over blir parameteren `orgnummer={nr}` sendt med. `{nr}` er verdien på feltet `soknad.transportorOrgnummer`.
Når du setter opp en kobling til et datafelt og dette feltet endrer seg, henter appen kodelisten på nytt. På denne måten kan du dynamisk styre hvilke valg som vises basert på informasjon gitt av sluttbrukeren.

Når du sender med parametre fra repeterende grupper, legger du ved en indeks-indikator for de relevante gruppene. Eksempel:

```json {hl_lines=[13]}
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
}
```

For nøstede repeterende grupper følger du det samme mønsteret, men med en ekstra indikator for den nøstede gruppa:

```json {hl_lines=[13]}
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
}
```

For et komplett eksempel kan du se vår [demo app.](https://altinn.studio/repos/ttd/dynamic-options-rep)


## Lurt å tenke på

- Metoden `GetAppOptionsAsync` får inn en språkkode i parameteren `language`. Språkkoder bør baseres på ISO 639-1 standarden eller W3C IANA Language Subtag Registry standarden. Sistnevnte bygger på ISO 639-1 standarden men garanterer at alle kodene er unike, noe ISO 639-1 ikke gjør.
- En app kan ha mange implementasjoner av disse interfacene, en for hver kodeliste. Den rette implementasjonen finnes gjennom å se på hvilken kodeliste-identifikator det spørres etter, og sammenlignes med `Id`-egenskapen i implementasjonen. Dette er også identifikatoren som brukes i `optionsId`-egenskapen i komponentkonfigurasjonen. Dermed må også `Id`-egenskapen i implementasjonen være unik per app.
- Det kan være fristende å sette opp en dynamisk og sikret kodeliste hvor du henter ut data fra datamodellen og produserer kodelisten basert på dette. Vi anbefaler ikke dette, da appens frontend bare henter kodelisten én gang for hvert unike sett med spørringsparametre. Det betyr at visningen av kodelisten ikke oppdaterer seg i tråd med endringene i datamodellen.
    - Et alternativ er å bruke funksjonaliteten for [dynamiske kodelister basert på datamodell](/nb/altinn-studio/v8/guides/development/options/sources/from-data-model/), i noen tilfeller sammen med tilsvarende kode i [DataProcessor](/nb/altinn-studio/v8/reference/logic/dataprocessing/).
    - Et annet alternativ kan være å bruke spørringsparametre, som beskrevet over.
- Når du bruker spørringsparametre, kan det være lurt å tenke gjennom hvor mange unike kombinasjoner av parametre som typisk blir brukt i appen. Hvis det er mange, kan du vurdere å bruke en annen tilnærming, som for eksempel å hente ut all data og filtrere gyldige alternativer i frontend ved hjelp av [`optionFilter`](/nb/altinn-studio/v8/guides/development/options/functionality/filtering/). Mange ulike kombinasjoner av spørringsparametre kan føre til at appen må gjøre mye unødvendig arbeid for å hente kodelisten på nytt hver gang brukeren gjør en endring i skjemaet.
