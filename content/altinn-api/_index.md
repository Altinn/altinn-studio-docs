---
title: Altinn API
description: Description of the Altinn API for end users and application owners.
tags: ["external", "api", "rest"]
weight: 100
alwaysopen: false
---

{{%notice warning%}}
This page is work-in-progress. This is a proposed api which most likely is going to change.
{{% /notice%}}

# Two API consumers
There are primarily two types of consumers of the Altinn APIs. The first group is applications and systems used by the owners of the applications hosted on the Altinn platform. The other group is the organizations and people using the applications. The two groups have many similar needs, but there are also differences in what type of tasks they need to be able to perform. Traditionally the two groups have had access to completely separated API endpoints in Altinn. The new API will be available to both parties, but with some functions that will normally be used only by one of the groups. 

## Application owner
A list of common tasks for an application owner.

- Query instances for a given application according to status
- Create an application instance
- Submitt form data 
- Download form data
- Confirm successful download 
- Change workflow state?

## End user system
A list of common tasks for an end user. 

- Create an application instance
- Submitt form data
- Download form data
- Change workflow state
- View status of an instance

# Multiple API
The new solution will have multiple APIs. There will be one API for each application and one common API available by the platform. The primary platform API will provide access to information about instances and the actual data.

## Application API

### Application endpoint

```http
https://nav.apps.altinn.no/app2018
```

Identifies the organization cluster and the application.

### Create an application instance for an Instance Owner

```http
POST /instances
```

Returns all metadata about the instance that was created. This includes the guid for the instance and a direct resource URI.

### Submitt form data (first time)

With form data attached as e.g. XML document

```http
POST /instances/41e57962-dfb7-4502-a4dd-8da28b0885fc/data?formId=default?instanceOwnerId=12345
```

Returns instance metadata updated and with guid to data element

### Confirm successful download

```http
POST /instances/41e57962-dfb7-4502-a4dd-8da28b0885fc/data/fc1c2a1b-d115-4dd2-8769-07e64de9588d/downloaded?instanceOwnerId=12345
```

## Platform API

### Storage endpoint

```http
https://storage.altinn.no/nav/app2018
```

Identifies the organization and application.

### Query instances

```http
GET /instances?isCompleted=true&workflowStateId=submitted
```

Returns a paginated set of instances (JSON)

### Download form data 

```http
GET /instances/41e57962-dfb7-4502-a4dd-8da28b0885fc/data/fc1c2a1b-d115-4dd2-8769-07e64de9588d?instanceOwnerId=12345
```

{{% children description="true" depth="2" %}}
