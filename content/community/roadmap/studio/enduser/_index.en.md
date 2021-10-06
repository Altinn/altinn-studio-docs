---
title: End user functionality in Altinn 3
linktitle: End user
description: This is the functionality available for end users in Altinn 3, and some of the larger planned changes.
toc: true
---

## Launched functionality

{{% panel %}}
For information on **How to use** the functionalities described here, see the [app](../../../../app/) section of the documentation.
{{% /panel %}}

### Form functionality

Support for apps where data is sent in. A variety of standard components to build with (ex. text field, radio button, checklist, date picker, attachment, repeating group of components), including putting these in a grid. 
Support for an app consisting of multiple pages, but the end user can only navigate forward and backward between the pages (controlled navigation).
All forms and elements have a standardised look and feel.

Support for defining rules, including calculation, validation and dynamics on both element and page level (i.e. control what the user will see depending on what they enter in the form).

The elements are linked to texts and data model. Possibility to connect to APIs as data sources, and prefilling with data from Altinn's copies of Folkeregisteret and Enhetsregisteret.

We also support stateless apps ([#1328](https://github.com/Altinn/altinn-studio/issues/1328)) :heavy_check_mark:
### Application process

You can combine different tasks in the order that's relevant for the app:

- Form filling / message (data) - exposing data from app owner and/or collecting data from end user
- Confirmation (confirm) - the user should confirm that _these are the data I want to submit_
- Wait for feedback (feedback) - the process is not complete, but someone other than the user (app owner or third party) is the party that should act

In addidtion we have an end stated for an instance being archived/complete.

### Authentication and authorisation

You can define which role(s) in Altinn that can access different operations on each task in the app process. 
The roles can either be Altinn specific roles, roles from Enhetsregisteret or that the app owner has access.

### Integration with the Altinn message box

The app instances are shown in the users message box in the same way as in Altinn 2.
You can find the instances through search (albeit with a few limitations).

You can use presentation fields to discern instances of the same app apart (Q2 2021) ([#594](https://github.com/Altinn/altinn-studio/issues/594)) :heavy_check_mark:

The app owner can decide what status is relevant for each instance. They can also decided that instances of an app should never be archived.

### Integration with end user systems

The apps have standardised APIs that can be used for submission from third party systems.
Every app has its own end points. Authentication is done through ID-porten.

## Upcoming functionality

Altinn 3 is in constant development, and functionality is released continuously. The backlog is revised eight times a year, and minor changes may occur between these revisions.
In general, the further into the future a functionality is planned, the less certain the time frame is for said functionality.

Changes described in _italic_ are regarded as ideas, and if they are to be developed has not yet been decided.


### Form functionality
It should be possible to define user interfaces that fit the needs of the individual app. Examples of upcoming functionality:

- More freedom in navigating between pages (Q4 2021) ([#5893](https://github.com/Altinn/altinn-studio/issues/5893))
- Editable tables (Q4 2021) ([#378](https://github.com/Altinn/altinn-studio/issues/378))
- Selecting language in an app (Q1 2022) ([#2055](https://github.com/Altinn/altinn-studio/issues/2055)). Denne endringen gjør det også mulig å tilby tjenester på andre språk enn bokmål/nynorsk/engelsk.
- _Theming of the user interface_ ([#2115](https://github.com/Altinn/altinn-studio/issues/2115))

### Application process

We will expand the library of available task types to cover more use cases. Examples of upcoming functionality:

- Functional signing (Q4 2021) ([#5540](https://github.com/Altinn/altinn-studio/issues/5540))
- Technical signing (Q1 2022)
- Complex signing rules - e.g. based on what is filled in in the for and parallel signing (x out of y persons has to sign) (Q2 2022) ([#1324](https://github.com/Altinn/altinn-studio/issues/1324)) / ([#1325](https://github.com/Altinn/altinn-studio/issues/1325))
- Payment (Q3 2022) ([#1320](https://github.com/Altinn/altinn-studio/issues/1320))
- More freedom in moving between tasks (Q4 2021) ([#2743](https://github.com/Altinn/altinn-studio/issues/2743))
- _Obtaining concent from the user_

### Authentication and authorisation

In Altinn 3 we want to have at least the same level of flexibility for the users when it comes to how to grant and granulate access as we do in Altinn 2. 
This implies these (and possibly other) changes:

- Support for delegating acces on app level (Q4 2021) ([#2731](https://github.com/Altinn/altinn-studio/issues/2731))
- Support for delegating acces on instance level (Q4 2021) ([#2732](https://github.com/Altinn/altinn-studio/issues/2732))
- _Access to app with enterprise user_ ([#3743](https://github.com/Altinn/altinn-studio/issues/3743))
- _Whitelisting of relevant users for an app_ ([#5547](https://github.com/Altinn/altinn-studio/issues/5547))

### Event driven apps

To build complete service chains without a need for complex orchestration, it's necessary that an app can "react" to events in another app or to external events.
Facilitating this way of build service chains are in the plans for late 2022.

### Notifications (email and sms)

Sending out notifications by email and/or sms is an integral part of some services. For now Altinn 3 will use the notification functionality inn Altinn 2.

- It should be possible to connect notifications to various events in the app (Q1 2022) ([#4275](https://github.com/Altinn/altinn-studio/issues/4275))
- The end user should be able to email a copy of the receipt (Q3 2022) ([#1902](https://github.com/Altinn/altinn-studio/issues/1902))

### Integration with the Altinn message box

Finding the right instance of a service in the message box should be simple. To achieve this we will add:

- Support to create a new instance based on an excisting one (Q4 2021) ([#1566](https://github.com/Altinn/altinn-studio/issues/1566))
- Check if the user already has an instance of the app in message box when going to the app, so they can chose if they want a new instance or continue the existing (Q4 2021) ([#1811](https://github.com/Altinn/altinn-studio/issues/1811))
- _Possibility to search the content of the apps_ ([#5450](https://github.com/Altinn/altinn-studio/issues/5450))
