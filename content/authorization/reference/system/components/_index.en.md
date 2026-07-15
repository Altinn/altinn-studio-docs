---
title: Components
linktitle: Components
description: Responsibilities, data and collaboration for Altinn Authorization components.
weight: 4
toc: true
---

Component boundaries follow domain responsibility, but do not always match repository or deployment boundaries. This table is the starting point when placing a change or tracing a failure.

| Component | Responsibility | Important dependencies | Source repository |
|---|---|---|---|
| Authentication | Browser sign-in, session, token exchange and identity context | ID-porten, Maskinporten, UIDP/FEIDE, Altinn Access Token | `altinn-authentication` |
| Register | Party information, roles and representation | Population, organisation and role sources | `altinn-register` |
| Resource Registry | Resource metadata, policy association, actions, access packages and consent basis | Policy and administration surfaces | `altinn-resource-registry` |
| Access Management | Rights, delegations, client relationships and access read models | Register, Resource Registry and Authorization | `altinn-authorization-tmp` |
| Access Management UI | Access Management user interface and BFF | Access Management APIs and Authentication | `altinn-access-management-frontend` |
| System User | System register, system-user requests and relationships between system, vendor and customer | Authentication, Maskinporten, Access Management and Resource Registry | `altinn-authentication` |
| Consent | Creation, representation and validation of consent-based authority | Resource Registry and Access Management | multiple authorization components |
| Authorization/PDP | Build decision context, retrieve policy and evaluate access | Register, Resource Registry, Access Management and protected service | `altinn-authorization-tmp` |
| Audit Log | Receive, process and store authentication and authorization events | Authentication, Authorization, Azure Storage Queue and PostgreSQL | `altinn-auth-audit-log` |

## Authentication

Authentication is an OIDC-based authorization server that delegates identity proofing to external identity providers. It establishes an Altinn session for browser flows and exchanges trusted external tokens into identity context used by the platform. System User is implemented in the same repository but is a separate domain product.

## Register and Resource Registry

Register answers *who* and *on behalf of whom*. Resource Registry answers *what*. Party data describes subject and representation, while resource metadata and policy describe the protected object and possible actions.

## Access Management

Access Management administers access relationships. Backend services and the UI are separately deployable components, but the UI is not a separate product. Relevant rights data becomes part of the PDP decision basis.

## Authorization and PDP

The Authorization application exposes decision capabilities. It receives subject, resource, action and context, enriches the request and evaluates it against policy and rights. The XACML model is used for policy and decisions with a deliberately limited feature set.

## Audit Log

Audit Log receives events asynchronously through queues, processes them in a Function App and stores them through a containerised API in PostgreSQL. Its role is traceability, audit and troubleshooting support; it is not the primary application log for every service.
