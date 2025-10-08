---
title: Hvordan publisere Altinn App-hendelser
linktitle: Publiser app-hendelser
description: Veiledning for publisering av Altinn App-hendelser
weight: 40
toc: true
---

{{% notice info %}}

**Er du en Altinn App-utvikler?**

Vennligst se [Altinn Apps-dokumentasjonen for veiledning](/nb/altinn-studio/v8/reference/configuration/events/) 
om hvordan du aktiverer hendelsesfunksjonaliteten og definerer egendefinerte hendelser i din Altinn App.</br></br>

Siden publisering av app-hendelser håndteres av kjernelogikken i applikasjonen, er denne dokumentasjonen 
kun relevant for utviklere som arbeider med kjerneapplikasjonslogikk, dvs. applikasjonsmalen.
{{% /notice %}}


## Endepunkt

POST /app

## Autentisering
Dette API-et krever autentisering og et Platform Access Token i headeren.

Se [Autentisering og autorisasjon](/nb/events/api/#autentisering-og-autorisasjon) for mer informasjon.


## Forespørsel

### Content-type

application/json


### Request body
Request body skal inneholde Cloud Event formatert som en
[AppCloudEventRequestModel](https://github.com/Altinn/altinn-events/blob/main/src/Events/Models/AppCloudEventRequestModel.cs)
og serialisert som en JSON-streng.

Events vil håndtere å sette ID og tid på Cloud Event.

### Påkrevde Cloud Event-egenskaper og utvidelsesattributter

#### type
- hendelsestype for Cloud Event, type: string

#### source
- hendelseskilde for Cloud Event, type: URI

#### subject
- party ID for instanceOwner, type: string


Format på subject-strengen: _/party/{partyId}_

#### specversion
- Cloud Events spesifikasjonsversjon, type: string

### Valgfrie Cloud Event-egenskaper og utvidelsesattributter
{{% notice info %}}
I tillegg til egenskapene angitt nedenfor, vil alle egenskaper definert i
[AppCloudEventRequestModel](https://github.com/Altinn/altinn-events/blob/main/src/Events/Models/AppCloudEventRequestModel.cs)
bli akseptert.
{{% /notice %}}

#### alternative subject
- alternativ identifikator for subject, type: string

Det alternative subject bør være en identifikator som er allment kjent for dine abonnenter.
Denne egenskapen støttes som en spørre-/filterparameter ved abonnering eller spørring av hendelser.
Vi anbefaler å inkludere et alternativt subject hvis subject-egenskapen er en intern ID
som er ukjent for hendelsesabonnentene.

For Altinn-relaterte hendelser følger alternative subject formatet `/person/16069412345`
og `/organisation/987564321`.


## Respons
En vellykket registrering av Cloud Event skal resultere i en _201 Created_-respons med GUID til Cloud Event-instansen som payload.

### Content-Type
- application/json

### Responskoder
- 201 Created: Cloud Event ble registrert vellykket
- 400 Bad Request: Forespørselen var ugyldig.

  Se problemdetaljer i responskroppen for mer informasjon.
- 401 Unauthorized: Indikerer en manglende, ugyldig eller utløpt autorisasjonsheader, eller at appen ikke er autorisert til å publisere hendelser for den oppgitte kilden.
- 403 Forbidden: Indikerer at Platform Access Token mangler eller er ugyldig.

## Eksempler

### Forespørsel

Merk at Platform Access og Altinn tokens skal settes inn i headerne.

```bash
curl \
--location 'https://platform.altinn.no/events/api/v1/app' \
--header 'Content-Type: application/json' \
--header 'PlatformAccessToken: {Sett inn Platform Access token}' \
--header 'Authorization: Bearer {Sett inn Altinn token}' \
--data '{
	"type": "app.instance.created",
	"source": "https://ttd.apps.altinn.no/ttd/apps-test/instances/50019855/428a4575-2c04-4400-89a3-1aaadd2579cd",
	"subject": "/party/50019855",
	"specversion": "1.0",
	"alternativesubject": "/person/01017512345"
}'
```

### Respons

#### 200 OK
Responsen inneholder ID-en for Cloud Event.

```json
"4815d141-8cf6-4555-8c3c-e069c7b80c79"
```

#### 400 Bad Request
Responsen inneholder et problemdetaljeobjekt med feilmeldingen i detail-egenskapen.

```json
{
	"type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
	"title": "Bad Request",
	"status": 400,
	"detail": "Missing parameter values: source, subject and type cannot be null",
	"traceId": "00-4b54a6a0c9b74bf5afc5e917863f96fd-eb14b06c1f0c3cf8-00"
}
```