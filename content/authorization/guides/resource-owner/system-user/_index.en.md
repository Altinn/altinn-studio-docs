---
title: System-user
linktitle: System-user
description: A guide for the API provider to set up their resource with Altinn and establishing the system user integration.
toc: true
weight: 1
---

## Prerequisites For The API Provider

To use system user as an api provider, the following prerequisites must be fulfilled:

- Agreement with Maskinporten as [API-provider](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apitilbyder)
- Agreement with Digdir for access to resource registry for creating resources
- Creation of [necessary resources](../../resource-owner/create-resource-resource-admin/) which must be authorized
- Assigned scope for PDP integration
- Integration with Altinn PDP

#### Preparation by API Provider(service owner) (skatteetaten)

1.  Developing the Service/API
    - The service owner (Skatteetaten) must first develop the API that will be used by external parties, in this case, the "Krav og betalinger" service. In this case it's an api developed and maintained by the service owner on their platform.
    - This API allows users to retrieve outstanding tax and fee claims from Skatteetaten.
2.  Configuring Access in Maskinporten
    - Skatteetaten then creates a scope in Maskinporten (e.g., skatteetaten:kravogbetalinger).
    - This scope is tied to the relevant access rights and is granted to organizations needing access to this service, such as SmartCloud AS (the system provider).
3.  Registering Resources in the Resource Register
    - The final step for Skatteetaten is to [register a resource](../../../../api/resourceregistry/) in the Resource Register, linking it to the scope and defining the access rules for external users. The service can define custom scopes, with access managed directly by the service owner
      This could be an application developed in Altinn Studio or an API hosted on the service owner's own platform.
      Refer [api documentation](../../../../api/authentication/systemuserapi/) for more information on available endpoints.

#### Post System User Creation

## Validation of Maskinporten token

The token itself is validated as a standardized Maskinporten token. [Read more at Machineporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apitilbyder).

A system user token contains quite a few more details than a regular Maskinporten token.

Below is an example token.

### JWT Token

```json
{
  "authorization_details": [
    {
      "type": "urn:altinn:systemuser",
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "id": "0192:314168267"
      },
      "systemuser_id": ["ebe4a681-0a8c-429e-a36f-8f9ca942b59f"],
      "system_id": "matrix_test"
    }
  ],
  "scope": "krr:global/kontaktinformasjon.read",
  "iss": "https://test.maskinporten.no/",
  "client_amr": "private_key_jwt",
  "token_type": "Bearer",
  "exp": 1718175135,
  "iat": 1718175015,
  "client_id": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "jti": "-SpfU--1Zn_Oqvkpjwu3oVn--VLcPzSAwjqyiP6zBEw",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:314330897"
  }
}
```

Values that are important for an API provider are

| Value                                   | Meaning                                                                                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| authorization_details:systemuser_id     | Unique ID for the system user. This is the value Altinn needs in order to authorize access. This is the one that has been delegated access rights. |
| authorization_details:systemuser_org:id | The organization that created the system user                                                                                                      |
| authorization_details:system_id         | Reference to the system that the system user points to.                                                                                            |
| Consumer:id                             | Organization number of the system provider (organization that has authenticated itself against Maskinporten)                                       |

See also the documentation for system user at [Machineporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_systembruker).

## Authorization of System User

API-provider must call PDP to authorize access to system user. This is done by sending a request to Altinn PDP.

The API provider must configure which actions and resources are accessed via the API in order to construct the complete request.

Below is an example of a call made by the system user **a545ca29-7fb8-4810-a2f2-0be171cb2a26** attempting to perform a **read** operation on a resource of the type **kravogbetaling** for the organization **923609016**.

```json
{
  "Request": {
    "ReturnPolicyIdList": true,
    "AccessSubject": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:systemuser:uuid",
            "Value": "a545ca29-7fb8-4810-a2f2-0be171cb2a26"
          }
        ]
      }
    ],
    "Action": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
            "Value": "read",
            "DataType": "http://www.w3.org/2001/XMLSchema#string"
          }
        ]
      }
    ],
    "Resource": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:resource",
            "Value": "kravogbetaling"
          },
          {
            "AttributeId": "urn:altinn:organization:identifier-no",
            "Value": "923609016"
          }
        ]
      }
    ]
  }
}
```

Altinn PDP returns the response as an XACML JSON response, informing whether the request is authorized or not.

The API provider must have logic in their API to either reject or accept the request from the system based on this.

```json
{
  "Response": [
    {
      "Decision": "Permit",
      "Status": {
        "StatusCode": {
          "Value": "urn:oasis:names:tc:xacml:1.0:status:ok"
        }
      },
      "Obligations": [
        {
          "id": "urn:altinn:obligation:authenticationLevel1",
          "attributeAssignment": [
            {
              "attributeId": "urn:altinn:obligation-assignment:1",
              "value": "2",
              "category": "urn:altinn:minimum-authenticationlevel",
              "dataType": "http://www.w3.org/2001/XMLSchema#integer",
              "issuer": null
            }
          ]
        }
      ]
    }
  ]
}
```
