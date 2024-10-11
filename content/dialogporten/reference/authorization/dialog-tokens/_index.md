---
title: 'Dialog Tokens'
description: 'Reference information about dialog tokens'
weight: 20
---

## Introduction

See [getting started with dialog tokens]({{<relref "../../../getting-started/authorization/dialog-tokens/">}}) for a functional overview of dialog tokens and what they can be used for.

Dialog tokens allows for unproxied frontend requests to endpoints requiring authentication and authorization, without having to rely on ID-porten SSO and redirects.

## Usage for end-user systems (OAuth clients)

Dialog tokens are embedded withing the [single dialog response model]({{<relref "../../entities/dialog">}}) (see `dialogToken`), and is a self-contained, signed JWT containing claims from the authenticated user and the dialog itself, including what actions and authorization attributes the user is authorized for.

The dialog tokens should be transferred as-is as a bearer token in a `Authorization` HTTP header. The contents of the dialog token should normally not be considered by the clients, ie. the token should be treated as an opaque string. 

The altinn.no-portal will be using dialog tokens on all URLs associated with [write actions]({{<relref "../../front-end/write-actions">}}) and [front channel embeds]({{<relref "../../front-end/write-actions">}}). Other end user systems might also use the dialog token for API actions, subject to service specific protocols defined by the respective service owner.

## Receving and verifying dialog tokens (OAuth resource servers)

The resource server will with the help of dialog tokens be able to fully authenticate and authorize requests that are otherwise unauthenticated (ie. without cookies or any other state). The dialog tokens should be transferred as a bearer token using a `Authorization` HTTP header. 

Note that for clients that are browser-based, including the Altinn.no-portal, the resource server will also have to implement the [CORS-protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) in order to handle requests 

### List of Dialogporten specific claims

| Claim            | Description                                                                                                                                                        | Example                                                                           |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| c                | Authenticated as a consumer of Dialogporten. The prefix for either individuals (typically ID-porten), organizations (typically Maskinporten), or self-registered users. | `"urn:altinn:person:identifier-no::12018212345` `"urn:altinn:organization:identifier-no::991825827"` `"urn:altinn:party-identifier:username::someemail@example.com"` |
| l                | Security level of authentication (4)                                                                                                                                | `4`                                                                               |
| u                | Optional. If a provider token in Maskinporten has been used, the authenticated provider's organization number will be given here.                                     | `"urn:altinn:organization:identifier-no::991825827"`                                                                  |
| p                | Whom the consumer is acting on behalf of (if not themselves), i.e., who owns the relevant dialogue.                                                                 | `"urn:altinn:person:identifier-no::12018212345"` `"urn:altinn:organization:identifier-no::991825827"`  `"urn:altinn:party-identifier:username::someemail@example.com"` |
| i                | Unique identifier of the dialogue.                                                                                                                                  | `"e0300961-85fb-4ef2-abff-681d77f9960e"`                                           |
| s                | The service resource that the dialogue refers to.                                                                                                                   | `"urn:altinn:resource:super-simple-service"`                                      |
| a                | Authorized actions/authorization attributes.                                                                                                                        | `"read;write;sign;elementread,urn:altinn:subresource:authorizationattribute1"`                                    |

#### Example of decoded token

```json
{
  "alg": "EdDSA",
  "typ": "JWT",
  "kid" : "dp-2023-01" 
}
// .
{
  "c": "urn:altinn:person:identifier-no::12018212345", 
  "l": 4,  
  "u": "urn:altinn:organization:identifier-no::825827991",
  "p": "urn:altinn:organization:identifier-no::991825827", 
  "i": "e0300961-85fb-4ef2-abff-681d77f9960e",
  "s": "urn:altinn:resource:super-simple-service",
  "a": "read;write;sign;elementread,urn:altinn:subresource:autorisasjonsattributt1",
  "exp": 1672772834,
  "iss": "https://dialogporten.no",
  "nbf": 1672771934,
  "iat": 1672771934 
}
 
// .
// <signature>
```
### Token signature cipher

Dialog tokens utilizes a [Edwards-Curve Digital Signature Algorithm (EdDSA)](https://datatracker.ietf.org/doc/html/rfc8032) using the Ed25519 curve to sign the dialog tokens, making it possible to consumers to verify that the token has been issued by Dialogporten and trust the information in the claims. Also see [RFC 8037](https://datatracker.ietf.org/doc/html/rfc8037) for information about using EdDSA in JOSE contexts.

### Well-known endpoints

Dialogporten provides [OAuth 2.0 Authorization Server Metadata (RFC8414)](https://datatracker.ietf.org/doc/html/rfc8414) allowing for runtime key discovery, rotation and token validation. Consult the [OpenAPI specification]({{<relref "../../openapi/">}}) (tag "Metadata") for the well-known URLs for the given environment.

### Key sets and rotations
The JSON Web Key sets published on the well-known-endpoints will always contain at least two JWKs. All endpoints that accepts and verifies dialog tokens issued by Dialogporten, should allow tokens signed by any of the keys present in the key set for the given environment. 

The key set should be cached and refreshed with a frequency no more than 24 hours. Dialogporten will at any point introduce new keys into the key set, but will not sign any dialog tokens until the key has been published and available at the well-known endpoint for at least 48 hours. This will allow for consumers to refresh their caches and verify the signature of any token issued by Dialogporten.

### Token validation recommendations
Please consult [RFC 8725](https://datatracker.ietf.org/doc/html/rfc8725) and the aforementioned RFCs for information about best practices for JWS signature validation.


{{<children />}}

