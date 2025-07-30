---
title: Setting up Maskinporten client
linktitle: Maskinporten
description: This page describes the process of setting up a Maskinporten client
toc: false
weight: 3
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
| altinn:authentication/systemregister | Access to system register | For system providers that need to manage systems available in system register |
| altinn:authorization/authorize       | Access to PDP endpoint    | For orgs that need to authorize access                                        |

For a list of legacy scopes, please refer to [the Altinn 2 docs](https://altinn.github.io/docs/api/rest/kom-i-gang/scopes/).

## Authentication
A detailed description on how to authenticate your client with a JWT Grant is described [here](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument).

{{% insert "content/shared/maskinporten/maskinporten-authentication-methods.en.md" %}}
