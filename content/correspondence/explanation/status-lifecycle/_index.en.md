---
title: Correspondence Life Cycle
linktitle: Correspondence Life Cycle
description: Altinn 3 Correspondence status life cycle and states overview.
tags: []
toc: true
weight: 14
---

## Correspondence Life Cycle Overview

A correspondence in Altinn 3 goes through several status states during its life cycle. The flow is divided into two main phases:

## Two Main Phases

### 1. [Pre-Published Flow](pre-published/)
The journey from correspondence creation to publication, including:
- Initialization and validation
- Attachment processing and virus scanning
- Publishing process and error handling
- Status states: Initialized, Reserved, ReadyForPublish, Published, Failed

### 2. [Post-Published Flow](post-published/)
Recipient interactions after publication, including:
- Fetching correspondence details
- Reading and confirmation processes
- Attachment downloads
- Purging and archival
- Status states: Fetched, Read, AttachmentsDownloaded, Confirmed, PurgedByRecipient, PurgedByAltinn

## Complete Status Flow Summary

```
Initialization → Validation → [Attachment Processing] → Publishing → Recipient Interactions → Purging
```

## Key Points

- **System-Managed Phase**: Pre-published flow handles validation, security, and delivery
- **Recipient-Managed Phase**: Post-published flow tracks recipient interactions and actions
- **Error Handling**: Comprehensive error handling at each phase with appropriate HTTP status codes
- **Audit Trail**: Complete tracking of all status changes and timestamps
- **API Flexibility**: Different APIs support different functionality (main API vs. legacy API)

## Navigation

- **[Pre-Published Flow](pre-published/)** - Learn about correspondence creation, validation, and publishing
- **[Post-Published Flow](post-published/)** - Understand recipient interactions and status management

Each phase has its own detailed documentation with diagrams, status explanations, and API specifications. 