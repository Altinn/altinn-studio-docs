<!-- Maskinporten automation notice -->
{{<notice info>}}
**Maskinporten-automatisering i Altinn Studio**

- Apper som bruker Altinn App v8.3 eller nyere kan aktivere standardscopene for tjenesteeier, `altinn:serviceowner/instances.read` og `altinn:serviceowner/instances.write`, fra Altinn Studio. Bruk knappen i Maskinporten-fanen eller legg til scopene fra scope-visningen i appinnstillingene.
- Apper som bruker Altinn App v9 krever disse tjenesteeier-scopene. Altinn Studio legger dem automatisk til hvis de mangler.
- Nye apper som opprettes i Altinn Studio får disse standardscopene for tjenesteeier automatisk.
- Appen må også autorisere tjenesteeier i [`App/config/authorization/policy.xml`](/nb/altinn-studio/v8/reference/configuration/authorization/). Nye apper har denne regelen i appmalen. For eksisterende apper må du legge til eller oppdatere `[org]`-regelen slik at den gir `read` og `write`.
{{</notice>}}

Anbefalt oppsett er å legge til scopene appen trenger i Altinn Studio. Når appen bygges og publiseres, kan den innebygde Maskinporten-klienten i appen bruke de valgte scopene.

For å sette dette opp må du:

1. [Sørge for at brukeren din kan legge til Maskinporten-scopes for organisasjonen](#tilgang-til-maskinporten-scopes).
2. [Legge til nødvendige scopes i Altinn Studio](#legg-til-scopes-i-altinn-studio).
3. [Publisere appen slik at valgte scopes blir tilgjengelige for appen](#publisering-og-klientdetaljer).
4. [Bruke den innebygde Maskinporten-klienten i appkoden](#maskinporten-application-setup).

## Tilgang til Maskinporten-scopes

Altinn Studio bruker den innloggede Ansattporten-tilgangen din til å finne Maskinporten-scopene du kan legge til for tjenesteeierorganisasjonen.

Hvis du ikke ser noen scopes i Altinn Studio, kan brukeren din mangle tilgang til å administrere klienter for organisasjonen. Kontakt den som administrerer Maskinporten-tilganger for organisasjonen din, eller Altinn servicedesk.

## Legg til scopes i Altinn Studio

1. Åpne appen i Altinn Studio.
2. Gå til **Innstillinger** og åpne fanen **Maskinporten**.
3. Velg **Legg til**.
4. Søk etter og velg scopene appen trenger.
5. Velg **Fullfør** for å lagre listen med scopes.
{.floating-bullet-numbers}

Endringer i scopes trer i kraft neste gang appen bygges og publiseres.

## Publisering og klientdetaljer

Når en app med Maskinporten-scopes publiseres, legger Altinn Studio valgte scopes inn i appbygget. Etter publisering kan appen bruke den innebygde Maskinporten-klienten med scopene som er valgt i Altinn Studio.

Du trenger ikke å håndtere klientdetaljer, JWKS-generering, rotasjon eller appkonfigurasjon selv for standard oppsett av apper.

## Appoppsett {#maskinporten-application-setup}
Appen inkluderer automatisk den innebygde `IMaskinportenClient` som kan brukes i tjenestene dine.

### Konfigurasjonsstier
Klienten leter automatisk etter Maskinporten-konfigurasjon på standardstien _"MaskinportenSettings"_. Med scope-oppsettet i Altinn Studio er denne konfigurasjonen tilgjengelig for appen etter publisering.

Bruk standardstien når scopes er valgt i Altinn Studio. Egendefinerte konfigurasjonsseksjoner fylles ikke ut av scope-oppsettet i Altinn Studio, og bør bare brukes med manuelt eller eldre oppsett.

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
