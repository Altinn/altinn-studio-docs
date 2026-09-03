---
title: 'Using Authorization Contexts'
description: 'How to restrict access to individual actions, transmissions, attachments and navigational actions'
weight: 25
---

{{<notice warning>}}
Authorization contexts are an experimental feature and may change or be removed without a major version bump. See [issue #3978](https://github.com/Altinn/dialogporten/issues/3978) for details.
{{</notice>}}

## Introduction

Use an [authorization context]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) when different parts of the same dialog need different access rules - for example, when a signing action should only be available to an external auditor, or when a transmission should be visible to a party other than the one who owns the dialog.

## Restricting a transmission to a subresource

The like-for-like replacement for a legacy authorization attribute that narrows access within the dialog's own resource - for example, a transmission that should only be accessible to whoever has access to a particular task in the case-handling process.

```jsonc
{
  "transmissions": [
    {
      "type": "Information",
      "sender": { "actorType": "ServiceOwner" },
      "content": { /* ... */ },
      "authorizationContext": {
        // "action" defaults to "read" if left out - but a plain read rule on the main resource
        // would then also match this narrowed request, defeating the narrowing. Name a distinct
        // action here (any name of your choosing) and key your policy rule on that action plus
        // the task, exactly like the old, automatically-derived "transmissionread" used to.
        "action": "elementread",
        "additionalResourceAttribute": "urn:altinn:task:Task_1",
        "includeDialogParty": true,
        "unauthorizedPresentation": "Disabled"
      }
    }
  ]
}
```

## Granting access to a party that does not own the dialog

The capability a legacy authorization attribute could not express at all: exposing a transmission to a party other than the dialog's own, without also granting it to the dialog owner.

```jsonc
{
  "transmissions": [
    {
      "type": "Information",
      "sender": { "actorType": "ServiceOwner" },
      "content": { /* ... */ },
      "authorizationContext": {
        // Access is evaluated ONLY for these parties - the dialog's own party is excluded
        // because includeDialogParty is false. OR semantics: any one permitted party grants
        // access. Maximum 3 entries.
        "parties": [
          "urn:altinn:organization:identifier-no:912345678",
          "urn:altinn:person:identifier-no:12018212345"
        ],
        "includeDialogParty": false,
        // The transmission leaves the "transmissions" array for everyone else, and only its id and
        // creation time appear in "excludedTransmissions" beside it.
        "unauthorizedPresentation": "Excluded"
      }
    }
  ]
}
```

Because no `serviceResource` or `additionalResourceAttribute` is set, the check evaluates a plain `read` against the dialog's own resource, for the listed parties only.

## Pointing at another service's policy

Set `serviceResource` when the part of the dialog you're restricting should be governed by a different resource's policy entirely, rather than a subresource within the dialog's own policy. Two things follow from this:

- The dialog's own instance reference stops applying to this entity - the check is evaluated purely against the named resource.
- You must own the referenced resource. Referencing a resource you don't own fails the whole create or update with `403 Forbidden`.

## Restricting an attachment or a navigational action

Attachments and navigational actions carry the same authorization context shape as any other surface, including `action` - but since these entities are only ever fetched or viewed, not acted upon, there is rarely a reason to name anything other than the default `read`. Access to the parent (the dialog for a dialog-level attachment, the transmission for a transmission attachment or navigational action) is still a precondition; a permissive context on the child never grants access if the parent itself is denied.

```jsonc
{
  "attachments": [
    {
      "displayName": [{ "languageCode": "en", "value": "Auditor report" }],
      "urls": [{ "url": "https://example.com/files/auditor-report.pdf", "consumerType": "Gui" }],
      "authorizationContext": {
        "additionalResourceAttribute": "urn:altinn:subresource:auditor-documents",
        "includeDialogParty": true,
        "unauthorizedPresentation": "Excluded"
      }
    }
  ]
}
```

## Choosing between `Disabled` and `Excluded`

`unauthorizedPresentation` is required on every authorization context, and has no default:

- `Disabled` masks URLs and embedded content references but keeps the entity in its list, with the rest of its content visible. This is what the legacy authorization attribute mechanism has always done, so it's the recommended choice when migrating an existing dialog without intending to change what end users see.
- `Excluded` removes the entity from its list altogether and records only its id and creation time in the sibling `excluded*` array. Use this when the entity's content and metadata should not be disclosed at all - for example, a transmission naming a party the end user shouldn't know is involved.

`Excluded` still tells an end-user system that *something* is withheld, and when it was created, so it can render a gap in a transmission thread rather than a silently shorter list. If even that is too much, an authorization context is the wrong tool - do not put the entity on the dialog in the first place.

See the [field reference]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}#what-an-unauthorized-end-user-sees) for the exact effect on every field, per surface.

## Calling the protected endpoint

End-user systems send the ordinary [dialog token]({{< relref "/dialogporten/reference/authorization/dialog-tokens" >}}) against the entity's URL, exactly as for any other part of the dialog. What differs is on the receiving side: a grant derived from an authorization context is not listed among the token's authorized actions (`a`). Instead, the token's `e` claim lists every context-carrying entity the end user is authorized for, so after verifying the token as usual, check that the entity the request is for is listed there - by its id, or by a `tokenRef` you set on the context:

```jsonc
{
  "attachments": [
    {
      "displayName": [{ "languageCode": "en", "value": "Auditor report" }],
      "urls": [{ "url": "https://example.com/files/auditor-report.pdf", "consumerType": "Gui" }],
      "authorizationContext": {
        "additionalResourceAttribute": "urn:altinn:subresource:auditor-documents",
        "includeDialogParty": true,
        // Listed in the dialog token's "e" claim instead of the attachment's id, so the receiving
        // service can recognize the grant without knowing Dialogporten's entity ids. Max 50 characters.
        "tokenRef": "auditor-report-2026",
        "unauthorizedPresentation": "Excluded"
      }
    }
  ]
}
```

Use `tokenRef` whenever your receiving service does not track Dialogporten entity ids. See the [validation recommendations]({{< relref "/dialogporten/reference/authorization/dialog-tokens" >}}#token-validation-recommendations) for the full checklist.

{{<notice warning>}}
While Dialogporten will check authorization and mask or exclude the entity when the check fails, the service owner system MUST perform its own authorization based on the same policy
{{</notice>}}

## Migrating an existing dialog

`authorizationContext` and `authorizationAttribute` cannot both be set on the same entity. When migrating:

- Remove the entity's `authorizationAttribute`, and on API/GUI actions the top-level `action` as well - use `authorizationContext.action` instead.
- If the attribute you're migrating narrowed a transmission to a subresource or task, don't leave `authorizationContext.action` unset - it defaults to `read`, which a broad `read` rule on the main resource will still match. Name your own `action` (see the example above) and update your policy to key on it, or the migrated entity will end up more broadly visible than it was before.
- Coordinate with whoever validates the dialog token on the receiving side first: the moment an entity gains a context, its grant disappears from the token's authorized actions (`a`) and the entity is instead listed in the `e` claim, by id or `tokenRef`.
- Double-check policies that combine several distinct actions across entities in the same dialog - a defect in the legacy authorization check that used to grant broader access than intended has been fixed, and while it does not affect any known production policy today, it's worth verifying against your own.

See the [full migration table]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}#migration-from-authorizationattribute) for the exact translation from each legacy shape.

**Read more**

- {{<link "../../../reference/authorization/authorization-contexts">}}
- {{<link "../../../reference/authorization/dialog-tokens">}}
- {{<link "../creating-dialogs">}}

{{<children />}}
