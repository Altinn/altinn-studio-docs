---
title: Systembruker API
linktitle: Systembruker API
description: API for å hente systembruker informasjon
toc: true
---
## Verifiser Party-integrasjon
Validerer om organisasjonen som ber om et token fra Maskinporten har en systembruker knyttet til de spesifiserte parameterene.
For en detaljert beskrivelse av responsskjemaet, vennligst se [her](model) 

### Endepunkt
GET authentication/api/v1/systemuser/byExternalId?clientid=&systemproviderorgno=&systemuserownerorgno=&externalref=

### Scopes
Maskinporten-token med scope <mark>altinn:maskinporten/systemuser.read</mark>

### Content types
application/json

## Argumenter

#### clientid
Klient-ID-kredential fra Maskinporten-integrasjonen.

#### systemproviderorgno
Organisasjonsnummeret til systemleverandøren.

#### systemownerorgno
Organisasjonsnummeret til systembrukeren.

#### externalref
Den eksterne referansen oppgitt av systemleverandøren i systembrukerforespørselen. Dette er en valgfri parameter og settes automatisk til systembrukerens organisasjonsnummer.

### Eksempel Response
```
{
    "id": "704013ee-e82a-433e-83c5-a40e6e00d746",
    "integrationTitle": "SmartCloud",
    "systemId": "991825827_smartcloud",
    "productName": "991825827_smartcloud",
    "systemInternalId": "6eeac941-8685-49ad-a195-e60542e72d45",
    "partyId": "51655537",
    "reporteeOrgNo": "313775429",
    "created": "2024-11-15T09:36:50.451886Z",
    "isDeleted": false,
    "supplierName": "",
    "supplierOrgno": "991825827",
    "externalRef": "313775429"
}
```

## List opp alle systembrukere for en system.

### Endepunkt
GET authentication/api/v1/systemuser/vendor/bysystem/{systemId}

### Scopes
Maskinporten token med scope <mark>altinn:maskinporten/systemregister.write</mark>

### Content types
application/json

## Query Parameters

#### systemid
Den unike identifikatoren for det registrerte systemet.

### Eksempel Response
```
{
    "links": {},
    "data": [
        {
            "id": "704013ee-e82a-433e-83c5-a40e6e00d746",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "systemInternalId": "6eeac941-8685-49ad-a195-e60542e72d45",
            "partyId": "51655537",
            "reporteeOrgNo": "313775429",
            "created": "2024-11-15T09:36:50.451886Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "313775429",
            "accessPackages": [],
            "userType": "standard"
        },
        {
            "id": "6ad176d8-2a88-4c24-a1db-339d52697d5f",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "systemInternalId": "6eeac941-8685-49ad-a195-e60542e72d45",
            "partyId": "51600138",
            "reporteeOrgNo": "312975955",
            "created": "2024-11-15T09:44:51.572594Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "312975955",
            "accessPackages": [],
            "userType": "standard"
        },
        {
            "id": "6c9a7dd0-2f27-4a99-9504-17b36ccba329",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "systemInternalId": "6eeac941-8685-49ad-a195-e60542e72d45",
            "partyId": "51383399",
            "reporteeOrgNo": "310816191",
            "created": "2024-11-15T09:50:13.371834Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "310816191",
            "accessPackages": [],
            "userType": "standard"
        },
        {
            "id": "5b5614b4-2ed8-4f57-960f-fa5738af097b",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "systemInternalId": "6eeac941-8685-49ad-a195-e60542e72d45",
            "partyId": "51256036",
            "reporteeOrgNo": "313641341",
            "created": "2024-11-15T09:59:15.375737Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "313641341",
            "accessPackages": [],
            "userType": "standard"
        },
        {
            "id": "c207c84b-e092-4360-a375-d68645d1bfda",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "systemInternalId": "6eeac941-8685-49ad-a195-e60542e72d45",
            "partyId": "51568851",
            "reporteeOrgNo": "312530341",
            "created": "2024-11-18T09:24:43.561465Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "312530341",
            "accessPackages": [],
            "userType": "standard"
        },
        {
            "id": "f693fdde-14f3-46ad-a44f-ad19f34026dd",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "systemInternalId": "6eeac941-8685-49ad-a195-e60542e72d45",
            "partyId": "51295426",
            "reporteeOrgNo": "314048431",
            "created": "2024-11-15T09:22:50.766297Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "12345qwerty",
            "accessPackages": [],
            "userType": "standard"
        },
        {
            "id": "3be574de-3c7e-4aea-a399-1102b28a7a8f",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "systemInternalId": "6eeac941-8685-49ad-a195-e60542e72d45",
            "partyId": "51381826",
            "reporteeOrgNo": "310798274",
            "created": "2024-10-10T06:56:06.790755Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "310798274",
            "accessPackages": [],
            "userType": "standard"
        },
        {
            "id": "a00b8bc6-4eb2-4a89-aea2-b7e62450eb7c",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "systemInternalId": "6eeac941-8685-49ad-a195-e60542e72d45",
            "partyId": "51510360",
            "reporteeOrgNo": "312976749",
            "created": "2024-10-10T06:57:29.495078Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "312976749",
            "accessPackages": [],
            "userType": "standard"
        },
        {
            "id": "7eeb775c-1e58-4f6c-a79f-e79b4b148295",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "systemInternalId": "6eeac941-8685-49ad-a195-e60542e72d45",
            "partyId": "51584261",
            "reporteeOrgNo": "312750481",
            "created": "2024-10-14T05:14:22.9004Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "312750481",
            "accessPackages": [],
            "userType": "standard"
        },
        {
            "id": "682bc674-5847-4fbf-b8f8-e69f90e4750f",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "systemInternalId": "6eeac941-8685-49ad-a195-e60542e72d45",
            "partyId": "51295426",
            "reporteeOrgNo": "314048431",
            "created": "2024-11-15T09:33:13.774495Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "314048431",
            "accessPackages": [],
            "userType": "standard"
        }
    ]
}
```