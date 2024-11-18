---
title: Getting started with Altinn Broker Transition Solution
linktitle: Getting Started
description: How to get started using the Broker Transition solution from Altinn 2 to Altinn 3
tags: [solution, broker, transition, guide]
toc: false
weight: 1
---

## ServiceOwners

In order to use the Broker Transition solution in Altinn to create, upload and retrieve file metadata, a service owner must complete the following steps.

1. Have an existing Altinn 2 Broker Service.
2. Have or create a corresponding Altinn 3 Broker Resource. See how to get started with Altinn Broker [here](../../getting-started/).
   To configure your resource to correctly function as a Broker Transition service, [see below](#configure-resource-for-transition-solution).
3. Request a transition setup from the Altinn 2 Service to the Altinn 3 Resource. Determine the date for when this should go live. (To minimize the risk of orphaned data in Altinn 2 storage)
4. Go live with transition solution while encouraging consumers to migrate to Altinn Broker.
5. Once all consumers have migrated to Altinn Broker, decommission the Altinn 2 Broker Service.

### Configure Resource for Transition Solution

To configure the resource to function in the Transition Solution, and work as closely as Altinn 2 service, you should set the following values when [configuring the resource](../../getting-started/developer-guides/service-owner/#operation-configure-resource-in-broker-api)

Base these values on your existing Altinn 2 service, and set the values to the same where applicable.

- MaxFileTransferSize = "1073741824" (1 GB - max allowed in Altinn 2).
- FileTransferTimeToLive = The equivalent TimeToLive of the Altinn 2 service, most used "30D" - 30 days.
- PurgeFileTransferAfterAllRecipientsConfirmed = The equivalent TimeToLive of the Altinn 2 service, most used "true"
- PurgeFileTransferGracePeriod = "PT24H" - Files will not be deleted before 24hrs have passed. Must be [ISO8601 Duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) and 24 hours is the max.

If you need to use the [Manifest file feature](../technical-overview/#manifest-file), you also need to set the following values.

- UseManifestFileShim = true.
- ExternalServiceCodeLegacy = set to External Service Code for the legacy service.
- ExternalServiceEditionCodeLegacy = set to External Service Edition Code for the legacy service.

Once you have transitioned all users over to Altinn 3 APIs, you are free to change the values according to your own preferences.
The last 3 values used only in the transition solution to create the manifest, and should be set to false/null.

### Additional Service Owner information

After a service owner requests that an Altinn 2 service transition to an Altinn 3 Resource, the Altinn 2 service will no longer pass requests to the Altinn 2 Broker Storage.

This means existing Broker files in the Altinn 2 Broker Storage will become unavailable for end users once the service is set up to transition to Altinn 3.

## End Users

For end users, there is very little technical difference between using an Altinn 2 Broker service and a Broker service that has been transitioned to Altinn 3.
But all consumers should have their technical team go through this documentation to determine if the changes in the Transition solution require changes to their implementation or code.

Functionally, receipts will no longer have a Receipt Id, and if enabled, the manifest files will not have a File List.

Additionally, while in Altinn 2 Broker Services a file is virus-scanned as part of the upload process, in Altinn 3 the virus-scanning is done after upload, which means an uploaded file in Altinn 3 will not be immediately available, unlike in Altinn 2.
The file will be made available once the automatic virus scan is completed.

Calls to get Receipt through external Receipt SOAP endpoint is not supported. If this is a requirement of a service owner or end user, please send us a feature request.
