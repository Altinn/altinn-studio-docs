---
title: 'Context Tokens'
description: 'Reference information about context tokens'
weight: 25
---

{{<notice warning>}}
Context tokens are an experimental feature and may change or be removed without a major version bump. See [issue #3978](https://github.com/Altinn/dialogporten/issues/3978) for details.
{{</notice>}}

## Introduction

See [getting started with authorization contexts]({{< relref "/dialogporten/getting-started/authorization/authorization-contexts" >}}) and the [technical reference for authorization contexts]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) for the write contract that causes a context token to be issued.

A context token asserts one PDP-verified grant on one entity of one dialog, for the party or parties Altinn Authorization actually permitted for that specific check.

Dialogporten issues two token types, both signed with the same keys and distinguished by the JOSE `typ` header: the [dialog token]({{< relref "/dialogporten/reference/authorization/dialog-tokens" >}}), which carries `"JWT"`, and the context token described on this page, which carries `"dialogcontexttoken+jwt"`. Receiving services must validate the `typ` header and reject a token whose type they do not expect; in particular, a service expecting a dialog token must reject `"dialogcontexttoken+jwt"`, and a service expecting a context token must reject `"JWT"`.

## Usage for end-user systems (OAuth clients)

A `contextToken` is included on the six end-user entity types that can carry an authorization context: API actions, GUI actions, transmissions, dialog attachments, transmission attachments, and transmission navigational actions. It's present both in the single-dialog response and on the standalone transmission endpoints (`GET` by ID and search).

`contextToken` is present if, and only if, the entity has an authorization context *and* the current user is authorized for it. Otherwise it is `null` - including whenever `isAuthorized` is `false`, and on any entity that has no authorization context at all.

An entity whose context sets `unauthorizedPresentation` to `Excluded` never reaches you as an unauthorized entity in the first place: it is removed from its collection, and only its id and creation time appear in the sibling `excluded*` array. There is no `contextToken` to read there, and none is needed - see [what an unauthorized end user sees]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}#what-an-unauthorized-end-user-sees).

Treat the context token as an opaque string, the same as the dialog token.

A context token should be used instead of the dialog token against that entity's URLs. For a transmission, this includes [front channel embeds]({{< relref "/dialogporten/reference/front-end/front-channel-embeds" >}}).

### Context token lifetime

A context token's lifetime (`exp` claim) is **10 minutes**, the same as the dialog token - short-lived to limit misuse after rights are revoked. Refetch the dialog or the transmission to get a fresh set of tokens.

### Using the .NET SDK

Two things to be aware of when consuming context tokens from the .NET SDK:

1. **Referencing `AuthorizationContext`, `ContextToken`, or `DialogTokenTypes.DialogContextToken` produces a compiler warning, `DPEXP001`.** This is expected, not a build error to work around - every generated SDK member touching this feature is marked experimental, pointing back at [issue #3978](https://github.com/Altinn/dialogporten/issues/3978). Suppress it with `#pragma warning disable DPEXP001` around the relevant code, or `<NoWarn>DPEXP001</NoWarn>` in the project file, once you've decided to take the dependency.
2. **`DialogTokenValidator.ValidTokenTypes` defaults to the dialog token alone.** To validate context tokens, add `DialogTokenTypes.DialogContextToken` to that collection explicitly - out of the box, the validator rejects a context token the same way it would reject any other unexpected `typ`. This is a deliberate default: it's stricter unless you opt in, rather than accepting any signed token regardless of type.

## Receiving and verifying context tokens (OAuth resource servers)

### Token type

A context token's `typ` header is `dialogcontexttoken+jwt`. The dialog token's own `typ` is the generic `"JWT"` it has always been - it is not changing. A receiving service must validate `typ` and fail closed on anything it does not expect. The two token types are signed with the same keys, so the signature alone proves nothing about which type of token you're holding.

### List of claims

| Claim | Meaning | Shared with the dialog token? |
|---|---|---|
| `jti` | JWT id - a fresh, unique identifier per token | Shared |
| `c` | Authenticated consumer. For a system user, this is the consumer organisation, with `y`/`o` carrying the system user | Shared |
| `y` | System user identifier (only present when a system user authenticated) | Shared |
| `o` | System user's organisation (only present when a system user authenticated) | Shared |
| `u` | Supplier organisation from a Maskinporten supplier token (optional) | Shared |
| `l` | Authentication level | Shared |
| `p` | The dialog's party - who owns the dialog | Shared |
| `s` | The dialog's service resource | Shared |
| `i` | Dialog id | Shared |
| `a` | On a context token: the single XACML action of this grant | Name shared, shape differs - see below |
| `e` | Entity id (UUIDv7) of the entity this token is scoped to | Context token only |
| `t` | Entity type discriminator - see the table below | Context token only |
| `r` | Effective resource of the grant. Omitted when the grant applies to the dialog's own resource | Context token only |
| `pp` | Array of the parties the PDP actually permitted for this grant | Context token only |
| `iss` | Issuer - the Dialogporten base URI plus `/api/v1` | Shared |
| `iat`, `nbf`, `exp` | Issued-at, not-before, expiry (`exp` is `iat` plus 10 minutes) | Shared |

#### The `a` claim differs between the two token types

On the dialog token, `a` is a `;`-separated list of `action` or `action,attribute` entries, for example `"read;write;sign;elementread,urn:altinn:subresource:foo"`.

On a context token, `a` is always a single action string, for example `"sign"`.

Grants derived from authorization contexts are deliberately excluded from the dialog token's `a` claim entirely - they only ever appear as the `a` claim of their own context token.

#### `p` versus `pp`

This is the claim pair that matters most for correct authorization, and deserves its own explanation:

- `p` is always the dialog's own party, regardless of how the grant was obtained.
- `pp` is the set of parties the PDP actually permitted for this specific check.

These are frequently **different**. With `includeDialogParty: false` and an explicit `parties` list on the authorization context, `pp` will not contain `p` at all - the token asserts a grant for a party other than the dialog's own.

**Authorize against `pp`, not `p`.** `p` tells you which dialog you're looking at; `pp` tells you on whose behalf the caller is entitled to act on this specific entity. Treating `p` as the authorization subject defeats the purpose of the claim.

#### The `r` claim

The effective resource of the grant: the authorization context's `serviceResource` if it set one, otherwise its `additionalResourceAttribute`.

`r` is omitted entirely when the context set neither - i.e. when the grant applies to the dialog's own resource with only party-based narrowing. Treat an absent `r` as "the resource named in `s`".

#### Entity types (`t`)

| `t` | Entity | Where it appears in the end-user API |
|---|---|---|
| `apiaction` | API action | `apiActions[]` |
| `guiaction` | GUI action | `guiActions[]` |
| `attachment` | Dialog attachment | `attachments[]` |
| `transmission` | Transmission | `transmissions[]` |
| `transmissionattachment` | Transmission attachment | `transmissions[].attachments[]` |
| `navigationalaction` | Transmission navigational action | `transmissions[].navigationalActions[]` |

#### Example of decoded token

```json
{
  "alg": "EdDSA",
  "typ": "dialogcontexttoken+jwt",
  "kid": "dp-2023-01"
}
// .
{
  "jti": "8e1f2c3d-4b5a-6978-8a9b-0c1d2e3f4a5b",
  "c": "urn:altinn:person:identifier-no:12018212345",
  "l": 4,
  "p": "urn:altinn:organization:identifier-no:991825827",
  "s": "urn:altinn:resource:super-simple-service",
  "i": "e0300961-85fb-4ef2-abff-681d77f9960e",
  "e": "0194a1b2-3c4d-7e5f-8a9b-0c1d2e3f4a5b",
  "t": "guiaction",
  "a": "sign",
  "r": "urn:altinn:task:Task_1",
  "pp": ["urn:altinn:organization:identifier-no:912345678"],
  "iss": "https://platform.altinn.no/dialogporten/api/v1",
  "iat": 1672771934,
  "nbf": 1672771934,
  "exp": 1672772534
}
// .
// <signature>
```

Two things to note in the example above:

- `p` (`991825827`) is the dialog owner; `pp` (`912345678`) is the party the PDP actually permitted. They are different - authorize on `pp`.
- `exp - iat` is `600` seconds, i.e. 10 minutes.

For contrast, the dialog token issued for the same request:

```json
{
  "alg": "EdDSA",
  "typ": "JWT",
  "kid": "dp-2023-01"
}
// .
{
  "jti": "1a2b3c4d-5e6f-7089-8a9b-0c1d2e3f4a5b",
  "c": "urn:altinn:person:identifier-no:12018212345",
  "l": 4,
  "p": "urn:altinn:organization:identifier-no:991825827",
  "s": "urn:altinn:resource:super-simple-service",
  "i": "e0300961-85fb-4ef2-abff-681d77f9960e",
  "a": "read",
  "iss": "https://platform.altinn.no/dialogporten/api/v1",
  "iat": 1672771934,
  "nbf": 1672771934,
  "exp": 1672772534
}
```

Note that `sign` does not appear in the dialog token's `a` claim - grants derived from authorization contexts are excluded by design.

### Token signature cipher

Context tokens use the same [Edwards-Curve Digital Signature Algorithm (EdDSA)](https://datatracker.ietf.org/doc/html/rfc8032) with the Ed25519 curve as the dialog token, and the same `kid` values. See the [dialog token reference]({{< relref "/dialogporten/reference/authorization/dialog-tokens" >}}#token-signature-cipher) for details.

### Well-known endpoints

Dialogporten provides [OAuth 2.0 Authorization Server Metadata (RFC 8414)](https://datatracker.ietf.org/doc/html/rfc8414) for runtime key discovery:

- `{base}/api/v1/.well-known/oauth-authorization-server` returns the `issuer` and `jwks_uri` for the given environment.
- `{base}/api/v1/.well-known/jwks.json` returns the key set itself.

`issuer` is the Dialogporten base URI plus `/api/v1`. The per-environment values are:

| Environment | `issuer` |
|---|---|
| Production | `https://platform.altinn.no/dialogporten/api/v1` |
| Staging (TT02) | `https://platform.tt02.altinn.no/dialogporten/api/v1` |
| Test (at23) | `https://platform.at23.altinn.cloud/dialogporten/api/v1` |

Both operations are also described in the OpenAPI specification, tag "Metadata".

### Key sets and rotations

Context tokens are signed with the same keys as the dialog token, so the same rules apply - see [key sets and rotations]({{< relref "/dialogporten/reference/authorization/dialog-tokens" >}}#key-sets-and-rotations) on the dialog token reference page.

### Validation checklist for receiving services

1. Verify the signature against the JWKS, selecting the key by `kid`.
2. Verify `typ == "dialogcontexttoken+jwt"`. Reject `"JWT"` (the dialog token's `typ`) here.
3. Verify `iss` matches the expected Dialogporten issuer for the environment.
4. Verify `exp`/`nbf` with minimal clock skew, given the 10-minute lifetime.
5. Verify `i` (dialog id) matches the dialog you expect, if you know it.
6. Verify `e` matches the id of the entity whose URL was called, and `t` matches its type. This is what stops a token issued for one entity being replayed against another.
7. Verify `a` is the action you're about to perform.
8. Verify the resource: `r` if present, otherwise `s`.
9. Authorize on `pp` - the caller may act on behalf of any party in `pp`, and only those. Do not use `p`.
10. Verify `l` meets your minimum required authentication level.
11. Fail closed on anything unrecognised. See [RFC 8725](https://datatracker.ietf.org/doc/html/rfc8725) for general JWS validation best practices.

{{<children />}}
