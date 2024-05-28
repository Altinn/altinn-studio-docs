---
title: Automatisk sletting
linktitle: Automatisk sletting
description: En applikasjon kan konfigureres til å slette alle spor når prosessen er slutt.
toc: true
---

Dersom man ønsker å begrense sluttbrukers tilgang til en instans eller data i etterkant av innsending kan dette gjøres 
ved å konfigurere automatisk sletting.
I praksis vil ressursen gjøres utilgjengelig for sluttbruker etter innsending, 
mens tjenesteeier enda har tilgang i tråd med applikasjonens autorisasjonsregler. 


Hvis sluttbruker forsøker å aksessere en hard deleted ressurs med en direkte lenke vil de få `404 - Not found` i respons.
Ressursen vil heller ikke vises i meldingsboks eller listes i API-responser.


Når tjenesteeier bekrefter at instansen er mottatt på deres side (complete confirmed), 
så markeres instansen som klar for sletting og vil saneres fra Altinns database i løpet av 7 dager.

Konfigurasjonen for automatisk sletting gjøres i  `applicationmetadata.json` med flagget 
`"autoDeleteOnProcessEnd": true`.



## Automatisk sletting av instans

Eksempel på konfigurasjon i  `applicationmetadata.json` for instanser:

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

## Automatisk sletting av data

Eksempel på konfigurasjon i  `applicationmetadata.json` for data type:

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