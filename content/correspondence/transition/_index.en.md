---
title: Transition solution
linktitle: Transition solution
description: Transition solution Altinn Correspondence
tags: []
toc: false
weight: 60
---

# Overall Strategy

To simplify the transition from Altinn 2 to the Altinn 3 version of the Correspondence product, an overall strategy has been followed aiming to balance complexity and user-friendliness for all parties.

- Altinn 3 Correspondence largely has the same data model as Altinn 2 to enable mapping/migration.
- All Altinn 2 Correspondences and attachments are migrated into Altinn 3 Correspondence.
- All Altinn 2 Correspondence services with data will be created as Altinn 3 Correspondence services.
- Data/metadata is migrated in a process that also makes the elements available in the Dialogporten and Arbeidsflate.
- Migration of historical data will take time (weeks/months), and the transition solution is built with this in mind.
- Eventually, the migration job will "catch up" with live/fresh data, so the elements can be made available in Altinn 3 shortly after they were created in Altinn 2.
- To become independent of the production date for the new Arbeidsflate, Altinn 3 Correspondences are made available in the Altinn 2 Portal for end users.
- No transition solution is made for API endpoints:
  - End-user systems and Service Owner systems must maintain integration with both Altinn 2 and Altinn 3 during a transition period.

## Display of Altinn 3 Correspondence in Altinn 2 Portal

To quickly have a GUI solution for end users independent of the delivery of the Arbeidsflate, the current Altinn 2 portal is extended to fetch and display Altinn 3 Correspondences.

This enables a similar user experience for end users who do not receive Correspondences via end-user systems.

The display will be largely similar to the existing display of Altinn 2 Correspondences, but with some differences.

- No "Archive" button

## Migration of Service Configuration

Altinn's "Move Data" project will take responsibility for migrating all necessary configuration from Altinn 2 to Altinn 3 and will create this on behalf of Service Owners.

Due to a simplification of service configuration in Altinn 3 for Correspondences, this only consists of:

- Creating a resource in the Resource Registry based on the Altinn 2 service
  - Authorization rules/policy for access control.

There are some new metadata fields such as service description in different languages that cannot be automatically filled out and should be filled out by the Service Owner afterward.

## Migration of Correspondence Data and Attachments

The "Move Data" project will take responsibility for migrating all historical Correspondences and attachments to the new solution.

- A batch-based job will migrate Correspondences and associated attachments from Altinn 2 to Altinn 3.
- The migrated version of an element will have a reference to its old Altinn 2 version, exposed in the field: "Altinn2CorrespondenceId" in the [CorrespondenceOverview endpoint](../reference/API-endpoints/)
- After migration, the elements will no longer be available in the Altinn 2 API.
  - But they are now available on par with other Altinn 3 Correspondences; via Altinn 3 API, Dialogporten, Workspace, and Altinn 2 Portal.
- No data is deleted; the Correspondences are only flagged in the database, and it is possible to perform the migration again and/or manually retrieve data if needed.

The migration will take place over time, and there is flexibility to control which services are migrated and what criteria are used to prioritize the elements.

### Migration Criteria

To avoid the need to build complex logic for synchronization across systems, the process has been simplified by allowing the Service Owner to define a minimum time interval "**migration wait time**" per service.

Based on the analysis of Correspondence usage, most activity on a Correspondence occurs shortly after it is created and shortly after associated notifications and re-notifications have been sent out.
For most; within 14 days of creation.

By delaying migration until after this period, there is no need to handle complex logic for synchronizing changes to the Correspondence such as read confirmation, deletion, and archiving across systems.

As end users and end-user systems integrate with Altinn 3 and use it as their main channel, the **migration wait time** can be reduced so that elements can be migrated a few minutes after creation.

### Detailed Migration Process per Element

The migration process will be divided into several steps to reduce risk and can be controlled per Correspondence, with the ability to delete data and restart the process.
No data is deleted from Altinn 2.

1. Migration of Correspondence data and attachments from Altinn 2 to Altinn 3, using the service configuration created [above](#migration-of-service-configuration).
2. Creation of the migrated Correspondence in the Dialogporten.
3. Blocking access to the Altinn 2 version of the element.

During migration, status history including notification information up to the time of migration is included.

Initially, each of these steps will be triggered manually by the Move Data team, but eventually, as full production for all components approaches, it will be handled automatically in a single process.

### Synchronization of Status Changes between Altinn 2 and 3

There will be no synchronization of status changes on Correspondences or notifications between the two solutions after migration is completed.

Existing status/history will be migrated in step 1, and after step 3, the Altinn 2 element is blocked from further changes.

This is to avoid significant technical complexity and dependencies across systems.

## Consequences for the Parties

Here is a brief summary of the consequences of the chosen transition and migration solution for the different parties:

### Service Owner

- When creating the Correspondence in the API, the Correspondence is created in the environment being called ("home" of the element).
  - If in A2, migration will occur to A3 after **migration wait time**, but notification will be completed in A2 regardless of migration.
  - If in Altinn 3, the Correspondence will be available in the Altinn 2 Portal.
- Checking the status of a Correspondence created in A2 must be done against A2 and possibly then against A3 after migration.
  - Since migration is performed after **migration wait time**, it is assumed that the Service Owner does not need to check for the same element in both A2 and A3, but that changes of interest have already occurred in A2.
- Integration with Altinn 3 API is required to create/follow up on new Correspondences there.
  - They can use the migrated services or establish entirely new ones.

### End Users

Via Altinn 2 portal:

- Get a full overview in the Altinn portal of both Altinn 2 and 3 elements.
- When they open an Altinn 3 element, it is displayed in the Altinn 2 Portal, similar to an Altinn 2 element.

Via End-User System:

- First get Altinn 3 elements when the End-User System has integrated with A3.

Via Arbeidsflate:

- Get Correspondences created in Altinn 3, as well as those that have been migrated.
- Correspondences in Altinn 2 that have not been migrated will not be available.

### End-User System

- To get a full overview of elements, integration with both Altinn 2 and Altinn 3 API is required.
- When elements are migrated from A2 to A3, it is possible to identify this by the A3 element containing the Altinn 2 Correspondence ID.
  - This makes it possible to exclude any duplicates.
- When the element is migrated, the End-User System must be integrated with the Altinn 3 API to continue working with it.
  - But given that migration occurs after the expected active period, there should be no need.

### Dialogporten and Arbeidsflate

- Altinn 2 elements are not made available until they are migrated, but migration can occur relatively quickly after they are created in Altinn 2 (controlled by **migration wait time**).

{{<children />}}