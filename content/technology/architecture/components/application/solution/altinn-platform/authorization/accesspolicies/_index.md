---
title: Access Policies component
linktitle: Access Policies
description: The Access Policies component is the policy store for all access policies in Altinn platform.
tags: [architecture, security, authorization, xacml]
---

{{<notice warning>}}
This is work in progress
{{</notice>}}

[Work in progress](https://github.com/Altinn/altinn-authorization/issues/27)

In Altinn 3 platform it will support different types of Access Policies based on XACML 3.0

## App Policies

The App Policies are policies for Apps [created in Altinn Studio](../../../../../../../../app/development/configuration/authorization/). 
The policy is created in Altinn Studio and migrated to the Access Policy component when the app is deployed to a test or production environment.

An app policy contains information about the different resources in an App and who and what kind of operations they are allowed to perform. 
The who is identified using Altinn Roles, Access Groups, or roles/groups from other sources.


## Resource Registry Policies

The resource registry policies are policies for resources that is not comming for Altinn 3. It could be any functionality hosted on any platform. 

Both digital and analog services can be registrated in the resource registry.


## Delegated Policies

Delegated policies are policies created by users when their own rights are delegated ot other persons/systems.
The who is identified by user or partyId.

