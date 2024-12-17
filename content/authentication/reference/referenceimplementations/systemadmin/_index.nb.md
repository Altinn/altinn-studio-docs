---
title: Systemadmin - Referanseimplementasjoner
linktitle: Referansedokumentasjon
description: Referanseimplementasjoner som bruker Altinn Autentisering-funksjonalitet
weight: 5
---

Systemadmin-applikasjonen demonstrerer hvordan en systemleverandør kan registrere og oppdatere et system i Altinn Systemregister.

For å legge til og oppdatere systemer, kreves omfanget **altinn:authentication/systemregister.write**.

Applikasjonen bruker en Maskinporten-token som byttes mot en Altinn-token.

Kallet gjøres fra [Systemregistertjenesten](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemAdmin/Services/SystemRegister.cs) i denne applikasjonen.

Se .NET-prosjektet [her](https://github.com/TheTechArch/altinn-systemuser/tree/main/src/SystemAdmin).
