---
title: Receiver Application
linktitle: Receiver Application
description: Instructions for setting up the receiver application
weight: 20
aliases:

- /app/multi-app-solution/instructions/receiver-app

---

## Getting Data From the Trigger Application

The receiving application needs much less configuration as a
bare minimum receiver application, at least. The main task
for the receiver application is to fetch the data received
from the trigger application(s) and represent them in a way.
This is done by utilising the `ProcessDataRead` method in
the `DataProcessor` service along with the `UpdateData`
method on the `dataClient`. See example code below:

```csharp
public async Task<bool> ProcessDataRead(Instance instance, Guid? dataId, object data)
{
   bool edited = false;

   if (data.GetType() == typeof(DataModel))
   {
       DataModel model = (DataModel)data;

       DataElement attachments = instance.Data.FirstOrDefault(de => de.DataType == "vedlegg");

       if (attachments != null)
       {
           _logger.LogInformation("// App 2 // Received data");

           var instanceGuid = Guid.Parse(instance.Id.Split("/")[1]);
          
           await _dataClient.UpdateData(model, instanceGuid, typeof(DataModel), instance.Org, instance.AppId, int.Parse(instance.InstanceOwner.PartyId), Guid.Parse(instance.Data.Where(de => de.DataType == "datamodel").First().Id));
           edited = true;
       }
   }
   return await Task.FromResult(edited);
}
```

## Stopping a Running Instance

Since this receiving application, in most cases, will act as
an on-demand dashboard for collecting data from trigger
apps, the application has no natural way of ending its
process, since it is not sent in as any other normal form.
To bypass this obstacle, the incoming forms should either;

1. be manually deleted after being read, or
2. they must be implemented with a demand of some sort of
   user interaction
   that will trigger the process to end. 