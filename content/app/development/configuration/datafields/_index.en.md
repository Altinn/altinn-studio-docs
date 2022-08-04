---
title: Data fields on instance object
linktitle: Data fields
description: Configuration of data fields for app.
weight: 200
---

It is useful to add extra information to instance objects in some cases. For example allowing routing the instance to the correct system in a service owners backend.

This can be done in two ways, by configuration or manually. Using configuration, the system will extract data from the form fields and add these to the instance object. This method is limited to form fields, but avoids programming it by yourself. If you choose to do it manually you have the freedom to add data you might want from for example external APIs, calculations, string constants, etc.

It is also possible to make use of both methods as long as you use different ids on the data fields. The configured values will then be collected together with the manual ones in the instance.

Data fields are in many ways similar to [presentation fields](../messagebox/presentationfields/). But where the use of presentation fields is predefined, the use of data fields is completely up to the individual application owner.

## Configuration
Configuration of data fields is done in `applicationmetadata.json` which is located in the folder `App/config`.

Add a new object with the key `dataFields`, using the following properties

 Name     | Description
----------|------------
id        | The ID of the datafield. Used to identify the field when saved in the instance. 
path      | Datamodel path to the form field. This value is the same value that is bound to a component in the app's layout file. 
dataTypeId| Id of the datamodel where the value is collected from.

The configuration for an app with two defined data fields will look like this:

  ```json
"dataFields": [
    {
    "id": "AnsettelseAntAar",
    "path": "OpplysningerOmArbeidstakeren-grp-8819.Arbeidsforhold-grp-8856.AnsattAar-datadef-33267.value",
    "dataTypeId": "default"
    },
    {
    "id": "Navn",
    "path": "OpplysningerOmArbeidstakeren-grp-8819.OpplysningerOmArbeidstakeren-grp-8855.AnsattNavn-datadef-1223.value",
    "dataTypeId": "default"
    }]
  ```

The result will be a list in the instance object with values from the configured fields:
```json
"dataValues": {
    "AnsettelseAntAar": 10,
    "Navn": "Ola Nordmann"
}
```
Notice that the instance object is named `dataValues` even when the configured is named `dataFields`, this is because `dataValues` is the 
result of the configuration which is done in `dataFields`.

## Manually
To manually add data values the method `UpdateDataValues`from the IInstance interface is used. It is the same method which is called when the fields in `dataValues` are populated from configuration and it will merge all values into a list. 

{{%notice warning%}}
Be aware that it is the application developer's responsibility to ensure unique IDs if you combine data values between configuration and a manual implementation.
Values that share IDs will override each other and there is no way to guarantee which will be saved in the instance. 
{{% /notice%}}

The example below displays how to set data values manually. In this case it is done by adding code
within `RunProcessTaskEnd` in `App.cs`, which is run when a task is completed.

```cs
public override async Task RunProcessTaskEnd(string taskId, Instance instance)
{
    var customDataValues = new DataValues() { Values = new Dictionary<string, string>() { { "customKey", "customValue" } } };
    var (instanceOwnerPartyId, instanceGuid) = InstanceHelper.DeconstructInstanceIdFromUrl(_httpContextAccessor.HttpContext.Request.Path.Value);

    await _instanceService.UpdateDataValues(instanceOwnerPartyId, instanceGuid, customDataValues);

    await Task.CompletedTask;
}
```

{{%notice warning%}}
It is recommended to think through the necessity of these values for the instance object so that it avoids unnecessary API calls which impact the performance of the application.
{{% /notice%}}
