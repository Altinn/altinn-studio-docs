---
title: Hvordan konfigurere tilgang uten innlogging
linktitle: Anonym tilgang
description: Følg denne guiden for å konfigurere tilgang til appen uten innlogging.
draft: true
weight: 2
---

## Før du starter
Tilgang til en tjeneste uten innlogging (anonym tilgang) er kun mulig å sette opp for apper som er stateless.
Følg ev. [guide for oppsett av en stateless app](./configure-stateless) før du starter på denne guiden.

{{%notice warning%}}
Merk at skjemakomponenter som kan starte appens prosess (i praksis `Handlingsknapp` for instansiering) ikke vil fungere
uten at bruker er pålogget.
{{%/notice%}}

## 1. Angi at datamodellen tillater anonym bruk

Dette gjør du ved å endre det aktuelle `dataType`-elementet i `applicationMetadata.json`. Datatypens `appLogic`-objekt må få en ny innstilling: `"allowAnonymousOnStateless": true`. Se eksempel under:

Lim inn følgende i datatypen `model` sin `appLogic`:

```
"allowAnonymousOnStateless": true
```

Se eksempel under:

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json{hl_lines=[24]}
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
        "classRef": "Altinn.App.Models.model",
        "allowAnonymousOnStateless": true
      },
      "maxCount": 1,
      "minCount": 1
    }
  ],
  ...
  "onEntry": { "show": "form" } 
}
```