---
title: File transfer life-cycle
linktitle: Life cycle
description: Altinn 3 Broker file transfer life cycle
tags: []
toc: true
weight: 10
---

# Broker File Transfer Life Cycle

Altinn Broker file transfer status life cycle, including TUS upload stages, sliding expiration, and post-publish recipient actions.

## Overview

A file transfer goes through several status states from creation to purge. Broker is shown here as **one continuous life cycle**: initialize → upload (including TUS) → publish → recipient actions → purge.

## Status overview

### File transfer (`FileTransferStatus`)

| Status | Meaning |
|--------|---------|
| `Initialized` | Metadata created; ready for upload |
| `UploadStarted` | At least one byte / TUS create accepted |
| `UploadProcessing` | Checksum and/or malware scan in progress |
| `Published` | Available for recipient download |
| `AllConfirmedDownloaded` | Every recipient has confirmed download |
| `Failed` | Upload or processing failed |
| `Purged` | Content removed (TTL or post-confirm grace) |
| `Cancelled` | Reserved in the model; not written by current API paths |

### Recipient (`ActorFileTransferStatus`)

| Status | Meaning |
|--------|---------| 
| `Initialized` | Recipient registered at initialize |
| `DownloadStarted` | Recipient started download |
| `DownloadConfirmed` | Recipient confirmed download |

## Complete life cycle

{{< broker-life-cycle >}}

**Colour legend:** green = successful status milestones · blue = waiting / sliding windows · red = failure · orange = alert or client error · pink = start/end · light blue = purged.

## Important timespans

| Concern | Default | Notes |
|---------|---------|--------|
| TUS incomplete upload | **24 h sliding** | `TusOptions.UploadExpiration`; renewed on upload activity |
| Stuck `UploadStarted` → `Failed` | **24 h** idle | Skipped if TUS activity within last **1 h** |
| Stuck `UploadProcessing` | **15 min** | Slack notification only |
| Brokerbox session cookie | **60 min sliding** | Extended by successful API/TUS traffic |
| Altinn token in cookie | ~**2 min** | Re-exchanged via ID-Porten refresh while possible |
| ID-Porten authorization | ~**2 h** hard cap | After that, TUS may continue on **active upload session** grace for the same `fileTransferId` |
| File transfer TTL | **30 d** (max **365 d**) | Schedules expiry purge at initialize |
| Purge after all confirmed | **PT2H** (max **PT24H**) | Resource-configurable grace |
| Virus scan size limit | **50 GB** | Larger files may skip scan depending on configuration |

## Key points

- **Upload phase** is either legacy stream or TUS (including parallel partials + final concat).
- **Resumability** for incomplete TUS uploads is a **sliding 24-hour** window of inactivity, not wall-clock from create.
- **Overnight browser uploads** can outlive ID-Porten login by accepting an expired session **only** for an already-active TUS upload on that transfer.
- **Published** is the downloadable state (there is no separate `Available` status).
- **Malware failure** deletes storage and sets `Failed`; it does **not** move the transfer to `Purged`.
- **Recipient confirm** requires a prior `DownloadStarted`; when all have confirmed, optional grace purge runs.
