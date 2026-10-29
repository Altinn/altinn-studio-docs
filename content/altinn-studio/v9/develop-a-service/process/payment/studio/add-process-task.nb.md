---
hidden: true
tags: [Reviewed]
---


>Du gjør oppsettet i denne delen på siden **Arbeidsflyt** i Altinn Studio. Klikk på **Arbeidsflyt** i toppmenyen for å komme dit.

### 1. Legge til en betalingsoppgave

Legg til en betalingsoppgave ved å dra **Lag betalingsoppgave** fra menyen til venstre inn i arbeidsflyten.

Altinn Studio legger da automatisk til

- to datatyper for betaling (én for betalingsdata og én for betalingskvitteringen)
- sider for betalingsoppgaven, med én ferdig oppsatt side
- en regel for tilgangsstyring for betalingsoppgaven, som du setter opp i steget «Gi tilgang til den som skal betale og tjenesteeieren»

### 2. Legge til en gateway etter betalingsoppgaven

Gatewayen skal ha to piler (sekvensflyter) ut:

- Én som peker videre i arbeidsflyten.
- Én som peker tilbake til forrige oppgave i arbeidsflyten (før betaling).

### 3. Sette opp regler for pilene ut av gatewayen

**For pilen som går videre:**

1. Klikk på pilen som går _videre_ i arbeidsflyten.
2. I panelet til høyre klikker du på **Lag en ny logikkregel**. Regelen får handlingen **Avvise** (`reject`) som utgangspunkt.
3. Klikk på **Endre**, og bytt handlingen fra **Avvise** til **Bekrefte**.
4. Klikk på **Lagre og lukk** for å lagre regelen.

**For pilen som går tilbake:**

1. Klikk på pilen som går _tilbake_ i arbeidsflyten.
2. Gjenta stegene over, men ikke endre handlingen. Den skal være **Avvise**.

![Arbeidsflyt med oppgavene Utfylling og Betaling, og en gateway som enten går videre til slutten eller tilbake til Utfylling](/nb/altinn-studio/v9/develop-a-service/process/payment/process-data-payment.png "Arbeidsflyt med betaling")flyt med betaling")
