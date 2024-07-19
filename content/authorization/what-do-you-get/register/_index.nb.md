---
title: Register
description: Register komponenten tilbyr register 
tags: [platform, register]
---

- ER - Enhetsregisteret - Informasjon om organisasjoner i Norge og roller
- DSF - Det Sentrale Folkeregisteret - Informasjon om innbyggere i Norge.

## ER - Enhetsregisteret
ER-registeret kan brukes til å forhåndsutfylle informasjon, hente informasjon basert på brukerinput eller for å validere brukerinput.

I løpet av høsten 2024 vil registerkomponenten bli oppdatert for å få sin egen

Registerkomponenten er en ASP.Net Core MVC-applikasjon som eksponerer REST-API til Altinn Apps.

Løsningen er nå tilgjengelig på https://platform.altinn.cloud/register/api/v1 og alle ressurser er tilgjengelige gjennom endepunktene definert nedenfor.

Ressurs: Organisasjoner, Partier, Personer

## /organisasjoner

Hent informasjon om en organisasjon:

### Organisasjonstype

| Attributt | Type | Beskrivelse |
| --------- | ---- | ----------- |
| OrgNumber | string | organisasjonsnummeret, ni sifre |
| Name | string | organisasjonens registrerte navn |
| UnitType | string | |
| TelephoneNumber | string | telefonnummeret |
| MobileNumber | string | mobilnummeret |
| FaxNumber | string | faksnummeret |
| EMailAddress | string | e-postadressen |
| InternetAddress | string | URL for et nettsted |
| MailingAddress | string | adresse for å sende post til organisasjonen |
| MailingPostalCode | string | postnummer for å sende post til organisasjonen |
| MailingPostalCity | string | by for å sende post til organisasjonen |
| BusinessAddress | string | adresse for den daglige virksomheten |
| BusinessPostalCode | string | postnummer for den daglige virksomheten |
| BusinessPostalCity | string | by for den daglige virksomheten |

### Operasjoner

```http
GET /organizations/{orgNr}
```

## /personer

### Person type
| Attributt | Type | Beskrivelse |
| --------- | ---- | ----------- |
| SSN | string | personnummer |
| Name | string | personens fulle navn |
| FirstName | string | personens fornavn |
| MiddleName | string | personens mellomnavn |
| LastName | string | personens etternavn |
| TelephoneNumber | string | telefonnummer |
| MobileNumber | string | mobilnummer |
| MailingAddress | string | postadresse |
| MailingPostalCode | string | postnummer |
| MailingPostalCity | string | poststed |
| AddressMunicipalNumber | string | kommunenumret for adressen |
| AddressMunicipalName | string | kommunenavn for adressen |
| AddressHouseNumber | string | husnummer |
| AddressHouseLetter | string | bokstav i adressen |
| AddressPostalCode | string | postnummer |
| AddressCity | string | by |

### Operasjoner

Hent informasjon om en person:
Send en GET-forespørsel med personens personnummer i forespørselens innhold til

```http
GET /persons
```

## /partier

### Parti type

| Attributt | Type | Beskrivelse |
| --------- | ---- | ----------- |
| PartyId | int | partiets ID |
| PartyTypeName | PartyType | typen partiet; organisasjon eller person |
| OrgNumber | string | organisasjonsnummer. Tom streng hvis partiet er person. |
| SSN | string | personnummer. Tom streng hvis partiet er organisasjon. |
| UnitType | string | |
| Name | string | fullt navn på personen eller navn på organisasjonen |
| IsDeleted | bool | true hvis organisasjonen er slettet fra registeret |
| OnlyHiearhyElementWithNoAccess | bool | true hvis partiet er en foreldreenhet uten tilgang i gjeldende kontekst |
| Person | Person | personen partiet representerer |
| Organization | Organization | organisasjonen partiet representerer |
| ChildParties | List<Party> | Liste over underenheter hvis partiet er en organisasjon |

### Operasjoner

Hent informasjon om et parti:

```http
GET /parties/{partyId}
```

Oppslag av parti-id basert på personnummer eller organisasjonsnummer:
(Personnummer eller organisasjonsnummer skal inkluderes i strengformat i forespørselens innhold.)

```http
GET /parties/lookup
```

Oppslag av et parti basert på personnummer eller organisasjonsnummer:
(Personnummer eller organisasjonsnummer skal inkluderes i strengformat i forespørselens innhold.)

```http
GET /parties/lookupObject
```