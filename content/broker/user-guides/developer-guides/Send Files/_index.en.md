---
title: Altinn 3 Broker Developer guide for Sender
linktitle: Send Files
description: How to get started sending files with Altinn 3 Broker, for developers
tags: [Broker, guide]
toc: true
weight: 10
---

{{<children />}}

{{% notice warning  %}}
This section of the documentation is a work in progress, and as such currently makes extensive reference to external sources.
{{% /notice %}}

Here are the detailed API operations and events you will be using when sending files.

## Operation: Initialize FileTransfer

**Endpoint:** POST /broker/api/v1/filetransfer/

This operation initializes a File Transfer, including validating basic metadata and authorizing if the recipient(s) specified are valid.

**Return**: HTTP 200 with GUID FileTransferID which is the unique ID used to identify this File Transfer.

**Events Triggered**:

- Once completed, the event `no.altinn.broker.filetransferinitialized` is published to the sender, indicating the File Transfer has been successfully initialized.

**Example:**

'Broker\Intitialize' in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json)

## Operation: UploadStreamed

**Endpoint:** POST /broker/api/v1/filetransfer/{filestransferid}/Upload

Upload the file data as a stream using the FileTransferId received in InitializeFileTransfer.

**Example:**

'Broker\fileTransferId\upload' in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json)

**Events Triggered**:

- On completion, event `no.altinn.broker.uploadprocessing` is published, and an async job will run to check the file data for malware.
- Once upload processing has successfully completed, the event `no.altinn.broker.published` is published, and the file is available for download.

If malware was detected, the event `no.altinn.broker.uploadfailed` is instead published.

## Operation: Get FileTransfer

Get a simple overview of the file transfer with current status.

## Operation: Get FileTransferDetails

Get a detailed view of the file transfer, including detailed File Transfer and Recipient Statuses. Useful for troubleshooting, but should be used sparingly.

## Event: no.altinn.broker.downloadconfirmed

## Event: no.altinn.broker.allconfirmeddownloaded