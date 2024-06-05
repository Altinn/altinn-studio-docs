---
title: 'Dialogs'
description: 'Learn about how Dialogporten uses a common model to express a state of a digital dialogue'
weight: 10
toc: true
---

## The dialog

The dialog is an abstract and common model for all ongoing or completed communications with a service owners, and contains descriptive metadata, e.g., who is the receiving party, addresses (URL), title, date, status, a list of relevant _actions_ that the user can perform, and an optional list of [dialog elements](#dialog-elements). Actions can be arbitrarily defined by the service provider, and all interaction with the dialog takes place in the service provider's user interfaces or against the service provider's API endpoints (except for GUI actions that describe write operations, see more about this in the section [Actions](#actions)).

An important difference from [Altinn Correspondence]({{<relref "/correspondence">}}) is that dialogs in Dialogporten are freely _mutable_. The service provider can update the metadata and available actions on the dialog at any time. Any change generates _events_, which authorized parties can act on, e.g., sending a notification or having an EUS perform an action.

Dialogs use by default a [UUIDv7](https://uuid7.com/) as its identifier, but Dialogporten supports any valid UUID format. The service owner can specify the desired UUID upon creation to enable the use of the same identifier across systems and ensure idempotency.

### Read more
* [Reference information for the dialog entity]({{<relref "../../reference/entities/dialog">}})

## Dialog Elements

Dialog elements are distinct components of a dialog and can be used in complex dialogs where it may be useful for end-users and systems to relate to individual parts of the dialog in addition to the dialog as a whole. These can be messages and pre-filled forms from the service provider, submitted forms from the party, receipts, structured error messages, reports, unstructured attachments to messages, etc., that make up part of the overall dialog. Dialog elements are typically referred to by entries in the activityHistory. API actions can also refer to a single dialog element.

Dialog elements can be indicated to be embedded in the workspace/end-user system, and not shown as a link for the user to navigate to, but displayed directly in the user's GUI. In Workspace, this is done by the browser in the front channel with Fetch API and with the help of [Dialog Token]({{<relref "../authorization/dialog-tokens">}}) and is called [front channel embeds]({{<relref "../front-channel-embeds">}}).

### Read more
* [Reference information for the dialog element entity]({{<relref "../../reference/entities/dialogelement">}})

## Actions

An _action_ describes an interaction that users can perform with or related to a dialog. Examples of actions are "Open", "Start signing", "Pay", "Confirm", "Learn more", "Cancel", etc. The list of relevant actions is part of the structured description of a dialog and can be changed at any time by the service provider through the API.

An action is either a _"GUI" action_ or an _"API" action_. All actions - both GUI and API - have an identifier that maps to an _action_ (and optionally an [_authorization attribute_]({{<relref "../authorization/attributes">}})) in the _authorization policy_ (XACML) associated with a [_service resource_]({{<relref "../authorization/service-resource">}}).

### GUI Actions

GUI actions are made visible to the user in the form of buttons, links, or similar elements. The service provider specifies whether a given action is to be considered a primary, secondary, or tertiary action, which affects how it is presented to the user. A primary action will typically be presented as a highlighted button ("call to action") and is used for the logical next step. A secondary action (e.g., "Cancel") can be a more subdued button or text link, while a tertiary action (e.g., "Learn more about this service") can be hidden behind a dropdown menu or similar. All this is up to the particular GUI used to evaluate, and different evaluations may be made depending on the "view" - i.e., context, intended user group, etc.

All GUI actions have a URL. These URLs are used in the front channel when the user activates the action, and involve the user being redirected to the service provider's own user interface where the action is performed, either automatically or as a result of further user interaction. This redirection always occurs with a GET request, ensuring that any existing sessions with the service provider are used (i.e., that browsers will send session cookies), and that redirection via SSO login in ID-porten works. These URLs must therefore return either redirects or HTML, and since it is a GET request, it is not recommended that these actions directly result in state changes.

GUI actions can, however, be marked as write operations and can then also be used to make state changes. The user is not redirected, but the workspace/GUI will make an (empty) POST or DELETE request on behalf of the user to the specified URL in the front channel, using the [dialog Token]({{<relref "../authorization/dialog-tokens">}}) as an authorization method. Depending on the configuration, end-users will be presented with an updated dialog view. In case of errors (either technical or business logic-related), an error message can be displayed, either based on the actual response or predefined in the dialog.

Dialogporten does not know the semantics associated with an action, so for actions that involve complex mutations of the dialog, the service owner must update the dialog in the back channel and return a 2xx response in the request called in the front channel. In these cases, it must be configured that the GUI reloads the dialog after receiving a 2xx response. If the update of the dialog must occur asynchronously, the service owner can indicate this to the GUI. Dialogporten offers mechanisms that allow the GUI to receive a notification when the dialog is updated by the service owner, so that it can be loaded as soon as possible.

### Read more
* [Reference information for the GUI action entity]({{<relref "../../reference/entities/action#gui-actions">}})

### API Actions

An API action is intended for EUSs and portals that use Dialogporten through their own integration and allows defining actions that result in direct state changes and take complex input that cannot be performed directly with a browser due to security mechanisms. API actions are versioned and contain a list of endpoints that can be called, possibly with information about whether an endpoint is being phased out and when this will happen. Each action also contains an identifier indicating what type of action it is, and each endpoint indicates which URL must be called to perform the action. The endpoint also contains information about which HTTP operation to use (typically GET or POST), and optionally a link to a structured description (e.g., JSON Schema) of the data model that is either returned or expected as input, which can be used for documentation purposes.

{{<notice info>}}
Dialogporten does not validate any data and does not see what data flows between the EUS and the service provider's API.
{{</notice>}}

### Read more
* [Reference information for the API action entity]({{<relref "../../reference/entities/action#api-actions">}})

## Activities

An _activity_ describes an action or event that has occurred in connection with the dialog. Each activity is part of the activity history, which is a chronological list of activities. The service provider populates the activity history as various state changes occur.

### Read more
* [Reference information for the dialog activity entity]({{<relref "../../reference/entities/dialogactivity">}})


{{<children />}}

