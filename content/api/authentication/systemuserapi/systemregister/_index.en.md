---
title: System register
linktitle: System Register
description: API for the vendor to manage the system register
toc: true
---

## System Register API
The system register api provides api methods for the vendor to manage the system. The system is maintained in the Altinn's System Register.

## Security Scheme
Bearer authentication scheme is used to authenticate the system vendor.
System register api requires that the system vendor authenticates with a bearer token which is a Maskinporten token with specific scope.
To get a Maskinporten token, the vendor must first establish a client in Maskinporten. You can follow the [steps described here](/authorization/getting-started/maskinportenclient/) to setup a Maskinporten client.

## API Methods
- [Create a new system](create)
- [Get a system](get)
- [Update a system](update)
- [Get Rights for a system](get#get-rights-of-a-system)
- [Get accesspackages for a system](get#get-accesspackages-of-a-system)
- [Update Rights for a system](update#update-rights-for-a-system)
- [Update accesspackages for a system](update#update-accesspackages-for-a-system)


