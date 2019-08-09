---
title: Application Owners' Interface - Altinn Platform
linktitle: Platform Api for Application Owners
description: Description of the application owner interface for Storage component
tags: [architecture, solution]
weight: 100
alwaysopen: true
---

Application owners must have access to metadata about all instances of a particular application and have the possiblity to download the form data of the instance when necessary.

An application instance is created when:

* a instance owner (reportee) creates an instance from Altinn by starting an application
* the application owner creates an instance for a specific reportee

An instance replaces Altinn2 message. 
An instanceOwner is a person/company that reports information via Altinn.
An appId refers to the application information element which defines the metadata about the application.
The Platform Storage module provides persistent storage service for all applications in Altinn. 
It is used by applications to store information about *instances* and their *data* elements. 

An application owner will typically want to do one or more of the following tasks:

1. find all instances that have a particular workflow state and download one or more data elements for multiple instance owners.
2. be notified that an instance has reached a given workflow state, so that data elements can be downloaded (not MVP)
3. get all data elements that has reached a workflow state since a given time period (not MVP)

## Application owner can query instances for a given application (1)

### Step one: Find instances that should be downloaded

Query parameters:

* ```appId=TEST-sailor``` Finds all instances of an identified application.
* ```workflow.currentStep=Submit``` Finds all instances that have a given workflow state.
* ```elementType=main``` Finds all instances that has a form data element with a specified element type.
* ```size=50&page=2``` Returns page two of the matching instances where each page has 50 items, e.g. instances numbered 50-99 in the result query. Size of 100 is default.

Query example

```html
GET /instances?appId=test/sailor&workflow.currentStep=Submit&elementType=crewlist
```

The result of such a query is a document that lists (by default) the 100 first instances and indicates the total number of instances that match the query.

```json
{
    "total": 29349,
    "links": {
        "self": { 
            "href": "/instances?appId=test/sailor&workflow.currentStep=submitted&elementType=crewlist?page=3"
        },
        "last": {
            "href": "/instances?applId=test/sailor&workflow.currentStep=Submit&elementType=crewlist?page=294"
        }
    },
    "content": [
        {
            "id": "5024/762011d1-d341-4c0a-8641-d8a104e83d30",
            "appId": "test/sailor",
            "org": "test",
            "instanceOwnerId": "5024",
            "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
            "createdBy": "user32",
            "lastChangedDateTime": "2019-03-07T23:59:49+01:00",
            "lastChangedBy": "user34",
            "dueDateTime": null,
            "visibleDateTime": null,
            "presentationField": { "nb": "Færder påmelding 2019"},
            "workflow" : {
                "currentStep": "Submit",
                "isCompleted": true
            },
            "data": [
                {
                    "id": "692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
                    "elementType": "boatdata",
                    "contentType": "application/json",
                    "storageUrl": "TEST/TEST-sailor/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
                    "link": "/instances/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
                    "fileName": "davidsyacht.json",
                    "createdDateTime": "2019-03-06T15:00:23+01:00",
                    "createdBy": "XXX",
                    "signature": "oajviojoi2j3l23889yv8js909u293840zz092u3",
                    "fileSize": 2003,
                    "isLocked": true,
                    "appOwner":
                        {
                            "downloaded": ["2019-03-03T14:35:20+01:00", "2019-03-04T09:35:16+01:00"],
                            "confirmed": ["2019-03-05T14:00:01+01:00"]
                        }
                },
                {
                    "id": "999911d1-d341-4c0a-8641-d8a104e83d30",
                    "elementType": "crewlist",
                    "contentType": "text/xml",
                    "storageUrl": "TEST/TEST-sailor/762011d1-d341-4c0a-8641-d8a104e83d30/data/999911d1-d341-4c0a-8641-d8a104e83d30",
                    "link": "/instances/762011d1-d341-4c0a-8641-d8a104e83d30/data/999911d1-d341-4c0a-8641-d8a104e83d30",
                    "fileName": "crewLIst.xml",
                    "createdDateTime": "2019-03-07T23:59:49+01:00",
                    "createdBy": "XXX",
                    "lastChangedDateTime": "2019-03-10T23:59:49+01:00",
                    "lastChangedBy": "XXX"
                }
            ]
        },
    ...
    ]
}
```

### Step 2: Download form data

For all instances select data element to dowload, use download link to asynchronosly download the data content.

```http
GET /instances/762011d1-d341-4c0a-8641-d8a104e83d30/data/999911d1-d341-4c0a-8641-d8a104e83d30
```

### Step 3: Confirm download success

After a successfull download the Application Owner should confirm that it succeded.

```http
POST /instances/762011d1-d341-4c0a-8641-d8a104e83d30/data/999911d1-d341-4c0a-8641-d8a104e83d30/confirmDownload
```

