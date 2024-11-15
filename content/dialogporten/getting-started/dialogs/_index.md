---
title: 'Dialogs'
description: 'Learn about how Dialogporten uses a common model to express a state of a digital dialogue'
weight: 10
toc: true
---

## Introduction

This section explains the dialog model and its components from a functional standpoint. For technical information for the various entities, see links within each section of this page.

For step-by-step guides on how to use Dialogporten as a end-user or service owner, see the [user guides]({{<relref "../../user-guides">}}).

## The dialog

The dialog is an abstract and common model for all ongoing or completed communications with a service owners, and contains descriptive metadata, e.g., who is the receiving party, addresses (URL), textual content (title, summary etc), date, status, a list of relevant _actions_ that the user can perform, and an optional list of [transmissions](#transmissions). Actions can be arbitrarily defined by the service provider, and all interaction with the dialog takes place in the service provider's user interfaces or against the service provider's API endpoints (except for GUI actions that describe write operations, see more about this in the section [Actions](#actions)).

An important difference from [Altinn Correspondence]({{<relref "/correspondence">}}) is that dialogs in Dialogporten are _mutable_. The service provider can update the metadata and available actions on the dialog at any time (with some notable exceptions). Any change generates _events_, which authorized parties can act on, e.g., sending a notification or having an EUS perform an action.

Dialogs use by default a [UUIDv7](https://uuid7.com/) as its identifier, but Dialogporten supports any valid UUID format. The service owner can specify the desired UUID upon creation to enable the use of the same identifier across systems and ensure idempotency.

**Read more**
* [Reference information for the dialog entity]({{<relref "../../reference/entities/dialog">}})

## Transmissions

A transmission is used to describe a single "communication" between the service owner and the party within a dialog Transmissions can typically be messages, pre-filled forms and receipts from the service provider, or submitted forms/messages from the party related to the dialog. The dialog may contain zero or more transmissions represented in a chronologically sorted list. Each transmission and the list of transmissions are immutable; it is only possible to append new tranmissions to the list, not change or delete transmissions.

A transmission contains some textual metadata (title, summary) that explains what the transmission is, including [front channel embeds]({{<relref "../front-channel-embeds">}}). Additionally, a transmission may contain one or more [attachments](#attachments).

Transmissions will by default inherit the authorization policy for the dialog itself, but this may be overridden such that individual transmissions are indicated as unavaiable if the end-user lacks privileges, in which case only the metadata is available, but not any front-channel embeds or attachments.

API actions and activity log entries may refer to single transmissions.

**Read more**
* [Reference information for the transmissions entity]({{<relref "../../reference/entities/transmission">}})

## Attachments

Attachments are files referenced by one or more URLs, supporting various representations of the same logical resource (ie. various formats, such as PDF, XML, JSON etc), for either GUI-consumers (ie. end user in web browser) or API-consumers (structured formats for custom end user systems). In addition to the URLs, there are some describing metadata that can be used to identity what the attachment is.

Attachments can be used on both transmission and dialog level. 

**Read more**
* [Reference information for the attachment entity]({{<relref "../../reference/entities/attachment">}})

## Actions

An _action_ describes an interaction that users can perform with or related to a dialog. Examples of actions are "Open", "Start signing", "Pay", "Confirm", "Learn more", "Cancel", etc. The list of relevant actions is part of the structured description of a dialog and can be changed at any time by the service provider through the API.

An action is either a _"GUI" action_ or an _"API" action_. All actions - both GUI and API - have an identifier that maps to an _action_ (and optionally an [authorization attribute]({{<relref "../authorization/attributes">}})) in the authorization policy ([XACML]({{<relref "../../../../authorization/guides/xacml/">}})) associated with a [service resource]({{<relref "../authorization/service-resource">}}).

### GUI Actions

GUI actions are meant to be used with browser based end-user systems (portals), which are usually made visible to the user in the form of buttons, links, or similar interactive elements. The service provider specifies whether a given action is to be considered a primary, secondary, or tertiary action, which affects how it is presented to the user. A primary action will typically be presented as a highlighted button ("call to action") and is used for the logical next step. A secondary action (e.g., "Cancel") can be a more subdued button or text link, while a tertiary action (e.g., "Learn more about this service") can be hidden behind a dropdown menu or similar. All this is up to the particular GUI used to evaluate, and different evaluations may be made depending on the "view" - i.e., context, intended user group, etc.

All GUI actions have a URL. These URLs are used in the front channel (ie. the browser) when the user activates the action, and involve the user being redirected to the service provider's own user interface where the action is performed, either automatically or as a result of further user interaction. This redirection always occurs with a GET request, ensuring that any existing sessions with the service provider are used (i.e., that browsers will send session cookies), and that redirection via SSO login in ID-porten works. These URLs must therefore return either redirects or HTML, and since it is a GET request, it is not recommended that these actions directly result in state changes.

GUI actions can, however, be marked as [write operations]({{<relref "../write-actions">}}) and can then also be used to make state changes.

**Read more**
* [Reference information for the GUI action entity]({{<relref "../../reference/entities/action#gui-actions">}})
* [Learn about write actions]({{<relref "../write-actions">}})

### API Actions

An API action is intended for EUSs and portals that use Dialogporten through their own integration and allows defining actions that result in direct state changes and take complex input that cannot be performed directly with a browser due to security mechanisms. API actions are versioned and contain a list of endpoints that can be called, possibly with information about whether an endpoint is being phased out and when this will happen. Each action also contains an identifier indicating what type of action it is, and each endpoint indicates which URL must be called to perform the action. The endpoint also contains information about which HTTP operation to use (typically GET or POST), and optionally a link to a structured description (e.g., JSON Schema) of the data model that is either returned or expected as input, which can be used for documentation purposes.

{{<notice info>}}
Dialogporten does not validate any data and does not see what data flows between the EUS and the service provider's API.
{{</notice>}}

**Read more**
* [Reference information for the API action entity]({{<relref "../../reference/entities/action#api-actions">}})

## Activities

An _activity_ describes an action or event that has occurred in connection with the dialog. Each activity is part of the activity history, which is a chronological list of activities. The service provider populates the activity history as various state changes occur.

**Read more**
* [Reference information for the dialog activity entity]({{<relref "../../reference/entities/activity">}})

## Dialog labels

Dialogs can be assigned various labels that users may employ in order to organize their dialogs in order to make it easier to keep track and collaborate with each other. 

{{<notice info>}}
Labels does not affect the state of the actual dialog; ie. its status, content or progress, and cannot be used to advance or otherwise affect the dialog process as defined by the service owner. It is merely a mechanism to enable dialog organization by allowing the user interface to create views based on dialog labels.
{{</notice>}}

There are two main categories of labels; user defined labels and system labels.

### User defined labels
User defined labels are administered by the users, and may be shared with other users. Some user defined labels have global effect (ie. visible for everyone with access to the dialog), while other are personal (ie. only visible for the user owning the labels.) 

{{<notice warning>}}
User defined label functionality is under design, and will be made available at a later stage. See the [news]({{<relref "../../news">}}) section for updated information.
{{</notice>}}

### System labels
System labels are predefined, global labels defined by Dialogporten. These may be assigned to any dialog by any user with write access to the dialog in question. Currently there are three system labels defined; `Archive` and `Bin` and `Default`. Assigning `Archive` or `Bin` labels will typically hide the dialog from the ordinary inbox views, and will make them available in other views. These system labels are mutually exclusive (ie. it can only have one of these labels at any time). By default, all dialogs will have the label `Default`, which indicates that default view/handling of the dialog should be applied. 

Common for these two system labels is that any change made to the dialog by the service owner will reset them to `Default`. Ie. if a user decides to place a dialog in the bin, and the service owner subsequently updates it with more information, the dialog will again be visible in the ordinary views as if the `Bin` label was never assigned.

### Label log
Dialogporten keeps track of labellings, logging who performed them and at what time it was performed. This includes resetting of system labels due to dialog updates.

**Read more**
* [Reference information for the system label entity]({{<relref "../../reference/entities/systemlabel">}})


{{<children />}}

