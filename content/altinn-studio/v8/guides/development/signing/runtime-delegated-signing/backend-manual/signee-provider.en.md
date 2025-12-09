---
headless: true
hidden: true
---

To allow the app to determine who should receive access to read and sign, the C# interface `ISigneeProvider` must be implemented.

The implementation must return a set of individuals and/or organizations that should receive rights to sign. This can be based on the data model, as shown in the example below.

When an organization is provided as a signee, any person with a [key role](/en/altinn-studio/v8/reference/configuration/authorization/guidelines_authorization/roles_and_rights/roles_er) for the organization will be given access to `read` and `sign`.

The `Id` property in this implementation must match the ID specified in `<altinn:signeeProviderId>`.

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/signee-provider-code.en.md" %}}