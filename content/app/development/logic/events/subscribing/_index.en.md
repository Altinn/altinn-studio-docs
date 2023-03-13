---
title: Subscribing
description: How to set up event subscription in an app
toc: false
tags: []
weight: 10
---

## Subscribing to events
In order to receive events in the application you need create a subscription. While you can create a subscription authenticated as a user, most scenarios will probably be to authenticate as the organization owning the application, and to create the subscription as part of the startup process of the application. This example covers authenticating as an organization through maskinporten.

{{% notice warning %}}
You should first make sure you have a client definition registered in Maskinporten for your application. See [Authenticating with Maskinporten](/api/authentication/maskinporten) on how register a client.
{{% /notice %}}


## Configuring Maskinporten integration
Even though we are authenticating through maskinporten, we can't use the received token directly since Altinn Events only supports an Altinn token. To solve this we need to exchange the Maskinporten token into an Altinn token. The example below adds a message handler to the EventsSubscriptionClient used to communicate with Maskinporten. This handler automatically requests a token from Maskinporten, exchanges it to an Altinn token and adds the token to the request to the Event System when creating a subscription.

This code should be added to _Program.cs_.

```csharp
services.AddMaskinportenHttpClient<MaskinportenClientDefinition, EventsSubscriptionClient>(
    config.GetSection("MaskinportenSettings"), clientDefinition =>
    {
        clientDefinition.ClientSettings.Scope = "altinn:serviceowner/instances.read";
        clientDefinition.ClientSettings.ExhangeToAltinnToken = true;
    }).AddTypedClient<IEventsSubscription, EventsSubscriptionClient>();
```

Scope and ExchangeToAltinnToken need to be configured in code and not in _AppSettings.json_ if you have multiple external dependencies that requires the use of Maskinporten. This is to avoid scopes belonging to one external api being sent to another api. Some api's accept this while others will reject the request due to unknown scopes. It's also best practice not to leak unnecessary scopes to other api's that don't require it to avoid token misuse.

{{% notice info %}}
The `MaskinportenClientDefinition` in the example above is a custom implementation of `IClientDefinition` from the nuget package [Altinn.ApiClients.Maskinporten](https://github.com/Altinn/altinn-apiclient-maskinporten) which is included as a part of the `Altinn.App.Core` package. If you don't need a custom implementation you can use one of the [built in client definitions](https://github.com/Altinn/altinn-apiclient-maskinporten).
{{% /notice %}}

Depending on what type of ClientDefintion you use you typically need to specify either a certificate file and password, encoded jwk, encoded x509 certificate or enterprise username/password in order to authenticate with Maskinporten in addition to the environment and client id. These can be shared between the various integrations.

```json
  "MaskinportenSettings": {
    "Environment": "ver2",
    "ClientId": "",
    "CertificatePkcs12Path": "",
    "CertificatePkcs12Password": ""
  }
```

Here is a [C# class of the settings available](https://github.com/Altinn/altinn-apiclient-maskinporten/blob/main/src/Altinn.ApiClients.Maskinporten/Config/MaskinportenSettings.cs) for reference.

### Protecting the event endpoint with a secret
Receving events in the application is based on exposing a webhook endpoint to which the Event Service posts the event. Upon receiving an event, the application validates if a secret is provided before accepting the event. The secret  is provided by implementing the `IEventSecretCodeProvider` interface. By default there is an example implementation in place using a key from the key vault using a key with the name `EventSubscription--SecretCode` in the key vault the value of that key is used. You should hover not use the same key/value for multiple applications so it's recomended to create your own implementation.

{{% notice info %}}
Note that the return url and the secret code is part of the subscription definition. This means that if you rotate the key, you should remove the existing subscription first, or else you will have two active subscriptions for the same events.
{{% /notice %}}

### Create subscription
Once you have your client registered with Maskinporten, your config setup, your ClientDefinition in place and your webhook secret defined - you are ready to add the code required to make a subscription.

The example below is using the `IHostedService` from Microsoft which, in this case, run once after the services are registered in the container, but before the application is configured.

```csharp
using Altinn.App.Core.Infrastructure.Clients.Events;
using Altinn.App.Core.Internal.Events;
using Altinn.App.Core.Models;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Altinn.App.Core.EFormidling
{
    /// <summary>
    /// Hosted service to set up prequisites for Eformidling integration.
    /// </summary>
    public class EformidlingStartup : IHostedService
    {
        private readonly AppIdentifier _appIdentifier;
        private readonly IEventsSubscription _eventsSubscriptionClient;
        private readonly ILogger<EformidlingStartup> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="EformidlingStartup"/> class.
        /// </summary>
        public EformidlingStartup(AppIdentifier appId, IEventsSubscription eventsSubscriptionClient, ILogger<EformidlingStartup> logger)
        {
            _appIdentifier = appId;
            _eventsSubscriptionClient = eventsSubscriptionClient;
            _logger = logger;
        }

        ///<inheritDoc/>
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            var eventType = "app.eformidling.reminder.checkinstancestatus";
            try
            {
                Subscription subscription = await _eventsSubscriptionClient.AddSubscription(_appIdentifier.Org, _appIdentifier.App, eventType);

                _logger.LogInformation("Successfully subscribed to event {eventType} for app {appIdentifier}. Subscription {subscriptionId} is being used.", eventType, _appIdentifier, subscription.Id);
            }

            catch (Exception ex)
            {
                _logger.LogError("Unable to subscribe to event {eventType} for app {appIdentifier}. Received exception {exceptionMessage} with {stackTrace}", eventType, _appIdentifier, ex.Message, ex.StackTrace);
                throw;
            }
        }

        /// <inheritdoc/>
        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}

```
{{% notice theme="warning"  %}}
If the hosted service fail to run succesfully, ie. throws an exception, the application will fail to start. If you don't won't this behavior you shold catch any exception and don't rethrow it.
{{% /notice %}}
