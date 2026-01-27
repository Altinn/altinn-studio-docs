---
draft: false
title: App A
linktitle: App A
description: How to set up app A
weight: 10
tags: [needsReview]
aliases:
  - /app/multi-app-solution/instructions/app-a
---

App A is responsible for triggering the creation of app B and sending data to it.
You must follow several steps to achieve this.

1. Extend the app process with an additional step.
2. Add logic for creating app B to an event trigger.
3. Populate/retrieve and pass on relevant data to the newly created instance of app B.

{{% notice warning %}}
This guide assumes that you already have a basic Altinn app. The guide focuses on the technical adaptations necessary to realise the purpose of the multi-app solution.
{{% /notice %}}

## Adding steps to the process

### Understanding the need for multiple steps

In most cases, you must pass on the data that the end user has added to the form to app B.
This data is preserved in the PDF element that is stored as part of the instance object.
This PDF is only generated at the _end_ of a step. Therefore, you need an additional step to be able to retrieve the PDF.
You must have at least two steps, where the last step is _not_ a data step. The step can be _confirm_ or _feedback_.
We recommend using the _confirm_ step type, and that is what this guide uses.

### Extending the process with multiple steps

To add steps and extend the app process, you must update `process.bpmn` and `policy.xml`.

1. You will find examples of how to customise the `process.bpmn` file, where the app process is defined, in
   the [process documentation](/nb/altinn-studio/v8/reference/configuration/process).
   <br><br>When using the _confirm_ step type, you must allow going back to a previous step type, which also means
   that you need to use _exclusive gateways_. Read more about exclusive
   gateways [here](/nb/altinn-studio/v8/reference/configuration/process/exclusive-gateways).
2. The `policy.xml` file, where the authorisation rules are defined, needs updates so that you can perform read and write operations
   on the new step. <br><br>See [XACML policy](/nb/authorization/reference/xacml),
   [policy editor](/nb/altinn-studio/v8/reference/configuration/authorization)
   and [Guidelines for authorisation rules](/nb/altinn-studio/v8/reference/configuration/authorization/guidelines_authorization)
   for details. Most apps allow this by default with the current template.

## Triggering creation of app B

### Understanding the need for special customisation

The essential purpose of a multi-app solution depends on an instance of an app being created by a
given trigger action in another Altinn app. The natural way to create an Altinn app is by
making an API POST request to the running Altinn app.
There is no built-in way in Altinn to trigger this behaviour, which means you must trigger the API request with custom code in app A.

### Customising app A to trigger creation of app B

The general approach for an Altinn app to perform custom operations is to implement code on
certain hooks, which are predefined functions in the app backend.
Read about how to add this custom code [here](/nb/altinn-studio/v8/reference/configuration/process/pre-post-hooks).

1. If the file does not already exist, create a file to implement the custom code that runs at the end
   of a step: `ProcessTaskEnd.cs`. In the file, implement the code that creates the instance object that will be used as
   the foundation for the new instance of app B. See below for an example of a template. Make sure that the
   instance creation happens when the step is completed, i.e. use the `ProcessTaskEnd.End()` function.
   This is necessary since the user can go back to the data step and make changes to the form.
   <br><br>The `instanceOwner` part of the instance object is essential, as this is where you specify the instance owner.
   When you define it with `OrganisationNumber`, the owner is an organisation. When you define it with `PersonNumber`, the owner is a private individual.
   <br><br>A natural part of the instance object is the _prefill_ section, where you add the desired data that the new instance of app B should be populated with.
   The resulting instance object will look something like this:

   ```csharp
   var instanceTemplate = new InstansiationInstance
   {
       InstanceOwner = new InstanceOwner
       {
           //OrganisationNumber = [mottakerOrgNr], Eller
           //PersonNumber = [mottakerSsnNr],
       },
       Prefill = new()
       {
           {"noenDataIMottakerDataModell", noenVerdiFraDenneTriggerAppen},
           {"merDataIMottakerDataModell", noenStatiskVerdi},
           ...
       },
   };
   ```

2. To actually perform the request to create the instance, you must add a client. See
   the [consume documentation](/nb/altinn-studio/v8/reference/api/consume#implementere-klient) for an example of how
   you can add such a client to the app. A suitable name for the client used in this context could be,
   for example, `AppInstantiationClient`. In addition to the instructions in the referenced documentation, the
   constructor needs additional configuration for the HttpClient. Add the following code to the constructor to add
   a subscription key to the header of the requests sent by the http client.

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

   Instead of creating a function in the client named `GetCountry`, as in the documentation mentioned above,
   implement the following function, `CreateNewInstance`:

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
   in the [consume documentation](/nb/altinn-studio/v8/reference/api/consume#benytte-klient-i-applogikk).
   Then call the method that triggers the request in the appInstantiationClient like this:

   ```csharp
   Instance applicationBInstance = await _appInstantiationClient.CreateNewInstance([AppOwnerOrgName], [applicationB], [instanceTemplate]);
   ```

If the client should authenticate itself as the end user, rather than the app owner via Maskinporten, see
the [app-lib client implementations](https://github.com/Altinn/app-lib-dotnet/tree/main/src/Altinn.App.Core/Infrastructure/Clients)
for details on how to customise the API request in the AppInstantiationClient to achieve this.

## Delivering data to app B

### Understanding why you manipulate the data in app A

It is natural to utilise the multi-app solution to control the presentation of information in app
B dynamically, depending on what data is entered in an instance of app A.
This means that all customisations on app B that depend on data retrieved from app A must be done in app A
and in some way delivered or represented in app B.

### Retrieving data from app A

Before you can add any data types, you must retrieve them from Altinn Storage since the app does not have
direct access to this by default.
The most likely data type to pass on from app A to app B is the PDF that includes all the
information filled in to the instance of app A.
To retrieve this data from app A, you must fetch it from Altinn Storage.
The PDF exists on the instance object as part of the `dataTypes` field with the name `ref-data-as-pdf`.
You can retrieve this by getting hold of the instance object and fetching the data directly on the object, or by using the already
defined `GetBinaryData` method on the data client.
See example code below for both:

```csharp
// Using the instance object directly with the GetInstance method on the InstanceClient
Instance updatedInstance = await _instanceClient.GetInstance(innsendingsApp, mutliAppOwner, int.Parse(instance.InstanceOwner.PartyId), instanceGuid);
DataElement pdf = updatedInstance.Data.FindLast(d => d.DataType == "ref-data-as-pdf");

// Using the GetBinaryData method on the DataClient
var stream = await _dataClient.GetBinaryData(instance.Org, instance.AppId,int.Parse(instance.InstanceOwner.PartyId), instanceGuid, Guid.Parse(pdf.Id));
```

_NB: To use these methods in the `ProcessTaskEnd` class, you must configure the constructor to use the
InstanceClient and/or DataClient._

<a name="kontrollere-data-i-app-b"></a>

### Controlling data in app B from app A

You can control certain data in app B in several ways, where you can utilise one or more:

- **Alt 1:** Add data as values in the data model of app B by adding the data model field name and
  the corresponding value in the `prefill` field of the instance template that you created in
  the [Trigger creation of app B](#triggering-creation-of-app-b) section above.
- **Alt 2:** If the intention is to manipulate the texts in the Altinn inbox for instances of app B,
  use [_presentation fields_](/nb/altinn-studio/v8/reference/configuration/messagebox/presentationfields).

- **Alt 3:** Add data as binary data by sending a POST request to the instance of app B.

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
