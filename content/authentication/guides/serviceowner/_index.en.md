---
title: API Provider's Role In System User Integration
linktitle: API Provider
toc: true
weight: 1
---

{{<notice warning>}}
 This functionality is in test and will change.
{{</notice>}}

#### Preparation by API Provider (skatteetaten)
   1. Developing the Service/API
      - The service owner (Skatteetaten) must first develop the API that will be used by external parties, in this case, the "Krav og betalinger" service.
      - This API allows users to retrieve outstanding tax and fee claims from Skatteetaten.
   2. Configuring Access in Maskinporten
       - Skatteetaten then creates a scope in Maskinporten (e.g., skatteetaten:kravogbetalinger).
       - This scope is tied to the relevant access rights and is granted to organizations needing access to this service, such as SmartCloud AS (the system provider).
   3. Registering Resources in the Resource Register
       - The final step for Skatteetaten is to [register a resource](../../../../api/resourceregistry/) in the Resource Register, linking it to the scope and defining the access rules for external users.
       this can be an app in Altinn Studio or an API on the API provider's own platform.

#### How To Use System User
Once the above prerequisites are set, follow this guide to understand [how to use the system user](systemauthentication-for-apiproviders/)