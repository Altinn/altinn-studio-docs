---
title: Altinn 3 Broker Developer guides
linktitle: Developer guides
description: How to get started with Altinn 3 Broker, for developers
tags: [Broker, guide]
toc: true
weight: 80
---

{{<children />}}


{{% notice warning  %}}
This section of the documentation is a work in progress. 
There are sections with missing or only partial documentation.
{{% /notice %}}

## Developers User Guide

Since Altinn Broker is open source, you can access our code in [our github repo](https://github.com/Altinn/altinn-broker) and build a local docker instance to test against.
We also welcome contributions to the solution.
See the [readme file at github](https://github.com/Altinn/altinn-broker/blob/main/README.md) for an introduction to Altinn 3 Broker for developers.

## Implementing as a Sender

Here are the detailed operations and events you will be using as a Sender, and reflect the implemented reality of the [file transfer process](../basic-concepts/#file-transfer-process-states)

### Initialize FileTransfer

This operation initializes a filetransfer, including validating basic metadata and autorizing if the recipient(s) specified are valid.
Once completed, the event `no.altinn.broker.filetransferinitialized` is published to the sender, indicating the File Transfer has been successfully initialized.

### UploadStreamed

Upload the file data as a stream using the FileTransferId received in InitializeFileTransfer.

Immediatly upon completion, event `no.altinn.broker.uploadprocessing` is published to the sender, and an async job will run to check the file data for malware.

Once upload processing has successfully completed, the event `no.altinn.broker.published` is published to both sender and recipients.

If malware was detected, the event `no.altinn.broker.uploadfailed` is instead published.

### Get FileTransfer

Get a simple overview of the file transfer with current status.

### Get FileTransferDetails

Get a detailed view of the file transfer, including detailed File Transfer and Recipient Statuses. Useful for troubleshooting, but should be used sparingly.

## Recipient's User Guide

After performing the steps in the 'Common Getting Started' guide, you are ready to start implementing.
Here are the detailed operations you will be using as a Recipient

### GetFileTransfers

This operation should be used sparingly, as you should instead focus on the webhook/Event `no.altinn.broker.published` to notify you of FileTransfers available for you.

### DownloadFile

Download the file content as a binary stream.

### ConfirmDownloaded

Must be used to confirm that the File data has been downloaded and confirmed successful.
This will update the status of the File Transfer, and potentially delete the file data according to the settings on the Broker Resource.

Publishes the event: `no.altinn.broker.downloadconfirmed`.