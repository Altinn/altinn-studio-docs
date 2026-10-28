---
title: OrganizationLookup
description: Slik lar du brukerne slå opp en virksomhet i Enhetsregisteret.
draft: true
toc: true
tags: [needsReview]
aliases:
  - /altinn-studio/v9/develop-a-service/look-and-feel/components/organisationlookup/
---

Med komponenten **Finn virksomhet** (`OrganizationLookup`) kan brukerne slå opp en virksomhet i Enhetsregisteret med organisasjonsnummer. Appen lagrer organisasjonsnummeret og navnet på virksomheten i datamodellen.

## Slik fungerer komponenten

- Brukeren skriver inn organisasjonsnummeret og klikker på **Hent opplysninger** eller trykker Enter.
- Før søket kontrollerer komponenten at organisasjonsnummeret har ni siffer og riktig kontrollsiffer.
- Finner appen virksomheten, lagrer den opplysningene i datamodellen. Komponenten låser feltet og viser teksten «Fra enhetsregisteret». Navnet på virksomheten står under feltet, og knappen endrer seg til **Fjern**.
- Med **Fjern** tømmer brukeren feltene og kan søke på nytt.

Har feltet for organisasjonsnummer allerede en verdi, for eksempel fra forhåndsutfylling, viser komponenten den som et ferdig oppslag.

## Når oppslaget feiler

| Situasjon | Melding til brukeren |
|---|---|
| Organisasjonsnummeret er ugyldig | Organisasjonsnummeret er ugyldig |
| Ingen virksomhet har dette nummeret | Organisasjonsnummeret ble ikke funnet i enhetsregisteret |
| Svaret fra serveren har feil format | Ugyldig respons fra server |
| Annen feil | Ukjent feil. Vennligst prøv igjen senere |

## Datamodellbindinger

| Binding | Hva appen lagrer | Påkrevd |
|---|---|---|
| `orgnr` | organisasjonsnummeret | ja |
| `name` | navnet på virksomheten | nei |

## Påkrevd og skrivebeskyttet

- Med `required` må brukeren hente opplysninger før de kan sende inn. Ellers viser appen meldingen «Du må fylle ut organisasjonsnummer og hente opplysninger».
- Med `readOnly` viser komponenten verdiene, men ikke knappen.

## Legge til komponenten

I Altinn Studio Designer finner du **Finn virksomhet** under **Skjema** på siden **Utforming**. Koble `orgnr` til et felt i datamodellen.

I koden ser komponenten slik ut:

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json
{
  "id": "revisor",
  "type": "OrganizationLookup",
  "dataModelBindings": {
    "orgnr": "Revisor.Organisasjonsnummer",
    "name": "Revisor.Navn"
  },
  "textResourceBindings": {
    "title": "revisor.title"
  },
  "required": true
}
```

## Fra v8

Komponenten het `OrganisationLookup` før v9. Bindingene har også fått nye navn: `organisation_lookup_orgnr` heter nå `orgnr`, og `organisation_lookup_name` heter `name`. `studioctl app upgrade v9` gjør om både typen og bindingene.

## Egenskaper

{{< component-props "OrganizationLookup" >}}
