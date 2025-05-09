---
title: Getting Started with System User
linktitle: System User
description: Find comprehensive information on how to get started with the System User.
toc: false
weight: 3
---

{{<notice warning>}}
 This functionality is in test and will change.
{{</notice>}}

## System User
A System User is a new type of user in Altinn that allows an organization to grant authorizations to a non-personal user, enabling it to perform tasks on behalf of the organization.
The user works closely with Maskinporten, enabling access control through both Maskinporten and Altinn Authorization. With the system user, the authorization process becomes more streamlined, ensuring that the system provider only has the necessary access permissions.
In the future, the system user will be essential for organizations looking to automate their reporting and administrative tasks with the public sector.
There are two types of system users:
1. Standard
2. Agent

### Standard
A standard system user is a user type designated for organizations that wish to access services provided by public or private sector entities through third-party systems.

### Agent
An agent system user is a user type intended for organizations that integrate with third-party systems on behalf of their clients.

### How To Use System User
Let's understand the concept with an example.

### Example : Accessing the "Krav og betalinger" API
Following are the actors/services involved in using the system user
1. Service Owner/Service Provider/Resource Owner - Skatteetaten
2. Service/API/Resource - Krav og betalinger
3. System vendor/System Provider - SmartCloud AS
4. System - SmartCloud
5. End User - TILFELDIG SUBTIL APE (from tt02 environment)
6. End User (For Client adminstration) - TILBAKEHOLDEN USYMMETRISK TIGER AS, An auditing organisation (from tt02 environment)

The following steps are necessary to establish system, system user integration
1. [Service Provider (skatteetaten)](../../guides/serviceowner/)
2. [System Vendor (SmartCloud AS)](../../guides/systemvendor/)
3. [End User (STADIG KONSERT, Dagligleder of TILFELDIG SUBTIL APE)](../../guides/enduser/standard)
3. [End User For Client Delegation (DRESs MINST, Client Administrator for TILBAKEHOLDEN USYMMETRISK TIGER AS)](../../guides/enduser/clientdelegation/)

Once all the users have completed their prerequisite for the system integration, system user is now ready to be used by the third party systems.

#### Operational Phase - System User Usage
1. SmartCloud Requests Access
   - In the operational phase, SmartCloud continuously requests access via Maskinporten for the "skatteetaten:kravogbetalinger" scope and system user for TILFELDIG SUBTIL APE.
   - Machineporten verifies with altinn if the system user and associated client id are valid.
   - Machineporten returns a token containing all the necessary authentication and authorization details for SmartCloud.
2. Making Requests to Skatteetaten’s API
   - SmartCloud uses the token as an "ID card" to authenticate its request to Skatteetaten’s "Krav og betalinger" API.
3. Authorization Check by Skatteetaten
   - Skatteetaten verifies that the system user is authorized to access the "Krav og betalinger" service.
   - Once authorized, Skatteetaten returns the total outstanding tax and fee claims for TILFELDIG SUBTIL APE.