---
title: Application A
linktitle: Application A
description: Instructions for setting up application A
weight: 10
toc: true
aliases:

- /app/multi-app-solution/instructions/app-a

---

{{% notice warning %}}
The following guidelines assumes that a basic Altinn application already exists so the
more technical adaptations can be enhanced for realizing the purpose of the multi-app solution
{{% /notice %}}

## Add task to process

In most cases it is necessary to pass the data the end user
has added to the form, to application B. The data
entered by the end user is represented in the pdf which is
added to the instance object as a part of the `dataTypes`
field with the name `ref-data-as-pdf`. This data element can
be retrieved from the `instance` object in the custom code
that can be added on predefined functions in app-backend.
Read more about how this custom code is
added [here](../../../../development/configuration/process/pre-post-hooks)
.

However, if you wish the retrieve the pdf data element, your
application must have multiple process tasks. This is due to
the pdf generation is executed after a task has ended. So if
you wish to collect the pdf(s) from the data tasks from the
process, you will need to have at least two tasks, where the
final task is _not_ a data task. The task can be a _confirm_
or _feedback_ task.

_NB: It might be that you need to get an updated version of
the instance object from Altinn Storage by calling
the `GetInstance` method on the `IInstanceClient`._

### Confirm Task Type

If using the _confirm_ task type, make sure the
instantiation of application B happens when the
task is finished, i.e. use the `ProcessTaskEnd.End()`
function. This is necessary since the user can go back
to the data task and do changes.

{{% notice warning %}}
Using this task type requires nuget version 8, assuming that you wish to allow the user to go back to the data task. 
{{% /notice %}}

### Feedback Task Type

If using the _feedback_ task type, the instantiation of application B can be done on the task start
function. Be aware that there has to be some external
triggers that can make sure the application is moved to the
end task event, or else it will stay on the feedback task
forever. The external trigger cannot be application B 
since this application will send the request to
end the original request sent from application A
while application A is waiting for the same
request to complete, which will cause a conflict.

### Update `process.bpmn` and `policy.xml` accordingly

Remember to update the process.bpmn file to match the the
process, and remember adding gateways if you have chosen
the _confirm_ task type.

Policy.xml also needs updates so read and write operations
can be done on the new task.

See [XACML policy](../../../../../authorization/guide/xacml) and [policy editor](../../../../development/configuration/authorization) for details. Most apps allow this by default by the current template.

## Trigger the instantiation of application B

The instantiation of application B is done with
an api call to the running B application. The
content of the call will
be the new instance object, which will look something like
this:

```csharp
var instanceTemplate = new InstansiationInstance
{
    InstanceOwner = new InstanceOwner
    {
        //OrganisationNumber = [receiverOrgNr], Or
        //PersonNumber = [receiverSsnNr],
    },
    Prefill = new()
    {
        {"someDataInReceiverDataModel", someValueFromThisTriggerAppliaction},
        {"moreDataInReceiverDataModel", someStaticValue}, 
        ...
    },
};
```

The request to create the instance is added to the appClient
which is a custom service that also must be configured.

Call the method triggering the request in the appClient like
this:

```csharp
Instance applicationBInstance = await _appClient.CreateNewInstance([AppOwnerOrgName], [applicationB], [instanceTemplate]);
```

In the AppClient add this code:

```csharp
public async Task<Instance> CreateNewInstance(string org, string app, InstansiationInstance instanceTemplate)
{
   string apiUrl = $"{AppOwnerOrgName}/{applicationB}/instances/create";
               
   string envUrl = $"https://{AppOwnerOrgName}.apps.{_settings.HostName}";
   
   _client.BaseAddress = new Uri(envUrl);
   
   StringContent content = new StringContent(JsonConvert.SerializeObject(instanceTemplate), Encoding.UTF8, "application/json");
   
   HttpResponseMessage response = await _client.PostAsync(apiUrl, content);
   
   if (response.IsSuccessStatusCode)
   {
       Instance createdInstance = JsonConvert.DeserializeObject<Instance>(await response.Content.ReadAsStringAsync());
       
       return createdInstance;
   }
   throw await PlatformHttpException.CreateAsync(response);
}
```

## Delivering Data to Application B

In order to pass data to application B there
are several ways to go by.

1. Add data as values on the datamodel of
   application B by adding the data model field name and the
   corresponding value in the `prefill` field of the the
   instance template that you created in the _Trigger the
   instantiation of application B_ section above.
2. If the intention is to manipulate the texts in Altinn
   Inbox for the instances of application B,
   use [_presentation
   fields_](../../../../development/configuration/messagebox/presentationfields)
   .
3. Add data as binary data by doing a POST request to the
   Altinn platform on the instance after it is instantiated.
   Before some data types can be added, they must be
   retrieved from Altinn Platform, such as the pdf for
   example, since the application does not have direct
   access to this by default. The already
   defined `GetBinaryData` method on the dataClient should
   be used to get the data and a custom code, called
   e.g. `InsertBinaryData`, should be used to insert the
   data.
   See example code below of both below:
   ```csharp
   DataElement pdf = updatedInstance.Data.FindLast(d => d.DataType == "ref-data-as-pdf");
   var stream = await _dataClient.GetBinaryData(instance.Org, instance.AppId,int.Parse(instance.InstanceOwner.PartyId), instanceGuid, Guid.Parse(pdf.Id));
   
   ```
   ```csharp
   public async Task<DataElement> InsertBinaryData(string org, string app, string instanceId, string dataType, string contentType, string filename, Stream stream)
   {
      string apiUrl = $"{org}/{app}/instances/{instanceId}/data?dataType=vedlegg";
   
      DataElement dataElement;
   
      StreamContent content = new(stream);
      content.Headers.ContentType = MediaTypeHeaderValue.Parse(contentType);
      if (!string.IsNullOrEmpty(filename))
      {
          content.Headers.ContentDisposition = new ContentDispositionHeaderValue(DispositionTypeNames.Attachment)
          {
              FileName = filename,
              FileNameStar = filename
          };
      }
   
      HttpResponseMessage response = await _client.PostAsync(apiUrl, content);
   
      if (response.IsSuccessStatusCode)
      {
          string instancedata = await response.Content.ReadAsStringAsync();
          dataElement = JsonConvert.DeserializeObject<DataElement>(instancedata);
   
          return dataElement;
      }
      throw await PlatformHttpException.CreateAsync(response);
   }
   ```
4. Data can also be added to the application
   using [DataProcessors](../../../../development/logic/dataprocessing)
   .