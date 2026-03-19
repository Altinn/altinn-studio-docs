---
draft: true
title: App-infrastrukturtilganger
linktitle: Apps
description: Slik bestiller du tilganger til app-logger og hemmeligheter.
tags: [needsReview]
toc: true

aliases:
- /nb/altinn-studio/guides/administration/access-management/apps/
---

Tjenesteeiere kan bestille følgende tilganger for sine ressurser i miljøene TT02 og produksjon:

- Test Developer
- Test Operations
- Prod Developer
- Prod Operations

## Roller og tilganger

### Test Developer

Gir tilgang til å lese logger og hemmeligheter i TT02-miljøet.

### Test Operations

Gir tilgang til å administrere hemmeligheter i TT02-miljøet.

### Prod Developer

Gir tilgang til å lese logger og hemmeligheter i produksjonsmiljøet.

### Prod Operations

Gir tilgang til å administrere hemmeligheter i produksjonsmiljøet.

## Bestille tilganger

Autoriserte bestillere hos tjenesteeier må bestille tilgang til disse rollene på [Samarbeidsportalen](https://samarbeid.digdir.no/) (innlogget område).

Portalen beskriver også hvordan du oppretter en ny bruker hvis du ikke har en fra før.

For å opprette en ny sak for å søke om tilgang:

1. Klikk først på fanen **Support** og så **Ny sak** i menyen til venstre.
2. På første side av skjemaet, velg **Bestilling** og **Tilganger**.
3. Velg så **Altinn 3.0 - Apps** på andre side.
4. Til slutt fyller du ut kontaktinformasjon for brukeren, samt hvilke roller hen skal ha tilgang til.
{.floating-bullet-numbers}

Når rollene har blitt tildelt, kan du få tilgang til logger eller hemmeligheter via
[Microsoft Azure Portal](https://portal.azure.com).

Du logger inn med samme konto som du bruker til Selvbetjeningsportalen:

- `brukernavn@ai-dev.no` (de fleste)
- `brukernavn@ai-dev.brreg.no` (noen få bruker fortsatt denne)
