---
title: 'Detecting changes'
description: 'How to use Altinn Events and GraphQL notifications for detecting changes in Dialogporten'
weight: 40
---

## Introduction

This guide shows you the ways you can set up a system to detect changes made to dialogs. 

For a functional overview, see [getting started with events]({{<relref "../../getting-started/events">}}).

There are two different ways to detect changes; using Altinn Events or GraphQL subscriptions.

### When to use Altinn Events

* You need to detect new dialogs being created
* You need to be able to detect changes to any number of existing dialogs
* You are able to either supply a HTTPS endpoint to be used as a webhook for event pushes, or need to poll a Event API for a list of events

### When to use GraphQL subscriptions

* You need to be able to monitor a single (or a low number of known) dialog(s)
* You only need to monitor for a short period of time (typically while a user is present in GUI you're building)
* You need low latency 
* You are able to handle a websocket connection or server sent events via HTTP

If you're not sure, you probably want Altinn Events

## How to subscribe to Altinn Events

Please refer to the [Altinn Event component documentation]({{<relref "../../../../events/subscribe-to-events">}}) for a generic guide on how to get started either subscribing via webook (recommended) or polling the event API for events.

For technical information on the various event types and formats produced by Dialogporten, see the [technical reference for events]({{<relref "../../reference/events">}}). 

## How to Use GraphQL Subscriptions

This guide assumes you have a basic understanding of GraphQL operations and focuses on setting up and using subscriptions. If you need more detailed instructions on setting up the initial GraphQL client, please refer to the documentation of your library/client SDK of choice.

Before you can set up a GraphQL subscription, you must fetch the dialog details to obtain the necessary dialog token. This token is crucial for authorization when setting up the subscription.

### Step-by-Step Guide

1. **Fetch Dialog Details**  
   Obtain the dialog you want to monitor. This can usually be done through a GraphQL query or by utilizing a REST API endpoint. For more details on how to do this, refer to our guide on [getting dialog details]({{<relref "../getting-dialog-details">}}).

2. **Set Up the Subscription**  
   Once you have the dialog token, you can set up the subscription to the `dialogEvents`. Use the `dialogId` of the dialog you are interested in to subscribe to events related to it. Here’s how you can write the subscription query:
   
   ```graphql
   subscription {
     dialogEvents(dialogId: "your-dialog-id-here") {
       id
       type
     }
   }
   ```

   Ensure to include the `Digdir-Dialog-Token` in the HTTP headers for the request:
   
   ```http
   "Digdir-Dialog-Token": "your-dialog-token-here"
   ```

3. **Handle Incoming Events**  
   With the subscription active, the server will push updates to your client every time there is an change associated with the dialog ID you subscribed to. Events could be either `DIALOG_DELETED` or `DIALOG_UPDATED`. You will receive payloads structured as follows:

   ```json
   {
     "data": {
       "dialogEvents": {
         "id": "uuid-of-the-dialog",
         "type": "DIALOG_DELETED"  // Or "DIALOG_UPDATED"
       }
     }
   }
   ```

{{<children />}}
