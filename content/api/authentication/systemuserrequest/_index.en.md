---
title: System User Request
description: API for the vendor to manage the system user requests
toc: true
---

## System User Request API
The system user request api provides api mehtods for the vendor to manage the system user requests.

## Security Scheme
Bearer authentication scheme is used to authenticate the system vendor.
System user request api requires that the system vendor authenticates with a bearer token which is a machineporten token with specific scope.
To get a machineporten token, the vendor must first establish a client in machineporten. You can follow the steps in this [link](https://docs.altinn.studio/authentication/getting-started/maskinportenclient/) to setup a machineporten client.

## External API Methods For System User
- [Delete a system user request](external#delete-system-user-request)

## External API Methods For Standard System User

- [Create a new system user request](external#create-a-standard-system-user-request)
- [Get a system user request](external#get-a-system-user-request)
- [List standard system user requests for a vendor](external#get-all-system-user-requests-for-a-vendor)
- [Get a system user request by external reference](external#get-a-system-user-request-by-external-reference)

## External API Methods For Agent System User

- [Create a new system user request](external#create-an-agent-system-user-request)
- [Get a system user request](external#get-an-agent-system-user-request)
- [List agent system user requests for a vendor](external#get-all-agent-system-user-requests-for-a-vendor)
- [Get an agent system user request by external reference](external#get-an-agent-system-user-request-by-external-reference)