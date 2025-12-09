---
title: System User Request
description: API for the vendor to manage the system user requests
toc: true
---

## System User Request API
The system user request api provides api methods for the vendor to manage the system user requests.

## Security Scheme
Bearer authentication scheme is used to authenticate the system vendor.
System user request api requires that the system vendor authenticates with a bearer token which is a Maskinporten token with specific scope.
To get a Maskinporten token, the vendor must first establish a client in Maskinporten. You can follow the [steps described here](/en/authorization/getting-started/maskinportenclient/) to setup a Maskinporten client.

## System User Types
At present, we offer two different types of system users
1. Standard<br>
    Designed for organizations utilizing third-party software to carry out operations that interface with multiple government/private agencies.
2. Agent<br>
    Designed for organizations, such as auditing firms, that operate on behalf of their clients using third-party software systems integrated with multiple government/private agencies.

## API Methods For System User request
- [Delete a system user request](external#delete-system-user-request)

## API Methods For Standard System User request

- [Create a new system user request](external#create-a-standard-system-user-request)
- [Get a system user request](external#get-a-system-user-request)
- [List standard system user requests for a vendor](external#get-all-system-user-requests-for-a-vendor)
- [Get a system user request by external reference](external#get-a-system-user-request-by-external-reference)

## API Methods For Agent System User request

- [Create a new system user request](external#create-an-agent-system-user-request)
- [Get a system user request](external#get-an-agent-system-user-request)
- [List agent system user requests for a vendor](external#get-all-agent-system-user-requests-for-a-vendor)
- [Get an agent system user request by external reference](external#get-an-agent-system-user-request-by-external-reference)