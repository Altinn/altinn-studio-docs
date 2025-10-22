---
title: Forhåndsutfylle data automatisk - egendefinert kode
linktitle: Egendefinert kode
description: Slik setter du opp automatisk utfylling av skjemadata med din egen kode.
tags: [needsReview, needsTranslation]
toc: false
weight: 300
---

## Hva gjør denne funksjonen?

Du kan lage din egen kode for å fylle ut deler av skjemaet automatisk før brukeren begynner. Dette gir deg mer fleksibilitet enn den vanlige konfigurasjonsfilen. Du kan for eksempel:
- Hente data fra et API
- Gjøre beregninger
- Bruke annen logikk du selv bestemmer

## Når bør jeg bruke dette?
Hvis du har behov for kilder utover de som er tilgjengelige via [konfigurasjonsbasert oppsett](/nb/altinn-studio/v8/guides/development/prefill/config/), eller har behov for annen logikk som del av forhåndsutfyllingen.

## Slik setter du det opp

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v7">}}

I versjon 7 bruker vi [dependency injection](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection) for egendefinert forhåndsutfylling.

### 1. Lag en ny klasse

Opprett en ny fil i app-prosjektet ditt. Du kan velge navn og plassering selv, men bruk fornuftige navnerom. 
F.eks. `Altinn.App.Logic.Instantiation` eller lignende.

Klassen må implementere `IInstantiationProcessor`-grensesnittet fra `Altinn.App.Core.Features`.

### 2. Skriv koden for automatisk utfylling

Implementer `DataCreation`-metoden i den nye klassen. I denne metoden setter du opp hvilke felt som skal fylles ut automatisk, og hvilken verdi de skal få.
Her kan du for eksempel gjøre kall for å hente data fra en ekstern kilde, gjøre beregninger eller annen relevant logikk.

Se under for eksempler.

### 3. Registrer klassen din

Åpne `Program.cs` og legg til denne linjen:

```csharp
services.AddTransient<IInstantiationProcessor, MinUtfylling>();
```

{{</content-version-container>}}

{{<content-version-container version-label="v4, v5, v6">}}

For versjon 4, 5 og 6 implementeres egendefinert forhåndsutfylling i `InstantiationHandler.cs`.

### 1. Finn riktig fil

Gå til mappen `App/logic` i app-prosjektet ditt og åpne filen `InstantiationHandler.cs`.

### 2. Implementer DataCreation-metoden

Skriv koden din i `DataCreation`-metoden. Her setter du opp hvilke felt som skal fylles ut automatisk, og hvilken verdi de skal få.
Her kan du for eksempel gjøre kall for å hente data fra en ekstern kilde, gjøre beregninger eller annen relevant logikk.

Se under for eksempler.

{{</content-version-container>}}

{{</content-version-selector>}}

## Eksempler

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v7">}}

### Eksempel: Hent organisasjonsnummer og navn fra Enhetsregisteret

Dette fyller ut feltet `Organisasjon.Orgnr` med et egendefinert organisasjonsnummer:

*Merk at feltnavnene her kun er tenkte eksempler, tilpass til dine behov/data.*

```csharp {hl_lines=[17,18]}
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Models;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Logic.Instantiation;

public class MinUtfylling : IInstantiationProcessor
{
    public async Task DataCreation(Instance instance, object data, Dictionary<string, string> prefill)
    {
        if (data is Datamodell skjema)
        {
            skjema.Organisasjon = new Organisasjon
            {
                OrgNr = "987654321",
                Navn = "TestOrganisasjon"
            };
        }

        await Task.CompletedTask;
    }
}
```

### Eksempel: Hent personnummer og navn fra Folkeregisteret

Dette fyller ut feltet `Person.Personnr` med personnummer og feltet `Person.Navn` med navn.

*Merk at feltnavnene her kun er tenkte eksempler, tilpass til dine behov/data.*

```csharp {hl_lines=[17,18]}
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Models;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Logic.Instantiation;

public class MinUtfylling : IInstantiationProcessor
{
    public async Task DataCreation(Instance instance, object data, Dictionary<string, string> prefill)
    {
        if (data is Datamodell skjema)
        {
            skjema.Person = new Person
            {
                Personnr = "11223345678",
                Navn = "Test Testesen"
            };
        }

        await Task.CompletedTask;
    }
}
```


{{</content-version-container>}}

{{<content-version-container version-label="v4, v5, v6">}}

### Eksempel: Hent organisasjonsnummer og navn fra Enhetsregisteret

Dette fyller ut feltet `Organisasjon.Orgnr` med egendefinert organisasjonsnummer:

*Merk at feltnavnene her kun er tenkte eksempler, tilpass til dine behov/data.*

```csharp {hl_lines=[7,8]}
public async Task DataCreation(Instance instance, object data)
{
    if (data is Datamodell skjema)
    {
        skjema.Organisasjon = new Organisasjon
        {
            OrgNr = "987654321",
            Navn = "TestOrganisasjon"
        };
    }
}
```

### Eksempel: Eksempel: Sett personnummer og navn

Dette fyller ut feltet `Person.Personnr` med personnummer og feltet `Person.Navn` med navn.

*Merk at feltnavnene her kun er tenkte eksempler, tilpass til dine felter/data.*

```csharp {hl_lines=[7,8]}
    public async Task DataCreation(Instance instance, object data)
{
    if (data is Datamodell skjema)
    {
        skjema.Person = new Person
        {
            Personnr = "11223345678",
            Navn = "Test Testesen"
        };
    }
}
```

{{</content-version-container>}}

{{</content-version-selector>}}

## Tips
- Du kan gjøre oppslag mot eksterne kilder for å hente inn data som så kan brukes til forhåndsutfylling.
- Husk at alle navn/felter i eksemplene må byttes ut med navn på klassen/feltene for din datamodell.
- Bruk en god kodeeditor for å få hjelp med å finne riktige feltnavn (intellisense).
- Husk å opprette objekter for komplekse typer før du fyller ut underelementer.