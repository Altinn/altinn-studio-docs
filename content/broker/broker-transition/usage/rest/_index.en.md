---
title: Usage Rest
linktitle: Usage Rest
description: Difference in Rest operation usage between Altinn 2 and Altinn 3 transitioned services.   
tags: [architecture, solution]
toc: false
weight: 1
---

## Difference in usage between existing Altinn 2 Rest Operations and Altinn 2 Rest operations that have been transition to Altinn 3.

For standard usage of Altinn 2 Rest operations, see [Altinn Docs (norwegian only)] (https://altinn.github.io/docs/api/rest/formidling/)

For all Altinn 3 transitioned services, Receipts will be pseudo-receipts generated from the Altinn 3 file metadata. This means all receipts returned will be pseudo-receipts, and all receiptIds will be 0.

If your use case requires receipt usage, please submit a feature request.

## Outbox (Sender)

Rest operations for Broker in Altinn 2 are logically split between Sender and Recipient (outbox / inbox).

### Initiate and Send File

Altinn 2 Rest operations combine initiation and upload into the same call. 
The call consists of a Post request with a file as a binary body and filename and BrokerServiceDescription added as parameters.

Header
```HTTP
POST https://www.altinn.no/api/{who}/brokerservice/outbox?fileName={fileName}&brokerServiceDescription={"ServiceCode":"{serviceCode}","ServiceEditionCode":{serviceEdition},"Recipients":["{recipient1}","{recipient2}"],"SendersReference":"{sendersReference}}","Properties":{"{name1}":"{value1}", "{name2}":"{value2}"},"FileList":null}
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

BrokerServiceDescription example

```JSON
{
  "ServiceCode": "5678",
  "ServiceEditionCode": 1,
  "SendersReference": "somereference",
  "Recipients": [
    "974760673"
  ],
  "Properties": {
    "somethingservicespecific": "somevalue",
    "somethingelseservicespecific": "someothervalue"
  },
  "FileList": null
}
```

#### Differences

The new call will not require a file list, and the returned receipt will not be a real receipt, but a pseudo-receipt built from
the Altinn 3 Broker File metadata.
{{% notice warning  %}}
Since the Upload, and Upload processing of the file is an asynchronous process in Altinn 3, the immediate Receipt status received from the call will not necessarily reflect the final state of the file.

If possible, you should consider adding steps that make calls to [Get File Details](#get-file-details-outbox-sender) to ensure that the file has been successfully processed.
{{% /notice %}}

### Get File Details outbox (sender)

This operation returns Broker File metadata.

This request will not differ in usage between Altinn 2 and Altinn 3 transitioned services.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/outbox/{fileId} HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

### Get File Receipt outbox (sender)

This operation returns Broker File Receipt

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/outbox/{fileId}/receipt HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

#### Example Receipt
```JSON
{
    "ReceiptID": 0,
    "ParentReceiptID": null,
    "LastChanged": "2024-04-24T09:23:40.806",
    "Status": "Ok",
    "Text": "Upload of file 92a29085-5a63-4fc5-a294-bc2d4a331433 was successful. Recipients can now download the file.",
    "SendersReference": null,
    "ServiceOwnerPartyReference": null,
    "PartyReference": "312903369",
    "ReceiptHistory": null,
    "SubReceipts": null
}
```
#### Differences

For Altinn 3 transitioned services the receipt is a pseudo receipt built from Altinn 3 Broker File metadata. The pseudo receipt will not contain subreceipts for the recipients.

## Inbox (recipient)

### Verify if users have files available
This operation verifies whether any of the given recipients have any files available for download for the given ServiceCode / ServiceEdition combination.

If files are available it returns true, otherwise it returns false.

Implementation does not differ for Altinn 3 transitioned services.

Header
```HTTP
GET https://www.altinn.no/api/brokerservice/inbox/hasavailablefiles?serviceCode={serviceCode}&serviceEditionCode={serviceEdition}&recipients={recipient1},{recipient2} HTTP/1.1 
accept: application/json
ApiKey: myKey
```

### Get recipient inbox
This operation retrieves a list of files available to the user.

This operation will only return file list for transitioned services if the service is specified in the request.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/inbox/?serviceCode={serviceCode}&serviceEditionCode={serviceEdition} HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

#### Example receipt
```JSON
{
    "ReceiptID": 0,
    "ParentReceiptID": null,
    "LastChanged": "2024-04-24T09:23:40.806",
    "Status": "Ok",
    "Text": "A file has been made available for download.",
    "SendersReference": null,
    "ServiceOwnerPartyReference": null,
    "PartyReference": "313559017",
    "ReceiptHistory": null,
    "SubReceipts": null
}
```

#### Differences
The inbox operation will by default retrieve a list of Altinn 2 files. In order to retrieve Altinn 3 files, the service code and the service edition code parameters must be supplied.
The receipt will not have a ReceiptId, ParentReceiptId, SendersReference or ReceiptHistory.

### Get File Details inbox (recipient)
This operation does not differ from the Get File Details for [outbox(sender)](#get-file-details-outbox-sender), except in the URI for the request.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/inbox/{fileId} HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

### Get File Receipt inbox (recipient)
This operation does not differ from the Get File Receipt for [outbox(sender)](#get-file-receipt-outbox-sender), except in the URI for the request.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/inbox/{fileId}/receipt HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

#### Differences

For Altinn 3 transitioned services the receipt is a pseudo receipt built from Altinn 3 Broker File metadata.

### Download
This operation downloads the file. It does not differ between transitioned and non-transitioned Altinn 2 services.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/inbox/{fileId}/download HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

### ConfirmDownload
This operations marks file as confirmed downloaded in Altinn 3 and returns a receipt.

Header
```HTTP
POST https://www.altinn.no/api/{who}/brokerservice/inbox/{fileId}/confirmdownloaded HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

### Differences

For Altinn 3 transitioned services the receipt is a pseudo receipt built from Altinn 3 Broker File metadata.