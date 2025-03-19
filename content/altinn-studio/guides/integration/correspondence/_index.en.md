---
title: Integrate an Altinn app with Correspondence
linktitle: Correspondence
description: How to setup an integration between an Altinn App and Correspondence.
weight: 100
toc: true
---

This guide details how to integrate the [correspondence messaging service](/correspondence/) with an Altinn application.
This integration enables an app to securely send digital messages and attachments to both organisations and individuals.

## Prerequisites
1. An applicable [Altinn resource](#altinn-resource)
2. [Altinn.App.Api](https://www.nuget.org/packages/Altinn.App.Api) and [Altinn.App.Core](https://www.nuget.org/packages/Altinn.App.Core) _v8.5.0_ or greater

### Altinn Resource
When sending a correspondence, it needs to be tied to an Altinn resource. This resource controls the access policy for
the Correspondence, which is evaluated for both senders and receivers.

Please refer to the [resource registration guide](/correspondence/getting-started/#register-a-resource-in-altinn-resource-registry)
for more information on the setup process.

{{<notice info notice-paragraph-fix>}}
The resource needs to allow sender access for [your organisation](https://github.com/Altinn/altinn-cdn/blob/master/orgs/altinn-orgs.json)
and recipient access for the appropriate [role codes](https://github.com/Altinn/altinn-cdn/blob/master/authorization/subjectoptions.json).

Note that for messages sent to a person, the code `priv` should be used. For messages sent to an organisation, whichever roles
best describing your indented recipient should be used.
{{</notice>}}

## Implementation and usage
In order to use the correspondence service, the request must be authorised with an appropriate bearer token and a subscription key.

Please refer to the sections below for a detailed guide on how to achieve this:

- [Sending correspondence using Maskinporten](maskinporten)