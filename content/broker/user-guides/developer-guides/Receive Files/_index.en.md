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

This operation should be used sparingly, as you should instead focus on the webhook/Event `no.altinn.broker.published` to notify you of FileTransfers available for you.

## Operation: Get FileTransfer Overview

## Operation: DownloadFile

Download the file content as a binary stream.

## Operation: ConfirmDownloaded

Must be used to confirm that the File data has been downloaded and confirmed successful.
This will update the status of the File Transfer, and potentially delete the file data according to the settings on the Broker Resource.

Publishes the event: `no.altinn.broker.downloadconfirmed`.
