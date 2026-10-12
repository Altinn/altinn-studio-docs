---
draft: true
title: Lagring
linktitle: Lagring
description: Slik velger du format for skjemadata og hindrer at instanser blir slettet
toc: true
tags: [needsReview]
---

Altinn lagrer instansene og dataene til appen i lagringstjenesten Altinn Storage. I filen `App/config/applicationmetadata.json` kan du bestemme

- hvilket format skjemadataene får
- hvor lenge ingen kan slette en instans etter at prosessen er avsluttet

## Velge format for skjemadata

Appen lagrer skjemadata som XML hvis du ikke velger noe annet. Nye apper har bare `application/xml` i `allowedContentTypes`. Appen kan selv lese både XML og JSON. Formatet har betydning for

- systemer som henter dataene direkte fra Altinn Storage, for eksempel et fagsystem
- mottakere som får dataene fra appen via eFormidling eller Fiks Arkiv (løsninger som sender dataene videre til arkiv- eller fagsystemet hos mottakeren)

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

Appen bruker det formatet av `application/json` og `application/xml` som står først i listen. Har datatypen ingen liste, lagrer appen som XML. Står bare andre formater i listen, for eksempel `application/pdf`, lagrer appen også som XML, men skjemadataene får en valideringsfeil, og brukerne kan ikke sende dem inn.

Endringen gjelder bare nye skjemadata som appen lager etter at du har publisert endringen. Skjemadata som allerede finnes, beholder formatet sitt, også når brukerne endrer dem.

{{% notice warning %}}
Har appen instanser som brukerne ikke har sendt inn ennå, må `application/xml` fortsatt stå i listen. Ellers får instansene med XML-data en valideringsfeil, og brukerne kan ikke sende dem inn.
{{% /notice %}}

{{% notice warning %}}
Sender appen skjemadataene via eFormidling, får filen med skjemadataene et navn som bygger på datatypen og alltid slutter på `.xml`, for eksempel `model.xml`, også når innholdet er JSON. Mottakerne får altså JSON i en fil som slutter på `.xml`. Avklar med mottakerne før du bytter til JSON.
{{% /notice %}}

Har appen egen kode som leser eller lagrer skjemadata, kan du spørre utviklerne: «Bruker egen kode i appen utdaterte metoder for å lese eller lagre skjemadata?» Noen eldre metoder virker ikke når `application/json` står i listen, og appen stopper med en feil når den bruker dem.

## Hindre at instanser blir slettet

Med `preventInstanceDeletionForDays` bestemmer du hvor mange dager ingen kan slette en instans etter at prosessen er avsluttet, det vil si når det siste steget i prosessen er ferdig. Det siste steget kan for eksempel være signering eller betaling. Sperren gjelder både brukerne og tjenesteeieren.

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
- Sperren gjelder bare instansen, ikke de enkelte dataelementene. Står `autoDeleteOnProcessEnd: true` under `appLogic` for en datatype, sletter appen dataene av denne typen når prosessen er avsluttet, uansett sperre.

{{% notice warning %}}
Ikke kombiner `preventInstanceDeletionForDays` med `autoDeleteOnProcessEnd: true` på øverste nivå i `applicationmetadata.json`, det vil si for hele appen. Da sletter appen hele instansen i samme øyeblikk som prosessen slutter, før sperren gjelder.
{{% /notice %}}
