Anbefalt oppsett er å legge til scopene {0} trenger i Altinn Studio. Når {0} bygges og publiseres, oppretter Altinn Studio en Maskinporten-klient, lagrer genererte klientdetaljer i {4} secret og monterer innstillingene i {0}.

For å sette dette opp må du:

1. [Sørge for at brukeren din kan administrere Maskinporten-klienter for organisasjonen](#tilgang-til-maskinporten-scopes).
2. [Legge til nødvendige scopes i Altinn Studio](#legg-til-scopes-i-altinn-studio).
3. [Publisere {0} slik at Maskinporten-klienten blir opprettet](#publisering-og-klientdetaljer).
4. [Bruke den innebygde Maskinporten-klienten i {1}](#maskinporten-application-setup).

## Tilgang til Maskinporten-scopes

For å legge til scopes i Altinn Studio må du logge inn på vegne av tjenesteeierorganisasjonen med Ansattporten.

Brukeren din må ha organisasjons-/tjenesteeierrettigheter for tjenesteeieren i Sjølvbetjeningsportalen, inkludert rettighet til å administrere klienter. Hvis du ikke ser noen scopes i Altinn Studio, må du kontakte den som administrerer Maskinporten-tilganger for organisasjonen din, eller Altinn servicedesk.

## Legg til scopes i Altinn Studio

1. Åpne {0} i Altinn Studio.
2. Gå til **Innstillinger** og åpne fanen **Maskinporten**.
3. Logg inn med Ansattporten når du blir bedt om det.
4. Velg **Legg til**.
5. Søk etter og velg scopene {0} trenger.
6. Velg **Fullfør** for å lagre listen med scopes.
{.floating-bullet-numbers}

Endringer i scopes trer i kraft neste gang {0} bygges og publiseres.

## Publisering og klientdetaljer

Når {0} med Maskinporten-scopes publiseres, legger Altinn Studio valgte scopes inn i {3}. Deploy-pipelinen oppretter en `MaskinportenClient`-ressurs for {0}, og Maskinporten-kontrolleren i runtime-clusteret avstemmer ressursen mot Maskinporten.

Kontrolleren oppretter eller oppdaterer Maskinporten-klienten, genererer klientdetaljer og skriver klient-ID og JWKS til {4} secret. Klientdetaljene monteres inn i {0} og lastes av {0} som `MaskinportenSettings`.

Du trenger ikke å opprette Maskinporten-klient manuelt, generere JWKS eller lagre `ClientId`/`JwkBase64` i Azure Key Vault for standard oppsett av {5}. JWKS-en som brukes av den genererte klienten roteres automatisk.

## {6} {#maskinporten-application-setup}
{7} inkluderer automatisk den innebygde `IMaskinportenClient` som kan brukes i tjenestene dine.

### Konfigurasjonsstier
Klienten leter automatisk etter Maskinporten-konfigurasjon på standardstien _"MaskinportenSettings"_. Med scope-oppsettet i Altinn Studio kommer denne konfigurasjonen fra runtime-secret som er montert i {0}.

Hvis du trenger en annen sti for egendefinert eller eldre konfigurasjon, kan du konfigurere dette via `ConfigureMaskinportenClient`-metoden.

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=5" >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  services.ConfigureMaskinportenClient("YourCustomMaskinportenSettingsPath");
}
{{< / highlight >}}

### Autorisere Http-klienter

Typede og navngitte Http-klienter kan autoriseres med de tilgjengelige utvidelsesmetodene, som illustrert nedenfor.

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=6-7 10-11" >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  // For external APIs that require raw Maskinporten tokens
  services.AddHttpClient<CustomClient1>().UseMaskinportenAuthorization("scope1", "scope2");
  services.AddHttpClient("named-client1").UseMaskinportenAuthorization("scope1", "scope2");

  // For Altinn APIs that require Altinn tokens (exchanges Maskinporten token)
  services.AddHttpClient<CustomClient2>().UseMaskinportenAltinnAuthorization("scope1", "scope2");
  services.AddHttpClient("named-client2").UseMaskinportenAltinnAuthorization("scope1", "scope2");
}
{{< / highlight >}}

### Manuell bruk
Hvis du trenger å hente et Maskinporten-token manuelt, kan du bruke `IMaskinportenClient` i tjenesten din og hente tokens med `GetAccessToken`- og `GetAltinnExchangedToken`-metodene.

{{< highlight csharp "linenos=false,hl_lines=5-6" >}}
public class Example(IMaskinportenClient maskinportenClient) : IProcessTaskEnd
{
  public async Task End(string taskId, Instance instance)
  {
    var maskinportenToken = await maskinportenClient.GetAccessToken(["scope1", "scope2"]);
    var altinnExchangedToken = await maskinportenClient.GetAltinnExchangedToken(["scope1", "scope2"]);

    // Do something with the tokens...
  }
}
{{< / highlight >}}
