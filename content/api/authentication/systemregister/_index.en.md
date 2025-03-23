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
- [Get a system]()
- [Update a system]()
- [Get Rights for a system]()
- [Get accesspackages for a system]()
- [Update Rights for a system]()
- [Update accesspackages for a system]()


