---
draft: true
hidden: true
tags: [needsReview]
---


> Du gjør oppsettet i denne seksjonen fra **Arbeidsflyt**-siden i arbeidsflaten for appen. Gå dit ved å klikke på **Arbeidsflyt** i toppmenyen.

### 1. Legge til en betalingsoppgave

Legg til en betalingsoppgave i prosessen ved å velge betalingsoppgave fra menyen til venstre i prosessverktøyet og dra den inn i prosessen.

Altinn Studio setter da opp dette automatisk:

- Altinn Studio legger til to datatyper knyttet til betaling (én for data om betalingen, én for betalingskvitteringen).
- Altinn Studio legger til sider for betalingsoppgaven, med en ferdig oppsatt side.
- Altinn Studio legger til en ny regel for tilgangsstyring knyttet til betalingsoppgaven. Du må gjøre ferdig denne regelen senere.

### 2. Legge til en gateway etter betalingssteget

Gatewayen bør ha to sekvensflyter ut:

- Én som peker videre i prosessen.
- Én som peker tilbake til forrige oppgave i prosessen (før betaling).

### 3. Sette opp regler for sekvensflytene

**For sekvensflyten som går videre:**

1. Klikk på sekvensflyten som går _videre_ i prosessen.
2. I panelet til høyre klikker du på **Lag en ny logikkregel**. Altinn Studio setter da opp regelen med handlingen **Avvise** (`reject`) som utgangspunkt.
3. Klikk på **Endre**, og endre handlingen fra **Avvise** til **Bekrefte** (`confirm`).
4. Klikk på **Lagre og lukk** for å lagre regelen.

**For sekvensflyten som går tilbake:**

1. Klikk på sekvensflyten som går _tilbake_ i prosessen.
2. Gjenta stegene over, men denne gangen beholder du regelen slik Altinn Studio setter den opp. Handlingen skal være **Avvise**.


![Eksempel på en prosess med utfylling etterfulgt av betaling](./process-data-payment.png "Eksempel på en prosess med utfylling etterfulgt av betaling")
