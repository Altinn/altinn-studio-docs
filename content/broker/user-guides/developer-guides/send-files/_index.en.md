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
This section of the documentation is a work in progress, and as such currently makes extensive reference to external sources, as well as describing more scenarios.
{{% /notice %}}

Here are the detailed API operations and events you will be using when sending files.

See also our [swagger page](/api/broker/spec/).

## Operation: Initialize FileTransfer {#operation-initialize-filetransfer}

**Endpoint:** POST /broker/api/v1/filetransfer/

This operation initializes a File Transfer, including validating basic metadata and authorizing if the recipient(s) specified are valid.

**Request**: An instance of [FileInitializeExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/FileTransferInitializeExt.cs) serialized as JSON.

**Return**: HTTP 200 with GUID FileTransferID which is the unique ID used to identify this File Transfer.

**Events triggered**:

- Once completed, the event [filetransferinitialized](#event-filetransferinitialized) is published to the sender, indicating the File Transfer has been successfully initialized.

**Example:** 'Broker\Intitialize' in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json)

## Operation: UploadStreamed {#operation-uploadStreamed}

**Endpoint:** POST /broker/api/v1/filetransfer/{fileTransferId}/Upload

Upload the file data as a stream using the FileTransferId received in InitializeFileTransfer.

**Request**: FileTransferID specified in url, and the data as a stream.

**Return**: HTTP 200 if successfully completed.

**Events triggered**:

- On completion, event [uploadprocessing](#event-uploadprocessing) is published, and an async job will run to check the file data for malware.
- Once upload processing has successfully completed, the event [published](#event-published) is published, and the file is available for download.
  - If malware was detected, the event [uploadfailed](#event-uploadfailed) is instead published.

**Example:** 'Broker\{fileTransferId}\upload' in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json)

## Operation: Get FileTransfer Overview {#operation-get-filetransfer-overview}

**Endpoint:** GET /broker/api/v1/filetransfer/{fileTransferId}

Get a simple overview of the file transfer with current status and recipient status.

**Response:** A JSON-serialized version of [FileTransferOverviewExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/FileTransferOverviewExt.cs)

**Events triggered:** none.

**Example:** 'Broker\{fileTransferId}\overview' in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json)

## Operation: Get FileTransfer Details

**Endpoint:** GET /broker/api/v1/filetransfer/{fileTransferId}/details

Get a detailed view of the file transfer, including detailed File Transfer and Recipient Statuses. Useful for troubleshooting, but should be used sparingly.

**Request:** FiletransferId specified in URL.

**Response:** A JSON-serialized version of [FileTransferStatusDetailsExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/FileTransferStatusDetailsExt.cs)

**Events triggered:** none.

**Example:** 'Broker\{fileTransferId}\details' in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json)

## Event: no.altinn.broker.filetransferinitialized {#event-filetransferinitialized}

This event is triggered when the Initialize operation has completed successfully.
As a Sender you can now upload your file data.

## Event: no.altinn.broker.uploadprocessing {#event-uploadprocessing}

This event is triggered when the upload operation has completed successfully, and the file data is awaiting upload processing.
Until you receive either uploadfailed or published, no actions need to be completed.

## Event: no.altinn.broker.uploadfailed {#event-uploadfailed}

This event is triggered if either the upload or uploadprocessing steps fail. We advise you call [get overview](#operation-get-filetransfer-overview) to check the full error text before attempting a new upload.

## Event: no.altinn.broker.published {#event-published}

This event is triggered when when the async uploadprocessing step has completed successfully.
As a Sender you do not need to perform any additional actions.

## Event: no.altinn.broker.downloadconfirmed {#event-downloadconfirmed}

This event is triggered when a recipient has confirmed the download has completed successfully.

## Event: no.altinn.broker.allconfirmeddownloaded {#event-allconfirmeddownloaded}

This event is triggered when all the recipients has confirmed the download has completed. If the FileTransfer has a single recipient, this will be published at the same time as downloadconfirmed.
Depending on the Broker Service settings, this may lead to the file being purged automatically.

## Event: no.altinn.broker.fileneverconfirmeddownloaded {#event-fileneverconfirmeddownloaded}

This event is triggered on the ExpiryTime of the FileTransfer in the case that one or more recipients have not confirmed the download of the file.
This may indicate that either the recipient has been unaware of the FileTransfer or that they have downloaded but neglected to call the ConfirmDownload.
This event is also sent to the Recipient(s) that have not confirmed the download.

We suggest using the data supplied in the [get details](#operation-get-filetransfer-details) to investigate the actions.

## Event: no.altinn.broker.filedpurged {#event-filepurged}

This event is triggered by the file cleanup process at the time of either the Expiry of the file, or due to all recipients having Confirmed their download.

After this point the file data is no longer available for download, although the metadata persists.
