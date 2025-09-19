---
hidden: true
---


>Oppsettet i denne seksjonen gjøres fra Prosess-siden i appens arbeidsflate. Naviger dit ved å trykke på "Prosess" i toppmenyen
>fra appens arbeidsflate.

- Legg til en betalingsoppgave i prosessen ved å velge betalingsoppgave fra menyen til venstre i prosess-editoren 
  og dra den inn i prosessen. Følgende konfigurasjoner oppdateres automatisk:
    - Det legges til 2 datatyper knyttet til betaling (en for data om betaling, en for betalingskvittering).
    - Det legges til en ny sidegruppe tilknyttet betaling, med ferdig en ferdig oppsatt side.
    - Det legges til en ny regel for tilgangsstyring knyttet til betalingsoppgaven - denne må konfigureres senere.
- Legg til en Gateway etter betalingssteget
  - Gatewayen bør ha 2 sekvensflyter ut:
    - En som peker videre i prosessen.
    - En som peker tilbake til forrige oppgave i prosessen (før betaling).
  - Legg til regler som bestemmer når sekvensflytene som skal brukes:
    - Klikk på sekvensflyten som går _videre_ i prosessen.
      - I panelet til høyre, klikk på "Legg til en ny logikkregel". Denne settes da opp med aksjonen "Avvise" (`reject`)
        som utgangspunkt. 
      - Klikk på "Endre" og endre fra "Avvise" til "Bekreft". Klikk på "Lagre og lukk" for å lagre regelen.
    - Klikk på sekvensflyten som går _tilbake_ i prosessen. Gjenta stegene over, men denne gangen trenger du ikke å endre
      det oppsettet som legges til - aksjon skal være "Avvise".

    
![Eksempel på en prosess med utfylling etterfulgt av betaling](/altinn-studio/guides/development/payment/process-data-payment.png "Eksempel på en prosess med utfylling etterfulgt av betaling")