---
title: Usage SOAP
linktitle: Usage SOAP
description: Difference in SOAP operation usage between Altinn 2 and Altinn 3 transitioned services.   
tags: [architecture, solution]
toc: false
weight: 1
---

## Difference in usage between existing Altinn 2 SOAP Operations and Altinn 3 SOAP operations that have been transition to Altinn 3.
SOAP operations for Altinn 2 Broker Service are spread over 3 endpoints.
For most requests there will be no functional difference between Altinn 2 and Altinn 3 requests.

|Service|Endpoint|Description|
|-----------------------|---------------------------------------------------------------------------|-------------------------------|
|BrokerService          |[Service WS](https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternal.svc)              | Handles metadata requests.    |
|                       |[Service Basic](https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasic.svc)         |                               |
|                       |[Service EC](https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalEC2.svc)            |                               |
|BrokerService Streamed |[Streamed WS](https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalStreamed.svc)      | Handles file data requests.   |
|                       |[Streamed Basic](https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalStreamedBasic.svc) |                               |
|                       |[Streamed EC](https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalStreamedEC2.svc)    |                               |
|Receipt                |[Receipt WS](https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc)                     | Handles receipt requests.     |
|                       |[Receipt Basic](https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc)                |                               |
|                       |[Receipt EC](https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC2.svc)                 |                               |

For examples of SOAP implementation see [existing documentation (norwegian only)](https://altinn.github.io/docs/api/soap/grensesnitt/#brokerservice--formidlingstjenester-ws)

### BrokerService Endpoint

The BrokerService endpoint contains functions related to BrokerService metadata requests.

#### InitiateBrokerService

No functional difference for Transitioned services.

#### GetAvailableFiles

No functional difference for Transitioned services. In order to retrieve Altinn 3 files, the service code and the service edition code parameters must be supplied. 

#### ConfirmDownloaded

No functional difference for Transitioned services.

#### CheckIfAvailableFiles

No functional difference for Transitioned services. In order to check for available Altinn 3 files, the service code and the service edition code parameters must be supplied. 

### BrokerServiceStreamed Endpoint

The BrokerServiceStreamed endpoint contains functions related to BrokerService File Data requests.

#### UploadFileStreamed

No functional difference in the call. The reply will contain a pseudo-receipt generated from the Altinn 3 file metadata. ReceiptId will be 0.
{{% notice warning  %}}
Since the Upload, and Upload processing of the file is an asynchronous process in Altinn 3, the immediate Receipt status received from the call will not necessarily reflect the final state of the file.

If possible, you should consider adding steps that make calls to [Get File Details](#get-file-details-outbox-sender) to ensure that the file has been successfully processed.
{{% /notice %}}

#### DownloadFileStreamed

No functional difference for Transitioned services.

### Receipt Endpoint

The Receipt endpoint contains requests used to retrieve Receipts for end users. 
Because Altinn 3 transitioned services will never create Receipts, no receipt data related to Altinn 3 transitioned files can 
be retrieved from this endpoint.