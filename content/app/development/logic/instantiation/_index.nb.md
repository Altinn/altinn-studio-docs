---
title: Instansiering
description: Hvordan legge til logikk som skal kjøres ved instansiering?
toc: true
---

## Introduksjon

Applikasjonslogikk knyttet til instansiering kan defineres ved å implmentere interfaces og registrere dem i `Program.cs`

 - `IInstantiationValidator` - lag egne sjekker for å avgjøre om en bruker/avgiver får lov til å instansiere.
 - `IInstantiationProcessor` - lag tilpasset prefill data, dette er beskrevet i [prefill kapitlet](/nb/app/development/data/prefill/custom/).

## Egendefinerte valideringsregler for instansiering
Valideringsregler for instansiering kan innebære å validere tidspunkt til spesifikke brukerrestriksjoner og komplekse sjekker som krever eksterne API-kall.


### Eksempel 1 - Insansiering kun tillatt før kl 15:00 på en gitt dag

```C# {hl_lines=[12]}
namespace Altinn.App.Logic;

using Altinn.App.Core.Features;
using Altinn.App.Core.Models.Validation;
using Altinn.Platform.Storage.Interface.Models;

public class InstantiationValidatorExample1 : IInstantiationValidator
{
    public Task<InstantiationValidationResult?> Validate(Instance instance)
    {
        DateTime now = DateTime.Now;
        if (now.Hour < 15)
        {
            return new InstantiationValidationResult()
            {
                Valid = false,
                Message = "ERROR: Instantiation not possible before 3PM."
            };
        }

        return null;
    }
}
```
I `Program.cs` må tjenesten registreres med
```C#
services.AddTransient<IInstantiationValidator, InstantiationValidatorExample1>()
```

### Eksempel 2 - Instansiering kun tillatt for applikasjonseier
For å kunne begrense instansiering til en gitt entitet, i dette tilfellet applikasjonseier,
må det hentes inn ekstra tjensester for å brukes ved valideringen.

For å validere instansieringen kan man sjekke ett av to claims i konteksten.
Enten organisasjonsen trebokstavsforkortelse eller organisasjonsnummeret.
Eksempelet nedenfor bruker organisasjonsforkortelsen. 

For å validere basert på organisasjonsnummer kan du følge eksempelet nedenfor,
og bytte ut *AltinnCoreClaimTypes&#46;Org* med *AltinnCoreClaimTypes.OrgNumber*.  
om må gjøres i denne file ser du nedenfor.


```C#
namespace Altinn.App.Logic;

using System.Security.Claims;
using Altinn.App.Core.Features;
using Altinn.App.Core.Models.Validation;
using Altinn.Platform.Storage.Interface.Models;
using AltinnCore.Authentication.Constants;
using Microsoft.AspNetCore.Http;

public class InstantiationValidatorExample2 : IInstantiationValidator
{
    private readonly ClaimsPrincipal _user;

    public InstantiationValidatorExample2(IHttpContextAccessor contextAccessor)
    {
        _user = contextAccessor.HttpContext!.User;
    }

    public async Task<InstantiationValidationResult?> Validate(Instance instance)
    {
        var result = new InstantiationValidationResult();
        string org = string.Empty;

        if (_user.HasClaim(c => c.Type == AltinnCoreClaimTypes.Org))
        {
            Claim? orgClaim =
            _user.FindFirst(c => c.Type == AltinnCoreClaimTypes.Org);

            if (orgClaim != null)
            {
                org = orgClaim.Value;
            }
        }

        if (!string.IsNullOrWhiteSpace(org) && org.Equals("ttd"))
        {
            result.Valid = true;
        }
        else
        {
            result.Valid = false;
            result.Message =
            "Only ttd is allowed to instantiate this application.";
        }

        return result;
    }
}
```

I `Program.cs` må tjenesten registreres med
```C#
services.AddTransient<IInstantiationValidator, InstantiationValidatorExample2>()
```

### Eksempel 3 - Instansiering kun tillatt mellom gitte datoer

For å kunne begrense instansiering til en gitt tidsrom, i dette eksempelet januar 2021, kan man ta inspirasjon fra det følgende eksempelet.

```cs
namespace Altinn.App.Logic;

using Altinn.App.Core.Features;
using Altinn.App.Core.Models.Validation;
using Altinn.Platform.Storage.Interface.Models;

public class InstantiationValidatorExample3 : IInstantiationValidator
{
    public async Task<InstantiationValidationResult?> Validate(Instance instance)
    {
        DateTime now = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time"));
        if (now < new DateTime(2021, 01, 01))
        {
            return new InstantiationValidationResult
            {
                Valid = false,
                Message = "Application cannot be instantiated before 1.1.2021"
            };
        }
        else if (now > new DateTime(2021, 01, 31))
        {
            return new InstantiationValidationResult
            {
                Valid = false,
                Message = "Application cannot be instantiated after 25.1.2021"
            };
        }

        return null;
    }
}
```

Det er lagt inn logikk knyttet til datohåndtering for å forsikre oss om at det er norsk tid som gjelder
og som blir brukt i valideringen. 

```cs
DateTime now = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time"));
```

Videre gjøres det en enkel sjekk for å se om nåværende tidspunkt er innenfor rammene

```cs
(now < new DateTime(2021, 01, 01)
```

Dersom man ikke oppfyller kravene blir returobjektet populert med et _InstantiationValidationResult_ objekt som inneholder to felter: 
_Valid_: en boolean som benyttes for å si om instansieringen er gyldig eller ikke
_Message_: en string som kan inneholde en feilmelding dersom det ikke er gyldig


```cs
 result = new InstantiationValidationResult
        {
            Valid = false,
            Message = "Application cannot be instantiated before 1.1.2021"
        };
```

I tillegg har man muligheten til å legge benytte property 
_ValidParties_: en liste med de partiene som kan instansiere applikasjonen.

Resultatet av en feilet validering er vist nedenfor: 

![Instansiering før tillatt dato](instantiation-validation-before-date.png "Instansiering før tillatt dato")

![Instansiering etter tillatt dato](instantiation-validation-after-date.png "Instansiering etter tillatt dato")




