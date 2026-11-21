---
title: Automatic deletion
linktitle: Automatic deletion
description: An application can be configured to delete all traces of it when the process is over.
toc: true
---

If you want to limit the end user's access to an instance or its data after submission, you can configure automatic deletion. The service owner keeps access according to the application's authorisation rules until Altinn removes the data from the database.

You configure automatic deletion in `applicationmetadata.json` with the flag `"autoDeleteOnProcessEnd": true`. The flag behaves differently depending on whether you set it on the instance or on a data type.

## How the two levels work

**On the instance** (top level in `applicationmetadata.json`) the app marks the instance as deleted when the process ends. This is what happens:

- The instance disappears from the message box and from lists in the API.
- The receipt page shows a short text saying that the content will not be available in Altinn afterwards, without a link to the message box.
- The end user can still fetch the instance and its data elements with direct lookups in the API, as long as the authorisation rules grant read access. The instance-level flag does not block access to the data.

**On a data type** (`appLogic.autoDeleteOnProcessEnd`) the app deletes all data elements of that type when the process ends. This is what happens:

- The end user receives `404 - Not found` when trying to fetch a deleted data element, also with a direct link.
- The data element is no longer listed on the instance for the end user.
- The instance is still visible in the message box unless you also set the flag on the instance.

If the end user should lose access to the data, set the flag on every data type that should be hidden. Also set it on the instance if the instance should disappear from the message box.

{{% notice info %}}
If you delete all data types, including `ref-data-as-pdf` and attachments, the receipt page has no attachments to show. In app-frontend versions older than [[FIX BEFORE MERGE: first app-frontend version with Altinn/app-frontend-react#4414]] the receipt page never finishes loading in this case.
{{% /notice %}}

## When Altinn removes the data

Marking does not remove the data from the database right away. Altinn removes the instance and its data elements only when all of these are true:

- The service owner has confirmed that the instance has been received (complete confirmed).
- At least 7 days have passed since the confirmation.
- At least 7 days have passed since the app marked the deletion.

If the service owner never confirms receipt, the data stays in the database indefinitely. Confirm receipt as soon as you have fetched the data.

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
