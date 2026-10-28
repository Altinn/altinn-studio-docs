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
  "id": "signeeState",
  "allowedContentTypes": [
    "application/json"
  ],
  "allowedContributors": [
    "app:owned"
  ],
  "maxCount": 1,
  "minCount": 1,
  "actionRequiredToRead": "signature-access",
  "actionRequiredToWrite": "signature-access"
}
```
