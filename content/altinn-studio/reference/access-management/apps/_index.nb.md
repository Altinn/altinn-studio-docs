---
title: Apps infrastruktur tilganger
linktitle: Apps
description: Roller for tilganger til app logger og hemmeligheter.
toc: true
weight: 200
---

## Roller
Det er definert to forskjellige typer roller for tilgang i driftsmiljøene i Altinn Apps.

Disse rollene er videre delt opp i tilgang til test (TT02) og produksjon (prod).
En bruker kan tildeles en eller flere roller.

### Developer
Rollen Developer gir tilgang til
[Application Insights](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)
der applikasjonslogger samles for tjenesteeier sine applikasjoner i miljøet.

### Operations
Rollen Operations gir tilgang til [Key Vault](https://learn.microsoft.com/nb-NO/azure/key-vault/general/basic-concepts)
for å laste opp hemmeligheter som sertifikater, passord og api-nøkler.


## Bestilling
Se [guide for å bestille tilganger](../../../guides/access-management/apps/).
