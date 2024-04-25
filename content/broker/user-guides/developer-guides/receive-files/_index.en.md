---
title: Altinn 3 Broker Developer guides
linktitle: Receive Files
description: How to get started Receiving files with Altinn 3 Broker, for developers
tags: [Broker, guide]
toc: true
weight: 20
---

{{<children />}}

{{% notice warning  %}}
This section of the documentation is a work in progress, and as such currently makes extensive reference to external sources.
{{% /notice %}}

Here are the detailed operations and events you will be using when Receiving files.

## Operation: Get FileTransfers

**Endpoint:** GET /broker/api/v1/filetransfer/<filters>

Allows you to search for file transfers according to set filters, and returns a list of FileTransferIds matching the search criteria.
You can then use these Ids to [get FileTransfer Overview](#operation-get-filetransfer-overview) and [download](#operation-downloadfile).

{{% notice warning  %}}
This operation should be used sparingly, as you should instead focus on the webhook/Event [published](#event-noaltinnbrokerpublished) to notify you of FileTransfers available for you.
{{% /notice %}}

**Request:** Filters specified in the url:

- resourceId - resource id of the broker resource, Required.
- status - current status of the File Transfer.
- recipientStatus - current status for you as recipient.
- from - DateTimeOffset to filter from.
- to - DateTimeOffset to filter to.

When searching for files you have not downloaded as a recipient specify the following:

- resourceId - resource id of the broker resource
- status = "published"
- recipientStatus = "initialized"

**Response:** A list of FileTransferIds in GUID format.

**Example:**

'Broker\search' in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json).

**Events triggered:** None.

## Operation: Get FileTransfer Overview

**Endpoint:** GET /broker/api/v1/filetransfer/{fileTransferId}

Get a simple overview of the file transfer with relevant metadata and current status and recipient status.
You can use either the FileTransferId from the [published](#event-noaltinnbrokerpublished) event or from the [search](#operation-get-filetransfers).

**Response:** A JSON-serialized version of [FileTransferOverviewExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/FileTransferOverviewExt.cs).

**Events triggered:** none.

**Example:** 'Broker\{fileTransferId}\overview' in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json).

## Operation: DownloadFile

**Endpoint:** GET /broker/api/v1/filetransfer/{fileTransferId}/download

Download the file data as a stream using the FileTransferId received from overview.

**Request**: FileTransferID specified in url, and the data as a stream.

**Return**: A binary stream containing the file data.

**Events triggered**: none

**Example:** 'Broker\{fileTransferId}\download' in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json).

## Operation: ConfirmDownloaded

After you have downloaded and successfully processed the file, you must use this operation to notify the solution that the file has been successfully delivered.
This will update the status of the File Transfer, and potentially delete the file data according to the settings on the Broker Resource.

**Endpoint:** POST /broker/api/v1/filetransfer/{fileTransferId}/confirmdownload

Upload the file data as a stream using the FileTransferId received in InitializeFileTransfer.

**Request**: FileTransferID specified in url.

**Return**: HTTP 200 if successfully completed.

**Events triggered**:

- [downloadconfirmed](#event-noaltinnbrokerdownloadconfirmed).

**Example:** 'Broker\{fileTransferId}\confirm download' in our [PostMan collection](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json).

## Event: no.altinn.broker.published

This event is triggered when when the async uploadprocessing step has completed successfully.

As a recipient you can then use the *FileTransferId* specified in the *resourceinstance* to start downloading the metadata and file data.

## Event: no.altinn.broker.downloadconfirmed

This event is triggered when you have confirmed the download has completed successfully, and it is also sent to the Sender.
You do not need to perform actions against Broker, but it is an additional confirmation that the ConfirmDownload has gone successfully, and you may chose to use this to trigger some internal process on your end.

## Event: no.altinn.broker.fileneverconfirmeddownloaded

This event is triggered on the ExpiryTime of the FileTransfer in the case that one or more recipients have not confirmed the download of the file.
This may indicate that either the recipient has been unaware of the FileTransfer or that they have downloaded but neglected to call the ConfirmDownload.
This event is also sent to the Recipient(s) that have not confirmed the download.
