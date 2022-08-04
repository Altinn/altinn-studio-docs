---
title: Content in the form
description: Explain what is needed to fill the form correctly to the user and divide the content into multiple steps.
weight: 10
---

The user should not need an error message to understand what is required to fill out the application correctly. 
It should be obvious in the informative text at the start of the form and in the labels for each input field.

You should usually only ask about information that is strictly required to complete the task of the form. 
With this in mind, you should inform the user of which fields are mandatory and which are not. 
One suggested way to do this is to write (voluntary) in either the title or in an explanation of the input field.

### Divide the content into multiple steps and use paths
One long page with too much information and multiple tasks can quickly overwhelm a user. Try to divide your service
up into pages in a way where the user only has one task per page. 
This can for example be a question that the user has to answer or important information that the user must be aware of. 
This simplifies the process for the user by only giving them one thing to focus on and understand at a time.

The design we are currently offering has been created with this concept in mind. Altinn 2 style sheets 
can also be created within the Altinn 3 platform, but larger amounts of total components can lead to large amounts of scrolling
and a more confusing experience for the user, and short pages with less content help remedy this confusion. 
Example: [starting a sole proprietorship](https://brg.apps.altinn.no/brg/anonym-oppstartsveilederen/). 

The user should not be required to give more information than necessary. If the user has answered a question that leads to 
another, you can decide to hide or show the question (or page) depending on their answer with [dynamic branching](../../../development/logic/dynamic/).

### Disabled
By showing fields as disabled you might expect that users know why they can't use the element, but this is not always the case.
Some users do not understand that a field is deactivated, which can lead to further confusion. Because of this we recommend limiting your use of disabling elements, and possibly including a text to explain why it is disabled, should you choose to use this feature.
