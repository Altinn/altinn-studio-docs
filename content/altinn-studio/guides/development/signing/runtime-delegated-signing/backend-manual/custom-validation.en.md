---
hidden: true
---

You can use the default validator as mentioned in step 2. It verifies thath the amount of signatures is at a minimum the
`minCount` set in the data model configuration. Custom validation can be set up by implementing the `IInstanceValidator`
interface as described in [How to add custom validation](https://docs.altinn.studio/altinn-studio/reference/logic/validation/#server-side-validation).

A fictitious example is a validator which verifies that noen of the provided signees are named `Bad Boy`. In the example
application, all founders need to sign:

```csharp
public void ValidateData(object data, ModelStateDictionary validationResults)
{
    if (data.GetType() == typeof(Skjema))
    {
        Skjema skjemaData = (Skjema)data;

        // Check if any of the founders are named "Bad Boy"
        foreach (StifterPerson stifterPerson in skjemaData.StifterPerson)
        {
            if(stifterPerson?.Fornavn == "Bad" && 
                stifterPerson?.Etternavn == "Boy")
            {
                // Add validation errors, with error message and list
                // of affected fields (in this case stifterPerson.Fornavn 
                // and stifterPerson.Etternavn)
                validationResults.AddModelError(
                "StifterPerson.Fornavn",
                "Error: First name cannot be 'Bad' if surname is 'Boy'."
                );
                validationResults.AddModelError(
                "StifterPerson.Etternavn",
                "Error: Surname cannot be 'Boy' if first name is 'Bad'."
                );
            }
        }
    }
}
```