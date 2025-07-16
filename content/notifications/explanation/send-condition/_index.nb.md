---
title: Sendebetingelse
description: "Altinn Varslinger tilbyr en funksjon kalt Sendebetingelse,
som lar deg opprette varslingsordrer som kun sendes til mottakere når en spesifisert betingelse er oppfylt."
linktitle: Sendebetingelse
tags: [varslinger, sendebetingelser]
weight: 30
---

## Introduksjon

Funksjonen Sendebetingelse lar deg opprette en varslingsordre som kun vil bli sendt til mottaker(e)
hvis en spesifisert betingelse er oppfylt. Du kan velge å sende varselet umiddelbart eller planlegge det for en fremtidig dato.

### Eksempel på bruk

Et vanlig bruksområde er å sette påminnelser, der et varsel kun sendes
hvis en bruker ikke har fullført en bestemt handling. Med sendebetingelsen kan
både det opprinnelige varselet som ber om handlingen og påminnelsesvarselet bestilles samtidig med forskjellige sendingsdatoer.

### Betingelsesevaluering

En sendebetingelse blir evaluert som enten **sant** eller **usant**, og den anses som **sant** når betingelsen for å sende varselet er oppfylt.

## Betingelsesendepunkt

Sendebetingelsen blir sjekket av applikasjonen gjennom betingelsesendepunktet
spesifisert i varslingsordren. Nedenfor er et eksempel på en forespørsel om varslingsordre med betingelsesendepunktet:

```json {linenos=false,hl_lines="11"}
{
  "subject": "Påminnelse om å fullføre oppgave",
  "sendersReference": "application:qwerty",
  "requestedSendTime": "2024-07-24T12:00:00Z",
  "body": "Påminnelse om å fullføre søknaden innen 31.07. Vennlig hilsen, tjenesteeier",
  "recipients": [
    {
      "emailAddress": "recipient@domain.com"
    }
  ],
  "conditionEndpoint": "https://serviceowner.com/application/qwerty/reminderRequired"
}
```

### Forespørsel

API-klienten i Altinn Varslinger vil sende en GET-forespørsel til det oppgitte endepunktet med et bærertoken.
Tokenet vil være et Maskinporten-token som inkluderer Digitaliseringsdirektoratets organisasjonsnummer som en del av
forbruker-claimet, sammen med scopet `altinn:system/notifications.condition.check`.

- **Metode:** GET
- **Headers:**
  - `Authorization: Bearer <maskinporten_token>`
  - `Content-Type: application/json`
- **URL-parametre:** Ingen

#### Eksempel på forespørsel

```http
GET /application/qwerty/reminderRequired HTTP/1.1
Host: serviceowner.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI...
Content-Type: application/json
```

#### Eksempel på dekodet token

Her er et eksempel som viser noen av kravene i et dekodet Maskinporten-token fra Altinn Varslinger:

```json
{
  "scope": "altinn:system/notifications.condition.check",
  "iss": "https://maskinporten.no/",  
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:991825827"
  }
}
```
- scope: Spesifiserer scopet til tokenet. Dette vil alltid være `altinn:system/notifications.condition.check`
- iss: Spesifiserer utstederen av tokenet.
  - Produksjon: _https://maskinporten.no/_ 
  - Test: _https://test.maskinporten.no/_ 
- consumer: Spesifiserer forbrukerinformasjonen. ID vil alltid være `0192:991825827`, som representerer Digdir.


### Respons

Etter å ha evaluert betingelsen spesifisert i forespørselen,
skal endepunktet svare med et JSON-objekt som indikerer om varselet skal sendes.
Responskoden må være 200 OK, uavhengig av om betingelsen er oppfylt.

Enhver annen statuskode resulterer i et nytt forsøk fra API-klienten.

#### Eksempel på respons

```json
{
  "sendNotification": true
}
```

- sendNotification: En boolsk verdi (true eller false) som indikerer om varselet skal sendes (true) eller ikke (false).
