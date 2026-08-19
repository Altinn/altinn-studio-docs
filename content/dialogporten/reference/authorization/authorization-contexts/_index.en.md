---
title: 'Authorization Contexts'
description: 'Reference information about authorization contexts'
weight: 15
toc: true
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

{{<notice warning>}}
Authorization contexts are an experimental feature and may change or be removed without a major version bump. See [issue #3978](https://github.com/Altinn/dialogporten/issues/3978) for details.
{{</notice>}}

## Introduction

See [getting started with authorization contexts]({{< relref "/dialogporten/getting-started/authorization/authorization-contexts" >}}) for a functional overview of authorization contexts and what they can be used for. This page covers the full write contract, validation rules, and the exact effect on the end-user API.

{{<notice info>}}
Authorization contexts are only considered on the single-dialog endpoints and the standalone transmission endpoints, i.e. when requesting a dialog or a transmission directly by ID. For dialog search/lists, authorization contexts are not considered.
{{</notice>}}

## Where authorization contexts can be set

An `authorizationContext` can be supplied on the service owner create and update endpoints, on the following properties:

| Surface | Property |
|---|---|
| API actions | `apiActions[].authorizationContext` |
| GUI actions | `guiActions[].authorizationContext` |
| Transmissions | `transmissions[].authorizationContext` |
| Dialog attachments | `attachments[].authorizationContext` |
| Transmission attachments | `transmissions[].attachments[].authorizationContext` |
| Transmission navigational actions | `transmissions[].navigationalActions[].authorizationContext` |

All six surfaces share exactly the same `authorizationContext` shape - an attachment or a navigational action can name an `action` just like an API or GUI action can, though in practice it will almost always be left unset (see the `action` field below).

This applies to the dialog create and update endpoints, and to the dedicated create/update-transmission endpoints.

**Read-back of the context itself is service-owner-only.** `authorizationContext` is included on the service owner read DTOs (the dialog `GET` response and the service-owner transmission endpoints), but is not present on any end-user DTO. This is a deliberate confidentiality property: an authorization context can name specific parties, and publishing that list to an end user would reveal which other parties may have access to a given part of the dialog. End users only ever see the *effects* of a context: `isAuthorized`, the masked fields or the exclusion described below, and `contextToken`.

GraphQL follows the same pattern: it exposes `contextToken` and the `excluded*` collections on the end-user entities, but not the authorization context itself.

## Fields

### `serviceResource`

Type `string`, optional.

Overrides the dialog's own service resource for this one check, pointing the evaluation at a different resource's policy. When set, the context is evaluated as a request against that resource alone - the dialog's own instance reference is not carried over, matching the same semantics as the legacy authorization attribute's resource override.

Must start with `urn:altinn:resource:` and otherwise follow the standard Altinn resource identifier format. Maximum length 255 characters.

The authenticated service owner must own the referenced resource. Referencing a resource the caller does not own fails the entire create or update with `403 Forbidden`.

### `additionalResourceAttribute`

Type `string`, optional.

A subresource or task matched within the *effective* resource's policy - for example `urn:altinn:task:Task_1` or `urn:altinn:subresource:mycustomresource`. Unlike a legacy authorization attribute, this never overrides the resource on its own; it's layered on top of whatever resource is in effect (the dialog's own, or the one set by `serviceResource`).

A bare name with no recognised namespace prefix is treated as `urn:altinn:subresource:<name>`.

Must not start with `urn:altinn:resource:` - use `serviceResource` for that. It also cannot reference an app (the `urn:altinn:app:` namespace, or a value expanding into an `app_{org}_{appId}` identifier) or an organization (`urn:altinn:org:`): the app is already carried by the resource registry entry that `serviceResource` names, and the owning organization is derived from the effective resource. Same format and length rules as `serviceResource`.

### `parties`

Type array of `string`, optional.

The parties the check is evaluated on behalf of, in addition to (or instead of) the dialog's own party - see `includeDialogParty` below. Access is granted if the PDP permits **any one** of the listed parties (OR semantics), not all of them.

- Maximum 3 entries. With `includeDialogParty: true`, the effective maximum number of parties evaluated per entity is 4.
- Entries must be unique.
- Must contain at least one entry unless `includeDialogParty` is `true`.
- Each entry must be a valid party identifier: `urn:altinn:organization:identifier-no:{orgnr}`, `urn:altinn:person:identifier-no:{fnr/dnr}`, `urn:altinn:party-identifier:username:{username}`, or an ID-porten e-mail identifier.

An authorization check with no parties to evaluate can never be authorized - it fails closed rather than granting access implicitly.

### `includeDialogParty`

Type `boolean`, default `false`.

When `true`, adds the dialog's own party to the set of parties being evaluated, in addition to any parties listed in `parties`.

`includeDialogParty: true` combined with `additionalResourceAttribute` is the direct replacement for a legacy subresource authorization attribute - the same party, narrowed to a subresource. `includeDialogParty: false` combined with an explicit `parties` list is the new capability: granting access to a part of the dialog for a party other than the dialog's own.

### `action`

Type `string`, optional, on every surface - there is no surface where it is required or unavailable.

The XACML action to evaluate. If omitted, defaults to `read`.

{{<notice warning>}}
Nothing at the API level stops you from leaving `action` unset on an API or GUI action - it is simply evaluated as `read`. Because these two surfaces almost always exist to guard something other than a plain read (`write`, `sign`, and so on), an unset `action` here is far more likely to be a mistake than an intentional choice - double-check it is actually set when giving an API or GUI action a context.
{{</notice>}}

Unlike the legacy authorization attribute, `action` is never derived from `serviceResource` or `additionalResourceAttribute` - narrowing the resource side of the check does not narrow the action side. A context that sets `additionalResourceAttribute` and leaves `action` unset still evaluates a plain `read` on the narrowed resource, and if a broader `read` rule already exists on the main resource, that rule can still match it - XACML target matching only checks that the attributes a rule requires are present, not that no other attributes are, so the extra resource attribute does not by itself exclude the broader rule. To get real narrowing, name a distinct `action` - for example `elementread` - and write (or reuse) a policy rule keyed on that action together with the narrowed resource.

Maximum length 255 characters.

On the end-user read surface, the entity's `action` property always reports the action that was actually evaluated: the context's `action` when it names one, and `read` when it does not. On the service owner read surface the two are kept apart - the legacy top-level `action` reads back as an empty string for an entity that uses a context, and the evaluated action is found in `authorizationContext.action`.

### `unauthorizedPresentation`

Type `string` enum, values `Disabled` or `Excluded`. **Required.**

Although not marked as a required property in the OpenAPI schema, omitting this field is rejected at validation time - there is no default. It must be set explicitly to one of the two values below.

- **`Disabled`** keeps the entity in the collection it belongs to, but masks its URLs and embedded content references. This is the behaviour equivalent to the legacy authorization attribute mechanism, and is the recommended default when migrating an existing dialog with no intent to change what end users see.
- **`Excluded`** removes the entity from that collection entirely, leaving nothing but its `id` and `createdAt` in a sibling `excluded*` array. See the next two sections for the exact effect.

## What an unauthorized end user sees

### `Disabled`: kept in place, URLs masked

The entity stays where it is in its array, `isAuthorized` is `false`, and `contextToken` is `null`. Everything the entity says about itself remains readable; only the parts that would let the end user act on it are replaced.

URLs are replaced with one of two placeholder values: `urn:dialogporten:unauthorized` for an access denial, and `urn:dialogporten:expired` for an expired attachment or navigational action URL - but the expired placeholder is only used when the caller is authorized; a URL that is both unauthorized and expired shows the unauthorized placeholder.

| Surface | Effect |
|---|---|
| GUI action | `url` is replaced with the placeholder. `title`, `prompt`, `priority`, `httpMethod`, `isDeleteDialogAction`, `action` and `id` are all kept. |
| API action | Every endpoint `url` is replaced with the placeholder; the other endpoint fields (`version`, `httpMethod`, `documentationUrl`, `requestSchema`, `responseSchema`, `deprecated`, `sunsetAt`) are kept, as are `name` and `id`. |
| Transmission | The content reference (used for [front channel embeds]({{< relref "/dialogporten/reference/front-end/front-channel-embeds" >}})) is replaced with the placeholder. `content.title` and `content.summary` remain readable. `sender`, `type`, `extendedType`, `externalReference`, `relatedTransmissionId`, `attachments` and `navigationalActions` all remain, with each child evaluated on its own terms, per the rows below. |
| Dialog attachment | Every URL is replaced with the placeholder. `displayName`, `name` and `expiresAt` are kept. |
| Transmission attachment | Every URL is replaced with the placeholder. `displayName`, `name` and `expiresAt` are kept. |
| Transmission navigational action | `url` is replaced with the placeholder. `title` and `expiresAt` are kept. |

### `Excluded`: removed from its collection

The entity is not in the response at all. There is no element with `isAuthorized: false` to find, and no `contextToken`. All that is left is a stub in a sibling array, carrying two fields and nothing else:

```json
{
  "id": "0194a1b2-3c4d-7e5f-8a9b-0c1d2e3f4a5b",
  "createdAt": "2026-01-15T09:12:44.512Z"
}
```

`createdAt` is what lets an end-user system place the gap: it can show that something it cannot see sits between two transmissions it can, rather than presenting a list that is silently short.

Each collection that can carry an authorization context has its own shadow array, named after it and sitting directly beside it:

| Collection | Shadow array |
|---|---|
| `apiActions` | `excludedApiActions` |
| `guiActions` | `excludedGuiActions` |
| `attachments` | `excludedAttachments` |
| `transmissions` | `excludedTransmissions` |
| `transmissions[].attachments` | `transmissions[].excludedAttachments` |
| `transmissions[].navigationalActions` | `transmissions[].excludedNavigationalActions` |

All six are nullable and omitted from the JSON entirely when nothing was excluded, which is the normal case - treat an absent array exactly like an empty one. GraphQL exposes the same six fields, typed `[ExcludedElement!]`.

```jsonc
{
  "transmissions": [
    {
      "id": "...",
      "attachments": [ /* ... */ ],
      "navigationalActions": [ /* ... */ ],
      "excludedAttachments": [ { "id": "...", "createdAt": "..." } ],
      "excludedNavigationalActions": [ { "id": "...", "createdAt": "..." } ]
    }
  ],
  "guiActions": [ /* ... */ ],
  "apiActions": [ /* ... */ ],
  "attachments": [ /* ... */ ],
  "excludedTransmissions": [ { "id": "...", "createdAt": "..." } ],
  "excludedGuiActions": [ /* ... */ ],
  "excludedApiActions": [ /* ... */ ],
  "excludedAttachments": [ /* ... */ ]
}
```

{{<notice warning>}}
There are six shadow arrays and no single place that lists everything withheld from a dialog. A client answering "what changed that I am not allowed to see?" has to gather all six and merge them by `createdAt` - reading only one of them under-reports silently, with no error to catch it.
{{</notice>}}

Four consequences worth keeping in mind:

1. **`isAuthorized: false` means exactly one thing.** It marks an entity that exists, is described, and cannot be used - never an entity that has been withheld. An excluded entity is simply absent.
2. **An excluded transmission takes its children with it.** Only the transmission's own stub appears; its attachments and navigational actions are not reported separately, in that transmission's shadow arrays or anywhere else. A child with its own `Excluded` context inside a transmission that is only `Disabled` (and denied), however, is excluded individually, into that transmission's own shadow array.
3. **An excluded navigational action discloses an `id` it would not otherwise have.** Navigational actions carry no `id` in the end-user API, but their stubs do. It is an identifier and nothing more - it reveals nothing about the action itself.
4. Dialog-level content (`content.mainContentReference`) is **not** governed by an authorization context at all - dialog content has no context of its own. Its visibility is gated purely on whether the caller has read access to the dialog's main resource.

## Endpoint behaviour for excluded transmissions

| Endpoint | Behaviour |
|---|---|
| `GET /dialogs/{id}` | Excluded transmissions leave `transmissions` and appear as stubs in `excludedTransmissions`. |
| `GET /dialogs/{id}/transmissions/{transmissionId}` | `403 Forbidden` for an excluded transmission - not `404`. The dialog response already publishes that the transmission exists, so denying its existence here would contradict it. The dialog-level check ahead of it does return `404` for a dialog the caller may not see; there, the dialog's existence is what is withheld. |
| `GET /dialogs/{id}/transmissions` | Excluded transmissions are left out of the array, with no stub. The response is a bare JSON array with nowhere to hang a top-level shadow list, so use the dialog endpoint when you need to know that something was withheld. Exclusions *within* a returned transmission are reported as usual, on the transmission itself. |

## Parent-first narrowing

A child authorization context can only narrow access, never widen it. Access to the parent is always a precondition:

- For a transmission's attachments and navigational actions, the transmission's own authorization is the precondition - a permissive child context inside a denied transmission grants nothing, and its `contextToken` is `null` regardless of what the child context alone would otherwise permit.
- For dialog-level attachments, the precondition is read access to the dialog's main resource. A dialog attachment with no context of its own is never individually restricted - it inherits the dialog's own access.

If the caller cannot read the dialog's main resource at all, `GET /dialogs/{id}` fails with `403 Forbidden` before any per-entity evaluation runs, unless list authorization grants a narrower form of access - in which case the dialog is returned with its actions flagged as unauthorized rather than the request being rejected outright. The standalone transmission endpoints have no such fallback: without main-resource access they answer `404 Not Found`, as if the dialog did not exist.

## Multi-party evaluation

- Access to a check is granted if **any** of its permitted parties is granted - OR semantics across parties, same as within `parties` itself.
- Each check is evaluated once per party it's associated with. Identical resource/action pairs across parties are consolidated into a single evaluation, but the party cap (3, or 4 with `includeDialogParty`) is still a real cost control: every distinct combination of resource, action and party is one evaluation against Altinn Authorization, and a dialog with many authorization contexts multiplies this quickly.
- If the correlation between requested checks and returned decisions doesn't line up as expected for any reason, every check for the affected request is denied - the system fails closed rather than guessing.
- A self-identified (system) user's *own* party is evaluated using its system user identity; parties named directly in a context's `parties` list are evaluated as themselves and will simply be denied if the PDP does not recognise them as delegatable to the caller - a system user cannot represent an arbitrary party by naming it in a context.

## Mutual exclusivity with `authorizationAttribute`

An entity cannot combine `authorizationContext` with the legacy `authorizationAttribute` field:

- On API actions and GUI actions, `authorizationAttribute` must be absent when `authorizationContext` is present, and the top-level `action` field must be absent or empty too - use `authorizationContext.action` instead. Conversely, `action` is required when there is no context. On the service owner read surface such an entity reads back with `action` as an empty string, so a `GET` response can be sent straight back to `PUT` unchanged.
- On transmissions, `authorizationAttribute` must be absent when `authorizationContext` is present. There is no top-level `action` on transmissions.
- Attachments and transmission navigational actions never had `authorizationAttribute` - only `authorizationContext`.

The same rules apply on the update endpoints and on the dedicated create/update-transmission endpoints.

## Migration from `authorizationAttribute`

| Legacy `authorizationAttribute` | Legacy derived action | Equivalent `authorizationContext` |
|---|---|---|
| `urn:altinn:subresource:foo` (transmission) | `read` | `{ "action": "elementread", "additionalResourceAttribute": "urn:altinn:subresource:foo", "includeDialogParty": true, "unauthorizedPresentation": "Disabled" }` |
| `urn:altinn:task:Task_1` (transmission) | `read` | `{ "action": "elementread", "additionalResourceAttribute": "urn:altinn:task:Task_1", "includeDialogParty": true, "unauthorizedPresentation": "Disabled" }` |
| `urn:altinn:resource:other` (transmission) | `read` | `{ "serviceResource": "urn:altinn:resource:other", "includeDialogParty": true, "unauthorizedPresentation": "Disabled" }` |
| `foo` (bare, transmission) | `read` | `{ "action": "elementread", "additionalResourceAttribute": "urn:altinn:subresource:foo", "includeDialogParty": true, "unauthorizedPresentation": "Disabled" }` |
| Action `sign` + attribute `urn:altinn:task:Task_1` (GUI/API action) | `sign` on that attribute | `{ "action": "sign", "additionalResourceAttribute": "urn:altinn:task:Task_1", "includeDialogParty": true, "unauthorizedPresentation": "Disabled" }` - remove the top-level `action` |
| Action `write`, no attribute (GUI/API action) | `write` on main resource | `{ "action": "write", "includeDialogParty": true, "unauthorizedPresentation": "Disabled" }` |

The `action: "elementread"` on the first, second and fourth rows is a deliberate choice, not a fixed name - see the next point.

Five things to be aware of when migrating:

1. **Legacy authorization attributes no longer derive a distinct action for subresource/task narrowing.** They used to derive `transmissionread` in that case, specifically so the request would not accidentally match a broader `read` rule on the main resource; that derivation is gone, and every legacy attribute now derives a plain `read`, whatever it refers to. A subresource or task named in a legacy attribute can therefore only ever broaden access through a dedicated policy rule, never narrow it - see [using authorization attributes on transmissions]({{< relref "/dialogporten/reference/authorization/attributes" >}}#using-authorization-attributes-on-transmissions). If you relied on `transmissionread` to narrow a transmission's visibility, and want to keep doing so after migrating, name an explicit, distinct `action` on the authorization context (`elementread` in the table above is just an example name) and update your policy to match on that action instead of `transmissionread` - `authorizationContext.action` is the only place a narrowing action can still be named.
2. **A related behaviour change applies to legacy entities regardless of whether you migrate them.** Authorization on a legacy action with no `authorizationAttribute` now requires that action to be permitted on the exact resource the entity refers to. Previously, it could also be satisfied by *any other entity in the same dialog* having that action permitted on some resource, including the dialog's main resource - which meant, for example, a `write` GUI action with no authorization attribute could be granted purely because some unrelated entity in the dialog also had a permitted `write`. It now needs `write` on the main resource specifically. This is a defect fix rather than a live migration risk today, but any future policy shaped the old way would be affected - if your service uses several distinct actions across entities sharing the same dialog, it's worth double-checking your policies.
3. **`unauthorizedPresentation` has no legacy equivalent and must be chosen explicitly.** Legacy behaviour (mask URLs, keep content) corresponds to `Disabled`. Migrating with `Excluded` instead is a visible change for end users, and one their systems have to be ready for: the entity disappears from the collection it used to sit in.
4. **`contextToken` replaces the dialog token for migrated entities.** The moment an entity gains an authorization context, its grant disappears from the dialog token's list of authorized actions - a receiving service that authorizes purely from the dialog token will start denying requests for that entity. Coordinate the receiving side to use the entity's [context token]({{< relref "/dialogporten/reference/authorization/context-tokens" >}}) before migrating.
5. **A wire-level difference in the resource attribute is easy to miss.** For `authorizationAttribute`, Dialogporten has always sent a subresource attribute on the underlying authorization request - a sentinel value, `main`, when no attribute was supplied at all. An authorization context that neither sets `serviceResource` nor `additionalResourceAttribute` (pure party-only narrowing) sends no subresource attribute at all. A policy rule that matches specifically on the subresource attribute being `main` will stop matching once you migrate to a plain party-narrowed context. Policies that don't reference the attribute are unaffected.

## Validation errors

| Payload problem | Message |
|---|---|
| More than 3 entries in `parties` | `'Parties' cannot contain more than 3 parties.` |
| The same party listed twice in `parties` | `Can not contain duplicate items: [...].` |
| `parties: []` with `includeDialogParty: false` | `'Parties' must contain at least one party when 'IncludeDialogParty' is false.` |
| `additionalResourceAttribute` starting with `urn:altinn:resource:` | `'AdditionalResourceAttribute' cannot contain a service resource reference ('urn:altinn:resource:...'); use 'ServiceResource' instead.` |
| `additionalResourceAttribute` referencing an app | `'AdditionalResourceAttribute' cannot reference an app (the 'urn:altinn:app:' namespace, or a value expanding into an 'app_{org}_{appId}' identifier); 'ServiceResource' already carries the resource-registry entry for an app, and there is no equivalent per-app override for this field.` |
| `additionalResourceAttribute` referencing an organization | `'AdditionalResourceAttribute' cannot reference an organization (the 'urn:altinn:org:' namespace); the organization owning the effective resource is derived from the resource itself.` |
| `serviceResource` not starting with `urn:altinn:resource:` | `'ServiceResource' must start with 'urn:altinn:resource:'.` |
| `unauthorizedPresentation` omitted | `'UnauthorizedPresentation' is required and must be either 'Disabled' or 'Excluded'.` |
| Top-level `action` combined with `authorizationContext` on a GUI or API action | `'Action' cannot be combined with 'AuthorizationContext'; use 'AuthorizationContext.Action' instead.` |
| Top-level `action` omitted on a GUI or API action with no `authorizationContext` | `'Action' must not be empty when 'AuthorizationContext' is not supplied.` |
| `authorizationAttribute` combined with `authorizationContext` | `'AuthorizationAttribute' cannot be combined with 'AuthorizationContext'.` |
| `serviceResource` referencing a resource the caller does not own | `403 Forbidden`, `Not allowed to reference the following unowned resources: [...]` |
| `additionalResourceAttribute` referencing an app the caller does not own | `403 Forbidden`, `Not allowed to reference the following unowned apps: [...]` |

## Contract reference

{{<swaggerdisplayentity "V1CommonAuthorizationContexts_AuthorizationContext">}}

The stub used in the six `excluded*` collections on the end-user API:

{{<swaggerdisplayentity "V1EndUserCommon_ExcludedElement">}}

**Read more**

- {{<link "../../../getting-started/authorization/authorization-contexts">}}
- {{<link "../context-tokens">}}
- {{<link "../attributes">}}

{{<children />}}
