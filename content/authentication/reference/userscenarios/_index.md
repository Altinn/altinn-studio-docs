---
title: "User Scenarios for System User"
linktitle: "User Scenarios"
description: "Overview of relevant user scenarios for system user"
weight: 5
---

## Concepts

Here are the key concepts for the user scenarios on this page.

### System Provider

Provider of end-user software available on the market. Has access to the system registry in Altinn to register software with required permissions.

### End-User System

Software that usually runs in the public cloud, but can also run locally with limitations. See example scenario.

The end-user system supports processes for organizations and citizens and can implement everything from salmon lice reporting to VAT reporting.

The end-user system can identify itself as a system user linked to the system. The required permissions depend on which processes are supported.

### System User

Virtual user for which system providers can obtain a token. Grants the end-user system the permissions the system user has.  
This user type can only be assigned permissions from the system customer.

### System User for Client Relationships

Virtual user for which the system provider can obtain a token, used in client relationships where the system user is delegated permissions for one or more clients.

### System User Token

Token issued by Maskinporten that identifies a system user. Also contains information about the end-user system and the system provider.

### System Customer

Organization that has acquired an end-user system from a system provider. A system customer can have several systems for different needs.

A system customer can be an organization that reports its own data, or an organization that provides services to others – for example, an accountant, auditor, business manager, or other rights relationships between organizations established in Altinn.

### Client

Organization that has an agreement with a service provider for support of business processes. This can be a client of an accounting office, auditor, or business manager.

Another word with a similar meaning is "customer". Client is an established term in the accounting and auditing industry.  
In reporting relationships, the client is often what is called a "party".

### Client Administrator

Employee at the system customer.  
Responsible for linking their clients (customers) to the correct system users.

### Access Package

A collection of permissions for public services. The package is defined in Altinn, and it is the service owners who choose to link permissions to a given package.  
The package has a name/area that should match the area of the services.

---

## General Assumptions

The following assumptions apply to most user scenarios:

1. **System Provider's Responsibility for Access Control**  
   - Have full overview of which permissions system users need (e.g., access packages or individual permissions for VAT reporting).  
     Information about permissions is obtained from the service owner or via the Altinn API. The service owner must communicate requirements clearly.  
   - Configure these permissions in the system registry so that system users can be assigned the necessary permissions per customer.

---

## Access Control in End-User System

When using a system user, public services will not know the identity of the person behind the software that triggers the issuance of a system user token and API calls.

To prevent misuse, it is important that system providers have good routines for authentication and authorization of users in the end-user system, so that only authorized users have access to the system user token.

This is especially relevant for larger organizations, such as accounting firms with many customers and employees, where it is necessary to limit access to data for different customers.

---

## 1. Registered Accountant Reports Data for Client

**Example:** VAT reporting

### Assumptions

- The accountant is registered in the Entity Register for the relevant client.
- The Tax Administration has [defined policy on application](/altinn-studio/reference/configuration/authorization/) so that users with the VAT reporting access package get access.
- The end-user system is set up with the necessary access packages for VAT reporting.
- The accountant has created a *system user for client relationships* linked to the end-user system.

### Steps

1. **Add Client**  
   The client administrator at the accountant links the accounting customer (client) to the system user. Access for the accounting customer is automatically delegated to the system user.
2. **Retrieve Token**  
   The end-user system retrieves the system user token via Maskinporten.
3. **Send Report**  
   The end-user system sends the VAT report via API with a valid token.
4. **Validation and Confirmation**  
   Altinn Authorization checks access. The API returns confirmation.

**Support:** Developed as part of system user delivery 5.

---

## 2. Business Manager Reports Data for Principal

**Example:** [Reporting for housing cooperatives](https://skatteetaten.github.io/api-dokumentasjon/api/innrapportering-boligsameie)

### Assumptions

- The business manager is registered in the Entity Register for the housing cooperative.
- The access package **forretningsforer-eiendom** provides access to the service (defined by the service owner).
- The system provider has registered the system in the system registry with the mentioned access package.

### Steps

1. The system provider sends a request to create a system user for clients to the business manager (the customer). The access package **forretningsforer-eiendom** is included as a requirement.
2. The business manager approves the request.
3. The client administrator adds the housing cooperative as a customer/client to the system user. The access package is automatically redelegated to the system user.
4. Reporting is done via the system.
5. The system user token is retrieved from Maskinporten.
6. Submission is done via API.
7. Access is verified by the Altinn PDP API.

**Support:** Developed as part of system user delivery 5.

---

## 3. Unregistered Accountant Reports Data for Client

**Scenario:** The client is not registered in the Entity Register with the accountant.

### Assumptions

- The client (accounting customer) has an agreement with the accountant for accounting services.
- The accountant has purchased the end-user system and set it up.

### Steps

1. **Request for Access**  
   The accountant asks the client to delegate the necessary permissions.
2. **Delegation**  
   The client delegates via Altinn.
3. **Add Client**  
   The client administrator at the accountant links the client to the system user. Access is redelegated to the system user.
4. **Retrieve Token**  
   The system user token is retrieved from Maskinporten.
5. **Reporting**  
   Submission is done via API.
6. **Validation**  
   Altinn verifies access and returns confirmation.

**Support:** Developed as part of system user delivery 6.

---

## 4. Organization Reports Its Own Data

**Scenario:** The organization uses a system user for reporting.

### Assumptions

- The system is set up with the resource that defines the service.

### Steps

1. **Acquisition of System**  
   The organization purchases the system from the provider.
2. **Request for System User**  
   The provider sends a request to create a system user with the necessary permissions.
3. **Approval**  
   The organization approves, and the system user is created.
4. **Reporting**  
   The system retrieves a token and sends data via API.
5. **Validation**  
   The API checks access and returns confirmation.

**Support:** Setup with individual permission was developed as part of system user delivery 2.  
Setup with access packages is being developed as part of system user delivery 4.

---

## 5. Accountant Retrieves Messages for Client via Dialogporten

**Scenario:** System user retrieves messages sent to the client.

### Assumptions

- Access to messages is included in the access package.
- The system supports Dialogporten.

### Steps

1. **Request for System User**  
   The provider sends a request with requirements for message scope.
2. **Approval**  
   The accountant/organization approves the request.
3. **Client Linking**  
   The client administrator has linked the client to the system user.
4. **Retrieve Token**  
   Token is retrieved from Maskinporten.
5. **Retrieve Messages**  
   Messages are retrieved via API.
6. **Validation**  
   Altinn validates and returns messages.

---

## 6. Organization Sends File via Mediation Service (Broker)

**Scenario:** Submission of registration via the Norwegian Mapping Authority's mediation service.

### Assumptions

- The Norwegian Mapping Authority has defined the resource and access.
- The system provider has registered the system and received approval.

### Steps

1. User sends registration via the system.
2. Token is retrieved from Maskinporten.
3. API is called with the token.
4. Access is validated by Altinn.

---

## 7. Organization Has Developed Its Own Reporting System

**Scenario:** Self-developed solution for submission via mediation service.

### Assumptions

1. Agreement with DigDir and access to the system registry.
2. System is registered with the necessary permissions.

### Steps

1. Request for system user is sent (to itself).
2. Request is approved.
3. Token is retrieved.
4. The system sends data via API.

---

## 8. Organization Has Purchased SAP for Local Installation

**Scenario:** SAP software is installed on the organization's own servers, without SAP having control.

### Assumptions

1. The organization has an agreement with Digdir for access to the system registry.
2. The organization has created a Maskinporten client.
3. The organization registers the system in the registry representing the SAP installation, with the necessary permissions.
4. The client key is installed and available on the server.

### Steps

1. Request to create a system user is sent to the organization's own entity.
2. Request is approved and the system user is created with the correct permissions.
3. The system can now create Maskinporten tokens for the system user and call the necessary APIs.

**Note:** In such scenarios, the system provider cannot share its own certificate/key pair with the system customer, as this may lead to misuse and access to customer data across organizations.

---

## NAV Scenario A (functionality not prioritized at this time)

**Example:** Accountant uses “Superavstemming” from Kontrollen AS.

### Challenges

- NAV does not offer access packages with granularity only for A06/A07.
- Granular permissions for system users or clients are not supported.

### Steps

1. System provider sends a request for a limited system user.
2. Accountant approves.
3. Clients are added and assigned only A06/A07.
4. Reporting is done via the system.
5. Token is retrieved and API is called.
6. Authorization via Altinn PDP.

---

## NAV Scenario B (functionality not prioritized at this time)

Service provider has purchased the system Superavstemming from Kontrollen AS.  
Superavstemming needs the necessary permissions to retrieve reconciliation data for a-melding (A06/A07) for the clients the system will be used for.  
The service provider wants to ensure that Superavstemming does not get permissions beyond retrieving reconciliation data for a-melding.  
The client has only purchased the "reconciliation of a-melding" service and only wants to delegate permissions for this.  
(Here, only a few specific permissions are necessary, probably not a whole access package, as access packages are often coarse-grained.)

---

## NAV Scenario C (functionality not prioritized at this time)

Service provider has purchased the system Superavstemming from Kontrollen AS.  
Superavstemming needs the necessary permissions to retrieve reconciliation data for a-melding (A06/A07) for the relevant clients.  
The service provider wants to ensure that Superavstemming does not get permissions beyond what is necessary.  
The client has purchased several services but only wants to delegate the necessary permissions for the relevant services.  
(Here, several different permissions are relevant, but there is no single suitable access package.)

---
