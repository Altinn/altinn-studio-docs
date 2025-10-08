---
title: API-basert signering
linktitle: API-basert signering
description: Følg disse stegene for å implementere signering via API.
tags: [signering]
weight: 53
aliases:
- /nb/altinn-studio/guides/signing/api-signing
---

## Hva betyr API-basert signering?

{{% insert "content/altinn-studio/v8/guides/development/signing/api-signing/intro.nb.md" %}}

## Avhengigheter

Dersom appen skal kunne sende signeringskvittering til innboksen til den som signerer så må oppsett for bruk av meldingstjenesten i Altinn være satt opp.

## Oppsett av signering

Oppsett av signering kan gjøres ved hjelp av de andre guidene som du finner [her](/nb/altinn-studio/v8/guides/development/signing/).
API-basert signering har samme krav til oppsett, bortsett fra at layout-set for signeringssteget kan gjøres enklere.

## De sentrale API-kallene

### Utføre enkeltsignering
Dersom kun én person skal signere i et signeringssteg så kan man benytte "process next"-endepunktet:

`PUT /{org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/process/next`
  
Body:
```json
{
  "action": "sign"
}
```

Da vil prosessen automatisk gå videre etter at signaturen er lagret.
Ved bruk av dette endepunktet må man ha flere signeringssteg dersom flere skal signere.

### Utføre parallellsignering

Dersom man ønsker at flere skal kunne signere i parallell, så må man benytte følgende endepunkt i stedet for "process next":

`POST /{org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/actions`

Body:
```json
{
  "action": "sign"
}
```

Da blir prosessen fremdeles stående i signeringssteget, og flere kan eventuelt signere før prosessen dras videre med et "process next"-kall.

### Informasjon om signatarer og signaturer

Dersom [brukerstyrt signering](/nb/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/) er satt opp, kan følgende endepunkt brukes for å hente ut en liste med signatarer og deres signeringsstatus.
Endepunktet kan også brukes selv om man ikke benytter brukerstyrt signering, men da vil kun signatarer som allerede har signert listes ut. Det fungerer da som en signaturliste.

`GET /{org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/signing`

Eksempel på respons før signering er utført, hvor en person og en virksomhet skal signere:
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

Etter signering, hvor personen Bøylehest Matt har signert på vegne av seg selv, og personen Fisk Kunstig har signert på venge av organisasjonen Lydig Vennlig Katt Kjerne:
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
