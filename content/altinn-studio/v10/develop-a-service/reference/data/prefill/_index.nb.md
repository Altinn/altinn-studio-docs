---
title: Forhåndsutfylling - referanse
linktitle: Forhåndsutfylling
description: Oversikt over tilgjengelige felter for forhåndsutfylling med konfigurasjonsfil
tags: [needsReview, needsTranslation]
weight: 10
---
Les mer om forhåndsutfylling [her](/nb/altinn-studio/v8/concepts/prefill/), og se veiledning for hvordan det settes opp [her](/nb/altinn-studio/v8/guides/development/prefill/config/).

## Felter i _prefill.json_-filen

- **$schema** peker på json schema-definisjonen til filen. Nåværende versjon er v1. Visual Studio Code vil på grunn av denne validere og tilby intellisense/autocomplete når du redigerer filen lokalt.

- **allowOverwrite** avgjør om prefill definert i denne filen kan overskrive et felt i datamodellen hvis det allerede har en verdi.

- **ER** her legger du inn felter fra datamodellen som skal forhåndsutfylles med data fra Enhetsregisteret. Felt som forhåndsutfylles med ER-data får kun en verdi hvis du instansierer på vegne av en organisasjon. Instansiering vil feile hvis du forsøker å forhåndsutfylle ER-data, men ikke har en organisasjon tilgjengelig.

- **DSF** her legger du inn felter fra datamodellen som skal forhåndsutfylles med data fra Folkeregisteret. Feltet som forhåndsutfylles med DSF-data får kun en verdi hvis du instansierer på vegne av en person. Instansiering vil feile hvis du forsøker å forhåndsutfylle DSF-data, men ikke har en person tilgjengelig.

- **UserProfile** her legger du inn felter fra datamodellen som skal forhåndsutfylles med data fra brukerens profil i Altinn. Merk at det er den innloggede brukeren som instansierer, som du henter ut data for.


## Tilgjengelige felter for forhåndsutfylling

JSON-schema-definisjonen av prefill-filen er også tilgjengelig [her](https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json). Bruken av et schema gjør at editorer, [for eksempel Visual Studio Code](https://code.visualstudio.com/docs/languages/json#_mapping-in-the-json), kan validere og tilby intellisense for raskere redigering.

### Folkeregisteret (DSF)

Persondata som eksponeres er tilknyttet personen som skjemaet instansieres på vegne av. Hvis Ola Nordmann instansierer et skjema på vegne av Kari Nordmann, vil det være Kari sine data som eksponeres. Tilgjengelige verdier for prefill inkluderer:

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

Enheten som eksponeres er tilknyttet organisasjon som et skjema blir instansiert på vegne av.
Tilgjengelige verdier for prefill inkluderer:

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

Brukerprofilen som eksponeres er profilen til den som instansierer tjenesten. Hvis Ola Nordmann instansierer et skjema på vegne av Kari Nordmann, vil data som hentes ut herfra være knyttet til Ola. For objektene Party.Organization og Party.Person finner du igjen samme feltene som du ser i ER og DSF-prefill. Merk at Party.Organization vil være null hvis brukeren er logget inn som en privatperson, og tilsvarende for Party.Person hvis brukeren er logget inn med en virksomhetsbruker. Forhåndsutfyllingen vil feile hvis objektet du forhåndsutfyller fra ikke finnes. Hvis du ønsker å dynamisk forhåndsutfylle basert på disse verdiene, må dette settes opp som [egendefinert prefill](/nb/altinn-studio/v8/guides/development/prefill/custom/). Tilgjengelige verdier for prefill inkluderer:

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

