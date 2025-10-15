---

title: Samtykke for datakonsument

description: Hvordan bruke samtykkeløsningen for datakonsumenter i Altinn 3

linktitle: Samtykke for datakonsument

toc: false

---
 
## Introduksjon
 
Denne dokumentasjonen beskriver hvordan datakonsumenter kan be om, hente ut og administrere samtykke ved hjelp av Altinn 3 sin samtykkeløsning. Samtykke gir datakonsumenter tilgang til spesifikke dataressurser for innbyggere eller virksomheter, slik definert av tilbyderen av API-et.
 
## Begrepsliste
 
- **Datakonsument**: Virksomheten som etterspør innsyn i data om en innbygger eller annen virksomhet.

- **Ressurs**: En kategori data definert av aktøren som tilbyr API-et i Altinn (f.eks. inntektsopplysninger, skattegrunnlag).
 
## Tilbydere av samtykkeløsninger
 
Nedenfor er noen sentrale aktører med samtykkeløsninger for Altinn 2. De fleste forventes å flytte til Altinn 3 i løpet av Q3 2025 eller Q1 2026:
 
- **Skatteetaten**
 
  - [Om samtykke](https://skatteetaten.github.io/api-dokumentasjon/en/om/samtykke)

  - [Inntekts-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/inntekt)

  - [Summert skattegrunnlag-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/summertskattegrunnlag)

  - [Krav og betalinger-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/kravogbetalinger)

  - [Arbeidsgiveravgift-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/arbeidsgiveravgift)

  - [MVA meldingsopplysning-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/mva_meldingsopplysning)

  - [Oppdrag utenlandske virksomheter-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/oppdragutenlandskevirksomheter)

  - [Restanser-API](https://skatteetaten.github.io/api-dokumentasjon/en/api/restanser)
 
- **Lånekassen**
 
  - [Saldo studielån](https://dokumentasjon.dsop.no/dsop_saldostudielan_om.html)
 
Altinn tilbyr selv API-er for å be om samtykke og hente ut status på samtykkeforespørsler.
 
## 1. Be om samtykke
 
### 1.1 Forutsetninger
 
1. Datakonsumenten må ha registrert en Maskinporten-klient.

2. Datakonsumenten må ha fått delegert scope for samtykke fra Digdir.

3. De nødvendige scopene må være lagt til Maskinporten-klienten.

4. Tilgang til å be om samtykke for gjeldende ressurs(er) må være gitt.
 
### 1.2 API-endepunkt
 
- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/`

- **Produksjon**: `POST https://platform.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/`
 
#### Forespørsel (eksempel)
 
```json

{

  "id": "77ed8698-e619-4066-9eb4-5c1eb3f165a1",

  "from": "urn:altinn:person:identifier-no:21818297804",

  "to": "urn:altinn:organization:identifier-no:991825827",

  "validTo": "2026-07-18T06:18:12.2597103+00:00",

  "consentRights": [

    {

      "action": ["consent"],

      "resource": [

        {

          "type": "urn:altinn:resource",

          "value": "samtykke-test-vegard"

        }

      ],

      "metadata": {

        "inntektsaar": "2023"

      }

    },

    {

      "action": ["consent"],

      "resource": [

        {

          "type": "urn:altinn:resource",

          "value": "standard-samtykke-for-dele-data"

        }

      ],

      "metadata": {

        "inntektsaar": "2023"

      }

    }

  ],

  "redirectUrl": "https://smartbankdemo.azurewebsites.net/private/loanapplication/consentresult?requestId=77ed8698-e6…

}

```
 
#### Svar (eksempel)
 
```json

{

  "id": "77ed8698-e619-4066-9eb4-5c1eb3f165a1",

  "from": "urn:altinn:person:identifier-no:21818297804",

  "to": "urn:altinn:organization:identifier-no:991825827",

  "requiredDelegator": null,

  "handledBy": null,

  "validTo": "2026-07-18T06:18:12.25971+00:00",

  "consentRights": [

    {

      "action": ["consent"],

      "resource": [

        {

          "type": "urn:altinn:resource",

          "value": "samtykke-test-vegard"

        }

      ],

      "metadata": {

        "inntektsaar": "2023"

      }

    },

    {

      "action": ["consent"],

      "resource": [

        {

          "type": "urn:altinn:resource",

          "value": "standard-samtykke-for-dele-data"

        }

      ],

      "metadata": {

        "inntektsaar": "2023"

      }

    }

  ],

  "requestMessage": null,

  "consented": null,

  "redirectUrl": "https://smartbankdemo.azurewebsites.net/private/loanapplication/consentresult?requestId=77ed8698-e6…,

  "consentRequestEvents": [

    {

      "consentEventID": "01981c2f-1de4-7b9f-a7c7-854f1dd4f115",

      "created": "2025-07-18T06:18:26.65293+00:00",

      "performedBy": "urn:altinn:organization:identifier-no:991825827",

      "eventType": "Created",

      "consentRequestID": "77ed8698-e619-4066-9eb4-5c1eb3f165a1"

    }

  ],

  "viewUri": "https://am.ui.tt02.altinn.no/accessmanagement/ui/consent/request?id=77ed8698-e619-4066-9eb4-5c1eb3f…

}

```
 
## 2. Hente samtykke-token
 
I Altinn 3 hentes samtykke-token som en del av Maskinporten-tokenet. Spesifiser følgende i JWT-en:
 
```json

{

  "aud": "https://test.maskinporten.no/",

  "scope": "altinn:consentrequests.read",

  "iss": "<clientid>",

  "exp": 1752827349,

  "iat": 1752827339,

  "jti": "<jti>",

  "authorization_details": [

    {

      "from": "urn:altinn:person:identifier-no:25922947409",

      "id": "77ed8698-e619-4066-9eb4-5c1eb3f165a1",

      "type": "urn:altinn:consent"

    }

  ]

}

```
 
## 3. Samtykke på vegne av andre
 
For å opprette samtykkeforespørsler på vegne av andre virksomheter må scope delegeres:
 
1. Virksomheten som skal være mottaker, delegerer nødvendige scop**e** i Altinn under API-delegering.

2. Forespørselen opprettes som beskrevet over.

3. Ved henting av token, oppgi i tillegg `consumer_org`:
 
```json

{

  "aud": "https://test.maskinporten.no/",

  "scope": "altinn:consentrequests.read",

  "iss": "<clientid>",

  "exp": 1752827349,

  "iat": 1752827339,

  "jti": "<jti>",

    "consumer_org": "<kunde_orgnr>"

  "authorization_details": [

    {

      "from": "urn:altinn:person:identifier-no:25922947409",

      "id": "77ed8698-e619-4066-9eb4-5c1eb3f165a1",

      "type": "urn:altinn:consent"

    }

  ]

}

```
 
![Scope-delegering i Altinn](scopedelegation.jpg)
 
## Ressurser
 
- [Maskinporten: API-konsument-guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument.html)

- [GitHub: Testimplementasjon](https://github.com/TheTechArch/smartbank)

- [Kjørende smartbank](https://smartbankdemo.azurewebsites.net/)
 