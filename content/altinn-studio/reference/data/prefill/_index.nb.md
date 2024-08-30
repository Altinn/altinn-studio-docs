---
title: Forhåndsutfylling - referanse
linktitle: Forhåndsutfylling
description: Oversikt over tilgjengelige felter for forhåndsutfylling med konfigurasjonsfil
weight: 10
---
Les mer om forhåndsutfylling [her](../../../concepts/prefill/), og se veiledning for hvordan det settes opp
[her](../../../guides/prefill/config/).

## Felter i _prefill.json_-filen

- **$schema** peker på json schema definisjonen til filen. Nåværende versjon er v1.  
  Visual Studio Code vil pga. denne validere og tilby intellisense/autocomplete når du editerer filen lokalt.

- **allowOverwrite** avgjør om prefill definert i denne filen kan overskrive et felt i datamodellen dersom det 
  allerede har en verdi.

- **ER** her legger man inn felter fra datamodellen som skal preutfylles med data fra enhetsregisteret.
Felt som preutfylles med ER-data vil kun få en verdi dersom man instansierer på vegne av en organisasjon.
Instansiering vil feile dersom man forsøker å preutfylle ER-data, men ikke har en organisasjon tilgjengelig.

- **DSF** her legger man inn felter fra datamodellen som skal preutfylles med data fra folkeregistret.
Feltet som preutfylles med DSF-data vil kun få en verdi dersom man instansierer på vegne av en person.
Instansiering vil feile dersom man forsøker å preutfylle DSF-data, men ikke har en person tilgjengelig.

- **UserProfile** her legger man inn felter fra datamodellen som skal preutfylles med data fra brukerens profil i Altinn.
Merk at det er den innloggede brukeren som instansierer man henter ut data for.


## Tilgjengelige felter for forhåndsutfylling

JSON-schema definisjonen av prefill-filen er også tilgjengelig [her](https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json).  
Bruken av et schema gjør at editorer, [f.eks. Visual Studio Code](https://code.visualstudio.com/docs/languages/json#_mapping-in-the-json),
kan validere og tilby intellisense for raskere editering.

### Folkeregisteret (DSF)

Persondata som eksponeres er tilknyttet personen som skjemaet instansieres på vegne av. Dersom Ola Nordman instansierer et skjema på vegne av 
Kari Nordmann vil det være Kari sine data som eksponeres.
Tilgjengelige verdier for prefill inkluderer:

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

Brukerprofilen som eksponeres er profilen til den som instansierer tjenesten. Dersom Ola Nordmann instansierer et skjema på vegne av Kari Nordmann 
vil data som hentes ut herfra være knyttet til Ola. For objektene Party.Organization og Party.Person vil man finne igjen 
samme feltene som man ser i ER og DSF-prefill. Merk at Party.Organization vil være null om brukeren er logget inn som en 
privatperson, og tilsvarende for Party.Person om man er logget inn med en virksomhetsbruker. Preutfyllingen vil feile 
om objektet man preutfyller fra ikke finnes. Om man ønsker å dynamisk preutfylle basert på disse verdiene må dette settes 
opp som [egendefinert prefill](../../../guides/prefill/custom/).
Tilgjengelige verdier for prefill inkluderer:

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

