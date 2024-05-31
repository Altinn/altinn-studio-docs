---
title: Brukerveiledning REST
linktitle: Brukerveiledning REST
description: Forskjell i bruk av REST-operasjoner mellom Altinn 2 og Altinn 3 overførte tjenester.
tags: [Løsning, formidling, guide, overgang]
toc: false
weight: 1
---

## Forskjell i bruk mellom eksisterende Altinn 2 REST-operasjoner og Altinn 2 REST-operasjoner som har overføres til Altinn 3.

For standard bruk av Altinn 2 REST-operasjoner, se [Altinn Docs] (https://Altinn.github.io/docs/api/rest/formidling/)

For alle tjenester som går til Altinn 3 via overgangsløsning vil kvitteringer være pseudo-mottaker generert fra Altinn 3 fil metadata. Dette betyr at alle kvitteringer som returneres vil være pseudo-kvitteringer, og alle kvitteringsid vil være 0.

Hvis brukssaken din krever bruk av kvittering, kan du sende inn en endringsforespørsel. 

## Outbox (Sender)

REST-operasjoner for Formidling i Altinn 2 er logisk delt mellom avsender og mottaker (Outbox / inbox).

### Initialize and Upload

Altinn 2 REST-operasjoner kombinerer initiering og last opp til samme operasjon.
Operasjonen består av en postforespørsel med en fil som en binært body, og med filnavn og /*BrokerServiceDescription*/ lagt til som parameter.

Header
```HTTP
POST https://www.altinn.no/api/{who}/brokerservice/outbox?fileName={fileName}&brokerServiceDescription={"ServiceCode":"{serviceCode}","ServiceEditionCode":{serviceEdition},"Recipients":["{recipient1}","{recipient2}"],"SendersReference":"{sendersReference}}","Properties":{"{name1}":"{value1}", "{name2}":"{value2}"},"FileList":null}
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

/*BrokerServiceDescription*/ eksempel

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

#### Forskjeller

Overgangsløsningen bruker ikke FileList propertyen.Ingen endring er nødvendig fra sluttbrukerimplementeringen, men en nullverdi vil bli akseptert, og eventuelle sendte verdier vil bli ignorert av overgangsløsningen.
Den returnerte kvitteringen vil ikke være en reell kvittering, men en pseudo-kvittering bygget fra Altinn 3 Formidling fil metadata.
{{% notice warning  %}}
Siden opplasting og behandling av opplastet fil er en asynkron prosess i Altinn 3, vil den umiddelbare kvitteringsstatusen mottatt fra opplasting ikke nødvendigvis gjenspeile den endelige tilstanden til filen.
REST implementasjon av Altinn 2 Formidlingstjenester gjør både initialisering, opplasting av fil og behandling av opplastet fil synkront. Dette betyr at mislykkede opplastinger og behandling av fildata returnerer en umiddelbar feil.
På grunn av dette har ikke REST endepunkt "*GetFileDetails*" underliggende mulighet til å varsle om feil status under behandling av fil.

Hvis mulig, bør du derfor vurdere å legge til trinn som gjør kall mot [Get File Receipt](#get-file-receipt-outbox-sender) for å sikre at filen er behandlet.
{{% /notice %}}

Eksempel på umiddelbart returnert status fra "*InitiateAndUploadFile*" kall:
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

Eksempel på returnert status fra en påfølgende "*GetFileDetails*" kall
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

"*Uploaded*" tilstand her betyr at filen er behandlet OK. En tilstand av "*Initialized*" indikerer at filen ikke er ferdig med behandlingen, eller at behandlingen har opplevd en feil, ettersom Altinn 2 REST "*GetFileDetails*" historisk sett ikke implementerer feilmeldinger opplevd under behandling av opplastet fil.

### Get File Details outbox (sender)

Denne operasjonen returnerer Formidling fil metadata.

Denne forespørselen vil ikke variere i bruk mellom Altinn 2 og Altinn 3 overførte tjenester.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/outbox/{fileId} HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

### Get File Receipt outbox (sender)

Denne operasjonen returnerer Formidling fil kvittering

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/outbox/{fileId}/receipt HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

#### Eksempel Receipt Sender
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


#### Eksempel kvittering avsender - Fil mislyktes under behandlingen
Dersom en fil mislyktes under behandling av filen etter at den er lastet opp i Altinn 3 Formidlingstjeneste (vanligvis pga. malware scanning), vil ikke dette vises i det umiddelbare resultatet av "*InstantiateAndUpload*" operasjonen i Altinn 2.

Dette skyldes at Initialisering, Opplasting og Behandling ble gjort synkront i eksisterende Altinn 2 REST løsning.
For verifisere at asynkron behandling gikk OK kan et "*GetFileDetails*" kall gjøres.

Dersom en fil opplasting mislyktes under behandlingen, vil det umiddelbare resultatet ikke vise at filen er avvist:

##### InstantiateAndUpload - Umiddelbart resultat
Umiddelbart resultat etter å ha lastet opp en fil i Altinn 3 Formidlingstjeneste via Altinn 2 REST API.
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
En sekundær operasjon for å vise at filen er har "*Initialized*" status, som betyr at den ikke har blitt blitt behandlet, og at den kan ha blitt avvist.

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
For å se den faktiske behandlingsfeilen, er det nødvendig å sjekke kvitteringsanropet for Altinn 2 REST API.
En forespørsel om fil kvittering vil returnere detaljer angående behandlingsfeil:
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

For Altinn 3 Overgangs-tjenester er kvitteringen en pseudo-kvittering bygget av Altinn 3 Formidling fil metadata.

## Inbox (recipient)

### Bekreft om brukere har filer tilgjengelig
Denne operasjonen verifiserer om noen av de gitte mottakerne har noen filer tilgjengelig for nedlasting for den gitte ServiceCode / ServiceEdition kombinasjonen.

Hvis filer er tilgjengelige, returnerer det sant, ellers returnerer det usant.

Implementeringen skiller seg ikke ut for Altinn 3 overførte tjenester.

Header
```HTTP
GET https://www.altinn.no/api/brokerservice/inbox/hasavailablefiles?serviceCode={serviceCode}&serviceEditionCode={serviceEdition}&recipients={recipient1},{recipient2} HTTP/1.1 
accept: application/json
ApiKey: myKey
```

### Få mottakers inbox
Denne operasjonen henter en liste over filer tilgjengelig for brukeren.

Denne operasjonen vil bare returnere fil-listen for overførte tjenester hvis tjenesten er spesifisert i forespørselen.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/inbox/?serviceCode={serviceCode}&serviceEditionCode={serviceEdition} HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

#### Eksempel kvittering
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

#### Forskjeller
Inbox operasjonen vil som standard hente en liste over Altinn 2 filer.Hvis det ikke leveres noen tjenestekode/tjenesteutgavekode, vil operasjonen bare liste opp filer fra Altinn 2.
Kvitteringen vil ikke ha en ReceiptID, ParentReceiptID, SendersReference eller ServiceOwnerPartyReference.

### GetFileDetails inbox (mottaker)
Denne operasjonen skiller seg ikke fra GetFileDetails for [outbox(sender)](#get-file-details-outbox-sender), bortsett fra i URI for forespørselen.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/inbox/{fileId} HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

### GetReceipt inbox (mottaker)
Denne operasjonen skiller seg ikke fra GetReceipt for [outbox(sender)](#get-file-receipt-outbox-sender), bortsett fra i URI for forespørselen.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/inbox/{fileId}/receipt HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

#### Forskjeller

For Altinn 3 overgangs tjenester er kvitteringen en pseudo-kvittering bygget av Altinn 3 Formidling fil metadata.

### Download
Denne operasjonen laster ned fil-data. Den skiller seg ikke mellom overførte og ikke-overførte Altinn 2-tjenester.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/inbox/{fileId}/download HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

### ConfirmDownload
Denne operasjonen markerer eksplisitt på vegne av sluttbruker i Altinn 3 at fil er lastet ned returnerer en kvittering.

Header
```HTTP
POST https://www.altinn.no/api/{who}/brokerservice/inbox/{fileId}/confirmdownloaded HTTP/1.1
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

### Forskjeller

For Altinn 3 overgangs tjenester er kvitteringen en pseudo-kvittering bygget av Altinn 3 Formidling fil metadata.