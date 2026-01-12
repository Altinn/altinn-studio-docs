---
title: Bruk av systembruker
description: Steg-for-steg-veiledning for å hente og bruke systembrukertoken fra Maskinporten mot Altinn.
linktitle: Bruk av systembruker
weight: 5
---

## Introduksjon

**Målgruppe:** Utviklere og systemintegratorer som allerede har opprettet en systembruker og trenger å hente Maskinporten-token som kan brukes mot Altinn-tjenester.

Denne veiledningen dekker hele flyten fra forespørselen mot Maskinporten til du benytter tokenet i Altinn. Vi forklarer forskjellen mellom systembruker-typene **egen** og **agent**, viser separate eksempler for forespørsel (request) og respons, og oppsummerer vanlige feil du bør unngå.

Bruken av systembruker mot Altinn-tjenester følger sekvensen under:

{{<mermaid>}}
sequenceDiagram
Sluttbrukersystem->>+Maskinporten: Forespør token (client_id, systemUserOrgNo)
Maskinporten->>Altinn Autorisasjon: GetSystemUser(client_id, systemUserOrgNo)
Altinn Autorisasjon-->>Maskinporten: systembrukerinformasjon
Maskinporten-->>Sluttbrukersystem: systembruker-token
Sluttbrukersystem->>API: API-kall med systembrukertoken
API->>Altinn Autorisasjon: Authorize(systemUserId, res, action, part)
Altinn Autorisasjon-->>API: AuthorizationResponse
API-->>Sluttbrukersystem: API-resultat
{{< /mermaid >}}

## Forstå systembrukertyper

| Type  | Når brukes den? | Hva betyr `authorization_details.systemuser_org.ID`? | Scenario |
|-------|-----------------|-------------------------------------------------------|----------|
| **egen** | Når dere bruker systembrukeren i eget fagsystem | Samme organisasjonsnummer som Maskinporten-klienten (den som autentiserer seg) | Tjenesteeier bruker sitt eget system |
| **agent** | Når dere leverer tjenester på vegne av en kunde | Kundens organisasjonsnummer. Responsen får `consumer.ID` lik systemleverandørens organisasjonsnummer | Systemleverandør (agent) som opererer for kunden |

Uavhengig av type bruker du `type: "urn:altinn:systemuser"` i `authorization_details`. Forskjellen ligger i hvilken kunde du ber om (`systemuser_org.ID`) og hvem som autentiserer seg (`consumer.ID`).

{{% notice info %}}
Velg **egen** dersom dere henter token til egen organisasjon. Velg **agent** dersom dere representerer en kunde og må angi kundens organisasjonsnummer i forespørselen.
{{% /notice %}}

## Forutsetninger

- Maskinporten-klient registrert for fagsystemet (prod og/eller test) med aktivt nøkkelmateriale.
- Systembruker er opprettet i Altinn og har fått delegert riktige tilgangspakker for kunden(e).
- OAuth2-scopene for API-ene du skal bruke er tildelt Maskinporten-klienten.
- Organisasjonsnummer angis i ISO 6523-format: `0192:XXXXXXXXX`.

## Steg-for-steg: hent systembrukertoken

### 1. Identifiser kunden og ressursen

- Finn organisasjonsnummeret til kunden du skal representere.
- Verifiser at kunden har delegert systembruker-tilgang til ditt fagsystem.
- Bestem hvilke OAuth2-scopes du trenger i tokenet.

### 2. Bygg JWT-grant med Rich Authorization Requests (RAR)

OAuth2 RAR-utvidelsen brukes for å spesifisere hvilken systembruker du trenger tilgang til. Sett `systemuser_org.ID` til kundens organisasjon (agent-scenario) eller deres egen organisasjon (egen-scenario). Feltet `aud` må matche Maskinporten-miljøet (`https://maskinporten.no` i produksjon, `https://test.maskinporten.no` i test).

#### Eksempel: Dekodet JWT-innhold

```json
{
  "aud": "https://maskinporten.no",
  "iss": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "sub": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "scope": "krr:global/kontaktinformasjon.read",
  "authorization_details": [
    {
      "type": "urn:altinn:systemuser",
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:123456789"
      }
    }
  ],
  "iat": 1718124715,
  "exp": 1718124835,
  "jti": "89365ecd-772b-4462-a4de-ac36af8ef3e2"
}
```

Signer JWT-en med klientens private nøkkel og legg den inn i `client_assertion` når du kaller Maskinporten.

### 3. Send forespørselen til Maskinporten

Maskinporten-tokenendepunktet forventer en `application/x-www-form-urlencoded` forespørsel.

#### Eksempel: HTTP request

```
POST https://test.maskinporten.no/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&
scope=krr%3Aglobal%2Fkontaktinformasjon.read&
client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&
client_assertion=<signert-JWT>
```

#### Eksempel: cURL

```bash
curl \
  --request POST "https://test.maskinporten.no/token" \
  --header "Content-Type: application/x-www-form-urlencoded" \
  --data "grant_type=client_credentials" \
  --data "scope=krr:global/kontaktinformasjon.read" \
  --data "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
  --data "client_assertion=$(cat signed-jwt.txt)"
```

{{% notice info %}}
Du kan kun forespørre én kunde av gangen. Requesten må alltid inkludere ett eller flere OAuth2-scopes.
{{% /notice %}}

{{% notice warning %}}
Ikke bruk respons-eksemplet som request. Requesten består av den signerte JWT-en og form-dataen over. Responsen fra Maskinporten skal kun tolkes, ikke sendes tilbake.
{{% /notice %}}

### 4. Tolke Maskinporten-responsen

Et svar med `200 OK` inneholder et Maskinporten-token med informasjon om hvilke systembrukere du kan opptre som.

```json
{
  "access_token": "IxC0B76vlWl3fiQhAwZUmD0hr_PPwC9hSIXRdoUslPU=",
  "token_type": "Bearer",
  "expires_in": 599,
  "scope": "krr:global/kontaktinformasjon.read",
  "authorization_details": [
    {
      "type": "urn:altinn:systemuser",
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "id": "0192:123456789"
      },
      "systemuser_id": [
        "ebe4a681-0a8c-429e-a36f-8f9ca942b59f"
      ],
      "system_id": "123456789_systemid"
    }
  ],
  "client_id": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:987654321"
  }
}
```

| Felt | Beskrivelse |
|------|-------------|
| `authorization_details[].systemuser_id` | Listen over systembrukere du kan bruke for kunden. Du må sende denne verdien til Altinn Autorisasjon (PDP). |
| `authorization_details[].systemuser_org.ID` | Organisasjonen som eier systembrukeren. I agent-scenario er dette kundens selskap; i egen-scenario samsvarer den med `consumer.ID`. |
| `authorization_details[].system_id` | Referanse til ditt system i Altinn. Brukes for feilsøking og kontroll. |
| `consumer.ID` | Organisasjonsnummeret til Maskinporten-klienten (systemleverandøren). Kontroller at den samsvarer med forventet leverandør. |

### 5. Bruk tokenet mot Altinn

Systembrukertokenet fra Maskinporten brukes som Bearer-token i kall mot Altinn API-er. Altinn Autorisasjon (PDP) avgjør om systembrukeren kan utføre handlingen basert på `systemuser_id`, ressurs og handling.

Når du kaller PDP, send `systemuser_id` i attributtet `urn:altinn:systemuser:uuid`. Blir svaret `Permit` kan API-kallet gjennomføres; ellers må du avvise forespørselen.

For et komplett PDP-eksempel kan du se avsnittet [Autorisasjon av systembruker](/nb/authorization/guides/resource-owner/system-user/#autorisasjon-av-systembruker).

## Vanlige feil og tips

- **Respons brukt som request:** Bruk alltid den signerte JWT-en som `client_assertion`. JSON-responsen fra Maskinporten skal kun tolkes.
- **Manglende kunde-ID:** Husk å sette `systemuser_org.ID` til kundens organisasjon når du opererer som agent. Uten riktig verdi får du ikke `systemuser_id` i responsen.
- **Utgått nøkkelmateriale:** Kontroller at Maskinporten-klienten bruker aktive nøkler før du feilsøker videre.
- **Feil scope:** Bekreft at Maskinporten-klienten har fått tildelt alle OAuth2-scopene du ber om i forespørselen.
