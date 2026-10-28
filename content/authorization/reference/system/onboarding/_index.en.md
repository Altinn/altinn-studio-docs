---
title: New developer in Altinn Authorization
linktitle: New to the team
description: Learn the system, codebases and development workflow during your first week.
weight: 1
toc: true
---

This guide helps you understand ownership boundaries, build relevant code and trace an authorisation decision. Ask your buddy to confirm which environments and components you will work with.

## Outcomes

You should be able to explain identity, party, representation, resource, right, PDP and PEP; find the repository that owns a change; build and test relevant code; trace `Permit` and `Deny`; and find the correct logs and owner.

## Your first day

Confirm access to GitHub repositories, team work surfaces, the relevant Azure account and test environment, observability tools and approved secret management. Production access is not required to begin.

Read [system architecture](../architecture/), [information model](../information-model/), [components](../components/), [the executable authorisation flow](../flows/authorization-decision/) and [security](../security/) in that order.

Ask: who is acting, which party is represented, what resource and action are requested, where does the right originate, who enforces the decision, and where can the event be traced?

## Find the repository

| Area | Repository |
|---|---|
| Sign-in, sessions and tokens | `altinn-authentication` |
| Party and representation | `altinn-register` |
| Resource metadata and policy | `altinn-resource-registry` |
| Access, delegation and PDP | `altinn-authorization-tmp` |
| UI and BFF | `altinn-access-management-frontend` |
| Audit events | `altinn-auth-audit-log` |

Resource Registry is planned to move into the monorepo. Always confirm the authoritative copy.

## Build before changing anything

The repository README is authoritative. A short monorepo baseline is:

```powershell
dotnet build Altinn.Authorization.sln
dotnet test -- --filter-trait "Category=Unit"
```

Integration tests require a container runtime. Green unit tests do not cover the complete integration.

## First main exercise

Follow [one authorisation decision end to end](../flows/authorization-decision/). Complete it with your buddy the first time if you need a test environment, subscription key or test data.

Never copy tokens, keys or personal data into documentation, terminal history, screenshots or pull requests.

## First code change and first week

Choose a small change within one component boundary, with a clear test and safe rollback. Run relevant tests, describe changed behaviour and delivery order, and check artifacts for secrets.

During the first week, trace `Permit` and `Deny`, inspect resource-policy registration and a delegation, follow an event to Audit Log, identify key dashboard signals, read the component patterns and persistence model, and join a real code review.

## Suggested five-day onboarding plan

Adjust the order if your first assignment requires a different component.

### Day one: System and language

**Goal:** Explain Altinn Authorization without starting with repository or class names.

1. Read system architecture, information model and components.
2. Restate the chain of trust: identity, representation, resource, right, decision and traceability.
3. Choose one story, such as a system user reading a resource for an organisation.
4. Place PDP, PEP and authoritative data sources in the story.
5. Review the model with your buddy.

**Output:** A short explanation and a list of concepts that remain unclear.

**Checkpoint:** You distinguish the acting identity from the represented party, and know that PDP decides whilst PEP enforces.

### Day two: Repository and development environment

**Goal:** Build the relevant code and understand repository boundaries.

1. Clone or update the repository.
2. Read `README.md`, solution structure and relevant `AGENTS.md` files.
3. Locate the application, domain core, integrations, persistence and tests.
4. Run the build and shortest unit-test suite.
5. Find the pull-request workflow and its checks.
6. Note dependencies requiring containers, Azure or a shared environment.

For the monorepo, start with:

```powershell
dotnet build Altinn.Authorization.sln
dotnet test -- --filter-trait "Category=Unit"
```

**Output:** A successful build and a simple map of folders you expect to change.

**Checkpoint:** You know which code is authoritative and which tests the short check did not run.

### Day three: Decision in practice

**Goal:** Run and explain one permitted and one denied decision.

1. Complete [the executable authorisation flow](../flows/authorization-decision/).
2. Inspect subject, resource, action and resource party.
3. Follow `DecisionController`, Context Handler, PRP and PDP.
4. Find the transition from role evaluation to delegations.
5. Find where an access list may change preliminary `Permit` to `Deny`.
6. Run an existing negative Bruno test or agree a safe negative scenario.
7. Compare result and status code.

**Output:** A table of input, data sources, decision and explanation for both tests.

**Checkpoint:** You distinguish a domain decision from missing API access and technical evaluation failure.

### Day four: Data, integrations and observability

**Goal:** Locate decision data and follow it through operational surfaces.

1. Open the persistence model for your component.
2. Find the table, blob, queue or external API supplying each key value.
3. Choose one integration and record owner, contract, authentication, timeout and failure behaviour.
4. Run the golden path with a trace or correlation ID.
5. Find relevant logs, traces and metrics.
6. Follow the audit event as far as your access permits.
7. Confirm observability data does not expose complete tokens or unnecessary personal data.

**Output:** A short troubleshooting log showing where you looked, signals found and ownership transitions.

**Checkpoint:** You distinguish authoritative data, cache and data read from another service.

### Day five: First safe change

**Goal:** Deliver a small real improvement through the normal workflow.

Choose with your buddy a test clarifying behaviour, better error handling or observability, documentation close to code, or a small defect with known expected behaviour.

1. Describe expected behaviour before editing.
2. Create or identify the protecting test.
3. Make the smallest necessary change.
4. Run relevant unit and integration tests.
5. Check contracts, migrations and delivery order.
6. Open a pull request with test evidence and rollback assessment.
7. Review feedback with your buddy.

**Output:** A small pull request meeting team quality requirements.

**Checkpoint:** Another developer can understand why it is safe, how it was tested and which components it affects.

## Review with your buddy

| Area | I can do this | I need practice |
|---|---|---|
| Explain domain concepts |  |  |
| Find the correct component and repository |  |  |
| Build and run relevant tests |  |  |
| Trace `Permit` and `Deny` |  |  |
| Locate decision data |  |  |
| Use logs, traces and metrics |  |  |
| Make a small safe change |  |  |

Agree one area to deepen during the next month and one concrete task where you can apply it.
## When you get stuck

| Symptom | First check |
|---|---|
| `401` or `403` before PDP response | token, scope, subscription key and API boundary |
| `Deny` | subject, represented party, resource, action and access list |
| `NotApplicable` | no policy rule matches |
| `Indeterminate` | invalid context, missing policy or evaluation failure |
| different result between environments | test data, policy version, delegations, feature flags and configuration |
| missing audit event | feature flag, queue, processor and correlation |

Never edit a shared database directly to make a test pass. Use the supported API or test-data flow.