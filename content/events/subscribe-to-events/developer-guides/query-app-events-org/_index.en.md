---
title: Query app events as application owner
linktitle: Query app events - org
description: Developer guide on how to query app events as an application owner
weight: 40
---

{{% notice warning %}}

Altinn Events enables event driven integration patterns, designed specifically to ***avoid*** the need for 
continuously requesting resources, also known as 'polling'. <br/> <br/>
However, in order to allow for smooth and incremental architectural migrations, 
the Events API also provides an HTTP API for scheduled requests of the same event data you hopefully
will receive via webhooks in the future.
{{% /notice %}}


## Endpoint

POST 

## Authentication 

This API requires authentication.


See [Authentication and Authorization](../../../api/#authentication--authorization) for more information.


## Request

### Content-Type


### Request body

### Required subscription request properties

#### property
- short description, type: URL


### Optional subscription request properties


## Response

### Supported content-types

### Response codes


## Examples

### Request

### Response

