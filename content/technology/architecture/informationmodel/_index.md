---
title: Altinn Information model
linktitle: Information Model
description: Altinn Studio, Altinn Apps and Altinn Platform has a modern cloud native architecture. This documentation describes everything from the requirements affecting the architecture to the defined capabilities and the components that provides them.
aliases:
---

![Altinn Information model](informationmodel.drawio.svg)

[Full screen](informationmodel.drawio.svg)

## Altinn Authorization

| Term| Description |
|-----|------|
| Access Package | An access package is a named and categorized “container” to which resource owners can add rights through policies. See an [overview of packages and categories](/authorization/what-do-you-get/accessgroups/type-accessgroups/). | 
| Altinn Role | A Altinn role is a relationship between organizations and organizations, organizations and persons, and persons and persons. The relationships exist because ER roles implicitly give them through or users have explicitly delegated them.  Altinn will discontinue Altinn Roles from the solution in 2026  |
| Policy  |  A policy contains rules for accessing an app or a resource. The app developer or resource owner defines it. Altinn uses XACML as a policy format. Read more about the [policy format](/altinn-studio/reference/configuration/authorization/). |
| Rule  | A rule defines different operations on resources / apps.   |
| Delegation | A delegation is when a user gives rights to a person, system, or organization. A delegation gives rights through delegated roles, delegated access Packages, or delegated single rights through a delegation policy. |
| Delegation Policy | A policy created by end-users when they delegate rights to other users/organizations. | 
| Resource | A resource is metadata about a digital or analog service that a resource owner wants to use [Altinn Authorization](/authorization/what-do-you-get/pdp/) for access control. When defining a service as a resource in [Altinn Resource Registry](/authorization/what-do-you-get/resourceregistry/) with a policy, resource owners can use Altinn PDP to control access to external solutions.  |
| Access List | An access list defines entities that can access a resource if the resource requires access list access. |

## Altinn Register

| Term| Description |
|-----|------|
| Party | Can be a organization, person or self identifed entiy. Identifed by PartyUid or PartyId. Defined by Altinn |
| Organization | Organization from entity register.  Organizations offers roles to persons and other organizations.  |
| Person | Person from folkeregister. |
| SelfIdentifedUser | Created in Altinn by user that does not have a identity number in Norway. |

## Altinn Studio

| Term| Description |
|-----|------|
| App | An application is created in Altinn Studio.  |
| App Repository | The app repository is the source control repository where the source code and configuration for an Altinn app is stored. A new repo is created for each app created in Altinn Studio. The repos located in Gitea under the org that owns the app. Example repos for [Finanstilynets apps](https://altinn.studio/repos/krt) |
| Org | Short for organisation. Organisation is the entity responsible for an app. Typically identified by an unique acronym, e.g. SKD, NAV, OSLK. See full list of Altinn orgs [here](https://github.com/Altinn/altinn-cdn/blob/master/orgs/altinn-orgs.json)|

## Altinn Events

| Term| Description |
|-----|------|
| Events | An event is a lightweight notification message containing information about a single operation or state change for a specified entity. Each event is published by a single originator, referred to as the event publisher or source, on behalf of a single person, organization or asset, known as the subject. The operation or state change is referred to as the event type. Read more about [Events](/events/) |
| Subscription | A subscription let a event subscriber tell Altinn Events what type of events he is interested in. If authorized for the event, it will be pushed to an Web hook defined by the subscriber. [Read more](/events/subscribe-to-events/ |


## Altinn Storage

| Term| Description |
|-----|------|
| Instance | An instance works as a form of envelope or folder where data can be collected and exchanged between the user and owner of the application. The instance document is a way for Altinn and external parties to track the state of one specific data exchange.  |
| Data element | The data element model is the main model for metadata related to a specific data element. A data element can be any data associated with an instance. The two most common type of data is the actual form data and attachments. |
| Instance Events |  Instance events contains information about changes on instances. [Read more](/technology/solutions/altinn-platform/storage/#instanceevent)  |

### Altinn Notifications

| Term| Description |
|-----|------|
| Notification | A notification is the single instance of an email or SMS that is sent to a single recipient. orgs can generate notifications |