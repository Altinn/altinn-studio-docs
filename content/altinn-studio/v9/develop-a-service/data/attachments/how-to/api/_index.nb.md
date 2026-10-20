---
draft: true
title: Slik tar du imot vedlegg via API
linktitle: Vedlegg via API
description: Slik legger du til en vedleggstype som systemer kan laste opp til via API.
weight: 20
tags: [needsReview]
---

Skal bare systemer laste opp vedlegg, trenger du ingen komponent i skjemaet. Du legger i stedet til en datatype i filen `applicationmetadata.json`. Systemer kan da bare laste opp vedlegg av denne typen via API.

Systemer kan også laste opp til datatypene som vedleggskomponentene i skjemaet bruker.

## Legge til en datatype

Du legger til datatypen i listen `dataTypes`. Eksempelet under tar imot én PDF-fil som bare NAV og en navngitt organisasjon kan laste opp.

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "dataTypes": [
    {
      "id": "attest",
      "taskId": "Task_1",
      "maxSize": 25,
      "maxCount": 1,
      "minCount": 0,
      "allowedContentTypes": ["application/pdf"],
      "allowedContributors": ["org:nav", "orgNo:XXXXXXXXXX"],
      "grouping": "Attester"
    }
  ]
}
```

Du finner en forklaring av hver egenskap på siden [Egenskaper på datatypen for vedlegg]({{< relref "/altinn-studio/v9/develop-a-service/data/attachments/reference/datatype" >}}).

## Sjekke at prosessteget stemmer

Appen kontrollerer at datatypen hører til prosessteget (taskId) som instansen står i. Laster et system opp til en datatype som hører til et annet prosessteg, svarer appen med feilkoden 409. Appen gjør denne kontrollen som standard.

## Bestemme hvem som kan laste opp

Med `allowedContributors` begrenser du hvem som kan opprette og endre vedlegg av datatypen. Du kan gi tilgang til en tjenesteeier eller en organisasjon, eller du kan sørge for at bare appen selv kan endre vedleggene. Du finner alle verdiene under [Verdier i allowedContributors]({{< relref "/altinn-studio/v9/develop-a-service/data/attachments/reference/datatype" >}}#verdier-i-allowedcontributors).

## Se også

- [Slik tar du imot vedlegg i skjemaet]({{< relref "/altinn-studio/v9/develop-a-service/data/attachments/how-to/skjema" >}})
- [Slik slår du på virusskanning]({{< relref "/altinn-studio/v9/develop-a-service/data/attachments/how-to/virusskanning" >}})
