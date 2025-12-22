---
headless: true
hidden: true
---

1. Add the secrets retrieved during the Maskinporten client configuration to Azure Key Vault:
   - The base64 encoded JWT public and private key pair
   - The client ID for the integration

   It is important that the name of these secrets in Azure Key Vault corresponds with the name of the section in the 
   appsettings file in the application repository.
   E.g. if your appsettings section for the Maskinporten integration section looks like this:

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

   ```
   MaskinportenSettings--Authority
   MaskinportenSettings--ClientId
   MaskinportenSettings--JwkBase64
   ```
   
2. For the application to be able to read the secrets from Azure Key Vault, it needs to be configured to do so.
   See the [secrets section](/en/altinn-studio/v8/reference/configuration/secrets/) to achieve this.
3. Add the appsettings section example from above into the `appsettings.{env}.json` file.
{.floating-bullet-numbers}

_Note: The secrets are read by the application on launch so
if you make changes after the application is deployed, you
will need to redeploy the application for them to come into effect._
