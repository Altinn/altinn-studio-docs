---
title: "Creating dialogs"
description: "How to create a dialog in Dialogporten"
weight: 20
---

## Introduction

This guide shows how you can use the service owner API to create dialogs for your digital service instances and/or messages.

{{<notice info>}}
When using Altinn Studio, dialogs will be automatically created for you. An app may opt-out of this, see [the integrating Altinn Apps guide](/en/dialogporten/user-guides/service-owners/integrating-altinn-apps/) for more information.
{{</notice>}}

## Basic steps

1. Authenticate as a [service owner](/en/dialogporten/user-guides/authenticating/#usage-for-service-owner-systems)
2. Perform a POST request supplying the [create dialog DTO](/en/dialogporten/reference/entities/dialog#create-post)

## Selecting a service resource

The service resource supplied can be any resource in the [Altinn Resource Registry](/en/authorization/what-do-you-get/resourceregistry/) with a `hasCompententAuthority` property matching the authenticated organization number.

{{<notice info>}}
Adding support for additional constraints (ie. extra scope requirements) to service resources is tracked in [this issue](https://github.com/Altinn/dialogporten/issues/40).
{{</notice>}}

Resource with type `CorrespondenceService` can not be referred, as these are reserved for use with [Altinn Correspondence](/en/correspondence/).

As with [search](/en/dialogporten/user-guides/searching-for-dialogs/), the `serviceResource` dield refer to a resource in the Resource Registry and use the format `urn:altinn:resource:<identifier>`.

## Dates

All date fields are optional, but may be supplied in order to keep timestamps synchronized between Dialogporten and the service platform, control dialog visibility and indicate a due date.

### Created and updated dates

By default, both these will be set to the current timestamp when creating a dialog. Either of these may be supplied, but updated date must not be earlier than created date.

### Visibility dates

There a two optional dates that may be set on a dialog that controls visibility for end-users.

- `expiresAt` defines a future timestamp that when reached, renders the dialog inaccessible in the end-user API. End-user-systems should make an effort to warn users that the content is about to be inaccessible. Inaccessible dialogs are still visible in the service owner APIs, except when [impersonating a user](/en/dialogporten/user-guides/service-owners/impersonating-users/), and the `expiresAt` field may at any point be set to `null` or a future value which will render it visible for the end-user again (and a `dialogporten.dialog.updated` event will be emitted).

{{<notice warning>}}
Inaccessible dialogs will at this time _not_ be sanized from the database, but this may change in the future where Dialogporten remove long since expired dialogs for privacy and system efficiency reasons.
{{</notice>}}

- `visibleAt` defines a future timestamp that when reached, renders the dialog accessible in the end-user API. Prior to this time, the dialog will not be accessible.

{{<notice warning>}}
Due to a [known limitation](https://github.com/Altinn/dialogporten/issues/110), events associated with dialog creates/updates will _not_ consider `visibleAt`. This means that whenever a dialog is created with a future `visibleAt` date, the event will be produced immediately, but will not allow the end-user to access the dialog.
{{</notice>}}

### Supplying a due date

The ´dueAt´ timestamp is a hint to end-user systems to indicate to the users that a due date is associated with the dialog. Passing the due date has no effect on dialog availability.

## Setting content

Dialogporten supports several content-fields used for different purposes. These can be set on both dialog and transmissions. For techical information about field names, allowed formats etc. see the [content-type reference](/en/dialogporten/reference/content-types/).

### Title

The title is the main headline for the dialog. For dialogs referring to resources requiring the highest level of authentication (security level), a alternative non-sensitive title may additionally be supplied, which will be used as the title if the current user has authenticated with a method with a security level lower than the resource policy demands.

### Summary

The summary should provide the user with a quick overview of the current state of the dialog. This is available in the search/list API, and is usually displayed immediately after the title. For dialogs referring to resources requiring the highest level of authentication (security level), a alternative non-sensitive summary may additionally be supplied, which will be used as the summary if the current user has authenticated with a method with a security level lower than the resource policy demands.

### Additional info

The additional info field should not be used for personalized content data, but show additional non-personal information relevant to the dialog and/or current process state. Examples are contact information and links to additional documentation or support sites. This field supports rich formatting via [CommonMark](https://commonmark.org/) markdown.

### Sender name

Usually, end-user systems utilize the `org` field to indicate to the end-user who the other party of the dialog is. This can be augmented/overridden by supplying the `senderName` field, which end-user systems should use instead of (or in addition to) `org` to indicate to the end-user who the other party of the dialog is.

### Extended status

`extendedStatus` is a structured field that service owners can set on the dialog, allowing for service/domain-specific statuses beyond the generic states defined by `status`. The extended status content type is the human readable counter part, and should be supplied by the service owner whenever a structured `extendedStatus` is set.

### Content reference

This is the content type for [front channel embeds](/en/dialogporten/getting-started/front-channel-embeds/), and can be set on both dialogs and transmissions within dialogs.

**Read more**

- {{<link "../../../reference/content-types">}}
- {{<link "../../../reference/front-end/front-channel-embeds">}}

## Supplying search tags

As Dialogporten does not contain any content data, free text search is inherently limited to content fields. Not all relevant search terms is suitable for title/summary fields, so instead the service owner can supply an array of search tags that also will be considered when using free text search. The search tags are not visible on any end-user APIs.

## Setting a status

Dialogporten supports several generic dialog statuses, that indicate various typical states of the process the dialog represents. These statuses should be used by end-user systems to organize and prioritize the dialog list. The statuses are:

| Status              | Descrption                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NotApplicable`     | The dialogue does not have any meaningful status. Typically used for simple messages that do not require any interaction. This is the default.                                                          |
| `Draft`             | Used to indicate user-initiated dialogs not yet sent and that may be cancelled at any point.                                                                                                            |
| `InProgress`        | Indicates that the dialog is started, is being worked on by the party and/or service owner. In a serial process, this might indicate that, for example, a form filling is ongoing on a pre-filled form.   |
| `Awaiting`          | Sent by the party to the service owner and is awaiting a response. In a serial process, this is used after a submission is made.                                                                        |
| `RequiresAttention` | Used to indicate that the dialogue is in progress/under work, but is in a state where the user must do something - for example, correct an error, or other conditions that hinder further processing.   |
| `Completed`         | The dialogue was completed. This typically means that the dialogue has reached and end-state where no further updates will be made.                                                                     |

### What statuses to use when

When creating dialogs, the service platform should consider both the state and circumstances of the dialog being created. There are no set rules, but the following guidelines can help with deciding on what status is appropiate.

* Does the dialog represent an application form, that was "cold" initiated by the user without any obvious interaction with the service owner? **Draft**
* Is the dialog initated by the service owner (optionally pre-filled with data) for a reporting form?  **InProgress**
* Is the dialog in state where the user has made an submission, and awaiting some sort of feedback from the service owner, ie "the ball is in the service owners court"? **Awaiting**
* Was the dialog previously in a **Draft** state, but was there at some point obvious interaction with the service owner, ie. initial feedback/validation was requested and given, placing the "ball back in the partys court"? **InProgress**
* Was there some sort of discrepancy, error condidtion, important due date approaching or similar requiring the user to take action in order for the process to proceed? **RequiresAttention**
* Did the dialog reach a logical conclusion, ie. an official decision was made which in normal circumstances (ie. not counting appeal processes) representes the end of the dialog? **Completed**

A particular dialog may demand a higher resolution of statuses, ie. having several distinct states of "InProgress" that is meaningfull to onvey to the end-user. For these purposes, see the `extendedStatus` property and content type.

## Defining actions

Actions are not mandatory, but most dialogs should indicate how the user is expected to interact in order, so unless there are particular reasons not to, consider adding at least one GUI-action.

### Authorizing actions

Actions have themselves an `action` property that corresponds to a [XACML action](/en/authorization/reference/xacml/#action) defined in the referred service resource's [policy](/en/authorization/reference/xacml/#xacml-policy). Dialogporten will check if the authenticated user is allowed to perform the specified action on the referred service resource for the dialog's party, and if not, will flag the action as `isAuthorized: false` and remove the supplied URL. End-user systems should indicate to the end-user that the action exists, but that access is missing - and if possible, provide information on how to request access (which is out of scope for Dialogporten).

{{<notice warning>}}While Dialogporten will check authorization for the action and remove the URL if the check fails, the service owner system MUST perform its own authorization based on the same policy{{</notice>}}

For added control, an [authorization attribute](/en/dialogporten/getting-started/authorization/attributes/) can be supplied, which allows service owners to refer to specific rules within the policy or other service resources (which the service owner controls) entirely.

### Defining GUI actions

For many dialogs, a single GUI action with a title with something like "Start form filling" and a simple URL causing a GET navigation to the service implementation will suffice. The service owner system should make sure to include sufficient information in the URL in order to initiate, authenticate and authorize the request. As the Dialogporten end-user API requires ID-porten authentication, the service owner system can usually rely on an SSO (single-sign-on) session being active in ID-porten, thus providing a seamless user experience (barring a few browser redirects).

#### Write actions

If the `httpMethod` supplied for a GUI action is any other than `GET`, it is considered a [write action](/en/dialogporten/getting-started/write-actions/), and the browser based end-user system must use [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or similar to construct the request using the browsers scripting capabilities. As this makes GET-based redirected SSO with ID-porten impossible, in order for the service owner to be able to initiate a session, the end-user system will include the [dialog token](/en/dialogporten/getting-started/authorization/dialog-tokens/) as a Authorization-header. The service owner system at the URL will also have to fully support the [CORS-protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

#### Delete actions

Depending on the state and nature of the dialog, a delete-action should also be supplied. Delete actions is a special write action that should be flagged with the `isDeleteAction`-flag, which will give an important hint to the end-user system for providing appropiate GUI.

### Defining API actions

In order to support automations via custom end-user systems not constrained by browser semantics and security measures, service owner systems should consider adding API actions. These are typically ignored by generic browser based portal systems aimed at human users, but can provide useful information to custom end-user systems about the shape of the service owner system APIs, and what endpoints/resources/actions are relevant for the given state of the dialog - ie. a form of dynamic documentation. Eg. a form filling service might provide a POST endpoint expecting a particular datamodel representing all the form information, mirroring the human-focused GUI-action "Go to form filling".

Note that Dialogporten will not consider the validity or semantics of API actions, but will - as with GUI actions - perform authorization and flag `isAuthorized` accordingly.

**Read more**

- [Learn more about actions in dialogs](/en/dialogporten/getting-started/dialogs#actions)
- {{<link "../../../reference/entities/action">}}
- {{<link "../../../getting-started/write-actions">}}
- {{<link "../../../getting-started/authorization/dialog-tokens">}}

## Defining attachments

A logical attachment can have several representations aimed at both human users (typically unstructured data such as PDFs, media content etc) and for system/machines (typically structured data such as JSON or XML). Eg. a given attachment can be made available in PDF, DOCX, XML and JSON formats, which all contain the same logical content but in different formats. An attachment can also be indicated as a HTML (mediaType `text/html`), which should cause a normal browser navigation. End-user systems can provide embedded experiences for supported media types, eg. provide viewers/players for image and video attachments.

Attachments can be defined on both the dialog and on individual transmissions.

**Read more**

- [Learn more about attachments in dialogs](/en/dialogporten/getting-started/dialogs#attachments)

## Defining transmissions

Transmissions may contain an additional level content and attachments that represent a single instance of communication within a dialog, which can be subject to different authorization rules than the dialog level content. The transmission thus contains

- information of who sent it; either a representative of the party or the service owner
- the type of transmission, which should give end user systems an idea on how to appropiately display it to end-users. A service specific, structured extended type can also be supplied that custom end-users systems can utilize.
- optionally another related transmission

As with dialog level content, transmissions might contain a title, summary and a content reference (front channel embed). Service owners might use front channel embeds to track whether or not a particular transmission has been opened, which again can eg. trigger a `transmissionOpened` activity being added.

{{<notyetwritten>}}

**Read more**

- [Learn more about transmissions in dialogs](/en/dialogporten/getting-started/dialogs#transmissions)
- {{<link "../../../reference/entities/transmission">}}
- {{<link "../../../reference/content-types">}}

## Defining activities

When creating a dialog, the service owner system should consider the state of the service instance that the dialog reflects and how "far along" in the process the user has progressed. A typical starting point is to add a `DialogCreated` activity.

{{<notyetwritten>}}

**Read more**

- {{<link "../../../getting-started/activity-log">}}
- {{<link "../../../reference/entities/activity">}}

## Ensuring idempotency

Dialogporten offers two optional mechanisms to ensure that any given dialog is only created once:

- User-supplied dialog IDs. Service owner systems can define their own UUIDv7s (which might be deterministcally derived from internal identifiers)
- A dedicated idempotency key

The first option is a simple mechanism which for most service owner systems might be sufficient, while the other can more easily used to implement arbitrary business rules (eg. any given dialog should be associated with only one tuple of reporting party, reporting service and year/month).


{{<notice info>}}
For information on how to use HTTP-based concurrency control via `ETag` / `If-Match`-headers, see the guide for [updating dialogs](/en/dialogporten/user-guides/service-owners/creating-dialogs/../updating-dialogs/).
{{</notice>}}

## Silent dialog creation

In some cases, typically in historical data migration scenarious, it is desirable to perform a non-business-process related update to a dialog. These updates work exactly like normal updates, but 
* Does not bump `updatedAt` or `contentUpdatedAt`
* Does not cause Altinn Events to be produced

This behaviour can be enabled by added the query parameter `?isSilentUpdate=true` to the URL for the POST/PUT/PATCH request.

**Read more**
* {{<link "../updating-dialogs">}}
* {{<link "../../../reference/openapi">}}
* {{<link "../api-client">}}

{{<children />}}
