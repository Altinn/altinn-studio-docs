---
title: Bruk av Systembruker
description: Denne veiledningen beskriver hvordan systembruker brukes etter at den er opprettet.
linktitle: Bruk av Systembruker
weight: 5
---

**Målgruppe:** Utviklere og systemintegratorer som allerede har opprettet en Systembruker og skal ta den i bruk i egne løsninger.

Bruken av Systembruker mot tjensester foregår på følgende måte:

{{<mermaid>}}
sequenceDiagram
Sluttbrukersystem->>+Maskinporten: Forespørre token(client_id, systemUserOrgNo)
Maskinporten->>Altinn Autorisasjon: GetSystemUser(client_id, systemUserOrgNo)
Altinn Autorisasjon-->>Maskinporten: systembrukerinformasjon
Maskinporten-->>Sluttbrukersystem: systembruker-token
Sluttbrukersystem->>API: API-kall m/systembrukertoken
API->>Altinn Autorisasjon: Authorize(systemUserId, res, action, part)
Altinn Autorisasjon-->>API: AuthorizationResponse
API-->>Sluttbrukersystem: API Resultat
{{< /mermaid >}}

## Be om systembrukertoken (JWT Grant)

OAuth2 Rich Authorization Requests (RAR)-utvidelsen brukes til å be om systembrukertoken. Altinn definerer typen **urn:altinn:systemuser** for dette formålet.

Leverandøren ber om token for en bestemt kunde ved å oppgi kundens organisasjonsnummer.  
Viktig at organisjasjonsnummer oppgis etter følgende standard:

```
"systemuser_org" : {
      "authority" : "iso6523-actorid-upis",
      "ID" : "0192:123456789"
    }
```

Finnes det en gyldig systemtilgang i Altinn, utstedes et Maskinporten-token som inneholder systembrukerens identifikator.

```http
POST https://test.maskinporten.no/token
Content-Type: application/json

{
  "aud" : "https://maskinporten.no",
  "sub" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "authorization_details" : [ {
    "systemuser_org" : {
      "authority" : "iso6523-actorid-upis",
      "ID" : "0192:123456789"
    },
    "type" : "urn:altinn:systemuser"
  } ],
  "scope" : "krr:global/kontaktinformasjon.read",
  "iss" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "exp" : 1718124835,
  "iat" : 1718124715,
  "jti" : "89365ecd-772b-4462-a4de-ac36af8ef3e2"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "access_token" : "IxC0B76vlWl3fiQhAwZUmD0hr_PPwC9hSIXRdoUslPU=",
  "token_type" : "Bearer",
  "expires_in" : 599,
  "scope" : "difitest:test1"
}
```

{{%notice info%}}
Du kan kun forespørre én kunde om gangen. Grantet må alltid inkludere ett eller flere OAuth2-scopes.
{{% /notice%}}

## Tokeninnhold

Tokenet inneholder en liste med systembrukere som tilhører kundens organisasjonsnummer. Disse er knyttet til leverandørens fagsystem via det autentiserte fagsystemet (client_id):

```json
{
  "authorization_details": [
    {
      "type": "urn:altinn:systemuser",
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "id": "0192:123456789"
      },
      "systemuser_id": ["ebe4a681-0a8c-429e-a36f-8f9ca942b59f"],
      "system_id": "123456789_systemid"
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
    "ID": "0192:987654321"
  }
}
```

{{%notice info%}}
Tokenet fra Maskinporten skal brukes som Bearer-token i API-kallene.
{{% /notice%}}

Tjenesteeier bruker deretter tokenet mot Altinn Autorisasjon (PDP) for å avgjøre hvilke operasjoner systemet er autorisert til å utføre.
