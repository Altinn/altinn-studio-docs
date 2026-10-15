---
title: Hvordan starte en instans fra en stateless-app
linktitle: Start instans
description: Følg stegene i guiden for å gjøre det mulig å starte en instans fra din stateless app
draft: true
weight: 4
tags: [needsReview]
---

## Før du starter
Denne guiden tar utgangspunkt i at du har satt opp en stateless app, som beskrevet i [guide for oppsett av stateless app](./configure-stateless).

Denne funksjonaliteten er kun tilgjengelig for innloggede brukere. Hvis du har en stateless app konfigurert med
bruk uten innlogging vil stegene under ikke fungere.

## 1. Legg til knapp for instansiering

Legg til en instansieringsknapp i sideoppsettet som brukes til stateless-visningen.

## 2. Send med datafelter for forhåndsutfylling (valgfritt)

### Instansiere med prefill
Knappen sender bare med data til den nye instansen hvis du ber om det. Du velger ut feltene fra datamodellen i stateless-steget ved å legge til `queryParameters` på `InstantiationButton`-komponenten. Hver verdi er et uttrykk. For eksempel:

```json
 {
    "id": "instantiation-button",
    "type": "InstantiationButton",
    "textResourceBindings": {
      "title": "Start instans"
    },
    "queryParameters": {
      "name": ["dataModel", "some.source.field"],
      "id": ["dataModel", "some.other.field"]
    }
  }
```

Når brukeren velger å starte en instans, henter app-frontend ut feltene `some.source.field` og `some.other.field` fra datamodellen i stateless-steget, og sender dem med som `name` og `id` i feltet `prefill` i instansieringskallet. Eksempel på request som går mot backend:

```json
{
    "prefill": {
        "name": "Ola Nordmann",
        "id": "12345"
    },
    ...
}

```

Hvis nøklene i `queryParameters` er stier til felt i datamodellen til innsendingsdelen, for eksempel `"Sender.Name"`, fyller appen ut feltene automatisk når instansen starter. Da trenger du ikke å skrive kode.

Hvis du trenger mer kontroll, kan du bruke verdiene for forhåndsutfylling i metoden `DataCreation` i en klasse som implementerer `IInstantiationProcessor`. Der fyller du ut feltene du trenger i datamodellen til innsendingsdelen av appen. Eksempel:

```c#
using Altinn.App.Core.Features;
using Altinn.App.Models.model; // Navnerommet til datamodellen din, vanligvis Altinn.App.Models.<modellnavn>
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Logic;

public class InstantiationProcessor : IInstantiationProcessor
{
    public async Task DataCreation(Instance instance, object data, Dictionary<string, string>? prefill)
    {
        if (data is MessageV1 skjema && prefill is not null)
        {
            if (prefill.TryGetValue("name", out var name))
            {
                skjema.Sender = name;
            }
            if (prefill.TryGetValue("id", out var id))
            {
                skjema.Reference = id;
            }
        }
        await Task.CompletedTask;
    }
}
```

Husk å registrere klassen i metoden `RegisterCustomAppServices` i `Program.cs`, og legg til `using` for navnerommet til klassen øverst i filen:

```c#
using Altinn.App.Logic;

// ...

services.AddTransient<IInstantiationProcessor, InstantiationProcessor>();
```

#### Instansiere fra en repeterende gruppe

Hvis du i stateless-steget ønsker at brukeren for eksempel velger et element fra en repeterende gruppe og jobber videre på et gitt element, kan du sette opp `InstantiationButton`-komponenten som en del av den repeterende gruppen. Uttrykkene i `queryParameters` henter da verdiene fra raden brukeren starter instansen fra. Du trenger ikke å oppgi indeksen til raden. Eksempel:

```json
 {
    "id": "instantiation-button",
    "type": "InstantiationButton",
    "textResourceBindings": {
      "title": "Start ny instans"
    },
    "queryParameters": {
      "name": ["dataModel", "people.name"],
      "age": ["dataModel", "people.age"]
    }
  }
```
