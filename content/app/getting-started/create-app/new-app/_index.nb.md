---
title: Opprette en ny tjeneste
linktitle: Opprette ny tjeneste
description: Slik oppretter man en ny tjeneste (applikasjon) i Altinn Studio.
weight: 1
---

Altinn Studio brukes til å opprette applikasjoner (apps).
En app kan være alt fra enkle skjemaer til større applikasjoner med både API-er og UI.

Du lager en ny app fra [Altinn Studio dashboardet](https://altinn.studio/dashboard) (hvis du ikke ser dashboardet, klikk på logoen i øverste venstre hjørne).

![Dashboardet i Altinn Studio](https://altinncdn.no/studio/docs/images/dashboard_new-app-button.png "Altinn Studio Dashboard")

1. Klikk på **Opprett ny applikasjon** i det øvre høyre hjørnet av dashboardet.
2. Velg **eier** av appen i nedtrekksmenyen.
    Dette kan være en organisasjon du har tilgang til eller ditt eget brukernavn. Valget er deaktivert hvis din bruker er eneste alternativ.
3. Legg inn **navnet** på appen.
    Dette navnet er en ID brukt til å identifisere appen og brukes også som navn på repository, i URL-er og API-er.  
    **Navnet (ID) på applikasjonen...**
   - bør være kort og beskrivende (for eksempel "sykemelding" eller "lokalvalg-2024")
   - kan kun inneholde små bokstaver, tall og bindestrek (-)
   - må begynne med en bokstav
   - må ende med en bokstav eller et tall  
   - _kan ikke endres etter at appen er satt i produksjon._
4. Opprett appen ved å klikke "**Opprett applikasjon**".

![Ny app popup](https://altinncdn.no/studio/docs/images/dashboard_new-app.png "Opprett applikasjon")

Når appen er opprettet vil du videresendes til en oversiktsside.

![Oversikt app](https://altinncdn.no/studio/docs/images/app-development_overview.png "Oversikt app")
