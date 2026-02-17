---
draft: true
hidden: true
tags: [needsReview, needsTranslation]
---


>Du gjør oppsettet i denne seksjonen fra **Prosess**-siden i appens arbeidsflate. Naviger dit ved å klikke på **Prosess** i toppmenyen fra appens arbeidsflate.

### 1. Legg til betalingsoppgave

Legg til en betalingsoppgave i prosessen ved å velge betalingsoppgave fra menyen til venstre i prosess-editoren og dra den inn i prosessen. 

Systemet oppdaterer følgende konfigurasjoner automatisk:
- Systemet legger til to datatyper knyttet til betaling (én for data om betaling, én for betalingskvittering).
- Systemet legger til en ny sidegruppe tilknyttet betaling, med en ferdig oppsatt side.
- Systemet legger til en ny regel for tilgangsstyring knyttet til betalingsoppgaven – du må konfigurere denne senere.

### 2. Legg til gateway etter betalingssteget

Gatewayen bør ha to sekvensflyter ut:
- Én som peker videre i prosessen.
- Én som peker tilbake til forrige oppgave i prosessen (før betaling).

### 3. Sett opp regler for sekvensflytene

**For sekvensflyten som går videre:**
1. Klikk på sekvensflyten som går _videre_ i prosessen.
2. I panelet til høyre klikker du på **Legg til en ny logikkregel**. Systemet setter da denne opp med aksjonen **Avvise** (`reject`) som utgangspunkt.
3. Klikk på **Endre** og endre fra **Avvise** til **Bekreft**. 
4. Klikk på **Lagre og lukk** for å lagre regelen.

**For sekvensflyten som går tilbake:**
1. Klikk på sekvensflyten som går _tilbake_ i prosessen. 
2. Gjenta stegene over, men denne gangen trenger du ikke å endre det oppsettet som legges til – aksjon skal være **Avvise**.

    
![Eksempel på en prosess med utfylling etterfulgt av betaling](./process-data-payment.png "Eksempel på en prosess med utfylling etterfulgt av betaling")
