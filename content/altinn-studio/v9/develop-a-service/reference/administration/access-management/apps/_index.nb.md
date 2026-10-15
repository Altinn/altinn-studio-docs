---
draft: true
title: App-infrastrukturtilganger
linktitle: Apps
description: Oversikt over rollene som gir tilgang til app-logger og hemmeligheter.
tags: [needsReview]
toc: true
---

Som tjenesteeier kan du bestille fire roller for ressursene dine. To roller gjelder testmiljøet TT02, og to gjelder produksjonsmiljøet. Altinn-plattformen definerer rollene i Azure. De gir tilgang til telemetrien og hemmelighetene til appene dine.

## Roller og tilganger

### Test Developer

Gir tilgang til telemetrien til appene dine i TT02 (logger, sporing og målinger). Telemetrien ligger i Application Insights.

### Test Operations

Gir tilgang til å laste opp hemmeligheter i TT02, for eksempel sertifikater, passord og API-nøkler. Hemmelighetene ligger i Key Vault.

### Prod Developer

Gir tilgang til telemetrien til appene dine i produksjon (logger, sporing og målinger). Telemetrien ligger i Application Insights.

### Prod Operations

Gir tilgang til å laste opp hemmeligheter i produksjon, for eksempel sertifikater, passord og API-nøkler. Hemmelighetene ligger i Key Vault.

## Slik bestiller du tilgang

[Se hvordan du bestiller tilgang til rollene]({{< relref "/altinn-studio/v9/manage-a-service/access-management/apps" >}}).
