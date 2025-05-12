---
hidden: true
---

Du kan bruke standardvalidatoren som nevnt i punkt 2. Den verifiserer at antall signaturer er minst det som er satt til
`minCount` på feltet i datamodellen. Egendefinert validering kan settes opp ved å implementere `IInstanceValidator`, som
beskrevet i [Hvordan legge til egendefinert validering](https://docs.altinn.studio/altinn-studio/reference/logic/validation/#server-side-validation).

Et fiktivt eksempel er en validator som verifiserer at ingen av de oppgitte signatarene er `Slem Gutt`. I eksempelapplikasjonen
skal alle stifterpersoner signere:

```csharp
public void ValidateData(object data, ModelStateDictionary validationResults)
{
    if (data.GetType() == typeof(Skjema))
    {
        Skjema skjemaData = (Skjema)data;

        // Se om noen av signatarene heter "Slem Gutt"
        foreach (StifterPerson stifterPerson in skjemaData.StifterPerson)
        {
            if(stifterPerson?.Fornavn == "Slem" && 
                stifterPerson?.Etternavn == "Gutt")
            {
                // Legg til valideringsfeil, med feilmelding
                // og påvirket felt (I dett tilfellet stifterPerson.Fornavn
                // og stifterPerson.Etternavn)
                validationResults.AddModelError(
                "StifterPerson.Fornavn",
                "Error: First name cannot be 'Slem' if surname is 'Gutt'."
                );
                validationResults.AddModelError(
                "StifterPerson.Etternavn",
                "Error: Surname cannot be 'Gutt' if first name is 'Slem'."
                );
            }
        }
    }
}
```
