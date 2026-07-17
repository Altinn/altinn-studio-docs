---
title: Authorizations for Bankruptcy Estates
linktitle: Authorizations for Bankruptcy Estates
description: This authorization area includes access packages related to authorizations for bankruptcy estates.
toc: true
weight: 100
aliases:
  - /authorization/what-do-you-get/accessgroups/accessgroups/konkursbo/
  - /authorization/modules/accessgroups/type-accessgroups
---

This authorization area includes access packages related to authorizations for bankruptcy estates.

| Access package | Description | URN | For service owners | Contents |
|---|---|---|---|---|
| Bankruptcy estate write access | This authorization gives the estate administrator's assistant access to work on behalf of the estate administrator. The estate administrator delegates this authorization together with Bankruptcy Estate Read Access to the assistant for each bankruptcy estate. | `urn:altinn:accesspackage:konkursbo-skrivetilgang` | Yes | <a href="https://tjenesteoversikten.no/package/konkursbo-skrivetilgang" target="_blank" rel="noopener noreferrer" aria-label="View the contents in Tjenesteoversikten for Bankruptcy estate write access">View contents ↗</a> |
| Bankruptcy estate read access | This authorization is delegated to creditors and others who should have read access to the individual bankruptcy estate. | `urn:altinn:accesspackage:konkursbo-lesetilgang` | Yes | <a href="https://tjenesteoversikten.no/package/konkursbo-lesetilgang" target="_blank" rel="noopener noreferrer" aria-label="View the contents in Tjenesteoversikten for Bankruptcy estate read access">View contents ↗</a> |

Source: [Package definitions in Access Management](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Constants/PackageConstants.cs). Role assignments are defined in [IngestRolePackage.cs](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Data/IngestRolePackage.cs).
