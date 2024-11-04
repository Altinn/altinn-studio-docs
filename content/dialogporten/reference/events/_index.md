---
title: 'Events'
description: 'Information about event types produced by Dialogporten'
weight: 50
---

## Introduction

This contains reference information and examples of events produced by Dialogporten using Altinn Events. 

For a functional overview, see [getting started with events]({{<relref "../../getting-started/events">}}).

For step-by-step information on how to use Altinn Events with Dialogporten, see the [user guides for detecting changes]({{<relref "../../user-guides/detecting-changes">}}).

## Event types

| Type                             | Description                                     |
| -------------------------------- | ----------------------------------------------- |
| `dialogporten.dialog.created.v1` | A new dialog has been created.                  |
| `dialogporten.dialog.updated.v1` | An existing dialog has been updated.            |
| `dialogporten.dialog.deleted.v1` | A dialog has been deleted.                      |
| `dialogporten.dialog.seen.v1`    | A dialog has been seen (opened) by an end-user. |

The above events are produced directly by Dialogporten. In addition, there are events emitted whenever the service owner updates the [activity log]({{<relref "../../getting-started/activity-log">}}).

| Type                                                  | Description                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------- |
| `dialogporten.dialog.activity.created.v1`             | A "dialog created" activity has been added.                   |
| `dialogporten.dialog.activity.closed.v1`              | A "dialog closed" activity has been added.                    |
| `dialogporten.dialog.activity.information.v1`         | Informational activity related to a dialog has been recorded. |
| `dialogporten.dialog.activity.transmission-opened.v1` | A transmission related to a dialog has been marked as opened. |
| `dialogporten.dialog.activity.payment-made.v1`        | A payment activity within a dialog has been completed.        |
| `dialogporten.dialog.activity.signature-provided.v1`  | A signature has been provided for a dialog.                   |
| `dialogporten.dialog.activity.dialog-opened.v1`       | A dialog has been marked as opened.                           |

## Event format

As with all Altinn Events, the [Cloud Events](https://cloudevents.io/) format forms the base of the events emitted by Dialogporten. Here is some examples of events:

### Example 1 - dialog created

```json
{
    "specversion": "1.0",

    // Unique event id
    "id": "91f2388f-bd8c-4647-8684-fd9f68af5b15",
    
    // See tables above for possible types
    "type": "dialogporten.dialog.created.v1",
    
    // Timestamp for when the event occured in Dialogporten
    "time": "2025-02-19T08:00:06.4014168Z",
    
    // urn:altinn:resource:{serviceResource}
    "resource": "urn:altinn:resource:super-simple-service", 
    
    // Dialog-ID
    "resourceinstance": "f4e6df3c-7434-44c3-875e-8dca1cdf0b20",
    
    // Party
    "subject": "urn:altinn:organization:identifier-no::991825827",

    // URL to activity in Dialogporten
    "source": "https://platform.altinn.no/dialogporten/api/v1/enduser/dialogs/f4e6df3c-7434-44c3-875e-8dca1cdf0b20",
    
    // These are additional fields, if present in the dialog (all are optional).
    "data": { 
        "process": "urn:some:process:id",
        "precedingProcess": "urn:some:preceding:process:id"
    }
} 
```


### Example 2 - dialog activity added

```json
{
    "specversion": "1.0",

    // Unique event id
    "id": "91f2388f-bd8c-4647-8684-fd9f68af5b15",
    
    // See tables above for possible types
    "type": "dialogporten.dialog.activity.signature-provided.v1",
    
    // Timestamp for when the event occured in Dialogporten
    "time": "2025-02-20T13:04:02.6518542Z",
    
    // urn:altinn:resource:{serviceResource}
    "resource": "urn:altinn:resource:super-simple-service", 
    
    // Dialog-ID
    "resourceinstance": "f4e6df3c-7434-44c3-875e-8dca1cdf0b20",
    
    // Party
    "subject": "urn:altinn:organization:identifier-no::991825827",

    // URL to activity in Dialogporten
    "source": "https://platform.altinn.no/dialogporten.no/api/v1/enduser/dialogs/f4e6df3c-7434-44c3-875e-8dca1cdf0b20/activities/21241c7e-819f-462b-b8a4-d5d32352311a",
    
    // These are additional fields, if present. Only the activityId entry is always present for events
    // within the dialogporten.dialog.activity-namespace of events. All other fields are optional.
    "data": { 
        "activityId": "21241c7e-819f-462b-b8a4-d5d32352311a",
        "extendedActivityType": "additional-info-received",
        "process": "urn:some:process:id",
        "precedingProcess": "urn:some:preceding:process:id"
    }
} 
```



{{<children />}}

