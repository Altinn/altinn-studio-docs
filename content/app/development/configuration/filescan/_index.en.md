---
title: Virus scan
description: How to configure virus scan for an app
toc: true
weight: 400
---

Each application owner storage is protected by Windows Defender, however, if your application requires feedback in realtime on whether or not an uploaded file is infected, enabling virus scan for some or all data types is the way to go.
Enabling virus scan results in scan of the file immediatly after it uploaded to storage. The scan result will later be added to the metadata for the data element and can be reviewed by any entity that is authorized to read the instance.

## Enable filescan in your application

{{%notice info%}}
To allow generating events for your application it must refer to nuget version >= 7.4.0.
See how you update nuget references for your application [here](/app/maintainance/dependencies/).
{{% /notice%}}

Deep scan of files is not enabled by default, to activate this a manual step is requried.
If a file is scanned and found to be infected before the process is complete, this will cause a validation error.

In the file `applicationmetadata.json` in the folder _App/config_ the following should be added for each datatype that should be scanned.

```json
      "enableFileScan": true
```

## Validation error when waiting for filescan

If the ValidationService should should trigger a validation error and prevent the completion of the process before the scan is complete, another value should be added for the datatype.
.
```json
      "validationErrorOnPendingFileScan": true
```


Example of `applicationmetadata.json` with filescan enabled for datatype _egenerklaring_, no validation error on pending scan.

```json
{
  "id": "digdir/egenerklaring-2022",
  "org": "digdir",
  "title": {
    "nb": "egenerklaring-2022"
  },
  "dataTypes": [
    {
      "id": "ref-data-as-pdf",
      "allowedContentTypes": [
        "application/pdf"
      ],
      "maxCount": 0,
      "minCount": 0,
      "enablePdfCreation": true,
      "enableFileScan": false,
      "validationErrorOnPendingFileScan": false
    },
    {
      "id": "egenerklaring",
      "allowedContentTypes": [
        "application/xml"
      ],
      "appLogic": {
        "autoCreate": true,
        "classRef": "Altinn.App.Models.egenerklaring",
        "allowAnonymousOnStateless": false,
        "autoDeleteOnProcessEnd": false
      },
      "taskId": "Task_1",
      "maxCount": 1,
      "minCount": 1,
      "enablePdfCreation": true,
      "enableFileScan": true,
      "validationErrorOnPendingFileScan": false
    }
  ],
  "partyTypesAllowed": {
    "bankruptcyEstate": false,
    "organisation": false,
    "person": false,
    "subUnit": false
  },
  "autoDeleteOnProcessEnd": false,
  "created": "2023-02-01T13:16:50.1330774Z",
  "createdBy": "altinn",
  "lastChanged": "2023-02-01T13:16:50.1330784Z",
  "lastChangedBy": "altinn"
}
```
