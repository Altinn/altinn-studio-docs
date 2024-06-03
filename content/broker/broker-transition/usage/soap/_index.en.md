---
title: Usage SOAP
linktitle: Usage SOAP
description: Difference in SOAP operation usage between Altinn 2 and Altinn 3 transitioned services.
tags: [solution, broker, guide, transition]
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

No functional difference for Transitioned services. If service code/service edition code is not supplied, only Altinn 2 files will be returned. 

#### ConfirmDownloaded

No functional difference for Transitioned services.

#### CheckIfAvailableFiles

No functional difference for Transitioned services. If service code/service edition code is not supplied, only Altinn 2 files will be returned.

### BrokerServiceStreamed Endpoint

The BrokerServiceStreamed endpoint contains functions related to BrokerService File Data requests.

#### UploadFileStreamed

No functional difference in the call. The reply will contain a pseudo-receipt generated from the Altinn 3 file metadata. ReceiptId will be 0.
{{% notice warning  %}}
Since the Upload, and Upload processing of the file is an asynchronous process in Altinn 3, the immediate Receipt status received from the call will not necessarily reflect the final state of the file.
Altinn 2 SOAP Broker Service offers no function that allows end users to verify that a file has been successfully processed and is ready for download for recipients.

If possible, you should consider adding steps that make calls to [Get File Receipt](../rest/#get-file-receipt-outbox-sender) to ensure that the file has been successfully processed.
If you do not wish to implement REST, one workaround is implementing a request that retrieves available files for the recipients to ensure that the file you uploaded has been made available.
{{% /notice %}}

##### Verify that Uploaded File has been made available for download via SOAP

Step 1: Initiate file transfer
```XML
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.altinn.no/services/ServiceEngine/Broker/2015/06" xmlns:ns1="http://schemas.altinn.no/services/ServiceEngine/Broker/2015/06">
   <soapenv:Header/>
   <soapenv:Body>
      <ns:InitiateBrokerServiceBasic>
         <ns:systemUserName>Senders System</ns:systemUserName>
         <ns:systemPassword>yourPassword</ns:systemPassword>
         <ns:brokerServiceInitiation>
            <ns1:Manifest>
               <ns1:ExternalServiceCode>4947</ns1:ExternalServiceCode>
               <ns1:ExternalServiceEditionCode>4678</ns1:ExternalServiceEditionCode>
               <!--Optional:-->
               <ns1:FileList>
                  <!--Zero or more repetitions:-->
                  <ns1:File>
                     <ns1:FileName>Your FileName</ns1:FileName>
                  </ns1:File>
               </ns1:FileList>
               <ns1:Reportee>Sender OrgNr</ns1:Reportee>
               <ns1:SendersReference>Your SendersReference</ns1:SendersReference>
            </ns1:Manifest>
            <ns1:RecipientList>
               <!--Zero or more repetitions:-->
               <ns1:Recipient>
                  <ns1:PartyNumber>Recipient OrgNr</ns1:PartyNumber>
               </ns1:Recipient>
            </ns1:RecipientList>
         </ns:brokerServiceInitiation>
      </ns:InitiateBrokerServiceBasic>
   </soapenv:Body>
</soapenv:Envelope>
```
Returns:
```XML
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
   <s:Body>
      <InitiateBrokerServiceBasicResponse xmlns="http://www.altinn.no/services/ServiceEngine/Broker/2015/06">
         <InitiateBrokerServiceBasicResult>af303bd0-3333-4ec9-af6a-31dd05569011</InitiateBrokerServiceBasicResult>
      </InitiateBrokerServiceBasicResponse>
   </s:Body>
</s:Envelope>
```

Step 2: Upload File

```XML
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.altinn.no/services/ServiceEngine/Broker/2015/06">
   <soapenv:Header>
    <ns:SystemUserName>Senders System</ns:SystemUserName>
    <ns:SystemPassword>yourPassword</ns:SystemPassword>
      <ns:Reportee>Senders OrgNr</ns:Reportee>
      <ns:Reference>af303bd0-3333-4ec9-af6a-31dd05569011</ns:Reference>
      <ns:FileName>yourFileName</ns:FileName>
   </soapenv:Header>
   <soapenv:Body>
      <ns:StreamedPayloadBasicBE>
         <ns:DataStream>[fileStream]</ns:DataStream>
      </ns:StreamedPayloadBasicBE>
   </soapenv:Body>
</soapenv:Envelope>
```

Returns:
```XML
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
   <s:Body>
      <ReceiptExternalStreamedBE xmlns="http://www.altinn.no/services/ServiceEngine/Broker/2015/06">
         <LastChanged>08.05.2024 13:29:28</LastChanged>
         <ParentReceiptId>0</ParentReceiptId>
         <ReceiptHistory i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"/>
         <ReceiptId>0</ReceiptId>
         <ReceiptStatusCode>OK</ReceiptStatusCode>
         <ReceiptText>Upload of file af303bd0-3333-4ec9-af6a-31dd05569011 was successful. Recipients can now download the file.</ReceiptText>
         <ReceiptTypeName>BrokerService</ReceiptTypeName>
      </ReceiptExternalStreamedBE>
   </s:Body>
</s:Envelope>
```

Step 3: As the sender, make a GetAvailableFiles request for files belonging to the recipient from step 1.
```XML
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.altinn.no/services/ServiceEngine/Broker/2015/06" xmlns:ns1="http://schemas.altinn.no/services/ServiceEngine/Broker/2015/06">
   <soapenv:Header/>
   <soapenv:Body>
      <ns:GetAvailableFilesBasic>
         <ns:systemUserName>Senders System</ns:systemUserName>
         <ns:systemPassword>password</ns:systemPassword>
         <ns:searchParameters>
            <!--Optional:-->
            <ns1:ExternalServiceCode>4947</ns1:ExternalServiceCode>
            <!--Optional:-->
            <ns1:ExternalServiceEditionCode>4678</ns1:ExternalServiceEditionCode>
            <ns1:FileStatus>Uploaded</ns1:FileStatus>
            <ns1:Reportee>Recipients OrgNr</ns1:Reportee>
         </ns:searchParameters>
      </ns:GetAvailableFilesBasic>
   </soapenv:Body>
</soapenv:Envelope>
```

If the file was successfully processed, it should be in the returned list. If the file does not appear in the list, it may have failed during processing in Altinn 3, or the recipient may have downloaded it already.
If the file is not in this returned list, or in the list returned if you repeat the request in step 3 with FileStatus "Downloaded", it means the file failed during processing.
```XML
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
   <s:Body>
      <GetAvailableFilesBasicResponse xmlns="http://www.altinn.no/services/ServiceEngine/Broker/2015/06">
         <GetAvailableFilesBasicResult xmlns:a="http://schemas.altinn.no/services/ServiceEngine/Broker/2015/06" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <a:BrokerServiceAvailableFile>
               <a:ExternalServiceCode>4947</a:ExternalServiceCode>
               <a:ExternalServiceEditionCode>4678</a:ExternalServiceEditionCode>
               <a:FileName>Altinn2FileName</a:FileName>
               <a:FileReference>af303bd0-3333-4ec9-af6a-31dd05569011</a:FileReference>
               <a:FileSize>0</a:FileSize>
               <a:FileStatus>Uploaded</a:FileStatus>
               <a:IsSftpDownloadOnly>false</a:IsSftpDownloadOnly>
               <a:ReceiptID>0</a:ReceiptID>
               <a:Reportee>senders OrgNr</a:Reportee>
               <a:SendersReference>Your SendersReference</a:SendersReference>
               <a:SentDate>2024-05-07T09:22:52.800185+02:00</a:SentDate>
            </a:BrokerServiceAvailableFile>
         </GetAvailableFilesBasicResult>
      </GetAvailableFilesBasicResponse>
   </s:Body>
</s:Envelope>
```


#### DownloadFileStreamed

No functional difference for Transitioned services.

### Receipt Endpoint

The Receipt endpoint contains requests used to retrieve Receipts for end users. 
Because Altinn 3 transitioned services will never create Receipts, no receipt data related to Altinn 3 transitioned files can 
be retrieved from this endpoint.

If your use case requires receipt usage, please submit a feature request.