---
title: Slette en tjeneste automatisk
linktitle: Automatisk sletting
description: Slik konfigurerer du automatisk sletting av en tjeneste når prosessen er slutt.
toc: true
tags: [needsReview]
---

Hvis du ønsker å begrense sluttbrukerens tilgang til en instans eller data etter innsending, kan du konfigurere automatisk sletting. I praksis blir ressursen utilgjengelig for sluttbrukeren etter innsending, mens tjenesteeieren fremdeles har tilgang i tråd med tjenestens autorisasjonsregler. 


Hvis sluttbrukeren forsøker å få tilgang til en slettet ressurs med en direkte lenke, får de `404 - Not found` i respons. Ressursen vises heller ikke i meldingsboksen eller i API-responser.

Når tjenesteeieren bekrefter at instansen er mottatt på deres side (complete confirmed), blir instansen markert som klar for sletting og fjernet fra Altinns database i løpet av sju dager.

Du konfigurerer automatisk sletting i `applicationmetadata.json` med flagget `"autoDeleteOnProcessEnd": true`.



## Slette instans automatisk

Eksempel på konfigurasjon i `applicationmetadata.json` for instanser:

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

## Slette data automatisk

Eksempel på konfigurasjon i `applicationmetadata.json` for datatype:

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