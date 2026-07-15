---
title: Authentication
linktitle: Authentication
description: Application architecture and main APIs in Altinn Authentication.
weight: 1
toc: true
---

Authentication handles browser sign-in, token exchange and System User. The diagram shows the main APIs, key application services and boundaries towards core logic, integrations and persistence.

Select a blue API box to open its controller on GitHub. Green service boxes link to key application services.

<object data="authentication-application.svg" type="image/svg+xml" aria-label="Authentication application architecture with links to source code" style="width:100%;height:auto;min-height:760px;display:block;"></object>

## Main areas

- **Identity and tokens** cover sign-in, OIDC, token exchange, introspection, logout and self-identified users.
- **System Register** describes systems offered by system vendors.
- **System User** covers requests, approval, changes and client delegation.
- **Shared layers** provide domain models, integrations and persistence used by the APIs.

The diagram shows logical code boundaries. Boxes do not necessarily represent separate processes or deployable units.
