---
title: 'Dialog Tokens'
description: 'Reference information about dialog tokens'
weight: 20
---

## Introduction

See [getting started with dialog tokens]({{< relref "/dialogporten/getting-started/authorization/dialog-tokens" >}}) for a functional overview of dialog tokens and what they can be used for.

Dialog tokens allows for unproxied frontend requests to endpoints requiring authentication and authorization, without having to rely on ID-porten SSO and redirects.

## Usage for end-user systems (OAuth clients)

Dialog tokens are embedded within the [single-dialog response model]({{< relref "/dialogporten/reference/entities/dialog" >}}) (see `dialogToken`), and are self-contained, signed JWTs containing claims from the authenticated user and the dialog itself, including which actions and authorization attributes the user is authorized for.

Dialog tokens should be transferred as-is as bearer tokens in an `Authorization` HTTP header. The contents of the dialog token should normally not be inspected by clients, i.e., the token should be treated as an opaque string.

The altinn.no portal uses dialog tokens on all URLs associated with [write actions]({{< relref "/dialogporten/reference/front-end/write-actions" >}}) and [front channel embeds]({{< relref "/dialogporten/reference/front-end/write-actions" >}}). Other end-user systems might also use dialog tokens for API actions, subject to service-specific protocols defined by the respective service owner.

### Dialog token lifetime

A fresh dialog token is issued for each fetch of the dialog aggregate. The lifetime (`exp` claim) is **10 minutes**, so end-user systems should refetch the dialog to ensure that the endpoints accept the token, and that it matches current authorization data.

## Receving and verifying dialog tokens (OAuth resource servers)

With the help of dialog tokens, the resource server will be able to fully authenticate and authorize requests that are otherwise unauthenticated, i.e., without cookies or any other state. Dialog tokens should be transferred as bearer tokens using an `Authorization` HTTP header.

Note that for browser-based clients, including the Altinn.no portal, the resource server must also implement the [CORS protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) in order to handle requests.

Entities carrying an [authorization context]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) use the same dialog token. Their grants are not expressed through the `a` claim, but by listing the entity in the [`e` claim](#the-e-claim-authorized-entities) - see below.

### Token type

The dialog token's JOSE `typ` header is `JWT`. This is not planned to change for the current major version.

### List of Dialogporten specific claims

| Claim            | Description                                                                                                                                                        | Example                                                                           |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| jti              | Unique identifier for this token (a fresh value on every issued token).                                                                                             | `"8e1f2c3d-4b5a-6978-8a9b-0c1d2e3f4a5b"`                                          |
| c                | Authenticated as a consumer of Dialogporten. The prefix for either individuals (typically ID-porten), organizations (typically Maskinporten), or self-registered users. | `"urn:altinn:person:identifier-no:12018212345"` `"urn:altinn:organization:identifier-no:991825827"` `"urn:altinn:party-identifier:username:someemail@example.com"` |
| y                | Optional. Present when a system user authenticated - the system user's identifier. See `o` for the system user's organization.                                     | `"urn:altinn:systemuser:uuid:0194a1b2-3c4d-7e5f-8a9b-0c1d2e3f4a5b"`               |
| o                | Optional. Present alongside `y` - the organization the system user acts for.                                                                                        | `"urn:altinn:organization:identifier-no:991825827"`                              |
| l                | Security level of authentication (4)                                                                                                                                | `4`                                                                               |
| u                | Optional. If a provider token in Maskinporten has been used, the authenticated provider's organization number will be given here.                                     | `"urn:altinn:organization:identifier-no:991825827"`                                                                  |
| p                | Whom the consumer is acting on behalf of (if not themselves), i.e., who owns the relevant dialogue.                                                                 | `"urn:altinn:person:identifier-no:12018212345"` `"urn:altinn:organization:identifier-no:991825827"`  `"urn:altinn:party-identifier:username:someemail@example.com"` |
| i                | Unique identifier of the dialogue.                                                                                                                                  | `"e0300961-85fb-4ef2-abff-681d77f9960e"`                                           |
| s                | The service resource that the dialogue refers to.                                                                                                                   | `"urn:altinn:resource:super-simple-service"`                                      |
| a                | Authorized actions/authorization attributes.                                                                                                                        | `"read;write;sign;elementread,urn:altinn:subresource:authorizationattribute1"`                                    |
| e                | Optional. Authorized entities: for every entity carrying an authorization context that the user is authorized for, the entity's id or the service owner's `tokenRef`. Omitted when there are none. See below. | `["0194a1b2-3c4d-7e5f-8a9b-0c1d2e3f4a5b", "my-own-reference"]`                    |

#### The `e` claim: authorized entities

An entity that carries an [authorization context]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) may be granted through a party or a resource other than the dialog's own, which an action name in `a` cannot express safely. Grants derived from authorization contexts are therefore kept out of `a` entirely, and are instead expressed per entity in `e`: a flat array with one entry for every context-carrying entity (API action, GUI action, transmission, dialog attachment, transmission attachment or transmission navigational action) the user is authorized for.

Each entry is the entity's `id`, or - when the service owner set a `tokenRef` on the authorization context - that reference verbatim. Duplicate references collapse into a single entry. The claim is omitted when there is nothing to list, so a dialog without authorization contexts issues a token of exactly the shape it always has.

A receiving service handling a request scoped to a context-carrying entity must check that the entity is listed in `e` - by its id, or by the `tokenRef` the service owner chose - rather than looking for an action in `a`. The parent-first rule of authorization contexts applies here too: a child of a denied transmission is never listed, whatever its own context would permit.

The [.NET SDK]({{< relref "/dialogporten/user-guides/service-owners/api-client" >}}) exposes this as the optional `requiredEntityReference` parameter of `IDialogTokenValidator.Validate`, which fails the validation unless the given reference is listed, and as the `GetAuthorizedEntityReferences()` extension on the validated `ClaimsPrincipal`.

#### Example of decoded token

```json
{
  "alg": "EdDSA",
  "typ": "JWT",
  "kid" : "dp-2023-01" 
}
// .
{
  "c": "urn:altinn:person:identifier-no:12018212345", 
  "l": 4,  
  "u": "urn:altinn:organization:identifier-no:825827991",
  "p": "urn:altinn:organization:identifier-no:991825827", 
  "i": "e0300961-85fb-4ef2-abff-681d77f9960e",
  "s": "urn:altinn:resource:super-simple-service",
  "a": "read;write;sign;elementread,urn:altinn:subresource:autorisasjonsattributt1",
  "e": ["0194a1b2-3c4d-7e5f-8a9b-0c1d2e3f4a5b", "my-own-reference"],
  "exp": 1672772834,
  "iss": "https://dialogporten.no",
  "nbf": 1672771934,
  "iat": 1672771934 
}
 
// .
// <signature>
```
### Token signature cipher

Dialog tokens use an [Edwards-Curve Digital Signature Algorithm (EdDSA)](https://datatracker.ietf.org/doc/html/rfc8032) with the Ed25519 curve to sign dialog tokens, making it possible for consumers to verify that the token has been issued by Dialogporten and trust the information in the claims. Also see [RFC 8037](https://datatracker.ietf.org/doc/html/rfc8037) for information about using EdDSA in JOSE contexts.

### Well-known endpoints

Dialogporten provides [OAuth 2.0 Authorization Server Metadata (RFC8414)](https://datatracker.ietf.org/doc/html/rfc8414) allowing for runtime key discovery, rotation and token validation, at `{base}/api/v1/.well-known/oauth-authorization-server` and `{base}/api/v1/.well-known/jwks.json`. `{base}` is the Dialogporten base URI for the environment:

| Environment | Base URI |
|---|---|
| Production | `https://platform.altinn.no/dialogporten` |
| Staging (TT02) | `https://platform.tt02.altinn.no/dialogporten` |
| Test (at23) | `https://platform.at23.altinn.cloud/dialogporten` |

Both operations are also described in the [OpenAPI specification]({{< relref "/dialogporten/reference/openapi" >}}), tag "Metadata".

### Key sets and rotations
The JSON Web Key sets published on the well-known endpoints will always contain at least two JWKs. All endpoints that accept and verify dialog tokens issued by Dialogporten should allow tokens signed by any of the keys present in the key set for the given environment.

The key set should be cached and refreshed with a frequency no more than 24 hours. Dialogporten may at any point introduce new keys into the key set, but will not sign any dialog tokens until the key has been published and available at the well-known endpoint for at least 48 hours. This will allow for consumers to refresh their caches and verify the signature of any token issued by Dialogporten.

### Token validation recommendations

1. Verify the signature against the JWKS, selecting the key by `kid`.
2. Verify `typ == "JWT"`.
3. Verify `iss` matches the expected Dialogporten issuer for the environment.
4. Verify `exp`/`nbf` with minimal clock skew, given the 10-minute lifetime.
5. Verify `i` (dialog id) matches the dialog you expect, if you know it.
6. For a request on the dialog itself or on an entity without an authorization context, verify that `a` contains the action you're about to perform. For a request on an entity carrying an authorization context, verify instead that the entity's id or `tokenRef` is listed in `e`.
7. Verify `l` meets your minimum required authentication level.
8. Fail closed on anything unrecognised.

Please consult [RFC 8725](https://datatracker.ietf.org/doc/html/rfc8725) and the aforementioned RFCs for information about best practices for JWS signature validation.


{{<children />}}
