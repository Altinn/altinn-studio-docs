---
title: Application B
linktitle: Application B
description: Instructions for setting up application B
weight: 20
aliases:

- /app/multi-app-solution/instructions/app-b

---

Application B is first and foremost responsible for handling and presenting data which it retrieves from application A.
Beyond this the application can act as a regular Altinn application where the final step is to submit the form, thus
ending the lifecycle of the created instance. However, if there is no natural way of ending the instance of application
B, this must be handled manually. 


Read the following sections for more details on:

- [Getting Data From Application A](#getting-data-from-application-a)
- [Stopping an active instance](#stopping-an-active-instance)

## Getting Data From Application A

Application B needs much less configuration, as a
bare minimum, at least. The main task
for application B is to fetch the data received
from application A and represent or process them in a way.

If using presentation fields or prefill, as explained
in [alternative 1 and 2 in the final part of app A instructions](../app-a#control-data-in-app-b)
, no custom code is required.

If utilizing alternative 3, the data needs to be actively fetched from the instance. This is done by utilising
the `ProcessDataRead` method in the `DataProcessor` service along with the `UpdateData`
method on the `dataClient`. See example code below:

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

## Stopping an active instance

Since this application, in most cases, will act as
an on-demand dashboard for collecting data from
application A, the application has no natural way of ending its
process. To bypass this obstacle, the incoming forms should either:

1. be manually deleted after being read, or
2. they must be implemented with a demand of some sort of
   user interaction
   that will trigger the process to end. 