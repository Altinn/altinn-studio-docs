---
title: Policy Retrieval Point
description: Description of Policy Information Point for 
tags: ["architecture", "security"]
weight: 100
linktitle: PRP
alwaysopen: false
---

The Policy Retrieval Point is the functionality where Policy Decision Point (PDP) can retrieve 
the rules defined for a app resource.

During deployment of a app the rules for the app is added to the Altinn Studio Apps 
database.

The rules are defined as XACML 3.0 Policy document. 

The Policy Document consist of one or many rules. 
Each rule has the following part

## Resource
The resource section defines the app resource the rule
 - org - The owner of the app
 - app - The app id
 - task - The task identifer for the

## Subject
This identifies who the rules applies for. For rules defined in Altinn Studio
this is persons with a given role in Altinn. Later this can be expanded. 

## Action
The action defines the action that the rules allow for.
This can be READ, WRITE, SIGN, ARCHIVEREAD, ARCHIVEDELETE 

[See example policy file](AuthoirzationRulesSample.xml)










