---
title: Migration of Correspondence Data
linktitle: Data Migration
description: Migration of Correspondence Data for Altinn Correspondence
tags: []
toc: true
weight: 20
---

The "Flytt av Data" project will take responsibility for migrating all historical correspondences and attachments to the new solution.

- An automated job migrates correspondences and associated attachments from Altinn 2 to Altinn 3 using a dedicated API endpoint.
- The migrated version of an element will have a reference to its old Altinn 2 version, exposed in the field: "Altinn2CorrespondenceId" in the CorrespondenceOverview endpoint.
- After migration, the elements will still be available in the Altinn 2 API.
- After migration, changes to the element will be synchronized both ways, between the Altinn 2 and Altinn 3 versions of the element.
- The Altinn 3 version of the migrated element will, once migration is complete, have an "IsMigrating" flag that keeps it hidden from regular API calls.
- When the flag "IsMigrating" is removed, the migrated message will become available in the same manner as other Altinn 3 Correspondences.
  - Altinn 3 Correspondence API.
  - Display in Altinn 2 Portal.
  - Can be created in Dialogporten and thus accessed in Arbeidsflate.
- No data is deleted as a result of migration; the correspondences are only flagged in the database, and it is possible to perform the migration again and/or manually retrieve data if needed.

The migration will take place over time, and can be configured to re-migrate messages.

## Volume and Migration Rate

It is estimated that over 500 million correspondences with attachments will be migrated from Altinn 2 to Altinn 3.
Therefore, it is planned to perform the migration gently, starting with smaller volumes over time to gather experience and avoid disrupting the environments.

Over time, the rate will increase and eventually be almost up to date with live traffic in Altinn 2 as it slowly decreases and Altinn 2 is phased out.

## Migration Criteria

The migration component will extract a certain number of elements per run for all services, sorted by the oldest message first.

## Detailed Migration Process per Element

The migration process per correspondence will be divided into several steps to reduce risk and can be controlled per correspondence, with the ability to delete data and restart the process.
No data is deleted from Altinn 2.

1. Migration of message data and attachments from Altinn 2 to Altinn 3, where we are not dependent on [service configuration](/en/correspondence/transition/service-migration/).
2. Migration of necessary [service configuration](/en/correspondence/transition/service-migration/) and access rules.
3. Migration of associated instance and service delegations.
4. Creation of the migrated message in the Dialog Portal/Unified Workspace.

Initially, steps 1, 2, and 3 will be triggered manually as separate actions by the Move Data team, and step 4 will be triggered by the Dialog Portal/Unified Workspace.

Eventually, as full production for all components approaches, this will be handled automatically in a single process for new messages.

## What Data is Migrated?

- Only correspondences that have not been deleted. (added to "deleted items" or permanently deleted)
- No correspondences for dead people.
- Correspondence content, including text and all attachments and metadata.
- A limited form of notification history: Time and recipient address, but not text content.
- Change history; including opening, read confirmation, and information about forwarding and instance delegation.
- Altinn 2 CorrespondenceId and NotificationId, making it possible to look up in Altinn 2 in cases where more detailed investigations are needed.

## Synchronization of Status Changes between Altinn 2 and 3

There will be two-way synchronization of status changes and events on messages between Altinn 2 and Altinn 3 after migration is completed.

This solution will be referred to as "CorrespondenceSync".

Existing status/history will be migrated in step 1 but will be continuously synchronized as changes occur.

Because there are some differences and technical limitations, synchronization consists of the following events:

### Events synchronized both ways

- Opened / read
- Confirmed
- Permanent deletion

### Events synchronized only from Altinn 2 to 3

- Archiving
- Move to trash / remove from trash
- Notification sent
- Forwarding

## Technical Implementation

- A dedicated endpoint is created in Altinn 3 Correspondence that only provides access to the Migration component; [MigrationController](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Controllers/MigrationController.cs).
- An Altinn 2 AltinnBatch-based migration component "MigrateCorrespondence" is created
  - Consumes the migration endpoint.
  - Uses configuration in the Altinn 2 database to control migration.
  - Can be triggered manually with parameters, but will over time run more or less continuously.
- A synchronization job "AltinnCorrespondenceSync" is created to synchronize status events for messages from Altinn 2 to 3.
  - It calls dedicated sync endpoints in the Altinn 3 Correspondence API.
- In Altinn 3 Correspondence, the handlers for "Read", "Confirmed" and "Purged" are extended
  - These call dedicated "Sync" endpoints in the Altinn 2 SBLBridge API.

{{<children />}}
