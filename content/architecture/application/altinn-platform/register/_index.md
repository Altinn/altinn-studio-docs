---
title: Application arhicture register component - Altinn Platform
linktitle: Register
description: Description of register component
tags: [architecture, solution]
weight: 100
---

The register component is an ASP.Net Core MVC Application exposing REST-API to Altinn Apps.

The solution is now available at https://platform.altinn.cloud/register/api/v1 and all resources are avaiable through endpoints defined below.

Resource: Organizations, Parties, Persons

## /organizations

Get information about an organization:

### Organization type

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| OrgNumber | string  | the organization number nine digits |
| Name |  string | the registered name of the organization |
| UnitType | string  |    |
| TelephoneNumber | string   | the telephone number |
| MobileNumber |  string | the mobile number |
| FaxNumber |  string | the fax number |
| EMailAddress | string | the email adress  |
| InternetAddress | string | the url for a web site |
| MailingAddress | string | the adress for sending mail to the organization |
| MailingPostalCode | string | the postal code for sending mail to the organization |
| MailingPostalCity | string | the city for sending mail to the organization  |
| BusinessAddress | string | the address of the daily business |
| BusinessPostalCode | string | the postal code for the daily business  |  
| BusinessPostalCity | string | the city for the daily business|  

### Operations

```http
GET /organizations/{orgNr}
```

## /parties

### Party type

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| PartyId | int | the party ID |  
| PartyTypeName | PartyType | the type of the party; organization or person |  
| OrgNumber | string | the organization number. Empty string if party is person. |  
| SSN | string | the social security number. Empty string if party is organization. |  
| UnitType | string |  |  
| Name | string | the full name of the person or name of the organization |  
| IsDeleted | bool | true is the organization has been deleted from the registery |  
| OnlyHiearhyElementWithNoAccess | bool | true if party is a parent unit with no access in current context|  
| Person | Person | the person the party represents |  
| Organization | Organization | the organization the party represents |  
| ChildParties | List<Party> | List of sub units if the party is an organization |  

### Operations

Get information about a party:

```http
GET /parties/{partyId}
```

## /persons

### Person type
| Attribute | Type | Description |
| --------- | ---- | ----------- |
| SSN | string |  Social security number |
| Name | string | the person's full name |
| FirstName | string | the person's first name |
| MiddleName | string | the person's middle name |
| LastName | string | the person's last name |
| TelephoneNumber | string | telephone number |
| MobileNumber | string  | mobile number |
| MailingAddress | string |  mailing address |
| MailingPostalCode | string | mailing postal code |
| MailingPostalCity | string | mailing postal city |
| AddressMunicipalNumber | string | adress municipal number |
| AddressMunicipalName | string | adress municipal name |
| AddressHouseNumber | string | address house number |
| AddressHouseLetter | string | address house letter |
| AddressPostalCode | string | address postal code |
| AddressCity |string  | adress city  |

### Operations

Get information about a person:
Send a GET-request with the persons SSN contained in the request body to

```http
GET /persons
```
