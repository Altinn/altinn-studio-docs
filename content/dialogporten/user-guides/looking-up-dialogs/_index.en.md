---
title: 'Resolving by reference'
description: 'How to resolve a dialog from an instance-id or correspondence-id'
weight: 25
toc: true
---

## Introduction

Dialog lookup lets you translate between a dialog ID and the identifier of the entity the dialog represents, without first searching the full dialog list.

Some dialogs represent an underlying Altinn app instance or a single Altinn Correspondence. For those dialogs, lookup lets you move in both directions:

- from an app instance or correspondence reference to the dialog ID
- from a dialog ID to the canonical underlying reference

Other dialogs do not represent an underlying app instance or correspondence. For those dialogs, the dialog ID is itself the canonical identifier.

This is useful when your system already knows one of these identifiers:

- an Altinn app instance reference
- an Altinn Correspondence reference
- a Dialogporten dialog ID

The lookup APIs return lightweight metadata about the dialog and, for end users, information about why the current user can access it.

## Supported identifiers

The current implementation accepts these `instanceRef` formats:

- `urn:altinn:instance-id:{partyId}/{uuid}`
- `urn:altinn:correspondence-id:{uuid}`
- `urn:altinn:dialog-id:{uuid}`

## Use cases

### Instance delegation

In this context, "instance delegation" means delegation to one specific app instance, correspondence, or dialog. The authorization system uses the canonical identifier for that entity. For dialogs that represent an app instance or a correspondence, that means the underlying app-instance reference or correspondence reference. For dialogs without an underlying entity, the dialog ID itself is the canonical identifier.

Dialogporten is responsible for keeping track of this mapping. If your system only knows one side of the relationship, dialog lookup gives you the identifier you need for the other side.

### Why do I have access

The end-user lookup API includes `authorizationEvidence` so an end-user system can explain why the current user is allowed to see the dialog. This is useful in user interfaces that need to answer questions such as "why can I access this dialog?".

The evidence identifies the access path Dialogporten used for the lookup. The boolean fields show whether access came through a role, an access package, resource delegation, or instance delegation. Multiple access paths may be present. The `evidence` list contains the concrete grant type and subject behind those flags. For role and access-package access, the subject is the role or access-package identifier. For resource delegation, the subject is the service resource. For instance delegation, the subject is the canonical instance reference returned by the lookup.

The response also includes `currentAuthenticationLevel`. Together with `serviceResource.minimumAuthenticationLevel`, this can help an end-user system explain whether the current authentication level is sufficient for the ordinary title returned by the lookup.

## Looking up a dialog as an end user with REST

1. [Authenticate as an end user]({{< relref "/dialogporten/user-guides/authenticating/" >}}#usage-for-end-user-systems)
2. Send a GET request to `/api/v1/enduser/dialoglookup`, supplying `instanceRef` as a query parameter
3. Inspect the returned metadata and, if needed, continue to the [dialog details guide]({{< relref "/dialogporten/user-guides/getting-dialog-details//" >}})

Example:

```http
GET /api/v1/enduser/dialoglookup?instanceRef=urn:altinn:instance-id:1337/11111111-2222-3333-4444-555555555555
Accept-Language: en
Authorization: Bearer <token>
```

The end-user response includes:

- `dialogId`
- `instanceRef`
- `party`
- `title`
- `serviceResource`
- `serviceOwner`
- `authorizationEvidence`

`authorizationEvidence` explains why the current end user can access the dialog. It reports the current authentication level and whether the access comes through:

- a role
- an access package
- resource delegation
- instance delegation

## Looking up a dialog as an end user with GraphQL

The end-user GraphQL API exposes the same feature through `dialogLookup`.

Example:

```graphql
query DialogLookup($instanceRef: String!) {
  dialogLookup(instanceRef: $instanceRef) {
    lookup {
      dialogId
      instanceRef
      party
      title {
        languageCode
        value
      }
      serviceResource {
        id
        isDelegable
        minimumAuthenticationLevel
        name {
          languageCode
          value
        }
      }
      serviceOwner {
        code
        orgNumber
        name {
          languageCode
          value
        }
      }
      authorizationEvidence {
        currentAuthenticationLevel
        viaRole
        viaAccessPackage
        viaResourceDelegation
        viaInstanceDelegation
        evidence {
          grantType
          subject
        }
      }
    }
    errors {
      __typename
      message
    }
  }
}
```

GraphQL returns lookup failures in the payload instead of through HTTP status codes. The current typed errors are:

- `DialogLookupNotFound`
- `DialogLookupForbidden`
- `DialogLookupValidationError`

## Looking up a dialog as a service owner with REST

1. [Authenticate as a service owner]({{< relref "/dialogporten/user-guides/authenticating/" >}}#usage-for-service-owner-systems)
2. Send a GET request to `/api/v1/serviceowner/dialoglookup`, supplying `instanceRef` as a query parameter
3. Use the returned dialog metadata to continue with service-owner operations

Example:

```http
GET /api/v1/serviceowner/dialoglookup?instanceRef=urn:altinn:dialog-id:11111111-2222-3333-4444-555555555555
Accept-Language: en
Authorization: Bearer <token>
```

The service-owner response includes the same core lookup fields as the end-user response, but differs in two important ways:

- it does not include `authorizationEvidence`
- it can include `nonSensitiveTitle` in addition to `title`

The current implementation also includes deleted dialogs in service-owner lookup results.

### Canoncial reference

{{% notice info %}}
The returned `instanceRef` is the canonical identifier, meaning if you look up a dialog by `urn:altinn:dialog-id:{uuid}` 
the response can return a different `instanceRef`.
{{% /notice %}}

The returned value is the canonical identifier Dialogporten associates with that dialog:

- app instance reference for dialogs representing an Altinn app instance
- correspondence reference for dialogs representing a single Altinn Correspondence
- the dialog reference itself for dialogs without an underlying app instance or correspondence

The current implementation prefers:

1. an app instance reference
2. a correspondence reference
3. the dialog reference itself

### Localized fields follow `Accept-Language`

If you send `Accept-Language`, Dialogporten prunes localized fields in the response to the preferred languages. This applies to:

- `title`
- `serviceResource.name`
- `serviceOwner.name`
- `nonSensitiveTitle` in the service-owner endpoint

### End-user title selection depends on authentication level

For end-user lookup, `title` can be affected by the service resource's minimum authentication level:

- if the user's current authentication level is high enough, the ordinary title is returned
- if the user's level is too low and the dialog has `nonSensitiveTitle`, that non-sensitive title is returned instead
- if `nonSensitiveTitle` is not set, the ordinary title is returned

**Read more**

- {{<link "../../reference/dialog-lookup">}}
- {{<link "../../reference/graphql">}}
