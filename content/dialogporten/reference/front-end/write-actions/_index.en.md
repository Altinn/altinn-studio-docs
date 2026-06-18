---
title: 'Write actions'
description: 'Reference information about write actions'
weight: 1
---

## Introduction

See [getting started with write actions]({{<relref "../../../getting-started/write-actions">}}) for an introduction.

Below are the terms used on this page. 

End-user system (EUS)
: EUS is used to describe the system that the end user uses - usually the client side of a web browser application, running JavaScript or WebAssembly code. 

Content provider system (CPS)
: The content provider system is the system that responds to the endpoints (URLs) that the FCE refers to. This is usually the service provider platform (such as Altinn 3).
{.dpdl}

## Making requests
Write actions MUST be implemented in the EUS with a HTTP client that sends the [dialog token]({{<relref "../../authorization/dialog-tokens">}}) as a authorization header. A `Origin` header MAY be supplied in accordance with the CORS protocol. The HTTP method to be used is in the `httpMethod` property of the GUI action. The request body should be empty.

## Handling requests
The CPS endpoint MUST verify the supplied [dialog token]({{<relref "../../authorization/dialog-tokens">}}) to authorize the request. The CPS MUST implement the CORS protocol in order to support browser-based EUSs.

The CPS MUST upon successful authorization either:
* Perform a synchronous/blocking update of the dialog in Dialogporten. Upon successful response, a `204 No Content` response code is returned to EUS, indicating that the updated dialog is immediately available for reloading. 
* Perform a asynchronous/non-blocking update of the dialog in Dialogporten (via a internal queue/message service or similar). Upon success response, `202 Accepted` response code is returned to the EUS, indicating that the dialog may not yet be updated but will be within the next 10 seconds.
* Return an error message. See [error handling](#error-handling) for more details.

## Handling responses
When invoking the request, the EUS should indicate to the end-user that an action is underway, ie by displaying a spinner or similar. 

The EUSs SHOULD utilize the [GQL subscription mechanism]({{<relref "../subscriptions/">}}), and respond to events indicating that the dialog is ready to be reloaded. This will then be able to handle both synchronous and asynchronous updates from the CPS (204 and 202 response codes). Alternatively, it can conditionally handle 204s as a immediate reload request, and 202s as a hint to start polling dialogporten for new changes. This MUST NOT be attemped more than 1 request every second.

When indication that the dialog has been updated has been received, the EUS should perform a reload of the entire dialog aggregate. For best US, this SHOULD NOT involve a full page reload, but instead load the dialog in the background and refresh the GUI accordingly - including removing the spinner. The EUS MAY indicate to the user what parts of the dialog aggregate was updated by comparing the previous and new versions.

If no indication to reload the dialog has been made within 10 seconds, a generic error message should be displayed and the spinner removed. The request MUST NOT be assumed to be aborted; instead the user should be instructed to try again later and reload the page, which may provide the user with the most up-to-date state.

## Sequence diagram

This shows the happy path for how write actions should be implemented in enduser- and service provider systems.

{{<mermaid>}}
sequenceDiagram
    participant EU as Enduser
    participant EUS as Enduser System
    participant SP as Service Provider
    participant DP as Dialogporten    
    EU->>EUS: User navigates to dialog details
    EUS->>DP: Load dialog details
    DP->>EUS: Return dialog details
    note over EUS,DP: Initiate GraphQL subscription immediately on dialog load
    EUS->>DP: Subscribe to changes to dialog
    DP->>EUS: Subscription accepted
    EUS->>EU: Render dialog details
    EU->>EUS: Invoke GUI write action (ie. click button)
    EUS->>EU: Show spinner/disable button
    EUS->>SP: Perform PUT/POST/DELETE against write action URL with dialog token
    alt Synchronous/blocking
        SP->>DP: Perform dialog mutation
        DP->>SP: Return OK
        SP->>EUS: Return 204 No Content
    else Asynchronous non/blocking 
        SP->>EUS: Return 202 Accepted       
        note over SP,DP: Queued and handled elsewhere
        SP-->>DP: Perform dialog mutation
        DP-->>SP: Return OK
    end    
    opt Was asynchronous (got 202 accepted)
        DP->>EUS: Wait for dialog update notification via subscription
    end
    EUS->>DP: Re-load dialog
    DP->>EUS: Return dialog
    EUS->>EU: Render updated dialog/disable spinner
{{</mermaid>}}


## Error handling

See [error handling in FCEs for more details]({{<relref "../front-channel-embeds/#error-handling">}}).

{{<children />}}

