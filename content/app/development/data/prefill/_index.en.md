---
title: Prefilling data
linktitle: Prefill
description: How to configure prefill for an app.
toc: true
weight: 200
---

As of today, Altinn offers three methods for prefilling data in an app for a user.
These methods can be combined freely to reach the desired result.

## Prefill from national register and user profile

Altinn apps support prefill with data from the Central Coordinating Register (Enhetsregisteret), the National Population Register (Folkeregisteret) and user profile in Altinn.

By following the description below, you will during instantiation of a form prefill the data model with
the defined values obtained from Altinns data base.

### Setup of prefill in the application repository

Create a new json file in the app repo under `App/models`.
The name of the file should contain the name of the data model and have the postfix ".prefill.json".
If the data model is called _appModel_ you should now be able to find these three files in the map:
_appModel.metadata.json_, _appModel.schema.json_, _appModel.prefill.json_

Paste the code below into the file.

```json
{
    "$schema": "https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json",
    "allowOverwrite": true,
    "ER": {
    },
    "DSF": {
    },
    "UserProfile": {
    }
}
```

### Configuration of _prefill.json_

- **$schema** points to the json schema definition of the file. The current version is v1.
  Because of this file, Visual Studio Code will validate and offer intellisense/autocomplete when you edit the file locally.

- **allowOverwrite** determines whether prefill defined in this file can overwrite a field in the data model if it already has a value.

- **ER** here you enter fields from the data model that are to be prefilled with data from the Central Coordinating Register.
Fields that are prefilled with ER-data will only have a value if you instantiate on behalf of an organization.
Instantiation will fail if you attempt to prefill ER-data, but do not have an organization available.

The example below will populate the field _Datamodell.Organisasjon.Organisasjonsnummer_ with the organization number retrieved from the Central Coordinating register.

```json
"ER": {
    "OrgNumber":"Datamodell.Organisasjon.Organisasjonsnummer"
}
```

- **DSF** here you enter fields from the data model that are to be prefilled with data from the National Population Register.
The field that is prefilled with DSF-data will only have a value if you instantiate on behalf of a person.
Instatiation will fail if you attempt to prefill DSF-data, but do not have a person available.

The example below will populate the field _Datamodell.Person.Nummer_ with the phone number retrieved from the National Population Register.

 ```json
"DSF": {
    "TelephoneNumber":"Datamodell.Person.Nummer"
}
```

- **UserProfile** here you enter fields from the data model that are to be prefilled with data from the users profile in Altinn.
Note that it is the logged in user who instantiates the app the data is collected for.

The example below will populate the field _Datamodell.Bruker.Epost_ with the email retrieved from the users profile in Altinn.

```json
"UserProfile": {
    "Email":"Datamodell.Bruker.Epost"
}
```

### Available prefill values

The JSON-schema definition of the prefill file is also available [here]https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json).
The use of a schema enables editors, [e.g. Visual Studio Code](https://code.visualstudio.com/docs/languages/json#_mapping-in-the-json),
to validate and offer intellisense for faster editing.

#### The National Population Register

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

#### The Central Coordinating Register

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

#### User profile

The user profile exposed is the profile belonging to the one who instantiatd the service. If Ola Nordmann instantiates a form on behalf of
Kari Nordmann, the data retrieved from here would belong to Ola. For the objects Party.Organization and Party.Person, you will find the same fields that are included in ER and DSF-prefill. Note that Party.Organization will be null if the user is logged in as an individual, and the equivalent if they are logged in with a business user. The prefill will fail if the object you prefill from does not exist, so if you wish to dynamically prefill based on these values it has to be setup as [custom prefill.](#custom-prefill).
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

## Custom prefill

Altinn apps enable prefill of an instance with custom data,
whether it is the result of an API call, calculations done under instantiation or other logic.
This is implemented in the method _DataCreation_ in the file _InstantiationHandler.cs_ that can be found in the application repo under `App/logic`.

The example below populates the field _Bruker.FulltNavn_ in the model _Datamodell_ with the value "Test Testesen".

```C# {hl_lines=[6]}
public async Task DataCreation(Instance instance, object data)
{
    if (data.GetType() == typeof(Datamodell))
    {
        Datamodell model = (Datamodell)data;
        model.Bruker.FulltNavn = "Test Testesen";
    }
}
```

Replace _Data model_ with the name on the C# class that has been generated based 
on the xsd uploaded to Altinn Studio. If you use a suitable code editor you will be able to define fields
to be populated using intellisense.

Keep in mind that if you have complex types in your model, these will need to be instantiated before you can
assign a value to one of the type's subelements. See the example below where we assume that `Bruker` and 
`Name` are separate C# classes.

```C#
public async Task DataCreation(Instance instance, object data)
{
    if (data.GetType() == typeof(Datamodell))
    {
        Datamodell model = (Datamodell)data;
        Bruker b = new Bruker();
        b.Navn = new Name();
        b.Navn.FulltNavn = "Test Testesen";
    }
}
```

### Instantiation with prefill

Altinn apps support instantiation with prefill.
The form data is attached in a multipart in the instantiation request that is sent to the app.
Below you will se an example of a requeest to instantiate an app with prefill for partyID 12345.

```http {hl_lines=[10]}
Content-Type: multipart/form-data; boundary="abcdefg"
Body:

--abcdefg
Content-Type: application/json; charset=utf-8
Content-Disposition: form-data; name="instance"

{
    "instanceOwner": {
        "PartyId" : "12345"
    }
}

--abcdefg
Content-Type: application/xml
Content-Disposition: form-data; name="Endring-av-navn"

<?xml version="1.0"?>
<Skjema xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" skjemanummer="1533" spesifikasjonsnummer="11172" blankettnummer="RF-1453" tittel="Endring av navn" gruppeid="9308">
<Innledning-grp-9309 gruppeid="9309">
    <NavneendringenGjelderFor-grp-9310 gruppeid="9310">
    <SubjektFornavnFolkeregistrert-datadef-34730 orid="34730">Ola Nordmann</SubjektFornavnFolkeregistrert-datadef-34730>
    </NavneendringenGjelderFor-grp-9310>
    <Kontaktinformasjon-grp-9311 gruppeid="9311">
    <MelderFultnavn orid="34735">LANGØY MADS</MelderFultnavn>
    </Kontaktinformasjon-grp-9311>
</Innledning-grp-9309>
</Skjema>

--abcdefg--
```
