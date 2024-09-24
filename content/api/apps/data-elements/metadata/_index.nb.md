---
title: Metadata
description: App API for å sette ekstra metadata på dateelementer.
toc: true
tags: [api]
weight: 100
---

## Oversikt

Ved hjelp av feltet `Metadata` på `DataElement` er mulig å sette egne metadata i form av nøkkel-verdi-par på dataelementer.
Hensikten er å kunne ta vare på annen informasjon om dataelementet utover nyttelasten.

Dette feltet er ikke redigerbart via appens API, og er ment satt via egenutviklet C#-kode. 
Sluttbruker kan ikke redigere dette direkte, feltet er i applikasjonsutviklers kontroll.

```csharp
    dataElement.Metadata = newMetadata;
    dataElement = await _dataClient.Update(instance, dataElement);
```