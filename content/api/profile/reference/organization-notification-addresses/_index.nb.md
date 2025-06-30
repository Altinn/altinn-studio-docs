---
title: Virksomheters varslingsadresser
description: Dette API-et gir mulighet til å administrere virksomheters varslingsadresser
weight: 30
---

## Hva er varslingsadresser for virksomheter
For at virksomheter skal bli varslet om nye meldinger i altinn må de legge inn minst en varslingsadresse. Dette må være et mobilnummer eller en e-postadresse. 
Disse brukes også av Brønnøysundregistrene og holdes i synk gjennom jevnlige oppdateringer mellom systemene. 

En oppdatering kjøres vanligvis hvert tiende minutt. 


## Hvordan bruker man API-et?
Det finnes endepunkter for å lese, legge til og slette varslingsadresser. 
Alle endepunkter krever autentisering. For å bruke API-et må man være en innlogget sluttbruker. Det er viktig at tilgangs-token som brukes inneholder `userId` for å indikere hvem som er innlogget bruker. 
Sluttbrukeren må i tillegg ha en av et sett gyldige roller for å administrere virksomhetens varslingsadresse.

I sti for å administrere varslingsadresser må man ha med organisasjonsnummeret for virksomheten.

**Modell**
```json
{
  "organizationNumber": "123456789",
  "notificationAddresses": [
    {
      "notificationAddressId": 1,
      "email": "string",
      "countryCode": null,
      "phone": null
    },
    {
      "notificationAddressId": 2,
      "email": null,
      "countryCode": "+47",
      "phone": "98765432"
    }
  ]
}
```
* **organizationNumber** (string) Inneholder virksomhetens organisasjonsnummer. 
* **notificationAddresses** (liste med notificationaddresses)
    * **notificationAddressIs** (int) In identifikator for adressen. Denne brukes for å slette eller endre en lagret adresse.
    * **email** (string) E-postadresse som brukes for varsling til virksomheten. Er null dersom adressen er et telefonnummer.
    * **phone** (string) Telefonnummeret som brukes for varsling til virksomheten. Er null dersom adressen er e-post. 
    * **countryCode** (string) Landkode som hører til telefonnummeret. 