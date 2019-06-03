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
(Available testdata. OrgNrs: 10008387, 10008433, 810418192 and 810419962)

## /parties

Get information about a party:

```http
/parties/{partyId}
```
(Available testdata. PartyIds: 50004216, 50004217, 50004219, 50004232, 50002182, 50003590, 50003681 and 50002550)

## /persons

Get information about a person:
Send a POST-request with the persons SSN contained in the request body to
```http
/persons
```
(Available testdata. SSNs: 01124621077, 22104511094, 24054670016 and 07069400021)

