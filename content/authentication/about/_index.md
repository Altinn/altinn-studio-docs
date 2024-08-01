---
title: About Altinn Authentication
linktitle: About
description: The Altinn Authentication component provides functionality for authenticating users and systems accessing Altinn Apps and the Altinn platform.
toc: false
weight: 1
---

The authentication component is not an ID-provider and only creates authentication sessions based on external ID-providers like [ID-porten](https://eid.difi.no/en/id-porten), 
[Maskinporten](https://samarbeid.digdir.no/maskinporten/maskinporten/25), or [Feide](https://www.feide.no/).

The authentication component creates JWT tokens with claims about the user and system.

The claims are based on the authentication information coming from the ID-providers.

Repository for Altinn Authentication can be found [here](https://github.com/Altinn/altinn-authentication).

Backlog with open issues can be found [here](https://github.com/Altinn/altinn-authentication/issues).
