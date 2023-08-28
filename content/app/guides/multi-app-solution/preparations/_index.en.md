---
title: Preparations before making a multi-app solution in Altinn
linktitle: Preparations
description: What preparations that should be done before creating a multi-app solution
weight: 10
toc: true
aliases:

- /app/multi-app-solution/preparations/

---

A crucial part of the multi-app solution is to make sure the
applications are able, and allowed, to communicate. This is
essential due to the main concept of this solution - the
instantiation of the receiving application. As a part of the
process of the original form you will have logic that
creates a request to the receiving application that starts a
new instance. This request will go to Altinn Storage in
order to create and persist the instance object, but the
request will have credentials from the private user who
logged in to the original form, thus is not allowed to start
a new instance owned by the organisation that owns the
receiving application. As a way to bypass this obstacle, we
can use a Maskinporten integration to authenticate the
request on behalf of the organisation owning the receiving
application. In order to achieve this we need to;

1. Create the integration
   at [Samarbeidsportalen](https://samarbeid.digdir.no/)
2. Store the keys from the integration in Azure Keyvault for
   the organisation
3. Set up the application to use Azure Keyvault and the
   client to use Maskinporten

// TODO: ASK RUNE WHAT NEEDED TO BE DONE IN THE AUTH PART

## Maskinporten Integration

Before going forward on this step, make sure you have access
to Azure Key Vault for your organization, so the keys
created in the following guide can be added directly into
the secrets in Azure.

If different people in the
organization have access to different resources needed in
this process, please cooperate and do the following steps on
the same machine. This is recommended to avoid sending
secrets between machines.

When access to creating secrets in Azure Key vault is
confirmed, please proceed to create the integration;
navigate to
the [Maskinporten Setup guide](../../../../technology/solutions/cli/configuration/maskinporten-setup)
.

## Key Vault Usage

When the integration is created two secrets have to be
placed in Azure Key vault:

1. The base64 encoded JWT public and private key pair
2. The clientID for the integration

It is important that the name of these secrets corresponds
to the name of the section in the appsettings file in the
application repository. E.g. if your appsettings section for
the Maskinporten integration section looks like this:

```json
{
  "MaskinportenSettings": {
    "Environment": "ver2",
    "ClientId": "",
    "Scope": "altinn:serviceowner/instances.read",
    "EncodedJwk": "",
    "ExhangeToAltinnToken": true,
    "EnableDebugLog": true
  }
}
```

The secrets in Azure keyvault should have names like this:

```
MaskinportenSettings--ClientId
MaskinportenSettings--EncodedJwk
```

_NB: The secrets is read by the application on start up so
if
changing the secrets after the application is deployed, you
will need to redeploy the application._
