---
title: "Setup guidance for system users"
linktitle: "Setup guidance"
description: "Practical recommendations for setting up system users, access packages, and access control for different scenarios"
weight: 9
tags: [needstranslation]
---

This page provides concrete recommendations for how to set up system users for different types of organisations.
The guidance covers how many system users you need, how to distribute access packages, and how to handle access control.

Use the table below to find the scenario that matches your situation, then follow the detailed recommendations further down.

See also the [wizard](https://systemuserwizard.azurewebsites.net/) which covers some of this.

## Quick reference

| Scenario | Number of system users | System user type | Access packages per user |
|----------|----------------------|------------------|--------------------------|
| [A. Organisation reports own data](#a-organisation-reports-own-data) | 1 | Standard | All packages the organisation needs |
| [B. Service provider with one type of client relationship](#b-service-provider-with-one-type-of-client-relationship) | 1 | Client relationship | One or more related packages |
| [C. Service provider with multiple types of client relationships](#c-service-provider-with-multiple-types-of-client-relationships) | 1 per relationship type | Client relationship | Packages matching each relationship type |
| [D. Service provider with team-based access](#d-service-provider-with-team-based-access) | 1 per team/function | Client relationship | Packages matching each team |
| [E. Locally installed or self-developed system](#e-locally-installed-or-self-developed-system) | 1 | Standard | All packages the organisation needs |
| [F. Accounting clients with different service needs](#f-accounting-clients-with-different-service-needs) | 2 | Client relationship | Base package + extended package for selected clients |
| [G. Complex organisation structure with sub-entities](#g-complex-organisation-structure-with-sub-entities) | 1 (or more for varying needs) | Client relationship | Packages delegated by each sub-entity |

---

## A. Organisation reports own data

**Typical example:** A company uses an end-user system to report VAT, shareholder register, or other data on its own behalf.

### Recommended setup

- **1 system user** linked to the end-user system.
- The system user is given **all the access packages** the organisation needs for reporting.
- The system vendor sends a request to create the system user. The organisation approves.

### How it works

```text
Organisation
  └── System user (standard)
        └── Access packages: e.g. "urn:altinn:accesspackage:skatt-naering", "urn:altinn:accesspackage:merverdiavgift"
```

### Key considerations

- The system vendor is responsible for registering the correct access packages in the system register.
- The organisation only needs to approve the request — access packages are assigned automatically.
- If the organisation needs additional services later, the system vendor updates the system register and sends a new request.

---

## B. Service provider with one type of client relationship

**Typical example:** A registered accountant reports [Tax card for employer – submission from system (RF-1211)](https://tjenesteoversikten.no/resource/ske-skattekort-til-arbeidsgiver) for multiple clients.
All clients have the same type of relationship (e.g. registered accountant in the Entity Register).

### Recommended setup

- **1 system user for client relationships** linked to the end-user system.
- The system user is given the **access packages that match the client relationship** (e.g. `regnskapsforer-med-signeringsrettighet`).
- A client administrator at the service provider links each client to the system user.

### How it works

```text
Service provider (e.g. accounting firm)
  └── System user for client relationships
        ├── Access package: regnskapsforer-med-signeringsrettighet
        ├── Client A
        ├── Client B
        └── Client C
```

### Key considerations

- When a client is linked to the system user, the access packages are **automatically delegated** to the system user for that client.
- New clients are added by the client administrator — no new system users are needed.
- The system vendor must implement **access control in the end-user system** so that only authorised employees can act on behalf of each client.

---

## C. Service provider with multiple types of client relationships

**Typical example:** An auditing and accounting firm (e.g. "Rett Revisjon") that has some clients as a registered accountant, some as auditor,
and some with organisation-delegated access packages. They need to report "A-melding" for all their client types.

### Recommended setup

- **1 system user per type of client relationship**, each with the access packages that match that relationship type.
- The client administrator distributes clients to the correct system user based on their relationship type.

### How it works

```text
Service provider (e.g. Rett Revisjon)
  ├── System user 1 (client relationship)
  │     ├── Access package: regnskapsforer-med-signeringsrettighet
  │     ├── Client A (registered accountant)
  │     └── Client B (registered accountant)
  │
  ├── System user 2 (client relationship)
  │     ├── Access package: ansvarlig-revisor
  │     ├── Client C (registered auditor)
  │     └── Client D (registered auditor)
  │
  └── System user 3 (client relationship)
        ├── Access package: a-ordning
        ├── Client E (delegated in Altinn)
        └── Client F (delegated in Altinn)
```

### Why separate system users?

Each access package represents a **different legal basis** for acting on behalf of the client.
A registered accountant has different rights than an auditor or an organisation with delegated access.
By separating them, you ensure that:

- Each system user only has the rights that match the actual relationship.
- The end-user system can select the correct system user (and token) when reporting for a specific client. This is done using external ref.
- There is a clear audit trail for which basis was used.

### Key considerations

- The system vendor must know **which type of relationship** the service provider has with each client. This information must be shared by the service provider.
- When reporting, the end-user system must select the correct system user token based on the client's relationship type.
- New clients are added to the **existing system user** that matches their relationship type — no new system users are needed unless a new relationship type is introduced.

---

## D. Service provider with team-based access

**Typical example:** A property manager or large accounting firm that wants to limit access to specific teams or departments.

### Recommended setup

- **1 system user per team or function**, each with the access packages relevant to that team's responsibilities.
- The system vendor implements user management so that only employees in the relevant team can use each system user.

### How it works

```text
Service provider
  ├── System user 1 (client relationship) — Property management team
  │     ├── Access package: forretningsforer-eiendom
  │     ├── Housing cooperative A
  │     └── Housing cooperative B
  │
  └── System user 2 (client relationship) — Accounting team
        ├── Access package: regnskapsforer-med-signeringsrettighet
        ├── Client C
        └── Client D
```

### Key considerations

- The system vendor **must implement access control** in the end-user system. Altinn does not know who the individual user behind the system user is.
- Define which employees belong to each team and which system user they can use.
- This setup also works when combining scenario C (multiple relationship types) with team-based access.

---

## E. Locally installed or self-developed system

**Typical example:** An organisation has developed its own reporting system, or has purchased software (e.g. SAP) that is installed on its own servers.

### Recommended setup

- The organisation (the customer that purchased SAP) registers as **both system vendor and system customer** in the system register.
- **1 system user** linked to the locally installed system.
- The organisation creates its own Maskinporten client and installs the key on the server.

### How it works

```text
Organisation (= system vendor + system customer)
  └── System user (standard)
        └── Access packages: as needed
```

### Key considerations

- It is the **customer of the software** (i.e. the organisation that has purchased e.g. SAP) that must get access to Maskinporten — not the software vendor.
- The organisation must have an agreement with DigDir for access to the system register.
- The organisation must create its own Maskinporten client. The certificate/key must **never be shared** with the software vendor.
- If the software vendor shared its key with the organisation, this could lead to misuse and access to data across all the vendor's customers.

---

## F. Accounting clients with different service needs

**Typical example:** An accounting firm provides accounting services for all its clients, but some clients also want the firm to handle sick leave and other NAV-related tasks. These clients have delegated additional access packages to the accounting firm.

### Starting point

- All clients have the accounting firm registered as their accountant in the Entity Register.
- Some clients have additionally delegated the access package for sick leave (e.g. `sykmelding`) to the accounting firm via Altinn.
- The accounting firm needs to distinguish between clients that only have accounting services and clients that also have sick leave services.

There are two ways to solve this. Choose the one that best fits your organisation.

### Option 1: Separate clients by service agreement

Here you create separate system users where each system user has all the access packages needed for that client group.

**Setup:**

- **System user 1** — for accounting-only clients. This one only has the access package `regnskapsforer-med-signeringsrettighet`.
- **System user 2** — for clients that also want sick leave services. This one has the access packages `regnskapsforer-med-signeringsrettighet` **and** `sykmelding`.
- The client administrator distributes clients to the correct system user based on their service agreement.

```text
Accounting firm
  ├── System user 1 (client relationship) — Accounting only
  │     ├── Access package: regnskapsforer-med-signeringsrettighet
  │     ├── Client A (accounting only)
  │     ├── Client B (accounting only)
  │     └── Client C (accounting only)
  │
  └── System user 2 (client relationship) — Accounting + sick leave
        ├── Access package: regnskapsforer-med-signeringsrettighet
        ├── Access package: sykmelding (delegated by the client)
        ├── Client D (accounting + sick leave)
        └── Client E (accounting + sick leave)
```

**Advantages:**

- Easier to assign clients to the correct system user — each system user covers one clearly defined client group.
- Clear overview for the client administrator: clients are sorted by their service agreement.

**Disadvantages:**

- When a client extends their service agreement, the client must be **moved** from one system user to another.
- If a new additional service does not fit into an existing combination, you must create a new system user with the new combination of access packages. The number of system users grows with the number of **combinations**, not just the number of service types.

**When a client extends their service agreement:**

1. Client B delegates the access package `sykmelding` to the accounting firm in Altinn.
2. The client administrator removes Client B from System user 1 and adds the client to System user 2.
3. The end-user system is updated so that Client B is linked to the correct system user.

### Option 2: One shared system user for accounting + separate system users per additional service

Here all clients share one system user for accounting work, whilst additional services are handled by separate, specialised system users. Clients that need additional services are linked to **both** the shared accounting system user and the relevant additional service system user.

**Setup:**

- **System user 1** — shared for all accounting clients. This one has the access package `regnskapsforer-med-signeringsrettighet`. All clients are linked here.
- **System user 2** — for sick leave only. This one has the access package `sykmelding`. Only clients that have delegated the sick leave package are linked here.
- If new additional services arise (e.g. income reporting), you create a **new system user** for that service without changing the setup for the others.

```text
Accounting firm
  ├── System user 1 (client relationship) — Accounting (all clients)
  │     ├── Access package: regnskapsforer-med-signeringsrettighet
  │     ├── Client A
  │     ├── Client B
  │     ├── Client C
  │     ├── Client D
  │     └── Client E
  │
  ├── System user 2 (client relationship) — Sick leave
  │     ├── Access package: sykmelding (delegated by the client)
  │     ├── Client D
  │     └── Client E
  │
  └── System user 3 (client relationship) — Income reporting (example)
        ├── Access package: inntektsmelding (delegated by the client)
        └── Client E
```

**Advantages:**

- Accounting clients **never need to be moved** — they always remain on System user 1.
- When a new additional service arises, you simply create a **new system user** for that service and link the relevant clients to it. You do not need to delete or change existing system users.
- Scales well — the number of system users grows with the number of **service types**, not with the number of combinations of services.
- The end-user system selects the system user based on **which service is being performed**, not which client group the client belongs to.

**Disadvantages:**

- Clients with additional services are linked to multiple system users. The end-user system must keep track of which system user is used for which service.
- The client administrator must maintain client links on multiple system users.

**When a client extends their service agreement:**

1. Client B delegates the access package `sykmelding` to the accounting firm in Altinn.
2. The client administrator adds Client B to System user 2 (sick leave). Client B remains on System user 1 (accounting) as before.
3. No changes are needed for the other clients.

### Which option should you choose?

| | Option 1: Separate by service agreement | Option 2: Shared accounting + separate additional service system users |
|---|---|---|
| **Best suited for** | Few and stable combinations of services | Many or growing combinations of additional services |
| **When clients extend** | The client is moved between system users | The client is added to an additional system user |
| **Number of system users** | One per combination of access packages | One for accounting + one per additional service |
| **Complexity in the end-user system** | Select the correct system user per client | Select the correct system user per service |

### Key considerations (both options)

- The additional access packages (e.g. `sykmelding`) must be **delegated by the client themselves** — they do not follow automatically from the accountant relationship in the Entity Register.
- The system vendor must register the system with **all** relevant access packages in the system register.
- The end-user system must keep track of which system user is used for which client and service, so that the correct token is selected when reporting.

---

## G. Complex organisation structure with sub-entities

**Typical example:** Oslo municipality has several organisational sub-entities (e.g. the Education Department and Grünerløkka district) that are each registered as separate legal entities with their own organisation numbers. Each sub-entity in turn has operational units — schools, kindergartens, health centres and other places of business that perform the day-to-day work. The municipality wants to report centrally for the entire structure through one shared end-user system.

### Starting point

- The main entity (Oslo municipality) has several organisational sub-entities ("organisasjonsledd") registered in the Entity Register. Each sub-entity is an independent legal entity that owns its own rights in Altinn.
- Under each sub-entity there are operational units ("underenheter", e.g. a specific school or health centre). An organisation or user that holds rights for a main entity automatically inherits the same access to its operational units.
- The municipality wants to centralise reporting through a single system user instead of setting up one system user per sub-entity.

### Recommended setup

- **1 system user for client relationships** linked to the end-user system that the main entity uses centrally.
- Each sub-entity **delegates the necessary access packages** to the main entity in Altinn.
- The client administrator at the main entity links each sub-entity to the system user as a client.
- Reporting for an operational unit works automatically as long as the sub-entity it belongs to has been added as a client.

### How it works

```text
Oslo municipality (main entity)
  └── System user for client relationships
        ├── Access packages: delegated by each sub-entity
        │
        ├── Client: Education Department (sub-entity)
        │     ├── Operational unit: Grünerløkka school
        │     ├── Operational unit: Sagene school
        │     └── Operational unit: Bjølsen kindergarten
        │
        └── Client: Grünerløkka district (sub-entity)
              ├── Operational unit: Grünerløkka health centre
              └── Operational unit: Sofienberg nursing home
```

### Why this setup?

Even though the sub-entities are part of the same municipality, each sub-entity is an independent legal entity in the Entity Register and owns its own rights in Altinn. This means the main entity cannot automatically act on behalf of a sub-entity — the sub-entity must actively delegate the access packages to the main entity.

Operational units (schools, health centres and similar) are an exception: an organisation or user that holds rights for a main entity automatically inherits the same access to its operational units. Once the sub-entity has been added as a client, the end-user system can therefore report for all operational units under the sub-entity without any additional setup.

### Key considerations

- **Delegation must be performed by each individual sub-entity.** Access packages do not follow automatically from the connection in the Entity Register. The main entity cannot delegate on behalf of its sub-entities.
- If a sub-entity needs different access packages from the others (e.g. only the Education Department should report A-melding, whilst Grünerløkka district should report VAT), you can combine this setup with scenario C and create one system user per package combination.
- When a new sub-entity is created, it must delegate access packages again, and the client administrator must link it to the system user.
- New operational units require no additional action — they automatically inherit rights from the sub-entity they belong to.
- The end-user system must implement access control so that only authorised employees can act on behalf of each sub-entity and each operational unit.

![System user for a main entity with sub-entities and operational units as clients](./organisasjonsledd.drawio.svg "Complex organisation structure with sub-entities and operational units")

---

## How many system users do I need?

Use this decision tree to determine the right number:

1. **Does the organisation report only for itself?**
   Yes → **1 system user** (scenario A or E).

2. **Does the service provider have only one type of client relationship?**
   Yes → **1 system user for client relationships** (scenario B).

3. **Does the service provider have multiple types of client relationships?**
   Yes → **1 system user per relationship type** (scenario C).

4. **Have some clients delegated additional access packages beyond what follows from the client relationship?**
   Yes → **1 system user per combination of access packages** (scenario F).

5. **Does the service provider need to restrict access by team or department?**
   Yes → Consider **1 system user per team** in addition to per relationship type (scenario D).

6. **Is the organisation a main entity with several sub-entities that should report centrally?**
   Yes → **1 system user** where each sub-entity delegates access packages and is linked as a client (scenario G).

### When NOT to create additional system users

- Do **not** create a separate system user per client. Use client linking on a single system user instead.
- Do **not** create separate system users for different services if they share the same access package and relationship type. One system user can have multiple access packages.

---

## Access control in the end-user system

When using a system user, the public service does not know the identity of the person behind the API call.
The system vendor is therefore responsible for ensuring that only authorised users get access.

### Minimum requirements

- **Authenticate** every user who logs in to the end-user system.
- **Authorise** users so that they can only access clients and functions relevant to their role.
- **Log** which user performed which action and for which client.

### Recommended approach for larger organisations

- Define **roles or teams** in the end-user system (e.g. "property management", "accounting", "audit").
- Assign each role to one or more system users.
- Ensure that an employee in the "property management" role cannot use the system user for "audit", even if the end-user system technically has access to both.

---

## Checklist before going live

- [ ] The system vendor has registered the system with the correct access packages in the system register.
- [ ] The system vendor has sent requests for the correct number of system users.
- [ ] The service provider/organisation has approved all system user requests.
- [ ] Clients are linked to the correct system users (for client relationship scenarios).
- [ ] Access control is implemented in the end-user system (for scenarios with multiple employees or teams).
- [ ] The end-user system can select the correct system user token when reporting for different client types.
- [ ] The setup has been tested with a representative selection of clients before going live.
