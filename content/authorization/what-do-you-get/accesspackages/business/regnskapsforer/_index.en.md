---
title: Authorizations for Accountants
linktitle: Authorizations for Accountants
description: This authorization area includes access packages related to authorizations for accountants.
toc: true
weight: 100
aliases:
  - /authorization/what-do-you-get/accessgroups/accessgroups/regnskapsforer/
---

This authorization area includes access packages related to authorizations for accountants.

| Access package | Description | URN | For service owners | Contents |
|---|---|---|---|---|
| Accountant with signing rights | This authorization allows an accountant to sign on behalf of the client for all services that require signing rights. These are services that have been deemed natural for an accountant to perform on behalf of their client. The authorization is only granted to authorized accountants. Authorization to the accountant occurs when the client registers the accountant in the Central Coordinating Register for Legal Entities. In the event of regulatory changes or the introduction of new digital services, there may be changes in the access that the authorization provides. | `urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet` | Yes | <a href="https://tjenesteoversikten.no/package/regnskapsforer-med-signeringsrettighet" target="_blank" rel="noopener noreferrer" aria-label="View the contents in Tjenesteoversikten for Accountant with signing rights">View contents ↗</a> |
| Accountant salary | This authorization allows an accountant to report salaries for their client. These are services that have been deemed natural for an accountant to perform on behalf of their client. The authorization is only granted to authorized accountants. Authorization to the accountant occurs when the client registers the accountant in the Central Coordinating Register for Legal Entities. In the event of regulatory changes or the introduction of new digital services, there may be changes in the access that the authorization provides. | `urn:altinn:accesspackage:regnskapsforer-lonn` | Yes | <a href="https://tjenesteoversikten.no/package/regnskapsforer-lonn" target="_blank" rel="noopener noreferrer" aria-label="View the contents in Tjenesteoversikten for Accountant salary">View contents ↗</a> |
| Accountant without signing rights | This authorization allows to perform all services that do not require signing rights. These are services that have been deemed natural for an accountant to perform on behalf of their client. The authorization is only granted to authorized accountants. Authorization to the accountant occurs when the client registers the accountant in the Central Coordinating Register for Legal Entities. In the event of regulatory changes or the introduction of new digital services, there may be changes in the access that the authorization provides. | `urn:altinn:accesspackage:regnskapsforer-uten-signeringsrettighet` | Yes | <a href="https://tjenesteoversikten.no/package/regnskapsforer-uten-signeringsrettighet" target="_blank" rel="noopener noreferrer" aria-label="View the contents in Tjenesteoversikten for Accountant without signing rights">View contents ↗</a> |

Source: [Package definitions in Access Management](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Constants/PackageConstants.cs). Role assignments are defined in [IngestRolePackage.cs](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Data/IngestRolePackage.cs).
