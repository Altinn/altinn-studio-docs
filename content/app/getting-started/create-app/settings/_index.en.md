---
title: Configure Settings for an App
linktitle: Configure Settings
description: Learn how to configure general settings for an app.
weight: 2
toc: true
---

{{% notice warning %}}
This page is under development.
{{% /notice %}}

## About the Application
Here, you can change the name visible to end-users of the application.

![About the Application](https://altinncdn.no/studio/docs/images/app-development_settings-about.png "About the Application")

## Setup
This section allows you to modify basic settings for the application.

![Setup](https://altinncdn.no/studio/docs/images/app-development_settings-setup.png "Setup")

## Access Rules
Access in an app is governed by a _Policy_ file located within the app. This file is based on the XACML standard. We have developed a tool to make it easier to add and edit access rules.

Learn more about how to set this up [here](https://docs.altinn.studio/en/app/development/configuration/authorization/). 
We have also written a [guide for authorization rules](https://docs.altinn.studio/en/app/development/configuration/authorization/guidelines_authorization/) 
that may be useful to review before getting started.

## Tools for Access Rules
Tools for editing access rules are located under "Settings." Here, you can set the [required security level for login](https://info.altinn.no/en/help/logging-in/miscellaneous-about-logging-in/sikkerhetsniva/), 
and you can establish rules for who should have access.

![Access Rules](https://altinncdn.no/studio/docs/images/app-development_settings-access-rules.png "Access Rules")

Each rule must define:
- WHAT the rule should apply to (which resource or sub-resource). For an app, this could be the entire app, or it can be narrowed down to only parts of the app (e.g., only a selected step in the process).
- WHICH permissions should be granted? For example, "Read," "Write," "Instantiate," etc. This is selected from a list of available permissions.
- WHO should this rule apply to? Here, you can choose from a list of Altinn roles or select your own organization.

![Access Rules - Example](https://altinncdn.no/studio/docs/images/app-development_settings-acces-rule-example.png "Access Rules - Example")

## Access Management
Here, you can set actor requirements for the application. If nothing is selected, all actor types have access.

![Access Management](https://altinncdn.no/studio/docs/images/app-development_settings-access-management.png "Access Management")

## Local Changes
This section allows you to download or delete your changes.

![Local Changes](https://altinncdn.no/studio/docs/images/app-development_settings-local-changes.png "")
