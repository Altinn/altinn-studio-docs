---
title: Systembruker forespørselen
description: API for the vendor to manage the system user requests
toc: true
tags: [translate-to-norwegian]
---

## System User Request API
The system user request api provides api mehtods for the vendor to manage the system user requests.

## Security Scheme
Bearer authentication scheme is used to authenticate the system vendor.
System user request api requires that the system vendor authenticates with a bearer token which is a machineporten token with specific scope.
To get a machineporten token, the vendor must first establish a client in machineporten. You can follow the steps in this [link](https://docs.altinn.studio/authentication/getting-started/maskinportenclient/) to setup a machineporten client.

## External API Methods For Standard System User

- [Create a new system user request](create/_index.en.md)
- [Get a system user request](get/_index.en.md)

## External API Methods For Agent System User

- [Create a new system user request](create/_index.en.md)
- [Get a system user request](get/_index.en.md)

## Internal API Methods For Standard System User

- [Approve a system user request](update/_index.en.md)
- [Reject a system user request](get/_index.en.md#get-rights-of-a-system)
- [Delete a system user request](get/_index.en.md#get-accesspackages-of-a-system)

## Internal API Methods For Agent System User

- [Create a new system user request](create/_index.en.md)
- [Get a system user request](get/_index.en.md)
- [Approve a system user request](update/_index.en.md)
- [Reject a system user request](get/_index.en.md#get-rights-of-a-system)
- [Delete a system user request](get/_index.en.md#get-accesspackages-of-a-system)