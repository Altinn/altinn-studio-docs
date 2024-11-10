---
title: Application A
linktitle: Application A
description: Instructions for setting up application A
weight: 10
aliases:

- /app/multi-app-solution/instructions/app-a

---

Application A is responsible for triggering the instantiation of application B and passing data to it. 
 To accomplish this, several steps must be followed.

1. Extend the application process with an additional process task.
2. Add logic for instantiation of application B to an event trigger.
3. Populate/retrieve and pass on relevant data to the newly created instance of application B.

{{% notice warning %}}
These guidelines assume that a basic Altinn application already exists. The focus is on the
more technical adaptations necessary for realizing the purpose of the multi-app solution
{{% /notice %}}

## Add task to process

### Why the need for multiple tasks

In most cases it is necessary to pass the data the end user
has added to the form, further on to application B. This data is preserved in the pdf-element which is stored as a part
of the instance object. However, this pdf is only generated at the _end_ of a process task. Hence there is need for an
extra task to be able to retrieve the pdf. You will need to have at least two tasks, where the
final task is _not_ a data task. The task can be a _confirm_
or _feedback_ task type. We recommend using the _confirm_ task type, and this is what the following guidelines will
use.

### How to extend the process with multiple tasks

In order to add task types to extend the application process, we need to update `process.bpmn` and `policy.xml`.

1. You will find examples of how to adapt the `process.bpmn` file, where the application process is defined, in
   the [process documentation](/app/development/configuration/process).
   <br><br>When using the _confirm_ task type we need to allow for going back to a previous task type, which also means
   that we
   need to take advantage of _exclusive gateways_. Read more about exclusive
   gateways [here](/app/development/configuration/process/exclusive-gateways).
2. The `policy.xml` file, where the authorization rules are defined, needs updates so read and write operations
   can be done on the new task. <br><br>See [XACML policy](/authorization/guides/xacml)
   , [policy editor](/app/development/configuration/authorization)
   and [Guidelines for authorization rules](/app/development/configuration/authorization/guidelines_authorization)
   for details. Most apps allow this by default by the current template.

## Trigger the instantiation of application B

### Why triggering instantiation of application B needs custom adaptations

The essential purpose of a multi-app solution relies on the fact that an instance of an application is created by a
given trigger action in another Altinn application. The native way of instantiating an Altinn application is by doing an
API POST request to the running Altinn application. However, there is no built-in way in the Altinn context to trigger
this behaviour which means that we will need to trigger the API request as custom code in application A.

### How to customize application A to trigger instantiation of application B

The general approach for an Altinn application to perform custom operations is by implement code on certain hooks, which
are predefined functions in app-backend.
Read about how this custom code is
added [here](/app/development/configuration/process/pre-post-hooks).

1. If not already present, create a file for implementing the custom code that runs on the end
   events, `ProcessTaskEnd.cs`. In the file, implement the code that creates the instance object that will be used as
   the foundation for the new instance of application B. See the below example for a template. Make sure that the
   instance creation happens when the
   task is finished, i.e. use the `ProcessTaskEnd.End()` function. This is necessary since the user can go back
   to the data task and do changes on the form. <br><br>The `instanceOwner`-part of the instance object is essential as
   this is where you specify the instance owner. Defining it by `OrganisationNumber` means that the owner is an
   organization,
   while defining it by `PersonNumber` means that the owner is a private person. <br><br>A natural part of the instance
   object is the _prefill_ section where you
   will add the desired data that the new instance of application B should be prefilled with. The resulting instance
   object, will look something like this:

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

2. To actually perform the request to create the instance, we need to add a client. Refer
   to [the consume documentation](/app/development/api/consume#implement-the-client) to see an example of how
   such a client can be added to the application. A fitting name for the client used in this context might be
   f.ex. `AppInstantiationClient`. In addition to the instructions in the referenced documentation, our constructor needs
   additional configuration to the HttpClient. Add the following code the the constructor to add a subscription key to
   the header of the requests sent by the http client.
    ```csharp
       public AppClient(
            ...
            HttpClient httpClient,
            ...
        {
            ...
            httpClient.DefaultRequestHeaders.Add(General.SubscriptionKeyHeaderName, platformSettings.Value.SubscriptionKey);
            _client = httpClient;
            ...
        }
   ```

   Instead of creating a function in the client named `GetCountry`, as in the referenced documentation above, implement
   the
   following function,`CreateNewInstance`:

    ```csharp
    public async Task<Instance> CreateNewInstance(string AppOwnerOrgName, string applicationB, InstansiationInstance instanceTemplate)
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

3. In the `ProcessTaskEnd.cs` file, add the new _AppInstantiationClient_ to the `ProcessTaskEnd` class in the same way
   as the _CountryClient_ is added to the `DataProcessingHandler` class
   in [the consume documentation](/app/development/api/consume#using-the-client-in-the-application-logic).
   Further, call the method triggering the request in the appInstantiationClient like this:

    ```csharp
    Instance applicationBInstance = await _appInstantiationClient.CreateNewInstance([AppOwnerOrgName], [applicationB], [instanceTemplate]);
    ```

If the client should authenticate itself as the end user, rather than the application owner via maskinporten, please
reference
the [app-lib client implementations](https://github.com/Altinn/app-lib-dotnet/tree/main/src/Altinn.App.Core/Infrastructure/Clients)
on details for how to adapt the API request in the AppInstantiationClient to achieve this.

## Delivering Data to Application B

### Why manipulating the data for application B in application A

It is natural to utilize the multi-app solution to control the presentation of information in application
B dynamically depending on what data is inserted in an instance of application A. This means that all adaptions on
application B that is dependent on data retrieved from application A, must be done in application A and in some way
delivered or represented in application B.

### Retrieving data from application A to pass over to application B

Before some data types can be added, they must be retrieved from Altinn Storage since the application does not have
direct access to this by default.
The probably most attractive data type to pass over from application A to application B is the pdf including all the
information filled into the instance of application A. To retrieve this data from application A, it needs to be
collected from Altinn Storage. The pdf exists on the instance object as a part of the `dataTypes`
field with the name `ref-data-as-pdf`. This can be fetched by getting the instance and fetch the data directly on the
retrieved instance object, or by using the already defined `GetBinaryData` method on the dataClient.
See example code below of both below:

   ```csharp
   // Using the instance object directly with the GetInstance method on the InstanceClient
   Instance updatedInstance = await _instanceClient.GetInstance(innsendingsApp, mutliAppOwner, int.Parse(instance.InstanceOwner.PartyId), instanceGuid);
   DataElement pdf = updatedInstance.Data.FindLast(d => d.DataType == "ref-data-as-pdf");
   
   // Using the GetBinaryData method on the DataClient
   var stream = await _dataClient.GetBinaryData(instance.Org, instance.AppId,int.Parse(instance.InstanceOwner.PartyId), instanceGuid, Guid.Parse(pdf.Id));
   ```

_NB: In order to use these methods in the `ProcessTaskEnd` class, the constructor needs to be configured to use the
InstanceClient and/or the DataClient._

<a name="control-data-in-app-b"></a>
### How to control data in application B from application A

There are several ways to control certain data in application B, whereas one or multiple can be utilized:

- **Alt 1:** Add data as values on the datamodel of
  application B by adding the data model field name and the
  corresponding value in the `prefill` field of the
  instance template that you created in the [Trigger the
  instantiation of application B](#trigger-the-instantiation-of-application-b) section above.
- **Alt 2:** If the intention is to manipulate the texts in Altinn
  Inbox for the instances of application B,
  use [_presentation
  fields_](/app/development/configuration/messagebox/presentationfields)
  .

- **Alt 3:** Add data as binary data by doing a POST request to the instance of application B.
  ```csharp
  public async Task<DataElement> InsertBinaryData(string org, string app, string instanceId, string contentType, string filename, Stream stream)
  {
    string envUrl = $"https://{org}.apps.{_settings.HostName}";
    _client.BaseAddress = new Uri(envUrl);
  
    string apiUrl = $"{org}/{app}/instances/{instanceId}/data?dataType=vedlegg";

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
      await Task.CompletedTask;
    }
  }
  ```
  