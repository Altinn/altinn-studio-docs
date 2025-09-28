---
title: AttachmentList
linktitle: AttachmentList
description: Shows a list of all (or some) attachments uploaded in the form
weight: 10 # Do not change, the components will be sorted alphabetically
toc: true
---

## Usage

The `AttachmentList` component can be used to show all attachments uploaded in the form, as well as link to them so that
the user can download them. You can also limit the component to only show a selection of attachment types/data types.

### Anatomy

![AttachmentList](./AttachmentList.png)

## Properties

The following is a list of the properties available for {{% title %}}.

{{% notice warning %}}
We are currently updating how we implement components, and the list of properties may not be entirely accurate.
{{% /notice %}}

| **Property**                 | **Type** | **Description**                                                                                                                                                               |
|------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                         | string   | The component ID. Must be unique within all layouts/pages in a layout set. Cannot end with <hyphen><number>.                                                                  |
| `type`                       | string   | Must be `AttachmentList`.                                                                                                                                                     |
| `textResourceBindings.title` | string   | Title to be displayed over the list of attachments.                                                                                                                           |
| `dataTypeIds`                | string[] | List of data types to be displayed in the list. If no data types are specified, all attachments will be shown.                                                                |
| `links`                      | boolean  | Shows links to the attachments in the list. This is enabled by default. If it is disabled (set to `false`), only the names of the attachments will be shown along with icons. |

## Configuration

{{% notice warning %}}
We are currently updating Altinn Studio Designer with more configuration options!
 The documentation is continuously updated, and there may be more settings available than what is described here, and some settings may be in beta version.
{{% /notice %}}

### Add component

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

You can add a component in [Altinn Studio Designer](/en/altinn-studio/v8/getting-started/) by dragging it from the list of components to the page area.
Selecting the component brings up its configuration panel.

{{</content-version-container>}}
{{<content-version-container version-label="Code">}}

Basic component:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="6-12"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  {
    "data": {
      "layout": [
        {
          "id": "myAttachmentList",
          "type": "AttachmentList",
          "textResourceBindings": {
            "title": "All attachments"
          }
        }
      ]
    }
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Limit attachment types

You can limit the component to show a selection of attachment types/data types. Valid values are:
- All data types defined in `applicationmetadata.json` under `dataTypes`, except for data models (these are never considered attachments)
- The data type `ref-data-as-pdf` (represents automatically generated PDF files for a filled-out form).

Example:

```json{hl_lines="7-10"}
{
  "id": "myAttachmentList",
  "type": "AttachmentList",
  "textResourceBindings": {
    "title": "Some attachments"
  },
  "dataTypeIds": [
    "ref-data-as-pdf",
    "my-custom-data-type"
  ]
}
```