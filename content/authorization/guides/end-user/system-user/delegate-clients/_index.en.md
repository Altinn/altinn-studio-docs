---
title: Client Delegation
description:
linktitle: Client Delegation
weight: 2
---

## Assigning Clients to a System User

If you are creating a system user for client relationships, clients can be assigned either in the Altinn portal or via API. This step does not apply if you are creating a system user for your own system.

Part of this process can be done using our API. See the [Client Delegation API documentation](/en/api/authentication/systemuserapi/clientdelegation/).

## Automatic Client Relationships

Some client relationships are created automatically based on roles registered in the Central Coordinating Register for Legal Entities (Enhetsregisteret). These relationships give you access to use certain access packages when creating a system user for client relationships.

The table below shows which access packages are available based on your role in the Central Coordinating Register:

| ER Role                                 | Available Access Packages                                                                                                                                                                 | Organization type |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| **Revisor** (Auditor)                   | `urn:altinn:accesspackage:ansvarlig-revisor`<br>`urn:altinn:accesspackage:revisormedarbeider`                                                                                             | All               |
| **Regnskapsfører** (Accountant)         | `urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet`<br>`urn:altinn:accesspackage:regnskapsforer-uten-signeringsrettighet`<br>`urn:altinn:accesspackage:regnskapsforer-lonn` | All               |
| **Forretningsfører** (Business Manager) | `urn:altinn:accesspackage:forretningsforer-eiendom`                                                                                                                                       | ESEK, BRL         |

When creating a system user for client relationships, you must specify which access packages the system user should have access to. These packages must align with the roles you have in the Central Coordinating Register.

> **Note:** Access packages with client relationships only work for "AND" cases. This means that if a system user for client relationships has multiple access packages, the client must have **either directly delegated or received delegation through the ER role** for **all** packages for the system user to function. For example: If the system user for client relationships has both the agriculture package and the accountant package, the client must have explicitly delegated the agriculture package (directly delegated) in addition to having received delegation for the accountant package through the ER role (which comes automatically).

## In the Altinn Portal

1. Go to the overview of system accesses
2. Select system access
   ![client delegation step 1](delegate_clients_1.png)
3. Click "Add clients"
   ![client delegation step 2](delegate_clients_2.png)
4. Select clients (one, several, or all)
5. Click confirm and close
   ![client delegation step 3](delegate_clients_3.png)
