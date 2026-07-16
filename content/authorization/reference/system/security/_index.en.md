---
title: Security and trust
linktitle: Security
description: Trust boundaries and security principles in Altinn Authorization.
weight: 8
toc: true
---

The authorization system processes security-critical data and decisions. Security depends on the complete chain, not only on the PDP algorithm.

## Trust boundaries

- Between an external identity provider and Authentication.
- Between Authentication and consumers of identity context.
- Between PEP and PDP.
- Between Authorization and sources of party, role, resource, policy and delegation data.
- Between event producer, queue, processor and Audit Log storage.

## Principles

- Validate issuer, signature, audience, lifetime and required claims before using identity.
- Do not equate the signed-in identity with the party represented.
- Use stable party and resource identifiers throughout the flow.
- Make PEP handling of `Deny`, missing decisions and technical failures explicit; do not fail open.
- Limit sensitive data in logs, tokens and decision context.
- Treat policy, role and delegation changes as security-relevant events.
- Correlate calls without treating a correlation ID as authentication evidence.

## Decision and enforcement

PDP evaluates supplied information and returns a result. Correct security requires the PEP to provide sufficient context, interpret the result correctly and enforce it before performing the protected action.

Component-specific threat models, key rotation, secret management, data classification and incident procedures should be documented close to the component and linked from this page.
