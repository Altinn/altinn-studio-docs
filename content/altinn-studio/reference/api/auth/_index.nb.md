---
title: Autentisering
linktitle: Autentisering
description: Når det gjelder autentisering er det noen konfigurasjoner som kan være aktuell
weight: 800
toc: true
tags:
---

Appens APIer er autentisert ved hjelp av [Altinn Autentisering](/nb/authentication).
Requests mot APIer atentiseres ved å se etter

* `AltinnStudioRuntime` cookie
* `Authorization` header

## Innloggingsmetoder

Altinn Autentisering støtter forskjellige type brukere, som er viktig å tenke på når man utvikler custom funksjonalitet i en app.

* **Brukere**
  * Kan være logget inn via Altinn Portal eller gjennom en ekstern IDporten klient. 
  * Disse har User ID, Party ID og brukerprofil. Autentiseringsnivå er alltid større enn 0.
  * Brukere kan representere andre parter gjennom partseleksjon.
  * IDporten token må være vekslet inn til Altinn token via Altinn Autentisering.
* **Selvidentifiserte brukere**
  * Kan være logget inn via Altinn Portal eller gjennom en ekstern IDporten klient. 
  * Disse har User ID, Party ID og brukerprofil. Autentiseringsnivå er alltid 0 (vi vet ikke hvem brukeren er).
  * Kan ikke representere andre enn seg selv, og vi har ikke noe SSN.
  * IDporten token må være vekslet inn til Altinn token via Altinn Autentisering.
* **Organisasjon**
  * Klienter autentisert via Maskinporten. 
  * Gjelder organisasjoner som har avtale med og tilgang til Maskinporten. 
  * Maskinporten token må være vekslet inn til Altinn token.
  * Kan ikke brukes til stort i en Altinn app, da de ikke er en gyldig avgiver (en organisasjon kan ikke sende inn på vegne av seg selv).
* **Tjenesteeier**
  * Klienter autentisert via Maskinporten.
  * Gjelder organisasjoner som er registrert som tjenesteeier i Altinn (og eier av appen som kjører), som også har bedt om et tjenesteeier scope ved autentisering i Maskinporten (`altinn:serviceowner`
  * Maskinporten token må være vekslet inn til Altinn token.
  * Tjenesteeier er ikke en gyldig avgiver, men avhengig av XACML policy så kan tjenesteeiere instansiere og endre instanser.
* **Systembruker**
  * Klienter autentisert via Maskinporten.
  * En systembruker eies av en organisasjon som er kunde/bruker hos et leverandørsystem. Systembrukeren eies av kunden, mens systemet eies av leverandøren.
  * Det er leverandøren som har Maskinporten klienten og som autentiserer seg. Konseptet lar systemet impersonere systembrukeren (inkl. rettigheter systembrukeren har fått delegert fra kunden)
  * Appens API aksepterer både innvekslet Altinn token og Maskinporten token direkte

## Informasjon i appen

`Altinn.App.Core`-biblioteket har abstraksjoner for å hente ut informasjon om innlogget bruker.
Som standard er det ingen begrensninger på hvilke brukertyper en app tar i mot, men man kan begrense dette selv i et middleware eller en validator.
Før `v8.6` av app bibliotekene var det vanlig å f. eks. hente bruker-ID direkte fra `HttpContext`, 
men dette kan gi uventet resultat hvis innkommende request er autentisert med f. eks. systembruker.

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

Interfacet `IAuthenticationContext` kan brukes i custom kode til å sjekke hva slags bruker som er logget inn, og hvilke informasjon
som er assosiert med denne. Her er eksempel på en implementasjon av `IInstantiationValidator` som bare tillater
instansiering av brukere innlogget via Altinn portal:

{{% notice info %}}
`IAuthenticationContext.Current` bruker informasjon om innlogget bruker fra ASP.NET Core sin authentication stack.
Det vil si at ASP.NET Core auth middleware må ha kjørt for at man skal få riktig informasjon.
Middleware for auth legges til i `UseAltinnAppCommonConfiguration`. Så hvis man skal akssessere `IAuthenticationContext.Current`
i et ASP.NET Core middleware så må denne legges til **etter** at `UseAltinnAppCommonConfiguration` har blitt kalt.
Alle interfaces som implementeres i en app, slik som `IInstantiationValidator` i eksempelet under, kjører på et tidspunkt
hvor autentiseringsinformasjonen er tilgjengelig, så der er det helt trygt.
{{% /notice %}}

```csharp
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Features.Auth;
using Altinn.App.Core.Models.Validation;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Core;

internal sealed class ValidateInstanstiation(IAuthenticationContext authenticationContext) : IInstantiationValidator
{
    public Task<InstantiationValidationResult?> Validate(Instance instance)
    {
        var current = authenticationContext.Current;

        switch (current)
        {
            case Authenticated.User user:
                if (!user.InAltinnPortal)
                {
                    return Task.FromResult<InstantiationValidationResult?>(
                        new()
                        {
                            Message = "Du må være logget inn i Altinn portal for å opprette en ny instans",
                            Valid = false,
                        }
                    );
                }
                return Task.FromResult<InstantiationValidationResult?>(null);
            default:
                return Task.FromResult<InstantiationValidationResult?>(
                    new()
                    {
                        Message = "Dette skjemaet støtter bare brukerinnlogging via Altinn portalen",
                        Valid = false,
                    }
                );
        }
    }
}
```

