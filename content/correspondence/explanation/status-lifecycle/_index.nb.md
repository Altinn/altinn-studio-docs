---
title: Meldings Livssyklus
linktitle: Meldings Livssyklus
description: Altinn 3 Meldings livssyklus og tilstander oversikt.
tags: []
toc: true
weight: 14
---

## Oversikt

En melding i Altinn 3 går gjennom flere statustilstander i løpet av sin livssyklus. Flyten er delt inn i to hovedfaser:

## To Hovedfaser

### 1. [Livssyklus Før Publisering](pre-published/)
Reisen fra meldingsopprettelse til publisering, inkludert:
- Initialisering og validering
- Vedleggsbehandling og virusskanning
- Publiseringsprosess og feilhåndtering
- Statustilstander: Initialisert, Reservert, Klar for publisering, Publisert, Feilet

### 2. [Livssyklus Etter Publisering](post-published/)
Mottaker interaksjoner etter publisering, inkludert:
- Henting av meldingsdetaljer
- Lesing og bekreftelsesprosesser
- Vedleggsnedlastinger
- Sletting og arkivering
- Statustilstander: Hentet, Lest, Vedlegg Lastet Ned, Bekreftet, Slettet av Mottaker, Slettet av Altinn

## Komplett Statusflyt Sammendrag

```
Initialisering → Validering → [Vedleggsbehandling] → Publisering → Mottaker Interaksjoner → Sletting
```

## Nøkkelpunkter

- **System-Styrt Fase**: Flyt før publisering håndterer validering, sikkerhet og levering
- **Mottaker-Styrt Fase**: Flyt etter publisering sporer mottaker interaksjoner og handlinger
- **Feilhåndtering**: Omfattende feilhåndtering i hver fase med passende HTTP statuskoder
- **Revisjons-spor**: Komplett sporing av alle statusendringer og tidsstempler
- **API Fleksibilitet**: Forskjellige APIer støtter forskjellig funksjonalitet (hoved API vs legacy API)

## Navigasjon

- **[Livssyklus Før Publisering](pre-published/)** - Lær om meldingsopprettelse, validering og publisering
- **[Livssyklus Etter Publisering](post-published/)** - Forstå mottaker interaksjoner og statushåndtering

Hver fase har sin egen detaljerte dokumentasjon med diagrammer, statusforklaringer og API-spesifikasjoner. 