---
draft: true
title: Forhåndsutfylle data basert på spørringsparametere
linktitle: Spørringsparametere
description: Slik konfigurerer du forhåndsutfylling for en app basert på spørringsparametere.
tags: [needsReview, needsTranslation]
toc: false
weight: 400
---

Altinn-apper støtter forhåndsutfylling basert på spørringsparametere.

Merk: Krever minimum versjon v4.18.0 av frontend, v8.6.0 av backend.

Dette gjør det mulig for brukere å klikke på en lenke som
https://ttd.apps.tt02.altinn.no/ttd/stateless-app/set-query-params?jobTitle=designer,
og få ordet "designer" forhåndsutfylt i et datamodellfelt.

Det er imidlertid noen viktige forbehold knyttet til sikkerhet når du bruker denne tilnærmingen.

For det første kan forhåndsutfylling med spørringsparametere bare brukes i en stateless-oppgave.
Hvis vi ikke hadde dette kravet, ville det vært mulig for en angriper å endre verdien i parameteren og få den verdien til å dukke opp direkte i mottakerens Altinn-innboks.

Ved å gå via en stateless-oppgave sikrer vi at dataene blir vist til brukeren før instansiering, slik at brukeren fortsatt har kontroll over hvilke data som lagres.

For det andre anbefaler vi på det sterkeste at du inspiserer verdien av spørringsparametere i applikasjonen din. På denne måten sikrer du at bare gyldige data kan forhåndsutfylles, slik at en angriper ikke kan sende noen en lenke som:

```altinn.no/ttd/stateless-app/set-query-params?jobTitle=Im a scammer```


og få teksten "Im a scammer" til å vises i applikasjonen din.

## Slik konfigurerer du forhåndsutfylling basert på spørringsparametere

### 1. Konfigurer <stateless_datamodel>.prefill.json

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

https://ttd.apps.tt02.altinn.no/ttd/stateless-app/set-query-params?jobTitle=designer

Viktig merknad: Lenken for forhåndsutfylling fungerer bare på stien :org/:app/set-query-params, som i eksemplet ovenfor.

Legg også merke til at bare spørringsparametere som er definert i ```<stateless_datamodel>.prefill.json```, fungerer. Hvis du prøver å lenke til https://ttd.apps.tt02.altinn.no/ttd/stateless-app/set-query-params?somethingelse=designer, får du en feil.

### 2. Konfigurer InstantiationProcessor og InstantiationButton

Følg stegene her: [Konfigurere tilgang uten innlogging](/nb/altinn-studio/v10/develop-a-service/reference/configuration/stateless#konfigurere-tilgang-uten-innlogging)

### 3. (Valgfritt, men sterkt anbefalt) Valider verdier for spørringsparametere

For å validere spørringsparametere implementerer du i /logic-mappen din. Her er et enkelt eksempel:

```c# 
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Core.Features;

namespace Altinn.App.AppLogic.DataProcessing
{
    public class ValidateQueryParamPrefill : IValidateQueryParamPrefill
    {
        public async Task PrefillFromQueryParamsIsValid(Dictionary<string, string> prefill)
        {
            // For example, only "Developer", "Manager", or "Tester" are allowed for JobTitle
            if (prefill.TryGetValue("JobTitle", out var jobTitle))
            {
                var allowedJobTitles = new HashSet<string> { "Developer", "Manager", "Tester" };
                if (!allowedJobTitles.Contains(jobTitle))
                {
                    throw new Exception($"Invalid JobTitle '{jobTitle}'.");
                }
            }

            // No issues found
            await Task.CompletedTask;
        }
    }
}
```
