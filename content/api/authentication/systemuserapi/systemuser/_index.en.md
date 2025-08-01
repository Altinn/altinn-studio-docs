---
title: System user
description: API to retrieve the system user information
toc: true
---

## System User API
The system user API provides methods for external users to retrieve information about system users.

## Security Scheme
Bearer authentication scheme is used to authenticate the external.
System user api requires that the external authenticates with a bearer token which is a Maskinporten token with specific scope.
To get a Maskinporten token, the external must first establish a client in Maskinporten. You can follow the [steps described here](/authorization/getting-started/maskinportenclient/) to setup a Maskinporten client.

## External API Methods

- [Verify Party Integration](external#verify-party-integration)
- [List all system users for a system](external#list-all-system-users-for-a-system)