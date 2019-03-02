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

#### Resources

A resources is a thing that the service knows about. A resource in a system should have only one logical URI and that should provide a way to fetch 
related or additional data.

#### App services (runtime)

One app per service owner. A service owner can have many services.

https://{serviceownerNick}.apps.altinn.no/

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
/services/{serviceId}/instances?for={reporteeId}&[since="2018-07-01"]
```

Put to update a specific instance. Get to get instance metadata

```http
/services/{serviceId}/instances/{instanceId}
```

Post/put to upload/update form data

```http
/services/{serviceId}/instances/{instanceId}/forms/{formId}
```

Get list of all services for the app

```http
/services
```

Get metadata about a specific service

```http
/services/{serviceId}
```

Get schema for a specific form in the service 

```http
/services/{serviceId}/schemas/{formId}
```

#### Platform service

Data service to store data for apps.

Resources: Reportee, Instance, Service, Form, ServiceOwner, Model

##### Reportee

A reportee is a person/company that reports information via Altinn.

Get information about a specific reportee

```http
/reportees/{reporteeId}
```

Get all instances that a reportee has submittet or are working on

```http
/reportees/{reporteeId}/instances[?services={serviceId}][&submitted=true][&since=2017-01-01]
```

Get a specific instance

```http
/reportees/{reporteeId}/instances/{instanceId}
```

Get all forms (data) of an instance

```http
/reportees/{reporteeId}/instances/{instanceId}/forms
```

Get a specific form

```http
/reportees/{reporteeId}/instances/{instanceId}/forms/{formId}
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

Get information about a specific service

```http
/serviceowners/{serviceOwnerId}/services/{serviceId}
```

Get information about the instances of a specific service

```http
/serviceowners/{serviceOwnerId}/services/{serviceId}/instances
```

##### Service

Get a list of all services

```http
/services
```

Get metadata about a specific service

```http
/services/{serviceId}
```

Get schema of a specific form in a service

```http
/services/{serviceId}/schemas/{formId}?format=jsonSchema
```

#### Altinn-studio 
...

tbd