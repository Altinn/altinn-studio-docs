---
title: Manage system register
description: API for the vendor to manage the system register
toc: true
---

## System Register API
The system register api provides api mehtods for the vendor to manage the system. The system is maintained in the Altinn's System Register.

## Security Scheme
Bearer authentication scheme is used to authenticate the system vendor.
System register api requires that the system vendor authenticates with a bearer token which is a machineporten token with specific scope.
To get a machineporten token, the vendor must first establish a client in machineporten. You can follow the steps in this [link](https://docs.altinn.studio/authentication/getting-started/maskinportenclient/) to setup a machineporten client.

## API Methods

- [Create a new system](create/_index.en.md)
- [Get a system](get/_index.en.md)
- [Update a system](update/_index.en.md)
- [Get Rights for a system](get/_index.en.md#get-rights-of-a-system)
- [Get accesspackages for a system](get/_index.en.md#get-accesspackages-of-a-system)
- [Update Rights for a system](update/_index.en.md#update-rights-for-a-system)
- [Update accesspackages for a system](update/_index.en.md#update-accesspackages-for-a-system)


