---
title: Din kontaktinformasjon for virksomheten
description: Dette API-et gir mulighet til å administrere en brukers kontaktinformasjon for en virksomhet
weight: 40
---

## Hva er din kontaktinformasjon for virksomheten?
En sluttbruker kan få personlige varsler på vegne av en virksomhet. Varslene kan sendes til brukerens eget telefonnummer eller til en e-postadresse på jobben. Man kan registrere både telefonnummer og e-post, men bare én av hver. 
Du kan velge å få varsler kun for enkelte tjenester i Altinn. Disse tjenestene legger du inn i listen `resourceIncludeList`. Det er foreløpig ikke mulig å velge bort enkelttjenester du ikke vil ha varsler for.

## Hvordan bruker man API-et?
For å bruke API-et må man være en innlogget sluttbruker. Det er viktig at tilgangs-token som brukes inneholder userId for å indikere hvem som er innlogget bruker. 

I stien må man angi hvilken aktør man ønsker å administrere adresser for. Denne identifiseres med `partyUuid`. 

## Modell

```json
{
  "userId": 1,
  "partyUuid": "b82320a2-e34d-47bb-8fb3-e6122a50087c",
  "emailAddress": "example@digdir.no",
  "phoneNumber": "+4798765432",
  "resourceIncludeList": [
    "urn:altinn:resource:resource-id"
  ]
}
```

* **userId** (string) Intern id for brukeren i Altinn.
* **partyUUid** (Guid) Intern id for aktøren i Altinn.
* **emailAddress** (string) Brukerens e-postadresse for varsling. Kan være null. 
* **phoneNumber** (string) Telefonnummer for sms varsling til brukeren. Kan være null. 
* **resourceIncludeList** (liste med string) En liste over hvilke tjenester brukeren ønsker varsling på. Kan være null. Listen godtar kun fulle URN-verdier med ressurs-ID. 
