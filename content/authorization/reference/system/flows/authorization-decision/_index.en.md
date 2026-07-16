---
title: Trace an authorisation decision end to end
linktitle: Executable authorisation flow
description: Run, trace and troubleshoot a representative PDP decision.
weight: 1
toc: true
---

This exercise uses an existing Bruno test for a system user with a directly delegated access package. It expects `Permit` for `read`. Paths are based on [source commit `20fcb3f`](https://github.com/Altinn/altinn-authorization-tmp/tree/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb).

## What the exercise shows

The request calls `POST /authorization/api/v1/decision` with the system-user UUID, `read`, resource identifier and resource-party organisation number. Authorization enriches context, loads policy, evaluates roles and delegations, checks any access list and creates an audit event.

## Prerequisites and execution

You need `altinn-authorization-tmp`, Bruno or Bruno CLI, access to an agreed test environment, a valid subscription key and approved test data. Retrieve secrets through the approved solution and never commit them.

Open:

```text
src/apps/Altinn.Authorization/test/Bruno/Altinn.Authorization
```

Choose the agreed environment and run:

```text
shared/Decision/SystemUser_AccPkg_ToDo_Scenarios/
  SysUser_DirectDelg_AccPkg_Permit.bru
```

The pre-request script supplies `subjectSystemUser`, `resourceId` and `resourceOrgno`. Success is HTTP `200` with `response[0].decision` equal to `Permit`.

## Request attributes

| Category | Attribute | Meaning |
|---|---|---|
| AccessSubject | `urn:altinn:systemuser:uuid` | acting system user |
| Action | `urn:oasis:names:tc:xacml:1.0:action:action-id` | `read` |
| Resource | `urn:altinn:resource` | protected resource |
| Resource | `urn:altinn:organization:identifier-no` | resource party |

Do not change shared test data without agreement.

## Follow the code

1. [`DecisionController.Post`](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Controllers/DecisionController.cs) receives internal JSON or XML.
2. Context Handler enriches party, role and resource context.
3. PRP loads the resource policy.
4. PDP evaluates the policy.
5. On `NotApplicable`, relevant delegations are loaded and evaluated.
6. A preliminary `Permit` may become `Deny` when a required access list rejects the party.
7. Event Log creates the event when enabled.
8. the Audit Log function consumes `authorizationeventlog` and calls the Audit Log API.

## Run locally

```powershell
just dev
dotnet build Altinn.Authorization.sln
dotnet run --project src/apps/Altinn.Authorization/src/Altinn.Authorization
```

Follow the repository README for database and secret configuration. A local process using shared backends is a hybrid test. A full `Permit` requires consistent resource, policy, party and delegation data across dependencies.

## Interpret and troubleshoot

`Permit` must still be enforced by the PEP. `Deny` is explicit refusal, `NotApplicable` means no relevant rule produced a decision, and `Indeterminate` means evaluation failed. `401` or `403` before the XACML response usually concerns API access.

Check environment and subscription key; subject, resource party, resource and action; current policy; role or delegation; access list; feature flags and test data. Use trace or correlation ID across dependencies and Audit Log. Never log complete tokens or unnecessary decision context.