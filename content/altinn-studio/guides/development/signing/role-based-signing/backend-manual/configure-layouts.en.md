---
hidden: true
---

Add a folder under `App/ui` for your singing task called `signing` or some other logical name.
Update `App/ui/layout-sets.json` with a new page group, using the same `id` as the folder you just created.

Your updated `layout-sets.json` can look something like this:

```json
  {
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout-sets.schema.v1.json",
    "sets": [
      {
        "id": "form",
        "dataType": "model",
        "tasks": [
          "Task_1"
        ]
      },
      {
        "id": "signing",
        "dataType": "model",
        "tasks": [
          "SigningTask"
        ]
      }
    ]
  }
```

In the folder you created, add a new file called `signing.json`.

There are standard components that can be used to build a layout set for a signing step. You are not required to use these components, but it is recommended.

- SigningDocumentList:
  - Lists the data being signed. For example attachments, XML data or a PDF summary from an earlier step.
- SigneeList:
  - The real inteded use of this component is to show the signees expected to sign and their signing status.
  - As of now this list doesn't support showing roles that should sign, only people and organisations that have been delegated access rights at runtime. But as soon as a person clicks "sign", they will show up, so we can use it as a "Signatures" list, to show who has signed.
- SigningStatusPanel: 
  - Determines the current status of the singing task and present relevant information and buttons to the end user, for instance the "Sign"-button.

If you choose not to use the SingingStatusPanel to display the "Sign"-button, you must as a minimum add an action button with action `sign`, to allow the end user to sign.

Example of usage of the standard components:

```json
{
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
    "data": {
      "layout": [
      {
        "id": "headerSigningFounders",
        "type": "Header",
        "size": "L",
        "textResourceBindings": {
          "title": "Her kan man ha en overskrift"
        }
      },
      {
        "id": "signing-documents",
        "type": "SigningDocumentList",
        "textResourceBindings": {
          "title": "Dokumenter som skal signeres",
          "description": "Dokumenter som skal signeres beskrivelse"
        }
      },
      {
        "id": "signee-list",
        "type": "SigneeList",
        "textResourceBindings": {
          "title": "Signaturer"
        }
      },
      {
        "id": "signing-state",
        "type": "SigningStatusPanel"
      }
    ]
    }
  }
```

You can override the text that is shown when the list is empty, before anyone signed, by adding a text resource override for the key `signee_list.no_signees` in the text resource files.
```json
{
  "id": "signee_list.no_signees",
  "value": "No signatures yet."
}
```