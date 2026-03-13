---
headless: true
hidden: true
---

To allow the app to determine who should receive access to read and sign, the C# interface `ISigneeProvider` must be implemented.

The implementation must return a set of individuals and/or organizations that should receive rights to sign. This can be based on the data model, as shown in the example below.

When an organization is provided as a signee, any person with a [key role](/en/altinn-studio/v8/reference/configuration/authorization/guidelines_authorization/roles_and_rights/roles_er) for the organization will be given access to `read` and `sign`.

The `Id` property in this implementation must match the ID specified in `<altinn:signeeProviderId>`.

#### Delegate additional actions

By default, only `read` and `sign` are delegated to signees. If signees also need access to other actions, such as `reject`, you can use the `AdditionalActionsToDelegate` property on `ProvidedPerson` or `ProvidedOrganization`. The actions you specify will be delegated in addition to `read` and `sign`.

Note that the app must also have the right to delegate the additional actions. See [access control for the app](#access-control-for-the-app) in step 1.

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/signee-provider-code.en.md" %}}