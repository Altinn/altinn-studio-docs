---
draft: true
title: Dataprosessering
description: Kjør automatiske beregninger og oppdater data når brukeren lagrer.
tags: [needsReview, needsTranslation]
toc: true
---

Dataprosessering lar deg kjøre logikk på serveren som automatisk oppdaterer skjemadata.
Du kan bruke dataprosessering til å

- beregne summer eller andre matematiske operasjoner basert på brukerens inndata
- overføre verdier mellom felter automatisk
- hente og sette inn data fra eksterne systemer via API-kall

Dataprosessering kjører på serveren hver gang brukeren lagrer data.

## Hendelser for dataprosessering

Applikasjonsmalen har to hendelser der du kan plassere logikk for dataprosessering:

- **ProcessDataWrite** kjører når data lagres til databasen.
- **ProcessDataRead** kjører når data hentes fra databasen.

{{% notice info %}}
**Viktig for utviklere:**
Når `ProcessDataWrite` oppdaterer data på serveren, må metoden returnere `true`.
Dette sikrer at brukerens skjema oppdateres med de nye verdiene.
Hvis metoden returnerer `false`, vil ikke brukeren se endringene før siden lastes inn på nytt.
{{% /notice %}}

## Implementere dataprosessering

{{< content-version-selector classes="border-box" >}}

{{< content-version-container version-label="v7" >}}

Fra versjon 7 bruker vi *dependency injection* for dataprosessering.
Dette erstatter den tidligere metoden med overstyring i `DataProcessingHandler.cs`.

### Slik legger du til dataprosessering

1. Opprett en klasse som implementerer `IDataProcessor`-grensesnittet fra `Altinn.App.Core.Features.DataProcessing`.
   Plasser filen i en passende mappestruktur i prosjektet.

   Eksempel på kode som prosesserer data ved lagring:
    ```C#
    public async Task<bool> ProcessDataWrite(
        Instance instance, Guid? dataId, object data)
    {
        bool edited = false;

        if (data is SoknadUnntakKaranteneHotellVelferd model)
        {
            string org = instance.Org;
            string app = instance.AppId.Split("/")[1];
            int partyId = int.Parse(instance.InstanceOwner.PartyId);
            Guid instanceGuid = Guid.Parse(instance.Id.Split("/")[1]);

            // handling mapping of multiple choice velferdsgrunner
            if (!string.IsNullOrEmpty(model.velferdsgrunner?.sammenstilling))
            {
                model.velferdsgrunner.helseproblemer = model.velferdsgrunner.sammenstilling.Contains("helseproblemer");
                model.velferdsgrunner.barnefodsel = model.velferdsgrunner.sammenstilling.Contains("barnefodsel");
                model.velferdsgrunner.begravelse = model.velferdsgrunner.sammenstilling.Contains("begravelse");
                model.velferdsgrunner.naerstaaende = model.velferdsgrunner.sammenstilling.Contains("naerstaaende");
                model.velferdsgrunner.adopsjon = model.velferdsgrunner.sammenstilling.Contains("adopsjon");
                model.velferdsgrunner.sarligeOmsorg = model.velferdsgrunner.sammenstilling.Contains("sarligeOmsorg");
                model.velferdsgrunner.barnAlene = model.velferdsgrunner.sammenstilling.Contains("barnAlene");
                model.velferdsgrunner.hjemmeeksamen = model.velferdsgrunner.sammenstilling.Contains("hjemmeeksamen");
                model.velferdsgrunner.arbeidunntak = model.velferdsgrunner.sammenstilling.Contains("arbeidunntak");
                model.velferdsgrunner.andreVelferdshensyn = model.velferdsgrunner.sammenstilling.Contains("annet");
                model.velferdsgrunner.andreVelferdshensynBeskrivelse = model.velferdsgrunner.sammenstilling.Contains("annet") ? model.velferdsgrunner.andreVelferdshensynBeskrivelse : null;

                edited = true;
            }
            else
            {
                model.velferdsgrunner = null;
            }

            // set data for receipt if not set
            if (string.IsNullOrEmpty(model.applogic?.altinnRef))
            {
                model.applogic ??= new Applogic();

                Party party = await _registerService.GetParty(
                    int.Parse(instance.InstanceOwner.PartyId));
                model.applogic.avsender = 
                    $"{instance.InstanceOwner.PersonNumber}-{party.Name}";
                model.applogic.altinnRef = instance.Id.Split("-")[4];
            }
        }

        return await Task.FromResult(edited);
    }
    ```
2. Registrer implementeringen i `Program.cs`:

    ```C#
    services.AddTransient<IDataProcessor, DataProcessor>();
    ```

{{< /content-version-container >}}
{{< content-version-container version-label="v4, v5, v6" >}}

I versjon 4-6 legger du til dataprosessering i filen `DataProcessingHandler.cs`.
Last ned kildekoden og rediger filen lokalt, for eksempel i Visual Studio Code.

Eksempel på kode som prosesserer data ved lagring:

```csharp
public async Task<bool> ProcessDataWrite(
    Instance instance, Guid? dataId, object data)
{
    bool edited = false;

    if (data is SoknadUnntakKaranteneHotellVelferd model)
    {
        string org = instance.Org;
        string app = instance.AppId.Split("/")[1];
        int partyId = int.Parse(instance.InstanceOwner.PartyId);
        Guid instanceGuid = Guid.Parse(instance.Id.Split("/")[1]);

        // handling mapping of multiple choice velferdsgrunner
        if (!string.IsNullOrEmpty(model.velferdsgrunner?.sammenstilling))
        {
            model.velferdsgrunner.helseproblemer = model.velferdsgrunner.sammenstilling.Contains("helseproblemer");
            model.velferdsgrunner.barnefodsel = model.velferdsgrunner.sammenstilling.Contains("barnefodsel");
            model.velferdsgrunner.begravelse = model.velferdsgrunner.sammenstilling.Contains("begravelse");
            model.velferdsgrunner.naerstaaende = model.velferdsgrunner.sammenstilling.Contains("naerstaaende");
            model.velferdsgrunner.adopsjon = model.velferdsgrunner.sammenstilling.Contains("adopsjon");
            model.velferdsgrunner.sarligeOmsorg = model.velferdsgrunner.sammenstilling.Contains("sarligeOmsorg");
            model.velferdsgrunner.barnAlene = model.velferdsgrunner.sammenstilling.Contains("barnAlene");
            model.velferdsgrunner.hjemmeeksamen = model.velferdsgrunner.sammenstilling.Contains("hjemmeeksamen");
            model.velferdsgrunner.arbeidunntak = model.velferdsgrunner.sammenstilling.Contains("arbeidunntak");
            model.velferdsgrunner.andreVelferdshensyn = model.velferdsgrunner.sammenstilling.Contains("annet");
            model.velferdsgrunner.andreVelferdshensynBeskrivelse = model.velferdsgrunner.sammenstilling.Contains("annet") ? model.velferdsgrunner.andreVelferdshensynBeskrivelse : null;

            edited = true;
        }
        else
        {
            model.velferdsgrunner = null;
        }

        // set data for receipt if not set
        if (string.IsNullOrEmpty(model.applogic?.altinnRef))
        {
            model.applogic ??= new Applogic();

            Party party = await _registerService.GetParty(
                int.Parse(instance.InstanceOwner.PartyId));
            model.applogic.avsender = 
                $"{instance.InstanceOwner.PersonNumber}-{party.Name}";
            model.applogic.altinnRef = instance.Id.Split("-")[4];
        }
    }

    return await Task.FromResult(edited);
}
```

{{< /content-version-container >}}

{{< /content-version-selector >}}
