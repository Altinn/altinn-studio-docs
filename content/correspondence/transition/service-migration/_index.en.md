---
title: Migration of Service Configuration
linktitle: Service Migration
description: Migration of Service Configuration for Altinn Correspondence
tags: []
toc: true
weight: 10
---

Due to a simplification of service configuration in Altinn 3 for Correspondence, migration in practice only consists of:

- Creating a new resource in the [Resource Registry](../../../authorization/what-do-you-get/resourceregistry) based on the Altinn 2 service
- Translate authorization rules to xacml-policy for access control.
  - Note that there is a simplification of rights for Correspondence between the Altinn 2 and Altinn 3 versions.

## Automatic Migration of Service Configuration

Altinn's "Flytt av Data" project will take responsibility for migrating all necessary configuration for the Correspondence services that have data to be migrated.
The project will create this on behalf of Service Owners so that it can be used for migrating historical Correspondence data.

The automatic migration will use the existing Altinn 2 Roles specified in the old authorization rules, mapped in a best-effort manner.
These roles will eventually be phased out in favor of the new [AccessLists](../../../authorization/what-do-you-get/resourceregistry/rrr/#access-lists) functionality, and there will be a future project to migrate all policies to the new standard in the future, but this is out-of-scope for the data migration project.

NB: There are some new metadata fields such as service description in different languages that cannot be automatically filled out and should be filled out by the Service Owner afterward.

## Manual Migration of Service Configuration

A function in Altinn Studio is being considered that the service owner can use to manually migrate a Correspondence service configuration.
It will follow the same pattern that can be used for [Migration of Linked Services](../../../authorization/what-do-you-get/resourceregistry/migration/)

## Technical Implementation

- The Altinn 2 SBLBridge component is extended with a method that maps a specified Correspondence service from Altinn 2 to Altinn 3 service resource.
- An internal component is built in the Altinn 2 codebase that will run in the Altinn 2 infrastructure and perform migration of service configuration for data migration purposes.
  This component will not be made available to external parties, but only used by the Move Data project.

{{<children />}}
