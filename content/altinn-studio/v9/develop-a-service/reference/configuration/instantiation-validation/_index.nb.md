---
title: Lage egne regler for å starte appen
linktitle: Egne regler for oppstart
description: Slik lager du egne regler som avgjør om brukeren kan starte appen.
toc: true
tags: [needsReview]
---

I tillegg til å velge aktørtyper under **Innstillinger** → **Oppstartskontroll** kan du lage egne regler i koden, for eksempel at brukerne bare kan starte appen i en bestemt periode.

## Når regelen kjører

Appen kjører regelen

- når brukeren starter appen og appen oppretter en ny instans
- når brukeren starter en instans fra en [stateless visning]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/stateless#starte-instans-fra-et-stateless-skjema" >}})
- når brukeren lager en kopi av en instans fra innboksen
- når tjenesteeieren eller et system oppretter en instans via API-et

Når brukeren lager en kopi fra innboksen, kontrollerer ikke appen aktørtypene. Appen kjører først regelen din, og deretter [`ICopyInstanceValidator`]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/messagebox/create-copy" >}}) hvis du har registrert den. Stopper en av dem kopien, viser appen meldingen fra den regelen.

Appen bruker bare én regel. Registrerer du flere, er det den siste som gjelder.

## Lage en regel

1. Lag en klasse som implementerer `IInstantiationValidator`. Returner `null` når brukeren kan starte appen. Når brukeren ikke kan det, returnerer du et `InstantiationValidationResult` med `Valid = false` og en melding.
2. Registrer klassen i `RegisterCustomAppServices` i `App/Program.cs`.

### Eksempel: bare i en bestemt periode

Regelen lar brukerne starte appen i januar 2027, etter norsk tid.

{{< code-title >}}
App/logic/OpeningPeriodValidator.cs
{{< /code-title >}}

```csharp
using Altinn.App.Core.Features;
using Altinn.App.Core.Models.Validation;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.logic;

public class OpeningPeriodValidator : IInstantiationValidator
{
    private static readonly TimeZoneInfo NorwegianTime = TimeZoneInfo.FindSystemTimeZoneById("Europe/Oslo");
    private static readonly DateTime OpensAt = new(2027, 1, 1);
    private static readonly DateTime ClosesAt = new(2027, 2, 1);

    public Task<InstantiationValidationResult?> Validate(Instance instance)
    {
        DateTime now = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, NorwegianTime);

        if (now < OpensAt)
        {
            return Task.FromResult<InstantiationValidationResult?>(
                new() { Valid = false, Message = "Du kan starte tjenesten fra 1. januar 2027." }
            );
        }

        if (now >= ClosesAt)
        {
            return Task.FromResult<InstantiationValidationResult?>(
                new() { Valid = false, Message = "Fristen for å starte tjenesten var 31. januar 2027." }
            );
        }

        return Task.FromResult<InstantiationValidationResult?>(null);
    }
}
```

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp
using Altinn.App.logic;

// ...

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddTransient<IInstantiationValidator, OpeningPeriodValidator>();
}
```

### Eksempel: bare tjenesteeieren

Regelen lar bare tjenesteeieren starte appen, for eksempel når tjenesteeieren oppretter instanser via API-et. Bytt ut ttd i eksempelet under med koden til virksomheten din.

{{< code-title >}}
App/logic/ServiceOwnerOnlyValidator.cs
{{< /code-title >}}

```csharp
using Altinn.App.Core.Features;
using Altinn.App.Core.Features.Auth;
using Altinn.App.Core.Models.Validation;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.logic;

public class ServiceOwnerOnlyValidator(IAuthenticationContext authenticationContext) : IInstantiationValidator
{
    public Task<InstantiationValidationResult?> Validate(Instance instance)
    {
        if (authenticationContext.Current is Authenticated.ServiceOwner { Name: "ttd" })
        {
            return Task.FromResult<InstantiationValidationResult?>(null);
        }

        return Task.FromResult<InstantiationValidationResult?>(
            new() { Valid = false, Message = "Bare tjenesteeieren kan starte denne tjenesten." }
        );
    }
}
```

Siden om [autentisering]({{< relref "/altinn-studio/v9/develop-a-service/reference/api/auth" >}}) har et eksempel på en regel som bare slipper inn brukere som er logget inn i Altinn-portalen.

## Meldingen på flere språk

Vil du at meldingen skal følge språket til brukeren, bruker du `CustomTextKey` i stedet for `Message`. Appen henter da teksten fra tekstressursene. Med `CustomTextParameters` kan du sette inn verdier i teksten. Les mer om [variabler i tekster]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/tekster" >}}).

{{< code-title >}}
App/logic/OpeningPeriodValidator.cs
{{< /code-title >}}

```csharp
return Task.FromResult<InstantiationValidationResult?>(
    new()
    {
        Valid = false,
        CustomTextKey = "instantiation.closed",
        CustomTextParameters = new() { ["deadline"] = "31.01.2027" },
    }
);
```

{{< code-title >}}
App/config/texts/resource.nb.json
{{< /code-title >}}

```json
{
  "id": "instantiation.closed",
  "value": "Fristen for å starte tjenesten var {0}.",
  "variables": [
    {
      "key": "deadline",
      "dataSource": "customTextParameters"
    }
  ]
}
```

Legg inn teksten med samme nøkkel i ressursfilen for hvert språk appen støtter, for eksempel `resource.nn.json` og `resource.en.json`.

## Hva brukeren ser

- **Når brukeren starter appen direkte**, viser appen en egen feilside med overskriften «Du kan ikke starte denne tjenesten», meldingen din og telefonnummeret til brukerservice i Altinn.
- **Når brukeren starter en instans fra en stateless visning**, blir brukeren værende på siden, og appen viser meldingen i en feilrapport.
- **Når brukeren lager en kopi fra innboksen**, viser appen en enkel side med meldingen.
- **Via API-et** svarer appen med `403 Forbidden` og resultatet fra regelen som JSON.
