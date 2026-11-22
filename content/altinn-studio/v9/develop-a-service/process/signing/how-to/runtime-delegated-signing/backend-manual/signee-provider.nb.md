---
headless: true
hidden: true
---

For at appen skal vite hvem som skal få tilganger for å lese og signere, må du implementere C#-grensesnittet `ISigneeProvider`.

Grensesnittet må returnere et sett med personer og/eller virksomheter som skal få rettighetene. Det kan for eksempel være basert på datamodellen, som vist nedenfor. `Id`-attributtet i denne implementasjonen må matche ID-en som ble angitt i `<altinn:signeeProviderId>`.

Når en organisasjon er oppgitt som den som skal signere, får organisasjonen `read` og `sign` på instansen, og eventuelle andre handlinger du har lagt inn i `AdditionalActionsToDelegate`. De som har en [nøkkelrolle](/nb/authorization/about/detailed/#nøkkelroller) i organisasjonen, kan da signere for den.

{{% insert "content/altinn-studio/v9/develop-a-service/process/signing/how-to/runtime-delegated-signing/backend-manual/signee-provider-code.en.md" %}}
