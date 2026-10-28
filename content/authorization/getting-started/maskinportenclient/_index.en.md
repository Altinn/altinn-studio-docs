---
title: Setting up Maskinporten client
linktitle: Maskinporten
description: This page describes the process of setting up a Maskinporten client
toc: false
---

To use the Altinn API, several scenarios require a Maskinporten client:

- Calling the Altinn API as an organization
- Authenticating as an enterprise user
- Authenticating as a system user

## Setting up the Maskinporten Client

{{% insert "content/shared/maskinporten/maskinporten-client-create.en.md" %}}

## Scope list

Depending on your usage, you will need to add the relevant scopes to your client. In the table below you will find a collection of commonly used scopes:

| Scope                                | Usage                     | Description                                                                   |
| ------------------------------------ | ------------------------- | ----------------------------------------------------------------------------- |
| altinn:instances.read                | Altinn Apps API read      |                                                                               |
| altinn:instances.write               | Altinn Apps API write     |                                                                               |
| altinn:authentication/systemregister.write | Access to system register | For system vendors that need to manage their systems in the system register |
| altinn:authentication/systemuser.request.write | Create system user requests | For system vendors creating, changing or deleting system user requests |
| altinn:authentication/systemuser.request.read | Read system user requests | For system vendors retrieving the status of their requests |
| altinn:authorization/authorize       | Access to PDP endpoint    | For orgs that need to authorize access                                        |

For a complete overview of which system user API endpoints require which scopes, see [Scopes for the system user API](/en/api/authentication/systemuserapi/scopes/).

## Authentication

A detailed description on how to authenticate your client with a JWT Grant is described [here](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument).

{{% insert "content/shared/maskinporten/maskinporten-authentication-methods.en.md" %}}
