---
title: Calculations
description: How to add calculations?
toc: true
---

{{% panel theme="warning" %}}
⚠ Calculation is from 4.7.0 replaced by [data processing](../dataprocessing)
{{% /panel %}}

## Calculation 

Calculations are run on the server, and are based on input from the user/form data.
Calculations does not have to be purely mathematical, they can also transfer values between fields, retrieve results from API calls and so on.

Calculations are coded in C#, in the file `CalculationHandler.cs`. This file can be edited the easiest by downloading the source code of the app and editing it on your own computer, e.g. in Visual Studio Code.
The data model with form data is available and can be edited/updated when needed.

Calculations are run every time data is saved. With autosave on (default), calculations are run each time a user makes a change. 

{{%notice info%}}
IMPORTANT: When a calculation that has updated the data on the server has been run, the front-end must be notified so that the updated data can be loaded.
To do this, the `Calculate`-method must return `true` if any of the data has been updated.
If this is not done, the updated data will not be visible for the user until they reload the page.
{{% /notice%}}

Example on code that replaces a given value (`12345678`) with another value (`22222222`) in a given field is shown below:

```C# {hl_lines=[16,22]}
public bool Calculate(object data)
{
    if (data.GetType() == typeof(Skjema))
    {
        // Cast the data object to model type to access all fields
        Skjema model = (Skjema)data;

        // Get the existing value of a specified field, if it exists
        string tlf = 
            model?
            .OpplysningerOmArbeidstakerengrp8819?
            .OpplysningerOmArbeidstakerengrp8855?
            .OppgavegiverTelefonnummerdatadef27335?.value;

        // Check if the value exists and is equal to "12345678"
        if (tlf != null && tlf == "12345678")
        {
            // Replace the value in the field with a new value, "22222222"
            model
              .OpplysningerOmArbeidstakerengrp8819
              .OpplysningerOmArbeidstakerengrp8855
              .OppgavegiverTelefonnummerdatadef27335.value = "22222222";

            // Return true to trigger a re-loading of data 
            return true;
        }
    }

    // Return false if no changes have been made
    return false;
}
```