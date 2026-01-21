---
title: Signing (Signering)
linktitle: Signing (Signering)
description: Components related to the signing process
schemaname: Signing # Component schema name used to autogenerate list of properties from json schema (replace with appropriate component name)
weight: 10 # Do not change, the components will be sorted alphabetically
toc: true
---

{{% notice warning %}}
🚧 This documentation is a work in progress.
{{% /notice %}}

---

## SigneeList

The *SigneeList* component allows the instance owner to get an overview of the signing process. It shows whether the delegation and
communication have been successful, and whether the signee has signed yet.

In the case of user delegated signing for an organization, the name of the signee is populated after a person has signed
on behalf of the organization.

### Anatomy

![SigneeList anatomy](signeelist-anatomy-en.png "SigneeList statuses")

1. **Title** - Component title.
2. **Help** - Click for help pop-up. Optional.
3. **Description** - Description.
4. **SigneeList Table** - Table containing the status of the signees.
    * Column 1 - Name of the signee.
    * Column 2 - Name of organization if signing on behalf of a company
    * Column 3 - Status of the signing process for the signee

## SigneeList Configuration

### Add component / Example

      {
        //The ID of the component
        "id": "signee-list", 
        //The type, must be set to SigneeList
        "type": "SigneeList",
        //Customize the texts
        "textResourceBindings": {
          //The title
          "title": "Status of signees",
          //The description
          "description": "The signees and their status",
          //The help text pop-up - optional
          "help": "The people who are to sign the signing documents."
          //The summary title of the component. Will be used as title in pdf - optional
          "summaryTitle": "The following have signed"
        }
      },

---

## SigningActions

The **SigningActions** component takes into account the currently logged in user and the state of the signing step to display
actions that the user may execute. The component may only be used on a signing task.

### Anatomy

![SigningActions anatomy](signing-actions.svg "The different views in SigningAction")

1. The user is a signee, and has not signed yet. As the checkbox is not checked, the sign button is greyed out.
2. The user is a signee, and has not signed yet. The checkbox is checked, so the sign button is active.
3. The user is the instance owner. Not all signees have signed, so the submit button is greyed out. The instance owner can cancel the signing process with the cancel button.
4. The user is a signee, and has not signed yet. Something has gone wrong when attempting to sign, an error message is displayed.
5. The user is a signee, and has signed. The component displays a title and summary confirming this, and a button for navigating to their inbox is displayed
6. The user is the instance owner. Every mandatory signature is completed, so they can now send in the form. They may also cancel.
7. The user is the instance owner and has signed themselves. Not all mandatory signatures are completed, so they may not send in the form. They may cancel.
8. The user is the instance owner and has sent in the form. A button is shown which allow them to navigate to their inbox.
9. The user is the instance owner. One of the signatures in not valid. They must cancel and fix the issue to proceed.
10. The user is any user. The signature status could not be fetched. This could be due to no internet connection.

## SigningActions Configuration

Add the following to the page layout to include the component:

      {
        "id": "my-id-here",
        "type": "SigningActions"
      }

---

## SigningDocumentList

The **SigningDocumentList** component displays the signing package. The form data and any other documents which are to be
signed on the current signing task will be displayed here. The component may only be used on a signing task.

### Anatomy

![SigningDocumentList anatomy](signingdocumentlist-anatomy.png "SigningDocumentList")

The component consists of:

1. **Title** - Component title.
2. **Help** - Click for help pop-up. Optional.
3. **Description** - Description.
4. **Content** - A table showing the signing package. This includes name, attachment type, size and a download button for each entry.

## SigningDocumentList Configuration - Example

A data model must be created to persist any additional documents for the signing package:
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
