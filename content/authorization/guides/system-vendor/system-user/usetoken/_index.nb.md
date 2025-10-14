---
title: Bruk av Systembruker
description: Beskrivelse av hvordan Systembrukeren brukes etter den er opprettet
linktitle: Bruk av Systembruker
weight: 5
---

### Request (JWT Grant)

Funksjonaliteten er basert på Oauth2-utvidelsen for fin-granulert autorisasjon (Rich Authorization Requests, RAR), der vi har definert en ny type urn:altinn:systemuser for systembruker-mønsteret.

Leverandøren ber om å få et token for en påstått kunde ved å oppgi kundens organisasjonsnummer, og dersom en systembruker-delegering foreligger i Altinn, vil det returneres et Maskinporten-token med systembruker-identifikator som API-tilbyder i sin tur kan benytte til å konstruere spørringer mot Altinn Autorisasjon PDP for å finne detaljert ut hva leverandørens system er autorisert til å utføre.

{{<mermaid>}}
sequenceDiagram
Sluttbrukersystem->>+Maskinporten: Forespørre token(client_id, systemUserOrgNo)
Maskinporten->>Altinn Autorisasjon: GetSystemUser(client_id, systemUserOrgNo)
Altinn Autorisasjon-->>Maskinporten: Systembrukerinformasjon
Maskinporten-->>Sluttbrukersystem: Systembruker-token
Sluttbrukersystem->>API: API-kall m/systembrukertoken
API->>Altinn Autorisasjon: Authorize(systemUserId, res, action, part)
Altinn Autorisasjon-->>API: AuthorizationResponse
API-->>Sluttbrukersystem: API Resultat
{{< /mermaid >}}

Et fagsystem ber om å få systembruker-token på vegne av en part ved å inkludere en RAR-forespørsel av type urn:altinn:systemuser med partens organisasjonsidentifikator, i [JWT-grantet](https://docs.digdir.no/docs/Maskinporten/maskinporten_protocol_jwtgrant)

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
Man kan kun spørre på en part om gangen. Grantet må også alltid forespørre et eller flere Oauth2 scopes.
{{% /notice%}}

### Response (JWT Token)

Tokenet vil innehold en liste med systembrukere som tilhører kundens organisasjonnummer, og er knyttet mot leverandørens fagsystem gjennom det autentiserte fagsystemet (client_id):

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
Tokenet man får fra Maskinporten legges ved som et bearer token mot de API man skal kalle.
{{% /notice%}}

## Demoklient

For en demo av hvordan leverandørstyrt opprettelsee kan se ut, så vår demolklient [SmartCloud](http://smartcloudaltinn.azurewebsites.net).

Se kode med dokumentasjon [her](https://github.com/TheTechArch/altinn-systemuser).

For opprettelse av systembrukere kan testbrukere/organisasjoner fra Tenor benyttes.
