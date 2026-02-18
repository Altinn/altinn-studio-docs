---
title: Hvordan forhåndsutfylle og/eller prosessere data
linktitle: Dataprosessering
description: Følg stegene i denne guiden for å forhåndsutfylle data og/eller gjøre beregninger og annen dataprosessering for en stateless app.
weight: 3
draft: true
---

## Før du starter

## 1. Implementer dataprosessering

Eksempel på en kalkulering som populerer datamodellen nevnt i eksempelet over:

```c#
public async Task<bool> ProcessDataRead(Instance instance, Guid? dataId, object data)
{
    if (data.GetType() == typeof(StatelessV1))
    {
        StatelessV1 form = (StatelessV1) data;
        // Her kan du gjøre det du ønsker, for eksempel et API-kall
        // hvis tjenesten skal oppføre seg som en innsynstjeneste.
        form.Fornavn = "Test";
        form.Etternavn = "Testesten";
        return true
    }
    return false;
}
```