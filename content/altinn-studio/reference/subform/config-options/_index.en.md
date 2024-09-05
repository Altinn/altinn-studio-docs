---
title: Configuration options for subform layout
linktitle: Configuration
description: Options for subform layout configuration
weight: 120
---

{{% notice warning  %}}
This documentation is a work in progess. Subforms are currently in preview-release.
{{% /notice %}}

| Name               | Description                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| autoCreate         | A value indicating whether a data element will be automatically created once an instance moves into the process step indicated by _taskId_. |
| classRef           | The name of the C# class used to represent the form as a model in application logic.                                                        |
| schemaRef          | A reference to the original schema used to define the model.                                                                                |
| disallowUserCreate | A value indicating whether the a user should be able to create an elemement of the data type. Defaults to allow it (false).                 |
| disallowUserDelete | A value indicating whether the a user should be able to delete an elemement of the data type. Defaults to allow it (false).                 |
| allowInSubform     | A value indicating whether the data type is allowed in a subform                                                                            |
