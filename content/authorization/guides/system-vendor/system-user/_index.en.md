---
title: System User Guide
linktitle: System User
description: Guide for system vendors on integrating with and setting up system users in their end-user system.
toc: false
aliases:
  - en/authentication/guides/systemvendor/
---

A system user is a virtual user that an organization can create in Altinn. It gives systems and software, such as an accounting program, access to retrieve and submit data on behalf of the organization. Actions performed via a system user are registered as being done by the system user, and can therefore not be linked to a specific person. If personal responsibility is required, one must log in using a standard Altinn login.

## Before you start

Before you create a system user for your end-user system, you must decide how the system will be used by the end-users – i.e., whether the reporting will be for their own organization or on behalf of other organizations. This choice determines how the integration with the service owner's APIs is set up, and what permissions the system user will receive. The system can also be built to support both types of reporting. In such cases, you must create two separate system users: one for reporting on behalf of your own organization, and one for reporting on behalf of clients.

### Creating a system user

The system user is created by the organization or service provider that wants to use an end-user system for integration with Altinn or other public services.
Creation can be done via user-controlled creation or vendor-controlled creation.

#### User-controlled creation

With user-controlled creation, it is the end-user themselves who initiates the process by logging into Altinn. There, the user selects which system they want to create a system user for.

The end-user is presented with the predefined permissions that the system requires. When these are accepted, the permissions are approved directly, and the system user is created without generating a separate request. This process requires that the end-user has the authority to delegate all the permissions the system requests.

#### Vendor-controlled creation

With vendor-controlled creation, it is the end-user system vendor (SBSL) who initiates the process. This is done by the vendor, often from their own specialized system, sending a request to Altinn to create a system user.

The request specifies which permissions the system user needs. This request must then be approved by the end-user (the customer) in Altinn for the system user to be created.

This method is based on an "AND-relationship". This means that the end-user must have the authority to delegate all the permissions the vendor requests. If the user lacks authority for even one of the permissions, the request cannot be approved in its entirety.

## System user for own system

This option is suitable if the system will be used to retrieve or send data for your own organization.
![Vendor-controlled creation of a customer-controlled system](eget_system.png)
*The figure shows vendor-controlled creation for an own system*

**Typical use for end-user:**

- The end-user is an employee of the organization.
- The system is used only for reporting for their own organization number.
- No other organizations are involved.

**Example:** An internal HR or accounting system that sends payroll reports (A-meldinger) or VAT returns for the organization.

**Consequence for end-user:**

- Reporting is done only for their own organization.
- Delegations from other organizations are not necessary.
- Access control is simple and linked directly to their own organization.

> System user for own system can be created using either [**user-controlled or vendor-controlled creation.**](https://docs.altinn.studio/nb/authorization/guides/system-vendor/system-user/systemuserrequest/#1-opprette-systembruker-for-eget-system) 


## System user for client system

(previously agent-system user)

This option is suitable if your system will enable end-users to report for other organizations – for example, customers, clients, or partners.

You can get authorizations for the client in two ways:

1. **Via the Brønnøysund Register Centre (Enhetsregisteret):** The service provider receives rights automatically when a relationship is registered in the Brønnøysund Register Centre.
This applies to the roles Accountant (REGN), Auditor (REVI), and Business Manager (FFØR).
These authorizations can then be client-delegated to a system user with corresponding rights.

2. **Delegation from organization to organization:** An access manager at the client gives authorization directly to the service provider's organization number.
This happens by the client actively delegating one or more access packages.
Once the service provider has received the authorization, their client administrator can further delegate this to a client system with corresponding authorizations.

![Client system](klient_system.png)
*Figure shows vendor-controlled creation for a client system*

**Typical use for end-user:**

- The end-user is an accountant, consultant, or service provider.
- They log into the system and can choose which client/organization they will report for.
- The system must support multiple organization numbers and handle delegations via Altinn or an equivalent solution.

**Example:** An accounting firm that uses an accounting system to send VAT returns for its clients.

**Consequence for end-user:**

- The user can report on behalf of multiple organizations.
- The clients must have given the necessary rights/delegations.
- The system must ensure correct access and identification of who is being reported for.
- If the customer relationship is removed/deleted from the Brønnøysund Register Centre or the organization delegation is revoked by the client, all client delegations for that specific authorization will be automatically removed.
- Client delegation to a system user can be done via GUI or a separate API

> System users for client systems can only be created using [**vendor-controlled creation**](https://docs.altinn.studio/nb/authorization/guides/system-vendor/system-user/systemuserrequest/#2-opprette-systembruker-for-klientsystem).


{{<children />}}