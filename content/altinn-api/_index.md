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

# Two APIs will be available

## End User System

System that interact with Altinn Apps on the API level. Typical an end user system will interact with an Altinn application. Typical scenarios 

- create an application instance
- submitt form data
- download form data
- change workflow state
- view status of an instance

## Application Owner

- query instances for a given application according to status
- create an application instance
- submitt form data 
- download form data
- confirm successful download 
- change workflow state?

# API

## Application endpoint

```http
https://nav.apps.altinn.no/app2018
```

Identifies the organization cluster and the application.

## Query instances

```http
GET /instances?isCompleted=true&workflowStateId=submitted
```

Returns a paginated set of instances (JSON)

## Create an application instance for an Instance Owner

```http
POST /instances?instanceOwnerId=12345
```

Returns the guid of the created instance.


## Submitt form data (first time)

With form data attached as e.g. XML document

```http
POST /instances/41e57962-dfb7-4502-a4dd-8da28b0885fc/data?formId=default?instanceOwnerId=12345
```

Returns instance metadata updated and with guid to data element

## Download form data 

```http
GET /instances/41e57962-dfb7-4502-a4dd-8da28b0885fc/data/fc1c2a1b-d115-4dd2-8769-07e64de9588d?instanceOwnerId=12345
```

## Confirm successful download

```http
POST /instances/41e57962-dfb7-4502-a4dd-8da28b0885fc/data/fc1c2a1b-d115-4dd2-8769-07e64de9588d/downloaded?instanceOwnerId=12345
```

{{% children description="true" depth="2" %}}
