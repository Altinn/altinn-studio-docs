---
title: Integrasjon av Altinn-app med Maskinporten
linktitle: Maskinporten
description: Hvordan sette opp en integrasjon mellom en Altinn-app og Maskinporten.
weight: 100
toc: true
aliases:
- /app/maskinporten-app-integration/
- /altinn-studio/guides/integration/maskinporten-app-integration
---

Denne veiledningen viser hvordan du setter opp en Altinn-applikasjon med en HTTP-klient som benytter Maskinporten for
autentisering av forespørslene. Dette er nyttig når applikasjonen må utføre autoriserte forespørsler på vegne av eieren
av applikasjonen, i stedet for den aktive brukeren.

For å sette dette opp, må følgende gjøres:

1. Sørg for at organisasjonen har tilgang til Azure Key Vault.
2. Opprett integrasjonen mot Maskinporten i [Samarbeidsportalen](https://samarbeid.digdir.no/).
3. Lagre autentiseringsnøkkelen for integrasjonen i Azure Key Vault.
4. Konfigurer applikasjonen til å bruke Maskinporten-klienten og hente hemmeligheter fra Azure Key Vault.

## Tilgang til Azure Key Vault

Før du går videre med denne veiledningen, må du forsikre deg om at du har tilgang til Azure Key Vault for organisasjonen din.
Dette sikrer at nøklene som opprettes senere i veiledningen kan lagres riktig som hemmeligheter i Azure.

Hvis tilgang mangler, se [Tilgang til logger og hemmeligheter](/nb/altinn-studio/guides/administration/access-management/apps).

## Maskinporten-integrasjon

I denne delen skal vi sette opp Maskinporten-klienten. En del av oppsettet inkluderer opprettelse av nøkler som senere
skal lagres i Azure Key Vault. Hvis ulike personer i organisasjonen har tilgang til forskjellige ressurser som trengs i
denne prosessen, anbefales det å samarbeide og utføre disse trinnene på samme maskin. Dette er for å unngå å sende
hemmeligheter mellom maskiner.

Når tilgang til å opprette hemmeligheter i Azure Key Vault er bekreftet, kan du fortsette med å opprette integrasjonen.

{{% expandlarge id="guide-mp-int-samarbeid" header="Veiledning om hvordan du registrerer en ny Maskinporten-integrasjon i Samarbeidsportalen" %}}

{{% insert "/content/altinn-studio/guides/shared/maskinporten-integration/maskinporten-integration-samarbeidsportal.md" %}}

{{% /expandlarge %}}

## Konfigurasjon av Azure Key Vault

Når applikasjonen forberedes til å bruke hemmeligheter fra Azure Key Vault, må følgende trinn utføres:

1. Legg til hemmelighetene som ble hentet under konfigurasjon av Maskinporten-klienten, i Azure Key Vault:
    - Base64-kodet JWT offentlig og privat nøkkelpar
    - Klient-ID for integrasjonen

   Det er viktig at navnet på disse hemmelighetene i Azure Key Vault tilsvarer navnet på seksjonen i appsettings-filen i
   kodebasen til applikasjonen.

   For eksempel, hvis seksjonen for Maskinporten-integrasjonen ser slik ut:
   ```json
   {
     "MaskinportenSettings": {
       "Environment": "test",
       "ClientId": "",
       "Scope": "altinn:serviceowner/instances.read",
       "EncodedJwk": "",
       "ExhangeToAltinnToken": true,
       "EnableDebugLog": true
     }
   }
   ```

   Må hemmelighetene i Azure Key Vault ha navn som dette:

   ```
   MaskinportenSettings--ClientId
   MaskinportenSettings--EncodedJwk
   ```
2. For at applikasjonen skal kunne lese hemmelighetene fra Azure Key Vault, må konfigureres først.
   Se [seksjoner om hemmeligheter](../../../reference/configuration/secrets) for hvordan dette oppnås.
3. Legg til appsettings-eksempelet ovenfor i `appsettings.{env}.json`-filen.
{.floating-bullet-numbers}

_NB: Hemmelighetene leses av applikasjonen ved oppstart, så
hvis du endrer hemmelighetene etter at applikasjonen er publisert, må du
publisere applikasjonen på nytt før endringene trer i kraft._

## Sett opp applikasjonen til å bruke Maskinporten-integrasjonen

Når applikasjonen skal tilpasses for å bruke Maskinporten-integrasjonen, må vi gjøre noen endringer i `Program.cs`-filen.

Først må vi legge til MaskinportenHttpClient-tjenesten med riktig konfigurasjon i metoden `RegisterCustomAppServices`:

{{< highlight csharp "linenos=false,hl_lines=5" >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // ...

    services.AddMaskinportenHttpClient<SettingsJwkClientDefinition, YourCustomClient>(config.GetSection("MaskinportenSettings"));
}
{{< / highlight >}}

Deretter må vi legge til Azure Key Vault som konfigurasjonsleverandør til vår host. Dette gjøres ved å endre metoden `ConfigureWebHostBuilder`:

{{< highlight csharp "linenos=false,hl_lines=5-9" >}}
void ConfigureWebHostBuilder(IWebHostBuilder builder)
{
    builder.ConfigureAppWebHost(args);

    // Add Azure KV provider for TT02 & Prod environments
    if (!builder.Environment.IsDevelopment())
    {
        builder.AddAzureKeyVaultAsConfigProvider();
    }
}
{{< / highlight >}}
