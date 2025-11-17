---
title: 'Status Migration'
description: 'Status migration of data to Dialogporten'
weight: 70
cascade:
  params:
    diataxis: diataxis_explanation
---

## Status

Live sync: All changes[^1] (forms, messages) show up in Dialogporten.

[^1]: Except for app instances from Altinn 2 which are not completed (e.g. started filling out a form, but not completed)

### Historic data

| Source | Migrated back to |
|----------|----------|
| A2-Correspondence | 22.01.2025 |
| A2 archived forms / A3-app instances | 01.03.2025 with exception for some days |

## Goals and plans

By the end of 2025, all historic 2025-data will be migrated to Dialogporten.

Older data will be migrated by Q2 2026, starting with the newest data first.

## Details
Dialogs in Dialogporten come from three sources: directly via Dialogporten's API, from Correspondence (messages), or app instances (e.g. filled forms).
For the two latter, we separate between data created in Altinn 2 and data created in Altinn 3, and between live-sync of changes and migration of historic data.

For each of the different data sources below, a brief status update, explanation of the source and any other relevant details.

### ✔ Dialog services
All changes done directly to Dialogporten's API is available immediately.

Typically used where the service owner either has their own platform, or handle dialogs outside the default functionality of Altinn Correspondence or Altinn Studio/apps.

### ⚠ A2 Correspondence - Historic
Currently migrated back to 22nd of January 2025. Older correspondence will be migrated later.

Manual process. Historic correspondence is migrated from Altinn 2 correspondence to Altinn 3 correspondence. The correspondences are then migrated to Dialogporten in a separate process.

### ✔ A2 Correspondence - Live
New messages created in Altinn 2 correspondence are migrated to Dialogporten in near real-time (every 5 minutes).
Live sync is active for both tt02 and prod.

### ✔ A3 Correspondence
All new messages created in Altinn 3 correspondence are available in Dialogporten immediately. No migration needed.

### ⚠ A3 App instances - Historic
Migrated back to 1st of March 2025, with exception for some days in March. Older app instances will be migrated later.

### ✔ A3 App instances - Live
New app instances created in Altinn 3 are available in Dialogporten immediately. Changes are synced in real-time.

### ⚠ A2 Archived forms - Historic
Migrated back to 1st of March 2025, with exception for some days in March. Older archived forms will be migrated later.

### ✔ A2 Archived forms - Live
New app instances created in Altinn 2 are migrated in batches every 5 minutes.

## Changelog

17.11.2025: More historic data migrated. Correspondence back to 22.01.2025, app instances and archived forms back to 01.03.2025 (with exception for some days).

14.11.2025: First version of this page released.