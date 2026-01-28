---
draft: false
headless: true
hidden: true
---

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

{{< highlight json "linenos=false, hl_lines=5 11-12" >}}
{
  "id": "restrictedDataModel",
  "allowedContentTypes": ["application/xml"],
  "appLogic": {
    "autoCreate": false,
    "classRef": "Altinn.App.Models.RestrictedDataModel"
  },
  "taskId": "Task_1",
  "maxCount": 1,
  "minCount": 1,
  "actionRequiredToRead": "customActionRead",
  "actionRequiredToWrite": "customActionWrite"
}
{{< /highlight >}}
