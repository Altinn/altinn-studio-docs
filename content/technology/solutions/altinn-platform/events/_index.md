---
title: Events
linktitle: Events
description: The Altinn Events component is an a ASP.NET Core MVC Application exposing REST-API to Altinn Apps and other Altinn Platform components.
tags: [architecture, solution]
weight: 3
---

In addition it contains serveral [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview) to support push of events. 

See [event capabilities](/technology/architecture/capabilities/runtime/integration/events/) for functional description of the platforms event capabilities.

![Event architecture diagram](/technology/architecture/components/application/construction/altinn-platform/events/altinn-events.drawio.svg "Altinn Event Architecture")

The solution is available at https://platform.altinn.cloud/events/api/v1.

### API Structure

The API's is structured so the URLs are filtered queries into the events storage.

#### Instances events for Org

##### Endpoint

```http
GET path: platform.altinn.no/events/api/v1/app/{org}/{appName}
```

##### Usage

This will be used by application owners to identify changes on instances for their applications.

##### Authorization

We will use scopes from Maskinporten to authorize access. In this way, it should also be possible for an org to delegate access to
events for a given org/app.

The full detail for this API is described in this [issue](https://github.com/Altinn/altinn-studio/issues/4551). 

##### Request

The following url parameters and http headers have been defined. Person is given as a http header because of security.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| org | string  | Required: the org owning the application |
| appName | string  | Required: the application related to the event |
| after | string  | Required**: the id of the last event processed by the client |
| from | datetime  | Required**: The time (UTC) to search from |
| to | datetime  | Optional: The time (UTC) to search up until |
| party | string  | Optional: the partyId |
| type | List\<string\> | Optional: a list of event types |
| unit | string  | Optional: the organisation number nine digits for reportee |
| person | string (http header)  | Optional: the f or d number of the person |
| size| int | Optional: upper limit for number of returned events |

\* Needs to give one identifcator of the subject, unit,person or party parammeter.

\*\* After or from is required

\*\*\* Source allows for escaping a single character `_` or an undefined number of characters `%`

##### Response

Response includes a _next_ header that can be used to get the events following the last event returned by the response.
Query parameter _after_ is inserted or replaced and holds the id of the last event returned in the reponse.

```http
https://platform.tt02.altinn.no/events/api/v1/app/ttd/apps-test?after=5beae524-0b3d-4e3b-bf40-450575eaf5d6&from=2020-10-01 11:35:00
```

Response body includes a list of cloud events on the form 

```json
[
    {
        "id": "8c99c887-3861-4c2a-9ac9-178a20b1ee70",
        "source": "https://nav.apps.altinn.no/nav/app/instances/1234324/6fb3f738-6800-4f29-9f3e-1c66862656cd",
        "specversion": "1.x-wip",
        "type": "instance.created",
        "subject": "party/567890",
        "time": "2020-10-13T15:46:02.557971Z",
        "alternativesubject": "/person/01038712345",
        "data": "data field"
    },
    {
        "id": "5beae524-0b3d-4e3b-bf40-450575eaf5d6",
        "source": "https://nav.apps.altinn.no/nav/app/instances/1234324/6fb3f738-6800-4f29-9f3e-1c66862656cd",
        "specversion": "1.x-wip",
        "type": "instance.deleted",
        "subject": "party/567890",
        "time": "2020-10-14T10:33:33.022379Z",
        "alternativesubject": "/person/01038712345",
        "data": "data field"
    }
]
```

### Events for a given party

A very common scenario is that a party needs to know about events for the party itself or other party that party has a relationship for (client, child unit++). 

##### Endpoint

```http
GET platform.altinn.no/events/api/v1/app/party
```

##### Usage

This is used by end users to see events for a given party.
This will list all changes for a given party, identified with a partyId, person number or organisation number.

##### Authorization

Access to events needs to be authorized. To be able to read events, you need to have the read right for the given app for the given party.

The topic and subject would be used to identify the correct XACML-policy to use. 

The operation would be read and the proccess task will be set to `null`.
This way there would be no need to verify the current state of an instance.

The full detail for this API is described in this [issue](https://github.com/Altinn/altinn-studio/issues/4552).

##### Request

The following url parameters and http headers has been defined. Person is given as a http header because of security.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| after | string  | Required**: the id of the last event processed by the client |
| from | datetime  | Required**: The time (UTC) to search from |
| to | datetime  | Optional: The time (UTC) to search up until |
| party | string  | Required* the partyId |
| type | List\<string\> | Optional: a list of event types |
| source | List\<string\> (regex allowed)*** | Optional: a list of strings to match the event source |
| unit | string  | Required*  the organisation number nine digits |
| person | string (http header) | Required* the f or d number of the person |
| size| int | Optional: upper limit for number of returned events |
\* Needs to give one identifcator of the subject, unit,person or party parammeter.

\*\* After or from is required

\*\*\* Source allows for escaping a single character `_` or an undefined number of characters `%`


##### Response

Response includes a _next_ header that can be used to get the events following the last event returned by the response.
Query parameter _after_ is inserted or replaced and holds the id of the last event returned in the reponse.

```http
https://platform.tt02.altinn.no/events/api/v1/app/party?after=5beae524-0b3d-4e3b-bf40-450575eaf5d6&from=2020-10-01 11:35:00
```


We have this example

```json {hl_lines=[4]}
[{
  "source":  "https://skd.apps.altinn.no/skd/skattemelding/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8",
  "subject": "party/234234422",
  "type": "instance.process.completed",
  "time":  "2020-02-20T09:06:50.3736712Z",
  "id": "91f2388f-bd8c-4647-8684-fd9f68af5b14",
  "ssid":"orgno:974760673"
}]
```

To be able to read this event, the authenticated party is required to have the rights for SKD/Skattmelding for the party 234234422.
This is something it gets throug roles for that specific application.


### Adding events

##### Endpoint

```http
POST {platformurl}/events/api/v1/app
```
This returns the created ID for the event.

##### Usage
This is used by the application to publish app events.
Events are submitted as [CloudEvents](https://cloudevents.io/).

A CloudEvent consists of a number of attributes, such as the ID of the event and the type of the event.  
The following attributes is used by the Events component.

| Attribute Name | Type | Note |
| -------------- | ---- | ---- |
| id	| String	| Optional. The ID of the event. A CloudEvent is uniquely identified with its source and id. The Events component will assign the id of the event. |
| source	| String (URI-reference)	| Required. The source of the event. |
| specversion	| String	| Required. The version of CloudEvents Specification the Cloud Event uses. |
| type	| String	| Required. The type of the event. |
| subject	| String	| Required. The subject of the event. |
| time	| String (Timestamp)	| Optional. The timestamp when the event happens. The Events component will set this. |
| alternativesubject | String | Optional. The alternative subject of the event. |

We have this example

```json {hl_lines=[4]}
[{
    "specversion": "1.0", 
    "type": "instance.created",
    "source":  "skd/skattemelding/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8",
    "id": "91f2388f-bd8c-4647-8684-fd9f68af5b14",
    "time": "2020-02-20T08:00:06.4014168Z",
    "subject": "party/234234422",
    "alternativesubject": "party/131555662"
}]
```

### Adding Subscription

##### Endpoint

```http
POST {platformurl}/events/api/v1/subscriptions/
```
This returns the created subscription with IDs

##### Usage

This is used by the consumer to add a subscription.

The consumer needs to ba an org authenticated with maskinporten or a end user autenticated with ID-porten

We have this example that adds a subscription for all events for the app ttd/apps-test to be pushed
to a Slack webhook

```json {hl_lines=[4]}
{
    "endPoint": "https://hooks.slack.com/services/TSRSASBVNF3/ADRRSDSSSAahttsasdfasFO3w83456ss",
    "sourceFilter": "https://ttd.apps.at21.altinn.cloud/ttd/apps-test"
}
```

### API Documentation

The full detail for this API is described [here](/api/events/spec). 


## Push Functions

A important part of the Events components are three different Azure Functions that is responsible for the following

- Inbound Function: Send every event to an subscription matching and authorization function
- Outbound Function: Pushes events to subscription endpoints
- Subscription Validation Function

See more details in the [construction components for Events](/technology/architecture/components/application/construction/altinn-platform/events/)
