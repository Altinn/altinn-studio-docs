---
title: Dynamikk
description: Brukerveiledning for å sette opp dynamikk i skjema i Altinn Studio
weight: 10
---

Dynamikk brukes til å styre oppførsel i skjema basert på hva brukeren oppgir av informasjon. Vi bruker _dynamiske uttrykk_
til å styre denne oppførselen.

Følgende innstillinger kan settes ved hjelp av dynamiske uttrykk:
- Om et felt skal vises eller skjules
- Om et felt er påkrevd eller ikke
- Om et felt er skrivebeskyttet eller ikke.

For å sette opp dynamikk i skjema bruker man _uttrykkseditoren_. Denne finner man på "Lage"-siden, i tilknytning til 
alle skjemakomponentene som er lagt inn i skjemaet. 

### Begreper
- **Uttrykk**: En logisk regel som beregnes som _sann/usann_ avhengig av data som brukes.
- **Underuttrykk**: En fullstendig del av et logisk uttrykk. Flere underuttrykk kan settes sammen med bruk av _og/eller_.
- **Operand**: Verdi som skal brukes i uttrykket. Kan være:
  - _Tall_: En fastsatt tallverdi
  - _Tekst_: En fastsatt tesktverdi
  - _Sann/usann_
  - _Komponent_: Verdi som er satt i en skjemakomponent
  - _Datamodell_: Verdi som er satt i et datamodellfelt
  - _Instanskontekst_: Verdi som er hentet fra metadata om tjenesten. 
  - _Ikke satt_: At ingen verdi er satt i et felt. 
- **Operator**: Sier hvordan de to operandene skal sammenlignes. F.eks:
  - Er lik
  - Er ikke lik
  - Er større enn
  - Er mindre enn

### Vis/skjul skjemakomponenter

1. Naviger til Lage-siden og åpne en skjemaside
2. Velg en skjemakomponent som du ønsker at skal dynamisk vises/skjules.
3. Velg "Dynamikk"-seksjonen i konfigurasjonsflaten til komponenten.
4. Trykk på "Lag en ny logikkregel"
5. Velg hva som skal skje med komponenten (f.eks. skjul)
6. Legg til et logisk uttrykk ved å trykke på "Legg til underuttrykk"
7. Klikk på endre for å redigere uttrykket
8. 