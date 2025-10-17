---
title: Altinn 2 Portalvisning
linktitle: Altinn 2 Portal
description: Visning av Altinn 3 Melding i Altinn 2 Portal
tags: []
toc: false
weight: 40
---

For å raskt ha på plass en GUI-løsning for sluttbrukere uavhengig av leveransen av Arbeidsflate, utvides dagens Altinn 2 portal til å kunne hente ut og vise Altinn 3 Meldinger.
Dette muliggjør en tilsvarende brukeropplevelse for sluttbrukere som ikke mottar Meldinger via sluttbrukersystem, ved at de får tilgang til meldingene sine i samme portal og visning som før.

Visningen er i stor grad lik som eksisterende visning av Altinn 2 Meldinger, og alle elementer blir vist i samme liste, men med enkelte differanser.

- Ingen "Arkiver" knapp
- Annerledes oppførsel med sletting/papirkurv-funksjonalitet.

Løsningen er i produksjon og siste større endringer var i Altinn 2 sin 25.4 release, men vi utelukker ikke flere (mindre) endringer.

## Tiltak for gradvis økning av last

For å redusere unødvendig last vil Altinn 2 portal kun kalle API-endepunktene til Altinn 3 Melding dersom en gitt bruker/virksomhet har data i Altinn 3 Melding.
Dette håndteres ved at det settes et flagg per person/virksomhet i Altinn 2 databasen når det opprette Meldinger i Altinn 3 Melding.

Dette er en tilsvarende løsning som brukt for Skjema/innsendingstjenester og Altinn 3 Apps.

Dette medfører en gradvis økning av trafikken på tvers, basert på om det er data tilgjengelig fra enten nye tjenester, eller migrerte Meldinger.

## Teknisk implementasjon

- Det benyttes et dedikert endepunkt i Altinn 3 Melding sine API som tilrettelegger for behovene til Altinn 2 Portal; [Legacy](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Controllers/LegacyCorrespondenceController.cs).
- Ny visningskomponent i Altinn 2 Portal for henting av A3 melding.
- Nytt flagg i Altinn 2 sin database per party: **PartyHasAltinn3Messages** som styrer om Portalen skal kalle Altinn 3 Melding ved søk.
- Utvidelse av SBLBridge for å sette **PartyHasAltinn3Messages**
- Altinn 3 Melding kaller SBLBridge for å sette **PartyHasAltinn3Messages** når en Melding opprettes for en bruker for første gang. (inkludert for migrerte Meldinger)

{{<children />}}
