---
title: Systemuser API
linktitle: Systemuser API
description: API to get system user information
toc: true
---

## List all system users for a system

### Endpoint
GET authentication/api/v1/systemuser/vendor/bysystem/{systemId}

### Scopes
Maskinporten token with scope <mark>altinn:authentication/systemregister.write</mark>

### Content types
application/json

## Query Parameters

#### systemid
The unique identifier of the registered system

### Example Response
```
{
    "links": {
        "next": "http://internal.platform.tt02.altinn.cloud/authentication/api/v1/systemuser/vendor/bysystem/991825827_smartcloud?token=MTQ3Ng"
    },
    "data": [
        {
            "id": "60a291ee-1b92-4fdd-b53e-95eadfeac3af",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "313469999",
            "created": "2024-11-20T12:28:33.501342Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "6fbb6b32-08e5-4ab5-9050-af1efc01b2fd",
            "userType": "standard"
        },
        {
            "id": "99ece63d-3483-43c2-bded-dfe640ed8882",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "310178217",
            "created": "2024-11-21T11:25:26.989705Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "f430f3b3-f9ee-44f3-b9ed-66f8117a1894",
            "userType": "standard"
        },
        {
            "id": "20ee5d43-0ca8-4b61-9989-592234a307bc",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "310365882",
            "created": "2024-10-16T12:44:19.143084Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "310365882",
            "userType": "standard"
        },
        {
            "id": "db739a49-2647-42ca-a658-c30716e40361",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "210748652",
            "created": "2024-10-22T05:23:11.414682Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "210748652",
            "userType": "standard"
        },
        {
            "id": "30def54d-fcd8-4ca7-a9d3-251bdb0745b4",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "313516350",
            "created": "2024-11-04T15:00:58.363259Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "313516350",
            "userType": "standard"
        },
        {
            "id": "c0d3dc41-9fd3-4336-92e7-9e93665498cf",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "313516350",
            "created": "2024-11-04T15:06:31.388471Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "313516350",
            "userType": "standard"
        },
        {
            "id": "1d1e522b-e5ba-48c6-bb04-55e19b8dc6ec",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "210455272",
            "created": "2024-11-05T07:43:01.151086Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "210455272",
            "userType": "standard"
        },
        {
            "id": "2bf4b985-72eb-437f-b52a-db9c42b067cc",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "314173392",
            "created": "2024-11-06T12:12:47.112594Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "314173392",
            "userType": "standard"
        },
        {
            "id": "edb2ce88-9874-48f7-808c-24c811a6d561",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "312549557",
            "created": "2024-11-06T13:12:04.371927Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "312549557",
            "userType": "standard"
        },
        {
            "id": "ea46a8d7-bd38-4691-a79e-2041acb5629b",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "210088032",
            "created": "2024-11-06T13:34:01.416612Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "210088032",
            "userType": "standard"
        },
        {
            "id": "bf5708fe-f913-4e68-8356-91dfdb2daecd",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "312557835",
            "created": "2024-11-11T07:46:07.586796Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "312557835",
            "userType": "standard"
        },
        {
            "id": "a356b6d2-f80e-4571-9bff-3d3cbe0101ec",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "310166219",
            "created": "2024-11-12T13:52:02.48766Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "310166219",
            "userType": "standard"
        },
        {
            "id": "db4928db-274c-4249-8299-bf742b4f8782",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "312538326",
            "created": "2024-11-14T10:48:16.247637Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "312538326",
            "userType": "standard"
        },
        {
            "id": "9fe54cfe-5879-4d17-bf35-7bd38118c5fc",
            "integrationTitle": "SmartCloud",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "310178217",
            "created": "2024-11-21T10:52:25.341741Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "bc743a6f-2641-46dd-bf1c-a17fa9294933",
            "userType": "standard"
        },
        {
            "id": "21dfeddc-5a4d-421b-8140-2dd695d6f907",
            "integrationTitle": "SmartCloud 1",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "314153979",
            "created": "2025-01-22T09:28:42.904552Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "101952d6-6773-403e-a277-69b3a499a700",
            "userType": "standard"
        },
        {
            "id": "50fd7e56-2558-4a23-9d1c-f7e652cfdc23",
            "integrationTitle": "SmartCloud 1",
            "systemId": "991825827_smartcloud",
            "productName": "",
            "reporteeOrgNo": "314153979",
            "created": "2025-01-22T10:08:32.69806Z",
            "isDeleted": false,
            "supplierName": "",
            "supplierOrgno": "991825827",
            "externalRef": "cdffbf06-06d8-4483-b3d7-c4ed2aa3745f",
            "userType": "standard"
        }
    ]
}
```