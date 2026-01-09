---
title: PDF subform
description: How to set up PDF generation for subforms
weight: 16
---

## Overview

The subform PDF service task allows you to generate separate PDF documents for each instance of a subform.

{{<notice warning>}}
This functionality attempts to generate multiple PDFs during the processing of an HTTP request to the app backend. There are certain limitations on how many PDFs should be generated simultaneously in this way. In the future, this will be able to run as a background job, and that limit will disappear. Test with a realistic number of PDFs in a test environment to see if the limit has been reached.
{{</notice>}}

## Prerequisites
- You have an application with one or more subforms. This guide does not show how to set up subforms.

## Setup

### Process.bpmn

To enable PDF generation for subforms, you must add a `serviceTask` of type `subformPdf` to your workflow.

**NB!** Eventually, it will be possible to drag in subform PDF directly via the Workflow editor in Altinn Studio, but this functionality is unfortunately not available yet.

Until then, the following approach is recommended:
1. Drag in a regular data task in the Workflow editor
2. Share the changes in Studio
3. Edit `process.bpmn` manually on your own machine
4. Convert the data task to a `bpmn:serviceTask` (see example below)

This ensures that sequence flows and the diagram are correct.

```xml
<bpmn:serviceTask id="PdfSubform" name="PDF - subform">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>subformPdf</altinn:taskType>
            <altinn:subformPdfConfig>
                <altinn:filenameTextResourceKey>subformPdfFileName</altinn:filenameTextResourceKey>
                <altinn:subformComponentId>mySubformComponentId</altinn:subformComponentId>
                <altinn:subformDatatTypeId>SubformModel</altinn:subformDatatTypeId>
            </altinn:subformPdfConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>Flow_1d4qgf7</bpmn:incoming>
    <bpmn:outgoing>Flow_1psipb3</bpmn:outgoing>
</bpmn:serviceTask>
```

Remember that the task must have an incoming and an outgoing sequence flow.

#### Parameters in subformPdfConfig

| Parameter                 | Description                                                                                                                                                                                                 |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `filenameTextResourceKey` | Key to text resource that defines the filename for the generated PDF. Can contain variables. It may be useful to use a variable in the filename that makes it easy to distinguish between different subform PDFs. |
| `subformComponentId`(*)   | The ID of the subform component. You must have a copy of the component both where the subform should be in the main form, and in the ServiceTask.json layout of the service task.                          |
| `subformDatatTypeId`(*)   | The datatype ID for the subform.                                                                                                                                                                           |

Example of text resource for filename with variable:

```json
{
      "id": "pdfFileName",
      "value": "My filename {0}",
      "variables": [
        {
          "key": "MySubformProperty",
          "dataSource": "datamodel.SubformModel"
        }
      ]
    }
```

### Layout-sets.json

You must define a separate layout set for the service task that will create the PDF of the subform.

```json {hl_lines="18-22"}
{
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout-sets.schema.v1.json",
    "sets": [
      {
         "id": "form",
         "dataType": "model",
         "tasks": ["Task_1"]
      },
      {
         "id": "formPdf",
         "dataType": "model",
         "tasks": ["PdfForm"]
      },
      {
         "id": "underskjema",
         "dataType": "SubformModel"
      },
      {
         "id": "underskjemaPdf",
         "dataType": "SubformModel",
         "tasks": ["PdfSubform"]
      }
    ]
}
```

### UI folder structure

For each subform with PDF generation, you must have the following folder structure under `App/ui/`:

```
App/ui/
├── underskjema/
│   ├── Settings.json
│   └── layouts/
│       ├── Underskjema.json
│       └── PdfLayout.json
└── underskjemaPdf/
    ├── Settings.json
    └── layouts/
        └── ServiceTask.json
```

#### underskjema/Settings.json

```json
{
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
    "pages": {
        "order": ["Underskjema"],
        "pdfLayoutName": "PdfLayout"
    }
}
```

#### underskjema/layout/Underskjema.json

```
It is assumed that a subform is already defined in this file.
```

#### underskjema/layout/PdfLayout.json

This file defines how the PDF should look. It typically uses a `Summary2` component to display a summary of the subform:


{{< code-title >}}
ui/underskjema/layout/PdfLayout.json
{{< /code-title >}}

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "underskjema-summary",
        "type": "Summary2",
        "target": {
          "type": "page",
          "id": "Underskjema"
        }
      }
    ]
  }
}
```

#### underskjemaPdf/Settings.json

{{< code-title >}}
ui/underskjemaPdf/Settings.json
{{< /code-title >}}

```json
{
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
    "pages": {
        "order": ["ServiceTask"]
    }
}
```
#### underskjemaPdf/layout/ServiceTask.json

This layout file is displayed if PDF generation fails. It can contain error messages or instructions for the user.

**NB!** In addition, you must add a hidden copy of the subform component to this layout for PDF generation to work correctly. See `mySubformComponentId` below. We hope to one day be able to remove this, but in the current version it is required.

{{< code-title >}}
ui/underskjemaPDf/layout/ServiceTask.json
{{< /code-title >}}

```json
{
   "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
   "data": {
      "layout": [
         {
            "size": "L",
            "id": "Header-IIkZPf",
            "type": "Header",
            "textResourceBindings": {
               "title": "An error occurred while generating the PDF. Please try again."
            }
         },
         {
            "id": "Button-BddG51",
            "type": "Button",
            "textResourceBindings": {
               "title": "Try again"
            }
         },
         {
            "id": "mySubformComponentId",
            "type": "Subform",
            "layoutSet": "underskjema",
            "hidden": true,
            "tableColumns": [...]
         }
      ]
   }
}
```
## Test

Fill out the main form and add one or more instances of the subform. When you reach the subform PDF service task in the workflow, the PDF should be generated for each instance of the subform and automatically proceed to the next element in the BPMN process, such as confirmation.

## Troubleshooting

If you receive an error message that the service task failed during PDF generation, it may be useful to open the subform in the app and add the query param pdf=1. This will show you the same content that the PDF should have contained, and possibly the same error messages in the frontend.
