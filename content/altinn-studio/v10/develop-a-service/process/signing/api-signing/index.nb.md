---
draft: true
title: API-basert signering
linktitle: API-basert signering
description: Slik setter du opp signering via API.
tags: [signering, needsReview, translate]

aliases:
- /nb/altinn-studio/guides/signing/api-signing
---

## Hva er API-basert signering?

{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/api-signing/intro.nb.md" %}}

## Avhengigheter

Hvis appen skal sende signeringskvittering til innboksen til den som signerer, må meldingstjenesten i Altinn være satt opp.

## Sette opp signering

[Se veiledningene for å sette opp signering](/nb/altinn-studio/v10/develop-a-service/process/signing/).
API-basert signering har samme krav til oppsett, bortsett fra at layout-set for signeringssteget kan gjøres enklere.

## De sentrale API-kallene

### Utføre enkeltsignering
Hvis bare én person skal signere i et signeringssteg, kan du bruke «process next»-endepunktet:  
`PUT /{org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/process/next`

Body:
```json
{
  "action": "sign"
}
```

Da går prosessen automatisk videre etter at signaturen er lagret.
Hvis du bruker dette API-endepunktet, må du ha flere signeringssteg hvis flere skal signere.

### Utføre parallellsignering

Hvis du vil at flere skal signere parallelt, må du bruke følgende endepunkt i stedet for «process next»:  
`POST /{org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/actions`

Body:
```json
{
  "action": "sign"
}
```

Da blir prosessen stående i signeringssteget, og flere kan signere før prosessen dras videre med et «process next»-kall.

### Informasjon om de som skal signere og signaturer

Hvis [brukerstyrt signering](/nb/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/) er satt opp, kan du bruke følgende API-endepunkt for å hente ut en liste med de som skal signere (signatarer) og deres signeringsstatus.
Du kan også bruke API-endepunktet selv om du ikke bruker brukerstyrt signering, men da listes bare de som allerede har signert ut. Det fungerer da som en signaturliste.  
`GET /{org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/signing`

Eksempel på respons før signering er utført, der en person og en virksomhet skal signere:
```json
{
  "signeeStates": [
    {
      "name": "BØYLEHEST MATT",
      "organisation": null,
      "delegationSuccessful": true,
      "notificationStatus": "Sent",
      "partyId": 51281269,
      "signedTime": null
    },
    {
      "name": null,
      "organisation": "LYDIG VENNLIG KATT KJERNE",
      "delegationSuccessful": true,
      "notificationStatus": "Sent",
      "partyId": 51843877,
      "signedTime": null
    }
  ]
}
```

Etter signering (her har Bøylehest Matt signert på vegne av seg selv, og Fisk Kunstig på vegne av organisasjonen Lydig Vennlig Katt Kjerne):

```json
{
  "signeeStates": [
    {
      "name": "BØYLEHEST MATT",
      "organisation": null,
      "delegationSuccessful": true,
      "notificationStatus": "Sent",
      "partyId": 51281269,
      "signedTime": "2025-03-03T11:16:02.9390324Z"
    },

    {
      "name": "FISK KUNSTIG",
      "organisation": "LYDIG VENNLIG KATT KJERNE",
      "delegationSuccessful": true,
      "notificationStatus": "Sent",
      "partyId": 51843877,
      "signedTime": "2025-03-03T11:18:25.9518554Z"
    }
  ]
}
```
