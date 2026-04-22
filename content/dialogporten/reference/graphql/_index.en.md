---
title: 'GraphQL'
description: 'GraphQL operations Dialogporten supports'
weight: 11
---

Dialogporten supports a GraphQL API for end-users. The current implementation includes queries, subscriptions, and mutations.

The endpoints are:

| Environment | URL                                                                                |
| ----------- | ---------------------------------------------------------------------------------- |
| Test        | `https://platform.at23.altinn.cloud/dialogporten/graphql`                        |
| Staging     | `https://platform.tt02.altinn.no/dialogporten/graphql`                             |
| Production  | `https://platform.altinn.no/dialogporten/graphql`                                  |

## Local development
When running locally, a GraphQL frontend ([Banana Cake Pop](https://chillicream.com/products/bananacakepop)) is available at http://localhost:5181/graphql/. See [README.md](https://github.com/digdir/dialogporten/blob/main/README.md) for more information about running Dialogporten locally.

## Implemented operations

The current GraphQL implementation exposes:

- `getDialogById` for fetching a single dialog
- `searchDialogs` for searching dialogs
- `dialogLookup` for resolving a dialog from an instance reference
- `getParties` for listing authorized parties
- `dialogEvents` for subscriptions on a specific dialog
- `setSystemLabel` and `bulkSetSystemLabels` for updating end-user system labels

## Notes on specific operations

### `searchDialogs`

`searchDialogs` returns a payload with:

- `items`
- `hasNextPage`
- `continuationToken`
- `orderBy`
- `errors`

If `continuationToken` is supplied in the request, `orderBy` must also be supplied.

### `dialogLookup`

`dialogLookup` accepts `instanceRef`. It can be used to translate between a dialog ID and the canonical identifier the dialog represents. The implementation supports:

- `urn:altinn:instance-id:{partyId}/{uuid}`
- `urn:altinn:correspondence-id:{uuid}`
- `urn:altinn:dialog-id:{uuid}`

Dialogs that represent an Altinn app instance or a single Altinn Correspondence use that underlying identifier as their canonical identifier. Dialogs without such an underlying entity use the dialog ID itself.

The field returns a payload with:

- optional `lookup`
- `errors`

The current typed errors are:

- `DialogLookupNotFound`
- `DialogLookupForbidden`
- `DialogLookupValidationError`

The `lookup` object contains:

- `dialogId`
- `instanceRef`
- `party`
- `title`
- `serviceResource`
- `serviceOwner`
- `authorizationEvidence`

If lookup starts with `urn:altinn:dialog-id:{uuid}`, the returned `instanceRef` can differ from the input. The returned value is the canonical identifier Dialogporten associates with that dialog. The current implementation prefers app instance references, then correspondence references, then dialog references.

`authorizationEvidence` explains why the current end user can access the dialog. It reports the current authentication level and whether access comes through:

- a role
- an access package
- resource delegation
- instance delegation

`title` can resolve to the dialog's non-sensitive title when the user's current authentication level is below the service resource's minimum authentication level.

### `dialogEvents`

`dialogEvents` subscribes to events for a single dialog and requires a dialog token in the `Authorization` header.

### System label mutations

The current mutations are aimed at end-user context management:

- `setSystemLabel` updates one dialog
- `bulkSetSystemLabels` updates multiple dialogs

Both mutations use the same add/remove label model as the REST end-user endpoints.

**Read more**
* [Technical information about Dialporten V1 schemas](https://github.com/digdir/dialogporten/tree/main/docs/schema/V1)
* {{<link "../../user-guides/authenticating">}}

{{<children />}}
