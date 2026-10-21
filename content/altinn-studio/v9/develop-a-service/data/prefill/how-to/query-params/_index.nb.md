---
draft: true
title: Forhåndsutfylle data basert på spørringsparametere
linktitle: Spørringsparametere
description: Slik konfigurerer du forhåndsutfylling for en app basert på spørringsparametere.
tags: [needsReview]
toc: false

---

Altinn-apper støtter forhåndsutfylling basert på spørringsparametere.

## 1. Konfigurer <stateless_datamodel>.prefill.json

I din models-mappe oppretter du en fil kalt <stateless_datamodel>.prefill.json (hvis navnet på modellen din er tax_return, skal filen hete tax_return.prefill.json).

Eksempel:

```json 
{
  "$schema": "https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json",
  "QueryParameters": {
    "jobTitle": "JobTitle"
  }
}
```

Dette krever at du har et felt kalt JobTitle i datamodellen din, og lar deg forhåndsutfylle dette feltet med en lenke som:

https://ttd.apps.tt02.altinn.no/ttd/stateless-app/set-query-params?jobTitle=Developer

Viktig merknad: Lenken for forhåndsutfylling fungerer bare på stien :org/:app/set-query-params, som i eksemplet ovenfor.

Legg også merke til at bare spørringsparametere som er definert i ```<stateless_datamodel>.prefill.json```, fungerer. Hvis du prøver å lenke til https://ttd.apps.tt02.altinn.no/ttd/stateless-app/set-query-params?somethingelse=designer, får du en feil.

## 2. Konfigurer InstantiationProcessor og InstantiationButton

Følg stegene her: [Start instans fra et stateless skjema]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/stateless#starte-instans-fra-et-stateless-skjema" >}})

## 3. (Valgfritt, men sterkt anbefalt) Valider verdier for spørringsparametere

For å validere spørringsparametere lager du en klasse som implementerer `IValidateQueryParamPrefill`, for eksempel i mappen `logic`. Returner `null` når verdiene er gyldige. Returnerer du en `ValidationIssue`, svarer appen med feilkoden 400 Bad Request og bruker ikke verdiene. Her er et enkelt eksempel:

{{< code-title >}}
App/logic/ValidateQueryParamPrefill.cs
{{< /code-title >}}

```c#
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Models.Validation;

namespace Altinn.App.AppLogic.DataProcessing
{
    public class ValidateQueryParamPrefill : IValidateQueryParamPrefill
    {
        public Task<ValidationIssue?> PrefillFromQueryParamsIsValid(Dictionary<string, string> prefill)
        {
            // For example, only "Developer", "Manager", or "Tester" are allowed for JobTitle
            if (prefill.TryGetValue("JobTitle", out var jobTitle))
            {
                var allowedJobTitles = new HashSet<string> { "Developer", "Manager", "Tester" };
                if (!allowedJobTitles.Contains(jobTitle))
                {
                    return Task.FromResult<ValidationIssue?>(
                        new ValidationIssue
                        {
                            Severity = ValidationIssueSeverity.Error,
                            Description = $"Invalid JobTitle '{jobTitle}'.",
                        }
                    );
                }
            }

            // No issues found
            return Task.FromResult<ValidationIssue?>(null);
        }
    }
}
```

Registrer klassen i `Program.cs`:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```c#
using Altinn.App.AppLogic.DataProcessing;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddTransient<IValidateQueryParamPrefill, ValidateQueryParamPrefill>();
}
```
