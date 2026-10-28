---
draft: true
headless: true
hidden: true
---

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "id": "signatures",
  "allowedContentTypes": [
    "application/json"
  ],
  "allowedContributors": [
    "app:owned"
  ],
  "minCount": 1,
  "actionRequiredToRead": "signature-access",
  "actionRequiredToWrite": "signature-access"
}
```
