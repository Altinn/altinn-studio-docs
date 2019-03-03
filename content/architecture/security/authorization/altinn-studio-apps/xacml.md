---
title: XACML - Altinn Studio 
description: Description of XACML use in Altinn Studio
tags: ["architecture", "security", "XACML"]
weight: 100
linktitle: XACML
alwaysopen: false
---

XACML stands for "eXtensible Access Control Markup Language". 
The standard defines a declarative fine-grained, attribute-based access control policy language,[2] 
an architecture, and a processing model describing how to evaluate access requests according to the rules defined in policies.

The Altinn Studio and Altinn Studio Apps solution uses the XACML standard for the following

- XACML Reference Architecture: Used as input for defining the Altinn Studio Apps authorization architecture
- XACML Policy: Used to define the authorization rules for apps
- XACML Request: Format used for PEP to call PDP
- XACML Response: Format used for response from PDP to PEP.

## XACML Policy
The Policy Document consist of one or many rules. 
Each rule has the following part

### Resource
The resource section defines the app resource the rule
 - org - The owner of the app
 - app - The app id
 - task - The task identifer for the

### Subject
This identifies who the rules applies for. For rules defined in Altinn Studio
this is persons with a given role in Altinn. Later this can be expanded. 

### Action
The action defines the action that the rules allow for.
This can be READ, WRITE, SIGN, ARCHIVEREAD, ARCHIVEDELETE 

[See example policy file](/architecture/security/authorization/altinn-studio-apps/AuthoirzationRulesSample.xml)


## XACML Request


## XACML Response







