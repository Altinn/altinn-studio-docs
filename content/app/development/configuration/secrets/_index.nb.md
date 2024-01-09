---
title: Secrets
description: How to deal with secrets and sensitive data in an app.
weight: 300
tags: [translate-to-english]
---

## Administrasjon av hemmeligheter i Azure

Som applikasjonsutvikler administrerer man selv hemmelighetene som applikasjonen benytter i Azure Key Vault.

[Rutiner for bestilling av tilgang til din organisasjons ressurser er beskrevet her](/app/guides/access-management/apps/).

## Konfigurer støtte for hemmeligheter i din app

For å tilgjengeliggjøre hemmeligheter i applikasjonen må det gjøres oppdateringer i helm charten tilknyttet applikasjonen.

I applikasjonsrepoet ditt finner du filen `values.yaml` i mappen _deployment_.

Under seksjonen _volumeMounts_ legger du til følgende linjer:

```yaml
- name: altinn-appsettings-secret
  mountPath: "/altinn-appsettings-secret"
```

Under seksjonen _volumes_ legger du til følgende linjer:

```yaml
- name: altinn-appsettings-secret
    secret:
      secretName: altinn-appsettings-secret
```

{{%notice warning%}}
Vær påpasselig med innrykk når du jobber i _values.yaml_.
I yaml skal indents være mellomrom og ikke tab, benytter du tab vil ikke din yaml være gyldig.
{{% /notice %}}

Siste del av filen skal se omtrent slik ut når du har gjort ferdig alle endringer.

![Steg 1](yaml.png)

## Hvordan benytte hemmeligheter i applikasjonen

Servicen `ISecret` er eksponert i applikasjonen og kan dependency injectes
i den klassen der du har behov for å hente ut en hemmelighet.

### Lokal mock

For å kunne kjøre tjenesten din lokalt uten å koble seg til Azure Key vault
må man opprette filen `secrets.json` under mappen _App_.
I Json strukturen kan man legge inn dummydata for hemmelighetene man har behov for.
Har man lastet opp en hemmelighet i Key Vault med navnet "secretId" vil innholdet i json-filen se slik ut

```json
{
  "secretId": "local cecret dummy data"
}
```

### Type hemmeligheter

Secret - lagres som en streng direkte i keyvault. F.eks et sertifikat som er base64 encoded eller et token.
Key - Nøkkel
Certificate - et sertifikat

### Kodeeksempel

I denne seksjonen finner du et eksempel på hvordan man benytter en hemmelighet
til å populere et skjemafelt under instansiering.

Logikken er implementert i `InstantiationHandler.cs`

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

1. Den private variabelen for servicen inkluderes i klassen

    ```cs
    private ISecrets _secretsService;
    ```

2. ISecrets servicen dependency injectes inn i klassen. Og den private variabelen blir assignet en verdi.

    ```cs
    public InstantiationHandler(IProfile profileService, IRegister registerService, ISecrets secretsService)
            {
                _profileService = profileService;
                _registerService = registerService;
                _secretsService = secretsService;
            }

    ```

3. I metoden der man har behov for hemmeligheten kaller man på servicen.
    `secretId` vil være navnet på hemmeligheten i KeyVault evt. i lokal mock.

    ```cs
    await _secretsService_.GetSecretAsync("secretId");
    ```

4. Dersom du prøver å bygge løsningen nå vil det feile.

    ISecrets vil mangle der InstantiationHandler instansieres. Naviger til `App.cs`
    og dependency inject servicen inn i konstruktøren til App.

    Videre må tjenesten legges til i kallet der InstantiationHandler instansieres som vist nedenfor.

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