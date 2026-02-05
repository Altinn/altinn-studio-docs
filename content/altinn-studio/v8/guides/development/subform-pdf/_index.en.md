---
title: PDF subform
description: How to set up PDF generation for subforms
weight: 16
---

## Overview

The subform PDF service task allows you to generate separate PDF documents for each instance of a subform.

{{<notice warning>}}
This functionality generates multiple PDFs during a single HTTP request to the app backend. There are limitations on how many PDFs you should generate simultaneously this way. In the future, this will be able to run as a background job, and this limitation will disappear. Test with a realistic number of PDFs in the test environment to identify any limits.
{{</notice>}}

{{%notice info%}}
Requires at least version 8.9.0 of the Altinn NuGet packages.
{{%/notice%}}

## Prerequisites
- You have an application with one or more subforms. This guide does not cover setting up the subform itself.

## Setup

### Process.bpmn

To enable PDF generation for subforms, you must add a `serviceTask` of type `subformPdf` to your workflow.

**Note:** Eventually, it will be possible to drag in subform PDF directly via the Arbeidsflyt-editor in Altinn Studio, but this functionality is not yet available.

Until then, we recommend the following approach:
1. Drag in a regular data task in the Arbeidsflyt-editor.
2. Share the changes in Studio.
3. Edit `process.bpmn` manually on your own machine.
4. Convert the data task to a `bpmn:serviceTask` (see example below).

This ensures that sequence flows and the diagram are correct.

```xml
<bpmn:serviceTask id="PdfSubform" name="PDF - subform">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>subformPdf</altinn:taskType>
            <altinn:actions>
              <altinn:action>reject</altinn:action> <!-- Added using "Handlinger", if the user should be able, for instance, go backwards in the process. -->
            </altinn:actions>
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
| `filenameTextResourceKey` | Key to the text resource that defines the filename for the generated PDF. Can contain variables. Consider using a variable in the filename to easily distinguish between different subform PDFs. |
| `subformComponentId`(*)   | The ID of the subform component. You must have a copy of the component both where the subform is in the main form, and in the ServiceTask.json layout of the service task.                     |
| `subformDatatTypeId`(*)   | The data type ID for the subform.                                                                                                                                                              |

Example of text resource for filename with variable:

```json
{
      "id": "pdfFileName",
      "value": "My filename {0}",
      "variables": [
        {
          "key": "MySubformProperty",
          "dataSource": "dataModel.SubformModel"
        }
      ]
    }
```

### Layout-sets.json

You must define a separate layout set for the service task that generates the PDF of the subform.

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

This file defines how the PDF should look. Here you typically use a `Summary2` component to display a summary of the subform:


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

This layout file shows content to the user if PDF generation fails, such as error messages or instructions.

**Note:** You must also add a hidden copy of the subform component to this layout for PDF generation to work correctly. See `mySubformComponentId` below. We hope to remove this requirement in a future version, but it is currently required.

{{< code-title >}}
ui/underskjemaPdf/layout/ServiceTask.json
{{< /code-title >}}

```json
{
   "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
   "data": {
      "layout": [
         {
            "size": "L",
            "id": "service-task-title",
            "type": "Header",
            "textResourceBindings": {
               "title": "service_task.title"
            }
         },
         {
            "id": "service-task-body",
            "type": "Paragraph",
            "textResourceBindings": {
               "title": "service_task.body"
            }
         },
         {
            "id": "service-task-help-text",
            "type": "Paragraph",
            "textResourceBindings": {
               "title": "service_task.help_text"
            }
         },
         {
            "id": "service-task-button-group",
            "type": "ButtonGroup",
            "children": [
               "service-task-retry-button",
               "service-task-back-button"
            ]
         },
         {
            "id": "service-task-retry-button",
            "type": "Button",
            "textResourceBindings": {
               "title": "service_task.retry_button"
            }
         },
         {
            "id": "service-task-back-button",
            "type": "ActionButton",
            "textResourceBindings": {
               "title": "service_task.back_button"
            },
            "action": "reject",
            "buttonStyle": "secondary"
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

Fill out the main form and add one or more instances of the subform. When you reach the subform PDF service task in the workflow, the app generates a PDF for each instance of the subform and automatically proceeds to the next step in the process, such as the receipt.

## Troubleshooting

If you get an error message that the service task failed during PDF generation, you can open the subform in the app and add the query parameter `pdf=1`. You will then see the same content the PDF should have displayed, and any error messages.
