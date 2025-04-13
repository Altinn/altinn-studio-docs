---
title: Standard System User
linktitle: Standard System User
description: Find comprehensive information on how to get started with the standard System User.
toc: false
weight: 3
---

## Standard System User Integration Process
Let's understand the process by an example. 

### Example : Accessing the "Krav og betalinger" API
Following are the actors/services
1. Service Owner/Service Provider/Resource Owner - Skatteetaten
2. System vendor/System Provider - SmartCloud AS
3. End User - Rør og Vann AS
4. Service/API/Resource - Krav og betalinger
5. System - SmartRegnskap

#### Stage 1: Preparation by Service Owner (skatteetaten)
   1. Developing the Service/API
      - The service owner (Skatteetaten) must first develop the API that will be used by external parties, in this case, the "Krav og betalinger" service.
      - This API allows users to retrieve outstanding tax and fee claims from Skatteetaten.
   2. Configuring Access in Maskinporten
       - Skatteetaten then creates a scope in Maskinporten (e.g., skatteetaten:kravogbetalinger).
       - This scope is tied to the relevant access rights and is granted to organizations needing access to this service, such as SmartCloud AS (the system provider).
   3. Registering Resources in the Resource Register
       - The final step for Skatteetaten is to register a resource in the Resource Register, linking it to the scope and defining the access rules for external users.
       this can be an app in Altinn Studio or an API on the resource owner's own platform.
       
#### Stage 2: Actions by System Vendor (SmartCloud AS)
   1. Contact Digdir
      - The System vendor must contact Digdir to get access to the system register, system user scopes. It is required that the vendor runs the test of system user in Digdir's test environment and must sign an agreement of using system user to integrate with production environment.
   2. Creating a Maskinporten Client for the System
      - SmartCloud AS wants to integrates the system user into their accounting software, SmartRegnskap.
      - To integrate, they must create a client in Maskinporten for SmartRegnskap, which gets a client ID that will be used for authentication and authorization.
   3. Registering the System in Altinn’s System Register
      - SmartCloud AS then registers SmartRegnskap in the Altinn System Register.
      - They define the required rights for accessing "Krav og betalinger" by associating the client ID with the relevant permissions.
   4. Creating a System User
      - The system user can be created in two ways
         1. End user driven
            - Smartcloud As must request Rør og vann AS (end user) to login to altinn portal and create a system user for their system SmartRegnskap
         2. Vendor driven
            - SmartCloud AS creates a system user request (via altinn api for system user request) from within SmartRegnskap, which is sent to Altinn.
            - This request includes the necessary access rights to perform tasks related to the "Krav og betalinger" service on behalf of Rør og Vann AS (the company, end user).

#### Stage 3: Actions by End User (Pia, CEO of Rør og Vann AS)
   1. Purchasing the Accounting System
      - Pia, the CEO of Rør og Vann AS, purchases SmartRegnskap to manage the company’s tax and fee claims.
      - The software offers a feature to view the company's total tax and fee claims.
   2. Approving the System User Request
      - As part of the software setup, Pia must approve the system user request from SmartRegnskap.
      - Pia can either create a system user in altinn portal via end user driven system user creation or approve a system user request sent by the SmartRegnskap.
      - In this example, Pia is sent to the system user request and must approve in Altinn portal, where Pia grants the necessary access rights to SmartRegnskap for the "Krav og betalinger" service.
   3. Granting the Required Permissions
      - After Pia's approval, the system access includes the rights to view Rør og Vann AS’s tax and fee claims.
Pia has granted authorization to SmartRegnskap for this specific service and can revoke the access at any time via Altinn.

#### Stage 4: Operational Phase - Continuous Integration and Usage
   1. SmartRegnskap Requests Access
      - In the operational phase, SmartRegnskap continuously requests access via Maskinporten for the "skatteetaten:kravogbetalinger" scope and system user for Rør og Vann AS.
      - Maskinporten returns a token containing all the necessary authentication and authorization details for SmartRegnskap.
   2. Making Requests to Skatteetaten’s API
      - SmartRegnskap uses the token as an "ID card" to authenticate its request to Skatteetaten’s "Krav og betalinger" API.
   3. Authorization Check by Skatteetaten
       - Skatteetaten verifies that the system user is authorized to access the "Krav og betalinger" service.
       - Once authorized, Skatteetaten returns the total outstanding tax and fee claims for Rør og Vann AS.