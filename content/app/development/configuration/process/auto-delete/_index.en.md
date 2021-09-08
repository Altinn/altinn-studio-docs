---
title: Automatic deletion
linktitle: Automatic deletion
description: An application can be configured to delete all traces of it when the process is over.
toc: false
---

For some applications, it can be problematic that there are traces of instances in storage, etc. because of security reasons.

Therefore, it is possible to set a flag in `applicationmetadata.json` that ensures that the instance is physically deleted when service owner confirms that it is received.

By setting `autoDeleteOnProcessEnd` to `true` you will trigger this functionality.

Example:

```json {linenos=false,hl_lines=[48]}
{
  "id": "ttd/apps-test-prod",
  "org": "ttd",
  "title": {
    "nb": "apps-test-prod"
  },
  "dataTypes": [
    {
      "id": "default",
      "allowedContentTypes": [
        "application/xml"
      ],
      "appLogic": {
        "autoCreate": true,
        "classRef": "Altinn.App.Models.Skjema"
      },
      "taskId": "Task_1",
      "maxCount": 1,
      "minCount": 1
    },
    {
      "id": "ref-data-as-pdf",
      "allowedContentTypes": [
        "application/pdf"
      ],
      "maxCount": 0,
      "minCount": 0
    },
    {
      "id": "6aa7d237-f20f-4d42-9361-0c84cf1a8ed0",
      "allowedContentTypes": [],
      "taskId": "Task_1",
      "maxSize": 1,
      "maxCount": 3,
      "minCount": 1
    }
  ],
  "partyTypesAllowed": {
    "bankruptcyEstate": false,
    "organisation": false,
    "person": false,
    "subUnit": false
  },
  "created": "2020-06-04T12:11:36.9601284Z",
  "createdBy": "someone",
  "lastChanged": "2020-06-04T12:11:36.9601305Z",
  "lastChangedBy": "someone",
  "autoDeleteOnProcessEnd": true
}
```