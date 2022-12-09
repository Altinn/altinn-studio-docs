---
title: Defining authorization policies
linktitle: Authorization
description: Altinn Studio lets the developer set the authorization requirements for an App.
---

An app needs to have defined an Authorization Policy that will be imported into Policy Retrieval Point when deployed to an Altinn Apps/Platform environment.

The policy format follows XACML 3.0, and for every policy rule, attributes define which resource, subject, and action it targets.

Currently, Altinn Studio only supports manual editing of XACML XML.
Later Altinn will add a UI to define the policy in the future.

Read how to define Authorization Policy in the [Application Developer Handbook.](/app/development/configuration/authorization/)
