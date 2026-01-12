---
title: Plassholdere i meldingsmaler
description: "Plassholdere lar deg personalisere varslinger ved å erstatte variabler med informasjon om mottaker."
linktitle: Plassholdere
tags: [varslinger, meldingsmaler, personalisering]
weight: 35
---

Plassholdere er variabler som starter og slutter med dollartegn (`$`). Du skriver dem inn i meldingsmalen din, og Altinn erstatter dem med informasjon om mottakeren når varslet sendes.

Eksempel:
```
Hei $recipientName$, du har mottatt en melding.
```

Dette blir til:
```
Hei Ola Nordmann, du har mottatt en melding.
```

## Tilgjengelige plassholdere

| Plassholder | Hva det erstattes med | Når kan det brukes |
|-----------|----------------------|-------------------|
| `$recipientName$` | Varslingens mottakers navn (organisasjonsnavn eller personnavn) | Til virksomehter eller privatpersoner. Ikke når varsel sendes direkte til e-postadresse eller telefonnummer |
| `$recipientNumber$` | Organisasjonsnummer hvis mottaker er en organisasjon. Tomt hvis mottaker er en privatperson | Til virksomheter. Ikke når varsel sendes direkte til e-postadresse eller telefonnummer |

## Hvor kan du bruke plassholdere?

Du kan bruke plassholdere i:
- E-postemne 
- E-postinnhold 
- SMS-innhold

## Begrensninger

Når du sender varsel direkte til e-postadresse eller telefonnummer (uten fødselsnummer eller organisasjonsnummer), kan du ikke bruke plassholdere. Altinn kan ikke slå opp navn eller organisasjonsnummer ved varsel direkte til e-post eller sms. 

## Eksempler

### E-post

```json
{
  "emailSettings": {
    "subject": "Viktig informasjon for $recipientName$",
    "body": "Hei $recipientName$,\n\nVi har en viktig oppdatering angående din ID: $recipientNumber$.\n\nVennligst se gjennom detaljene så snart som mulig."
  }
}
```

### SMS

```json
{
  "smsSettings": {
    "body": "Hei $recipientName$. Du har mottatt en melding. Logg inn i Altinn for å se meldingen."
  }
}
```

## Tips

- Test meldingsmalene før du sender til mange mottakere
- Hvis `$recipientNumber$` er tom (for privatpersoner), kan teksten bli rar. Vurder å unngå direkte referanse til nummeret
