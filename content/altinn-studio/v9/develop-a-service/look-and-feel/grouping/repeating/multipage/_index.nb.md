---
draft: true
title: Fylle ut en rad over flere sider
linktitle: Flere sider
description: Slik deler du feltene i en rad i en repeterende gruppe inn i flere sider
weight: 3
tags: [needsReview]
---

Hvis hver rad i en repeterende gruppe har mange felter, kan det bli mye rulling og dårlig oversikt for brukeren. Du kan dele feltene i raden inn i flere sider. Under utfyllingen blar brukeren mellom sidene med knappene **Neste** og **Tilbake**. Sidene finnes bare inne i raden. Resten av skjemaet endrer seg ikke når brukeren blar.

## Del raden inn i sider

1. Sett `"multiPage": true` i `edit` på gruppen.
2. Sett et sidenummer og et kolon foran hver komponent-ID i `children`. Den første siden har nummer `0`, den andre `1` og så videre. En komponent på den første siden skriver du altså som `0:komponent-id`.

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json {hl_lines=["5-8", "14-15"]}
{
  "id": "barn",
  "type": "RepeatingGroup",
  "children": [
    "0:fnr",
    "1:fornavn",
    "1:mellomnavn",
    "1:etternavn"
  ],
  "dataModelBindings": {
    "group": "familie.barn"
  },
  "edit": {
    "multiPage": true,
    "mode": "hideTable"
  }
}
```

Når `multiPage` er `true`, må alle ID-ene i `children` ha et sidenummer. Hvis én ID mangler sidenummer, gir appen en feil.

Eksempelet bruker også [`"mode": "hideTable"`]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/grouping/repeating/edit#mode" >}}), som skjuler tabellen mens brukeren redigerer en rad. Resultatet ser slik ut:

![Utfylling av en rad over flere sider](group-multipage.gif "Utfylling av en rad over flere sider")

## Slik oppfører sidene seg

- Hvis alle komponentene på en side er skjult, hopper appen over siden.
- Du kan endre tekstene på knappene med `multipageNextButton` og `multipageBackButton` i `textResourceBindings`, se [Tekster]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/grouping/repeating#tekster" >}}).
