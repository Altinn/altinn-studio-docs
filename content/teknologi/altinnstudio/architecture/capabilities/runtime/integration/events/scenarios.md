---
title: Event Scenarios
description: Description of the event-driven architecture for Altinn Apps and Altinn Platform.
linktitle: Scenarios
toc: false
tags: [architecture, events]
---


Below you find some functional scenarios for use of events functionality in Altinn 3


### Org waiting on ProcessComplete for a given app

In this scenario, an org is waiting on end-users to complete one given app.

1. System (consumer) authenticates using Maskinporten and requests scope `altinn:events/{org}/{app}`
2. System exchanges Maskinporten token to an Altinn token. Scopes is included in new token.
3. System calls

    ```http
    GET {platformurl}/events/api/v1/app/{org}/{app}?from={lastchanged}&eventType=instance.process.completed
    ```

4. Event component verifies that scope matches request
5. Event components searches Cosmos DB for events that matches search criteria
6. Event component returns the filtered and possible capped response ordered by sequence
7. Consumer process the received events and call other API to download related data (instances, files, etc)


### User needing to know if there is anything new for a party

In this scenario, a user wants to see if there are any changes for a client or the user itself.

1. System authenticates end user with ID-porten
2. System exchanges token with Altinn
3. System calls event API

    ```http
    POST {platformurl}/events/api/v1/party/
    ```

4. Event component query events in database.
5. Event components authorized the event and filter away events where user is not authorized
6. Events are returned
7. Consumer process events
8. Consumer gets relevant data

### Organization needing to know if there are anything new for a party

In this scenario a professional organization wants to see if there are any changes for a client or the organization itself.

1. System authenticates end user with Maskinporten
2. System exchanges token with Altinn
3. System calls event api

    ```http
    POST {platformurl}/events/api/v1/party/
    ```

4. Event component query events in database 
5. Event components authorized the event and filter away events where user is not authorized
6. Events are returned
7. Consumer process events
8. Consumer gets relevant data

### Approved organization needs to know about changes for all reportees

This is a scenario where some organizations like banks need to be informed when somebody dies and a "deathestate" is created for that user.

### Anonym access to a given instances events

{{%notice warning%}}
Not implemented yet.
{{% /notice%}}

In this scenario the end user has used a system to submit data, and the system needs to follow up if any feedback is given to
the instance without the user needing to log in.

1. System calls event api

```http
POST {platformurl}/events/instanceeventsforinstance/{instanceId}
```

2. Event component query events in database
3. Events are returned
4. The Consumer process events
5. The Consumer gets relevant data
