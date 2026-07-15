---
title: Operations and observability
linktitle: Operations
description: Runtime, observability and cross-component troubleshooting for Altinn Authorization.
weight: 8
toc: true
---

Components have separate deployment and operational models. This page provides the cross-cutting view; concrete runbooks belong close to the operated code.

## Runtime

Core services are primarily containerised .NET APIs. Access Management UI consists of a React client and .NET BFF. Audit Log uses Azure Storage Queue, a Function App, a container application and PostgreSQL. Databases and schemas are internal component contracts, not integration surfaces.

## Observability

A complete authorization flow should be traceable through correlation or trace ID, environment and component identity, resource and action, decision result and failure category, and dependency timing. Unnecessary personal data must not be logged.

## Troubleshooting

1. Find the PEP call and confirm the supplied identity context.
2. Check party and representation.
3. Check resource identifier, action and policy.
4. Check relevant roles, delegations or consents.
5. Find the PDP result and distinguish `Deny` from technical failure.
6. Follow correlation to audit events and dependency calls.

Build, local execution, configuration, secrets, health checks and incident details are maintained in each repository. System documentation explains relationships and links to those sources rather than copying volatile operational values.
