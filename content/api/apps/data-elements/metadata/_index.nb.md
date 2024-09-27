---
title: Metadata
description: App API for å sette ekstra metadata på dateelementer.
toc: true
tags: [api]
weight: 100
---

## Oversikt

Det er mulig å sette egne metadata i form av nøkkel-verdi-par på dataelementer ved hjelp av et felt kalt `Metadata`.
Hensikten er å kunne ta vare på annen informasjon om dataelementet utover nyttelasten.

Dette feltet er ikke redigerbart via appens API, og er ment satt via egenutviklet C#-kode. 
Sluttbruker kan ikke redigere dette direkte, feltet er i applikasjonsutviklers kontroll.

```csharp
    var newMetadata = new List<KeyValueEntry>
    {
        new() { Key = "MyKey", Value = "MyValue" },
        new() { Key = "AnotherKey", Value = "AnotherValue" }
    };

    dataElement.Metadata = newMetadata;
    dataElement = await _dataClient.Update(instance, dataElement);
```