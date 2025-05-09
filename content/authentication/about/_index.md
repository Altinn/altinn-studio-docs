---
title: Altinn Authentication
linktitle: About
description: The Altinn Authentication component provides functionality for authenticating users and systems accessing Altinn Apps and the Altinn platform.
toc: false
weight: 1
---

The authentication component does not function as an identity provider itself; instead, it establishes authentication sessions based on external identity providers such as
- [ID-porten](https://eid.difi.no/en/id-porten), 
- [Maskinporten](https://samarbeid.digdir.no/maskinporten/maskinporten/25)
- [Feide](https://www.feide.no/).

The authentication component generates JWT tokens containing claims about the user and system, based on authentication information provided by external identity providers.

Repository for Altinn Authentication can be found [here](https://github.com/Altinn/altinn-authentication).

Backlog with open issues can be found [here](https://github.com/Altinn/altinn-authentication/issues).
