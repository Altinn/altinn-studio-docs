---
title: Søk etter hendelser
linktitle: Søk etter hendelser
description: Utviklerveiledning for hvordan hente hendelser ved bruk av Events API
weight: 40
toc: true
---

{{% notice warning %}}
Altinn Events muliggjør hendelsesdrevne integrasjonsmønstre, designet spesifikt for å ***unngå*** behovet for
kontinuerlig forespørsel av ressurser, også kjent som 'polling'. <br/> <br/>
For å tillate jevne og inkrementelle arkitekturmigrasjonener, tilbyr Events API også et HTTP API 
for planlagte forespørsler av de samme hendelsesdataene du forhåpentligvis
vil motta via webhooks i fremtiden.
{{% /notice %}}


## Endepunkt

GET /events

## Autentisering

Dette API-et krever autentisering og Maskinporten-scopet __altinn:events.subscribe__.

Se [Autentisering og autorisasjon]({{< relref "/events/api/#autentisering-og-autorisasjon" >}}) for mer informasjon.


## Forespørsel

### Content-Type
application/json

### Spørreparametere og headere

Spørreparametere merket med \* er påkrevd.

### after*
- ID for hendelsen som sist ble hentet, type: string

Resultatsettet vil inkludere hendelser registrert etter den oppgitte hendelses-ID-en i kronologisk rekkefølge. (Bruk "0" hvis du henter hendelser for første gang.)

### resource*
- hendelsesressursen som skal inkluderes, type: string

Resource-parameteren må være et eksakt samsvar med ressursen på hendelsen.
f.eks. _urn:altinn:resource:app_ttd_apps-test_

### subject
- valgfri streng-egenskap som vanligvis identifiserer entiteten en Cloud Event er relatert til. [Cloud Events-spesifikasjon](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#subject)


### Altinn-AlternativeSubject (header)
- alternativt subject for Cloud Events, type: string

### type
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
- 403 Forbidden: Indikerer manglende påkrevd scope for å abonnere på hendelser

## Eksempler

### Forespørsel

```http
curl \
--location 'https://platform.at23.altinn.cloud/events/api/v1/events?after=43860c25-6804-4e0c-99b2-0254373f9b16&resource=urn:altinn:resource:app_ttd_apps-test&size=2' \
--header 'Authorization: Bearer { Sett inn Altinn token}'
```


### Respons

#### 200 OK

Headere:
```http
Content-Type: application/cloudevents+json; charset=utf-8
Next: https://platform.at23.altinn.cloud/events/api/v1/events?after=408f4021-b2c4-4cb4-a902-f1ab110ff861&resource=urn:altinn:resource:app_ttd_apps-test&size=2
```

Kropp:
```json
[
    {
        "specversion": "1.0",
        "id": "fc21314e-9ad8-4af2-8425-27ba741bfedd",
        "time": "2022-05-12T00:02:07.541482Z",
        "type": "automatedtest.triggered",
        "source": "https://github.com/Altinn/altinn-events/tree/main/test/k6",
        "subject": "/autotest/k6",
        "resource": "urn:altinn:resource:app_ttd_apps-test"
    },
    {
        "specversion": "1.0",
        "id": "408f4021-b2c4-4cb4-a902-f1ab110ff861",
        "time": "2022-05-12T00:02:07.541482Z",
        "type": "automatedtest.triggered",
        "source": "https://github.com/Altinn/altinn-events/tree/main/test/k6",
        "subject": "/autotest/k6",
        "resource": "urn:altinn:resource:app_ttd_apps-test"
    }
]
```

#### 400 Bad Request

```json
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "Bad Request",
    "status": 400,
    "detail": "The 'source' parameter must be defined.",
    "traceId": "00-75d93441fd5f8cbe1b243a36f44b0250-d5e2e4a323fe63a1-00"
}
```