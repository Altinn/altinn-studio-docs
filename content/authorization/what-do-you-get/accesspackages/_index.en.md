---
title: Access packages and roles
linktitle: Access packages and roles
description: Access packages group services and resources by task or subject so organisations can grant suitable authorisations without assigning each service separately.
weight: 3
aliases:
  - /authorization/what-do-you-get/accessgroups/
  - /authorization/modules/accessgroups/
  - /authorization/what-do-you-get/accesspackages/catalog/
---

## Who defines the packages and access?

The Authorisation team at Digdir defines and maintains the access packages and authorisation areas in Access Management. The team determines their names, descriptions, URNs and properties. It also defines which roles from the Central Coordinating Register for Legal Entities provide a package by default.

Service owners determine what an access package authorises for their services. In the authorisation policy, the service owner connects a predefined package to a resource and specifies the permitted actions, such as reading or writing. The Resource Registry reads these connections from the authorisation policies.

> An access package does not contain a fixed list of services or actions. Its effective content is the combination of the authorisation policies in which service owners have used the package.

## Shared packages across service owners

An access package may contain services from several service owners. Granting an access package therefore grants access to every service and resource included in that package, not only to services from one organisation.

Service owners should choose a package based on the task and the level of access required. Packages containing sensitive services may require explicit assignment rather than access inherited from a role in the Central Coordinating Register for Legal Entities.

- [See authorisation areas and access packages for organisations](./business/).
- [See authorisation areas and access packages for individuals](./citizens/).

The **View contents** links on the area pages open the package in Tjenesteoversikten in a new tab. Tjenesteoversikten is an unofficial visualisation that uses Altinn's open APIs.

## If no access package fits

Service owners cannot create an access package themselves. Send requests for new packages to [Altinn servicedesk](mailto:servicedesk@altinn.no). The Authorisation team assesses whether an existing package covers the need or whether the catalogue should be extended.

Describe the services or resources that the package should cover, who needs access, the relevant actions and whether the access includes information that requires special protection.

## Sources for maintenance

The Access Management code is the source of truth for the catalogue:

- [`PackageConstants.cs`](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Constants/PackageConstants.cs) defines the names, descriptions, URNs, authorisation areas and properties of the access packages.
- [`AreaConstants.cs`](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Constants/AreaConstants.cs) defines the authorisation areas.
- [`IngestRolePackage.cs`](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Data/IngestRolePackage.cs) defines which roles are assigned which packages.
- [DelegationCheckHelper.cs](https://github.com/Altinn/altinn-resource-registry/blob/main/src/Altinn.ResourceRegistry.Core/Utils/DelegationCheckHelper.cs) shows how the Resource Registry reads resources, actions and access packages from authorisation policies.
