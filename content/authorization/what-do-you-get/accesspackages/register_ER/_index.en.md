---
title: Roles from the Central Coordinating Register for Legal Entities
linktitle: From the Central Coordinating Register
description: How roles from the Central Coordinating Register give access packages and authority to act for an organisation
tags: [architecture, security, authorization]
toc: true
weight: 200
hidden: true
aliases:
  - /authorization/what-do-you-get/accessgroups/register_er/
---

Altinn obtains information about roles in organisations from the Central Coordinating Register for Legal Entities. A role may give its holder access packages and the ability to delegate access on behalf of the organisation.

The organisation type determines which roles an organisation can register. The Brønnøysund Register Centre determines who holds the role. Altinn determines which access packages the role provides.

## How a role gives access

1. The organisation registers an individual or another organisation in a role in the Central Coordinating Register.
2. Altinn Register retrieves the role relationship.
3. Altinn Access Management maps the role to one or more access packages.
4. The service owner links actions in the service to an access package through the service policy.

The role does not therefore contain a fixed list of services. Access follows from the combination of the role, its mapping to an access package and the policy that the service owner has set for the service.

## Distinguish access from administration

A role mapping may provide different capabilities:

- **Has access** means that the role holder can use services included in the package.
- **Can delegate** means that the role holder can give the package to others.
- **Can assign** is used for some administrative mappings and means that the role holder can assign access within the relevant area.

These capabilities do not always accompany each other. For example, an accountant may receive accounting packages without being able to delegate them.

## Examples of roles and pre-assigned packages

The table shows key examples. Mappings may change when packages or services change.

| Role from the register | Example packages | Can delegate the example packages? |
|---|---|---|
| Managing director, chair of the board and owner of a sole proprietorship | Client administrator, access management, main administrator and Maskinporten administration | Yes |
| Accountant | Accountant with signing rights, accountant without signing rights and payroll accountant | No |
| Auditor | Auditor in charge and assistant auditor | No |
| Business manager for a housing cooperative or condominium | Business manager for real estate | No |
| Estate administrator | Bankruptcy estate read access and bankruptcy estate write access | Yes |
| Contact person for an NUF and Norwegian representative for a foreign entity | Services for NUF and selected administrative packages | Yes |

<a href="https://tjenesteoversikten.no/packages" target="_blank" rel="noopener noreferrer">See which services are included in the access packages in Tjenesteoversikten (opens in a new tab)</a>. Tjenesteoversikten is an unofficial information tool built by the Authorization team using open APIs.

## Roles without pre-assigned packages

Being registered with a role does not mean that the role automatically gives access in Altinn. Board member, deputy board member and contact person are examples of roles that do not necessarily have pre-assigned access packages.

The individual may still receive access if someone who can delegate gives them an access package or access to an individual service.

## The organisation type affects the result

Not every role can be registered for every organisation type. Some mappings apply only to specific organisation types. For example, a business manager receives the real estate management package when the organisation is a housing cooperative or condominium.

Another organisation may also hold a role. In some cases, Altinn can then pass the access on to individuals in the connected organisation. [Read how organisation connections work](./knytning_org/).

## What service owners need to consider

- Choose an access package that covers the task the user must perform, rather than a particular job title.
- Check that the package does not give broader access than the service requires.
- Do not assume that everyone with a registered role can delegate their access.
- Test with the organisation types and roles that the target users actually have.
- Describe any additional requirements in the guidance for the service.

## Sources and maintenance

The Access Management code is the technical source of truth:

- [Role definitions in RoleConstants.cs](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Constants/RoleConstants.cs)
- [Mappings between roles and access packages in IngestRolePackage.cs](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Data/IngestRolePackage.cs)
- [Access package definitions in PackageConstants.cs](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Constants/PackageConstants.cs)

[The Brønnøysund Register Centre describes the Central Coordinating Register and the information it contains](https://www.brreg.no/en/about-us-2/our-registers/about-the-central-coordinating-register-for-legal-entities-ccr/).
