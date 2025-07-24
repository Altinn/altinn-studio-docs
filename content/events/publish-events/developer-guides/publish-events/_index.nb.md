---
title: Hvordan publisere hendelser
linktitle: Publiser hendelser
description: Veiledning for publisering av hendelser til Altinn
weight: 40
toc: true
---


{{% notice info %}}
Denne seksjonen dekker de spesifikke API-kravene for publisering av hendelser.
Hvis du akkurat har kommet i gang eller leter etter informasjon om hvordan du bruker Events API, vennligst se 
[den generelle API-dokumentasjonen.](../../../api/)
{{% /notice %}}


## Endepunkt

POST /events

{{% notice info %}}
Eksempel på brukstilfelle: Bruk dette endepunktet når du ønsker å publisere generiske hendelser - hendelser som ikke er strengt tatt Altinn Studio
App-hendelser, men publisert av en hendelsesprodusent med de nødvendige tilgangsscopene.
Merk at innholdstypen er forskjellig fra app-hendelser 
{{% /notice %}}

## Autentisering
Dette API-et krever autentisering og Maskinporten-scopet __altinn:events.publish__.

Se [Autentisering og autorisasjon](../../../api/#authentication--authorization) for mer informasjon.


## Forespørsel

### Content-type

application/cloudevents+json


### Request body
Request body skal inneholde Cloud Event serialisert som en JSON-streng.

### Påkrevde Cloud Event-egenskaper og utvidelsesattributter

####  id
- ID for Cloud Event, type: string

#### type
- hendelsestype for Cloud Event, type: string

#### source
- hendelseskilde for Cloud Event, type: URI

#### resource
- ID for ressursen som Cloud Event relaterer til, type: string

Ressursen må være registrert i Altinn Ressursregister _før_ Cloud Events publiseres.
Format på resource-egenskapen: _urn:altinn:resource:[prop1].[prop2]_

### Valgfrie Cloud Event-egenskaper og utvidelsesattributter
{{% notice info %}}
I tillegg til egenskapene angitt nedenfor, vil alle egenskaper definert i
[Cloud Event v1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md)-spesifikasjonen
så vel som egendefinerte utvidelsesattributter definert på Cloud Event bli akseptert.
{{% /notice %}}

#### resourceinstance
- ID for ressursinstansen, type: string

#### alternative subject
- alternativ identifikator for subject, type: string

Det alternative subject bør være en identifikator som er allment kjent for dine abonnenter.
Denne egenskapen støttes som en spørre-/filterparameter ved abonnering eller spørring av hendelser.
Vi anbefaler å inkludere et alternativt subject hvis subject-egenskapen er en intern id
som er ukjent for hendelsesabonnentene.

For Altinn-relaterte hendelser følger alternative subject formatet `/person/16069412345`
og `/organisation/987564321`.


## Respons
En vellykket registrering av Cloud Event skal resultere i en _200 OK_-respons uten data.

### Content-Type
- application/cloudevents+json
- application/json

### Responskoder
- 200 OK: Cloud Event ble registrert vellykket
- 400 Bad Request: Forespørselen var ugyldig.

  Se problemdetaljer i responskroppen for mer informasjon.
- 401 Unauthorized: Indikerer en manglende, ugyldig eller utløpt autorisasjonsheader.
- 403 Forbidden: Indikerer at innringeren ikke er autorisert til å publisere hendelser på den oppgitte ressursen.

## Eksempler

### Forespørsel

Request body for en Cloud Event relatert til ressursen _urn:altinn:resource:dodsbo.domstoladmin.api_.
Merk at et Altinn Token skal inkluderes i autorisasjonsheaderen.

```bash
curl \
--location 'https://plaform.altinn.no/events/api/v1/events' \
--header 'Content-Type: application/cloudevents+json' \
--header 'Authorization: Bearer {sett inn Altinn token}' \
--data '{
    "id": "288f71f2-8cbd-3442-1532-ac14f3fd9faa",
    "type": "no.altinn.events.digitalt-dodsbo.opprettet",
    "resource": "urn:altinn:resource:dodsbo.domstoladmin.api",
    "resourceinstance": "91f2388f-bd8c-4647-8684-fd9f68af5b14",
    "alternativesubject":"/person/16069412345",
    "source":  "https://api.domstol.no/dodsbo-api/v1/dodsbo/91f2388f-bd8c-4647-8684-fd9f68af5b14",
    "time": "2020-02-20T08:00:06.4014168Z",
    "specversion": "1.0"
}'
```

### Respons

#### 200 OK
Responsen har ikke noe innhold.

#### 400 Bad Request
Responsen inneholder et problemdetaljeobjekt med feilmeldingen oppført i errors-egenskapen.
```json
{
	"type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
	"title": "One or more validation errors occurred.",
	"status": 400,
	"traceId": "00-c3d1e2195c9f2bcb8095279cad1bda78-af1b5d6a090db3b3-00",
	"errors": {
		"RequestBody": [
			"CloudEvent is missing required attributes: type (Parameter 'data')"
		]
	}
}
```