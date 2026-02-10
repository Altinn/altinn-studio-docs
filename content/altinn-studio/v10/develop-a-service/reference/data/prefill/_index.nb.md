---
draft: true
title: Forhåndsutfylling - referanse
linktitle: Forhåndsutfylling
description: Oversikt over tilgjengelige felter for forhåndsutfylling med konfigurasjonsfil
tags: [needsReview, needsTranslation]

---
Les mer om [forhåndsutfylling](/nb/altinn-studio/v8/concepts/prefill/), og se [veiledning for hvordan det settes opp](/nb/altinn-studio/v8/guides/development/prefill/config/).

## Felter i _prefill.json_-filen

- **$schema** peker på json schema-definisjonen til filen. Nåværende versjon er v1. Visual Studio Code vil på grunn av denne validere og tilby intellisense/autocomplete når du redigerer filen lokalt.

- **allowOverwrite** avgjør om forhåndsutfylling definert i denne filen kan overskrive et felt i datamodellen hvis det allerede har en verdi.

- **ER** her legger du inn felter fra datamodellen som skal forhåndsutfylles med data fra Enhetsregisteret. Felter som forhåndsutfylles med ER-data får kun en verdi hvis du starter appen på vegne av en organisasjon. Det vil feile hvis du forsøker å forhåndsutfylle ER-data, men ikke har en organisasjon tilgjengelig.

- **DSF** her legger du inn felter fra datamodellen som skal forhåndsutfylles med data fra Folkeregisteret. Felter som forhåndsutfylles med DSF-data får kun en verdi hvis du starter appen på vegne av en person. Det vil feile hvis du forsøker å forhåndsutfylle DSF-data, men ikke har en person tilgjengelig.

- **UserProfile** her legger du inn felter fra datamodellen som skal forhåndsutfylles med data fra brukerens profil i Altinn. Merk at det er den innloggede brukeren som starter appen, som du henter ut data for.


## Tilgjengelige felter for forhåndsutfylling

JSON-schema-definisjonen av prefill-filen er også tilgjengelig [her](https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json). Bruken av et schema gjør at editorer, [for eksempel Visual Studio Code](https://code.visualstudio.com/docs/languages/json#_mapping-in-the-json), kan validere og tilby intellisense for raskere redigering.

### Folkeregisteret (DSF)

Persondata som eksponeres er tilknyttet personen som appen startes på vegne av. Hvis Ola Nordmann starter en app på vegne av Kari Nordmann, vil det være Kari sine data som eksponeres. Tilgjengelige verdier for forhåndsutfylling inkluderer:

- SSN
- Name
- FirstName
- MiddleName
- LastName
- TelephoneNumber
- MobileNumber
- MailingAddress
- MailingPostalCode
- MailingPostalCity
- AddressMunicipalNumber
- AddressMunicipalName
- AddressStreetName
- AddressHouseNumber
- AddressHouseLetter
- AddressPostalCode
- AddressCity

### Enhetsregisteret (ER)

Enheten som eksponeres er tilknyttet organisasjonen som appen startes på vegne av.
Tilgjengelige verdier for forhåndsutfylling inkluderer:

- OrgNumber
- Name
- UnitType
- TelephoneNumber
- MobileNumber
- FaxNumber
- EMailAddress
- InternetAddress
- MailingAddress
- MailingPostalCode
- MailingPostalCity
- BusinessAddress
- BusinessPostalCode
- BusinessPostalCity

### Brukerprofil (UserProfile)

Brukerprofilen som eksponeres tilhører den som starter tjenesten. Hvis Ola Nordmann starter et skjema på vegne av Kari Nordmann, hentes data om Ola.

Objektene Party.Organization og Party.Person inneholder samme felter som ER og DSF-forhåndsutfylling. Party.Organization er null hvis brukeren er logget inn som privatperson. Party.Person er null hvis brukeren er logget inn som virksomhetsbruker.

Forhåndsutfyllingen feiler hvis objektet du bruker ikke finnes. Hvis du vil forhåndsutfylle dynamisk basert på disse verdiene, må du sette opp [egendefinert forhåndsutfylling](/nb/altinn-studio/v8/guides/development/prefill/custom/).

Tilgjengelige verdier for forhåndsutfylling inkluderer:

- UserId
- UserName
- PhoneNumber
- Email
- PartyId
- Party.PartyId
- Party.PartyTypeName
- Party.OrgNumber
- Party.SSN
- Party.UnitType
- Party.Name
- Party.isDeleted
- Party.OnlyHierarchyElementWithNoAccess
- Party.Person
- Party.Organization
- Party.ChildParties
- UserType
- ProfileSettingPreference.Language
- ProfileSettingPreference.PreSelectedPartyId
- ProfileSettingsPreference.DoNotPromptForParty

