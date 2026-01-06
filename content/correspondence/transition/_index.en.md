---
title: Transition solution
linktitle: Transition solution
description: Transition solution for Altinn Correspondence
tags: []
toc: true
weight: 60
---

## Migration of Altinn 2 Messages

- Altinn 3 Message largely has the same data model as Altinn 2 to enable mapping and migration.
- All Altinn 2 messages and attachments are migrated to Altinn 3 Message.
- All Altinn 2 message services with data will be created as Altinn 3 message services.
- Data and metadata are migrated to Altinn 3 in a process that is independent of making the elements available in the Dialogporten and Arbeidsflate.
- Making data available via the Altinn 3 API and Dialogporten/Arbeidsflate is done as a separate step after data migration is completed.
- Migration of delegations is done as a separate step but should be performed before messages are made available to end users in the A3 API and Dialogporten/Arbeidsflate.
- Migration of historical data will take time (weeks/months), and the transition solution is built with this in mind.
- Eventually, the migration job will "catch up" with live/fresh data, so the elements can be made available in Altinn 3 shortly after they were created in Altinn 2.
- Since changes can occur to migrated elements in both Altinn 2 and Altinn 3, these changes must be synchronized both ways, but there are certain limitations.

## Transition Solution

- To become independent of the production date for the new Arbeidsflate, Altinn 3 messages are made available in the [Altinn 2 Portal for end users](./portal/).
- No transition solution is made for API endpoints:
  - End-user systems and Service Owner systems must maintain integration with both Altinn 2 and Altinn 3 during a transition period.
  - Migrated messages will, after migration, be accessible via both Altinn 2 and Altinn 3 in their respective versions.

## Overall Process Flow for Migration of Historical Messages

1. **Main migration of historical message data:** A one-time job over time.
   1. Migration of historical data and attachments - [migration of message data](./data-migration/).
   2. [Migration of service configuration](./service-migration/).
2. **Data synchronization period:** Starts when step 1.1 has started and continues until Altinn 2 is shut down.
   1. Continuous migration of **new** messages.
   2. Continuous synchronization of status changes for migrated messages.
3. **[Migration of delegations](./delegation-migration/):** Starts when step 1.2 is completed.
   A large "backlog" is expected when this starts, but in practice, it is the same job/component used in step 4.
4. **Delegation synchronization period:** When steps 1 and 3 are completed, continues until Altinn 2 is shut down.
   Continuous synchronization of changes in delegations on service- and instance level.
5. **Making historical messages available in Altinn 3/Dialogporten/Arbeidsflate:** This can theoretically happen after step 1 is completed, but for the best results, it should occur during period 4.
   - Data from 2025 will be made available first, and then work backwards.
6. **Ongoing migration and availability of messages:** Eventually, all new messages in Altinn 2 will almost immediately go through steps 2, 4, and 5 and thus be continuously available in the Dialogporten/Arbeidsflate.

## Responsibility Sharing

The *"Flytt av data"* project is responsible for developing components for and executing steps 1 and 2, as well as steps 3 and 4 in collaboration with *Team Authorization*.
They also take charge of step 6, while in close collaboration with the other parties.

*Team Dialogporten/Arbeidsflate* is responsible for deciding the when step 5 happens, while *Team Melding og Formidling* executes the actions required.

## Timeline / Dates

As of 2025-10-09 the status is:

In TT02/Staging:
- Steps 1, 2, 3, 4 and 6 are completed.
- Step 5 is completed for messages newer than 2025-08-01; the rest will be done immediately.

In PROD/Production:
- Steps 1, 2, 3, 4 are completed.
- Steps 5 and 6 are pending some performance optimization before starting 6 and 5 in parallel.

{{<children />}}
