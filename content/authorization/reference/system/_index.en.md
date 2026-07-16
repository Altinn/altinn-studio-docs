---
title: System documentation
linktitle: System
description: Technical documentation of how Altinn Authorization is built and how its components work together.
weight: 1
toc: false
---

This section describes how Altinn Authorization is built. It is intended for developers and architects in the team, and for others who want to understand the solution, its responsibilities and technical relationships.

It is not an integration guide for system vendors or service owners. For integration and API usage, see [getting started](/en/authorization/getting-started/), [guides](/en/authorization/guides/) and the [API documentation](/en/api/).

## The system in one sentence

Altinn Authorization combines identity, party, resource, rights and context to decide whether an action is permitted and to make the decision traceable.

## Reading guide

- [Architecture](architecture/) describes the system context, responsibilities and overall construction.
- [Application architecture](application-architecture/) describes internal structure, technologies and data ownership.
- [Development architecture](development-architecture/) describes how the source code is divided, built, tested and delivered.
- [Components](components/) explains component ownership and collaboration.
- [Technical flows](flows/) follows the most important calls through the system.
- [Integrations and dependencies](integrations/) describes boundaries towards other Altinn teams and shared national services.
- [Security and trust](security/) describes trust boundaries and security principles.
- [Operations and observability](operations/) describes runtime, events and cross-component troubleshooting.

{{<children />}}
