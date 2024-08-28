---
title: Manage Access Lists throug AP
linktitle: Access List Admin in API
description: In Altinn Studio you can manage Access List for Resources in Altinn Resource Registry.
toc: false
weight: 1
---

## Background

For certain services, restricting access to specific organizations is necessary. In Altinn 2, this was managed via the Service Rights Registry (SRR).

In Altinn 3, this functionality is handled by the Resource Rights Registry (RRR) through Access Lists. Access Lists allow you to define and manage which organizations have access to specific resources, ensuring a more secure and controlled environment.


## Prerequistes

Client defined in Maskinporten with the following scopes

- altinn:resourceregistry/access-list.read
- altinn:resourceregistry/access-list.write
- altinn:resourceregistry/resource.write


[Full swagger documentation](https://docs.altinn.studio/api/resourceregistry/spec/#/)

## Create new Access List

The first step is to create the list.

Put for /access-lists/{owner}/{identifier}

Where owner is organization code and identifer is a choosen ID fo the 

```json
{
  "name": "Godkjente banker",
  "description": "Denne listen inneholder godkjente banker i henhold til regel 123"
}
```

## Adding members to list

Post to /access-lists/{owner}/{identifier}/members with a member. 

The member can be identifed with different ID. Only one can be given. Organization number would 

```json
{
  "data": [
    "urn:altinn:organization:identifier-no:123456789"
  ]
}
```
## Assign Access List to resource

When a Access list to a resource can limit the action with a action filter. In cases where one AccessList should have read and another accessList should have read and write

With null or empty list all actions is allowed. The actions need to match action in XACML Policy


/access-lists/{owner}/{identifier}/resource-connections/{resourceIdentifier}


```json
{
  "actionFilters": [
    "read",
    "write"
  ]
}
```

After updating, publish the resource to various environments. Note: If you enable RRR before setting up the list, access will be lost for all.