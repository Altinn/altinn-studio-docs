---
draft: true
title: Tilgjengelige kilder for forhåndsutfylling via konfigurasjon
linktitle: Tilgjengelige kilder
description: Oversikt over tilgjengelige kilder og tilhørende felter for forhåndsutfylling med konfigurasjonsfil
tags: [needsReview, needsTranslation]
---

## Folkeregisteret (DSF)

Persondata som eksponeres er tilknyttet personen som appen startes på vegne av. Hvis Ola Nordmann starter en app på 
vegne av Kari Nordmann, vil det være Karis data som eksponeres. Tilgjengelige verdier for forhåndsutfylling inkluderer:

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

## Enhetsregisteret (ER)

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

## Brukerprofil (UserProfile)

Brukerprofilen som eksponeres tilhører den som starter tjenesten. Hvis Ola Nordmann starter et skjema på vegne av Kari Nordmann, hentes data om Ola.

Objektene Party.Organization og Party.Person inneholder de samme feltene som ER og DSF-forhåndsutfylling. Party.Organization er null hvis brukeren er logget inn som privatperson. Party.Person er null hvis brukeren er logget inn som virksomhetsbruker.

Forhåndsutfyllingen feiler hvis objektet du bruker ikke finnes. Hvis du vil forhåndsutfylle dynamisk basert på disse verdiene, må du sette opp [egendefinert forhåndsutfylling](/nb/altinn-studio/v10/develop-a-service/prefill#egendefinert-kode).

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
- ProfileSettingPreference.DoNotPromptForParty

