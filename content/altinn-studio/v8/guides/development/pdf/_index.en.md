---
title: PDF
tags: [altinn-apps, process, bpmn, task, service task, pdf, systemoppgave]
weight: 15
---

PDF generation is included with the app as a standard service task that can be added as a step in the process.

{{<notice warning>}}
Previously, this functionality was not in a service task but was built into the general code for changing process steps. If your app was set up before version 8.9, you should disable the functionality running outside the process definition.

You do this by turning off "enablePdfGeneration" on all data types.

Benefits of migrating to a service task are:
- Ability to retry if PDF generation fails, without having to run a full process next again, which can have unintended side effects.
- Ability to create many PDFs based on one task, or combine many tasks into one PDF.
- In the future: Run PDF generation as a background job with automatic retries and better scaling.
{{</notice>}}

You can use the workflow tab in Altinn Studio to add a PDF service task. There are two options:

{{% expandlarge id="auto-generated-pdf" header="Auto-generated PDF based on previous tasks" %}}

The following service task will be inserted into `process.bpmn`. The content will be based on the components in the form, but in "summary mode". This function does not respect the pdfLayoutName configuration in Settings.json.

{{< code-title >}}
  App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:serviceTask id="Pdf_auto" name="PDF">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>pdf</altinn:taskType>
            <altinn:pdfConfig>
                <altinn:filenameTextResourceKey>pdfFileName</altinn:filenameTextResourceKey>
                <altinn:autoPdfTaskIds>
                    <altinn:taskId>Form1</altinn:taskId>
                    <altinn:taskId>Form2</altinn:taskId>
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

The following service task will be inserted into `process.bpmn`. With this option, you can define the content of the PDF yourself in a layout-set for the PDF service task.

{{< code-title >}}
  App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:serviceTask id="Pdf" name="PDF">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>pdf</altinn:taskType>
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

A new layout-set is needed for the PDF service task to define the content. This will be automatically generated if you use the workflow editor. Then you only need to edit the content in `PdfLayout.json`.

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
        "Task_Utfylling"
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
        "taskId": "Task_Utfylling",
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
        "id": "Summary_form",
        "type": "Summary2",
        "target": {
          "type": "layoutSet",
          "taskId": "form"
        }
      }
    ]
  }
}
```

#### ServiceTask.json

This layout file is displayed if PDF generation fails. It can contain error messages or instructions for the user.

{{< code-title >}}
  App/ui/Pdf/layouts/ServiceTask.json
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
          "title": "Oops! The PDF service task failed, that was probably not intentional!"
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
        "id": "reject-button",
        "type": "ActionButton",
        "textResourceBindings": {
          "title": "Go back"
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

## Testing

Fill out the form and proceed. When you reach the service task for PDF in the workflow, the PDF should be generated and automatically proceed to the next element in the BPMN process, for example the receipt.

## Troubleshooting

If you get an error message that the service task failed during PDF generation, it can be helpful to open the form in the app and add the query param pdf=1. Then you will see the same content that the PDF should have contained, and possibly the same error messages in the frontend.
