---
draft: true
title: Lagring
linktitle: Lagring
description: Slik velger du format for skjemadata og hindrer at instanser blir slettet
toc: true
tags: [needsReview]
---

Altinn lagrer instansene og dataene til appen i lagringstjenesten Altinn Storage. Du kan styre to ting ved lagringen i filen `App/config/applicationmetadata.json`:

- hvilket format skjemadataene får
- hvor lenge ingen kan slette en instans etter at den er sendt inn

## Velge format for skjemadata

Appen lagrer skjemadata som XML hvis du ikke velger noe annet. Nye apper har bare `application/xml` i `allowedContentTypes`. Appen kan selv lese både XML og JSON, så formatet har bare betydning for systemer som henter dataene direkte fra Altinn Storage, for eksempel et fagsystem.

Vil du lagre skjemadataene som JSON, setter du `application/json` først i `allowedContentTypes` for datatypen:

```json
{
  "dataTypes": [
    {
      "id": "model",
      "appLogic": {
        "classRef": "Altinn.App.Models.model.model"
      },
      "allowedContentTypes": ["application/json", "application/xml"]
    }
  ]
}
```

Appen bruker det formatet av `application/json` og `application/xml` som står først i listen. Står ingen av dem i listen, lagrer appen som XML.

Endringen gjelder bare data appen lagrer etter at du har publisert endringen. Data som allerede er lagret, beholder formatet sitt.

{{% notice warning %}}
Har appen allerede instanser i Altinn Storage, må `application/xml` fortsatt stå i listen. Ellers får instansene med XML-data en valideringsfeil, og brukerne kan ikke sende dem inn.
{{% /notice %}}

## Hindre at instanser blir slettet

Med `preventInstanceDeletionForDays` bestemmer du hvor mange dager ingen kan slette en instans etter at den er sendt inn. Sperren gjelder både brukerne og tjenesteeieren.

Eksempelet hindrer sletting i 30 dager:

```json
{
  "preventInstanceDeletionForDays": 30
}
```

Slik fungerer sperren:

- Altinn regner dagene fra instansen ble arkivert, det vil si da prosessen ble avsluttet.
- Sperren gjelder ikke før instansen er arkivert. Brukerne kan for eksempel fortsatt slette utkast.
- Prøver noen å slette instansen i perioden, avviser Altinn Storage slettingen.
