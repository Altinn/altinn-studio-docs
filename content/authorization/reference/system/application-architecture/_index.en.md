---
title: Application architecture
linktitle: Application architecture
description: Internal structure, technologies and data ownership for Altinn Authorization applications.
weight: 3
toc: true
---

This page describes the internal construction of each application. [System architecture](../architecture/) describes responsibilities and collaboration across applications, while the [information model](../information-model/) describes the information they process.

Version numbers change frequently. The project files in each repository are therefore the source for currently used versions.

## Common pattern

Most backend applications separate APIs, domain logic, integrations and persistence. These boundaries are most visible in the source code and do not always represent separate runtime processes.

{{< mermaid >}}
flowchart LR
    Client[Client or service] --> API[API layer]
    API --> Core[Domain logic]
    Core --> Integration[Integration layer]
    Core --> Persistence[Persistence layer]
    Integration --> External[External services]
    Persistence --> Database[(Component database)]
{{< /mermaid >}}

| Application | Internal structure | Main technologies | Data ownership |
|---|---|---|---|
| Authentication | Web application, core, integrations and persistence | ASP.NET Core, .NET 10, PostgreSQL, OpenTelemetry and Azure services | Sessions, OIDC clients, registered systems and system-user requests |
| Register | API, core, persistence, integrations and contract package | ASP.NET Core, .NET 9, PostgreSQL, MassTransit and .NET Aspire | Parties, external roles and representation |
| Resource Registry | Web application, core, integrations and persistence | ASP.NET Core, PostgreSQL and Azure services | Resource metadata, references and consent metadata |
| Access Management | Multiple API surfaces, shared core, integrations and persistence | ASP.NET Core, .NET and PostgreSQL | Access relationships, delegations, roles and access packages |
| Authorization/PDP | Web application and shared authorization libraries | ASP.NET Core, XACML and Altinn PEP and ABAC libraries | Decision logic and policy-related information |
| Access Management UI | React client and BFF | React 19, TypeScript, Vite and ASP.NET Core on .NET 10 | UI state and adapted view models |
| Audit Log | API, core, persistence and queue-triggered functions | ASP.NET Core, .NET 10, Azure Functions, Azure Storage Queue and PostgreSQL | Authentication and authorization events |

## Authentication

Authentication is an ASP.NET Core application for browser sign-in and token exchange. The web project exposes APIs and OIDC endpoints. Separate Core, Integration and Persistance projects contain domain logic, outbound clients and PostgreSQL storage. Azure Key Vault provides signing material, Azure Storage Queue transports audit events, and OpenTelemetry provides tracing and metrics.

The system register and System User domains are implemented in the same repository. This code location does not make them part of the authentication domain model.

[See the Authentication application architecture and main APIs.](./authentication/)

## Register

Register manages parties and representation. It consists of an API, domain core, persistence layer, source-specific integrations and a published contracts package. An Aspire AppHost composes dependencies for local development. Other applications should consume APIs, messages or published contracts rather than reading Register database tables.

[See the Register application architecture and main APIs.](./register/)

## Resource Registry

Resource Registry manages metadata for services and other protected resources. Its web, core, integration and persistence projects separate API contracts, domain logic, outbound calls and storage. The resource identifier connects resource metadata to authorization flows.

[See the Resource Registry application architecture and main APIs.](./resource-registry/)

## Access Management

Access Management manages access relationships. Separate APIs serve end users, service owners, enterprises, Maskinporten and internal consumers. They share domain and persistence capabilities. The repository contains both the newer `Altinn.AccessManagement` projects and older `Altinn.AccessMgmt` projects still used by parts of the solution.

[See the Access Management application architecture and main API surfaces.](./access-management/)

## Authorization and PDP

Authorization evaluates access requests. It builds decision context, retrieves required information and evaluates policies and rights. The repository also publishes shared API contract, PEP and ABAC libraries. These libraries are build artefacts, not separate runtime applications.

[See the Authorization application architecture and main APIs.](./authorization/)

## Access Management UI

Access Management UI combines a React and TypeScript client built with Vite and an ASP.NET Core BFF. The BFF adapts data from backend APIs to the user interface. It is not the authoritative source for access data.

[See the Access Management UI application architecture.](./access-management-ui/)

## Audit Log

Audit Log processes events asynchronously. Producers write authentication and authorization events to Azure Storage Queue. Azure Functions process the messages and forward them to an API that stores them in PostgreSQL. The solution separates API, core, persistence and Function App projects.

[See the Audit Log application architecture and event APIs.](./audit-log/)

## Sources in the codebases

The technical details are maintained close to the code:

- `altinn-authentication/docs/architecture.md`
- project files under `altinn-register/src/apps/Altinn.Register/src/`
- project files under `altinn-resource-registry/src/`
- project files under `altinn-authorization-tmp/src/apps/`
- `altinn-access-management-frontend/package.json` and project files under `backend/`
- `altinn-auth-audit-log/README.md` and project files under `src/`
