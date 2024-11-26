---
title: Submitting Data from End User Systems
linktitle: Submitting Data from
description: This guide provides a detailed general description of how an end user system can integrate with services developed on the Altinn 3 platform.
tags: [architecture, devops, todo]
toc: false
hidden: false
---

## Overview of Altinn and End User Systems

On the Altinn platform, various agencies and other public entities develop services to be used by citizens or businesses.

The services can range from simple, where a limited amount of data needs to be reported, to complex services with multiple types of data elements over several process steps.

An important feature of services developed in Altinn is that each service offers a set of APIs that can be used for machine-to-machine submission of data from end user systems.

In this context, an end user system is software that performs tasks on behalf of the end user (citizen/business), either fully automated or controlled by an end user.

Today, approximately 50% of the data reported to Altinn is sent in this way from over 100 different software solutions.

## What is an Altinn Service?

A service consists of an application that is available in Altinn's infrastructure. This application has a set of configurations that describe the data the service will receive or send out, as well as the process the service has.

Examples of services developed on the new Altinn 3 platform can be found [here](/altinn-studio/news/launched-apps/).

## What Types of Data Do Services Expose/Receive via API?

The typical Altinn service has defined a schema model that describes the data relevant to the service.

This model is specified by the service owner who created the service. In addition to one or more schema models, a service may also have defined sets of attachment data that need to be included.

## Overall Submission Process

The diagram below shows the overall flow of communication between an end user system and Altinn's API.

![Process](endusersystem.drawio.svg)

## Detailed Technical Process

### Prerequisites

For end user systems where end users will log in using ID-porten, the end user system must have a client registered as api_client in ID-porten. Documentation on how to register a client can be found [here](https://docs.digdir.no/docs/idporten/oidc/oidc_func_clientreg).

### Login & Scopes

For login, the end user system must send the end user to ID-porten for login using its configured client setup.

The scopes to request are altinn:instances.read and altinn:instances.write.

These scopes allow calling all apps in Altinn 3.

As part of the login process, the end user system will receive an access_token with information about the end user.

See the detailed login process with ID-porten and the screen presented to the end user [here](/api/authentication/id-porten/).

### Exchange of Access Token to Altinn Token

The next step in the process is to exchange the access_token from ID-porten for an Altinn Token.

An Altinn Token can be used against all service applications and relevant common components.

The exchange is done against the [Authentication API](/api/authentication/spec/).

The exchange is done by setting the Access Token from ID-porten as a Bearer token in the authorization header and making a GET call to the exchange endpoint where "id-porten" is used as the token provider.

A detailed description of the exchange with ID-porten token can be found [here](/api/authentication/id-porten/).

### Instantiation and Submission of Data

Once a valid token is obtained, one can instantiate (create a service instance) and submit data for the digital service.

There are mainly two flows to choose from here.

#### Instantiation without Schema Data

In instantiation without schema data, the first call to Altinn will only contain information about who is the submitter and which service is being instantiated.

This call is made to the [Instance API](/api/apps/instances/#create-instance) on the app. ([OpenAPI](/api/apps/spec))

```json
{
    "appId" : "org/app",
    "instanceOwner": {
        "personNumber": "12247918309",
        "organisationNumber": null
    }
}
```

The result is an instance with schema data that contains standard data and prefill data configured by the service owner.

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
        "apps": "https://local.altinn.cloud/ttd/become-application-owner/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814",
        "platform": "https://local.altinn.cloud/storage/api/v1/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814"
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
            "name": "Filling",
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
                "apps": "https://local.altinn.cloud/ttd/become-application-owner/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814/data/8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d",
                "platform": "https://local.altinn.cloud/storage/api/v1/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814/data/8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d"
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

The system can choose to download data via the data API to add its own data or possibly just overwrite the schema created during instantiation. The ID for the auto-created schema must be used to overwrite.

The PUT interface for data is used to overwrite data. Data can be sent as XML or JSON.

This depends on how the schema definition is shared by the service owner.

#### Instantiation with Multipart Form Data

This way of instantiating involves sending information about the submitter, as well as data, in one and the same API call. The instance part is as in the example above.

Schema data can be in XML format (most common so far) or JSON format.

Typically, the service owner will communicate XSD/JSON Schema documentation to end user system providers via [Altinn Digitalization](https://www.altinndigital.no/produkter/altinn-api-for-datasystem/tjenesteoversikt/) or via their own channels.

Examples of such channels are the website for the [Tax Return Service](https://github.com/Skatteetaten/skattemeldingen) and the [VAT Service](https://skatteetaten.github.io/mva-meldingen/).

In addition to schema data, there may be one or more file attachments.

The example below shows multipart/form-data with instance information, schema data (model1), and attachment data (certificate).

```http {linenos=false,hl_lines=[5,10,15]}
Content-Type: multipart/form-data; boundary="abcdefg"

--abcdefg
Content-Type: application/json; charset=utf-8
Content-Disposition: form-data; name="instance"
{ ... }

--abcdefg
Content-Type: application/xml
Content-Disposition: form-data; name="model1"
<xml> ... </xml>

--abcdefg
Content-Type: application/pdf
Content-Disposition: form-data; name="certificate"; filename=certificate.pdf
%PDF-1.4
%Óëéá
1 0 obj
...

--abcdefg--
```

### Completion of Process

Once the schema data and attachment data are fully completed, the end user system can complete the application process.

A process can consist of one or more steps. Typically, a process flow consists of a step where data is uploaded and a new process step where data is confirmed.

For an end user system, this means that the following operations must be completed before the process is complete:

#### Confirm Next on Data Step

By sending PUT on [NEXT](/api/apps/process/#complete-and-move-to-next-task) on the process API, the service will validate the data and move the process to confirmation.

In case of data errors, an error message will be received.

One can then call the [validation API](/api/apps/validation/#validate-stored-instance) to get details about the errors.

#### Confirm Next on Confirmation Step

When the data is validated OK, the service will be ready for confirmation. By making an additional PUT call to NEXT in this state, the service is completed.

The service owner is then notified that the process is complete and can process the data further.
