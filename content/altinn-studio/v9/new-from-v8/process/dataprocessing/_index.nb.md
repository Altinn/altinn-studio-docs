---
draft: true
title: Dataprosessering
description: Slik legger du til kalkuleringer og annen dataprosessering
toc: true
tags: [needsReview]
---

Dataprosessering kjøres på serveren, og er basert på det sluttbrukeren har fylt ut, eller skjemadata.
Du kan bruke dataprosessering til rent matematiske kalkuleringer, overføring av verdier mellom felter, resultater av API-kall, og mer.

Dataprosessering kjøres hver gang du lagrer data — altså hver gang en bruker gjør en endring.

For å sikre optimal opplevelse og kontroll gir applikasjonstemplaten deg to forskjellige hendelser hvor du kan plassere logikk.

- ProcessDataWrite kjøres når du lagrer data
- ProcessDataRead kjøres når du leser data fra databasen

{{%notice info%}}
VIKTIG: Når dataprosessering kjøres og oppdaterer dataene på server, må front-end få beskjed om dette, slik at den kan laste inn de oppdaterte dataene.
For å gjøre dette, må `ProcessDataWrite`-metoden returnere `true` dersom noen av dataene har blitt oppdatert.
Hvis du ikke gjør dette, vil de oppdaterte dataene ikke være synlige for sluttbruker før de eventuelt laster inn siden på nytt.
{{% /notice%}}

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v7">}}
I versjon 7 endret vi måten preutfylling med egendefinert kode gjøres på. Vi bruker nå _dependency injection_ i stedet for overstyring av metoder. Hvis du tidligere plasserte koden din i _ProcessDataRead_ og _ProcessDataWrite_ metodene i _DataProcessingHandler.cs_ klassen, vil du se at det er omtrent det samme som nå gjøres.

1. Opprett en klasse som implementerer `IDataProcessor` grensesnittet som ligger i `Altinn.App.Core.Features.DataProcessing` navnerommet.  
    Du kan navngi og plassere filene i den mappestrukturen du selv ønsker i prosjektet ditt. Men vi anbefaler at du bruker meningsfulle navnerom som i ethvert annet .Net prosjekt.
    Eksempel på kode fra app som prosesserer og populerer forskjellige data under lagring.
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
                edited = true;
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
                edited = true;
            }
        }

        return await Task.FromResult(edited);
    }
    ```
2. Registrer implementeringen din i _Program.cs_ klassen
    ```C#
    services.AddTransient<IDataProcessor, DataProcessor>();
    ```
    Dette sikrer at appen kjenner til koden din og kjører den når den skal.
{{</content-version-container>}}
{{<content-version-container version-label="v4, v5, v6">}}
Du koder dataprosessering i C# i filen `DataProcessingHandler.cs`. Du redigerer denne filen enklest ved å laste ned kildekoden til appen og redigere på egen maskin — for eksempel i Visual Studio Code.
Du har tilgang til datamodellen med skjemadata og kan redigere eller oppdatere den etter behov.

Eksempel på kode fra app som prosesserer og populerer forskjellige data under lagring.

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
{{</content-version-container>}}

{{</content-version-selector>}}
