---
title: System user
description: API for the external and the internal to manage the system user
toc: true
---

## System User API
The system user API provides methods for external users to retrieve information about system users. The internal API helps manage system users.

## Security Scheme
Bearer authentication scheme is used to authenticate the external.
System user api requires that the external authenticates with a bearer token which is a machineporten token with specific scope.
To get a machineporten token, the external must first establish a client in machineporten. You can follow the steps in this [link](https://docs.altinn.studio/authentication/getting-started/maskinportenclient/) to setup a machineporten client.

## External API Methods

- [Verify Party Integration](external#verify-party-integration)
- [List all system users for a system](external#list-all-system-users-for-a-system)