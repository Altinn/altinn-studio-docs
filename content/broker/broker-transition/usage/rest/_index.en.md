---
title: Usage Rest
linktitle: Usage Rest
description: Difference in Rest operation usage between Altinn 2 and Altinn 3 transitioned services.
tags: [solution, broker, guide, transition]
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

The transition service does not use the FileList property. No change is necessary from the End User implementation, but a NULL value will be accepted, and any values submitted will be discarded by the transition service. 
The returned receipt will not be a real receipt, but a pseudo-receipt built from the Altinn 3 Broker File metadata.
{{% notice warning  %}}
Since the Upload, and Upload processing of the file is an asynchronous process in Altinn 3, the immediate Receipt status received from the call will not necessarily reflect the final state of the file.
In addition, the Rest implementation of Altinn 2 Broker services synchronized the initiation and upload of the file, as a result of this the File Status requests do not include statuses for Failed files, 
since these would not historically be created in the first place. 

If possible, you should therefore consider adding steps that make calls to [Get File Receipt](#get-file-receipt-outbox-sender) to ensure that the file has been successfully processed.
{{% /notice %}}

Example of immediately returned status from InitiateAndUploadFile call:
```JSON
{
    "ServiceCode": "4947",
    "ServiceEditionCode": 4678,
    "FileName": "Altinn2FileName",
    "FileReference": "1540b8dd-bb90-42d1-a95e-12e097823070",
    "FileSize": 123,
    "FileStatus": "Initialized",
    "ReceiptID": 0,
    "Sender": "312903369",
    "SentDate": "2024-04-26T13:17:33.911",
    "SendersReference": "SendersReferenceValue"
}
```

Example of returned status from a subsequent GetFileDetails calls
```JSON
{
    "ServiceCode": "4947",
    "ServiceEditionCode": 4678,
    "FileName": "Altinn2FileName",
    "FileReference": "1540b8dd-bb90-42d1-a95e-12e097823070",
    "FileSize": 123,
    "FileStatus": "Uploaded",
    "ReceiptID": 0,
    "Sender": "312903369",
    "SentDate": "2024-04-26T13:17:33.911",
    "SendersReference": "SendersReferenceValue"
}
```

Uploaded state here means that the file has been processed OK. A FileStatus of "Initialized" indicates that the file has not finished processing, or that processing encountered an error, as Altinn 2 Rest File Details does not implement error messaging.

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

#### Example Receipt Sender
```JSON
{
    "ReceiptID": 0,
    "ParentReceiptID": null,
    "LastChanged": "2024-05-08T12:14:52.313",
    "Status": "Ok",
    "Text": "Upload of file 0ed44efb-f397-43a7-883a-4be634c902f1 was successful. Recipients can now download the file.",
    "SendersReference": null,
    "ServiceOwnerPartyReference": null,
    "PartyReference": "312903369",
    "ReceiptHistory": null,
    "SubReceipts": [
        {
            "ReceiptID": 0,
            "ParentReceiptID": null,
            "LastChanged": "2024-05-08T12:14:52.313",
            "Status": "Ok",
            "Text": "A file has been made available for download.",
            "SendersReference": null,
            "ServiceOwnerPartyReference": null,
            "PartyReference": "313559017",
            "ReceiptHistory": null,
            "SubReceipts": null
        },
        {
            "ReceiptID": 0,
            "ParentReceiptID": null,
            "LastChanged": "2024-05-08T12:14:52.313",
            "Status": "Ok",
            "Text": "A file has been made available for download.",
            "SendersReference": null,
            "ServiceOwnerPartyReference": null,
            "PartyReference": "314126866",
            "ReceiptHistory": null,
            "SubReceipts": null
        }
    ]
}
```


#### Example Receipt Sender - File fails during processing
In the event of a file upload failing during processing, the immediate result will not show that the file has been rejected:

##### Immediate Result of InstantiateAndUpload
```JSON
{
    "ServiceCode": "4947",
    "ServiceEditionCode": 4678,
    "FileName": "Altinn2FileName",
    "FileReference": "37de0fef-1cf6-46eb-bf18-c5c7df24ba4f",
    "FileSize": 68,
    "FileStatus": "Initialized",
    "ReceiptID": 0,
    "Sender": "312903369",
    "SentDate": "2024-05-08T12:33:14.752",
    "SendersReference": "test123"
}
```

##### GetFileDetails
A secondary call to will show that the file is Initialized, as the Altinn 2 Rest implementation of Broker was entirely synchronous, and therefore does not implement showing Failed statuses, as these could never be returned.
```JSON
{
    "ServiceCode": "4947",
    "ServiceEditionCode": 4678,
    "FileName": "Altinn2FileName",
    "FileReference": "37de0fef-1cf6-46eb-bf18-c5c7df24ba4f",
    "FileSize": 68,
    "FileStatus": "Initialized",
    "ReceiptID": 0,
    "Sender": "312903369",
    "SentDate": "2024-05-08T12:33:14.752",
    "SendersReference": "test123"
}
```

##### GetReceipt
In order to see a reference to the actual processing error, it is therefore necessary to check the Receipt call for Altinn 2 Rest API.
And a Rest Receipt request will return details regarding the processing error:
```JSON
{
    "ReceiptID": 0,
    "ParentReceiptID": null,
    "LastChanged": "2024-05-08T12:33:14.819",
    "Status": "Rejected",
    "Text": "Malware scan failed: Malicious. Extra details: {\"MalwareNamesFound\":[\"Virus:DOS/EICAR_Test_File\"],\"Sha256\":\"275A021BBFB6489E54D471899F7DB9D1663FC695EC2FE2A2C4538AABF651FD0F\",\"NotScannedReason\":\"\"}",
    "SendersReference": null,
    "ServiceOwnerPartyReference": null,
    "PartyReference": "312903369",
    "ReceiptHistory": null,
    "SubReceipts": [
        {
            "ReceiptID": 0,
            "ParentReceiptID": null,
            "LastChanged": "2024-05-08T12:33:14.819",
            "Status": "Rejected",
            "Text": "File failed during upload processing in Altinn 3.",
            "SendersReference": null,
            "ServiceOwnerPartyReference": null,
            "PartyReference": "313559017",
            "ReceiptHistory": null,
            "SubReceipts": null
        },
        {
            "ReceiptID": 0,
            "ParentReceiptID": null,
            "LastChanged": "2024-05-08T12:33:14.819",
            "Status": "Rejected",
            "Text": "File failed during upload processing in Altinn 3.",
            "SendersReference": null,
            "ServiceOwnerPartyReference": null,
            "PartyReference": "314126866",
            "ReceiptHistory": null,
            "SubReceipts": null
        }
    ]
}
```

#### Differences

For Altinn 3 transitioned services the receipt is a pseudo receipt built from Altinn 3 Broker File metadata.

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
    "LastChanged": "2024-05-08T12:14:52.288",
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
The inbox operation will by default retrieve a list of Altinn 2 files. If no service code/service edition code is supplied, the operation will only list files from Altinn 2.
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
This operation downloads the file data. It does not differ between transitioned and non-transitioned Altinn 2 services.

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