---
headless: true
hidden: true
---

Du kan bruke standardvalidatoren, som du slår på med `runDefaultValidator` i punkt 1. Den kontrollerer at alle som skal signere, har signert, og at antallet signaturer er minst `minCount` på signaturdatatypen i `applicationmetadata.json`. Du kan sette opp egendefinert validering ved å implementere `IValidator` eller `ITaskValidator`, som beskrevet i [Lage validatorer i C#](/nb/altinn-studio/v9/develop-a-service/data/validation/csharp/).

Hvis appen utfører signeringshandlingen i prosessnavigasjonen, [gjør den handlingen før valideringen](/nb/altinn-studio/v9/develop-a-service/data/validation/csharp/#når-brukeren-går-videre-i-prosessen).

Et eksempel er en validator som sjekker at en signatur er gjort på vegne av en organisasjon:

{{% insert "content/altinn-studio/v9/develop-a-service/process/signing/how-to/runtime-delegated-signing/backend-manual/custom-validation-code.en.md" %}}
