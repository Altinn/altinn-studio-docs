---
draft: true
headless: true
hidden: true
---

Du kan bruke standardvalidatoren som nevnt i punkt 2. Den verifiserer at antall signaturer er minst det som er satt til
`minCount` på feltet i datamodellen. Egendefinert validering kan settes opp ved å implementere `IValidator` eller `ITaskValidator`, som
beskrevet i [Hvordan legge til egendefinert validering](/nb/altinn-studio/v10/reference/logic/validation/#server-side-validation).

Om appen er konfigurert slik at utførelsen av signeringshandlingen gjøres i prosessnavigasjonen, så vil handlingen [utføres før valideringen](/nb/altinn-studio/v10/reference/logic/validation/#server-side-validation).

Et eksempel er en validator som verifiserer at en signatur er gjort på vegne av en organisasjon:

{{% insert "content/altinn-studio/v10/develop-a-service/_temp/signing/runtime-delegated-signing/backend-manual/custom-validation-code.en.md" %}}
