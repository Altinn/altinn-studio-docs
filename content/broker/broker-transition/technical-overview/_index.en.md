---
title: Technical Overview
linktitle: Technical Overview
description: The Altinn 3 Broker Transition Solution allows service owners who own broker services in Altinn 2 to point those services towards Altinn 3 using an internal Altinn 2 bridge.
tags: [architecture, solution, broker, transition]
toc: false
weight: 1
---

## About

The Altinn 3 Broker Transition service bridge is an internal component in Altinn 2 that transfers Broker requests from Altinn 2 to Altinn 3 for a given request, based on the ServiceCode/ServiceEditionCode combination of the request.
This is an implementation of the soft shift solution described [here](../../reference/solution-architecture/#soft-shift-from-altinn-2-to-altinn-3).

## Technical overview

Altinn 2 allows end users in Altinn 2 to make BrokerService requests for specific Broker Services that will be transferred to Altinn 3 instead of being stored in Altinn 2.
Files transferred in this way will be available for Altinn 3 and Altinn 2 users.

Authentication and authorization are primarily performed at the API endpoint being called (Altinn 2 or 3). For Altinn 2, authentication/authorization is performed at the service level before routing the service calls to Altinn 3 through a dedicated endpoint that can assume service-level authentication and authorization are OK. For Altinn 3, everything happens internally within the environment.
This means that you need both an Altinn 2 service (with associated authorization rules and setup in SRR) and an Altinn 3 Broker Resource with access defined in the Resource Registry.
This is a natural pattern when setting up a transition solution for an existing service, but it is worth noting if you want to set up dedicated test services.

1. Requests that have the ability to specify ServiceCode / ServiceEdition.
In this case Altinn will immediately determine that the request should be transferred to Altinn 3 via the Altinn 3 Broker Bridge.
In cases where the SC/SE can be specified, but aren't, requests will not be transferred to Altinn 3.
2. Requests that do not have the ability to specify SC/SE.
In this case a call will first be made to Altinn 2 Broker storage. If nothing is found in Altinn 2, a call will be made to Altinn 3.
3. Files in Altinn 3 cannot be larger than 1 GB, as this is the maximum file size in Altinn 2. The Altinn 3 Resource should be configured with this max filesize restriction.
4. File data and metadata will be stored in the Altinn 3 store, while Altinn 2 will simply call Altinn 3.
5. Receipts will no longer be stored in Altinn 2, instead a pseudo receipt (with receiptId 0) will be generated from Altinn 3 Metadata in the relevant Broker-specific operations.
The Receipt endpoint in Altinn 2 will as such no longer be able to be used to access receipts for Broker, as they do not exist..
**If you require the use of Receipt endpoint, please submit a feature request with detailed examples and we will look into a solution.**
6. The use of Manifest file in the submitted file data is deprecated in Altinn 3; but you may enable functionality for Manifest files in the transition solution. See [description below](#manifest-file) for details.

<img src="altinn3-broker-transition-flowchart.svg" alt="Broker Transition Solution Flowchart"/>

## Switch Over - What to expect

When the Altinn 3 Broker Transition Solution feature is enabled in Altinn 2, the following occurs:

1. ServiceOwners can request that Altinn 2 Broker Services be transitioned to Altinn 3 Resources.
2. End users that use these services will then transmit data to Altinn 3 instead of Altinn 2 data stores.
3. Files that were available in Altinn 2 for the Broker Service will no longer be available.
4. All new files and status changes will occur in the Altinn 3 Broker Service Solution.
5. ServiceOwners with transitioned Broker Services will have to manage changes in access rights in both Altinn 3 and Altinn 2 simultaneously, as these are not automatically synchronized.

### Manifest file

Due to the manifest files being deprecated in Altinn 3, we have added a feature to enable creation/update of manifest files for the transition solution.
The feature is implemented as part of the Download operation from the Altinn 2 side, and due to greater performance impact, is disabled by default.
To enable this feature you need to [configure the Altinn 3 Resource](../getting-started/#configure-resource-for-transition-solution) with the properties:

- UseManifestFileShim = true
- ExternalServiceCodeLegacy = The External Service Code of the Altinn 2 legacy service, this is only used to build the Manifest xml, and will not affect any other functionality.
- ExternalServiceEditionCodeLegacy = The External Service Edition Code of the Altinn 2 legacy service, this is only used to build the Manifest xml, and will not affect any other functionality.

The manifest file is created based upon the "PropertyList" specified when initializing a file transfer, as well ExternalServiceCodeLegacy and ExternalServiceEditionCodeLegacy specified on the Resource.
The optional list "FileList" will no longer be created as part of the manifest.

**Example Manifest file:**

```xml
<?xml version="1.0" encoding="utf-16"?>
<BrokerServiceManifest xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schema.altinn.no/services/ServiceEngine/Broker/2015/06">
  <ExternalServiceCode>4752</ExternalServiceCode>
  <ExternalServiceEditionCode>1</ExternalServiceEditionCode>
  <SendersReference>ref:1245</SendersReference>
  <Reportee>837884942</Reportee>
  <SentDate>2024-10-18T08:43:48.453</SentDate>
  <FileList />
  <PropertyList>
    <Property>
      <PropertyKey>senderPhone</PropertyKey>
      <PropertyValue>12345678</PropertyValue>
    </Property>
    <Property>
      <PropertyKey>senderName</PropertyKey>
      <PropertyValue>Ola Normann</PropertyValue>
    </Property>
    <Property>
      <PropertyKey>messageType</PropertyKey>
      <PropertyValue>SignedMortgageDeed</PropertyValue>
    </Property>
    <Property>
      <PropertyKey>notificationMode</PropertyKey>
      <PropertyValue>AltinnNotification</PropertyValue>
    </Property>
    <Property>
      <PropertyKey>senderEmail</PropertyKey>
      <PropertyValue>ola.normann@norge.no</PropertyValue>
    </Property>
    <Property>
      <PropertyKey>coverLetter</PropertyKey>
      <PropertyValue>XmlAttached</PropertyValue>
    </Property>
  </PropertyList>
</BrokerServiceManifest>
```

{{<children />}}
