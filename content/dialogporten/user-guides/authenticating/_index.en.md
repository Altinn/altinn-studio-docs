---
title: "Authenticating"
description: "How to authenticate against Dialogporten"
weight: 10
toc: true
---

## Introduction

The Dialogporten API is divided into a service owner-API and a end user-API.

| API           | Supported authentication methods                                       |
| ------------- | ---------------------------------------------------------------------- |
| End user      | ID-porten, Maskinporten{{<footnote "Only when using system users." >}} |
| Service owner | Maskinporten{{<footnote "Also supports supplier token" >}}             |

{{<displayFootnotes>}}

In addition, token issued by [Altinn Token Exhange](/en/authorization/what-do-you-get/authentication/#exchange-a-jwt-token-from-an-external-token-provider) is also supported, when using either ID-porten or Maskinporten as input.

## Usage for end-user systems

End-user systems can either use a ID-porten token, identifying a person, or a Maskinporten token identifying a system user.

{{<notice warning>}}
Note that access to Dialogporten will _not_ in itself grant access to the content linked to hosted on other APIs, such as Altinn Correspondence og Altinn Apps. These APIs will usually require tokens with specific scopes, such as "altinn:correspondence.read" or "altinn:instances.read". The scopes can be provisioned to the same client and placed in the same token as the one used against Dialogporten.
{{</notice>}}

### ID-porten authentication

ID-porten authentication should be employed by end-user systems that want to access Dialogporten and related services using the identity of a single person, and utilize their authorization in order to access dialogs available across the parties in which the authenticated user has access. This is the API that is being used by the common GUI frontend ("arbeidsflate") available after logging in to altinn.no.

The following general steps must be performed in order to access the end-user API as a person:

1. Create a ID-porten integration (OAuth2 client)
2. Provision the scope `digdir:dialogporten` on the client, as well as any additional scopes required for access content data (ie. `altinn:correspondence.read`)
3. Redirect the user to the authorize-endpoint in ID-porten, where they authenticate themselves and consent to you integration getting access to call Dialogporten on your behalf
4. At your redirect endpoint, use the authorization code provided against the ID-porten token endpoint to get an access token
5. Perform requests to the [end-user API](/en/dialogporten/reference/openapi/) using the access token in a `Authorization: Bearer <token>` header.

ID-porten implements a standard OAuth2 protocol, and issues refresh tokens that can be stored and reused in order to get fresh access tokens at a later stage. Authorizations (OAuth "consents") to the `digdir:dialogporten` scope are valid up to 90 days.

For detailed steps on how to create an ID-porten integration and utilizing the OAuth2 protocol, see the ID-porten documentation linked below.

**Read more**

- [About ID-porten (norwegian)](https://samarbeid.digdir.no/id-porten/id-porten/18)
- [Getting started with ID-porten](https://docs.digdir.no/docs/idporten/oidc/oidc_guide_english.html)
- [Using Altinn Token Exchange](/en/authorization/what-do-you-get/authentication/#exchange-a-jwt-token-from-an-external-token-provider)

### Maskinporten authentication with system users

System users are the new and preferred authentication method where an organization can create a "virtual user", delegate it service rights and associate it with a system - either self-owned or provided by a third-party. This is the successor of the "enterprise user (virksomhetsbruker)" in Altinn 2, and allows for a more secure and user friendly onboarding process for customers and end-users.

For detailed steps on how to create and utilize a system user, see the link below.

**Read more**

- [Authenticating with system users](/en/authorization/guides/system-vendor/system-user/)

{{<children />}}

## Usage for service owner systems

Service owner systems must use Maskinporten-issued tokens, optionally exchanged in Altinn Token Exchange.

There are several scopes defining access to various parts of the service owner API:

| Scope                                                | Grants access to                                                                                                                                                                                    |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `digdir:dialogporten.serviceprovider`                | All service owner APIs, except the search/list API                                                                                                                                                  |
| `digdir:dialogporten.serviceprovider.search`         | All service owner APIs, including the search/list API                                                                                                                                               |
| `digdir:dialogporten.serviceprovider.correspondence` | Create and update dialogs referring a service resource of type `CorrespondenceService` in [Altinn Resource Registry](/en/authorization/what-do-you-get/resourceadministration/) (internal use only) |

Using these scopes requires the organization in the `consumer` claim of the to be registered as a service owner ("org") in Altinn. Failing that will cause any requests to fail.

The follwing general steps must be performed in order to access Dialogporten service owner API:

1. Create a Maskinporten integration (OAuth2 client)
2. Provision the scope `digdir:dialogporten.serviceprovider` on the client
3. Generate a JWT grant referring your client id and scope, sign it and send it to the Maskinporten token endpoint
4. At your redirect endpoint, use the authorization code provided against the Maskinporten end-point in order to get a access token.
5. Perform requests to the [service owner API](/en/dialogporten/reference/openapi/) using the access token in a `Authorization: Bearer <token>` header.

For detailed steps on how to use Maskinporten, see the link below.

**Read more**

- [About Maskinporten (norwegian)](https://samarbeid.digdir.no/maskinporten/maskinporten/25)
- [Getting started with Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_summary)

### Granting access to suppliers

The serviceprovider-scopes are delegable via Altinn API delegation. Service owner organizations may employ suppliers to use Dialogporten service owner APIs on their behalf, using API delegation in Altinn. The API is called "Dialogporten Serviceowner API". Follow the links below for a guide on how to do this:

**Read more**

[](nb/authorization/guides/resource-owner/api-scheme/create-apischeme-resource-admin/)
