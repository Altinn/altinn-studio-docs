---
title: Data processing
description: How to add Calculations and other data processing?
toc: true
---

Data processing is run on the server and is based on input from the user/form data.
Data processing can be purely mathematical calculations, or it could transfer values between fields, retrieve results from API calls, etc.

Data processing is coded in C#, in the file `DataProcessingHandler.cs`. This file can easily be edited by downloading the source code to the app and editing on your own computer, e.g. in Visual Studio Code.
The data model with form data is available and can be edited/updated when needed.

Data processing runs each time data is saved and when data is retrieved from API. With auto-save on (default) data processing will run each time a user has made a change.

To ensure optimal experience and control, the application template has two different events where logic can be placed.

- ProcessDataWrite runs when data is saved
- ProcessDataRead runs when data is read from the database

{{%notice info%}}
IMPORTANT: When a data processing that has updated the data on the server has been run, the front-end must be notified so that the updated data can be loaded.
To do this, the ProcessdataWrite method must return true if any of the data has been updated.
If this is not done, the updated data won't be visible for the user until they refresh the page.
{{% /notice%}}

Example on code from app that processes and populates different data while saving.

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