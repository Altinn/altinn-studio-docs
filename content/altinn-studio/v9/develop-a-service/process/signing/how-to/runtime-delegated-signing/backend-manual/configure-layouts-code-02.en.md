---
draft: true
headless: true
hidden: true
---

{{< code-title >}}
App/ui/SigningTask/layouts/signing.json
{{< /code-title >}}

```json
{
  "$schema": "https://altinn.studio/designer/app-dist/9.0.0-preview.9/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "headerSigningFounders",
        "type": "Heading",
        "size": "M",
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
        "type": "SigningActions"
      }
    ]
  }
}
```
