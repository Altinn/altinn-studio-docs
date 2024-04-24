---
title: How To Get Started
linktitle: How To Get Started
description: How to get started using the Broker Transition solution from Altinn 2 to Altinn 3   
tags: [architecture, solution]
toc: false
weight: 1
---

## ServiceOwners
In order to use the Broker Transition solution in Altinn 2 to create, upload and retrieve file metadata, a service owner must complete the following steps.
1. Have an existing Altinn 2 Broker Service.
2. Have or create a corresponding Altinn 3 Broker Resource.
3. Request a transition setup from the Altinn 2 Service to the Altinn 3 Resource. 
4. <!-- TODO: Set up of rights for the Altinn 3 Resource>
<!-- TODO: Should we have links here to the different services used by service owners to create the different services? -->

### Additional Service Owner information
After a service owner requests that an Altinn 2 service transition to an Altinn 3 Resource, 
the Altinn 2 service will no longer pass requests to the Altinn 2 Broker Storage.
This means existing Broker files in the Altinn 2 Broker Storage will become unavailable for end users once the service
is set up to transition to Altinn 3.

## EndUsers
For end users, there is very little technical difference between using an Altinn 2 Broker service and a Broker service that has been transitioned to Altinn 3.

Functionally, the files transferred will no longer contain a manifest, and receipts will no longer have a Receipt Id.

Additionally, while in Altinn 2 Broker Services a file is virus-scanned as part of the upload process, in Altinn 3 the virus-scanning is done after upload, which means an uploaded file in Altinn 3 will not be immediately available, unlike in Altinn 2.
The file will be made available once the automatic virus scan is completed.

Calls to get Receipt through external Receipt SOAP endpoint is not supported. If this is a requirement of a service owner or end user, send us a feature request.