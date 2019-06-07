---
title: Application arhicture register component - Altinn Platform
linktitle: Register
description: Description of register component
tags: ["solution", "architecture"]
weight: 100
alwaysopen: true
---

The register component is an ASP.Net Core MVC Application exposing REST-API to Altinn Apps.

The solution is now available at http://platform.altinn.cloud/api/v1 and all resources are avaiable through endpoints defined below.

Resource: Organizations, Parties, Persons

## /organizations

Get information about an organization:

```http
/organizations/{orgNr}
```


## /parties

Get information about a party:

```http
/parties/{partyId}
```

## /persons

Get information about a person:
Send a POST-request with the persons SSN contained in the request body to
```http
/persons
```