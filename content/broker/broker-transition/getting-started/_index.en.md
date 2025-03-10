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
3. Request a transition setup from the Altinn 2 Service to the Altinn 3 Resource, [see below](#request-transition-setup) for details.
4. Go live with the transition solution while encouraging consumers to migrate to Altinn Broker.
5. Once all consumers have migrated to Altinn Broker, decommission the Altinn 2 Broker Service.

### Configure Resource for Transition Solution

To configure the resource to function in the Transition Solution, and work as closely as Altinn 2 service, you should set the following values when [configuring the resource](../../getting-started/developer-guides/service-owner/#operation-configure-resource-in-broker-api)

Base these values on your existing Altinn 2 service, and set the values to the same where applicable.

- MaxFileTransferSize = "1073741824" (1 GB - max allowed in Altinn 2).
- FileTransferTimeToLive = The equivalent TimeToLive of the Altinn 2 service, most used "30D" - 30 days.
- PurgeFileTransferAfterAllRecipientsConfirmed = The equivalent TimeToLive of the Altinn 2 service, most used "true"
- PurgeFileTransferGracePeriod = "PT24H" - Files will not be deleted before 24hrs have passed (was hard-coded to 48hrs in Altinn 2). Must be [ISO8601 Duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) and 24 hours is the max.

If you need to use the [Manifest file feature](../technical-overview/#manifest-file), you also need to set the following values.

- UseManifestFileShim = true.
- ExternalServiceCodeLegacy = set to External Service Code for the legacy service.
- ExternalServiceEditionCodeLegacy = set to External Service Edition Code for the legacy service.

Once you have transitioned all users over to Altinn 3 APIs, you are free to change the values according to your own preferences.
The last 3 values used only in the transition solution to create the manifest, and should be set to false/null.

### Request Transition Setup

The transition setup is configured in the Altinn 2 codebase, and once it has been set, the traffic for the defined service will be redirected to Altinn 3.
Please provide the necessary details, and make sure the relevant details match what you [set for the resource](#configure-resource-for-transition-solution).

- ExternalServiceCode and ExternalServiceEditionCode of the Altinn 2 service.
- ResourceId of the Altinn 3 resource.
- The environments where the change should be performed.
  - Altinn 2 TT02 -> Altinn 3 TT02/Staging
  - Altinn 2 PROD -> Altinn 3 PROD
- The date and time for the change(s) to go live.

Contact us in the public slack channel [Altinn@Slack#produkt-formidling](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog), and we will perform the needed steps.

Performing this configuration change does not create downtime in Altinn 2, but there will be a short timeframe of <1 minute where the configuration is loaded onto all servers and the transition solution is active.

### Additional Service Owner information

After the transition setup has been activated, the Altinn 2 service will no longer pass requests to the Altinn 2 Broker Storage, but instead be forwarded to Altinn 3.
This means existing Broker files in the Altinn 2 Broker Storage will become unavailable for end users once the service is set up to transition to Altinn 3.

Due to this, we recommend you plan for a downtime period for your service in which no new files are created, but you allow all recipients to download their files before you perform the transition.
The exact length of time depends on the work pattern of your recipients; how long they take before they download available files. If you do not know. contact us and we may be able to generate some statistics to guide you to a decision.

One method of enforcing this is to use Altinn 2 SRR to temporarily remove the "write" access for all the organizations you have approved as senders, but keep the "read" access for all recipients.
Once the transition has been set up, you can give the "write" access back to all the senders, and the files will now be created i Altinn 3.

{{% notice warning  %}}
Be aware that SRR Rights in Altinn 2 are cached for 10 minutes (SC+SEC+Orgnr), so ensure to afford this amount of time between adding/removing the rights and other steps of your go-live plan.
{{% /notice %}}

## End Users

For end users, there is very little technical difference between using an Altinn 2 Broker service and a Broker service that has been transitioned to Altinn 3.
But all consumers should have their technical team go through this documentation to determine if the changes in the Transition solution require changes to their implementation or code.

Functionally, receipts will no longer have a Receipt Id, and if enabled, the manifest files will not have a File List.

Additionally, while in Altinn 2 Broker Services a file is virus-scanned as part of the upload process, in Altinn 3 the virus-scanning is done after upload, which means an uploaded file in Altinn 3 will not be immediately available, unlike in Altinn 2.
The file will be made available once the automatic virus scan is completed.

Calls to get Receipt through external Receipt SOAP endpoint is not supported. If this is a requirement of a service owner or end user, please send us a feature request.
