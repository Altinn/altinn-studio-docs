---
title: 'Status Migration'
description: 'Status migration of data to Dialogporten'
weight: 70
cascade:
  params:
    diataxis: diataxis_explanation
---

## In short

All changes[^1] (forms, messages) show up in Dialogporten.
Older data is migrated back to X july 2025. For correspondence, back to 8th of April 2025.
Older data will be migrated later.

[^1]: Except for app instances from Altinn 2 which are not completed (e.g. started filling out a form, but not completed)

## Goals and plans

By the end of 2025, all historic 2025-data will be migrated to Dialogporten.

Older data will be migrated by Q2 2026, starting with the newest data first.

## Details
Dialogs in Dialogporten come from three sources: directly via Dialogporten's API, from Correspondence (messages), or app instances (e.g. filled forms).
For the two latter, we separate between data created in Altinn 2 and data created in Altinn 3.

For each of the different data sources below, a brief status update, explanation of the source and any other relevant details.

### {{< icon "check" >}} Dialog services
All changes done directly to Dialogporten's API is available immediately.

Typically used for specialized processes where the service owner either has their own platform, or handle dialogs outside the default function of Altinn Correspondence or Altinn Studio/apps.

### {{< icon "warning" >}} A2 Correspondence - Historic
Currently migrated back to 8th of April 2025. Older correspondence will be migrated later.

Manual process. Historic correspondence is migrated from Altinn 2 correspondence to Altinn 3 correspondence. The correspondences are then migrated to Dialogporten in a separate process.

### {{< icon "check" >}} A2 Correspondence - Live
New messages created in Altinn 2 correspondence are migrated to Dialogporten in near real-time (cirka every 5 minutes).
Live sync is active for both tt02 and prod.

### {{< icon "check" >}} A3 Correspondence
All new messages created in Altinn 3 correspondence are available in Dialogporten immediately. No migration needed.

### {{< icon "warning" >}} A2 App instances - Historic
Historic data not currently migrated

### {{< icon "check" >}} A2 App instances - Live
New app instances created in Altinn 2 are migrated in batches every 5 minutes.

Data is migrated 


| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
|          |          |          |
|          |          |          |
|          |          |          |
|          |          |          |
|          |          |          |
|          |          |          |
|          |          |          |
|          |          |          |


<table class="status-table">
  <thead>
    <tr>
      <th>Status</th>
      <th>Column 2</th>
      <th>Column 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="status status-ok">
        <!-- inline check SVG -->
        <svg class="icon" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M9 16.2l-3.5-3.5L4 14.2 9 19.2 20 8.2 17.5 5.7z"/></svg>
        OK
      </td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td class="status status-warn">
        <svg class="icon" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M1 21h22L12 2 1 21zM12 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 3v-2h0v2z"/></svg>
        Warning
      </td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td class="status status-fail">
        <svg class="icon" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3 10.6 10.6 16.9 4.3z"/></svg>
        Failed
      </td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td class="status status-ok"><svg class="icon" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 16.2l-3.5-3.5L4 14.2 9 19.2 20 8.2 17.5 5.7z"/></svg> OK</td><td></td><td></td>
    </tr>
    <tr>
      <td class="status status-warn"><svg class="icon" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M1 21h22L12 2 1 21zM12 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 3v-2h0v2z"/></svg> Warning</td><td></td><td></td>
    </tr>
    <tr>
      <td class="status status-fail"><svg class="icon" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3 10.6 10.6 16.9 4.3z"/></svg> Failed</td><td></td><td></td>
    </tr>
    <tr>
      <td class="status status-ok"><svg class="icon" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 16.2l-3.5-3.5L4 14.2 9 19.2 20 8.2 17.5 5.7z"/></svg> OK</td><td></td><td></td>
    </tr>
    <tr>
      <td class="status status-warn"><svg class="icon" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M1 21h22L12 2 1 21zM12 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 3v-2h0v2z"/></svg> Warning</td><td></td><td></td>
    </tr>
  </tbody>
</table>


## Changelog

06.11.2025: First version of this page released.