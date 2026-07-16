---
title: Development architecture
linktitle: Development architecture
description: How the Altinn Authorization source code is divided, built, tested and delivered.
weight: 4
toc: true
---

Development of Altinn Authorization is divided across several repositories. The boundaries generally follow component ownership, whilst Authorization and Access Management share a monorepo. [Application architecture](../application-architecture/) describes the internal structure of the applications. This page describes how developers work with the source code and prepare changes for operation.

Versions, commands and workflows change more frequently than the architecture. The project files, `README.md` and workflows under `.github/workflows/` in each repository are therefore the sources for current details.

## Source code distribution

| Repository | Code and artefacts | Main development boundary |
|---|---|---|
| [`altinn-authentication`](https://github.com/Altinn/altinn-authentication) | Authentication, OIDC flows and the JWT cookie library | One .NET solution for the application, with separate tests and selected shared packages |
| [`altinn-register`](https://github.com/Altinn/altinn-register) | Register application and `Altinn.Register.Contracts` | The application and published contract package are versioned from the same repository |
| [`altinn-resource-registry`](https://github.com/Altinn/altinn-resource-registry) | Resource Registry | One .NET solution with application and persistence tests |
| [`altinn-authorization-tmp`](https://github.com/Altinn/altinn-authorization-tmp) | Authorization/PDP, Access Management, shared libraries, NuGet packages, tools and infrastructure | The monorepo divides the code into verticals that can be built, tested and delivered independently |
| [`altinn-access-management-frontend`](https://github.com/Altinn/altinn-access-management-frontend) | React client and .NET BFF | Frontend and BFF are developed and tested together but have separate build jobs |
| [`altinn-auth-audit-log`](https://github.com/Altinn/altinn-auth-audit-log) | Audit Log API, persistence and queue-triggered Azure Functions | The API is built as a container whilst the function application is published as a separate artefact |

The `altinn-authorization-tmp` repository also contains a copy of the Register code. The authoritative codebase for Register is `altinn-register`. Register changes should therefore be made there and synchronised through the agreed workflow, rather than developed independently in the copy.
## The repository architecture is changing

The table describes the current distribution of source code. The team is gradually bringing more components into `altinn-authorization-tmp`. Resource Registry, for example, is due to move from `altinn-resource-registry` into this monorepo.

During the transition, a component may therefore exist in two repositories. This does not mean that both copies should be developed in parallel. The team must identify the authoritative codebase, explain how changes are synchronised and decide when builds and delivery move to the new repository. This documentation should show the current authoritative codebase until ownership has actually transferred.

The move changes development and delivery boundaries, but does not necessarily change component responsibilities or API contracts. [The component overview](../components/) describes the logical responsibilities independently of the source code location.

## From change to delivery

{{< mermaid >}}
flowchart LR
    Change[Code or configuration change] --> PR[Pull request]
    PR --> Checks[Build, tests and static analysis]
    Checks --> Main[Main branch]
    Main --> Artefact[Container, function or NuGet package]
    Artefact --> Test[Test environment]
    Test --> Release[Versioned release]
    Release --> Production[Production]
{{< /mermaid >}}

Each repository owns its continuous integration and delivery. A pull request normally triggers a build, automated tests and code analysis. Security checks such as CodeQL and container scanning also live close to the codebase. After a change is merged, the workflows build a traceable artefact from the relevant commit and deliver it to one or more test environments. Production deployment follows a versioned release or an approved delivery workflow.

Consequently, a system change across several components must be coordinated as several compatible deliveries. API contracts and message formats must work whilst producers and consumers run different versions.

## Building and running locally

The backend repositories use .NET solutions as the common entry point for builds and tests. Several integration tests start PostgreSQL or other dependencies in containers. A successful build without an available container runtime does not therefore necessarily cover the complete test suite.

| Area | Local entry point | Local dependencies |
|---|---|---|
| Authentication | `Altinn.Platform.Authentication.sln` and `dotnet run` from the application project | .NET SDK and a container runtime for integration tests |
| Register | `Altinn.Register.sln` and the .NET Aspire AppHost | .NET SDK, a container runtime and local data sources or substitutes where required |
| Resource Registry | `ResourceRegistry.sln` and the Compose setup | .NET SDK, a container runtime and PostgreSQL |
| Authorization and Access Management | `Altinn.Authorization.sln`, the application solutions and commands in `.justfile` | .NET SDK, PowerShell, Just and a container runtime; selected flows require Azure access |
| Access Management UI | Yarn commands in `package.json` and the BFF solution under `backend/` | Node.js/Yarn and the .NET SDK; hybrid startup can use services in an Altinn test environment |
| Audit Log | `Altinn.Auth.AuditLog.sln` | .NET SDK, PostgreSQL and Azurite for testing the queue flow locally |

Developers should use the commands in the relevant repository. The table identifies the entry points; it is not a shared procedure that replaces the repository guides.
### Tools are not shared across all repositories

.NET Aspire is not a common standard for Altinn Authorization. Register uses an Aspire AppHost to start the application and local dependencies together. The other repositories use different entry points according to their needs:

- Authorization and Access Management use Just and containers for the local development environment.
- Resource Registry uses Compose.
- Authentication mainly runs with `dotnet run`, whilst its integration tests use containers.
- Access Management UI uses Yarn and Vite for the React client and .NET tooling for the BFF.
- Audit Log uses PostgreSQL and Azurite, among other tools, to run the complete event flow locally.

When a component moves into the monorepo, the team must decide whether it should retain its tools or adopt the monorepo's shared development setup. Moving the source code does not therefore automatically make the local development environment identical across all components.

## Test strategy

Tests live close to the component and contract they protect:

- unit tests cover domain logic, serialisation and isolated services
- integration tests cover APIs, persistence and interaction with realistic local dependencies
- Bruno collections in Authentication and Resource Registry, among others, support manual and automated API flow checks
- Playwright tests key user journeys in Access Management UI, whilst Vitest and Testing Library cover frontend components
- k6 scenarios in the authorization repository and Authentication provide targeted performance tests
- scheduled system tests cover selected flows against shared test environments

Cross-repository tests should use published APIs and events. They should not couple components through internal project references or direct database access.

## Delivery artefacts

The executable APIs and the BFF are mainly delivered as container images. Workflows label images with a commit or release version so that running code can be traced back to its source. Audit Log additionally publishes Azure Functions separately.

Shared .NET contracts and authorization libraries are delivered as versioned NuGet packages. These include the Register contracts and the PEP and ABAC packages. A package version is a contract between repositories: consumers choose when to upgrade, and the package owner must preserve compatibility or describe an explicit breaking change.

Infrastructure for Authorization and Access Management lives under `infra/` in the monorepo and has separate validation and delivery workflows. Application code and infrastructure can therefore change in the same pull request but are built and approved as separate deliveries.

## Responsibility for cross-component changes

When a change affects several repositories, its owner must determine

- which repository owns the contract
- whether the change is backwards compatible
- the order in which components can be delivered
- how both the old and new versions will be tested during the transition
- how the team can roll back without making stored data or messages unreadable

A safe default is to extend the contract first, deliver the consumer next and remove the old behaviour last. Database changes must follow the same principle: both the old and new application versions should be able to use the schema whilst a deployment or rollback is in progress.

## Sources in the codebases

- `altinn-authentication/README.md`, `docs/development.md` and `.github/workflows/`
- `altinn-register/README.md`, `src/apps/`, `src/pkgs/` and `.github/workflows/`
- `altinn-resource-registry/README.md`, the solution project files and `.github/workflows/`
- `altinn-authorization-tmp/README.md`, `docs/testing/`, `eng/`, `infra/` and `.github/workflows/`
- `altinn-access-management-frontend/README.md`, `package.json`, `backend/`, `playwright/` and `.github/workflows/`
- `altinn-auth-audit-log/README.md`, the project files under `src/` and `.github/workflows/`
