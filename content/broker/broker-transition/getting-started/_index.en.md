---
title: Getting started with Altinn Broker Transition Solution
linktitle: Getting Started
description: How to get started using the Broker Transition solution from Altinn 2 to Altinn 3
tags: [solution, broker, transition, guide]
toc: false
weight: 1
---

## ServiceOwners
In order to use the Broker Transition solution in Altinn 2 to create, upload and retrieve file metadata, a service owner must complete the following steps.
1. Have an existing Altinn 2 Broker Service.
2. Have or create a corresponding Altinn 3 Broker Resource. See how to get started with Altinn Broker [here](../../getting-started/).
3. Request a transition setup from the Altinn 2 Service to the Altinn 3 Resource. Determine the date for when this should go live. (To minimize the risk of orphaned data in Altinn 2 storage)
4. Go live with transition solution while encouraging consumers to migrate to Altinn Broker.
5. Once all consumers have migrated to Altinn Broker, decommission the Altinn 2 Broker Service.


### Additional Service Owner information
After a service owner requests that an Altinn 2 service transition to an Altinn 3 Resource, 
the Altinn 2 service will no longer pass requests to the Altinn 2 Broker Storage.
This means existing Broker files in the Altinn 2 Broker Storage will become unavailable for end users once the service
is set up to transition to Altinn 3.

## EndUsers
For end users, there is very little technical difference between using an Altinn 2 Broker service and a Broker service that has been transitioned to Altinn 3.
But all consumers should have their technical team go through this documentation to determine if the changes in the Transition solution require changes to their implementation or code.

Functionally, the files transferred will no longer contain a manifest, and receipts will no longer have a Receipt Id.

Additionally, while in Altinn 2 Broker Services a file is virus-scanned as part of the upload process, in Altinn 3 the virus-scanning is done after upload, which means an uploaded file in Altinn 3 will not be immediately available, unlike in Altinn 2.
The file will be made available once the automatic virus scan is completed.

Calls to get Receipt through external Receipt SOAP endpoint is not supported. If this is a requirement of a service owner or end user, send us a feature request.