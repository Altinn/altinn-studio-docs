---
title: Prefilling data using configuration
linktitle: Config
description: How to configure prefill for an app using configuration files.
toc: false
weight: 200
---

Using configuration only, Altinn apps support prefill with data from the Central Coordinating Register 
(Enhetsregisteret), the National Population Register (Folkeregisteret) and user profile in Altinn.

By following the description below, you will during instantiation of a form prefill the data model with
the defined values obtained from Altinns data base.

## Setup of prefill in the application repository

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

## Configuration of _prefill.json_

Within the category you want to fetch data from (ER, DSF or UserProfile) in the _prefill.json_ file, add a new line
with a key/value pair:

```json
"<key>": "<value>"
```

- The key is the field the data is _fetched from_-
- The value is the field to populate in the data model.

A full overview of the available fields can be found [here](../../../reference/data/prefill/#available-prefill-values).

### Example: Field from the Central Coordinating Register (ER)
The example below will populate the field _Datamodell.Organisasjon.Organisasjonsnummer_ with the organization number retrieved from the Central Coordinating register.

```json
"ER": {
    "OrgNumber":"Datamodell.Organisasjon.Organisasjonsnummer"
}
```

### Example: Field from the National Population Register (DSF)

The example below will populate the field _Datamodell.Person.Nummer_ with the phone number retrieved from the National Population Register.

 ```json
"DSF": {
    "TelephoneNumber":"Datamodell.Person.Nummer"
}
```

### Example: Field from the user profile in Altinn

The example below will populate the field _Datamodell.Bruker.Epost_ with the email retrieved from the users profile in Altinn.

```json
"UserProfile": {
    "Email":"Datamodell.Bruker.Epost"
}
```
