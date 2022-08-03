---
title: Tilpasse visninger av steg
linktitle: Tilpasse visninger
description: Hvordan tilpasse visninger i forskjellige steg av en prosess.
toc: true
---

En applikasjon vil ha en prosess som brukeren av applikasjonen vil følge. 
Avhengig av hvilken type steg brukeren er i, vil forskjellige ting vises. 
Denne siden vil forklare hvordan visningen til de forskjellige stegene kan tilpasses.

## Data (tilsvarer utfyllingssteg i Altinn II)
I denne prosess-task-typen vises skjema som kan fylles ut.  
Skjema kan redigeres ved bruk av [UI editoren](../../../../getting-started/navigation/designer/ui-editor) eller ved å endre `FormLayout.json` direkte.

## Bekreftelse (Confirmation)
I denne prosess-task-typen vises noen standard-tekster, og bruker kan velge å *bekrefte* for å gå videre.

Tekstene kan overstyres, ved at man legger inn tekstnøkkel som hører til hver tekst i språkfilene for appen. Info
om hvordan dette gjøres finner du [her](../../../ux/texts). Se under for oversikt over de forskjellige tekstnøklene som kan
overstyres.

![Bekreftelses-visningen](confirm-step.png "Tekster som kan endres/overstyres i bekreftelses-visningen")

### Overstyre tekster

| Tekst nr. (se bilde over) | Tekstnøkkel         |
| ------------------------- | ------------------- |
| 1                         | confirm.title       |
| 2                         | confirm.sender      |
| 3                         | confirm.body        |
| 4                         | confirm.answers     |
| 5                         | confirm.attachments |
| 6                         | confirm.button_text |


Eksempel på overstyrte tekster i filen `resources.nb.json`:

```json
{
  "id": "confirm.title",
  "value": "Vennligst bekreft at du ønsker å sende inn"
},
{
  "id": "confirm.body",
  "value": "Du må kun trykke send inn om du er helt sikker på at du vil sende inn. <br/><br/>I det du trykker send inn kan du ikke gjøre endringer."
},
{
  "id": "confirm.attachments",
  "value": "Dokumenter med opplysninger"
},
{
  "id": "confirm.button_text",
  "value": "Lagre og fortsett"
}
```

Merk at i eksempelet over har vi brukt html-taggen `<br/>` for å lage linjeskift.
For lenke og utheving, [benytt markdown](../../../ux/texts#formatering-av-tekster).

Dette resulterer i følgende visning:

![Bekreftelses-visningen](confirm-step-custom.png "Overstyrte tekster på bekreftelses-visningen")

## Tilbakemelding (Feedback)
Dette er et prosesssteg hvor applikasjonseier vil sjekke utfylte data for å generere en tilbakemelding før alle data kan arkiveres.

Tekstene på siden kan overstyres ved at man legger inn tekstnøkler som hører til hver tekst i språkfilene for appen. Info om hvordan dette gjøres finner du [her](../../../ux/texts). Se under for oversikt over de forskjellige tekstnøklene som kan overstyres.

![Tilbakemelding-visningen](feedback-default.png "Tekster som kan endres/overstyres i tilbakemelding-visningen")

### Overstyre tekster

| Tekst nr. (se bilde over) | Tekstnøkkel       |
| ------------------------- | ----------------- |
| 1                         | feedback.title    |
| 2                         | feedback.body     |

Eksempel på overstyrte tekster i filen `resources.nb.json`:

```json
{
  "id": "feedback.title",
  "value": "Vent på at tjenesteeier sjekker data"
},
{
  "id": "feedback.body",
  "value": "Når tjenesteier har sjekket at alle data er godkjent vil du bli automatisk sendt videre til siste steg i prosessen."
}
```
