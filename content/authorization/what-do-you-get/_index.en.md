---
title: What do you get?
linktitle: What do you get?
description: Overview of components and functions provided by Altinn Authorization.
tags: [architecture, solution]
toc: false
weight: 2
---

Altinn Authorization provides components and services that can be used by public entities, system providers/end-user systems, businesses, and individuals to perform access management and access control for services both on and outside the Altinn platform, as well as from their own end-user systems.

**Service owners** can register resources in the Resource Register for services that require access management. In the Resource Register, rules can be created specifying who can use a service, for what purpose, and under which conditions. If a service should only be available to a specific group of organizations, this can be managed through access lists.
With the authorization service (PDP), the resource owner can ensure access control over the resource. This access control supports users from both ID-porten and Maskinporten.

**System-vendors** can use our APIs to authenticate their users against public services.

**End-user** can act on behalf of an organization or themselves. In the Altinn portal or via an end-user system, the user can select whom they are acting on behalf of. The end user can view which authorizations exist and who has authorization on their behalf. Authorizations can be granted or revoked via both the user interface and API.

Authentication Altinn Authorization provides authentication functionality using ID-porten and Maskinporten against Altinn. In addition, we offer System User functionality, which enables fine-grained access management through Maskinporten.
