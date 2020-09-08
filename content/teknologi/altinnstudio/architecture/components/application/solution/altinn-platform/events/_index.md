---
title: Application architecture Events component - Altinn Platform
linktitle: Event
description: The Events component is an a ASP.NET Core MVC Application exposing REST-API to Altinn Apps and other Altinn Platform components.
tags: [architecture, solution]
weight: 103
---


See [event capabilities](/teknologi/altinnstudio/architecture/capabilities/runtime/integration/events/) for functional description of the platforms event capabilities.

The solution is available at https://platform.altinn.cloud/event/api/v1. 

### API Structure

The API's will be structured so the URLs are filtered queries into the events storage.

{{%notice warning%}}
TODO: Verify proposed API structure
{{% /notice%}}

#### Instances events for Org

##### Endpoint

```http
GET {platformurl}/events/instanceevents/{org}/{app}?from={lastchanged}
```

##### Usage

This will be used by application owners to identify changes on instances for their applications.

##### Authorization

We will use scopes from Maskinporten to authorize access. In this way, it should also be possible for an org to delegate access to
events for a given org/app.

The full detail for this API is described in this [issue](https://github.com/Altinn/altinn-studio/issues/4551). 

The following url parameters and http headers has been defined. Person is given as a http header because of security.


| Parameter | Type | Description |
| --------- | ---- | ----------- |
| unit | string  | Optional: the organisation number nine digits for reportee |
| person | string (http header)  | Optional: the f or d number of the person |
| party | string  | Required* the partyId |
| org | string  | Required: the org owning the application |
| app | string  | Optional: the application related to the event |
| from | datetime  | Required: The time to search from |
| type | string | Optional: a specific event type |

* Needs to give one identifcator of the subject, unit,person or party parammeter.

#### Events for a given party

A very common scenario is that a party needs to know about events for the party itself or other party that party has a relationship for (client, child unit++). 

##### Endpoint

```http
GET {platformurl}/events/instanceeventsforparty/?org={org}&from={fromTime}&unit={organizationnumber}
```

This returns the events for a given party identified with a person number or organisation number.


The following url parameters and http headers has been defined. Person is given as a http header because of security.


| Parameter | Type | Description |
| --------- | ---- | ----------- |
| unit | string  | Required*  the organisation number nine digits |
| person | string (http header) | Required* the f or d number of the person |
| party | string  | Required* the partyId |
| org | string  | Optional: (required if app is provided) the org owning the application |
| app | string  | Optional: the application related to the event |
| from | datetime  | Required: The time to search from |
| type | string | Optional: a specific event type |

* Needs to give one identifcator of the subject, unit,person or party parammeter.

##### Usage

This is used by end users to see events for a given party.
This will list all changes for a given party.

##### Authorization

Access to events needs to be authorized. To be able to read events, you need to have the read right for the given app for the given party.

The topic and subject would be used to identify the correct XACML-policy to use. 

The operation would be read and the proccess task will be set to `null`.
This way there would be no need to verify the current state of an instance.

We have this example

```json {hl_lines=[4]}
[{
  "source":  "skd/skattemelding/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8",
  "subject": "party/234234422",
  "type": "instance.process.completed",
  "time":  "2020-02-20T09:06:50.3736712Z",
  "id": "91f2388f-bd8c-4647-8684-fd9f68af5b14",
  "ssid":"orgno:974760673"
}]
```

To be able to read this event, the authenticated party is required to have the rights for SKD/Skattmelding for the party 234234422

This is something it gets throug roles for that specific application.

The full detail for this API is described in this [issue](https://github.com/Altinn/altinn-studio/issues/4552). 


### Adding events

#### Endpoint

```http
POST {platformurl}/events/
```

The full detail for this API is described in this [issue](https://github.com/Altinn/altinn-studio/issues/4550). 
