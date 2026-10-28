---
title: Configuration of authentication
linktitle: Authentication
description: Configure the authentication level and ID provider for your app.
weight: 800
---

## Authentication level

Required authentication level is set in the [XACML Policy](/en/altinn-studio/v8/reference/configuration/authorization/) as an obligation.

## ID-provider

The default login provider is ID-porten. You can configure the app to use another ID provider (identity provider) by setting `AppOidcProvider`.

When a user opens an app that requires authentication and is not already logged in, the app redirects the user to Altinn Platform Authentication. The app includes the configured provider in the `iss` parameter, for example `iss=uidp`. Altinn Platform Authentication then redirects the user to that provider to log in. After login, the user returns to the app.

This setting selects a provider that is already configured and approved in Altinn Platform Authentication. The value is the provider's identifier, not a URL for an arbitrary login service. Documented alternatives are:

- [FEIDE](https://www.feide.no/)
- [UIDP](https://www.udir.no/verktoy/uidp/)

### Configure the app

Open `App/appsettings.json` in the app repository and add `AppOidcProvider` to the existing `AppSettings` section. The example below selects UIDP:

```json
{
  "AppSettings": {
    "AppOidcProvider": "uidp"
  }
}
```

Keep the other settings in the file and in the `AppSettings` section. If `AppOidcProvider` is absent or an empty string, the default provider, ID-porten, is used.

If the provider needs to vary between environments, set the setting under `AppSettings` in `App/appsettings.Staging.json` for TT02 or `App/appsettings.Production.json` for production. Environment-specific settings override the value in `App/appsettings.json`. The provider must be available in the relevant environment. See [Settings and environment variables](/en/altinn-studio/v8/reference/configuration/settings/).

This setting does not force users who are already logged in to log in again with the selected provider. Stateless apps that allow anonymous access do not redirect users to login when opened either.

Read more about configuring providers in Altinn Platform Authentication under [OIDC Providers](/en/technology/architecture/capabilities/runtime/security/authentication/oidcproviders/).
