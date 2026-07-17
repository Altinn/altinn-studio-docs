---
title: The XACML decision model
linktitle: XACML decision model
description: How the PDP, PAP, PRP, PIP, context handler and PEP work together in Altinn Authorization.
weight: 10
toc: true
---

Altinn Authorization bases its decision model on the separation of responsibilities in XACML. The model separates policy administration, retrieval of decision data, decision-making and enforcement.

## Components in an authorisation decision

| Role | Responsibility | Detailed reference |
|---|---|---|
| **PDP (Policy Decision Point)** | Evaluates the request and returns a decision. | [How the PDP is constructed.](/en/authorization/reference/architecture/accesscontrol/) |
| **PAP (Policy Administration Point)** | Creates and manages authorisation policies. | [How policies are administered.](/en/authorization/reference/architecture/accessmanagment/pap/) |
| **PRP (Policy Retrieval Point)** | Retrieves the policy that applies to the resource. | [How the PRP retrieves policies.](/en/authorization/reference/architecture/accesscontrol/prp/) |
| **PIP (Policy Information Point)** | Supplies information about the subject, resource and context. | [How the PIP supplies decision data.](/en/authorization/reference/architecture/accesscontrol/pip/) |
| **Context handler** | Collects and normalises the information required by the PDP. | [How the context handler processes the request.](/en/authorization/reference/architecture/accesscontrol/contexthandler/) |
| **PEP (Policy Enforcement Point)** | Enforces the decision at the protected service. | [How the PEP enforces the decision.](/en/authorization/reference/architecture/accesscontrol/pep/) |

## Location in the system documentation

[System architecture](../../architecture/) shows the system-level boundaries. [Application architecture for Authorization](../../application-architecture/authorization/) describes the application that performs the PDP function. The pages linked in the table remain the detailed reference for the XACML roles and retain their previous addresses.
