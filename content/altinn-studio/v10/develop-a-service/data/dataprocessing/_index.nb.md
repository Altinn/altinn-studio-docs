---
draft: true
title: Dataprosessering
description: Slik legger du til beregninger og annen dataprosessering
tags: [needsReview, needsTranslation]
toc: true
---

Dataprosessering kjøres på serveren, og er basert på inndata fra brukeren/skjemadata. Dataprosessering kan være rent matematiske beregninger, det kan også være å overføre verdier mellom felter, resultater av API-kall, osv.

Dataprosessering kjøres hver gang du lagrer data, og dermed hver gang en bruker har gjort en endring.

For å sikre optimal opplevelse og kontroll har app-malen to forskjellige hendelser hvor du kan plassere logikk:

- ProcessDataWrite kjøres når data lagres
- ProcessDataRead kjøres når data leses fra databasen

{{%notice info%}}
VIKTIG: Hvis dataprosesseringen har oppdatert data på serveren, må du gi frontend beskjed slik at brukeren får se de oppdaterte dataene. Gjør dette ved å la `ProcessDataWrite`-metoden returnere `true` når data er oppdatert. Hvis du ikke gjør dette, ser ikke brukeren de oppdaterte dataene før de laster inn siden på nytt.
{{% /notice%}}

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v7">}}
I versjon 7 har vi endret måten forhåndsutfylling med egendefinert kode gjøres på. Vi bruker nå _dependency injection_ i stedet for overstyring av metoder. Hvis du tidligere plasserte koden i _ProcessDataRead_ og _ProcessDataWrite_-metodene i _DataProcessingHandler.cs_-klassen, vil du oppleve at det er mer eller mindre det samme som nå gjøres.

1. Opprett en klasse som implementerer `IDataProcessor`-grensesnittet som ligger i `Altinn.App.Core.Features.DateProcessing`-navnerommet. Du kan navngi og plassere filene i den mappestrukturen du selv ønsker i prosjektet. Men vi anbefaler at du bruker meningsfulle navnerom som i ethvert annet .Net-prosjekt. Eksempel på kode fra app som prosesserer og populerer forskjellige data under lagring:
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
2. Registrer implementeringen i _Program.cs_-klassen
    ```C#
    services.AddTransient<IDataProcessor, DataProcessor>();
    ```
    Dette sørger for at koden er kjent for appen, og at koden kjøres når den skal.
{{</content-version-container>}}
{{<content-version-container version-label="v4, v5, v6">}}
Dataprosessering kodes i C#, i filen `DataProsessingHandler.cs`. Denne filen kan redigeres enklest ved å laste ned kildekoden til appen og redigere på egen maskin, for eksempel i Visual Studio Code. Datamodellen med skjemadata er tilgjengelig og kan redigeres/oppdateres etter ønske/behov.

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
