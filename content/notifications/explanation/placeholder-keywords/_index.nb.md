---
title: Plassholdernøkkelord i meldingsmaler
description: "Plassholdernøkkelord lar deg personalisere varslinger ved å erstatte spesielle koder med informasjon om mottaker. Denne artikkelen forklarer hvilke nøkkelord som er tilgjengelige og hvordan de brukes."
linktitle: Plassholdernøkkelord
tags: [varslinger, meldingsmaler, personalisering]
weight: 35
---

Plassholdernøkkelord er spesielle koder du kan bruke i meldingsmalene dine for å personalisere varslinger. Når varslet sendes, erstatter Altinn automatisk disse kodene med faktisk informasjon om mottakeren.

## Hva er plassholdernøkkelord?

Plassholdernøkkelord er tokens som starter og slutter med dollartegn (`$`). Du skriver dem inn i meldingsmalen din, og Altinn bytter dem ut med riktig informasjon når varslet sendes.

For eksempel kan du skrive:
```
Hei $recipientName$, du har mottatt en melding.
```

Når varslet sendes, blir dette til:
```
Hei Ola Nordmann, du har mottatt en melding.
```

## Tilgjengelige plassholdernøkkelord

Du kan bruke følgende plassholdernøkkelord i meldingsmalene dine:

| Nøkkelord | Hva det erstattes med | Når kan det brukes |
|-----------|----------------------|-------------------|
| `$recipientName$` | Varslingens mottakers navn (organisasjonsnavn eller personnavn) | Ikke når varsel sendes direkte til e-postadresse eller telefonnummer |
| `$recipientNumber$` | Organisasjonsnummer hvis mottaker er en organisasjon. Tomt hvis mottaker er en privatperson | Ikke når varsel sendes direkte til e-postadresse eller telefonnummer |

## Hvor kan du bruke plassholdernøkkelord?

Du kan bruke plassholdernøkkelord i alle tekstfeltene i meldingsmalen:

- E-postemne 
- E-postinnhold 
- SMS-innhold

## Begrensninger

Noen plassholdernøkkelord har begrensninger:

### Varsler sendt direkte til e-post eller telefonnummer

Hvis du sender varsel direkte til en e-postadresse eller telefonnummer (uten å oppgi fødselsnummer eller organisasjonsnummer), kan du ikke bruke:

- `$recipientName$` – fordi Altinn ikke kan slå opp navnet basert på e-postadresse eller telefonnummer
- `$recipientNumber$` – fordi Altinn ikke kan slå opp organisasjonsnummeret basert på e-postadresse eller telefonnummer


## Eksempler

### Eksempel 1: E-post med personalisering

```json
{
  "emailSettings": {
    "subject": "Viktig informasjon for $recipientName$",
    "body": "Hei $recipientName$,\n\nVi har en viktig oppdatering angående din ID: $recipientNumber$.\n\nVennligst se gjennom detaljene så snart som mulig."
  }
}
```

### Eksempel 2: SMS med personalisering

```json
{
  "smsSettings": {
    "body": "Hei $recipientName$. Du har mottatt en melding. Logg inn i Altinn for å se meldingen."
  }
}
```

## Tips for bruk

- **Test meldingsmalene dine**: Sjekk at plassholdernøkkelordene fungerer som forventet før du sender varsler til mange mottakere.
- **Vurder tomme verdier**: Hvis `$recipientNumber$` er tom (for privatpersoner), kan teksten din bli litt rar. Vurder å bruke betinget tekst eller unngå å referere direkte til nummeret.
- **Bruk riktig nøkkelord**: Husk at `$recipientName$` og `$recipientNumber$` ikke fungerer når du sender direkte til e-postadresse eller telefonnummer.
