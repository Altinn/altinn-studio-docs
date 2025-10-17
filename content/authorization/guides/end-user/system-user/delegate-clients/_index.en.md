---
title: Client Delegation
description:
linktitle: Client Delegation
weight: 2
---

# Assigning Clients to a System User

If you are creating a system user for client systems, clients can be assigned either in the Altinn portal or via API. This step does not apply if you are creating a system user for your own system.

Part of this process can be done using our API. See the [Client Delegation API documentation](/en/api/authentication/systemuserapi/clientdelegation/).

## In the Altinn Portal

1. Go to the overview of system accesses
2. Select system access
   ![client delegation step 1](delegate_clients_1.png)
3. Click "Add clients"
   ![client delegation step 2](delegate_clients_2.png)
4. Select clients (one, several, or all)
5. Click confirm and close
   ![client delegation step 3](delegate_clients_3.png)

## Client delegation without existing client relations

If you need to delegate clients but don't have existing client relations established beforehand, you'll need to establish these relations first before proceeding with the delegation process.
This applies to relationships where you don't have any established client relationship in the Brønnøysund Register.

### Prerequisites

- You must have access to Altinn as Client Administrator or Managing Director.

### Process

0. System user for Agent relationship is created for organization (Varm Økonomisk Ape, 311037889)
   ![Step 0 - Create system user](add_user0.png)

1. **Grant authorization to the organization that owns the system user**
   ![Step 1 - Grant authorization](add_user1.png)

2. **Delegate access package to the organization**
   You must log in as a potential "client" and then grant authorization to Varm Økonomisk Ape and delegate the access package that the System User is set up with to Varm Økonomisk Ape.
   You have now established a client relationship that can be used for the System User
   ![Step 2 - Delegate access package](add_user2.png)

3. **The organization that owns the System User (Varm Økonomisk Ape) can now add clients for the System User**
   ![Step 3 - Add clients](add_user3.png)

After establishing client relations through these steps, you can proceed with the standard client delegation process described above.
