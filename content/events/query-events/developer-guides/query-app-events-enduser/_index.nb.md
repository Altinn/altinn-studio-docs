---
title: Spørre etter app-hendelser som sluttbruker
linktitle: Spørre etter app-hendelser - sluttbruker
description: Utviklerguide for hvordan spørre etter app-hendelser som sluttbruker eller sluttbrukersystem
weight: 40
toc: true
---

{{% notice warning %}}
Altinn Events muliggjør hendelsesorienterte integrasjonsmønstre, designet spesifikt for å __unngå__ behovet for
kontinuerlig forespørsel av ressurser, også kjent som 'polling'. <br/> <br/>
For å tillate smidig og inkrementell arkitekturell migrering,
tilbyr Events API også et HTTP API for planlagte forespørsler av de samme hendelsesdataene du forhåpentligvis
vil motta via webhooks i fremtiden.
{{% /notice %}}


## Endepunkt

GET /app/party

## Autentisering

Dette API-et krever autentisering.

Se [Autentisering og autorisasjon](../../../api/#authentication--authorization) for mer informasjon.


## Forespørsel

### Spørreparametere og overskrifter

#### after
- ID til hendelsen som sist ble hentet, type: string

Resultatsett vil inkludere hendelser registrert etter den oppgitte hendelse-ID-en i kronologisk rekkefølge

#### from
- nedre grense for når cloud event ble registrert i UTC, type: string(date-time)

Akseptert format er `2023-02-16T18:00Z`

#### to
- øvre grense for når cloud event ble registrert i UTC, type: string(date-time)

Akseptert format er `2023-02-16T18:00Z`

#### party
- part-ID som representerer subjektet til cloud event

#### unit
- organisasjonsnummeret som representerer enheten i cloud eventets alternative subjekt

#### person (header)
- personnummeret som representerer personen i cloud eventets alternative subjekt

#### source
- hendelseskildene som skal inkluderes, type: array[string]

Source parameteret støtter wildcard _%_ for å unngå ukjent antall tegn
f.eks. `https://digdir.apps.altinn.no/digdir/%`

#### type
- hendelsestypene som skal inkluderes, type: array[string]

#### size
- størrelse på resultatsett, type: string

Standard størrelse er satt til 50 hendelser

## Respons

Inneholder en overskrift `next` som skal brukes til å hente et nytt sett med hendelser som følger den siste hendelsen i resultatsettet.
Next overskrift returneres uavhengig av om det finnes flere hendelser å hente eller ikke.

### Støttede content-types
application/cloudevents+json

### Responskoder
- 200 OK: Hendelser som matcher spørresettet returneres
- 400 Bad Request: Ugyldig sett med spørreparametere
  Se problemdetaljer i responskroppen for ytterligere informasjon.
- 401 Unauthorized: Indikerer manglende, ugyldig eller utløpt autorisasjonsoverskrift

## Eksempler

### Forespørsel
```bash
curl \
--location 'https://platform.altinn.no/events/api/v1/app/party?after=5b9a8887-0023-4f07-8791-d98e15a3542b' \
--header 'Person: 07124912037' \
--header 'Authorization: Bearer {Insert Altinn token}'
```

### Respons


#### 200 OK
Hvis resultatsettet inneholder hendelser du er autorisert til å motta, vil responsobjektet se ut som nedenfor.
Hvis ingen hendelser matcher spørringen din eller du ikke er autorisert til å lese hendelsen, vil en tom array '[]' returneres.

Overskrifter:
```http
Content-Type: application/cloudevents+json; charset=utf-8
Next: https://platform.altinn.no/events/api/v1/app/party?after=3d529b03-ff67-4e98-9cfb-387df4b09f82

Body:
```json
[
	{
		"specversion": "1.0",
		"id": "3ebaa1a2-9113-4905-ab26-a84fc3ec8acc",
		"time": "2023-04-11T08:58:35.185428Z",
		"source": "https://ttd.apps.altinn.no/ttd/apps-test/instances/50002598/d67239bd-3b43-479d-afeb-125a9209f4ac",
		"subject": "/party/50002598",
		"type": "app.instance.created",
		"alternativesubject": "/person/07124912037"
	},
	{
		"specversion": "1.0",
		"id": "3d529b03-ff67-4e98-9cfb-387df4b09f82",
		"time": "2023-04-11T08:59:24.4701492Z",
		"source": "https://ttd.apps.altinn.no/ttd/apps-test/instances/50002598/d67239bd-3b43-479d-afeb-125a9209f4ac",
		"subject": "/party/50002598",
		"type": "app.instance.process.completed",
		"alternativesubject": "/person/07124912037"
	}
]
```

#### 400 Bad Request
Respons inneholder et problemdetaljeobjekt med feilmeldingen oppført i errors egenskapen.
```json
{
	"type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
	"title": "Bad Request",
	"status": 400,
	"detail": "Subject must be specified using either query params party or unit or header value person.",
	"traceId": "00-7d18efb9ae1304c96884676e3de17fe2-b987907d01983550-00"
}
```