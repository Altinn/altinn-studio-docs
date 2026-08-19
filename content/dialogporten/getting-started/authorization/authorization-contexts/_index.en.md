---
title: 'Authorization Contexts'
description: 'Learn how authorization contexts give fine-grained, multi-party access control on individual parts of a dialog'
weight: 25
---

{{<notice warning>}}
Authorization contexts are an experimental feature and may change or be removed without a major version bump. See [issue #3978](https://github.com/Altinn/dialogporten/issues/3978) for details.
{{</notice>}}

## Introduction

An authorization context is an explicit description of the authorization question Dialogporten asks Altinn Authorization about one part of a dialog: which action, on which resource, on behalf of which parties.

It replaces [authorization attributes]({{< relref "/dialogporten/getting-started/authorization/attributes" >}}), which encoded all of that in a single string whose meaning depended on its prefix, and which always evaluated a fixed action - `read` - that you could not choose yourself.

The explicit shape buys you several things an authorization attribute could not express:

- more than one party the check can be evaluated against
- an action you name yourself, rather than one derived from the shape of a string
- a resource override and a subresource attribute as separate fields, so a context can layer a subresource on top of the dialog's own resource without discarding it
- control over what an unauthorized end user sees

## Which parts of a dialog can carry one

An authorization context can be set on six different parts of a dialog:

1. API actions
2. GUI actions
3. Transmissions
4. Dialog attachments
5. Transmission attachments
6. Transmission navigational actions

Attachments are a single underlying concept regardless of whether they sit on the dialog root or on a transmission, so there are five distinct kinds of authorization context, expressed on six carrying surfaces.

## A sequence diagram

{{<mermaid>}}
sequenceDiagram
autonumber
participant SBS as End-user system
participant DP as Dialogporten
participant AA as Altinn Authorization
participant TT as Service Provider
SBS->>DP: Fetch dialog
DP->>DP: Flatten dialog into authorization checks
DP->>AA: Authorize checks (one evaluation per check per party)
AA->>DP: Return decisions
DP->>DP: Determine isAuthorized per entity, issue a context token per authorized entity
DP->>SBS: Return dialog + dialog token + context tokens
SBS->>TT: Call the entity's endpoint, supply its context token
TT->>TT: Validate typ, signature and claims
{{</mermaid>}}
{{<center>}}_Diagram showing the overall flow for a dialog with authorization contexts. As with the dialog token, note step 8, where the service provider authorizes the request from the context token's claims, without having to make a request back to Altinn Authorization._{{</center>}}

## What an end user sees when access is denied

Each authorization context sets an `unauthorizedPresentation`, either `Disabled` or `Excluded`, which decides what an unauthorized end user sees for that part of the dialog.

With `Disabled`, the entity stays in its list with its content intact, but its URLs - and any embedded content reference - are replaced with a placeholder. The end user can see that the action, transmission or attachment exists, and that it is not available to them.

With `Excluded`, the entity leaves its list entirely, and nothing but its id and creation time is recorded in a sibling `excluded*` array next to the list it was removed from: `excludedTransmissions` beside `transmissions`, `excludedAttachments` beside `attachments`, and so on. An end-user system can still tell "something here is withheld from you" apart from "there is nothing here", without being shown anything about what it is.

The exact, field-by-field effect of each option is covered in the [technical reference for authorization contexts]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}).

## Relationship to the dialog token

The [dialog token]({{< relref "/dialogporten/getting-started/authorization/dialog-tokens" >}}) deliberately does not carry grants derived from authorization contexts. Those grants are expressed exclusively through a new, per-entity [context token]({{< relref "/dialogporten/reference/authorization/context-tokens" >}}), issued only for entities that both carry a context and are authorized. A service provider that receives an authorization context on part of a dialog must use that entity's context token against its URLs, not the dialog token.

**Read more**

- {{<link "../../../reference/authorization/authorization-contexts">}}
- {{<link "../../../reference/authorization/context-tokens">}}

{{<children />}}
