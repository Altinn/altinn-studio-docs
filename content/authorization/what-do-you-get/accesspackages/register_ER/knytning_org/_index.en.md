---
title: When one organisation holds a role for another
linktitle: Organisation connections
description: How a role from the Central Coordinating Register can pass access through a connected organisation
tags: [architecture, security, authorization]
toc: true
weight: 1
hidden: true
aliases:
  - /authorization/what-do-you-get/accessgroups/register_er/knytning_org/
---

A role in the Central Coordinating Register may be held by an individual or an organisation. When an organisation holds the role, individuals who represent the connected organisation may in some cases act on behalf of the organisation that granted the role.

This is used, for example, when an organisation has another organisation as its accountant, auditor or business manager.

## How the connection works

Example:

- Fjordhandel AS has registered Regnskapspartner AS as its accountant.
- Kari represents Regnskapspartner AS with a role that provides the relevant accounting access.
- Kari can use the pre-assigned accounting packages on behalf of Fjordhandel AS.

Kari does not receive every access held by Fjordhandel AS. She receives only the access that follows from the accountant role and its associated access packages.

## The role at each end matters

Altinn considers

- the role that connects the organisations
- the role or access held by the individual in the connected organisation
- the access packages mapped to the role
- the actions that the service owner has placed in the packages through the service policy

A connection between two organisations is therefore not a general power of attorney by itself.

## Access does not pass through an unlimited chain

Organisation connections must not be understood as a chain in which access automatically passes through any number of organisations.

If Bergen AS has registered Trondheim AS as its managing director, and Oslo AS is in turn the managing director of Trondheim AS, this does not automatically mean that a representative of Oslo AS can act on behalf of Bergen AS. Check the actual access in Altinn when several organisations form a chain.

## Subunits

A subunit is connected to one or more main units in Register. Roles are normally registered for the main unit. Access to a subunit must therefore be assessed from its connection to the main unit and the rules for the relevant service.

Service owners should test both the main unit and the subunit if subunits can use the service.

## Sole proprietorships

A sole proprietorship and its owner are closely connected, but they are separate parties in Altinn. Do not assume that access for the business always applies to the owner as a private individual, or vice versa. The service policy and the specific role relationship determine who receives access.

## How to investigate specific access

1. Find the role registered between the organisations.
2. Find the access packages provided by the role.
3. Check whether the individual can use or administer the package through the connected organisation.
4. Check which services and actions are included in the package.
5. Test with representative test data before putting the service into use.

[Read how roles from the Central Coordinating Register map to access packages](../).

<a href="https://tjenesteoversikten.no/packages" target="_blank" rel="noopener noreferrer">Inspect the contents of access packages in Tjenesteoversikten (opens in a new tab)</a>. Tjenesteoversikten is an unofficial information tool.

## Sources and maintenance

- [Register code that imports and stores roles from the Central Coordinating Register](https://github.com/Altinn/altinn-register/tree/main/src/apps/Altinn.Register)
- [Role definitions in Access Management](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Constants/RoleConstants.cs)
- [Mappings between roles and access packages](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Data/IngestRolePackage.cs)
