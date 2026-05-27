---
title: Digital Portal - Altinn Reference Implementation
linktitle: Digital Portal
description: Reference implementation showing how a service owner can integrate with Altinn's service owner API using ID-porten login and scope-based access control.
weight: 7
---

Digital Portal is a reference implementation showing how a service owner can integrate with Altinn's service owner APIs (Access Management and Client Delegations) using ID-porten login and scope-based access control. The application shows the full flow from login with selected OAuth scopes, through token exchange to an Altinn platform token, and calls against Altinn's modern access management APIs on behalf of the logged-in user.

## What the project demonstrates

- **Scope selection at login** where the user picks granular Altinn scopes before being redirected to ID-porten. Only the selected scopes are included in the access token.
- **Authorization Code flow with PKCE (S256)** against ID-porten, state validation, and `code_verifier` stored in a short-lived HttpOnly cookie.
- **Token exchange** from an ID-porten access token to an Altinn platform token via `/authentication/api/v1/exchange/id-porten`.
- **Calls against Altinn's Access Management APIs** to fetch authorised parties, create and delete connections, delegate access packages, and check delegation rights.
- **Client delegations from a service owner perspective** — fetching the clients an organisation has access to act on behalf of.
- **Token introspection** of JWT claims (sub, scope, exp, aud, iss) displayed in the UI after login.
- **Automatic token refresh** that renews the token before expiry.

## Security

- Tokens are stored only in HttpOnly, Secure, SameSite=Strict cookies — never in `localStorage`.
- PKCE with S256, and `state` is validated at callback.
- All client calls to Altinn go through the backend so that the platform token is never exposed to the browser.

## Technology

- Backend: ASP.NET Core (.NET 10).
- Frontend: React, TypeScript, Vite, and the Digdir design system.
- Auto-generated DTOs that mirror Altinn's API models.

## Try the application

The application is running at
[digitalportal.azurewebsites.net](https://digitalportal.azurewebsites.net).

## Read more

The project is available on GitHub:
[DigitalPortal](https://github.com/TheTechArch/DigitalPortal).
