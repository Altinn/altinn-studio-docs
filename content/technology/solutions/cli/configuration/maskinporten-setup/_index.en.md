---
title: Setting up Maskinporten client
linktitle: Maskinporten
description: This page describes the process of setting up a Maskinporten client
---

## Setting up the Maskinporten Client
{{% insert "content/shared/maskinporten/maskinporten-client-create.en.md" %}}

## Required scopes
The client you just created requires the following scopes:
- `altinn:serviceowner`
- `altinn:serviceowner/instances.read`
- `altinn:serviceowner/instances.write`

## Using the Maskinporten client in the CLI
In order to make use of your Maskinporten client, you need to add the JWK key pair from _step 6_ to the Altinn CLI configuration:

Locate your [Maskinporten configuration in the appsettings.json file]({{< relref "/technology/solutions/cli/configuration/#maskinporten-settings" >}}) and add a base64 representation
of your key in the `EncodedJwk` field. 

If you used the [Altinn JWKS tool](https://github.com/Altinn/altinn-authorization-utils/tree/main/src/Altinn.Cli)
to generate your keys, you can make use of the `export` function with the `--base64` flag to achieve this. Otherwise you can
use any other base64 encoder tool, such as https://www.base64encode.org/.