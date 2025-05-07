---
title: API Provider's Role In System User Integration
linktitle: API Provider
toc: true
weight: 1
---

{{<notice warning>}}
 This functionality is in test and will change.
{{</notice>}}

## Prerequisites For The API Provider

To use system user as an api provider, the following prerequisites must be fullfilled:

- Agreement with machineporten as [API-provider](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apitilbyder)
- Agreement with Digdir for access to resource registry for creating resources
- Creation of [necessary resources](/authorization/guides/create-resource-resource-admin/) which must be authorized
- Assigned scope for PDP integration
- Integration with Altinn PDP


#### Preparation by API Provider(service owner) (skatteetaten)
   1. Developing the Service/API
      - The service owner (Skatteetaten) must first develop the API that will be used by external parties, in this case, the "Krav og betalinger" service. In this case it's an api developed and maintained by the service owner on their platform.
      - This API allows users to retrieve outstanding tax and fee claims from Skatteetaten.
   2. Configuring Access in Maskinporten
       - Skatteetaten then creates a scope in Maskinporten (e.g., skatteetaten:kravogbetalinger).
       - This scope is tied to the relevant access rights and is granted to organizations needing access to this service, such as SmartCloud AS (the system provider).
   3. Registering Resources in the Resource Register
       - The final step for Skatteetaten is to [register a resource](../../../../api/resourceregistry/) in the Resource Register, linking it to the scope and defining the access rules for external users. The service can define custom scopes, with access managed directly by the service owner
       This could be an application developed in Altinn Studio or an API hosted on the service owner's own platform.
       Refer [api documentation](../../../api/authentication/systemuserapi/) for more information on available endpoints.

#### Post System User Creation
1. [Validate Machineporten token](systemauthentication-for-apiproviders#validation-of-maskinporten-token)
2. [Authorization of System User](systemauthentication-for-apiproviders#authorization-of-system-user)