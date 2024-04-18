---
title: What do you get?
description: High-level description of what Altinn Studio provides out-of-the-box
weight: 20
---

## Accessible services
Anyone who has created web solutions knows that it takes a bit of extra work to create good accessible services.
With Altinn Studio, you have support for:
- WCAG and ELMER 3 standards
- Responsive design

We use components from the [Common Design System](https://www.designsystemet.no/) to ensure a holistic user experience
and good, user-friendly services.

## Both form and API submission simultaneously
Our services have built-in support for both form- and API-based data submission. Those who need to submit
large amounts of data can choose to do so via the service side standard APIs. It is the same data model
and the same validation rules that underlie.

## Form control
You have control over how a form should appear in terms of the number of pages and components on the pages. We offer
a set of form components that cover everything from simple input fields to repeating groups and advanced tables.

## Attachments
We support attachment uploads, both directly in a form and via API. Attachment uploads in forms can also be distributed
across multiple form components and on different pages. We have relatively rich support for functionality
related to attachments, such as:
- Virus scanning of attachments
- Control of file types, size, and number of attachments
- Ability to write custom logic for extended control
- Tagging/marking of attachments
- As many attachments as you want

## Pre-filled data
You can help the user by pre-filling the form with data that is already available. The data can come
e.g., from public registers, and we have a standard configuration for pre-filled data from:
- Business Register
- National Population Register
- Altinn Profile/Contact and Reservation Register

You can also write your own logic to pre-fill with data from e.g., your own APIs.

## Code lists
We support fetching options for form field schema from a variety of standard code lists. In addition, you can define
your own static code lists or connect to an API to fetch options from there.
It is also possible to write logic where you customize _which_ options from a code list are available to the user,
e.g., based on something the user has answered earlier.

## Dynamic expressions
Dynamic expressions allow you to express logic and validations in a simple JSON-based language. Expressions can be built in our
tool with a user-friendly editor. The expressions are then run both on the frontend and backend and can be used for, among other things:
- Showing and hiding elements dynamically based on the user's choices
- Setting elements as required or read-only dynamically based on the user's choices
- Controlling text
- Managing process flow
- Validation of form data

## Full flexibility
Each service is a complete web application, providing great flexibility. It is entirely possible to plug in
self-developed code for customizations. We offer some standard events and setups that you can hook your code into,
or you can write something entirely your own.

We also offer ready-made code for integrations with other common solutions, e.g.:
- Maskinporten
- ID-porten
- eFormidling
- Events
- data.altinn.no

## Process
Each service comes with a process flow that can be configured. You can define which steps you should have, who should
have access, and which actions should be available to whom. Currently, we support being able to define custom steps for:
- Data entry
- Signing
- Payment*
- Feedback
- Summary

PDF receipts are generated automatically.

{{% notice info %}}
\* Support for [user payment for services](https://github.com/digdir/roadmap/issues/80) is under development.
{{% /notice %}}

## Development
New functionality and bug fixes are continuously released. We also have extensive documentation, including a
[course](../../app/app-dev-course/) on using Altinn Studio for service development.

We have established a simple setup to create a development environment that allows you to run and test services locally on
your own machine.

By publishing a service to a test environment, you can also test with users from the Tenor Testdata.
