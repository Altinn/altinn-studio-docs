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

1. System (consumer) authenticates using Maskinporten and requests scope for org
2. System exchanges Maskinporten token to an Altinn token. Scopes is included in new token.
3. System calls

    ```http
    GET {platformurl}/events/api/v1/app/{org}/{app}?from={lastchanged}&eventType=instance.process.completed
    ```

4. Event component verifies that scope matches request
5. Event components searches database for events that matches search criteria
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

