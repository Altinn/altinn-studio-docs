---
title: Referanseimplementasjon Systembruker API
linktitle: Systembruker API
description: Referanseimplementasjoner som bruker Altinn Autentisering-funksjonalitet
weight: 5
---

Referanseimplementasjonen for Systembruker API demonstrerer hvordan en tjenesteeier kan bruke Altinn Autorisasjon for å autorisere tilgang til ulike ressurser i ressursregisteret.

- [LogistikkAPI](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemUserApi/SystemUserApi/Controllers/LogisticsController.cs) sjekker for lesetilgang til ressursen **ttd_systembruker-logistikk-demo**
- [LønnAPI](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemUserApi/SystemUserApi/Controllers/SalaryController.cs) sjekker for lesetilgang til ressursen **ttd_systembruker-salary**

Systembruker API bruker Altinn PDP for å autorisere tilgang for systembrukeren. Den henter informasjon om systembrukeren fra den autentiserte identiteten og bruker den informasjonen til å kalle Altinn autorisasjon.
