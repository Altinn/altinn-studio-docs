---
title: Receive data from Altinn Apps
linktitle: Receive data
description: This guide describes in detail how application owners/service owners can receive data reported to an Altinn 3 application.
tags: [architecture, devops, todo]
toc: false
hidden: false
---

## Overall concept

Altinn offers a platform for the development and operation of digital services. If the services require the end user (citizen/business) to report data, this data will initially be stored in Altinn. The service owner must retrieve this received data from Altinn's data storage using API integration. This guide describes how such an integration can be set up.

## About process flow in applications

An application developed in Altinn Studio can have different processes depending on the service owner's needs. For a service that collects data, there will typically be at least one data step where the end user can enter data. Additionally, there may be a confirmation step where the end user can review the data before confirming that it is correct.

For such a service, the process in the app itself will be completed when the end user clicks confirm. This process can be part of a larger process orchestrated by the service owner.

## Instantiation of service

Instantiation in Altinn means that a dialogue is created in a submitter/party's inbox in Altinn. This instantiation can be triggered by the end user or by the service owner. In this guide, we assume that it is instantiated by the end user. A guide for service owner instantiation can be found here (TODO).

## Overall end user process

The overall process:

1. The end user instantiates the service in the party's message box in Altinn. This can be done via API or in a browser on Altinn.no.
2. The form is filled out and any attachment data is uploaded.
3. The end user validates the data and any attachments and sends the application process for confirmation.
4. The end user reviews the data and confirms that they have completed the process.
5. The application publishes an event that the end user has completed the filling process. (Assumes that publishing is [enabled]())
6. The service owner receives information about the event at their event receiver.
7. The service owner calls the Altinn API to download data for the instance.
8. The service owner confirms that the data has been downloaded successfully.

![Receiving data](receivingdata.drawio.svg)

## Technical requirements

Development of the application is covered in the Application Development Guide. Activation of event publishing from the application is described in the guide.

Requirements for the webhook to receive events can be found [here](/events/subscribe-to-events/developer-guides/setup-subscription/#request).

The service owner must have registered an integration in Maskinporten. Creation of the integration is described in the Guide [here](/api/authentication/maskinporten/#access-as-service-owner).

## Detailed technical process

### Service owner system receives Event from Altinn Events

The first step in the process is that the receiving endpoint receives information about the Event from the Application running in Altinn. This assumes that [subscription is set up](/events/subscribe-to-events/developer-guides/setup-subscription/).

```json
{
    "id": "bd9edd59-b18c-4726-aa9e-6b150eade814",
    "source": "https://ttd.apps.altinn.no/ttd/become-application-owner/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814",
    "specversion": "1.0",
    "type": "app.instance.created",
    "resource": "urn:altinn:app:ttd.become-application-owner",
    "resourceinstance": "bd9edd59-b18c-4726-aa9e-6b150eade814",
    "subject": "/party/1337",
    "time": "2022-05-12T00:02:07.541482Z"
}
```

### Authentication against Maskinporten

The service owner system calls the Maskinporten API with the correct Scopes for the service owner. This is described in detail [here](/authentication/what-do-you-get/maskinporten/#access-as-service-owner).

Then the service owner system must call Altinn's [exchange endpoint](/api/authentication/spec/) with its Maskinporten token as a bearer token.

```http
http://platform.altinn.no/authentication/api/v1/exchange/maskinporten/
```

### Service owner system calls the source endpoint from the event

Events from Altinn Applications point to the Instance endpoint of a given application running in Altinn. By using its service owner token, the system can download the instance document.

```json
{
    "id": "1337/bd9edd59-b18c-4726-aa9e-6b150eade814",
    "instanceOwner": {
        "partyId": "1337",
        "personNumber": "01039012345",
        "organisationNumber": null,
        "username": null
    },
    "appId": "ttd/become-application-owner",
    "org": "ttd",
    "selfLinks": {
        "apps": "https://ttd.apps.altinn.no/ttd/become-application-owner/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814",
        "platform": "https://ttd.apps.altinn.no/storage/api/v1/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814"
    },
    "dueBefore": null,
    "visibleAfter": null,
    "process": {
        "started": "2020-11-18T15:56:41.5662973Z",
        "startEvent": "StartEvent_1",
        "currentTask": {
            "flow": 2,
            "started": "2020-11-18T15:56:41.5664762Z",
            "elementId": "Task_1",
            "name": "Filling out",
            "altinnTaskType": "data",
            "ended": null,
            "validated": {
                "timestamp": "2020-11-20T13:00:05.1800273+00:00",
                "canCompleteTask": true
            }
        },
        "ended": null,
        "endEvent": null
    },
    "status": null,
    "completeConfirmations": null,
    "data": [
        {
            "id": "8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d",
            "instanceGuid": "bd9edd59-b18c-4726-aa9e-6b150eade814",
            "dataType": "CourseDomain_BecomeServiceOwner_M_2020-05-25_5703_34553_SERES",
            "filename": null,
            "contentType": "application/xml",
            "blobStoragePath": "ttd/become-application-owner/bd9edd59-b18c-4726-aa9e-6b150eade814/data/8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d",
            "selfLinks": {
                "apps": "https://ttd.apps.altinn.no/ttd/become-application-owner/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814/data/8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d",
                "platform": "https://ttd.apps.altinn.no/storage/api/v1/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814/data/8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d"
            },
            "size": 401,
            "locked": false,
            "refs": [],
            "created": "2020-11-18T15:56:43.1089008Z",
            "createdBy": null,
            "lastChanged": "2020-11-18T15:56:43.1089008Z",
            "lastChangedBy": null
        }
    ],
    "created": "2020-11-18T15:56:42.1972942Z",
    "createdBy": "1337",
    "lastChanged": "2020-11-18T15:56:42.1972942Z",
    "lastChangedBy": "1337"
}
```

### Service owner system calls the endpoint for each data element

In the instance document from the previous step, the data elements that an instance consists of are listed. These documents can be downloaded from the application endpoint. Each data element has information about, for example, data type and when it was last changed.

The URL for downloading each element is provided as a URL to the App or a URL to Storage.

```http
https://ttd.apps.altinn.no/ttd/become-application-owner/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814/data/8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d
```

It is recommended that the service owner uses the app endpoint for downloading. This way, you have the best access to logs.

### Service owner system calls the endpoint to confirm data

When instance data and data elements are downloaded and verified as okay, the service owner must confirm successful download. This is done by calling the [Complete endpoint](/api/apps/instances/#complete-instance) on the Application.

## Reference system

Altinn has developed a reference system that receives Events and downloads data. This can be found [here](https://github.com/Altinn/altinn-application-owner-system).

{{<children />}}
