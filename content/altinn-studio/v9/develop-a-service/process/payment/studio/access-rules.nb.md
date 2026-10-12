---
draft: true
hidden: true
tags: [needsReview]
---

> Dette steget foregår i prosessverktøyet. Gå til arbeidsflaten for appen, og velg **Arbeidsflyt** fra toppmenyen.

Da du la til betalingsoppgaven, laget Altinn Studio en tilgangsregel for oppgaven. Regelen gir handlingene `read`, `pay`, `confirm` og `reject` på betalingsoppgaven, men den mangler hvem som skal ha tilgangen. Slik gjør du regelen ferdig:

1. Klikk på betalingsoppgaven i prosessverktøyet.
   - Sjekk at konfigurasjonspanelet på høyre side viser detaljer om oppgaven.
2. Klikk på **Tilganger** i panelet for å åpne seksjonen, og klikk på **Gå til Tilganger**.
   - Siden **Innstillinger** åpner seg med fanen **Tilganger**.
3. Siden viser først fanen **Oversikt**. Velg fanen **Regler**.
4. Finn regelen for betalingsoppgaven. Den viser feilmeldingen «Du må velge minst én rolle eller tilgangspakke.»
5. Velg én eller flere roller eller tilgangspakker under **Hvem skal ha disse rettighetene?**.
   - Når du har valgt minst én rolle eller tilgangspakke, er regelen gyldig, og feilmeldingen forsvinner.
6. Klikk på **Til Arbeidsflyt** øverst på siden for å gå tilbake til prosessverktøyet.

Den som betaler, trenger også handlingen **Skriv** (`write`) på betalingsoppgaven, fordi appen lagrer betalingsinformasjonen med tilgangene til brukeren. Standardpolicyen som følger med appen, gir rollene Privatperson (PRIV) og Daglig leder (DAGL) **Skriv** for hele appen. Hvis du velger andre roller eller tilgangspakker i regelen, legger du også til **Skriv** under **Hvilke rettigheter skal gis?**.

Tjenesteeieren trenger handlingen **Bekreft** (`confirm`) på betalingsoppgaven, slik at appen kan føre prosessen videre når Nets varsler om at betalingen er fullført. Velg derfor også **Tjenesteeier** i regelen for betalingsoppgaven. Du finner valget under **For virksomheter**, i fanen **Andre roller**.
