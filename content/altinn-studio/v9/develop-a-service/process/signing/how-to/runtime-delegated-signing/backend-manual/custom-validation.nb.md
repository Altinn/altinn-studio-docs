---
draft: true
headless: true
hidden: true
tags: [needsReview]
---

Du kan bruke standardvalidatoren som nevnt i punkt 2. Den sjekker at antall signaturer er minst det som er satt til `minCount` på feltet i datamodellen. Du kan sette opp egendefinert validering ved å implementere `IValidator` eller `ITaskValidator`, som beskrevet i [Lage validatorer i C#](/nb/altinn-studio/v9/develop-a-service/data/validation/csharp/).

Hvis appen er konfigurert slik at signeringshandlingen gjøres i prosessnavigasjonen, vil handlingen [gjøres før valideringen](/nb/altinn-studio/v9/develop-a-service/data/validation/csharp/#når-brukeren-går-videre-i-prosessen).

Et eksempel er en validator som sjekker at en signatur er gjort på vegne av en organisasjon:

{{% insert "content/altinn-studio/v9/develop-a-service/process/signing/how-to/runtime-delegated-signing/backend-manual/custom-validation-code.en.md" %}}
