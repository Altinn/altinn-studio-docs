---
title: Samtykke for datakonsumenter
description: Hvordan bruke samtykkeløsningen for datakonsumenter i Altinn 3
linktitle: Samtykke
toc: false
weight: 10
---

## Introduksjon

Denne dokumentasjonen beskriver hvordan datakonsumenter kan be om, hente ut og administrere samtykke ved hjelp av Altinn 3 sin samtykkeløsning. Samtykke gir datakonsumenter tilgang til spesifikke dataressurser for innbyggere eller virksomheter, slik definert av tilbyderen av API-et.

## Begrepsliste

* **Datakonsument**: Virksomheten som etterspør innsyn i data om en innbygger eller annen virksomhet.
* **Ressurs**: En kategori data definert av aktøren som tilbyr API-et i Altinn (f.eks. inntektsopplysninger, skattegrunnlag).

## Tilbydere av samtykkeløsninger

Nedenfor er noen sentrale aktører med samtykkeløsninger for Altinn 2. De fleste forventes å flytte til Altinn 3 i løpet av Q3 2025 eller Q1 2026:

* **Skatteetaten**

  * [Om samtykke](https://skatteetaten.github.io/api-dokumentasjon/en/om/samtykke)
  * [Inntekts-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/inntekt)
  * [Summert skattegrunnlag-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/summertskattegrunnlag)
  * [Krav og betalinger-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/kravogbetalinger)
  * [Arbeidsgiveravgift-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/arbeidsgiveravgift)
  * [MVA meldingsopplysning-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/mva_meldingsopplysning)
  * [Oppdrag utenlandske virksomheter-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/oppdragutenlandskevirksomheter)
  * [Restanser-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/restanser)
* **Lånekassen**

  * [Saldo studielån](https://dokumentasjon.dsop.no/dsop_saldostudielan_om.html)

Altinn tilbyr selv API-er for å be om samtykke og hente ut status på samtykkeforespørsler.

## 1. Be om samtykke

### 1.1 Forutsetninger

1. Datakonsumenten må ha registrert en Maskinporten-klient.
2. Datakonsumenten må ha fått delegert scope for samtykke fra Digdir.
3. De nødvendige scopene må være lagt til Maskinporten-klienten.
4. Tilgang til å be om samtykke for gjeldende ressurs(er) må være gitt.

### 1.2 API-endepunkt

* **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/`
* **Produksjon**: `POST https://platform.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/`

#### Forespørsel (eksempel)

```json
{
  "id": "019743e8-cb17-7f9f-b690-fb1338003c23",
  "from": "urn:altinn:person:identifier-no:01025161013",
  "to": "urn:altinn:organization:identifier-no:810419512",
  "validTo": "2025-06-07T06:23:39.2925023+00:00",
  "consentRights": [
    {
      "action": ["read"],
      "resource": [{"type": "urn:altinn:resource", "value": "ttd_inntektsopplysninger"}],
      "metadata": {"INNTEKTSAAR": "2024"}
    }
  ],
  "requestMessage": {"en": "Please approve this consent request"},
  "redirectUrl": "https://www.dnb.no"
}
```

#### Svar (eksempel)

```json
{
  "id": "019743e8-cb17-7f9f-b690-fb1338003c23",
  "from": "urn:altinn:person:identifier-no:01025161013",
  "to": "urn:altinn:organization:identifier-no:810419512",
  "validTo": "2025-06-07T06:23:39.292502+00:00",
  "consentRights": [{"action": ["read"],"resource": [{"type": "urn:altinn:resource","value": "ttd_inntektsopplysninger"}],"metaData": {"INNTEKTSAAR": "2024"}}],
  "consentRequestEvents": [
    {
      "consentEventID": "019743e9-128b-74fc-bb3a-49a3997d63ff",
      "created": "2025-06-06T06:23:57.298375+00:00",
      "performedBy": "urn:altinn:organization:identifier-no:810419512",
      "eventType": "Created",
      "consentRequestID": "019743e8-cb17-7f9f-b690-fb1338003c23"
    }
  ],
  "viewUri": "https://am.ui.localhost/accessmanagement/ui/consent/request?id=019743e8-cb17-7f9f-b690-fb1338003c23"
}
```

## 2. Hente samtykke-token

I Altinn 3 hentes samtykke-token som en del av Maskinporten-tokenet. Spesifiser følgende i JWT-en:

```json
{
  "aud": "https://ver2.maskinporten.no/",
  "scope": "<scope>",
  "iss": "<client_id>",
  "exp": 1584693183,
  "iat": 1584693063,
  "jti": "<jti>",
  "type": "urn:altinn:consent",
  "id": "<consent_request_id>",
  "from": "urn:altinn:person:identifier-no:<pid>"
}
```

## 3. Samtykke på vegne av andre

For å opprette samtykkeforespørsler på vegne av andre virksomheter må scope delegeres:

1. Virksomheten som skal være mottaker, delegerer nødvendige scop**e** i Altinn under API-delegering.
2. Forespørselen opprettes som beskrevet over.
3. Ved henting av token, oppgi i tillegg `consumer_org`:

```json
{
  "aud": "https://ver2.maskinporten.no/",
  "scope": "<scope>",
  "iss": "<client_id>",
  "exp": 1584693183,
  "iat": 1584693063,
  "jti": "<jti>",
  "type": "urn:altinn:consent",
  "id": "<consent_request_id>",
  "from": "urn:altinn:person:identifier-no:<pid>",
  "consumer_org": "<kunde_orgnr>"
}
```

![Scope-delegering i Altinn](scopedelegation.jpg)

## Ressurser

* [Maskinporten: API-konsument-guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument.html)
* [GitHub: Testimplementasjon](https://github.com/TheTechArch/smartbank)
