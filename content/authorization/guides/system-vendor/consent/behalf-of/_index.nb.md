---
title: På vegne av andre
linktitle: På vegne av andre
weight: 30
toc: false
---

For å opprette samtykkeforespørsler på vegne av en annen virksomhet må dere skille mellom:

- Virksomheten som er datakonsument (consumer): organisasjonen som skal stå som mottaker av samtykket (f.eks. Sparebank Super).
- Virksomheten som har Maskinporten-klienten: leverandør-/driftsorganisasjonen som faktisk kaller API-ene (f.eks. Sparebank Super - Drift).

Eksemplene under bruker fiktive aktører (TT02):

- Sparebank Super orgnr (consumer): `313876144`
- Sparebank Super - Drift orgnr (Maskinporten-klient eies her): `310149942`
- Privatperson: `03867199348`

## 2.2.1 Deleger nødvendige scopes i Altinn (API-delegering)

Sparebank Super delegerer nødvendige scopes (minimum `altinn:consentrequests.write` og `altinn:consentrequests.read`) til Sparebank Super - Drift i Altinn under API-delegering.

![Scope-delegering i Altinn](../scopedelegation.jpg)

## 2.2.2 Sparebank Super - Drift: hent Maskinporten-token for å opprette samtykkeforespørsel

Sparebank Super - Drift henter et Maskinporten access token med scope `altinn:consentrequests.write`, men med `consumer_org` satt til Sparebank Super sitt organisasjonsnummer.

### JWT (assertion) claims

```jsonc
{
  "aud": "https://test.maskinporten.no/",
  "iss": "<MASKINPORTEN_CLIENT_ID_FOR_SPAREBANK_SUPER_DRIFT>",
  "scope": "altinn:consentrequests.write",
  "iat": 1736938000,
  "exp": 1736938120,
  "jti": "<UNIQUE_JTI>",
  "consumer_org": "313876144" // Sparebank Super
}
```

## 2.2.3 Sparebank Super - Drift sender samtykkeforespørsel (fra person, til Sparebank Super)

Selve samtykkeforespørselen opprettes til Sparebank Super sitt orgnr, men kallet gjøres med tokenet til Sparebank Super - Drift (med `consumer_org=313876144`).

### Request payload (eksempel)

```jsonc
{
  "id": "a005e4e7-78b3-42b4-ce69-dc68cc5349eb", // Unik samtykke-UUID (generer ny per forespørsel)
  "from": "urn:altinn:person:identifier-no:03867199348", // Person eller org det skal hentes samtykke fra
  "to": "urn:altinn:organization:identifier-no:313876144", // Sparebank Super
  "validTo": "2026-07-07T13:45:00.0000000+00:00", // Varighet på samtykket (tidspunkt samtykket utløper)
  "consentRights": [
    {
      "action": ["consent"],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "enkelt-samtykke" // Referanse til ressurs i ressursregisteret (se https://docs.altinn.studio/nb/api/resourceregistry/resource/)
        }
      ],
      "metaData": {
        // Metadata-tags definert på ressursen i ressursregisteret
        "simpletag": "2026"
      }
    }
  ],
  "redirectUrl": "https://altinn.no" // Hvor sluttbruker sendes etter godkjenning/avslag
}
```

Du får tilbake en respons som blant annet inneholder `id` (samtykkeforespørselen) og ofte `viewUri` (lenke til UI for å godkjenne).

## 2.2.4 Privatperson godkjenner samtykkeforespørselen

![Godkjenning av samtykkeforespørsel i Altinn](../../images/behalfOfNB.png)

## 2.2.5 Sparebank Super - Drift henter samtykke-token

Når samtykket er godkjent, henter Sparebank Super - Drift et samtykke-token. Husk å oppgi `consumer_org` som Sparebank Super sitt orgnr.

### JWT (assertion) claims

```jsonc
{
  "aud": "https://test.maskinporten.no/",
  "iss": "<MASKINPORTEN_CLIENT_ID_FOR_SPAREBANK_SUPER_DRIFT>",
  "scope": "altinn:consentrequests.read",
  "iat": 1736938000,
  "exp": 1736938120,
  "jti": "<UNIQUE_JTI>",
  "consumer_org": "313876144", // Sparebank Super
  "authorization_details": [
    {
      "type": "urn:altinn:consent",
      "id": "a005e4e7-78b3-42b4-ce69-dc68cc5349eb", // Samme "id" som i samtykkeforespørselen over
      "from": "urn:altinn:person:identifier-no:03867199348"
    }
  ]
}
```

Tokenet du får tilbake fra Maskinporten brukes videre som samtykketoken mot tjenesteeierens API.
