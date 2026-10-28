---
title: Register
linktitle: Register
description: Applikasjonsarkitekturen og hoved-API-ene i Altinn Register.
weight: 2
toc: true
---

Register forvalter parter og representasjonsforhold. Skissen viser de viktigste API-flatene, domenekjernen, integrasjonene og persistenslaget.

Klikk på en boks for å åpne den tilhørende filen eller mappen på GitHub.

<object data="register-application.svg" type="image/svg+xml" aria-label="Applikasjonsarkitektur for Register med lenker til kildekoden" style="width:100%;height:auto;min-height:680px;display:block;"></object>

API-ene for bestemte konsumenter bygger på den interne Party API-en. Importintegrasjonene oppdaterer registerdata, mens publiserte kontrakter og meldinger gjør dataene tilgjengelige for andre komponenter.

[Se arkitekturmønstrene som Register bruker for forespørsler, transaksjoner, datastrømmer og bakgrunnsarbeid.](./patterns/)

[Se Registers databasemodell og bruk av PostgreSQL og Azure Storage.](./persistence/)
