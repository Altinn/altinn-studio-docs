---
draft: true
title: Integrate an Altinn app with Maskinporten
linktitle: Maskinporten
description: How to set up an integration between an Altinn app and Maskinporten.
tags: [needsReview]
toc: true
---

This guide shows how to set up an Altinn app to use the built-in Maskinporten client (`IMaskinportenClient`) for authorized requests on behalf of the app owner, as opposed to the active user.

{{% insert "content/shared/maskinporten/altinn-studio-scope-setup.en.md" %}}

## Legacy manual setup

The following manual setup is only needed for legacy apps or special cases where Altinn Studio should not provision the Maskinporten client.

{{% expandlarge id="legacy-manual-maskinporten-setup" header="Show manual setup with Samarbeidsportalen and Azure Key Vault" %}}

### Azure Key Vault access

Before proceeding with the manual setup, make sure you have access to Azure Key Vault for your organization. This ensures that the keys created further on in the guide can be stored properly as secrets in Azure.

If access is missing, please refer to [Access to logs and secrets](/en/altinn-studio/v10/manage-a-service/access-management/apps/).

### Maskinporten integration

When access to creating secrets in Azure Key Vault is confirmed, create the integration manually.

{{% expandlarge id="guide-mp-int-samarbeid" header="Guide on how to register a new Maskinporten integration in Samarbeidsportalen" %}}
{{% insert "content/shared/maskinporten/maskinporten-client-create.en.md" %}}
{{% /expandlarge %}}

### Azure Key Vault configuration

When preparing the application to use secrets from Azure Key Vault, add the client ID and base64 encoded JWT public and private key pair as Azure Key Vault secrets that map to the `MaskinportenSettings` configuration section.

{{< code-title >}}
App/appsettings.json
{{< /code-title >}}

```json
{
  "MaskinportenSettings": {
    "Authority": "https://test.maskinporten.no/",
    "ClientId": "",
    "JwkBase64": ""
  }
}
```

The secrets in Azure Key Vault should have names like this:

```text
MaskinportenSettings--Authority
MaskinportenSettings--ClientId
MaskinportenSettings--JwkBase64
```

For the app to read the secrets from Azure Key Vault, it needs to be configured to do so. See the [secrets section](/en/altinn-studio/v8/reference/configuration/secrets/) to achieve this.

{{% /expandlarge %}}
