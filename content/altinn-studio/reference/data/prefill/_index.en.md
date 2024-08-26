---
title: Prefill - reference
linktitle: Prefill
description: Reference of available fields when using prefill configuration file.
weight: 10
---
Read more about prefill [here](../../../../concepts/prefill/), and see the guide for how to set it up in your app
[here](../../../../guides/prefill/config/).

### Fields in the  _prefill.json_ file

- **$schema** points to the json schema definition of the file. The current version is v1.
  Because of this file, Visual Studio Code will validate and offer intellisense/autocomplete when you edit the file locally.

- **allowOverwrite** determines whether prefill defined in this file can overwrite a field in the data model if it already has a value.

- **ER** here you enter fields from the data model that are to be prefilled with data from the Central Coordinating Register.
Fields that are prefilled with ER-data will only have a value if you instantiate on behalf of an organization.
Instantiation will fail if you attempt to prefill ER-data, but do not have an organization available.

- **DSF** here you enter fields from the data model that are to be prefilled with data from the National Population
  Register.
  The field that is prefilled with DSF-data will only have a value if you instantiate on behalf of a person.
  Instantiation will fail if you attempt to prefill DSF-data, but do not have a person available.

- **UserProfile** here you enter fields from the data model that are to be prefilled with data from the users profile in Altinn.
Note that it is the logged in user who instantiates the app the data is collected for.

### Available prefill values

The JSON-schema definition of the prefill file is also available [here](https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json).
The use of a schema enables editors, [e.g. Visual Studio Code](https://code.visualstudio.com/docs/languages/json#_mapping-in-the-json),
to validate and offer intellisense for faster editing.

#### The National Population Register (DSF)

The personal data that is exposed is attached to the person the form is instantiated on behalf of. If Ola Nordmann were to instantiate a form on behalf of
Kari Nordmann, it would be Kari's data that would be exposed.
Available values for prefill includes:

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

#### The Central Coordinating Register (ER)

The unit exposed is that which is attached to the organization a form is instantiated on behalf of.
Available values for prefill includes:

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

#### User profile (UserProfile)

The user profile exposed is the profile belonging to the one who instantiated the service. If Ola Nordmann instantiates
a form on behalf of
Kari Nordmann, the data retrieved from here would belong to Ola. For the objects Party.Organization and Party.Person,
you will find the same fields that are included in ER and DSF-prefill. Note that Party.Organization will be null if the
user is logged in as an individual, and the equivalent if they are logged in with a business user. The prefill will fail
if the object you prefill from does not exist, so if you wish to dynamically prefill based on these values it has to be
setup as [custom prefill.](../custom/).
Available values for prefill includes:

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


