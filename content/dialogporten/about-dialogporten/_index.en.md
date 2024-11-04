---
title: 'About Dialogporten'
description: 'A brief introduction to Dialogporten.'
weight: 10
---

## What is Dialogporten?
Dialogporten is a solution which serves as a common API and metadata state store for digital dialogs. The primary goal of Dialogporten is to facilitate secure and efficient communication between public service platforms (such as Altinn) and users by providing a standardized way to handle digital dialogs and messages. This involves managing the metadata associated with these dialogs and ensuring interoperability across different systems.

## What is stored in Dialogporten?
Dialogporten contains "dialogs", which are representations of a particular instance of a digital service. A dialog consists of a sender (usually a government actor), a recipient (a citizen or organization) and a reference to a digital service definition in [Altinn Resource Registry]({{<relref "../../authorization/what-do-you-get/resourceregistry">}}), which itself contains information about the service itself as well as authorization policies governing its use.

In addition, a dialog contains some content used to describe to end users the state of the dialog and give information on what the user should do (if anything), such as a title field, a short summary text, and activity history showing the various actions performed and state changes throughout the life-time of the dialog. 

## What is not stored in Dialogporten?
Actual content, such as body texts, forms, form data entered by users, attachments etc. are not included in the dialog, but merely _referenced_ using URLs pointing to the resources at the digital service platform in which the service is realized. 

## How does this work?
Dialogporten operates on a read-only basis{{<footnote "There are two exceptions; [dialog labels](../getting-started/dialogs/#dialog-labels), which users can assign in order to keep the dialogs organized, and the \"seen log\" which keeps track of user access to dialogs" >}} for end users. The digital service platforms (e.g., Altinn), which we refer to as "service providers", on behalf of a service owner (the government actor), performs the writes to the dialog. This means that while users can view the state and metadata of their dialogs through Dialogporten, any updates or actions are managed and recorded by the service platform itself - usually in sync with the user interacting with the relevant service, e.g., filling out or submitting a form. This ensures that data remains consistent and secure across all systems involved.
{{<displayFootnotes>}}

## Where do the user find the dialogs?
Users can access their dialogs by logging in to altinn.no and navigating to their "arbeidsflate", which is the common Dialogporten frontend (previosuly called "inbox"). This utilizes Dialogporten end-user APIs to search for and view dialogs and visualizes the dialogs, providing users with an intuitive interface to manage their interactions. Additionally, other end-user systems can utilize the same APIs to create tailored user experiences, allowing for flexible integration with various service provider platforms.

{{<notice info>}}
The next generation of the Altinn "inbox" GUI is under development and not currently available. Track the progress of the "Arbeidsflate" development in the [roadmap](https://github.com/orgs/digdir/projects/8/views/28)
{{</notice>}}

## Next steps
Read more about what Dialogporten has to offer in high level functionality and features

* [What do you get?]({{<relref "../what-do-you-get">}})

