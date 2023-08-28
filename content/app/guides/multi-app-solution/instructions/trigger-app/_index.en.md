---
title: Trigger Application
linktitle: Trigger Application
description: Instructions for setting up the trigger application
weight: 10
toc: true
aliases:

- /app/multi-app-solution/instructions/trigger-app

---

## Setup app to use Maskinporten Integration

In the process of setting up the application to use the
integration there are three things that needs to be done;

1. For the application to be able to read the secrets from
   Azure keyvault the application need to be configured to
   do so. See
   the [secrets section](../../../../development/configuration/secrets)
   to achieve this.
2. Add the appsettings section example
   from [Key Vault Usage](../../preparations#key-vault-usage) into
   the `appsettings.json` file in the application that
   should perform the instantiation of the receiving
   application. Remember to adapt the section
   name `MaskinportenSettings` to the name you chose for the
   secrets in Azure keyvault.
3. Modify the `program.cs` file for the same application to
   connect to Azure keyvault. Continue reading for a
   detailed explanation.

### Modifying `program.cs` to use Key Vault

First of all you need to add the MaskinportenHttpClient
service in the function `RegisterCustomAppServices`:

```csharp
services.AddMaskinportenHttpClient<SettingsJwkClientDefinition, AppClient>(config.GetSection("MaskinportenSettings"));
```

Then you need to add the following
function `ConnectToKeyVault` in the bottom of the file:

```csharp
static void ConnectToKeyVault(IConfigurationBuilder config)
{
    IConfiguration stageOneConfig = config.Build();
    KeyVaultSettings keyVaultSettings = new KeyVaultSettings();
    stageOneConfig.GetSection("kvSetting").Bind(keyVaultSettings);
    if (!string.IsNullOrEmpty(keyVaultSettings.ClientId) &&
        !string.IsNullOrEmpty(keyVaultSettings.TenantId) &&
        !string.IsNullOrEmpty(keyVaultSettings.ClientSecret) &&
        !string.IsNullOrEmpty(keyVaultSettings.SecretUri))
    {
        string connectionString = $"RunAs=App;AppId={keyVaultSettings.ClientId};" +
                                  $"TenantId={keyVaultSettings.TenantId};" +
                                  $"AppKey={keyVaultSettings.ClientSecret}";
        AzureServiceTokenProvider azureServiceTokenProvider = new AzureServiceTokenProvider(connectionString);
        KeyVaultClient keyVaultClient = new KeyVaultClient(
            new KeyVaultClient.AuthenticationCallback(
                azureServiceTokenProvider.KeyVaultTokenCallback));
        config.AddAzureKeyVault(
            keyVaultSettings.SecretUri, keyVaultClient, new DefaultKeyVaultSecretManager());
    }
}
```

This function can then be used in the
function `ConfigureWebHostBuilder`. The function already
exist, so just change the content to the following:

```csharp
void ConfigureWebHostBuilder(IWebHostBuilder builder)
{
    builder.ConfigureAppConfiguration((_, configBuilder) =>
    {
        configBuilder.LoadAppConfig(args);
        ConnectToKeyVault(configBuilder);
    });
}
```

## Add task to process

In most cases it is necessary to pass the data the end user
has added to the form, to the receiver application. The data
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
instantiation of the receiver application happens when the
task is finished, i.e. use the `ProcessTaskEnd.End()`
function. This is necessary since the user can go back
to the data task and do changes.

{{% notice warning %}}
Using this task type requires nuget version 8, assuming that you wish to allow the user to go back to the data task. 
{{% /notice %}}

### Feedback Task Type

If using the _feedback_ task type, the instantiation of the
receiving application can be done on the task start
function. Be aware that there has to be some external
triggers that can make sure the application is moved to the
end task event, or else it will stay on the feedback task
forever. The external trigger cannot be the receiving
application since this application will send the request to
end the original request sent from the trigger application
while the trigger application is waiting for the same
request to complete, which will cause a conflict.

TODO: Is it necessary with multiple steps if pdf of form is
not sent to receiver app?

### Update `process.bpmn` and `policy.xml` accordingly

Remember to update the process.bpmn file to match the the
process, and remember adding gateways if you have chosen
the _confirm_ task type.

Policy.xml also needs updates so read and write operations
can be done on the new task.

## Trigger the instantiation of the receiving app

The instantiation of the receiving application is done with
an api call to the running receiving application. The
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
Instance receivingInstance = await _appClient.CreateNewInstance([AppOwnerOrgName], [receivingApp], [instanceTemplate]);
```

In the AppClient add this code:

```csharp
public async Task<Instance> CreateNewInstance(string org, string app, InstansiationInstance instanceTemplate)
{
   string apiUrl = $"{AppOwnerOrgName}/{receivingApp}/instances/create";
               
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

## Delivering data to the receiver app

In order to pass data to the the receiving application there
are several ways of doing this.

1. Add data as values on the datamodel of the receiving
   application by adding the data model field name and the
   corresponding value in the `prefill` field of the the
   instance template that you created in the _Trigger the
   instantiation of the receiving app_ section above.
2. If the intention is to manipulate the texts in Altinn
   Inbox for the instances of the receiving application,
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