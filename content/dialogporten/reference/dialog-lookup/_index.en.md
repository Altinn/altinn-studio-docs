---
title: 'Dialog lookup'
description: 'Reference information about dialog lookup endpoints'
weight: 12
toc: true
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

## Introduction

Dialog lookup resolves dialog metadata from a supported `instanceRef` and lets clients translate between a dialog ID and the canonical identifier the dialog represents.

Some dialogs represent an underlying Altinn app instance or a single Altinn Correspondence. For those dialogs, the canonical identifier is the underlying app-instance or correspondence reference. For dialogs without such an underlying entity, the dialog ID is itself the canonical identifier.

The current implementation supports:

- `urn:altinn:instance-id:{partyId}/{uuid}`
- `urn:altinn:correspondence-id:{uuid}`
- `urn:altinn:dialog-id:{uuid}`

If lookup starts with a dialog ID, the response can return a different `instanceRef`. The returned value is the canonical identifier Dialogporten associates with the dialog. The current implementation prefers:

1. app instance reference
2. correspondence reference
3. dialog reference

One important use case is instance delegation. In this context, instance delegation means delegation to one specific app instance, correspondence, or dialog. The authorization system uses the canonical identifier for that entity, while Dialogporten keeps track of the mapping between a dialog and the underlying entity it represents.

## End-user endpoint

Endpoint:

- `GET /api/v1/enduser/dialoglookup`

The end-user endpoint:

- excludes deleted dialogs
- returns `authorizationEvidence`
- returns `title`, which can resolve to the dialog's non-sensitive title when the current authentication level is below the service resource's minimum authentication level

{{<swaggerdisplayoperation "get" "/api/v1/enduser/dialoglookup">}}

### End-user response behavior

{{<swaggerdisplayentity "V1CommonIdentifierLookup_EndUserIdentifierLookup">}}

## Service-owner endpoint

The service-owner endpoint:

- includes deleted dialogs
- does not return `authorizationEvidence`
- returns `nonSensitiveTitle` separately when it exists
- requires that the resolved dialog belongs to the authenticated service owner, unless the caller has service-owner admin privileges

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialoglookup">}}

### Service-owner response behavior

The service-owner response contains the same core lookup fields as the end-user response, with these differences:

- `title` is always returned as the ordinary title
- `nonSensitiveTitle` is returned separately when present
- no authorization evidence is included

{{<swaggerdisplayentity "V1CommonIdentifierLookup_ServiceOwnerIdentifierLookup">}}

## Localized fields

Both REST endpoints accept `Accept-Language`.

When that header is supplied, Dialogporten prunes localized fields in the response to the preferred languages. This applies to:

- `title`
- `serviceResource.name`
- `serviceOwner.name`
- `nonSensitiveTitle` in the service-owner response

## Response field notes

- `serviceResource.id` is returned as the resource identifier, without the `urn:altinn:resource:` prefix
- `serviceOwner.code` is the service owner's short code
- `party` is returned as the dialog's party URN

**Read more**

- {{<link "../../user-guides/looking-up-dialogs">}}
- {{<link "../graphql">}}
