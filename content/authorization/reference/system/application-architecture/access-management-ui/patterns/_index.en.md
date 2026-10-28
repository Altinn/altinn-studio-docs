---
title: Architecture patterns in Access Management UI
linktitle: Architecture patterns
description: Patterns in the React client and BFF for Access Management UI.
weight: 1
toc: true
---

Access Management UI combines a React client with an ASP.NET Core backend for frontend (BFF). The patterns support a user interface that aggregates several authorisation services.

## Backend for frontend

The BFF exposes endpoints shaped around user tasks and hides service topology and access tokens from the browser.

**Benefits:** Fewer browser calls, simpler contracts and one security boundary.

**Drawbacks:** The BFF can become a new monolith, duplicate backend logic and add latency.

**Code examples**

- [`AccessPackageController` exposes a UI-specific API](https://github.com/Altinn/altinn-access-management-frontend/blob/8539d5bd44c1fbace079a65dfa42831a599f8806/backend/src/Altinn.AccessManagement.UI/Altinn.AccessManagement.UI/Controllers/AccessPackageController.cs).

## Ports and client adapters

Core depends on client interfaces, whilst the integration project contains HTTP adapters.

**Benefits:** Integrations can be replaced and tested in isolation.

**Drawbacks:** Numerous similar interfaces and models add mapping and navigation.

**Code examples**

- [`IAccessManagementClient` is a core port](https://github.com/Altinn/altinn-access-management-frontend/blob/8539d5bd44c1fbace079a65dfa42831a599f8806/backend/src/Altinn.AccessManagement.UI/Altinn.AccessManagement.UI.Core/ClientInterfaces/IAccessManagementClient.cs).

## Dedicated view models

Frontend models shape data for screens instead of exposing integration contracts.

**Benefits:** The UI is insulated from backend changes.

**Drawbacks:** Models can be duplicated and drift from their source.

**Code examples**

- [`AccessPackageFE` is a view model](https://github.com/Altinn/altinn-access-management-frontend/blob/8539d5bd44c1fbace079a65dfa42831a599f8806/backend/src/Altinn.AccessManagement.UI/Altinn.AccessManagement.UI.Core/Models/AccessPackage/Frontend/AccessPackageFE.cs).
