---
title: Validating with the data model
linktitle: Data model
description: How to set constraints on the fields in the data model, and how to customise the error messages
toc: true
weight: 20
---

The data model determines which values are valid in each field, for example how long a text can be or which numbers are allowed. The app checks the values against the constraints in the browser while the user fills in the form, and shows the error next to the field straight away.

## Setting constraints in the data model

Client-side validation is based on the data model of the form, and uses this to determine what is valid input in a
field.
Specifically, the JSON schema version of the data model is used for validation. This is automatically generated when
uploading an XSD.
It is possible to make changes in the JSON schema file directly to adapt the validation when needed.

**Note that if you make changes in the JSON schema manually, and then update the XSD and re-upload it, a new
JSON schema will also be generated and all manual adaptations will have to be remade. It is therefore recommended to
make changes in the XSD and/or the data modeling tool
for these changes to be reflected in the JSON schema.**

An example of how a field can be defined in the JSON schema data model is:

{{< code-title >}}
App/models/{model}.schema.json
{{< /code-title >}}

```json
"someField": {
  "type": "string",
  "maxLength": 4
}
```

Input in this field will be validated towards the limits that are set, and an error message will appear if these are not met - in this case, if
input is a text longer than four characters.

## Default error messages

Default error messages has been set up for all validations done on the client-side. See the overview below.

| Rule      | Error message bokmål          | Error message nynorsk         | Error message english                 |
| --------- | ----------------------------- | ----------------------------- | ------------------------------------- |
| minimum   | 'Minste gyldig verdi er {0}'  | 'Minste gyldig verdi er {0}'  | 'Minimum valid value is {0}'          |
| maximum   | 'Største gyldig verdi er {0}' | 'Største gyldig verdi er {0}' | 'Maximum valid value is {0}'          |
| minLength | 'Bruk {0} eller flere tegn'   | 'Bruk {0} eller flere tegn'   | 'Use {0} or more characters'          |
| maxLength | 'Bruk {0} eller færre tegn'   | 'Bruk {0} eller færre tegn'   | 'Use {0} or fewer characters'         |
| length    | 'Antall tillatte tegn er {0}' | 'Antall tillatte tegn er {0}' | 'Number of characters allowed is {0}' |
| pattern   | 'Feil format eller verdi'     | 'Feil format eller verdi'     | 'Wrong format or value'               |
| required  | 'Du må fylle ut {0}'          | 'Du må fylle ut {0}'          | 'You have to fill out {0}'            |
| enum      | 'Kun verdiene {0} er tillatt' | 'Kun verdiene {0} er tillatt' | 'Only the values {0} are permitted'   |

## Custom error messages

It is possible to define custom error messages that will be displayed when a field doesn't pass the validation check. This is done by including a parameter `errorMessage` where the field is defined in the JSON schema.
The JSON schema file is in the folder `App/models` and has a naming patterns as follows; `*.schema.json`,

An example of how to extend the example previously presented with a custom error message:

{{< code-title >}}
App/models/{model}.schema.json
{{< /code-title >}}

```json {hl_lines=[4]}
"someField": {
  "type": "string",
  "maxLength": 4,
  "errorMessage": "myCustomError"
}
```

The error text can be included directly. To enable language support, add a text key for a [text defined in the resource files](/en/altinn-studio/v8/reference/ux/texts/).

Notice that if you have a reference to a definition the error message must be added to the `property`-field and not the reference/definition.
Example:

{{< code-title >}}
App/models/{model}.schema.json
{{< /code-title >}}

```json {hl_lines=[5]}
{
  "properties": {
    "person": {
        "$ref" : "#/definitions/personDefinition",
        "errorMessage": "myCustomError",
    }
  },
  "definitions": {
    "personDefinition" : {
      "age": {
        "type": "number"
      },
      ...
  }
}
```

{{% notice warning %}}
Note that when the XSD is changed, the custom error messages will de removed from the JSON schema.
In the future, there will be support for setting custom error messages in the data modelling tool in Altinn Studio. But for now, this is a manual job.
{{% /notice %}}

## Constraints on the server

The app also checks the constraints on the server, through the attributes on the C# model, for example `[Range]`, `[MaxLength]` and `[RegularExpression]`. Altinn Studio generates both the C# model and the JSON schema from the XSD, so they usually have the same rules. If you change the JSON schema by hand, the server does not check that change.

If you want the server to check the form data against the whole XSD, you can turn on the `XsdValidation` setting. See [Validation on the server]({{< relref "/altinn-studio/v8/reference/logic/validation" >}}#validation-on-the-server).
