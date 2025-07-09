---
title: Subscribing
description: How to set up event subscription in an app
toc: false
tags: []
weight: 10
---

## Subscribing to events
In order to receive events in the application you need create a subscription. While you can create a subscription authenticated as a user, most scenarios will probably be to authenticate as the organization owning the application, and to create the subscription as part of the startup process of the application. This example covers authenticating as an organization through Maskinporten.

{{% notice warning %}}
You should first make sure you have a client definition registered in Maskinporten for your application. See [Authenticating with Maskinporten](/api/authentication/maskinporten) on how register a client.<br><br>

Currently the localtest environment does not support generating inbound events for an app. In order to do this you need use tools like Postman or REST Client in VS Code to send a request to the application's event endpoint. 
{{% /notice %}}


## Configuring Maskinporten integration
The application uses the built-in `IMaskinportenClient` to authenticate with Maskinporten and automatically exchange the token to an Altinn token for communicating with Altinn Events.

You need to configure the Maskinporten settings in your _appsettings.json_:

```json
  "MaskinportenSettings": {
    "Authority": "https://test.maskinporten.no/",
    "ClientId": "your-client-id",
    "JwkBase64": "base64-encoded-jwk"
  }
```

If you need to use a different configuration path than the default `MaskinportenSettings`, you can configure it in _Program.cs_:

```csharp
services.ConfigureMaskinportenClient(
    "YourCustomMaskinportenSettingsPath"
);
```

The built-in Maskinporten client will automatically handle token acquisition and exchange for Altinn APIs, including the Events service.

You also need to configure the HTTP client for the Events API in your `RegisterCustomAppServices` method:

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Configure HTTP client for Events API with Maskinporten authorization
    services.AddHttpClient<IEventsSubscription, EventsSubscriptionClient>()
        .UseMaskinportenAltinnAuthorisation("altinn:serviceowner/instances.read");
}
```

### Protecting the event endpoint with a secret
Receiving events in the application is based on exposing a webhook endpoint to which the Event Service posts the event. Upon receiving an event, the application validates if a secret is provided before accepting the event. The secret  is provided by implementing the `IEventSecretCodeProvider` interface. By default there is an example implementation in place using a key from the key vault using a key with the name `EventSubscription--SecretCode` in the key vault the value of that key is used. You should hover not use the same key/value for multiple applications so it's recommended to create your own implementation.

When developing locally you should set the secret as a dotnet user-secret by running the following command in the root folder of the application:

```bash
dotnet user-secrets set "EventSubscription--SecretCode" "your-secret-code"
```

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
If the hosted service fails to run successfully, i.e. throws an exception, the application will fail to start. If you don't want this behaviour you should catch any exception and not rethrow it.
{{% /notice %}}
