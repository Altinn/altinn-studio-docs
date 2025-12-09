---
title: "Searching for dialogs"
description: "How to search for and filter dialogs in Dialogporten"
weight: 20
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

## Introduction

This guide shows how a end-user system can search for dialogs in Dialogporten using either REST or GraphQL APIs. Dialogporten supports a number of parameters for filtering, sorting and free-text searching.

Note that the data structure that is returned in searches differ from the one returned on the [details endpoint](/en/dialogporten/user-guides/getting-dialog-details/); more information about the dialog and what access the authorized user has to various parts of it is only available in the details view.

## Basic steps (REST)

1. [Authenticate as a end-user](/en/dialogporten/user-guides/authenticating#usage-for-end-user-systems)
2. [Find the parties](/en/dialogporten/user-guides/authorized-parties/) that the authenticated end-user is authorized to represent
3. Perform a GET request to `/api/v1/enduser/dialogs`, supplying query parameters according to the table below:

{{<swaggerdisplayoperation "get" "/api/v1/enduser/dialogs">}}

- All parameters of different types are AND-ed, ie. if supplying `party` and `status`, only the dialogs of the provided status owned by the provided party will be returned.
- When supporting multiple values for the same parameter, these values are OR-ed, ie. if supplying two `status` parameters, dialogs having either of those values will be returned.
- `org` parameters must be service owner codes as defined in the global [altinn-orgs.json](https://altinncdn.no/orgs/altinn-orgs.json), eg. `digdir` or `skd`.
- `party` parameters must have one of the following formats
  - `urn:altinn:person:identifier-no:<11 digit national identity numner>`
  - `urn:altinn:organization:identifier-no:<9 digit CCR number>`
- `serviceResource` parameters must refer to a resource in the [Resource Registry](/en/authorization/what-do-you-get/resourceadministration/) and use the following format:
  - `urn:altinn:resource:<identifier>`

{{<notice warning>}}
Note the end-user search API requires that at least one [`serviceResource`](/en/dialogporten/getting-started/authorization/service-resource/) or [`party`](/en/dialogporten/getting-started/authorization/parties/) parameter is supplied. Up to 20 distinct values for each of these two types may be supplied.
{{</notice>}}

### Returned information

This will return a [collection of dialogs](/en/dialogporten/reference/entities/dialog/#search), which contains a subset of the information returned on the [dialog details endpoint](/en/dialogporten/reference/entities/dialog/). Depending on search parameters and the access of the authenticated user, this list may be empty.

If any invalid search parameters are supplied, the API will return `400 Bad Request` and a response explaining what errors were encountered. This response follows the standard [ProblemDetails](https://datatracker.ietf.org/doc/html/rfc7807) format.

### Pagination

The search API is paginated using continuation tokens, see the `limit`-parameter above. If there are additional pages to be fetched, the property `hasNextPage` will be set to true, and the property `continuationToken` is populated with a value that should be used to fetch the next page. In order to fetch the next page, supply that value as a `continuationToken` query parameter. This will maintain ordering and avoid missing items or fetching them twice. This should be repeated as long as `hasNextPage` is true.

### Ordering

Ordering can be performed on the following columns:

- CreatedAt
- UpdatedAt
- ContentUpdatedAt
- DueAt

{{<notice warning>}}
As `Id` is the primary key column, it is also technically a sortable column. However, sorting by `Id` is not recommended because this column, while being a lexicographically sortable UUIDv7, might be supplied by the service owner or contain a timestamp part that indicates the time of migration, not dialog creation. So for most purposes, `CreatedBy` is the column you want instead of `Id`.
{{</notice>}}

Columns might be sorted in ascending and descending (default) order, and multiple columns might be supplied in the `OrderBy` column.

#### Examples

These are example values that might be supplied in the `OrderBy` query parameter.

- `createdat`
- `createdat_asc`
- `createdat_desc,duedate_asc`
- `contentupdatedat_desc`

The current ordering can be found in the [collection model](/en/dialogporten/reference/entities/dialog/#search), next to the `continuationToken` and `hasNextPage` fields. The ordering is also embedded into `continuationToken`, so when paginating, supplying the continution token alone is sufficient to preserve ordering.

## Basic steps (GraphQL)

{{<notyetwritten>}}

{{<children />}}
