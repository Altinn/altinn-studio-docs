---
title: Client Delegation
linktitle: Client Delegation
toc: false
---

{{% notice warning %}}
🚧 This documentation is a work in progress.
{{% /notice %}}

## Client Delegation
Client delegation is a functionality that gives accountants and auditors possibility to delegate roles for the clients to the system user of the accounting/auditing company.
To use this functionality the user need to be Client administrator for the accounting/auditing company.

## Client Administrator
This role is pre-assigned the following external roles (in company registered as accountant and auditor):

Managing shipowner
Official Receiver
General manager
Partner with Full/joint liability (national identity number)
Owner
General partner (national identity number)
Norwegian representative (of foreign entity)
Chair of the board
Auditing organizations must establish an integration with a system user of type **'agent'** in order to integrate with third-party systems on behalf of their clients.

## Agent System User Integration Process
Let's understand the agent system user usage by an example. 

### Example : Accessing the "Krav og betalinger" API
Following are the actors/services
1. Service Owner/Service Provider/Resource Owner - Skatteetaten
2. Service/API/Resource - Krav og betalinger
3. System vendor/System Provider - SmartCloud AS
4. System - SmartRegnskap
5. End User - Regnskapsfirma AS, An auditing organisation

The following steps are necessary to establish system, agent system user integration
1. [Preparation by Service Owner (skatteetaten)](../../../guides/serviceowner/)
2. [Actions by System Vendor (SmartCloud AS)](../../../guides/systemvendor/)
3. [Actions by End User (Morten, CEO of Regnskapsfirma AS)](../../../guides/enduser/clientdelegation/)

Once all the users have completed their prerequisite for the system integration, agent system user is now ready to be used by the third party systems.

#### Operational Phase - System User Usage
   1. SmartRegnskap Requests Access
      - In the operational phase, SmartRegnskap continuously requests access via Maskinporten for the "skatteetaten:kravogbetalinger" scope and system user for Regnskapsfirma AS.
      - Maskinporten verifies with altinn if the system user and associated client id are actual.
      - Maskinporten returns a token containing all the necessary authentication and authorization details for SmartRegnskap.
   2. Making Requests to Skatteetaten’s API
      - SmartRegnskap uses the token as an "ID card" to authenticate its request to Skatteetaten’s "Krav og betalinger" API.
   3. Authorization Check by Skatteetaten
       - Skatteetaten verifies that the system user is authorized to access the "Krav og betalinger" service.
       - Once authorized, Skatteetaten returns the total outstanding tax and fee claims for the client of Regnskapsfirma AS.
