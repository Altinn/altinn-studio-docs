---
title: 'Status Migration'
description: 'Status migration of data to Dialogporten'
weight: 70
cascade:
  params:
    diataxis: diataxis_explanation
---

## Status

⚠ 25/11: Live-sync of correspondence (both from Altinn 2 and Altinn 3) is temporarily paused due to technical issues. For historic correspondence, there are missing historic messages from Altinn 2 correspondence, and wrong dates on existing ones. We are working to resolve these three issues as soon as possible.

28/11: Corrections and migration of data back to and including December 2024 is in progress.

Live sync: All other changes (A3 app instances)[^1] (forms, messages) show up in Dialogporten.

[^1]: Except for app instances from Altinn 2 which are not completed (e.g. started filling out a form, but not completed)

### Historic data

| Source | Migrated back to |
|----------|----------|
| A2-Correspondence | 01.12.2024 |
| A2 archived forms / A3-app instances | 01.01.2025 |

For A2-correspondence, some messages are missing, and some migrated messages have timestamp-errors resulting in the wrong date being displayed in the inbox.

## Goals and plans

Phase 1: By the end of 2025, all historic 2025-data will be migrated to Dialogporten.
25/11: We will migrate data back to and including December 2024 as part of this.

Phase 2: Older data will be migrated by Q2 2026, starting with the newest data first.

## Details
Dialogs in Dialogporten come from three sources: directly via Dialogporten's API, from Correspondence (messages), or app instances (e.g. filled forms).
For the two latter, we separate between data created in Altinn 2 and data created in Altinn 3, and between live-sync of changes and migration of historic data.

For each of the different data sources below, a brief status update, explanation of the source and any other relevant details.

### ✔ Dialog services
All changes done directly to Dialogporten's API is available immediately.

Typically used where the service owner either has their own platform, or handle dialogs outside the default functionality of Altinn Correspondence or Altinn Studio/apps.

### ⚠ A2 Correspondence - Historic
Currently migrated back to 1st of January 2025. Older correspondence will be migrated later.

Manual process. Historic correspondence is migrated from Altinn 2 correspondence to Altinn 3 correspondence. The correspondences are then migrated to Dialogporten in a separate process.

See [correspondence data-migration](https://docs.altinn.studio/en/correspondence/transition/data-migration/) for details on the migration process.

### ⚠ A2 Correspondence - Live
25/11: Live-sync is temporarily paused due to migration errors.
<!-- New messages created in Altinn 2 correspondence are migrated to Dialogporten in near real-time (every 5 minutes).
Live sync is active for both tt02 and prod. -->
See [correspondence data-migration](https://docs.altinn.studio/en/correspondence/transition/data-migration/#synchronization-of-status-changes-between-altinn-2-and-3) for details on the synchronization process.

### ⚠ A3 Correspondence
25/11: Live-sync is temporarily paused due to migration errors.
<!-- All new messages created in Altinn 3 correspondence are available in Dialogporten immediately. No migration needed. -->

### ⚠ A3 App instances - Historic
Migrated back to 1st of January 2025. Older app instances will be migrated later.

### ✔ A3 App instances - Live
New app instances created in Altinn 3 are available in Dialogporten immediately. Changes are synced in real-time.

### ⚠ A2 Archived forms - Historic
Migrated back to 1st of January 2025. Older archived forms will be migrated later.

### ✔ A2 Archived forms - Live
New app instances created in Altinn 2 are migrated in batches every 5 minutes.

## Changelog

28.11.2025: 
- A2 archived forms and A3 app instances historic have been migrated back to 01.01.2025 (was 01.02.2025). 
- Corrections and migration of data back to and including December 2024 is in progress.
- Added link to [correspondence data-migration](https://docs.altinn.studio/en/correspondence/transition/data-migration/) for details on migration/synchronization process.

25.11.2025: More data have been migrated, pause in correspondence live-sync, goal updated:
- Historic A2-correspondence migrated further back to and including 01.01.2025, with exceptions mentioned below.
- Goal updated on migration phase 1: will migrate old data back to and including December 2024 by 2025.
- Live-sync of A2 and A3 correspondence temporarily paused due to synchronization issues.
- A2-correspondence messages are missing in the period already migrated. We are working to migrate these as well.
- Historic correspondence-dialogs have some wrong dates displayed in inbox. These will be corrected.

18.11.2025: App instances and archived forms back to 01.02.2025.

17.11.2025: More historic data migrated. Correspondence back to 22.01.2025, app instances and archived forms back to 01.03.2025 (with exception for some days).

14.11.2025: First version of this page released.