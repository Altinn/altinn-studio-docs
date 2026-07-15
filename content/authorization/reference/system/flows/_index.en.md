---
title: Technical flows
linktitle: Flows
description: The main cross-component flows in Altinn Authorization.
weight: 5
toc: true
---

The flows highlight transitions of responsibility between components. Detailed API contracts and integration steps belong in the API and guide sections.

## Interactive authentication

1. A browser starts sign-in with Authentication.
2. Authentication delegates identity proofing to a configured provider, typically ID-porten.
3. After successful sign-in, Authentication establishes session and identity context.
4. Services use this context for subsequent authorization checks.

## Machine-to-machine token exchange

1. A client presents a token from a trusted issuer, typically Maskinporten.
2. Authentication validates issuer, signature, audience, lifetime and relevant claims.
3. External identity and representation are translated into Altinn identity context.
4. Altinn Access Token participates as a platform dependency owned by Team Platform.

## Authorization decision

1. A PEP creates or forwards a request with subject, resource, action and context.
2. Authorization enriches the context with party, role and resource information when required.
3. Relevant policy and delegated rights are retrieved.
4. PDP evaluates the request and returns a decision.
5. The PEP enforces the decision; PDP does not perform the protected action.
6. Security-relevant events may be sent to Audit Log.

## Rights administration

1. The UI or an authorised client calls Access Management.
2. The service validates who may administer the right for the party and resource.
3. The access relationship is stored and made available through read models.
4. A later PDP request uses the relationship as part of its decision basis.

## System User

System User connects a registered vendor system to a customer organisation and a constrained set of rights. Establishment and runtime are separate flows: the relationship is first created and approved; a Maskinporten-authenticated system may then act for the customer within delegated rights.

## Consent

Consent uses resource definitions and metadata from Resource Registry. A consent establishes purpose-bound and often time-limited authority. Validation combines identity, grantor, recipient, resource, action, purpose and validity.
