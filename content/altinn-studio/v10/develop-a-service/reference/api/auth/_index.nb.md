---
draft: true
title: Autentisering
description: Autentiseringsmetoder for API-er
weight: 800
toc: true
tags: [needsReview]
---

Appens API-er er tilgangsstyrt ved hjelp av [Altinn Autorisasjon](/nb/authorization/).
API-kall autoriseres ved hjelp av følgende informasjon:

- `AltinnStudioRuntime` cookie
- `Authorization` header

## Innloggingsmetoder

Altinn Autorisasjon støtter ulike typer brukere. Dette er viktig å vite om når du utvikler egendefinert funksjonalitet i en app.

- **Brukere**
  - Brukere kan være logget inn via Altinn-portalen eller gjennom en ekstern ID-porten-sesjon.
  - Disse har bruker-ID, part-ID og brukerprofil. Autentiseringsnivå er alltid større enn 0.
  - Brukere kan representere andre parter gjennom partsvalg.
  - ID-porten-token må være vekslet inn til Altinn-token via Altinn Autorisasjon.
- **Organisasjon**
  - Klienter autentisert via Maskinporten.
  - Gjelder organisasjoner som har avtale med, og tilgang til, Maskinporten.
  - Maskinporten-token må være vekslet inn til Altinn-token.
  - Kan ikke brukes til mye i en Altinn-app, da de ikke er en gyldig avgiver (en organisasjon kan ikke sende inn på vegne av seg selv).
- **Tjenesteeier**
  - Klienter autentisert via Maskinporten.
  - Gjelder organisasjoner som er registrert som tjenesteeier i Altinn (og eier av appen som kjører), som også har bedt om et tjenesteeier-scope ved autentisering i Maskinporten (`altinn:serviceowner`).
  - Maskinporten-token må være vekslet inn til Altinn-token.
  - Tjenesteeier er ikke en gyldig avgiver, men avhengig av XACML-policy kan tjenesteeiere starte nye instanser og endre data i eksisterende instanser.
- **Systembruker**
  - Klienter autentisert via Maskinporten.
  - En systembruker eies av en organisasjon som er kunde/bruker hos et leverandørsystem. Systembrukeren eies av kunden, mens systemet eies av leverandøren.
  - Leverandøren har Maskinporten-klienten og autentiserer seg. Konseptet lar systemet opptre på vegne av systembrukeren (inkludert rettigheter systembrukeren har fått delegert fra kunden).
  - Appens API aksepterer bare Maskinporten-tokens som har blitt innvekslet til Altinn-token (i fremtiden vil vi støtte Maskinporten-tokens direkte).

{{% notice warning %}}
Virksomhetsbrukere fra Altinn 2 er bare delvis støttet i Altinn 3. Autentisering og autorisasjon vil fungere, men det kan være
mangler i andre deler av plattformen. Virksomhetsbrukere klassifiseres som `Organisasjon` fra listen over.
Det finnes ingen innebygd sperrefunksjon for disse brukerne. Hvis du ønsker å blokkere forespørsler fra virksomhetsbrukere i appen,
må du gjøre dette manuelt, for eksempel ved hjelp av ASP.NET Core-mellomvare.
{{% /notice %}}

## Informasjon i appen

`Altinn.App.Core`-biblioteket har grensesnitt for å hente ut informasjon om innlogget bruker.
Som standard er det ingen begrensninger på hvilke brukertyper en app tar imot, men du kan begrense dette selv i en mellomvare eller en validator.
Før `v8.6` av app-bibliotekene var det vanlig å f.eks. hente bruker-ID direkte fra `HttpContext`,
men dette kan gi uventet resultat hvis innkommende forespørsel er autentisert med f.eks. systembruker.

Fra `v8.6` av `Altinn.App.Core` finnes `IAuthenticationContext`- og `Authenticated`-typene:

```csharp
namespace Altinn.App.Core.Features.Auth;

public interface IAuthenticationContext
{
    Authenticated Current { get; }
}

...

public abstract class Authenticated
{
    public sealed class User : Authenticated { ... }
    public sealed class SelfIdentifiedUser : Authenticated { ... }
    public sealed class Org : Authenticated { ... }
    public sealed class ServiceOwner : Authenticated { ... }
    public sealed class SystemUser : Authenticated { ... }
}
```

Grensesnittet `IAuthenticationContext` kan brukes i egendefinert kode til å sjekke hva slags bruker som er logget inn, og hvilken informasjon som er knyttet til denne.

## Begrens tilgang

Apper har ulike behov for tilgang. I noen tilfeller ønsker du å begrense bruk av et skjema til spesifikke autentiseringsmetoder.
Det finnes ingen innebygd konfigurasjon for å begrense tilgang basert på autentiseringsmetoder i en app ennå, men det vurderes fortløpende.

{{% notice info %}}
`IAuthenticationContext.Current` bruker informasjon om innlogget bruker fra ASP.NET Core sin authentication stack.
Det vil si at ASP.NET Core-mellomvaren for autentisering må ha kjørt for at du skal få riktig informasjon.
Mellomvaren for autentisering legges til i `UseAltinnAppCommonConfiguration`. Så hvis du skal bruke `IAuthenticationContext.Current`
i en ASP.NET Core-mellomvare, må denne legges til **etter** at `UseAltinnAppCommonConfiguration` har blitt kalt.
Alle grensesnitt som implementeres i en app, slik som `IInstantiationValidator` i eksempelet under, kjører på et tidspunkt
hvor autentiseringsinformasjonen er tilgjengelig, så der er det trygt.
{{% /notice %}}

### ✅ Altinn-portalbrukere

Her er et eksempel på hvordan du implementerer `IInstantiationValidator` for å bare tillate
instansiering for brukere som er innlogget via Altinn-portalen:

```csharp
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Features.Auth;
using Altinn.App.Core.Models.Validation;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Core;

internal sealed class ValidateInstantiation(IAuthenticationContext authenticationContext) : IInstantiationValidator
{
    public Task<InstantiationValidationResult?> Validate(Instance instance)
    {
        var authenticated = authenticationContext.Current;

        switch (authenticated)
        {
            case Authenticated.User user:
                if (!user.InAltinnPortal)
                {
                    return Task.FromResult<InstantiationValidationResult?>(
                        new()
                        {
                            Message = "Du må være logget inn i Altinn-portalen for å opprette en ny instans",
                            Valid = false,
                        }
                    );
                }
                return Task.FromResult<InstantiationValidationResult?>(null);
            default:
                return Task.FromResult<InstantiationValidationResult?>(
                    new()
                    {
                        Message = "Dette skjemaet støtter bare brukerinnlogging via Altinn-portalen",
                        Valid = false,
                    }
                );
        }
    }
}
```

Du kan gjøre den samme autoriseringen globalt ved hjelp av ASP.NET Core-mellomvare:

{{% notice info %}}
Merk at denne varianten også blokkerer uautentiserte forespørsler.
{{% /notice %}}

```csharp
WebApplication app = builder.Build();

...

app.UseAltinnAppCommonConfiguration();

app.Use(
    async (context, next) =>
    {
        var authenticationContext = context.RequestServices.GetRequiredService<IAuthenticationContext>();
        var authenticated = authenticationContext.Current;
        if (authenticated is not Authenticated.User { InAltinnPortal: true })
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsJsonAsync(
                new ProblemDetails
                {
                    Title = "Ikke tillatt",
                    Detail = "Dette skjemaet kan kun fylles ut av en bruker i Altinn-portalen",
                    Status = StatusCodes.Status403Forbidden
                }
            );
            return;
        }

        await next(context);
    }
);
```

### ✅ Systembrukere

I dette eksempelet tillater vi bare forespørsler fra systembrukere:

{{% notice info %}}
Merk at denne varianten også blokkerer uautentiserte forespørsler.
{{% /notice %}}

```csharp
WebApplication app = builder.Build();

...

app.UseAltinnAppCommonConfiguration();

app.Use(
    async (context, next) =>
    {
        var authenticationContext = context.RequestServices.GetRequiredService<IAuthenticationContext>();
        var authenticated = authenticationContext.Current;
        if (authenticated is not Authenticated.SystemUser)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsJsonAsync(
                new ProblemDetails
                {
                    Title = "Ikke tillatt",
                    Detail = "Denne appen kan bare brukes som systembruker",
                    Status = StatusCodes.Status403Forbidden
                }
            );
            return;
        }

        await next(context);
    }
);
```

### ❌ Virksomhetsbrukere

I dette eksempelet sperrer vi ute virksomhetsbrukere fra Altinn 2:

{{% notice info %}}
Disse tokenene vil kunne eksistere frem til Altinn 2 er fullstendig faset ut.
{{% /notice %}}

```csharp
WebApplication app = builder.Build();

...

app.UseAltinnAppCommonConfiguration();

app.Use(
    async (context, next) =>
    {
        var authenticationContext = context.RequestServices.GetRequiredService<IAuthenticationContext>();
        var authenticated = authenticationContext.Current;
        if (authenticated is Authenticated.Org)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsJsonAsync(
                new ProblemDetails
                {
                    Title = "Ikke tillatt",
                    Detail = "Virksomhetsbrukere er ikke tillatt i denne appen",
                    Status = StatusCodes.Status403Forbidden
                }
            );
            return;
        }

        await next(context);
    }
);
```
