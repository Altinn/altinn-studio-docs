---
title: Access control for shared solutions
description: How to prevent system users in a shared SaaS installation from being misused by the wrong people or across client relationships.
linktitle: Access control
weight: 15
---

When an end user system is delivered as a shared SaaS solution, several customers share the same installation. This enables efficient operations, but it also places strict requirements on how the system vendor manages access to the system users. A system user represents an organisation externally, and the calls made with a system user token cannot be tied to a named person. If the wrong employee gains access to the wrong system user, actions can be carried out on behalf of an organisation without Altinn or the service owner noticing.

## Why access control is critical in shared installations

Altinn authorisation only checks that the system user has the rights it needs. It is the end user system itself that must ensure that only authorised employees can trigger calls with a given system user. This responsibility lies with the system vendor and is especially relevant when:

- several customers share the same installation of the software
- a customer has several types of client relationships, for example both accountant and auditor for the same end customer
- employees at one customer could in theory reach data or functions that belong to another customer
- the system supports both user-triggered and automated processes against Altinn APIs

Without strong access control inside the end user system itself, delegations and rights in Altinn can be bypassed by the wrong employee using the wrong system user.

## Altinn cannot be used for access control between employees and system users

An important starting point for the assessment is that the system vendor cannot use Altinn to govern which employees are allowed to use a system user. Altinn has no mechanisms or APIs that let an end user system control access at the employee level. Delegations, roles and access packages in Altinn only describe what the system user is allowed to do on behalf of an organisation, not who inside the end user system is allowed to trigger actions with that system user.

This means that all access control between employees and system users must be built and operated inside the end user system itself. The system vendor must:

- authenticate the employee in the end user system
- decide which system users and clients the employee is allowed to use
- verify this on every call that triggers the use of a system user
- keep a separate log of which employee was behind the call

The system vendor must therefore plan for this functionality from the start when the system is going to be used by system customers that need to separate access between employees.

## The system user must be created on the system customer, not on the end customer

A common misunderstanding is that the system user should be created on the end customer when the system customer is the accountant or auditor for that end customer. This is wrong. The system user must be created on the system customer, that is, on the accountant or auditor that has actually acquired and put the end user system to use.

If the system user is created on the end customer, several problems arise:

- employees at one system customer can gain access to system users that belong to another system customer, because the system user sits on the shared end customer
- access control becomes unclear when several system customers, for example both an accountant and an auditor, have roles for the same end customer
- the end customer has to keep track of which systems their accountant and auditor have purchased, which is not the end customer's responsibility
- it becomes difficult to handle a system customer changing end user system or ending the customer relationship

This is what is called a _system user for client relationships_. The system user sits on the system customer, and the end customers are linked to the system user through client delegation. The system customer keeps control of its own system users, and the end customer only needs to relate to the customer relationship itself with the accountant or auditor. See [system user for client system](../#system-user-for-client-system) for how this is intended to work.

## Consider whether access should be separated across several system users

When the system customer has several roles towards the same end customer, the system vendor should consider whether the access should be distributed across several system users, and whether access control is needed in the end user system to prevent an employee from using the wrong system user. An accounting firm and an auditing firm can, for example, be the same legal entity, but the two services have different responsibilities, different client relationships and different access packages. An employee who works on auditing for an end customer should normally not be able to submit actions as an accountant for the same end customer.

This is an assessment the system vendor must make based on the needs of the system customer. Some system customers have clearly separated teams and want strict separation, whilst others have employees who naturally work across roles and prefer a simpler model. The assessment should take into account:

- which roles the system customer has towards its end customers, and whether the roles require different access packages
- whether the same employees work across several roles, or whether the roles are handled by different teams or departments
- how great the risk is that an employee carries out actions on the wrong basis, and what consequences such a mistake could have for the end customer
- what requirements the system customer itself sets for traceability, separation of responsibility and internal control

When the assessment indicates that access should be separated, the system vendor should enable the following:

- each system user is linked to the access package that matches the role, for example `regnskapsforer-med-signeringsrettighet` or `ansvarlig-revisor`
- the client administrator at the system customer distributes the clients to the correct system user
- the choice of system user is based on the client relationship and the role, not on which employee is logged in

See the [user scenario with Rett Revisjon](../userscenarios/#10-rett-revisjon-is-accountant-and-auditor-reporting-the-shareholder-register-for-clients) for a concrete example of how two separate system users are handled for the same end customer.

## Prevent employees from using the wrong system user

The end user system must have its own authentication and authorisation that links the logged-in employee to a limited set of system users and clients. This is especially important in larger organisations, such as accounting firms with many employees and clients.

Recommended principles:

- link each employee to a team, a department or a client portfolio in the end user system
- verify on every call that the employee is allowed to use the chosen system user for the chosen client
- log which employee triggered the call, even though the call is externally identified as the system user. The log is essential for traceability and incident handling.
- limit which employees can retrieve system user tokens and call Altinn APIs to those who actually need it in their work
- distinguish between employees who work with registered and unregistered client relationships, because these use different access packages and system users

See the [user scenario where Rett Revisjon differentiates access](../userscenarios/#3-accountant-needing-to-differentiate-access-to-system-user) for an example of how an unregistered accountant can gain access to some clients, but not all.

## Protect keys and tokens in a shared installation

In a shared SaaS solution, the system vendor usually uses one common certificate or key pair to retrieve tokens from Maskinporten. This makes it especially important to protect the key material and the issued system user tokens:

- store keys in a key vault or HSM that only the system itself has access to
- never share keys or tokens with the customers or with other installations
- retrieve tokens per call or per short time window, and avoid reusing tokens across customers
- limit access to tokens in memory and in logs so that they cannot be misused by employees in the support role or by other customers sharing the installation

For local installations, where the customer operates the software themselves, the [separate scenario for SAP installation](../userscenarios/#9-organization-has-purchased-sap-for-local-installation) applies. There, the key should sit with the customer, not with the vendor.

## Checklist for system vendors

Before putting a shared SaaS solution into use against Altinn, you should be able to answer yes to the following:

- does the system have separate system users per role and client relationship?
- are employees granted access to system users and clients based on their work tasks?
- does the system control which system user is to be used for each call against Altinn?
- is the employee who triggered the call logged, even though the call is made as the system user?
- are keys and tokens protected so that they cannot be misused across customers in the shared installation?

See also the [user scenarios for system user](../userscenarios/) for a broader walkthrough of how access control should be handled in practice.
