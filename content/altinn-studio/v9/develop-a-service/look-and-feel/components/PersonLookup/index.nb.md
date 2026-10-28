---
title: PersonLookup
description: Slik lar du brukerne slå opp en person i Folkeregisteret.
draft: true
toc: true
tags: [needsReview]
---

Med komponenten **Finn person** (`PersonLookup`) kan brukerne slå opp en person i Folkeregisteret med fødselsnummer eller D-nummer og etternavn. Appen lagrer opplysningene om personen i datamodellen.

## Slik fungerer komponenten

- Brukeren skriver inn fødselsnummer eller D-nummer og etternavn, og klikker på **Hent opplysninger** eller trykker Enter.
- Før søket kontrollerer komponenten at fødselsnummeret er gyldig og at etternavnet ikke er tomt.
- Finner appen personen, lagrer den opplysningene i datamodellen. Komponenten låser feltene og viser teksten «Fra folkeregisteret». Feltet for etternavn heter nå **Navn** og viser navnet på personen. Knappen endrer seg til **Fjern**.
- Med **Fjern** tømmer brukeren feltene og kan søke på nytt.

Har feltet for fødselsnummer allerede en verdi, for eksempel fra forhåndsutfylling, viser komponenten den som et ferdig oppslag.

## Når oppslaget feiler

| Situasjon | Melding til brukeren |
|---|---|
| Fødselsnummeret er ugyldig | Fødselsnummeret/D-nummeret er ugyldig. |
| Etternavnet mangler | Etternavn kan ikke være tomt. |
| Ingen person har denne kombinasjonen | Ingen person er registrert med denne kombinasjonen av fødselsnummer/D-nummer og navn. … |
| For mange søk | Du har nådd grensen for antall søk. … |
| Brukeren har ikke tilgang til å søke | Du har ikke tilgang til å søke på denne personen. … |
| Svaret fra serveren har feil format | Det oppstod en feil. Vennligst prøv igjen senere. |
| Annen feil | Ukjent feil. Vennligst prøv igjen senere. |

Folkeregisteret begrenser hvor mange mislykkede søk en bruker kan gjøre. Etter for mange forsøk sperrer Folkeregisteret brukeren midlertidig fra søket.

## Datamodellbindinger

| Binding | Hva appen lagrer | Påkrevd |
|---|---|---|
| `ssn` | fødselsnummeret eller D-nummeret | ja |
| `fullName` | fullt navn, med mellomnavn | nei |
| `firstName` | fornavnet | nei |
| `middleName` | mellomnavnet | nei |
| `lastName` | etternavnet fra Folkeregisteret | nei |

## Påkrevd og skrivebeskyttet

- Med `required` må brukeren hente opplysninger før de kan sende inn. Ellers viser appen meldingen «Du må fylle ut fødselsnummer».
- Med `readOnly` viser komponenten verdiene, men ikke knappen.

## Legge til komponenten

I Altinn Studio Designer finner du **Finn person** under **Skjema** på siden **Utforming**. Koble `ssn` til et felt i datamodellen.

I koden ser komponenten slik ut:

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json
{
  "id": "styreleder",
  "type": "PersonLookup",
  "dataModelBindings": {
    "ssn": "Styreleder.Foedselsnummer",
    "fullName": "Styreleder.Navn"
  },
  "textResourceBindings": {
    "title": "styreleder.title"
  },
  "required": true
}
```

## Fra v8

Bindingene har fått nye navn i v9: `person_lookup_ssn` heter nå `ssn`, `person_lookup_name` heter `fullName`, og `person_lookup_first_name`, `person_lookup_middle_name` og `person_lookup_last_name` heter `firstName`, `middleName` og `lastName`. `studioctl app upgrade v9` gjør om navnene.

## Egenskaper

{{< component-props "PersonLookup" >}}
