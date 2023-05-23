---
title: applicationmetadata.json
description: Description of format for application metadata.
tags: [app-structure, todo]
---

## Overview

`applicationmetadata.json` describes meta information of an application. This is automatically generated on creation of a new application.
This is located at `/App/config/applicationmetadata.json` in the app repo.

## Format

'applicationmetadata.json' has the application information such as application id, version information, organisation that owns the application, workflow information, form and attachment information.

## Application Metadata Format

Below is an example of application metadata json format

```json
{
	"id": "Brreg-testappmetaattachment",
	"versionId": "1.0",
	"applicationOwnerId": "Brreg",
	"createdDateTime": "2019-05-23T20:26:29.2001617Z",
	"createdBy": "user",
	"lastChangedDateTime": "2019-05-23T20:26:29.2002739Z",
	"lastChangedBy": "user",
	"title": {
		"nb-no": "RF-1134 Test form title"
	},
	"validFrom": "2019-05-23T20:26:29.2001617Z",
	"validTo": "2020-05-23T20:26:29.2001617Z",
	"WorkflowId": null,
	"maxSize": 0,
	"forms": [
		{
			"id": "default",
			"description": null,
			"allowedContentType": [
				"application/xml"
			],
			"maxSize": 0,
			"maxCount": 0,
			"shouldSign": false,
			"shouldEncrypt": true
		},
		{
			"id": "74696338-540e-47e3-8f04-0996cc2bb239",
			"description": null,
			"allowedContentType": [
				"application/octet-stream"
			],
			"maxSize": 3,
			"maxCount": 3,
			"shouldSign": false,
			"shouldEncrypt": false
		},
		{
			"id": "0cc6ee16-7fbf-45b3-9e00-2fda8668ab31",
			"description": null,
			"allowedContentType": [
				"application/pdf",
				"text/plain",
				"text/css"
			],
			"maxSize": 5,
			"maxCount": 2,
			"shouldSign": false,
			"shouldEncrypt": false
		}
	]
}
```

The meta data for attachment is updated in the application metadata when a fileupload component is dragged in the ui editor. When an application is deployed to a selected environment, the application metadata is read from the applicationmetadata.json and populated in the cosmos database.