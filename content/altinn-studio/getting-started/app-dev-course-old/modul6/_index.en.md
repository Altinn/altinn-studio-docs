---
title: Module 6
description: Expansion of form with repeating group
linktitle: Module 6
tags: [apps, training, repeating groups, validation, data processing, consume API ]
weight: 20
---

In this module you will expand the application you have built in the previous modules to support more of [the functionality that the municipality of Sogndal wishes to implement](../case/#requirements-from-the-municipality).

**Topics covered in this module**
- Repeating groups
- Validation
- Data processing

## Tasks

{{% expandlarge id="rep-groups" header="Repeating groups" %}}
### Requirements from the municipality

To tailor the best possible offer to new residents, you would like to have a list of their previous residences.

On the data page, you want to allow users to enter their previous residences. Previous residences should include the following fields:

- Street Address
- Postal Code
- City

It should be possible to enter up to 10 former residences. 

### Tasks

1. Add a group component to the page to collect personal information.
2. Add an address component below the group component.
3. For both components, add appropriate headings and link them to relevant fields in the data model.

Note that the "Maximum number of repetitions" must be adjusted locally.

### Useful documentation
- [Configuration of field grouping](/altinn-studio/reference/ux/fields/grouping)
- [Configuration of repeating groups](/altinn-studio/reference/ux/fields/grouping/repeating)

### Knowledge check
{{% expandsmall id="m6t1q1" header="Which field in the data model determines whether an element is repeatable?" %}}
The `maxOccurs` field in the XSD model indicates whether a field is repeatable. If `maxOccurs` > 1, the field is treated as a list.
{{% /expandsmall %}}

{{% expandsmall id="m6t1q2" header="How many repetitions are allowed for the `TidligereBosteder` field?" %}}
The `TidligereBosteder` field allows for 10 repetitions.
{{% /expandsmall %}}

{{% /expandlarge %}}


{{% expandlarge id="validation" header="Validation" %}}
### Requirements from the municipality

If a newcomer enters the postal code `1337` as one of their previous residences, they must confirm their excellence by adding a symbol in the address field before they can proceed.

Therefore, we want an error message to appear on the relevant field with the following text:

```rich
Vi er beæret over å motta en '1337' innbygger til Sogndal kommune!
 Du må imidlertid bekrefte din uovertruffenhet ved å legge til en 🌟 i adressefeltet for å gå videre.
```

### Oppgaver

1. Add a validation to the `Postnr` field for previous residential addresses.

### Useful documentation
- [Server-side validation](/altinn-studio/reference/logic/validation/#server-side-validation)
- [How to implement custom validation](/altinn-studio/reference/logic/validation/#how-to-add-custom-validation)
- [Single field validations](/altinn-studio/reference/logic/validation/#single-field-validation)

### Knowledge check
{{% expandsmall id="m6t2q1" header="When are server-side validations executed?" %}}
Server-side validations are, by default, only executed when the user chooses to proceed from a step. This behavior can be overridden, and it is possible to trigger validations on individual fields and, for example, when switching between different pages.
{{% /expandsmall %}}

{{% expandsmall id="m6t2q2" header="Why should validations added on the client-side also be duplicated on the server-side?" %}}
Client-side validations should be considered as aids for a better user experience and not as a guarantee that data is delivered in the correct format. Malicious users can bypass these validations, and client-side validations will not be executed if someone uses the APIs directly, for example. Therefore, validations placed on the frontend should always be reflected in the backend logic.
{{% /expandsmall %}}

{{% /expandlarge %}}


{{% expandlarge id="processing" header="Data processing" %}}

### Requirements from the municipality

There is an address in Sogndal which is often misspelled by newcomers which leads to case workers having to spend a lot of time manually correcting it.
Therefore, we want the app to automatically fix this mistake when the misspelled address is detected.

If the user enters `Sesame Street 1` in the field `Innflytter.Adresse.Gateadresse`, it should automatically be corrected to `Sesamsgate 1`.
For all other addresses the field should remain the same.

### Tasks

1. Create a file for [data processing](/altinn-studio/reference/logic/dataprocessing/).
2. Add processing of the address field as described above.

Remember to implement the solution in `Program.cs` as before.

### Useful documentation
- [Data processing](/altinn-studio/reference/logic/dataprocessing/)

### Knowledge check
{{% expandsmall id="m6t3q1" header="When is data processing executed?" %}}
Data processing is executed every time the user either reads or writes data. This means that the logic runs every time the user changes a given field. Therefore, app developers need to optimize the code that runs and avoid heavy and complex operations on every calculation.
{{% /expandsmall %}}

{{% expandsmall id="m6t3q2" header="What is the difference between `ProcessDataWrite` and `ProcessDataRead`?" %}}
`ProcessDataWrite` is executed when the user writes data, meaning when the user fills in a field or updates an existing value. `ProcessDataRead` is executed when the user reads data from the database, for example, when navigating to a previous instance of the application and retrieving previously filled data.
{{% /expandsmall %}}

{{% /expandlarge %}}


## Summary
In this module, you have learned about **repeating groups** and how to configure them as part of the user interface.
 You have also explored how to set up custom **validations** in the backend for cases that cannot be defined as part of data model restrictions.
  Finally, you have seen how to set up **data processing** to enable data manipulation at runtime.

## Solution Proposal
[Source Code Module 6](https://altinn.studio/repos/testdep/flyttemelding-sogndal/src/branch/modul6)

{{% expandlarge id="rep-grupper-solution" header="Repeating groups" %}}

![Repeating groups with address (none added yet). Screenshot](repeterende-grupper-adresse-screenshot.png "Repeating group with addresses (none added yet)")

![Repeating groups with address (editing). Screenshot](repeterende-grupper-rediger-screenshot.png "Repeating group with addresses (editing)")

We have added a component for a repeating group in Altinn Studio Designer with an address component as a "child."

The group component is linked to the data model field `Innflytter.TidligereBosteder`,
 and the address component is linked to the fields `Innflytter.TidligereBosteder.Gateadresse`,
  `Innflytter.TidligereBosteder.Postnr`, and `Innflytter.TidligereBosteder.Poststed`.

The number of allowed repeating groups is determined by `maxOccurs` for the field in the data model.
 We also need to set `maxCount` to `10` on the group component to prevent the user from (visually) creating more groups than allowed.
  For now, this must be done locally in the page's layout file (see below).

We have also added a heading to clarify the distinction between previous and current addresses.

{{< code-title >}}
App/ui/layouts/innflytterPersonalia.json
{{< /code-title >}}

```json
{
 "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4//schemas/json/layout/layout.schema.v1.json",
 "data": {
   "layout": [
     {
       "id": "tidligere-bosteder-overskrift",
       "type": "Header",
       "size": "M",
       "textResourceBindings": {
         "title": "innflytterPersonalia.tidligere-bosteder-overskrift.title"
       }
     },
     {
       "id": "Group-tidligere-bosteder",
       "type": "RepeatingGroup",
       "maxCount": 10,
       "dataModelBindings": {
         "group": "Innflytter.TidligereBosteder"
       },
       "textResourceBindings": {
         "add_button": "innflytterPersonalia.Address-adresse"
       },
       "children": [
         "Address-tidligere-bosted"
       ]
     },
     {
       "id": "Address-tidligere-bosted",
       "type": "Address",
       "dataModelBindings": {
         "address": "Innflytter.TidligereBosteder.Gateadresse",
         "zipCode": "Innflytter.TidligereBosteder.Postnr",
         "postPlace": "Innflytter.TidligereBosteder.Poststed"
       },
       "simplified": true,
       "required": true,
       "textResourceBindings": {
         "title": "innflytterPersonalia.Address-tidligere-bosted.title"
       }
     }
   ]
 }
}
```

**The following text resources have been added:**

{{< code-title >}}
App/config/texts/resources.nb.json
{{< /code-title >}}

```json
{
 "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/text-resources/text-resources.schema.v1.json",
 "language": "nb",
 "resources": [
  {
   "id": "innflytterPersonalia.Address-adresse",
   "value": "adresse"
  },
  {
   "id": "innflytterPersonalia.Address-tidligere-bosted.title",
   "value": "Tidligere bosted"
  },
  {
   "id": "innflytterPersonalia.tidligere-bosteder-overskrift.title",
   "value": "Tidligere bosteder"
  }
 ]
}
```

{{% /expandlarge %}}

{{% expandlarge id="validering-solution" header="Validation" %}}

![Validation postal code failed. Screenshot](./postal-code-validation-error-screenshot.png "Validation postal code with error message")

![Validation postal code ok. Screenshot](./postal-code-validation-ok-screenshot.png "Validation postal code ok")

* **Add validation logic in the `ValidateData` method in `InstanceValidation.cs`:**

{{< code-title >}}
App/logic/Validation/InstanceValidation.cs
{{< /code-title >}}

```csharp
...

public async Task ValidateData(object data, ModelStateDictionary validationResults)
    {

       if (data.GetType() == typeof(Skjema))
        {
            Skjema skjema = (Skjema)data;
            string elitePostalCode = "1337";
            string eliteSymbol = "🌟";

            if (skjema?.Innflytter.TidligereBosteder != null)
            {
                List<Adresse> tidligereBosteder = skjema.Innflytter.TidligereBosteder;
                int i = 0;
                foreach (Adresse adresse in tidligereBosteder)
                {
                    if (adresse.Postnr == elitePostalCode && !adresse.Gateadresse.Contains(eliteSymbol))
                    {
                        validationResults.AddModelError("Innflytter.TidligereBosteder[" + i + "].Postnr", "Innflytter.TidligereBosteder.validation_message");
                    }
                    i++;
                }
            }
        }
        await Task.CompletedTask;
    }
...
```

* **Add a text resource for the error message:**

{{< code-title >}}
App/config/texts/resources.nb.json
{{< /code-title >}}

```json
{
 "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/text-resources/text-resources.schema.v1.json",
 "language": "nb",
 "resources": [
  ...,
  {
   "id": "Innflytter.TidligereBosteder.validation_message",
   "value": "Vi er beæret over å motta en '1337' innbygger til Sogndal kommune! Du må imidlertid bekrefte din uovertruffenhet ved å legge til en 🌟 i adressefeltet for å gå videre."
  }
 ]
}
```

### Extra Challenge

This solution only changes the address for previous residences.
Update the code so that the validation also includes the current address.

{{% /expandlarge %}}

{{% expandlarge id="processing-solution" header="Data processing" %}}

* **Create a class that implements `IDataProcessor` as described in [data processing](/altinn-studio/reference/logic/dataprocessing/) and add data processing logic:**

{{< code-title >}}
App/logic/DataProcessing/DataProcessor.cs
{{< /code-title >}}

```csharp
...

namespace Altinn.App.AppLogic.DataProcessing;

public class DataProcessor : IDataProcessor {
    public async Task<bool> ProcessDataRead(Instance instance, Guid? dataId, object data)
    {
        return await Task.FromResult(false);
    }

    public async Task<bool> ProcessDataWrite(Instance instance, Guid? dataId, object data)
    {
        bool edited = false;

        if (data.GetType() == typeof(Skjema)) {
            Skjema skjema = (Skjema)data;
            
            if (skjema?.Innflytter.TidligereBosteder != null) {
                List<Adresse> tidligereBosteder = skjema.Innflytter.TidligereBosteder;
                int i = 0;
                foreach (Adresse adresse in tidligereBosteder) {
                    if (adresse.Gateadresse == "Sesame Street 1") {
                        adresse.Gateadresse = "Sesamgate 1";
                        edited = true;
                    }
                    i++;
                }
            }
        }
        return await Task.FromResult(edited);
    }
}
```

* **Register the implementation in `Program.cs`**

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp{hl_lines="8"}
...
{
    // Register your apps custom service implementations here.
    ...
    services.AddTransient<IInstanceValidator, InstanceValidator>();
    services.AddTransient<IDataProcessor, DataProcessor>();
}
...
```

### Extra Challenge

This solution only changes the address for previous residences and only for `Sesame Street 1`.
Update the code so that:

1. The processing also includes the current address.
2. The change is applied to all street numbers.

{{% /expandlarge %}}

<br><br>

{{% center %}}
[<< Previous Module](../modul5/)      [Next Module >>](../modul7/)
{{% /center %}}