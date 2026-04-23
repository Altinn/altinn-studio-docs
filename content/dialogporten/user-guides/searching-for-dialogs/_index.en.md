---
title: "Searching for dialogs"
description: "How to search for and filter dialogs in Dialogporten"
weight: 20
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

## Introduction

This guide shows how to search for dialogs in Dialogporten. The end-user API supports both REST and GraphQL. The service-owner API supports REST search with additional filters that are useful when managing dialogs and end-user context.

Note that the data structure returned in searches differs from the one returned on the [details endpoint]({{< relref "/dialogporten/user-guides/getting-dialog-details//" >}}); more information about the dialog and what access the authorized user has to various parts of it is only available in the details view.

## Basic steps (REST, end-user)

1. [Authenticate as an end-user]({{< relref "/dialogporten/user-guides/authenticating/" >}}#usage-for-end-user-systems)
2. [Find the parties]({{< relref "/dialogporten/user-guides/authorized-parties//" >}}) that the authenticated end-user is authorized to represent
3. Perform a GET request to `/api/v1/enduser/dialogs`, supplying query parameters according to the table below:

{{<swaggerdisplayoperation "get" "/api/v1/enduser/dialogs">}}

- All parameters of different types are AND-ed, ie. if supplying `party` and `status`, only the dialogs of the provided status owned by the provided party will be returned.
- When supporting multiple values for the same parameter, these values are OR-ed, ie. if supplying two `status` parameters, dialogs having either of those values will be returned.
- `org` parameters must be service owner codes as defined in the global [altinn-orgs.json](https://altinncdn.no/orgs/altinn-orgs.json), eg. `digdir` or `skd`.
- `party` parameters must have one of the following formats
  - `urn:altinn:person:identifier-no:<11 digit national identity number>`
  - `urn:altinn:organization:identifier-no:<9 digit CCR number>`
- `serviceResource` parameters must refer to a resource in the [Resource Registry]({{< relref "/authorization/what-do-you-get/resourceadministration//" >}}) and use the following format:
  - `urn:altinn:resource:<identifier>`

{{<notice warning>}}
Note the end-user search API requires that at least one [`serviceResource`]({{< relref "/dialogporten/getting-started/authorization/service-resource//" >}}) or [`party`]({{< relref "/dialogporten/getting-started/authorization/parties//" >}}) parameter is supplied.
{{</notice>}}

### Returned information

This will return a [collection of dialogs]({{< relref "/dialogporten/reference/entities/dialog//" >}}#search), which contains a subset of the information returned on the [dialog details endpoint]({{< relref "/dialogporten/reference/entities/dialog//" >}}). Depending on search parameters and the access of the authenticated user, this list may be empty.

If any invalid search parameters are supplied, the API will return `400 Bad Request` and a response explaining what errors were encountered. This response follows the standard [ProblemDetails](https://datatracker.ietf.org/doc/html/rfc7807) format.

### Pagination

The search API is paginated using continuation tokens, see the `limit`-parameter above. If there are additional pages to be fetched, the property `hasNextPage` will be set to true, and the property `continuationToken` is populated with a value that should be used to fetch the next page. In order to fetch the next page, supply that value as a `continuationToken` query parameter. This will maintain ordering and avoid missing items or fetching them twice. This should be repeated as long as `hasNextPage` is true.

### Ordering

Ordering can be performed on the following columns:

- ContentUpdatedAt
- CreatedAt
- UpdatedAt
- DueAt

`contentupdatedat` is the recommended column when ordering dialogs for inbox-style views and for best performance.

If no explicit ordering is supplied, the default order is `contentupdatedat_desc`.

#### Examples

These are example values that might be supplied in the `OrderBy` query parameter.

- `contentupdatedat_desc`
- `createdat`
- `createdat_asc`
- `dueat_asc`

The current ordering can be found in the [collection model]({{< relref "/dialogporten/reference/entities/dialog//" >}}#search), next to the `continuationToken` and `hasNextPage` fields. In REST, the ordering is also embedded into `continuationToken`, so supplying the continuation token alone is sufficient to preserve ordering.

## Basic steps (REST, service owner)

1. [Authenticate as a service owner]({{< relref "/dialogporten/user-guides/authenticating/" >}}#usage-for-service-owner-systems)
2. Perform a GET request to `/api/v1/serviceowner/dialogs`, supplying query parameters according to the table below:

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialogs">}}

The service-owner search endpoint supports the same core dialog filters as the end-user endpoint, and in addition exposes filters for:

- `serviceOwnerLabels`, where all supplied labels must match
- `serviceOwnerLabels` with `*` suffix for prefix matching, for example `finance*`
- `visibleAfter` and `visibleBefore`

{{<notice info>}}
Free-text search in the service-owner endpoint requires `endUserId`. If `endUserId` is supplied, at least one of `serviceResource` or `party` must also be supplied.
{{</notice>}}

If you need to retrieve end-user context revisions and system labels without the full dialog search result, see the [system label reference]({{< relref "/dialogporten/reference/entities/systemlabel//" >}}), which documents the dedicated `/api/v1/serviceowner/dialogs/endusercontext` endpoint.

## Basic steps (GraphQL, end-user)

GraphQL exposes the end-user search operation as `searchDialogs`. A typical flow is:

1. [Authenticate as an end-user]({{< relref "/dialogporten/user-guides/authenticating/" >}}#usage-for-end-user-systems)
2. Use `getParties` to discover the party URNs you can search on
3. Call `searchDialogs`

Example:

```graphql
query SearchDialogs($party: [String!]) {
  searchDialogs(
    input: {
      party: $party
      limit: 20
      orderBy: [{ contentUpdatedAt: DESC }]
    }
  ) {
    items {
      id
      party
      status
      process
      createdAt
      updatedAt
      contentUpdatedAt
      endUserContext {
        revision
        systemLabels
      }
    }
    hasNextPage
    continuationToken
    orderBy {
      createdAt
      updatedAt
      dueAt
      contentUpdatedAt
    }
    errors {
      message
    }
  }
}
```

The GraphQL input supports the same implemented end-user filters as the REST endpoint, including:

- `serviceResource`
- `party`
- `status`
- `process`
- `systemLabel`
- `excludeApiOnly`
- `isContentSeen`
- `search`
- `searchLanguageCode`

The same underlying validation rules apply as in REST. In particular, at least one of `party` or `serviceResource` must be supplied.

### Accepted languages

GraphQL uses the same `Accept-Language` header as the REST API. If supplied, Dialogporten uses that header when selecting and ordering localized content values in the response.

### Pagination

GraphQL pagination uses the `continuationToken`, `hasNextPage`, and `orderBy` fields in the payload.

- Re-use the returned `continuationToken` to fetch the next page
- Re-use the same `orderBy` when sending the next request
- If `continuationToken` is set, `orderBy` must also be set

{{<children />}}
