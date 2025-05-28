---
title: SigningDocumentList
linktitle: SigningDocumentList
description: A component that displays the signing package
schemaname: SigningDocumentList 
weight: 10 
toc: true
---

{{% notice warning %}}
🚧 This documentation is a work in progress.
{{% /notice %}}

---

## Usage

The **SigningDocumentList** component displays the signing package. The form data and any other documents which are to be
signed on the current signing task will be displayed here. The component may only be used on a signing task.

### Anatomy

![SigningDocumentList anatomy](signingdocumentlist-anatomy.png "SigningDocumentList")

The component consists of:

1. **Title** - Component title.
2. **Help** - Click for help pop-up. Optional.
3. **Description** - Description.
4. **Content** - A table showing the signing package. This includes name, attachment type, size and a download button for each entry.

## Configuration - Example

A datamodell must be created to persist any additional documents for the signing package:

    {
      "id": "extra-documents-to-sign",
      "allowedContentTypes": [
        "application/pdf",
        "image/png",
        "text/plain",
        ...
      ],
      "taskId": "task-where-instance-owner-adds-documents",
      ...  
    },

The signing package must be defined in the process.bpmn file:

        <altinn:signatureConfig>
          <altinn:dataTypesToSign>
            //The form data is a part of the signing package
            <altinn:dataType>ref-data-as-pdf</altinn:dataType>
            //The extra documents are a part of the signing package
            <altinn:dataType>extra-documents-to-sign</altinn:dataType>
          </altinn:dataTypesToSign>
        </altinn:signatureConfig>

The component is added to a page layout as such:

      {
        //The ID of the component
        "id": "signing-documents",
        //The type, must be set to SigningDocumentList
        "type": "SigningDocumentList",
        "textResourceBindings": {
          //The title
          "title": "Dokumenter som skal signeres",
          //The description
          "description": "Dokumenter som skal signeres beskrivelse"
        }
      },

The attachment type of a document may be changed by adding one or more tags.