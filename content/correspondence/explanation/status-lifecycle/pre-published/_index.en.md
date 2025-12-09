---
title: Pre-Published Life Cycle
linktitle: Pre-Published Life Cycle
description: Altinn 3 Correspondence pre-published lifecycle and validation process.
tags: []
toc: true
weight: 1
---

## Pre-Published Life Cycle

The following diagram shows the complete flow of a correspondence from initialization to publication:

{{< correspondence-life-cycle-pre-published >}}

## Pre-Published Status States

1. **Initialized**: The correspondence has been created and passed initial validation
2. **Reserved**: The recipient has opted out of digital communication in KRR, but correspondence can be created with `IgnoreReservation` flag
3. **ReadyForPublish**: All attachments (if any) have been processed and passed virus scanning
4. **Published**: The correspondence has been successfully published and is available to recipients

## Error Handling During Initialization

The system returns HTTP error responses for validation failures during initialization (no status is set):
- **400 Bad Request**: Missing content, invalid format, empty message fields, invalid attachments, invalid dates, invalid language
- **401 Unauthorized**: No access to resource, incorrect resource type

## Publishing Process Failures

The **Failed** status is set during the publishing job when:
- Recipient organization is not found in Enhetsregisteret (Business Register)
- Recipient organization is bankrupt or deleted
- Recipient lacks required roles for confidential correspondences
- Other publishing-time validation failures occur

## Attachment Processing

1. **UploadProcessing**: Attachment is being uploaded and processed
2. **Published**: Attachment has passed virus scanning and is available for download
3. **Failed**: Attachment failed virus scanning or processing

All attachments must reach **Published** status before the correspondence can be published.

## Process Flow Details

### Initialization and Validation
- Correspondence is created and validated
- Authorization checks are performed
- Recipient reservation status is checked
- Attachment metadata is validated

### Attachment Processing (if applicable)
- Files are uploaded to blob storage
- Virus scanning is performed
- Attachments must pass all checks before correspondence can be published

### Publication Process
- Recipient validation is performed during publishing
- Dialogporten dialog is created
- Correspondence status is set to Published
- Information activities are created
- Events are published to subscribers

### Notification Handling
- Notifications are created during initialization
- Reminder notifications can be sent for unread correspondences
- Notification sending stops once correspondence is marked as read

## Error Handling Summary

### During Initialization
- **HTTP 400 Bad Request**: Validation errors (correspondence not created)
- **HTTP 401 Unauthorized**: Authorization failures (correspondence not created)

### During Publishing
- **Failed status**: Set when publishing-time validation fails (recipient issues, etc.)

The system maintains a complete audit trail of all status changes and timestamps for compliance and debugging purposes. 