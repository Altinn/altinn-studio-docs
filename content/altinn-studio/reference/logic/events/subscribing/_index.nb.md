---
title: Abonnement
description: Hvordan sette opp hendelses-abonnement i en app
toc: false
weight: 10
---

## Abonnere på hendelser
For å motta hendelser i applikasjonen må du opprette et abonnement. Selv om du kan opprette et abonnement autentisert som innlogget bruker, vil de fleste scenarioer sannsynligvis være å autentisere som tjenesteeier for applikasjonen, og å opprette abonnementet som del av oppstartsprosessen til applikasjonen. Dette eksempelet dekker autentisering som tjenesteeier gjennom Maskinporten.

{{% notice warning %}}
Du bør først sørge for at du har en klientdefinisjon registrert i Maskinporten for applikasjonen din. Se [Autentisering med Maskinporten](/nb/api/authentication/maskinporten) for hvordan du registrerer en klient.<br><br>

For øyeblikket støtter ikke lokaltest-miljøet generering av innkommende hendelser for en app. For å gjøre dette må du bruke verktøy som Postman eller REST Client i VS Code for å sende en forespørsel til applikasjonens hendelsesendepunkt.
{{% /notice %}}


## Konfigurering av Maskinporten-integrasjon
Applikasjonen bruker den innebygde `IMaskinportenClient` for å autentisere med Maskinporten og automatisk utveksle tokenet til et Altinn-token for kommunikasjon med Altinn Events.

Du må konfigurere Maskinporten-innstillingene i din _appsettings.json_:

```json
  "MaskinportenSettings": {
    "Authority": "https://test.maskinporten.no/",
    "ClientId": "your-client-id",
    "JwkBase64": "base64-encoded-jwk"
  }
```

Hvis du trenger å bruke en annen konfigurasjonsbane enn standard `MaskinportenSettings`, kan du konfigurere det i _Program.cs_:

```csharp
services.ConfigureMaskinportenClient(
    "YourCustomMaskinportenSettingsPath"
);
```

Den innebygde Maskinporten-klienten vil automatisk håndtere tokeninnhenting og utveksling for Altinn-API-er, inkludert Events-tjenesten.

Du må også konfigurere HTTP-klienten for Events API i din `RegisterCustomAppServices`-metode:

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Configure HTTP client for Events API with Maskinporten authorization
    services.AddHttpClient<IEventsSubscription, EventsSubscriptionClient>()
        .UseMaskinportenAltinnAuthorisation("altinn:serviceowner/instances.read");
}
```

### Beskytte hendelsesendepunktet med en hemmelighet
Mottak av hendelser i applikasjonen er basert på å eksponere et webhook-endepunkt som Event Service sender hendelsen til. Ved mottak av en hendelse validerer applikasjonen om en hemmelighet er oppgitt før hendelsen aksepteres. Hemmeligheten oppgis ved å implementere `IEventSecretCodeProvider`-grensesnittet. Som standard finnes det en eksempelimplementasjon som bruker en nøkkel fra key vault med navnet `EventSubscription--SecretCode` i Azure KeyVault - verdien av denne nøkkelen brukes. Du bør imidlertid ikke bruke samme nøkkel/verdi for flere applikasjoner, så det anbefales å lage din egen implementasjon.

Når du utvikler lokalt kan du sette hemmeligheten som en dotnet user-secret ved å kjøre følgende kommando i rotmappen til applikasjonen:

```bash
dotnet user-secrets set "EventSubscription--SecretCode" "your-secret-code"
```

{{% notice info %}}
Merk at retur-URL-en og hemmelighetskoden er del av abonnementdefinisjonen. Dette betyr at hvis du roterer nøkkelen, bør du fjerne det eksisterende abonnementet først, ellers vil du ha to aktive abonnementer for samme hendelser.
{{% /notice %}}

### Opprette abonnement
Når du har klienten registrert med Maskinporten, konfigurasjonen satt opp, ClientDefinition på plass og webhook-hemmeligheten definert - er du klar til å legge til koden som kreves for å opprette et abonnement.

Eksemplet nedenfor bruker `IHostedService` fra Microsoft som, i dette tilfellet, kjører én gang etter at tjenestene er registrert i containeren, men før applikasjonen konfigureres.

```csharp
using Altinn.App.Core.Infrastructure.Clients.Events;
using Altinn.App.Core.Internal.Events;
using Altinn.App.Core.Models;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Altinn.App.Core.EFormidling
{
    /// <summary>
    /// Hosted service to set up perquisites for Eformidling integration.
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
Hvis hosted service feiler i å kjøre, dvs. kaster en exception, vil hele applikasjonen feile på oppstart. Hvis du ikke ønsker denne oppførselen bør du fange opp eventuelle exceptions og ikke kaste dem videre.
{{% /notice %}}
