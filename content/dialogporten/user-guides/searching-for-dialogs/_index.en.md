---
title: 'Searching for dialogs'
description: 'How to search for and filter dialogs in Dialogporten'
weight: 20
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

## Introduction

This guide shows how a end-user system can search for dialogs in Dialogporten using either REST or GraphQL APIs. Dialogporten supports a number of parameters for filtering, sorting and free-text searching.

Note that the data structure that is returned in searches differ from the one returned on the [details endpoint]({{<relref "../getting-dialog-details">}}); more information about the dialog and what access the authorized user has to various parts of it is only available in the details view. 

## Basic steps (REST)

1. [Authenticate as a end-user]({{<relref "../authenticating">}})
2. Perform a GET request to `/api/v1/enduser/dialogs`, supplying query parameters according to the table below:

{{<swaggerdisplayoperation "get" "/api/v1/enduser/dialogs">}}

* All parameters of different types are AND-ed, ie. if supplying `party` and `status`, only the dialogs of the provided status owned by the provided party will be returned
* When supporting multiple values for the same parameter, these values are OR-ed, ie. if supplying two `status` parameters, dialogs having either of those values will be returned

{{<notice warning>}}
Note the end-user search API requires that at least one `serviceResource` or `party` parameter is supplied. Up to 20 distinct values for each of these two types may be supplied.
{{</notice>}} 

### Returned information

This will return a [collection of dialogs]({{<relref "../../reference/entities/dialog/#search">}}), which contains a subset of the information returned on the [dialog details endpoint]({{<relref "../../reference/entities/dialog/">}}). Depending on search parameters and the access of the authenticated user, this list may be empty. 

If any invalid search parameters are supplied, the API will return `400 Bad Request` and a response explaining what errors were encountered. This response follows the standard [ProblemDetails](https://datatracker.ietf.org/doc/html/rfc7807) format.

### Pagination

The search API is paginated using continuation tokens, see the `limit`-parameter above. If there are additional pages to be fetched, the property `hasNextPage` will be set to true, and the property `continuationToken` is populated with a value that should be used to fetch the next page. In order to fetch the next page, supply that value as a `continuationToken` query parameter. This will maintain ordering and avoid missing items or fetching them twice. This should be repeated as long as `hasNextPage` is true.

### Ordering

Ordering can be performed on the following columns:

* CreatedAt
* UpdatedAt
* DueAt

{{<notice warning>}}
As `Id` is the primary key column, it is also technically a sortable column. However, sorting by `Id` is not recommended because this column, while being a lexicographically sortable UUIDv7, might be supplied by the service owner or contain a timestamp part that indicates the time of migration, not dialog creation. So for most purposes, `CreatedBy` is the column you want instead of `Id`.
{{</notice>}} 

Columns might be sorted in ascending and descending (default) order, and multiple columns might be supplied in the `OrderBy` column.

#### Examples

These are example values that might be supplied in the `OrderBy` query parameter. 

* `createdat`
* `createdat_asc`
* `createdat_desc,duedate_asc`

The current ordering can be found in the [collection model]({{<relref "../../reference/entities/dialog/#search">}}), next to the `continuationToken` and `hasNextPage` fields. The ordering is also embedded into `continuationToken`, so when paginating, supplying the continution token alone is sufficient to preserve ordering.

{{<children />}}
