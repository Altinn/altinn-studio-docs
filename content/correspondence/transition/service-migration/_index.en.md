---
title: Migration of Service Configuration
linktitle: Service Migration
description: Migration of service configuration for Altinn Correspondence
tags: []
toc: true
weight: 10
---

Due to a simplification of service configuration in Altinn 3 for Correspondences, migration in practice only consists of:

- Creating a new resource in the [Resource Registry](../../../authorization/what-do-you-get/resourceregistry) based on the Altinn 2 service.
- Translating authorization rules to xacml-policy for access control.
  - Note that there is a simplification of rights for Messages between the Altinn 2 and Altinn 3 versions.

## Automatic Migration of Service Configuration

Altinn's "Flytt av Data" project will take responsibility for migrating all necessary configurations for the Correspondence services that have data to be migrated.
The project will create this on behalf of Service Owners so that it can be used to manage access to historical Message data.

- These "migration resources" get a resourceId of the form: `<serviceownercode>-migratedcorrespondence-<altinn2-servicecode>-<altinn2-serviceeditioncode>`.
- Some descriptive fields receive a postfix so they can be distinguished from the Altinn 2 version of the service. For now `- migrated from Altinn 2` is used (subject to change).

Data migration is performed independently of service setup so that data can be migrated before the service must be fully established.

The automatic migration will use the existing Altinn 2 roles specified in the old authorization rules, translated on a best-effort basis.
These roles will eventually be phased out in favor of the new [AccessLists](../../../authorization/what-do-you-get/resourceregistry/rrr/#access-lists) functionality, and there will be a future project to migrate all policies to the new standard. However, this is outside the scope of the Move Data project.

**In general it is _not_ desirable for service owners to modify the created resources or to use them as new production Correspondence services in Altinn 3. They should remain largely unchanged until the migration process is finished and Altinn 2 is shut down. (One exception will be during the transition to AccessLists.)**

NB: There are some new metadata fields, such as service descriptions in different languages, that cannot be automatically filled out and should be completed by the Service Owner afterward.

### Technical Implementation

An internal component is being built in the Altinn 2 codebase that will run in the Altinn 2 infrastructure and perform the migration of service configuration for this purpose.
This component will not be made available to external parties but will only be used by the Move Data project.

## Migration of Service Configuration for Re-establishing a Service

A function in Altinn Studio to let Service Owners manually migrate a Message service configuration was considered, following the pattern for [Migration of Linked Services](../../../authorization/what-do-you-get/resourceregistry/migration/).

This has unfortunately not been prioritized due to few reported services needing re-establishment and limited team capacity.

Service owners who need to re-establish an Altinn 2 Message service as an Altinn 3 Message service should instead follow the [standard steps here](../../getting-started/developer-guides/serviceowner/).

Some service owners have requested import of delegations from the old resource to the new; see the instructions for ordering this in the [delegation migration documentation](../delegation-migration/#manual-import-of-delegations).

{{<children />}}