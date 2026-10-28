---
title: Integrations and dependencies
linktitle: Integrations
description: Boundaries towards other Altinn teams, shared services and data sources.
weight: 6
toc: true
---

This page describes why dependencies exist and which trust crosses a system boundary. It is not a setup guide for external consumers.

| Dependency | Use in the system | Ownership and boundary |
|---|---|---|
| ID-porten | Identity proofing for interactive users | External shared service; Authentication is the relying party |
| Maskinporten | Authentication of organisations and client systems | External shared service; client administration is not owned by the team |
| Altinn Access Token | Platform token format/service in relevant flows | Owned by Team Platform |
| Altinn Studio/Apps | Policy administration and PEP close to the app | Other component/team ownership; Authorization provides decisions |
| External role and register sources | Basis for parties, roles, guardianship and representation | Source authority is outside the system |
| PostgreSQL | Persistence for several authorization components and Audit Log | Component schema and lifecycle boundaries must be respected |
| Azure Storage Queue | Asynchronous transport of audit events | Delivery, duplicates and failures require explicit handling |

## Trust in tokens

A token is not an authorization decision. Authentication validates the evidence and establishes identity context. Authorization then combines identity with representation, resource, rights and policy.

## Ownership when contracts change

Changes to contracts across system boundaries require coordination with the other owner. This particularly applies to token claims, party identifiers, resource identifiers, event formats and decision-request semantics.
