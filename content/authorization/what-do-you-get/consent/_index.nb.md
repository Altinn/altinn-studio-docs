---
title: Samtykke
description: Altinn samtykke fornyes som del av oppgraderingen til Altinn 3
tags: [platform, register]
---
 
# Samtykke i Altinn 3
 
Altinn 3 viderefører og forbedrer samtykkeløsningen fra Altinn 2. Denne dokumentasjonen gir en oversikt over de viktigste endringene, hvordan samtykkeprosessen fungerer, og hva som kreves av både datakonsumenter og API-tilbydere.
 
## Hva er nytt i Altinn 3?
 
- **Forenklet token-håndtering:** Kun ett Maskinporten-token benyttes, som inneholder all nødvendig informasjon om samtykket.
- **Nytt token-format:** API-tilbydere må oppdatere valideringskoden for å tolke det nye formatet.
- **Bedre brukeropplevelse:** Sluttbrukere møter et oppgradert og mer brukervennlig grensesnitt.
- **Støtte for leverandører:** Mulighet for å bruke tredjepartsleverandører til å håndtere samtykkeprosessen.
 
## Slik fungerer samtykkeprosessen
 
### 1. Token fra Maskinporten
 
I Altinn 3 utstedes kun ett Maskinporten-token per samtykke. Dette tokenet identifiserer datakonsumenten og inneholder alle detaljer om samtykket, noe som forenkler validering og integrasjon.
 
**Eksempel på nytt token-format:**
 
```json
{
    "authorization_details": [
        {
            "type": "urn:altinn:consent",
            "id": "b55b0a8c-46db-4239-a417-a89daabfabba",
            "from": "urn:altinn:person:identifier-no:01039012345",
            "to": "urn:altinn:organization:identifier-no:984851006",
            "consented": "2024-06-01T00:00:00Z",
            "validTo": "2024-12-10T00:00:00Z",
            "consentrights": [
                {
                    "action": ["read", "write"],
                    "resource": [
                        {
                            "id": "urn:altinn:resource",
                            "value": "skd_inntektsapi"
                        }
                    ],
                    "metadata": {
                        "fraOgMed": "2017-06",
                        "tilOgMed": "2017-08"
                    }
                },
                {
                    "action": ["read", "write"],
                    "resource": [
                        {
                            "id": "urn:altinn:resource",
                            "value": "skd_skattegrunnlag"
                        }
                    ],
                    "metadata": {
                        "inntektsaar": "2016"
                    }
                }
            ]
        }
    ],
    "scope": "scope:global/kontaktinformasjon.read",
    "iss": "https://test.maskinporten.no/",
    "client_amr": "private_key_jwt",
    "token_type": "Bearer",
    "exp": 1718175135,
    "iat": 1718175015,
    "client_id": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
    "jti": "-SpfU--1Zn_Oqvkpjwu3oVn--VLcPzSAwjqyiP6zBEw",
    "consumer": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:984851006"
    }
}
```
 
### 2. For API-tilbydere
 
API-tilbydere må definere sine API-er som ressurser i Altinn Ressursregisteret via Altinn Studio. Dette gjør det mulig å knytte samtykke til spesifikke API-er.
 
- Se [Altinn Studio-dokumentasjonen](https://docs.altinn.studio/) for veiledning om ressursadministrasjon.
 
### 3. For datakonsumenter
 
Datakonsumenter starter prosessen ved å opprette en samtykkeforespørsel. Denne inneholder informasjon om hvem det bes om samtykke fra, varighet og hvilke data det ønskes tilgang til.
 
**Krav for å opprette samtykkeforespørsel:**
 
1. Virksomheten må ha fått tildelt scopet `altinn:consentrequests.write`.
2. Virksomheten må ha opprettet en klient og gitt dette scopet.
3. Virksomheten må ha tilgang til det aktuelle API-et.
 
**Eksempel på samtykkeforespørsel:**
 
```json
{
  "id": "0197593f-1794-7748-b5f2-91086bbecc3e",
  "from": "urn:altinn:person:identifier-no:01025161013",
  "requiredDelegator": null,
  "to": "urn:altinn:organization:identifier-no:810419512",
  "validTo": "2025-06-11T09:49:56.5063249+00:00",
  "consentRights": [
    {
      "action": [
        "read"
      ],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "ttd_inntektsopplysninger"
        }
      ],
      "metaData": {
        "INNTEKTSAAR": "2022"
      }
    },
    {
      "action": [
        "read"
      ],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "ttd_skattegrunnlag"
        }
      ],
      "metaData": {
        "fraOgMed": "2018-03",
        "tilOgMed": "2018-06"
      }
    }
  ],
  "requestMessage": {
    "en": "Please approve this consent request"
  },
  "redirectUrl": "https://www.dnb.no"
}
```
 
| Parameter      | Beskrivelse                                                                 |
|----------------|-----------------------------------------------------------------------------|
| `id`           | Påkrevd: Unik generert UUID                                                 |
| `from`         | Påkrevd: Part det bes om samtykke fra (person eller organisasjon)           |
| `to`           | Påkrevd: Mottaker av samtykkeforespørselen                                  |
| `validTo`      | Påkrevd: Dato/tid samtykket er gyldig til                                   |
| `consentRights`| Påkrevd: Rettigheter og ressurser det bes om tilgang til                    |
| `requestmessage`| Valgfritt: Melding til bruker. Avhenger av tjenesten.                                     |
| `redirectUrl`  | Valgfritt: URL for redirect etter samtykke. Må oppgis hvis bruker sendes tilbake.
 
 
Respons samtykkeforespørsel
 
```json
{
  "id": "0197593f-1794-7748-b5f2-91086bbecc3e",
  "from": "urn:altinn:person:identifier-no:01025161013",
  "to": "urn:altinn:organization:identifier-no:810419512",
  "requiredDelegator": null,
  "handledBy": null,
  "validTo": "2025-06-11T09:49:56.506324+00:00",
  "consentRights": [
    {
      "action": [
        "read"
      ],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "ttd_inntektsopplysninger"
        }
      ],
      "metaData": {
        "INNTEKTSAAR": "2022"
      }
    },
    {
      "action": [
        "read"
      ],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "ttd_skattegrunnlag"
        }
      ],
      "metaData": {
        "fraOgMed": "2018-03",
        "tilOgMed": "2018-06"
      }
    }
  ],
  "requestMessage": {
    "en": "Please approve this consent request"
  },
  "consented": null,
  "redirectUrl": "https://www.dnb.no",
  "consentRequestEvents": [
    {
      "consentEventID": "0197593f-6ac8-788b-873d-1a9949cfb389",
      "created": "2025-06-10T09:50:17.45368+00:00",
      "performedBy": "urn:altinn:organization:identifier-no:810419512",
      "eventType": "Created",
      "consentRequestID": "0197593f-1794-7748-b5f2-91086bbecc3e"
    }
  ],
  "viewUri": "https://am.ui.localhost/accessmanagement/ui/consent/request?id=0197593f-1794-7748-b5f2-91086bbecc3e"
}
```
 
                                 |
 
### 4. Bruk av leverandører
 
Det er mulig å benytte leverandører (tredjepartsaktører) til å opprette samtykkeforespørsler og hente ut data på vegne av datakonsumenten.
 
**Krav for bruk av leverandør:**
 
1. Scope `altinn:consentrequests.write` må delegeres til leverandøren.
2. Scope for det aktuelle API-et må også delegeres til leverandøren (f.eks. [skatteetaten:inntekt](https://skatteetaten.github.io/api-dokumentasjon/api/inntekt)).
3. Leverandøren oppretter forespørselen på vegne av datakonsumenten.
4. Brukeren henter ut samtykketoken og kaller API-et for å hente data.
 
> **Merk:** Sluttbruker får informasjon i GUI om at samtykket håndteres av leverandør.
 
### 5. EBevis-løsningen
 
For Digdirs EBevis-løsning kan Digdir be om samtykke på vegne av datakonsument uten at scope er delegert til Digdir. Dette gjør det mulig for aktører som kommuner å bruke løsningen uten å ha fullt oppsett i Maskinporten.
 
EBevis-løsningen har et eget scope som tillater opprettelse av samtykkeforespørsler for alle virksomheter for sine ressurser.
 
---
 
For mer informasjon, se [Altinn Studio-dokumentasjonen](https://docs.altinn.studio/) eller kontakt Altinn support.
