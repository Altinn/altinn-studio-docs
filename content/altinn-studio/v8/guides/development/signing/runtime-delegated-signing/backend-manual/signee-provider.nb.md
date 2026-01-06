---
headless: true
hidden: true
---

For at appen skal vite hvem som skal få tilganger for å lese og signere må C# interface-et `ISigneeProvider` implementeres.

Den må returnere et sett med personer og/eller virksomheter som skal få rettighetene. Det kan for eksempel være basert på datamodellen, som vist nedenfor.
`Id`-attributtet i denne implementasjonen må matche ID som ble angitt i `<altinn:signeeProviderId>`.

Når en organisasjon er oppgitt som signatar så vil de som har en [nøkkelrolle](/nb/altinn-studio/v8/reference/configuration/authorization/guidelines_authorization/roles_and_rights/roles_er/#nøkkelroller) i organisasjonen få `read` og `sign` rettigheter til instansen.

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/signee-provider-code.en.md" %}}