---
title: Architecture patterns in Authentication
linktitle: Architecture patterns
description: Patterns for OIDC, token flows and System User in Altinn Authentication.
weight: 1
toc: true
---

Authentication combines identity protocol endpoints with System User workflows. Security-critical state is stored behind repository boundaries.

## OIDC as a protocol state machine

Login, authorisation code, token, session and logout are separate steps with short-lived state.

**Benefits:** Standard steps and explicit validation points.

**Drawbacks:** Many dependent steps complicate troubleshooting; redirect or state errors can become vulnerabilities.

**Code examples**

- [`OidcTokenController` exposes the token step](https://github.com/Altinn/altinn-authentication/blob/e581d8d61542e87709f5b7292af4532693072832/src/Authentication/Controllers/OidcTokenController.cs).

## Token issuance behind a service boundary

Controllers delegate token creation and signing to services and certificate providers.

**Benefits:** Cryptography and key handling are centralised.

**Drawbacks:** Incorrect lifetime, audience or key selection affects every consumer.

**Code examples**

- [`TokenService` creates tokens](https://github.com/Altinn/altinn-authentication/blob/e581d8d61542e87709f5b7292af4532693072832/src/Authentication/Services/TokenService.cs).

## Request and approval workflows

System User separates registered systems, requests, changes and completed system users.

**Benefits:** Approval is auditable and state is explicit.

**Drawbacks:** Transitions must resist invalid and repeated operations.

**Code examples**

- [`RequestSystemUserService` handles requests](https://github.com/Altinn/altinn-authentication/blob/e581d8d61542e87709f5b7292af4532693072832/src/Authentication/Services/RequestSystemUserService.cs).
