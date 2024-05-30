---
title: Bruksanvisning SOAP
linktitle: Bruksanvisning SOAP
description: Forskjell i bruk av SOAP kall mellom Altinn 2 og Altinn 3 overførte tjenester.
tags: [Løsning, formidling, guide, overgang]
toc: false
weight: 1
---

## Forskjell i bruk mellom eksisterende Altinn 2 SOAP operasjoner og Altinn 3 SOAP operasjoner som er overført til Altinn 3.
SOAP operasjoner for Altinn 2 Formidlingstjeneste er spredt over 3 endepunkter.
For de fleste forespørsler vil det ikke være noen funksjonell forskjell mellom Altinn 2 og Altinn 3 forespørsler.


|Service|Endpoint|Description|
|-----------------------|---------------------------------------------------------------------------|-------------------------------|
|BrokerService          |[Service WS](https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternal.svc)              | Behandler metadata requester.    |
|                       |[Service Basic](https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasic.svc)         |                               |
|                       |[Service EC](https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalEC2.svc)            |                               |
|BrokerService Streamed |[Streamed WS](https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalStreamed.svc)      | Behandler fil data requester.   |
|                       |[Streamed Basic](https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalStreamedBasic.svc) |                               |
|                       |[Streamed EC](https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalStreamedEC2.svc)    |                               |
|Receipt                |[Receipt WS](https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc)                     | Behandler receipt requester.     |
|                       |[Receipt Basic](https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc)                |                               |
|                       |[Receipt EC](https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC2.svc)                 |                               |

For examples of SOAP implementation see [existing documentation (norwegian only)](https://altinn.github.io/docs/api/soap/grensesnitt/#BrokerService--formidlingstjenester-ws)

### BrokerService endepunkt

"*BrokerService*" endepunktet inneholder funksjoner relatert til formidlingstjeneste metadata forespørsler.

#### InitiateBrokerService

Ingen funksjonell forskjell for overførte tjenester.

#### GetAvailableFiles

Ingen funksjonell forskjell for overførte tjenester. Hvis kode for tjenestekode/tjenesteutgave ikke leveres, vil bare Altinn 2 filer bli returnert.

#### ConfirmDownloaded

Ingen funksjonell forskjell for overførte tjenester.

#### CheckIfAvailableFiles

Ingen funksjonell forskjell for overførte tjenester. Hvis kode for tjenestekode/tjenesteutgave ikke leveres, vil bare Altinn 2 filer bli returnert.

### BrokerServiceStreamed endepunkt

BrokerServiceStreamed endepunktet inneholder funksjoner relatert til formidlingstjeneste fil data forespørsler.

#### UploadFileStreamed

Ingen funksjonell forskjell i request. Svaret vil inneholde en pseudo-kvittering generert fra Altinn 3 fil metadata. Kvitteringsid vil være 0.
{{% notice warning  %}}
Siden opplastingen og behandling av opplastet fil er en asynkron prosess i Altinn 3, vil den umiddelbare kvitteringsstatus mottatt fra request ikke nødvendigvis gjenspeile den endelige tilstanden til filen.
Altinn 2 SOAP formidlingstjeneste tilbyr ingen funksjon som lar sluttbrukere bekrefte at en fil er blitt behandlet og er klar til nedlasting for mottakere.

Hvis mulig, bør du vurdere å legge til trinn som ringer til [Få fil kvittering](../rest/#get-file-receipt-outbox-sender) for å sikre at filen er blitt behandlet.
Hvis du ikke ønsker å implementere REST, er en mulig workaround å implementere en forespørsel som henter tilgjengelige filer for mottakerne for å sikre at filen du lastet opp er gjort tilgjengelig.
{{% /notice %}}

##### Kontroller at opplastet fil er gjort tilgjengelig for nedlasting via SOAP

Trinn 1: Initier filoverføring
```XML
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.altinn.no/services/ServiceEngine/Broker/2015/06" xmlns:ns1="http://schemas.altinn.no/services/ServiceEngine/Broker/2015/06">
   <soapenv:Header/>
   <soapenv:Body>
      <ns:InitiateBrokerServiceBasic>
         <ns:systemUserName>Senders System</ns:systemUserName>
         <ns:systemPassword>yourPassword</ns:systemPassword>
         <ns:BrokerServiceInitiation>
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
         </ns:BrokerServiceInitiation>
      </ns:InitiateBrokerServiceBasic>
   </soapenv:Body>
</soapenv:Envelope>
```
Returnerer:
```XML
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
   <s:Body>
      <InitiateBrokerServiceBasicResponse xmlns="http://www.altinn.no/services/ServiceEngine/Broker/2015/06">
         <InitiateBrokerServiceBasicResult>af303bd0-3333-4ec9-af6a-31dd05569011</InitiateBrokerServiceBasicResult>
      </InitiateBrokerServiceBasicResponse>
   </s:Body>
</s:Envelope>
```

Trinn 2: Last opp fil
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

Returnerer:
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

Trinn 3: Som avsender, kall GetAvailableFiles for filer som tilhører mottakeren fra trinn 1.
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

Hvis filen ble behandlet, skulle den være i den returnerte listen. 
Hvis filen ikke vises på listen, kan den ha mislyktes under behandlingen i Altinn 3, ellers kan mottakeren ha lastet den ned allerede.
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

Ingen funksjonell forskjell for overførte tjenester.

### Receipt Endpoint

Kvittering-endepunkt inneholder forespørsler som brukes til å hente kvitteringer for sluttbrukere. 
Fordi Altinn 3 overførte tjenester aldri vil opprette kvitteringer, kan ingen kvitteringsdata relatert til Altinn 3 filer 
bli hentet fra dette endepunktet.

Hvis din UseCase krever bruk av kvittering, kan du sende inn en endringsforespørsel. 