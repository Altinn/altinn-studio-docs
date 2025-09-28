---
title: Hvordan sette opp et abonnement
linktitle: Sett opp abonnement
description: Hvordan-guide for å sette opp et abonnement for hendelser fra en spesifikk ressurs
weight: 10
toc: true
---


## Endepunkt

POST /subscriptions

{{% notice info %}}
Eksempel brukstilfelle: Bruk dette endepunktet når du vil legge til et abonnement på din Altinn Studio-apps hendelser. Bruk filteregenskapene for å spesifisere hvilke hendelser du vil abonnere på. 
{{% /notice %}}

## Autentisering

Dette API-et krever autentisering.

Når du abonnerer på generiske hendelser kreves Maskinporten-scope __altinn:events.subscribe__.

Hvis du abonnerer på hendelser som tjenesteeier kreves også Maskinporten-scope __altinn:serviceowner__. 

Se [Autentisering og autorisasjon]({{< relref "/events/api/#autentisering-og-autorisasjon" >}}) for mer informasjon.


## Forespørsel {#request}

### Content-Type
application/json

### Forespørselstekst

{{% notice info %}}
Listen over påkrevde egenskaper nedenfor viser hva som generelt kreves.
Kravene varierer basert på hvem abonnenten er og hvilken type ressurs
abonnementet retter seg mot. Bruk dokumentasjonen nedenfor som veiledning og se problemdetaljene
hvis abonnementsforespørselen din ikke blir akseptert.
{{% /notice %}}

### Påkrevde egenskaper for abonnementsforespørsel

#### endPoint
- webhook-URL for å motta HTTP POST-forespørsel fra Altinn Events

{{% notice warning %}}
HTTPS-endepunkter må bruke offentlig gyldige TLS-sertifikater. Selvsignerte sertifikater støttes ikke og vil føre til feil ved validering av abonnement.
{{% /notice %}}

Endepunktet bør svare med 200 OK når en hendelse mottas. 
I tillegg bør det returnere 200 OK når det mottar vår tilpassede valideringshendelse:


```json
{
    "id": "694caa35-8b25-4cd7-b800-f6eeb93c56ed",
    "source": "https://platform.altinn.no/events/api/v1/subscriptions/1234",
    "type": "platform.events.validatesubscription",
    "specversion": "1.0"
}
```
_Eksempel på valideringshendelse_

### resourceFilter*
- filter for hendelsesressursen

Må være et eksakt treff med ressursen satt på de genererte hendelsene
#### sourceFilter**
- filter for cloud event-kilden

Når du abonnerer på en app-hendelse er formatet for kildefilter `https://digdir.apps.altinn.no/digdir/demoapp`

\* påkrevd for abonnementer på generiske hendelser, valgfritt for app-hendelsesabonnementer
\** kun påkrevd for app-abonnementer i tilfeller hvor intet ressursfilter er oppgitt 

### Valgfrie egenskaper for abonnementsforespørsel

#### subjectFilter
- filter for cloud event-subjektet

#### alternativeSubjectFilter
- filter for cloud event-alternativsubjektet

#### typeFilter
- filter for cloud event-typen

Utelat denne egenskapen hvis du vil abonnere på alle hendelsestyper for den gitte kilden og/eller ressursen

## Respons

En vellykket abonnementsregistrering bør resultere i en 201 created-respons med
[abonnementet](https://raw.githubusercontent.com/Altinn/altinn-events/main/src/Events/Models/Subscription.cs)
serialisert som en JSON-streng i responsteksten.

201-responskoden indikerer ikke om abonnementet har blitt validert eller ikke.
Altinn vil kun begynne å pushe hendelser til et abonnementsendepunkt når abonnementsendepunktet har blitt validert.
Du kan hente abonnementet ditt ved å bruke abonnements-ID-en for å sikre at abonnementet ditt har blitt validert ok.


### Content-Type
- application/json

### Responskoder
- 201 Created: Abonnementet har blitt registrert med suksess.



- 401 Unauthorized: Indikerer en manglende, ugyldig eller utløpt autorisasjonsheader eller at forbrukeren ikke har tillatelse
  til å abonnere på hendelser fra denne ressursen basert på filterparametere
- 403 Forbidden: Indikerer at nødvendig scope for å abonnere på hendelser mangler

## Eksempler

### Forespørsel

Merk at et Altinn Token bør inkluderes i autorisasjonsheaderen.

```bash
curl \
--location 'https://platform.altinn.no/events/api/v1/subscriptions' \
--header 'Accept: application/xml' \
--header 'Authorization: Bearer {insert Altinn token}' \
--header 'Content-Type: application/json' \
--data '{
  "sourceFilter": "https://digdir.apps.altinn.no/digdir/demoapp",
  "endpoint":"https://webhook.site/"
  }'
```

### Respons

#### 201 Created
```json
{
    "id": 1619,
    "endPoint": "https://webhook.site/43cec4b7-b20b-4cbd-9b47-592750bf06d1",
    "sourceFilter": "https://digdir.apps.at22.altinn.cloud/digdir/demoapp",
    "consumer": "/org/digdir",
    "createdBy": "/org/digdir",
    "created": "2023-04-05T13:57:11.234994Z",
    "validated": false
}
```

#### 400 Bad Request
```json
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "traceId": "00-3755bd55cf6d4e1ebdf7ed49b6f3d3be-154ebd2ad01de860-00",
    "errors": {
        "$": [
            "The JSON object contains a trailing comma at the end which is not supported in this mode. Change the reader options. Path: $ | LineNumber: 2 | BytePositionInLine: 2."
        ]
    }
}
```

#### 401 Unauthorized
```json
"Not authorized to create a subscription with subject /organisation/989271156"
```