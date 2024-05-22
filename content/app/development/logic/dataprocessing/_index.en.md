---
title: Data processing
description: How to add Calculations and other data processing?
toc: false
---

Data processing is run on the server and is based on input from the user/form data.
Data processing can be purely mathematical calculations, or it could transfer values between fields, retrieve results from API calls, etc.

Data processing runs each time data is saved, meaning it runs each time a user has made a change.

To ensure optimal experience and control, the application template has two different events where logic can be placed.

- ProcessDataWrite runs when data is saved
- ProcessDataRead runs when data is read from the database

{{%notice info%}}
**IMPORTANT**
<br/>
For versions 4-7, when data processing that updates the data on the server runs, the front-end must be notified so the updated data can be loaded.
To achieve this, the `ProcessDataWrite` method needs to return `true` if any data is updated.
If this is not done, the updated data is not visible to the user until they refresh the page.
</br>
</br>
Starting from v8, you do not need to return anything from `ProcessDataWrite`. To update the data, simply modify the incoming data object as before.
{{% /notice%}}
{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v8">}}

1. Create a class that implements the `IDataProcessor` interface found in the `Altinn.App.Core.Features.DataProcessing` namespace.  
    You can name and place the file in any folder you like within your project, but we suggest you use meaningful namespaces like in any other .Net project.
   Example code from app that processes and populates different data while saving.

   ```C#
   public async Task<bool> ProcessDataWrite(Instance instance, Guid? dataId, object data, object? previousData, string? language)
   {
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
   }
   ```

2. Register you custom implementation in the _Program.cs_ class

   ```C#
   services.AddTransient<IDataProcessor, DataProcessor>();
   ```

   This ensures your custom code is known to the application and that it will be executed.

{{</content-version-container>}}

{{<content-version-container version-label="v7">}}

In version 7 the way to do custom code instantiation has changed. We now use an dependency injection based approach insted of overriding methods. If you previously used to place your custom code in the _ProcessDataWrite_ and ProcessDataWrite* methods in the \_DataProcessingHandler.cs* class you will see that it's mostly the same.

1. Create a class that implements the `IDataProcessor` interface found in the `Altinn.App.Core.Features.DataProcessing` namespace.  
   You can name and place the file in any folder you like within your project, but we suggest you use meaningful namespaces like in any other .Net project.
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

2. Register you custom implementation in the _Program.cs_ class

   ```C#
       services.AddTransient<IDataProcessor, DataProcessor>();
   ```

   This ensures your custom code is known to the application and that it will be executed.

   {{</content-version-container>}}
   {{<content-version-container version-label="v4, v5, v6">}}
   Data processing is coded in C#, in the file `DataProcessingHandler.cs`. This file can easily be edited by downloading the source code to the app and editing on your own computer, e.g. in Visual Studio Code.
   The data model with form data is available and can be edited/updated when needed.

Example code from app that processes and populates various data while saving.

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
