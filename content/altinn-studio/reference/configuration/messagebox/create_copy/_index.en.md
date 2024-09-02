---
title: Create new copy
linktitle: Create copy
description: This page describes how to configure the create new copy functionality in an app.
weight: 200
---

## Description
The primary purpose of the create new copy feature is to make it easy for a user of the portal to start a new submission by copying a previously completed submission. The user just need to navigate to the instance they would like to copy and then click on the link Create new copy". The App will then create a new instance and open it in the browser ready for form filling with fields already filled in with data from the original.

{{%notice info%}}
The Create new copy functionality was introduced in version 7.9.0 of the nuget packages.
[See how to update the nuget references of your application here](/altinn-studio/reference/maintainance/dependencies/).
{{% /notice%}}

## Configuration

{{% notice info  %}}
The configuration has a retroactive effect and will also apply to previously created instances.
{{% /notice %}}

In addition to turning the functionality on and off, it is possible to exclude data types and data fields in a schema from being copied.

| Name               | Description                                                                      |
| ------------------ | -------------------------------------------------------------------------------- |
| enabled            | true/false if its possible to create a copy of an instance.                      |
| excludedDataTypes  | List of DataTypes that should be excluded when a new copy is made.               |
| excludedDataFields | List of fields in the DataModel that should be excluded when a new copy is made. |

### Exclusion of data types

It is possible to provide a list of data types you don't want to be copied over to the new instance, but which data types that can be copied are already fairly limited. The list of excluded data types have therefor limited effect. The copy feature will only copy data elements related to a schema/form. This means that no attachments will be copied. I addition to this the data types being copied needs to be associated with the first step in the process for the app.

### Exclusion of data fields

The list of excluded fields can be used to indicate which fields you don't want to be copied over to the new data element. The purpose of this feature is to empty fields you know will need to vary from one submission to the next. This could be a field that indicate which quarter of the year the submission is relevant for. Here the app developer will need to consider the different fields, the usage of the app and what would be the best for the user. The selected fields should be indicated with dot-notation in the same way as when doing data binding in layout files.

## Examples

Configuration for turning the *Create new copy* feature on and off.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true
}
```

Configuration where the Create new copy is activated and where two fields in two separate groups within the model is being excluded.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true,
    "excludedDataFields": [
        "group1.felt2",
        "group23.felt21"
    ]
}
```
## Programing interface

During the copying of an instance the logic will perform a method call to **IInstantiationProcessor.DataCreation**. This makes it possible to perform programmatic changes to the data as it is being copied. [Programmatic prefill](/altinn-studio/guides/prefill/custom/).
