---
title: Authentication
description: The authentication component is used by Altinn Apps and Altinn Platform to authenticate users and systems.
tags: [platform, authentication]
weight: 200
---


## API to create JWT Token for user logged in to Altinn Portal
When a user logs in to the Altinn Portal (Legacy Solution) it gets a Cookie containing information about the logged in user. This cookie is
a propiaritary format for ASP.Net (Full Framework) and can only be understood with application based on .Net full framework having access to the 
symmetric encryption key. The Altinn Platform is based on .ASP.Net core I cant understand the cookie. 

To allow for a user accessing a App in Altinn Apps or a component in Altinn Platform the current platform will expose a API that can decrypt a ASP.Net 
cookie and return user information to the Authentication component in Altinn Platform. 


[See all open issues for Authentication on Github](https://github.com/Altinn/altinn-studio/labels/authentication)
