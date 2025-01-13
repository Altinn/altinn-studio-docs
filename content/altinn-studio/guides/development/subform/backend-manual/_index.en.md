---
hidden: true
---

{{% notice warning  %}}
This documentation is a work in progess. Subforms are currently in preview-release.
{{% /notice %}}

Subforms are contained in a subform table. Let us go through configuring a subform table and the subform contained within.

1. [Create a data model](/altinn-studio/reference/data/data-modeling) for the subform.
2. You should now see the three files under `App/model`. The c# class, the json schema and the xsd.
3. Set [appLogic.allowInSubform](/api/models/app-metadata/#applicationlogic) to **true** in **applicationMetadata.json**.
4. Create a folder under **App/ui** with your desired subform name.
5. In the subform folder, add a `Settings.json` file and a folder called **layouts**.
6. You can add page layouts to the layouts folder as you would for the main form.
   {{< notice warning >}}
   Subforms do not support attachments, and nesting subforms is not allowed (subform in subform).
   {{< /notice >}}
7. The **Settings.json** file for the sub form is [configured as normal](/altinn-studio/reference/ux/pages/#settings).
8. The button which closes the subform must be a [CustomButton](/altinn-studio/reference/ux/components/customButton) with a `closeSubform` action. Optionally you can also trigger validation before exiting.
   ```json
   {
     "id": "subform-exitbutton",
     "type": "CustomButton",
     "textResourceBindings": {
       "title": "The button title" // Defaults to `general.done` if omitted
     },
     "actions": [
       {
         "type": "ClientAction",
         "id": "closeSubform",
         // Validation is optional
         "validation": {
           "page": "all",
           "show": ["All"]
         }
       }
     ]
   }
   ```
9. Add a layout set to `layout-sets.json` with the data type of the data model from step 1. The **type** is **subform**. Choose your subform folder name as the id.
   ```json
   {
     "id": "subform-layout-folder-name",
     "dataType": "your-subform-dataType",
     "type": "subform"
   }
   ```
10. Navigate to the layout for the page in the main form in which you want to add the sub form table.
11. Add `Subform` with the [configuration you want](/altinn-studio/guides/development/subform/config-options). Example:
    ```json
    {
      "id": "subform-test",
      "type": "Subform",
      "textResourceBindings": {
        "title": "subform-test.title",
        "addButton": "subform-test.add"
      },
      "layoutSet": "subform-layout-folder-name",
      "showAddButton": true,
      "showDeleteButton": true,
      "tableColumns": [
        {
          "headerContent": "subform-test.name-header",
          "cellContent": {
            "query": "Name"
          }
        },
        {
          "headerContent": "subform-test.age-header",
          "cellContent": {
            "query": "Age"
          }
        },
        {
          "headerContent": "subform-test.extrainfo-header",
          "cellContent": {
            "query": "ExtraInfo",
            "default": "subform-test.extrainfo.default"
          }
        }
      ]
    }
    ```

{{< notice info >}}
Subforms can have their own summary page and be a part of the main forms summary.
To add a subform into the main forms summary, use the subform id from the main forms layout, and the type "component".
{{< /notice >}}
