---
title: Model for system register information
linktitle: Model
description: Model for read/write system register information
toc: false
weight: 1
---

## Model

### Id

The id should be in the format of {systemvendororgno}\_{name chosen by the vendor}. F.example "310547891_testproduct". This is a unique id to identify the product.

### Vendor

The organization number of the system vendor. It must start with a reference code for the enhetsregister.

for example

```json
"vendor": {
  "ID": "0192:991825827"
}
```

<<0192>> is the reference that it is a value from EnhetsRegister according to [Electronic Address Scheme](https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/) and 991825827 is the organization number of Norwegian Digitalisation Agency.

### Name

Name of the system. This supports languages english(en), norwegian bokmål(nb) and nynorsk(nn). This is used on the display of the system in the user interface for manulaly creating the system user and also on approval of a system user request.

```json
"name": {
  "nb": "The Matrix",
  "en": "The Matrix",
  "nn": "The Matrix"
}
```

### Description

A short text that describes the system. This is used to present to the end user in the Altinn portal. english(en), norwegian nokmål(nb) and nynorsk(nn) are supported.

```json
"description": {
  "nb": "Test system",
  "en": "Test system",
  "nn": "Test system"
}
```

### Rights

This defines the services that the vendor's system requires access from the system user. This can be either altinn 3 app, service outside altinn but is registered as a resource in Altinn. The example below defines an app "app_ttd_endring-av-navn-v2" in altinn and service "ske-krav-og-betalinger" outside altinn that is registered as a resource in Altinn. This is an optional argument to create a system but it must be set before the system user can be created.

```json
"rights": [
  {
    "resource": [
      {
        "id": "urn:altinn:resource",
        "value": "app_ttd_endring-av-navn-v2"
      }
    ]
  },
  {
    "resource": [
      {
        "id": "urn:altinn:resource",
        "value": "ske-krav-og-betalinger"
      }
    ]
  }
]
```

### AccessPackages

An access package is a collection of rights and access permissions that are grouped together to make access management easier. Access packages define which services and resources the system user should have access to.

**Important:** There are specific access packages for client systems (agent system users) that cannot be used for system users for your own system. These access packages are designed to handle delegations from clients to service providers (such as accountants, auditors, or business managers), and therefore require client relationships that are established via the Central Coordinating Register or direct delegation.

The access packages for client systems must be linked to the roles Accountant (REGN), Auditor (REVI), or Business Manager (FFOR). See [the table of available access packages based on ER roles](/en/authorization/guides/end-user/system-user/delegate-clients/) for an overview of these specific access packages.

You can also create a system user for client relationships with regular access packages, as long as the client has delegated the access package to the organization that owns the system user.

```json
"accessPackages": [
  {
    "urn": "urn:altinn:accesspackage:skattnaering"
  }
]
```

### ClientId

A system can be associated with multiple client IDs. These client IDs must be relevant client IDs that are defined on the Maskinporten client of the system vendor or those who will retrieve the system user token. The client IDs are generated for integrations in Maskinporten, and each one is unique, tied specifically to a system. As a result, a client ID cannot be reused for a different system. If the system linked to a client ID is deleted, the client ID may be reassigned to a new or existing system.

**Important:** `clientId` is a required field when creating a system, but unfortunately the content cannot be validated. These client IDs must be relevant client IDs that are defined on the Maskinporten client of the system vendor or those who will retrieve the system user token. Without a correct client ID, you cannot retrieve a system user token for the system user.

```json
"clientId": [
  "32ef65ac-6e62-498d-880f-76c85c2052ae"
]
```

### IsVisible

The vendor can decide whether the system should be visible in the Altinn portal for end users to manually create it.

**Important:** You cannot set `IsVisible = true` in combination with an access package intended for client relationships. See [the table of access packages for client relationships](/en/authorization/guides/end-user/system-user/delegate-clients/) for which access packages this applies to.

- True: The system is visible in the user-driven system creation process in the Altinn portal.
- False: The system is not visible in the Altinn portal and can only be created by the vendor through the vendor-driven system creation process.

### AllowedRedirectUrls

This is to whitelist the urls that is allowed to be set in the redirecturl for a vendor driven system user request. Only https urls are allowed.

```json
  "allowedredirecturls": [
  "https://vg.no",
  "https://nrk.no",
  "https://altinn.no"
]
```
