---
title: System user
description: API to retrieve the system user information
toc: true
---

## System User API
The system user API provides endpoints to retrieve information about system users.

## Security Scheme
System user api requires that the authentication with a bearer token which is a Maskinporten token with specific scope.
To get a Maskinporten token, the external must first establish a client in Maskinporten. You can follow the [steps described here](/en/authorization/getting-started/maskinportenclient/) to setup a Maskinporten client.

## API Methods

- [Verify Party Integration](external#verify-party-integration)
- [List all system users for a system](external#list-all-system-users-for-a-system)