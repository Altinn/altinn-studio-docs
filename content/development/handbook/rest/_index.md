---
title: RESTful APIs (Representation State Transfer)
description: Guidelines for designing REST apis for microservices in altinn
tags: ["development", "handbook", "back-end", "rest", "api"]
weight: 100
---
{{%notice warning%}}
This page is work-in-progress. This is a proposed api which most likely is going to change.
{{% /notice%}}

#### REST
REST is an architectural style for designing loosely coupled applications over HTTP which was coined by [Rob Fielding](https://en.wikipedia.org/wiki/Roy_Fielding) in 2000.
We will define services according to [REST](https://restfulapi.net/rest-architectural-constraints/). 

All REST APIs should be versioned.

```http
/api/v1/resource
```

#### Resources

A resources is a thing that the service knows about. A resource in a system should have only one logical URI and that should provide a way to fetch 
related or additional data.

#### Platform service

Data service to store data for apps, metadata for production services

Resources: Instance, Service,  ServiceOwner, Schema, Model

##### Instance (Service instance)

An service instance is created when a reportee starts a workflow in an app. 
A reportee is a person/company that reports information via Altinn.

```json
{
    "id": "762011d1-d341-4c0a-8641-d8a104e83d30",
    "reporteeId": "666",
    "serviceId": "sailor",
    "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "XXX",
    "lastChangedDateTime": null,
    "lastChangedBy": "xyz",
    "dueDateTime": null,
    "visibleDateTime": null,
    "title": "Færder påmelding",
    "serviceOwner": "KNS",
    "externalSystemReference": null,
    "workflowId": "standard",
    "currentWorkflowStep": "started",
    "isDeleted": false,
    "isArchived": false,
    "data": [{
        "id": "boatdata",
        "contentType": "application/json",
        "storageUrl": "sailor/762011d1-d341-4c0a-8641-d8a104e83d30/boatdata",
        "uploaded": "2019-03-06T15:00:23+01:00"
        }, {
        "id": "crewlist",
        "contentType": "text/xml",
        "storageUrl": "sailor/762011d1-d341-4c0a-8641-d8a104e83d30/crewlist",
        "uploaded": "2019-03-07T23:59:49+01:00"
        }
    ]
}
```

Create a new instance. Post with params.

```http
/instances?serviceId=sailor&reporteeId=666
```

Get information about an instance.

```http
/instances/{instanceId}
```

Get all instances that a reportee has submittet or are working on

```http
/instances[?services={serviceId}][&reporter={reporteeId}][&submitted=true][&since=2017-01-01]
```

Get a specific data element

```http
/instances/{instanceId}/data/{dataId}
```

Post/put/delete a specific data element

```http
/instances/{instanceId}/data/{dataId}
```

Delete a specific instance (also deletes its data).

```http
/instances/{instanceId}
```

##### ServiceOwner

Get metadata about a service owner

```http
/serviceowners/{serviceOwnerId}
```

Get all services of a spesific service owner

```http
/serviceowners/{serviceOwnerId}/services
```

##### Service (metadata)

Resource: http://platform.altinn.no/service/sailor
```json
{
    "id": "sailor",
    "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "XXX",
    "title": "Færder påmelding",
    "serviceOwner": "KNS",
    "workflowId": "standard",
    "isDeleted": false,
    "isArchived": false,
    "schema": [{
        "id": "boatdata",
        "contentType": "application/schema+json",
        "storageUrl": "sailor/schema/boatdata"
        }, {
        "id": "crewlist",
        "contentType": "application/xsd+xml",
        "storageUrl": "sailor/schema/crewlist"
        }
    ]
}
```

Get a list of all services

```http
/services
```

Get metadata about a specific service

```http
/services/{serviceId}
```

Get the schema of a specific data element in a service

```http
/services/{serviceId}/schemas/{dataId}?format=jsonSchema
```

#### Altinn-studio 
...

tbd

#### App services (runtime)

One cluster per service owner. A service owner can have many apps.

```http
https://{serviceownerNick}.apps.altinn.no
```

Resources: App, Service, Instance

Get list of available services.

```http
/services
```

Post to create an instance for a specific reportee. Returns a new instanceId.

```http
/services/{serviceId}/instances
```

Filter instances for an reportee

``` http
/services/{serviceId}/instances?reportee={reporteeId}&[since="2018-07-01"]
```

Put to update a specific instance. Get to get instance metadata

```http
/services/{serviceId}/instances/{instanceId}
```

Post/put to upload/update form data

```http
/services/{serviceId}/instances/{instanceId}/forms/{formId}
```

Put/post to change workflow step

```http
/services/{serviceId}/instances/{instanceId}/workflow/{stepId}
```

Get receipt

```http
/services/{serviceId}/instances/{instanceId}/receipt
```

Get validate model

```http
/services/{serviceId}/instances/{instanceId}/forms/{formId}/validate
```


Get metadata about a specific service

```http
/services/{serviceId}
```

Get schema for a specific form in the service 

```http
/services/{serviceId}/schemas/{schemaId}
```

Get texts for a specific form in the service 

```http
/services/{serviceId}/texts
```
