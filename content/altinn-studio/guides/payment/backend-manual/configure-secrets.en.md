---
hidden: true
---

### Add config to appsettings.json:

1. [Get your secret key from nets.](https://developer.nexigroup.com/nexi-checkout/en-EU/docs/access-your-integration-keys/). Make sure you use the test key during development.
2. Make your app ready for use of Azure Key Vault as a config provider, if this has not been done before. See relevant [documentation](/altinn-studio/reference/configuration/secrets/).
3. Add your secret key to keyvault, with the variable name: `NetsPaymentSettings--SecretApiKey`. This way it will override `SecretApiKey` in `appsettings.json`.
4. Add `NetsPaymentSettings` to your `appsettings.json`. Remember to set the correct `baseUrl` in production.
    ```json
    {
      "NetsPaymentSettings": {
        "SecretApiKey": "In keyvault",
        "BaseUrl": "https://test.api.dibspayment.eu/",
        "TermsUrl": "https://www.yourwebsite.com/terms",
        "ShowOrderSummary": true,
        "ShowMerchantName": true
      }
    }
    ```
5. Local mocking of `SecretApiKey` can be done with the use of [user secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-8.0&tabs=windows).
   ```
   dotnet user-secrets init
   dotnet user-secrets set "NetsPaymentSettings:SecretApiKey" "test-secret-key-used-for-documentation"