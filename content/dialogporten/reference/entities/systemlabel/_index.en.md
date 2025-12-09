---
title: 'System label'
description: 'Reference information about the system label entity'
weight: 40
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

System labels are predefined end-user context labels used by frontends to organize dialogs into folders or sorting categories (e.g., Sent, Bin, Archive).

| SystemLabel          | Description                                                                                                                                                                             |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Default**          | Mutually exclusive with Bin/Archive                                                                                                                                                     |
| **Bin**              | Mutually exclusive with Default/Archive                                                                                                                                                 |
| **Archive**          | Mutually exclusive with Default/Bin                                                                                                                                                     |
| **Sent**             | Automatically added by Dialogporten when a transmission of type <br/>`Submission` or `Correction` is added to the dialog.<br/>Cannot be added or removed by service owners or end users |
| **MarkedAsUnopened** | Marks a dialog as unopened/unread. Can be set and removed by service owners and end users                                                                                     |

**Default**/**Bin**/**Archive** are required system labels. They are mutually exclusive, meaning that a dialog can only have one of these labels at a time.
If you are bulk changing system labels, use "Add".

*Note: The `systemLabels` property on the below entities are deprecated. Use the `addLabels` and `removeLabels` properties instead.*

{{<swaggerdisplayentity "V1ServiceOwnerEndUserContextCommandsBulkSetSystemLabels_BulkSetSystemLabel">}}

{{<swaggerdisplayentity "V1ServiceOwnerEndUserContextCommandsSetSystemLabel_SetDialogSystemLabelRequest">}}


{{<children />}}

