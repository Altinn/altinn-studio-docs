---
title: Configuring a subform
linktitle: Subform
description: A subform is a form within a form.
weight: 120
---

{{% notice warning  %}}
This documentation is a work in progess. Subforms are currently in preview-release.
{{% /notice %}}

Subforms are contained in a subform table. Let us go through configuring a subform table and the subform contained within.

1. [Create a data model](../../../app/development/data/data-modeling) for the subform.
2. You should now see the three files under `App/model`. The c# class, the json schema and the xsd.
3. Set [appLogic.allowInSubform](../../../api/models/app-metadata/#applicationlogic) to **true** in **applicationMetadata.json**.
4. Create a folder under **App/ui** with your desired subform name.
5. In the subform folder, add a `Settings.json` file and a folder called **layouts**.
6. You can add page layouts to the layouts folder as you would for the main form.
   {{< notice warning >}}
   Subforms do not support attachments, and nesting subforms is not allowed.
   {{< /notice >}}
7. The **Settings.json** file for the sub form is [configured as normal](../../../app/development/ux/pages/#settings).
8. Add a layout set to `layout-sets.json` with the data type of the data model from step 1. The **type** is **subform**. Choose your subform folder name as the id.
   ```
        {
            "id": "desired-subform-name",
            "dataType": "your-subform-dataType",
            "type": "subform"
        },
   ```
9. Navigate to the layout for the page in the main form in which you want to add the sub form table.
10. Add `Subform` with the [configuration you want](../../reference/subform/config-options/). Example:
    ```
        {
            "id": "subform-mopeder",
            "type": "Subform",
            "textResourceBindings": {
            "title": "subform-moped.title",
            "addButton": "subform-moped.add"
            },
            "layoutSet": "moped-subform",
            "showAddButton": true,
            "showDeleteButton": true,
            "tableColumns": [
            {
                "headerContent": "subform-moped.regno",
                "cellContent": {
                "query": "RegNo"
                }
            },
            {
                "headerContent": "subform-moped.merke",
                "cellContent": {
                "query": "Merke"
                }
            },
            {
                "headerContent": "Ekstra info",
                "cellContent": {
                "query": "EkstraInfoData",
                "default": "moped-extrainfo.value.default"
                }
            }
            ]
        },
    ```
    {{<children />}}
