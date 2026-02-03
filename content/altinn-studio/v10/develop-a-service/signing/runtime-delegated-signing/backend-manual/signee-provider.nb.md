---
draft: true
headless: true
hidden: true
tags: [needsReview, translate]
---

For at appen skal vite hvem som skal få tilganger for å lese og signere må du implementere C#-grensesnittet `ISigneeProvider`.

Grensesnittet må returnere et sett med personer og/eller virksomheter som skal få rettighetene. Det kan for eksempel være basert på datamodellen, som vist nedenfor. `Id`-attributtet i denne implementasjonen må matche ID-en som ble angitt i `<altinn:signeeProviderId>`.

Når en organisasjon er oppgitt som den som skal signere, vil de som har en [nøkkelrolle](/nb/altinn-studio/v10/reference/configuration/authorization/guidelines_authorization/roles_and_rights/roles_er/#nøkkelroller) i organisasjonen få `read` og `sign`-rettigheter til instansen.

{{% insert "content/altinn-studio/v10/develop-a-service/signing/runtime-delegated-signing/backend-manual/signee-provider-code.en.md" %}}
