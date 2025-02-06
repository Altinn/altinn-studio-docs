---
title: Authentication with Enterprise Users
linktitle: Enterprise Users
description: The concept of enterprise users was introduced with Altinn 2.
toc: true
weight: 100
aliases:
- /api/authentication/enterpriseusers/
---

## Overview

Enterprise users enable the use of an enterprise certificate combined with a username and password.

These users must be assigned roles and/or rights by their organization. Once assigned, they can utilize these rights for machine-to-machine communication with Altinn without needing further authorization from the organization.

## Enterprise Users in Altinn 3

In Altinn 3, enterprise users can be used via API.

This involves a two-step process: first, authenticate the organization using Maskinporten. Then, combine the username and password with the machine port for certificate authentication and exchange the machine port token with the username and password.

Administration of enterprise users is documented [here](https://altinn.github.io/docs/api/rest/kom-i-gang/virksomhetsbrukere/).

Login and token exchange are documented [here](https://altinn.github.io/docs/api/rest/kom-i-gang/virksomhet/#autentisering-med-virksomhetsbruker-og-maskinporten).

A Postman example is available [here](https://github.com/Altinn/altinn-studio/blob/master/src/test/Postman/collections/Organization.postman_collection.json).

Further use with the Altinn App API and Platform API is similar to using an Altinn token based on an ID port session.

## Transition to System Users

Support for enterprise users is expected to end in 2026 along with Altinn 2. [System users will replace this concept](../systemuser/).
