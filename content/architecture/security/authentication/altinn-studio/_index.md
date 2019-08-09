---
title: Authentication Architecture Altinn Studio 
description: Description of the Authentication architecture Altinn Studio
tags: [architecture, security]
weight: 100
linktitle: Altinn Studio
alwaysopen: false
---

Users of Altinn Studio needs to be authenticated.




## Developer authentication
The App Developer using Altinn Studio will authenticate with help of the build in account in Gitea. 

The designer part of Altinn Studio integrates with Gitea so it identifies the user logged in in Gitea. 

## GIT Repo authentication
When users tries to update the Git repo where source files for the app is stored it needs to authenticate agains the GIT repo.

This can be done through using a App Key generated in Gitea or using the username/password for the  Gitea account. 


## Authentication of test user in Altinn Studio
When testing apps in Altinn Studio, the designer part of Altinn Studio will behave as the [identity provider](https://en.wikipedia.org/wiki/Identity_provider) for the runtime part 
of Altinn Studio.

Altinn Studio have functionality where app developer can select a given test user and then navigate to runtime to test the app with the selected user/instance owner. 


