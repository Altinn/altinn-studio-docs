---
title: App B
linktitle: App B
description: How to set up app B
weight: 20
tags: [needsReview]
aliases:

- /app/multi-app-solution/instructions/app-b

---

App B is first and foremost responsible for handling and presenting data which it retrieves from app A.
Beyond this, the app can function as a regular Altinn app where the final step is to submit the form,
thereby ending the lifecycle of the created instance.
If there is no natural way of ending the instance of app B, this must be handled manually.

Read the following sections for more details:

- [Retrieve data from app A](#retrieve-data-from-app-a)
- [Stop an active instance](#stop-an-active-instance)

## Retrieve data from app A

App B needs much less configuration as a minimum.
The main task for app B is to retrieve the data received from app A and represent or process it in some way.

If you are using presentation fields or prefill, as explained
in [alternatives 1 and 2 in the final part of the app A instructions](/en/altinn-studio/v8/guides/development/multi-app-solution/instructions/app-a#control-data-in-app-b),
you do not need custom code.

If you are using alternative 3, you must actively retrieve the data from the instance.
You do this by using the `ProcessDataRead` method in the `DataProcessor` service together with the `UpdateData` method on the `dataClient`.
See example code below:

```csharp
public async Task<bool> ProcessDataRead(Instance instance, Guid? dataId, object data)
{
   bool edited = false;

   if (data.GetType() == typeof(DataModel))
   {
       DataModel model = (DataModel)data;

       DataElement data = instance.Data.FirstOrDefault(de => de.DataType == [DATA_TYPE]);

       if (data != null)
       {
           var instanceGuid = Guid.Parse(instance.Id.Split("/")[1]);

           await _dataClient.UpdateData(model, instanceGuid, typeof(DataModel), instance.Org, instance.AppId, int.Parse(instance.InstanceOwner.PartyId), Guid.Parse(instance.Data.Where(de => de.DataType == [DATA_TYPE]).First().Id));
           edited = true;
       }
   }
   return await Task.FromResult(edited);
}
```

## Stop an active instance

Since this app, in most cases, functions as
an on-demand dashboard for retrieving data from app A, the app has no natural way of ending its process.
To circumvent this obstacle, the incoming forms should either:

1. be manually deleted after being read, or
2. be implemented with a requirement for some form of user interaction that will trigger the end of the process. 