---
title: Migration of Correspondence Data
linktitle: Data Migration
description: Migration of Correspondence Data for Altinn Correspondence
tags: []
toc: true
weight: 20
---

The "Flytt av Data" project will take responsibility for migrating all historical Correspondences and attachments to the new solution.

- An automated job migrates Correspondences and associated attachments from Altinn 2 to Altinn 3 using a dedicated API endpoint.
- The migrated version of an element will have a reference to its old Altinn 2 version, exposed in the field: "Altinn2CorrespondenceId" in the CorrespondenceOverview endpoint.
- After migration, the elements will no longer be available in the Altinn 2 API.
  - But they are now available on par with other Altinn 3 Correspondences;
    - Altinn 3 Correspondence API.
    - Dialog Portal.
    - Unified Workspace.
    - Display in Altinn 2 Portal.
- No data is deleted as a result of migration; the Correspondences are only flagged in the database, and it is possible to perform the migration again and/or manually retrieve data if needed.

The migration will take place over time, and there is flexibility to control which services are migrated and what criteria are used to prioritize the elements.

## Volume and Migration Rate

It is estimated that over 500 million Correspondences with attachments will be migrated from Altinn 2 to Altinn 3.
Therefore, it is planned to perform the migration gently, starting with smaller volumes over time to gather experience and avoid disrupting the environments.

Over time, the rate will increase and eventually be almost up to date with live traffic in Altinn 2 as it slowly decreases and Altinn 2 is phased out.

## Migration Criteria

To avoid the need to build complex logic for synchronization across systems, the process has been simplified by allowing the Service Owner to define a minimum time interval "**migration wait time**" per service.

Based on the analysis of Correspondence usage, most activity on a Correspondence occurs shortly after it is created and shortly after associated notifications and re-notifications have been sent out.
For most; within 14 days of creation.

By delaying migration until after this period, there is no need to handle complex logic for synchronizing changes to the Correspondence such as opening, read confirmation, and deletion across systems.

As end users and end-user systems integrate with Altinn 3 and use it as their main channel, the **migration wait time** can be reduced so that elements can be migrated a few minutes after creation.

The migration component will work with a whitelist of services that can be migrated and will extract x number of elements per service per run where:

- Age is older than the **migration wait time** set for the respective service.
- Sorted by oldest Correspondence first, but can also take the newest.

## Detailed Migration Process per Element

The migration process per Correspondence will be divided into several steps to reduce risk and can be controlled per Correspondence, with the ability to delete data and restart the process.
No data is deleted from Altinn 2.

1. Migration of Correspondence data and attachments from Altinn 2 to Altinn 3, using the [service configuration that has been migrated](../service-migration/).
2. Creation of the migrated Correspondence in the Dialog Portal / Unified Workspace.
3. Blocking access to the Altinn 2 version of the element.

Initially, each of these steps will be triggered manually by the Flytt av Data team, but eventually, as full production for all components approaches, it will be handled automatically in a single process.

## What Data is Migrated?

- Only Correspondences that are neither archived nor marked as deleted.
- Correspondence content, including text and all attachments and metadata.
- A limited form of notification history: Time and recipient address, but not text content.
- Change history; including opening and read confirmation.
- Altinn 2 CorrespondenceId and NotificationId, making it possible to look up in Altinn 2 in cases where more detailed investigations are needed.

## Synchronization of Status Changes between Altinn 2 and 3

There will **not** be any form of synchronization of status changes on Correspondences or notifications between the two solutions after migration is completed.

Existing status/history will be migrated in step 1, and after step 3, the Altinn 2 element is blocked from further changes and is no longer externally available. The data is not deleted from Altinn 2.

This is to avoid significant technical complexity and dependencies across systems.

## Technical Implementation

- A dedicated endpoint is created in Altinn 3 Correspondence that only provides access to the Migration component; [MigrationController](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Controllers/MigrationController.cs).
- An Altinn 2 AltinnBatch-based migration component "MigrateCorrespondence" is created
  - Consumes the migration endpoint.
  - Uses configuration in the Altinn 2 database to control migration.
  - Can be triggered manually with parameters, but will over time run more or less continuously.

{{<children />}}
