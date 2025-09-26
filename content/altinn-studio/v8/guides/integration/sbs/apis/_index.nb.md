---
title: API integrasjon
description: Bruk og integrasjon med app API.
weight: 20
toc: true
---

Appens APIer er dokumentert med OpenAPI. Det finnes to varianter av OpenAPI spesifikasjonen:

* Generisk app API - eksponerer alle endepunkter uten hensyn til konkret konfigurasjon av appen
* App-spesifikk API - eksponerer redusert sett APIer, hvor flere av de er relevante fra sluttbrukersystemer

Begge to er tilgjengelige på URL:

`https://<org>.apps.<env>.altinn.no/<org>/<app>/swagger`

## Integrasjon med systembruker

Guiden for [oppsett og konfigurasjon]({{< relref "/altinn-studio/v8/guides/integration/sbs/setup/" >}}) på forrige side
viste hvordan man logger inn med systembruker i Maskinporten. Vi fikk også se et instansierings-request, som er der 
skjemautfyllingen i en Altinn 3 app starter. Her skal vi se videre på app APIene for å komme i mål med en komplett innsending.
Se eksempel instansieringer nedenfor.

`<access-token>` i eksemplene her er et Maskinporten systembruker token som er innvekslet til et Altinn token.
Responsene i eksemplene er forkortet for enkelhets skyld. Se OpenAPI spec for komplett beskrivelse av requests og responser.

### 1.1 Enkel instansiering med JSON prefill

Endepunkt for enkel instansiering støtter enkel JSON prefill.

```http
POST https://brg.apps.tt02.altinn.no/brg/aarsregnskap/instances/create
Content-Type: application/json
Authorization: Bearer <access-token>

{
  "prefill": {
    "property1": "value1",
    "property2": "value2",
    "property3": "value3"
  },
  "instanceOwner": {
    "organisationNumber": "950474084"
  }
}


HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "id": "500700/232c5390-9479-4506-a266-9890d7287bfb",
  "instanceOwner": {
    "partyId": "500700",
    "organisationNumber": "950474084",
    "party": { }
  },
  "process": {
    "currentTask": {
      "flow": 2,
      "started": "2025-05-21T20:51:10.0045338Z",
      "elementId": "Task_1",
      "name": "Utfylling",
      "altinnTaskType": "data",
      "ended": null
    },
    "ended": null,
    "endEvent": null
  },
  "data": [
    {
      "id": "ce8665c1-01c3-49f7-960f-196b250a2266",
      "instanceGuid": "232c5390-9479-4506-a266-9890d7287bfb",
      "dataType": "model",
      "filename": null,
      "contentType": "application/xml",
    }
  ]
}
```

### 1.2 Multipart instansiering

Appen har også et multipart endepunkt hvor man kan laste opp datamodeller og vedlegg i samme request:

```http
POST https://brg.apps.tt02.altinn.no/brg/aarsregnskap/instances
Authorization: Bearer <access-token>
Content-Type: multipart/form-data; boundary=----FormBoundary

------FormBoundary
Content-Disposition: form-data; name="instance"
Content-Type: application/json

{
  "instanceOwner": {
    "organisationNumber": "950474084"
  }
}

------FormBoundary
Content-Disposition: form-data; name="model"
Content-Type: application/xml

<model>
  <property1>value1</property1>
  <property2>value2</property2>
  <property3>value3</property3>
</model>
------FormBoundary--


HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "id": "500700/232c5390-9479-4506-a266-9890d7287bfb",
  "instanceOwner": {
    "partyId": "500700",
    "organisationNumber": "950474084",
    "party": { }
  },
  "process": {
    "currentTask": {
      "flow": 2,
      "started": "2025-05-21T20:51:10.0045338Z",
      "elementId": "Task_1",
      "name": "Utfylling",
      "altinnTaskType": "data",
      "ended": null
    },
    "ended": null,
    "endEvent": null
  },
  "data": [
    {
      "id": "ce8665c1-01c3-49f7-960f-196b250a2266",
      "instanceGuid": "232c5390-9479-4506-a266-9890d7287bfb",
      "dataType": "model",
      "filename": null,
      "contentType": "application/xml",
    }
  ]
}
```

### 2. Oppdatere dataelement

Man kan også oppdatere dataene for et dataelement ved å referere til dataelementets ID:

```http
PUT https://brg.apps.tt02.altinn.no/brg/aarsregnskap/instances/500700/232c5390-9479-4506-a266-9890d7287bfb/data/ce8665c1-01c3-49f7-960f-196b250a2266/type/model?language=nb
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "property1": "value4",
  "property2": "value5",
  "property3": "value6"
}


HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "id": "ce8665c1-01c3-49f7-960f-196b250a2266",
  "instanceGuid": "232c5390-9479-4506-a266-9890d7287bfb",
  "dataType": "model",
  "contentType": "application/xml"
}
```

### 3. Sende prosessen videre

Prosessen for instansen sendes videre ved å kalle `/process/next`-endepunktet.
Avhengig av prosessdesignet i appen vil dette da instansen til et neste steg eller fullføre instansen.
I eksempelet under ser vi at instansen er ferdig innsendt. Tjenesteeier vil gi spesifikk dokumentasjon for appen det gjelder.

```http
PUT https://brg.apps.tt02.altinn.no/brg/aarsregnskap/instances/500700/232c5390-9479-4506-a266-9890d7287bfb/process/next
Content-Type: application/json
Authorization: Bearer <access-token>


HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "currentTask": null,
  "processTasks": [
    {
      "altinnTaskType": "data",
      "elementId": "Task_1"
    }
  ],
  "started": "2025-05-21T21:03:24.8313838Z",
  "startEvent": "StartEvent_1",
  "ended": "2025-05-21T21:03:42.6943525Z",
  "endEvent": "EndEvent_1"
}
```

### 4. Hente kvittering

Når instansen er ferdig innsendt kan man eventuelt hente ut kvittering e.l.
for å presentere til bruker eller rapportere i leverandørsystemet.

Først kan vi liste ut alle datalementer på instansen:

```http
GET https://brg.apps.tt02.altinn.no/brg/aarsregnskap/instances/500700/232c5390-9479-4506-a266-9890d7287bfb
Authorization: Bearer <access-token>


HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "id": "500700/232c5390-9479-4506-a266-9890d7287bfb",
  "data": [
    { ... },
    {
      "id": "0445d618-28b8-4af5-95e0-c8c989487e7a",
      "instanceGuid": "232c5390-9479-4506-a266-9890d7287bfb",
      "dataType": "ref-data-as-pdf",
      "filename": "aarsregnskap.pdf",
      "contentType": "application/pdf"
    }
  ]
}
```

Deretter kan vi laste ned `ref-data-as-pdf` elemented som er kvitteringen i dette tilfellet:

```http
GET https://brg.apps.tt02.altinn.no/brg/aarsregnskap/instances/500700/232c5390-9479-4506-a266-9890d7287bfb/data/0445d618-28b8-4af5-95e0-c8c989487e7a/type/ref-data-as-pdf?language=nb
Authorization: Bearer <access-token>
Accept: application/pdf


HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Length: 8340
Content-Disposition: attachment; filename=aarsregnskap.pdf; filename*=UTF-8''aarsregnskap.pdf

...
```
