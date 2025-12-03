---
title: Manage Access Lists through API
tags: [needstranslation]
linktitle: Access List Admin via API
description: In Altinn Studio you can manage Access Lists for resources in the Altinn Resource Registry.
toc: false
---

## Background

For certain services, restricting access to specific organizations is necessary. In Altinn 2, this was managed via the Service Rights Registry (SRR).

In Altinn 3, this functionality is handled by the Resource Rights Registry (RRR) through Access Lists. Access Lists allow you to define and manage which organizations have access to specific resources, ensuring a more secure and controlled environment.

## Prerequisites

You need a client defined in Maskinporten with the following scopes:

- altinn:resourceregistry/access-list.read
- altinn:resourceregistry/access-list.write
- altinn:resourceregistry/resource.write

See the [full Swagger documentation](https://docs.altinn.studio/api/resourceregistry/spec/#/).

## Create new Access List

Use `PUT` on `/access-lists/{owner}/{identifier}` to create the list.

The `owner` is the organization code, and `identifier` is a chosen ID for the access list.

```json
{
  "name": "Approved banks",
  "description": "List of banks approved according to rule 123"
}
```

## Adding members to the list

POST to `/access-lists/{owner}/{identifier}/members` with a member.

The member can be identified in different ways, but only one identifier can be provided per request.

```json
{
  "data": ["urn:altinn:organization:identifier-no:123456789"]
}
```

## Assign Access List to a resource

When you connect an access list to a resource, you can limit allowed actions with an action filter. This is useful when one access list should have read access and another should have both read and write.

With a null or empty list all actions are allowed. The actions need to match the actions in the XACML policy.

`/access-lists/{owner}/{identifier}/resource-connections/{resourceIdentifier}`

```json
{
  "actionFilters": ["read", "write"]
}
```

After updating, publish the resource to the relevant environments. Note: If you enable RRR before setting up the list, all users will lose access.
