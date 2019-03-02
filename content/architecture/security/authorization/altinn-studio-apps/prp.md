---
title: Policy Retrieval Point
description: Description of Policy Information Point for 
tags: ["architecture", "security"]
weight: 100
linktitle: PRP
alwaysopen: false
---

For Altinn Studio Apps there is different type of policy information needed

- The rules defined by a service developer for a resoruce
- The rules defined by end user for a resource
- The roles a user have for a given resource owner. (reportee)

When a service app is deployed to a Altinn Studio Apps environment, the rules defined for that service
is put in to the database together with other metadata for the service.

The rules for the latest deployed service to a environment is the ones that decides the 
rules for all instances. For Altinn Studio Apps the Rules information is retreieved from 
PIP in DataService Application.

The roles a user or system has for a reportee is retrieved directly from Authorization component
in Altinn II 











