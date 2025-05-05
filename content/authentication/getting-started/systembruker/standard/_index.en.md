---
title: Standard System User
linktitle: Standard System User
description: Find comprehensive information on how to get started with the standard System User.
toc: false
weight: 3
---

## Standard System User Integration Process
Let's understand the standard system user usage by an example. 

### Example : Accessing the "Krav og betalinger" API
Following are the actors/services
1. Service Owner/Service Provider/Resource Owner - Skatteetaten
2. Service/API/Resource - Krav og betalinger
3. System vendor/System Provider - SmartCloud AS
4. System - SmartRegnskap
5. End User - Rør og Vann AS

The following steps are necessary to establish system, system user integration
1. [Preparation by Service Provider (skatteetaten)](../../../guides/serviceowner/)
2. [Actions by System Vendor (SmartCloud AS)](../../../guides/systemvendor/)
3. [Actions by End User (Pia, CEO of Rør og Vann AS)](../../../guides/enduser/standard)

Once all the users have completed their prerequisite for the system integration, system user is now ready to be used by the third party systems.

#### Operational Phase - System User Usage
   1. SmartRegnskap Requests Access
      - In the operational phase, SmartRegnskap continuously requests access via Maskinporten for the "skatteetaten:kravogbetalinger" scope and system user for Rør og Vann AS.
      - Maskinpirten verifies with altinn if the system user and associated client id are actual.
      - Maskinporten returns a token containing all the necessary authentication and authorization details for SmartRegnskap.
   2. Making Requests to Skatteetaten’s API
      - SmartRegnskap uses the token as an "ID card" to authenticate its request to Skatteetaten’s "Krav og betalinger" API.
   3. Authorization Check by Skatteetaten
       - Skatteetaten verifies that the system user is authorized to access the "Krav og betalinger" service.
       - Once authorized, Skatteetaten returns the total outstanding tax and fee claims for Rør og Vann AS.