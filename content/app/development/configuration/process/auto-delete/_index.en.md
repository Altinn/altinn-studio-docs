---
title: Automatic deletion
linktitle: Automatic deletion
description: An application can be configured to delete all traces of it when the process is over.
toc: true
---

If you want to limit the end user's access to an instance or data after submitting it can be done by configuring automatic deletion.
Practically the resource will be made inaccessible to the user after submission, 
while the service owner still has access according to the application's authorisation rules.

If the end user attempts to access a hard deleted resource with a direct link they will recieve `404 - Not found` in response.
The resource will also not be visible in the message box or be listed in any API-responses.

When the service owner confirms that the instance has been recieved on their end (complete confirmed),
the instance  is marked as ready for deletion and will be removed from the Altinn database in 7 days.

The configuration for automatic deletion is done in `applicationmetadata.json` with the flag `"autoDeleteOnProcessEnd": true`.

## Automatic deletion of instances
Example of configuration in `applicationmetadata.json` for instances:

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

## Automatic deletion of data

Example of configuration in `applicationmetadata.json` for data type:

Here the data types _Skjema_ and _vedleggA_ are deleted, while the type _ref-data-as-pdf_ stays after the process has been ended. 

```json {linenos=false,hl_lines=[11, 35]}
"dataTypes":[
	{
		"id": "Skjema",
		"allowedContentTypes": [
			"application/xml"
		],
		"appLogic": {
			"autoCreate": true,
			"classRef": "Altinn.App.Models.skjema",
			"allowAnonymousOnStateless": false,
			"autoDeleteOnProcessEnd": true
		},
		"taskId": "Task_1",
		"maxCount": 1,
		"minCount": 1,
		"enablePdfCreation": true
	},
	{
		"id": "ref-data-as-pdf",
		"allowedContentTypes": [
			"application/pdf"
		],
		"maxCount": 0,
		"minCount": 0,
		"enablePdfCreation": true
	},
	{
		"id": "vedleggA",
		"taskId": "Task_1",
		"maxSize": 25,
		"maxCount": 1,
		"minCount": 1,
		"enablePdfCreation": true,
		"appLogic": {
			"autoDeleteOnProcessEnd": true
		}
  }
]
```
