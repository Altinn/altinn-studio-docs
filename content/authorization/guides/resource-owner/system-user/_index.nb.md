---
title: Systembruker for tjenesteeier
linktitle: Systembruker
description: En veiledning for tjenesteeiere for å registrere sin ressurs med Altinn og etablere systembrukerintegrasjonen.
toc: true
aliases:
  - nb/authentication/guides/sy/nb/authentication/guides/serviceowner/
---

## Forutsetninger for Tjenesteeier

For å bruke systembruker som tjenesteeier, må følgende forutsetninger være oppfylt:

- Avtale med Maskinporten AS som [Tjenesteeier](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apitilbyder)
- Avtale med Digdir for tilgang til ressursregisteret for å opprette ressurser.
- Oppretting av [nødvendige ressurser](/nb/authorization/guides/resource-owner/create-resource-resource-admin/) som må autoriseres
- Tildelt scope for PDP-integrasjon
- Integrasjon med Altinn PDP

#### Forberedelse av Tjenesteeier (Skatteetaten)

1.  Utvikling av tjenesten/API
    - Tjenesteeier (Skatteetaten) må først utvikle API-et som skal brukes av eksterne parter, i dette tilfellet tjenesten 'Krav og betalinger'
    - Dette API-et gjør det mulig for brukere å hente utestående skatte og avgiftskrav fra Skatteetaten.
2.  Konfigurere tilgang i Maskinporten
    - Skatteetaten oppretter deretter et scope i Maskinporten (f.eks. skatteetaten:kravogbetalinger).
    - Dette scopet er knyttet til de relevante tilgangene og tildeles organisasjoner som trenger tilgang til denne tjenesten, som for eksempel SmartCloud AS (systemleverandøren).
3.  Registrering av ressurser i ressursregisteret

    - Den siste steg for Skatteetaten er å registrere en ressurs i [ressursregisteret](/nb/api/resourceregistry/), knytte den til scopet og definere tilgangsreglene for eksterne brukere. Dette kan være en app i Altinn Studio eller et API på tjenesteeieren sin egen plattform.

      se [API dokumentasjon](/nb/api/authentication/systemuserapi/) for mer informasjon om tilgjengeleige endepunkter.

#### Etter opprettelse av systembruker

## Validering av Maskinporten token

Selve tokenet valideres som et standardisert Maskinporten token. [Les mer hos Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apitilbyder).

Et systembrukertoken inneholder en del flere detaljer enn et vanlig Maskinporten token.

Nedenfor vises et eksempeltoken.

### JWT Token

```json
{
  "authorization_details": [
    {
      "type": "urn:altinn:systemuser",
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "id": "0192:314168267"
      },
      "systemuser_id": ["ebe4a681-0a8c-429e-a36f-8f9ca942b59f"],
      "system_id": "matrix_test"
    }
  ],
  "scope": "krr:global/kontaktinformasjon.read",
  "iss": "https://test.maskinporten.no/",
  "client_amr": "private_key_jwt",
  "token_type": "Bearer",
  "exp": 1718175135,
  "iat": 1718175015,
  "client_id": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "jti": "-SpfU--1Zn_Oqvkpjwu3oVn--VLcPzSAwjqyiP6zBEw",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:314330897"
  }
}
```

Verdiene som er viktige for tjenesteeier er.

| Verdi                                   | Betydning                                                                                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| authorization_details:systemuser_id     | Unik id for systembrukeren. Det er denne verdien som Altinn trenger for å kunne autorisere tilgang. Det er denne som har fått delegert tilganger. |
| authorization_details:systemuser_org:id | Organisasjonen som har opprettet systembrukeren                                                                                                   |
| authorization_details:system_id         | Referanse til systemet som systembrukeren peker på                                                                                                |
| Consumer:id                             | Organisasjonsnr til systemleverandør (organisasjon som har autentisert seg mot Maskinporten)                                                      |

Se også dokumentasjon hos [Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_systembruker).

## Autorisasjon av systembruker

Tjenesteeier må kalle Altinn PDP for å autorisere tilgangen til systembrukeren. Dette gjøres ved å sende et kall til Altinn PDP.

Tjenesteeier må konfigurere hvilke handlinger og ressurser som aksesseres via API-et for å bygge opp den totale forespørselen.

Nedenfor vises et eksempel på et kall utført av systembruker **a545ca29-7fb8-4810-a2f2-0be171cb2a26** som prøver å gjøre en **read**-operasjon
på en ressurs av typen **kravogbetaling** for organisasjonen **923609016**.

```json
{
  "Request": {
    "ReturnPolicyIdList": true,
    "AccessSubject": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:systemuser:uuid",
            "Value": "a545ca29-7fb8-4810-a2f2-0be171cb2a26"
          }
        ]
      }
    ],
    "Action": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
            "Value": "read",
            "DataType": "http://www.w3.org/2001/XMLSchema#string"
          }
        ]
      }
    ],
    "Resource": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:resource",
            "Value": "kravogbetaling"
          },
          {
            "AttributeId": "urn:altinn:organization:identifier-no",
            "Value": "923609016"
          }
        ]
      }
    ]
  }
}
```

Altinn PDP returnerer svaret som en XACML Json respons hvor det informeres om request autorisert eller ikke.

Tjenesteeier må i sitt API ha logikk for å kunne avvise eller godta forespørsel fra system basert på dette.

```json
{
  "Response": [
    {
      "Decision": "Permit",
      "Status": {
        "StatusCode": {
          "Value": "urn:oasis:names:tc:xacml:1.0:status:ok"
        }
      },
      "Obligations": [
        {
          "id": "urn:altinn:obligation:authenticationLevel1",
          "attributeAssignment": [
            {
              "attributeId": "urn:altinn:obligation-assignment:1",
              "value": "2",
              "category": "urn:altinn:minimum-authenticationlevel",
              "dataType": "http://www.w3.org/2001/XMLSchema#integer",
              "issuer": null
            }
          ]
        }
      ]
    }
  ]
}
```

Se flere eksempler på bruk av Altinn PDP her.
