---
title: Resource Administration in Altinn Studio
linktitle: Resource Administration
description: To enable resource administration in Altinn Studio, you and your organization must follow a few steps.
toc: false
weight: 3
---

## Create User & Organization

To access resource administration in Altinn Studio, you need to have a user account.

See this [guide](../../../altinn-studio/getting-started/create-user/)

## Create the Resource Admin Repository for the Organization

To enable resource administration, your organization needs a specific repository named {org}-resources. This repository will serve as a centralized hub for managing your resources. For example, [skd-resources](https://altinn.studio/repos/skd/skd-resources) .

You can create this repository from the organization page in the Gitea section of Altinn Studio.

![Repo](repocreation.png)

## Create Resource Administration Teams

- Resources  Group that can be assignet to {org}-resources
- Resources-Publish-PROD - Right to publish to production
- Resources-Publish-TT02: Team with rights to publish to TT02

Teams are created from the organization page in the Gitea section of Altinn Studio.

![Teams](teamscreation_1.png)