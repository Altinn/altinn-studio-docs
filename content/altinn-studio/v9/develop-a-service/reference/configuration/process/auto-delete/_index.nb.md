---
title: Slette en tjeneste automatisk
linktitle: Automatisk sletting
description: Slik konfigurerer du automatisk sletting av en tjeneste når prosessen er slutt.
toc: true
tags: [needsReview]
---

Hvis du ønsker å begrense sluttbrukerens tilgang til en instans eller data etter innsending, kan du konfigurere automatisk sletting. Tjenesteeieren har fremdeles tilgang i tråd med tjenestens autorisasjonsregler, helt til Altinn fjerner dataene fra databasen.

Du konfigurerer automatisk sletting i `applicationmetadata.json` med flagget `"autoDeleteOnProcessEnd": true`. Flagget virker forskjellig avhengig av om du setter det på instansen eller på en datatype.

## Slik virker de to nivåene

**På instansen** (øverste nivå i `applicationmetadata.json`) markerer appen instansen som slettet når prosessen er avsluttet. Da skjer dette:

- Instansen forsvinner fra meldingsboksen og fra lister i API-et.
- Kvitteringssiden viser en kort tekst om at innholdet ikke vil være tilgjengelig i Altinn etterpå, uten lenke til meldingsboksen.
- Brukeren kan fortsatt hente instansen og dataelementene med direkte oppslag i API-et, så lenge autorisasjonsreglene gir lesetilgang. Flagget på instansnivå stenger altså ikke tilgangen til dataene.

**På en datatype** (`appLogic.autoDeleteOnProcessEnd`) sletter appen alle dataelementer av denne typen når prosessen er avsluttet. Da skjer dette:

- Brukeren får `404 - Not found` hvis de prøver å hente et slettet dataelement, også med direkte lenke.
- Brukeren ser ikke lenger dataelementet i instansen.
- Instansen er fortsatt synlig i meldingsboksen, med mindre du også setter flagget på instansen.

Skal brukeren miste tilgangen til dataene, må du sette flagget på hver datatype du vil skjule. Sett det også på instansen hvis instansen skal forsvinne fra meldingsboksen.

{{% notice info %}}
Sletter du alle datatypene, også `ref-data-as-pdf` og vedlegg, har kvitteringssiden ingen vedlegg å vise. I app-frontend eldre enn [[FIX BEFORE MERGE: første app-frontend-versjon med Altinn/app-frontend-react#4414]] blir kvitteringssiden aldri ferdig med å laste i dette tilfellet.
{{% /notice %}}

## Når Altinn fjerner dataene

Markeringen fjerner ikke dataene fra databasen med en gang. Altinn fjerner instansen og dataelementene først når alle disse punktene er oppfylt:

- Tjenesteeieren har bekreftet at instansen er mottatt (complete confirmed). Se [Bekrefte at dataene er mottatt]({{< relref "/altinn-studio/v9/receive-data" >}}#bekrefte-mottak) for hvordan du bekrefter.
- Det har gått minst sju dager siden bekreftelsen.
- Det har gått minst sju dager siden appen markerte slettingen.

Bekrefter tjenesteeieren aldri mottak, blir dataene liggende i databasen uten tidsgrense. Du bør derfor bekrefte mottak så snart du har hentet dataene.

## Slette instans automatisk

Eksempel på konfigurasjon i `applicationmetadata.json` for instanser:

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

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
      "taskIds": ["Task_1"],
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
      "taskIds": ["Task_1"],
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

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json {linenos=false,hl_lines=[11, 32]}
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
		"taskIds": ["Task_1"],
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
		"id": "vedleggA",
		"taskIds": ["Task_1"],
		"maxSize": 25,
		"maxCount": 1,
		"minCount": 1,
		"appLogic": {
			"autoDeleteOnProcessEnd": true
		}
  }
]
```