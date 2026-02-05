---
title: PDF
description: How to set up PDF generation as a service task
tags: [altinn-apps, process, bpmn, task, service task, pdf, systemoppgave]
weight: 15
---

## Overview

PDF generation is included with the app as a standard service task that can be added as a step in the process.

{{<notice warning>}}
Previously, this functionality was not in a service task but was built into the general code for changing process steps. If your app was set up before version 8.9, you should disable the functionality running outside the process definition.

You do this by turning off "enablePdfGeneration" on all data types.

Benefits of migrating to a service task are:
- Ability to retry if PDF generation fails, without having to run a full process next again, which can have unintended side effects.
- Ability to create many PDFs based on one task, or combine many tasks into one PDF.
- In the future: Run PDF generation as a background job with automatic retries and better scaling.
{{</notice>}}

{{%notice info%}}
Requires at least version 8.9.0 of the Altinn NuGet packages.
{{%/notice%}}

## Setup

You can use the Arbeidsflyt-editor in Altinn Studio to add a PDF service task.

![Add PDF service task](add-pdf-step.png "Add PDF service task")

Drag and drop the PDF service task where in the process you want to generate a PDF, often right after a data task.

Once this is done, a configuration panel will open on the right side of the screen.
There you have two alternative approaches to setting up the PDF: standard or custom.

{{% expandlarge id="auto-generated-pdf" header="Standard PDF based on previous tasks" %}}

When selecting this option, you will be asked to choose which previous tasks should be included in the PDF. The content will be based on the components in the selected tasks, but in "summary mode". This function does not respect the pdfLayoutName configuration in Settings.json.

![Example setup standard PDF](auto-pdf.png "Example setup standard PDF")

A service task will be inserted into `process.bpmn`. May differ slightly from the example below.

{{< code-title >}}
  App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:serviceTask id="Pdf" name="PDF">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>pdf</altinn:taskType>
            <altinn:actions>
              <altinn:action>reject</altinn:action> <!-- Added using "Handlinger", if the user should be able, for instance, go backwards in the process. -->
            </altinn:actions>
            <altinn:pdfConfig>
                <altinn:filenameTextResourceKey>pdfFileName</altinn:filenameTextResourceKey>
                <altinn:autoPdfTaskIds>
                    <altinn:taskId>Task_Utfylling1</altinn:taskId>
                </altinn:autoPdfTaskIds>
            </altinn:pdfConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>Flow_0er70tq</bpmn:incoming>
    <bpmn:outgoing>Flow_19ikt1z</bpmn:outgoing>
</bpmn:serviceTask>
```

{{% /expandlarge %}}

{{% expandlarge id="custom-pdf-layout" header="Custom PDF with its own layout-set" %}}

When selecting this option, you can determine the content of the PDF yourself by defining a layout-set for the PDF service task.

You will first be asked to provide a name for the layout-set of the service task, and then you must choose a data model as the default data model for the set. Here you can, for example, choose the model of one of the tasks that is in the PDF.

![Example setup custom PDF](manual-pdf.png "Example setup custom PDF")

A service task will be inserted into `process.bpmn` and the layout-set files will be generated, however without content in PdfLayout.json.

{{< code-title >}}
  App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:serviceTask id="Pdf" name="PDF">
    <bpmn:extensionElements>
        <altinn:taskExtension>
        <altinn:taskType>pdf</altinn:taskType>
        <altinn:actions>
          <altinn:action>reject</altinn:action> <!-- Added using "Handlinger", if the user should be able, for instance, go backwards in the process. -->
        </altinn:actions>
        <altinn:pdfConfig>
            <altinn:filenameTextResourceKey>pdfFileName</altinn:filenameTextResourceKey>
        </altinn:pdfConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>SequenceFlow_0c458hu</bpmn:incoming>
    <bpmn:outgoing>SequenceFlow_5assd2s</bpmn:outgoing>
</bpmn:serviceTask>
```

### Layout-set

A new layout-set is needed for the PDF service task to define the content. This will be automatically generated if you use the Arbeidsflyt-editor. Then you only need to edit the content in `PdfLayout.json`.

The files and folder structure should look approximately like this:

```
App/ui/
├── layout-sets.json
├── form/
│   ├── Settings.json
│   └── layouts/
│       └── ...
└── Pdf/
    ├── Settings.json
    └── layouts/
        ├── PdfLayout.json
        └── ServiceTask.json
```

#### layout-sets.json

{{< code-title >}}
  App/ui/layout-sets.json
{{< /code-title >}}

```json {hl_lines="11-17"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout-sets.schema.v1.json",
  "sets": [
    {
      "id": "form",
      "dataType": "model",
      "tasks": [
        "Task_Utfylling1"
      ]
    },
    {
      "id": "Pdf",
      "dataType": "model",
      "tasks": [
        "Pdf"
      ]
    }
  ],
  "uiSettings": {
    "taskNavigation": [
      {
        "taskId": "Task_Utfylling1",
        "name": "Utfylling"
      },
      {
        "type": "receipt"
      }
    ]
  }
}
```

#### Settings.json

{{< code-title >}}
  App/ui/Pdf/Settings.json
{{< /code-title >}}

```json
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
    "pdfLayoutName": "PdfLayout",
    "order": [
      "ServiceTask"
    ]
  }
}
```

#### PdfLayout.json

In this file, the content of the PDF is defined. The Summary2 component is often used, either against individual components or against entire pages/layout-sets.

{{< code-title >}}
  App/ui/Pdf/layouts/PdfLayout.json
{{< /code-title >}}

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "InstanceInformation",
        "type": "InstanceInformation"
      },
      {
        "id": "SummaryTaskUtfylling1",
        "type": "Summary2",
        "target": {
          "type": "layoutSet",
          "taskId": "Task_Utfylling1"
        }
      }
    ]
  }
}
```

#### ServiceTask.json

This layout file is displayed if PDF generation fails. It can contain error messages or instructions for the user. Feel free to customize.

{{< code-title >}}
  App/ui/Pdf/layouts/ServiceTask.json
{{< /code-title >}}

```json
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "size": "L",
        "id": "service-task-title",
        "type": "Header",
        "textResourceBindings": {
          "title": "service_task_custom_pdf_default.title"
        }
      },
      {
        "id": "service-task-body",
        "type": "Paragraph",
        "textResourceBindings": {
          "title": "service_task_custom_pdf_default.body"
        }
      },
      {
        "id": "service-task-help-text",
        "type": "Paragraph",
        "textResourceBindings": {
          "title": "service_task_custom_pdf_default.help_text"
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
          "title": "service_task_custom_pdf_default.retry_button"
        }
      },
      {
        "id": "service-task-back-button",
        "type": "ActionButton",
        "textResourceBindings": {
          "title": "service_task_custom_pdf_default.back_button"
        },
        "action": "reject",
        "buttonStyle": "secondary"
      }
    ]
  }
}
```

{{% /expandlarge %}}

## Filename

It is optional to include `<altinn:filenameTextResourceKey>`. Here you can specify a text resource key that will be used as the filename, with language and variable support. If it is missing, the PDF will get the application name as the filename.

```json
{
  "id": "pdfFileName",
  "value": "My filename {0}",
  "variables": [
    {
      "key": "DataModelFieldName",
      "dataSource": "dataModel.model"
    }
  ]
}
```

{{<notice warning>}}
  When using standard PDF `dataModel.default` doesn't work. Use the ID of the datamodel, for instance like this: `dataModel.model`.
{{</notice>}}

## Testing

Fill out the form and proceed. When you reach the service task for PDF in the workflow, the PDF should be generated and automatically proceed to the next element in the BPMN process, for example the receipt.

## Troubleshooting

If you get an error message that the service task failed during PDF generation, it can be helpful to open the form in the app and add the query param pdf=1. Then you will see the same content that the PDF should have contained, and possibly the same error messages in the frontend.
