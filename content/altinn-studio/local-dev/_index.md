---
title: Solution-specific application components local deveolopment
linktitle: Local dev
description: As part of the platform it is created a solution to develop and test applications.
weight : 3
hidden: true
---

## Localtest loadbalancer
We use NGINX as loadbalancer for local development. Based on rules it redirect traffic between localtest platform and the app. 

Call between apps and localtest goes directly.

## App 
The app is of course same as it is in Altinn Apps. The difference is that it does not run as a container. 

See Altinn Apps for details about the construction components on a App. 

## Localtest platform
Localtest platform is a application that have the same webApis that are available to apps from Altinn.Platform in test and production environments

<object data="/altinn-studio/local-dev/localdev_solution.svg" type="image/svg+xml" style="width: 100%;"></object>
