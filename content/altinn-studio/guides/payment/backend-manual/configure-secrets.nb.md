---
hidden: true
---

### Legg til config i appSettings.json:

1. [Hent din hemmelige nøkkel fra Nets.](https://developer.nexigroup.com/nexi-checkout/en-EU/docs/access-your-integration-keys/). Pass på at du bruker testnøkkelen under utvikling.
2. Gjør appen din klar for bruk av Azure Key Vault som konfigurasjonkilde, om dette ikke allerede er gjort tidligere. Se [relevant dokumentasjon](/nb/altinn-studio/reference/configuration/secrets/).
3. Legg til din hemmelige nøkkel i Key Vault, med variabelnavnet `NetsPaymentSettings--SecretApiKey`. På denne måten vil den overstyre `SecretApiKey` i `appsettings.json`. 
4. Legg til `NetsPaymentSettings` i din `appsettings.json`.
    ```json
    {
      "NetsPaymentSettings": 
      {
        "SecretApiKey": "In keyvault",
        "BaseUrl": "https://test.api.dibspayment.eu/",
        "TermsUrl": "https://www.yourwebsite.com/terms",
        "ShowOrderSummary": true,
        "ShowMerchantName": true,
        "MerchantHandlesConsumerData": true,
        "PaymentMethodsConfiguration": [
          { "Name": "Visa", "Enabled": true },
          { "Name": "MasterCard", "Enabled": true }
        ]
      }
    }
    ```
    - Husk å sette riktig `baseUrl` i `appsettings.Production.json`. Eksempelet ovenfor inneholder URL til test API-et.
    - Feltet `MerchantHandlesConsumerData` er frivillig, og styrer hvorvidt du skal sende med detaljer om betaler, eller om det skal fylles ut i Nets Easy sin betalingsside.
    - PaymentMethodsConfiguration fungerer likt som beskrevet i Nets sin dokumentasjon [her](https://developer.nexigroup.com/nexi-checkout/en-EU/api/payment-v1/#v1-payments-post-body-paymentmethodsconfiguration-name).
5. Lokal mocking av `SecretApiKey` kan gjøres ved hjelp av [user secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-8.0&tabs=windows).
   ```
   dotnet user-secrets init
   dotnet user-secrets set "NetsPaymentSettings:SecretApiKey" "test-secret-key-used-for-documentation"