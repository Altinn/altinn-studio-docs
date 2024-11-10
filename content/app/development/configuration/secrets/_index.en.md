---
title: Secrets
description: How to deal with secrets and sensitive data in an app.
weight: 300
---

## Administration of secrets in Azure

As an application developer you administer the secrets which the application use in the Azure Key Vault.

[Routines for ordering access to your organizations resources are described here](/nb/altinn-studio/guides/access-management/apps/).

## Configure support for secrets in your app

To make secrets accessible within your application the affiliated helm chart has to be updated. 

In your application repository you can find the file `values.yaml` in the folder _deployment_.

Under the section _volumeMounts_ you add the following lines:

```yaml
- name: altinn-appsettings-secret
  mountPath: "/altinn-appsettings-secret"
```

Under the section _volumes_ you add the following lines:

```yaml
- name: altinn-appsettings-secret
    secret:
      secretName: altinn-appsettings-secret
```

{{%notice warning%}}
Be wary of indentations while working in _values.yaml_.
In yaml indents should be spaces and not tabs, tab will cause the file to not be interpreted as a yaml file.
{{% /notice %}}

The last part of the file should look something like this after your changes are complete.

![Step 1](yaml.png)

## How to make use of secrets in your application

The service `ISecret` is exposed to the application and can be dependency injected into the class in which you need to collect a secret.

### Local mock

To run your service locally without connecting to the Azure Key vault you have to 
create the file `secrets.json` under the folder _App_.
In the json structure you can add dummy data for the secrets you need for your service.
If you have uploaded a secret into the key vault with the name "secretId", the content should look like the following:

```json
{
  "secretId": "local secret dummy data"
}
```

### Types of secrets

Secret - Stored as a string directly in the key vault. For ex. a base64 encoded certificate or a token.
Key - key
Certificate - certificate

### Code example

In this section you can find an example of how to use a secret to populate a form field during instantiation.

The logic is implemented within `InstantiationHandler.cs`

```cs
using Altinn.App.Models;
using Altinn.App.Services.Interface;
using Altinn.App.Services.Models.Validation;
using Altinn.Platform.Storage.Interface.Models;
using System.Threading.Tasks;

namespace Altinn.App.AppLogic
{
    public class InstantiationHandler
    {
        private IProfile _profileService;
        private IRegister _registerService;
        private ISecrets _secretsService;

        /// <summary>
        /// Set up access to profile and register services
        /// </summary>
        /// <param name="profileService"></param>
        /// <param name="registerService"></param>
        public InstantiationHandler(IProfile profileService, IRegister registerService, ISecrets secretsService)
        {
            _profileService = profileService;
            _registerService = registerService;
            _secretsService = secretsService;
        }

        /// <summary>
        /// Run events related to instantiation
        /// </summary>
        /// <remarks>
        /// For example custom prefill.
        /// </remarks>
        /// <param name="instance">Instance information</param>
        /// <param name="data">The data object created</param>
        public async Task DataCreation(Instance instance, object data)
        {

            if (data.GetType() == typeof(Skjema))
            {
                Skjema model = (Skjema)data;
                model.etatid = await _secretsService_.GetSecretAsync("secretId");
            }
            await Task.CompletedTask;
        }
    }
}
```

1. The private variable for the service is included in the class

    ```cs
    private ISecrets _secretsService;
    ```

2. The ISecrets service is dependency injected into the class, and the private variable assigned a value

    ```cs
    public InstantiationHandler(IProfile profileService, IRegister registerService, ISecrets secretsService)
            {
                _profileService = profileService;
                _registerService = registerService;
                _secretsService = secretsService;
            }

    ```

3. In the method where you need the secret you call the service
    `secretId` will be the name of our secret in KeyVault, or in our local mock. 

    ```cs
    await _secretsService_.GetSecretAsync("secretId");
    ```

4. If you try to build the solution now, it will fail. 

    ISecrets will be missing where the InstantiationHandler is instantiated. Navigate to `App.cs`
    and dependency inject the service into the constructor in App.

    The service must be added to the call where InstantiationHandler is instantiated as illustrated below.

    ```cs
    public App(
        IAppResources appResourcesService,
        ILogger<App> logger,
        IData dataService,
        IProcess processService,
        IPDF pdfService,
        IProfile profileService,
        IRegister registerService,
        IPrefill prefillService,
        ISecrets secretsService
        ) : base(appResourcesService, logger, dataService, processService, pdfService, prefillService)
    {
        _logger = logger;
        _validationHandler = new ValidationHandler();
        _calculationHandler = new CalculationHandler();
        _instantiationHandler = new InstantiationHandler(profileService, registerService, secretsService);
    }
    ```
