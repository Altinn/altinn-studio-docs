---
title: Instances
description: The Platform API to work with instances
toc: true
tags: [api]
weight: 100
aliases:
- /teknologi/altinnstudio/altinn-api/platform-api/instances/
---

## Overview

An [instance](../../models/instance) works as a form of envelope or folder where data can be collected and exchanged between the user and owner of the application. The instance document is a way for Altinn and external parties to track the state of one specific data exchange. How long an instance can live and how many interactions there can be between the application owner and user will vary from one app to another. Advanced Apps will have their own documentation.

```http
basePath = https://{hostname}/storage/api/v1/instances
```

## Query instances

It is possible to query instances based on a number of query parameters. 

Application owners can search for from a single application or across all applications that they have.
Using this endpoint requires the scope 'altinn:instances.read'. And query parameter 'org' or 'appId' must be included in the request.

Users can search for instances linked to either themselves or an instanceOwner they are authorized to read the instances of. 
Query parameter 'instanceOwner.partyId' must be included in the request if using this endpoint as an end user.

Search for instances with a simple GET request towards the *instances* endpoint.
Available query parameters include:

- **process.currentTask** (string)  
Search for instances at a specific step in its process. 
- **process.isComplete** (bool)  
Search for instances where the process is completed.
- **process.endEvent** (string)  
Deprecated. The parameter doesn't have any code associated with it.
- **process.ended** (datetime)  
Filter instances based on ended date.
- **instanceOwner.partyId** (int)  
Filter instances based on the instance owner party id.
- **lastChanged** (datetime)  
Filter instances based on the last time they where worked on.
- **created** (datetime)  
Filter instances based on when they where initially created.
- **visibleAfter** (datetime)  
Filter instances based on when they became visible.
- **dueBefore** (datetime)  
Filter instances based on their due date.
- **excludeConfirmedBy** (string)  
Exclude instances already confirmed by a specific stakeholder. Usually the short name of an application owner.
- **isArchived** (bool)
Filter instances based on whether they are archived.
- **isSoftDeleted** (bool)
Filter instances based on whether they are soft deleted.
- **isHardDeleted** (bool)
Filter instances based on whether they are hard deleted. 
Note that hard deleted instances are only included if an application owner retrieves instances, and the results may include deleted drafts. 

**Some examples**:

Get all instances of application *org/app*, that is at process task with id *Task_2* (which is Submit, see process definition), and has last changed date greater than *2019-05-01*.
```http
GET {storagePath}/instances?appId=org/app&process.currentTask=Task_2&lastChanged=gt:2019-05-01
```

Get all instances of all applications of a given application owner *org* that has ended date greater than 2020-03-10.
```http
GET {storagePath}/instances?org=org&process.ended=gt:2020-03-10
```

Get all instances of all applications of a given application owner *org* that has not already been confirmed completed by *org*.
```http
GET {storagePath}/instances?org=org&excludeConfirmedBy=org
```

Get all instances of an application that are at a specific process task e.g. *Task_1*.
```http
GET {storagePath}/instances?appId={org}/{app}&process.currentTask={taskId}
```

On query parameters specifying date time you can use the following operators:

* gt: - greater than
* gte: - greater than or equal to
* lt: - less than
* lte: - less than or equal to
* eq: - equal (can also be blank)

They can be combined to define a range:

```http
dueBefore=gt:2019-02&dueBefore=lt:2019-03-01
```

The query returns a result object (page) which includes a collection of instances that matched the query. 100 instances is returned by default. Use *size* to get more or less instances per page. To get to the next page you have to use the *continuationToken* present in the *next* link.

The instances endpoint returns a query result object with information about how many total hits *totalHits* that the query matched and how many objects returned *count*. 

The endpoint supports *application/json*.

```json
Accept: application/json
{
    "totalHits": 234,
    "count": 50,
    "self": "{storagePath}/instances?appId=org/app&size=50",
    "next": "{storagePath}/instances?appId=org/app&size=50&continuationToken=%257b%2522token%2522%253a%2522%252bRID%..."
    "instances": [
            {...},
            {...},
            ...
      ]
    }
}
```
