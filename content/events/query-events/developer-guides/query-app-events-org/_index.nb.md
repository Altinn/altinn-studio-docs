---
title: Søk etter app-hendelser som applikasjonseier
linktitle: Søk app-hendelser - org
description: Utviklerveiledning for hvordan søke etter app-hendelser som applikasjonseier
weight: 40
toc: true
---


{{% notice warning %}}
Altinn Events muliggjør hendelsesdrevne integrasjonsmønstre, designet spesifikt for å __unngå__ behovet for
kontinuerlig forespørsel av ressurser, også kjent som 'polling'. <br/> <br/>
For å tillate jevne og inkrementelle arkitekturmigrasjonener, tilbyr Events API også et HTTP API 
for planlagte forespørsler av de samme hendelsesdataene du forhåpentligvis
vil motta via webhooks i fremtiden.
{{% /notice %}}


## Endepunkt

GET /app/{org}/{app}

hvor {org}/{app} utgjør applikasjons-ID-en for app-ressursen du ønsker å hente hendelser for.

## Autentisering

Dette API-et krever autentisering.

Se [Autentisering og autorisasjon](../../../api/#authentication--authorization) for mer informasjon.


## Forespørsel

### Spørreparametere og headere

#### after
- ID for hendelsen som sist ble hentet, type: string

Resultatsettet vil inkludere hendelser registrert etter den oppgitte hendelses-ID-en i kronologisk rekkefølge

#### from
- nedre grense for når Cloud Event ble registrert i UTC, type: string(date-time)

Akseptert format er  `2023-02-16T18:00Z`

#### to
- øvre grense for når Cloud Event ble registrert i UTC, type: string(date-time)

Akseptert format er  `2023-02-16T18:00Z`

#### party
- part-ID som representerer subjektet i Cloud Event

#### unit
- organisasjonsnummeret som representerer enheten i Cloud Events alternative subject

#### person (header)
- personnummeret som representerer personen i Cloud Events alternative subject

#### type
- hendelsestypene som skal inkluderes, type: array[string]

#### size
- størrelse på resultatsettet, type: string

Standard størrelse er satt til 50 hendelser

## Respons

Inneholder en header `next` som skal brukes til å hente et nytt sett med hendelser etter den siste hendelsen i resultatsettet.
Next-headeren returneres uavhengig av om det finnes flere hendelser å hente eller ikke.

### Støttede innholdstyper
application/cloudevents+json

### Responskoder
- 200 OK: Hendelser som samsvarer med spørresettet returneres
- 400 Bad Request: Ugyldig sett med spørreparametere
  Se problemdetaljer i responskroppen for mer informasjon.
- 401 Unauthorized: Indikerer en manglende, ugyldig eller utløpt autorisasjonsheader

## Eksempler

### Forespørsel
```bash
curl \
--location 'https://platform.altinn.no/events/api/v1/app/ttd/apps-test?from=2023-02-16T18:00Z&size=2' \
--header 'Authorization: Bearer {Sett inn Altinn token}'
```

### Respons


#### 200 OK
Hvis resultatsettet inneholder hendelser som du er autorisert til å motta, vil responsobjektet se ut som nedenfor.
Hvis ingen hendelser samsvarer med spørringen din eller du ikke er autorisert til å lese hendelsen, vil en tom array '[]' bli returnert.

Headere:
```http
Content-Type: application/cloudevents+json; charset=utf-8
Next: https://platform.altinn.no/events/api/v1/app/ttd/apps-test?after=fc12dc69-fcd4-43c6-9fde-b94fcdcc3597&from=2023-02-16T18:00Z&size=2
```

Kropp:
```json
[
	{
		"specversion": "1.0",
		"id": "cf7577ad-7ae6-498f-bc48-0704bd895b41",
		"time": "2023-02-16T18:02:11.0276259Z",
		"source": "https://ttd.apps.at22.altinn.cloud/ttd/apps-test/instances/50019855/f21e491f-f862-4776-b81f-725657ef0a18",
		"subject": "/party/50019855",
		"type": "app.instance.created",
		"alternativesubject": "/person/16035001577"
	},
	{
		"specversion": "1.0",
		"id": "fc12dc69-fcd4-43c6-9fde-b94fcdcc3597",
		"time": "2023-02-16T18:02:12.8660282Z",
		"source": "https://ttd.apps.at22.altinn.cloud/ttd/apps-test/instances/50019855/f21e491f-f862-4776-b81f-725657ef0a18",
		"subject": "/party/50019855",
		"type": "app.instance.process.completed",
		"alternativesubject": "/person/16035001577"
	}
]
```

#### 400 Bad Request
Responsen inneholder et problemdetaljeobjekt med feilmeldingen oppført i errors-egenskapen.
```json
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "Bad Request",
    "status": 400,
    "detail": "The 'From' or 'After' parameter must be defined.",
    "traceId": "00-f4b14cafa151f01e81d227de85be4c89-f13652f55cdfaa7e-00"
}
```