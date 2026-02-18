---
title: Hvordan sette opp en stateless app
linktitle: Oppsett
description: Følg stegene i denne guiden for å sette opp en stateless app.
draft: true
weight: 1
---

## Før du starter

Denne guiden tar utgangspunkt i at du har lagt en ny, tom app, gjennom Altinn Studio sitt brukergrensesnitt. Se 
[Kom i gang]({{<relref "/altinn-studio/v10/getting-started">}}) om du er usikker på hvordan det gjøres.

## 1. Konfigurasjon

Vi skal fortelle appen at den skal ignorere prosess ved oppstart, og heller gå rett til den visningen vi ønsker. 
Dette gjør du i filen `applicationmetadata.json`.

Legg til følgende linje i `App/config/applicationmetadata.json`:

```json
"onEntry": { "show": "form" }
```

{{% notice info %}}
Her forteller vi appen hvilket sideoppsett vi ønsker at den skal vise i stedet for å starte en prosessflyt. Appen kommer 
med et ferdig sideoppsett som heter `form`, som vi bruker her. 
{{% /notice %}}

Eksempel på konfigurasjon:

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json{hl_lines=[30]}
{
  "id": "ttd/stateless-app-demo",
  "org": "ttd",
  "title": {
    "nb": "Stateless App Demo"
  },
  "dataTypes": [
    {
      "id": "ref-data-as-pdf",
      "allowedContentTypes": [
        "application/pdf"
      ],
      "maxCount": 0,
      "minCount": 0
    },
    {
      "id": "model",
      "allowedContentTypes": [
        "application/xml"
      ],
      "appLogic": {
        "autoCreate": true,
        "classRef": "Altinn.App.Models.model"
      },
      "maxCount": 1,
      "minCount": 1
    }
  ],
  ...
  "onEntry": { "show": "stateless" } // legg til denne linjen
}
```

## 2. Utform visningen
Du kan utforme siden(e) som skal vises på vanlig måte, f.eks. i utformingsverktøyet i Altinn Studio.
Se [Kom i gang]({{<relref "/altinn-studio/v10/getting-started" >}}) hvis du er usikker på hvordan dette gjøres.
Stateless visning støtter alle komponenter, med unntak av

- Filopplaster
- Send inn-knapp
- Egendefinert knapp
- Handlingsknapp
