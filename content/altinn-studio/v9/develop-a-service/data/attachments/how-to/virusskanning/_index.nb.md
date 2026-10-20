---
draft: true
title: Slik slår du på virusskanning
linktitle: Virusskanning
description: Slik slår du på virusskanning for vedlegg og bestemmer om brukerne må vente på resultatet.
weight: 30
tags: [needsReview]
---

Altinn kan skanne opplastede filer for virus. Skanningen starter rett etter at filen er lastet opp til lagringstjenesten Altinn Storage. Altinn lagrer resultatet sammen med opplysningene om filen litt senere, og alle som har tilgang til instansen, kan se det.

Når du bruker Designer til å lage datatyper for vedleggskomponenter, slår Designer på virusskanning som standard. Lager du datatypene selv, for eksempel for opplasting via API, må du slå på skanningen selv.

## Slå på skanningen for en datatype

Du slår på skanningen per datatype med `enableFileScan`. Finner skanningen virus før prosessen er ferdig, får brukeren en valideringsfeil og kan ikke gå videre.

Skanningen kan ta litt tid. Vil du hindre at brukeren sender inn før skanningen er ferdig, setter du også `validationErrorOnPendingFileScan` til `true`. Da får brukeren en valideringsfeil så lenge skanningen pågår.

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "dataTypes": [
    {
      "id": "attest",
      "taskId": "Task_1",
      "maxCount": 1,
      "minCount": 0,
      "allowedContentTypes": ["application/pdf"],
      "enableFileScan": true,
      "validationErrorOnPendingFileScan": true
    }
  ]
}
```

{{% notice warning %}}
Eldre eksempler viser ofte `"enablePdfCreation": true` på datatyper. Appen støtter ikke lenger den egenskapen, og du får byggefeilen [ALTINNAPP0600]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0600" >}}). Du lager PDF med et eget PDF-steg i prosessen i stedet. Se [veiledningen om PDF]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
{{% /notice %}}

## Skrive egne feilmeldinger

Appen har ferdige meldinger på bokmål, nynorsk og engelsk for infisert fil og for ventende skanning. Vil du bruke egne tekster, legger du til tekstressurser med nøklene som står på siden [Egenskaper og tekstnøkler for virusskanning]({{< relref "/altinn-studio/v9/develop-a-service/data/attachments/reference/virusskanning" >}}).

## Hva skjer med en infisert fil?

Altinn sletter ikke infiserte filer. Filen blir liggende på instansen, og brukeren må slette den selv. Brukeren kan fortsatt laste ned en infisert fil, men kan ikke sende inn et skjema som inneholder den.

## Se også

- [Slik tar du imot vedlegg via API]({{< relref "/altinn-studio/v9/develop-a-service/data/attachments/how-to/api" >}})
- [Utvidet filvalidering]({{< relref "/altinn-studio/v9/develop-a-service/data/validation/files" >}})
