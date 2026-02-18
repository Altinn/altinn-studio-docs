---
title: Hvordan starte en instans fra en stateless-app
linktitle: Start instans
description: Følg stegene i guiden for å gjøre det mulig å starte en instans fra din stateless app
draft: true
weight: 4
---

## Før du starter
Denne guiden tar utgangspunkt i at du har satt opp en stateless app, som beskrevet i [guide for oppsett av stateless app](./configure-stateless.nb.md).

Denne funksjonaliteten er kun tilgjengelig for innloggede brukere. Hvis du har en stateless app konfigurert med
bruk uten innlogging vil stegene under ikke fungere.

## 1. Legg til knapp for instansiering

Legg til en instansieringsknapp i sideoppsettet som brukes til stateless-visningen.

## 2. Send med datafelter for forhåndsutfylling (valgfritt)

### Instansiere med prefill
Standard oppførsel for denne knappen er å sende inn hele datamodellen som brukeren har brukt, som en del av instansieringen under feltet `prefill`. Hvis du ønsker å velge ut deler av datamodellen som er brukt i det stateless-steget, kan du også gjøre det ved å legge til `mapping` på `InstantiationButton`-komponenten. For eksempel:

```json
 {
    "id": "instantiation-button",
    "type": "InstantiationButton",
    "textResourceBindings": {
      "title": "Start instans"
    },
    "mapping": {
      "some.source.field": "name",
      "some.other.field": "id"
    }
  }
```

Når brukeren velger å starte en instans, henter app-frontend ut feltene `some.source.field` og `some.other.field` fra datamodellen i det stateless-steget, og mapper disse mot feltene `name` og `id` som sendes med i instansieringskallet for appen. Eksempel på request som går mot backend, som du kan mappe over datamodellen du bruker i innsendingsdelen av appen:

```json
{
    "prefill": {
        "name": "Ola Nordmann",
        "id": "12345"
    },
    ...
}

```

Denne prefill-verdien kan du bruke i metoden `DataCreation` i `InstantiationHandler.cs` for å mappe mot feltene du trenger som en del av innsendingsdelen av appen under instansieringen. Eksempel:

```c#
public async Task DataCreation(Instance instance, object data, Dictionary<string, string> prefill)
  {
      if (data.GetType() == typeof(MessageV1))
      {
          string name = "";
          string id = "";
          if (prefill.ContainsKey("name")) {
              name = prefill["name"];
          }
          if (prefill.ContainsKey("id")) {
              id = prefill["id"];
          }
          MessageV1 skjema = (MessageV1)data;
          skjema.Sender = name;
          skjema.Reference = id;
      }            
      await Task.CompletedTask;
  }
```

#### Instansiere fra en repeterende gruppe

Hvis du i det stateless-steget ønsker at brukeren for eksempel velger et element fra en repeterende gruppe og jobber videre på et gitt element, kan du sette opp `InstantiationButton`-komponenten som en del av den repeterende gruppen. Her kan du konfigurere instansieringsknappen til å mappe felter fra den gitte indeksen brukeren velger å starte en instans fra. Dette krever at du setter opp mapping-feltene med en indeks på den aktuelle gruppen. Eksempel:

```json
 {
    "id": "instantiation-button",
    "type": "InstantiationButton",
    "textResourceBindings": {
      "title": "Start ny instans"
    },
    "mapping": {
      "people[{0}].name": "name",
      "people[{0}].age": "age"
    }
  }
```

I den repeterende gruppen blir `{0}` erstattet med den aktuelle indeksen på gruppen brukeren ønsker å starte fra.