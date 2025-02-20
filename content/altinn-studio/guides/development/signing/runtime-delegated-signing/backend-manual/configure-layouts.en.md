---
hidden: true
---

Add a folder under `App/ui` for your singing task called `signing` or some other logical name.
Update `App/ui/layout-sets.json` with a new page group, using the same `id` as the folder you just created.

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

There are standard components that can be used to build a layout set for a signing step. You are not required to use these components, but it's recommended.

- SigneeList:
  - Lists the signees and their signing status.
- SigningDocumentList:
  - Lists the data being signed. For example attachments, xml-data or a PDF summary from an earlier step.
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
        "id": "signee-list",
        "type": "SigneeList",
        "textResourceBindings": {
          "title": "Personer som skal signere",
          "description": "Personer som skal signere beskrivelse",
          "help": "Dette er personer som skal signere"
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
        "id": "signing-state",
        "type": "SigningStatusPanel"
      }
    ]
    }
  }
```