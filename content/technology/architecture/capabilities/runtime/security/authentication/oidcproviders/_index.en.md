---
title: OIDC Providers
linktitle: OIDC Providers
description: Altinn Authentication support configuration of multiple OIDC Providers
tags: [architecture, security]
---

Each App in Altinn Apps can configure to use one of the pre-configured and approved OIDC providers.

When redirecting the user to Altinn Authentication, by default ID-porten will be presented through Altinn 2 configuration.

If authentication component has configured a specific OIDC provider and the app is configured to use this, the user will be redirected to login.
Currently, the only approved OIDC providers in Altinn are  FEIDE and UIDP have been approved OIDC providers in Altinn. (School sector)

## OIDC Configuration

Under general setting for the AuthenticationComponent there are two settings.

| Value | Datatype | Decription |
|-----|-------|-------|
| EnableOidc | true/false   | If true, an app can request a specific OIDC provider when login in |
| EnforceOidc | true/false | If true, OIDC is the default login method. In the future, this will always be true |
| DefaultOidcProvider | string | id for the provider should be used as default if non is set. Only relevant when enforceOidc is true | 

Altinn Platform Authentication can support endless numbers of ID providers. However, in an Altinn context, each provider needs to be approved.

Currently, FEIDE and UIDP are the only approved providers. UDIR applications use these.

Each provider needs a separate setup. 

| Value  | Description
|----|------|
| Issuer| The issuer's identification |
| AuthorizationEndpoint | Authorization endpoint for issuer |
| TokenEndpoint | Endpoint where ID-provider generates tokens  |
| WellKnownConfigEndpoint| Id-provider well known endpoint  |
| LogoutEndpoint | Where to redirect user during logout  |
| ClientId| Registrated ID |
| ClientSecret | Registrated secret |
| Scope | Scopes that will be used when requesting authentication | 
| ExternalIdentityClaim    | This claim will be used to match the existing user or create a new one. If this ID is the only claim and is not a common identifier like social security number or email address, the user will be anonymous for Altinn. If not set, the expectation is that there will be a PID claim containing ssn.  |
| UserNamePrefix  |  When generating a new user, this will be the prefix |
| IncludeIssInRedirectUri  | Identifies if authorization request should cointain ISS in return URL. Needed when IDprovider does not include this |
| ProviderClaims | Claims that should be copied to Altinn token during exchange process. This could be identifying users or other properties available in the app code. | 

```json
"OidcProviders": {
    "altinn": {
      "Issuer": "https://idprovider.azurewebsites.net/",
      "AuthorizationEndpoint": "https://idprovider.azurewebsites.net/authorize",
      "TokenEndpoint": "https://idprovider.azurewebsites.net/api/token",
      "WellKnownConfigEndpoint": "https://idporten.azurewebsites.net/api/v1/openid/.well-known/openid-configuration",
      "LogoutEndpoint": "https://idporten.azurewebsites.net/api/v1/logout",
      "ClientId": "asdf34argf",
      "ExternalIdentityClaim": "sub",
      "UserNamePrefix": "UIDP_",
      "IncludeIssInRedirectUri": true,
      "ProviderClaims": [ "locale", "urn:feide:role", "sub" ]
    }
```

