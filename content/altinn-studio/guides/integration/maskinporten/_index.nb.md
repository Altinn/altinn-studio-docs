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

Denne veiledningen viser hvordan du setter opp en Altinn-applikasjon til å bruke den innebygde Maskinporten-klienten (`IMaskinportenClient`) for å utføre autoriserte forespørsler på vegne av eieren av applikasjonen, i stedet for den aktive brukeren.

For å sette dette opp, må følgende gjøres:

1. Sørg for at organisasjonen har tilgang til Azure Key Vault.
2. Opprett integrasjonen mot Maskinporten i [Samarbeidsportalen](https://samarbeid.digdir.no/).
3. Lagre autentiseringsnøkkelen for integrasjonen i Azure Key Vault.
4. Sett opp applikasjonen til å bruke Maskinporten-klienten og hente hemmeligheter fra Azure Key Vault.

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
            "Authority": "https://test.maskinporten.no/",
            "ClientId": "",
            "JwkBase64": ""
       }
   }
   ```
   
   Må hemmelighetene i Azure Key Vault ha navn som dette:
   
   ```
   MaskinportenSettings--Authority
   MaskinportenSettings--ClientId
   MaskinportenSettings--JwkBase64
   ```
2. For at applikasjonen skal kunne lese hemmelighetene fra Azure Key Vault, må konfigureres først.
   Se [seksjoner om hemmeligheter](../../../reference/configuration/secrets) for hvordan dette oppnås.
3. Legg til appsettings-eksempelet ovenfor i `appsettings.{env}.json`-filen.
{.floating-bullet-numbers}

_NB: Hemmelighetene leses av applikasjonen ved oppstart, så
hvis du endrer hemmelighetene etter at applikasjonen er publisert, må du
publisere applikasjonen på nytt før endringene trer i kraft._

## Sett opp applikasjonen til å bruke Maskinporten-integrasjonen

Applikasjonen inkluderer automatisk den innebygde `IMaskinportenClient` som kan injiseres i tjenestene dine. Klienten finner og bruker automatisk `MaskinportenSettings`-konfigurasjonen.

Hvis du trenger å bruke en annen konfigurasjonsbane enn standardbanen, kan du konfigurere den i `RegisterCustomAppServices`-metoden:

{{< highlight csharp "linenos=false,hl_lines=5-7" >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // ...

    services.ConfigureMaskinportenClient(
        "YourCustomMaskinportenSettingsPath"
    );
}
{{< / highlight >}}

For typede HTTP-klienter som trenger Maskinporten-autorisasjon, kan du bruke utvidelsesmetodene:

{{< highlight csharp "linenos=false,hl_lines=5-6,8-9" >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // ...

    // For eksterne API-er som krever rå Maskinporten-tokens
    services.AddHttpClient<YourCustomClient>().UseMaskinportenAuthorisation("scope:1", "scope:2");
    
    // For Altinn API-er som krever Altinn-tokens (veksler Maskinporten-token)
    services.AddHttpClient<YourCustomClient2>().UseMaskinportenAltinnAuthorisation("scope:1", "scope:2");
}
{{< / highlight >}}

Deretter må vi legge til Azure Key Vault som konfigurasjonsleverandør til vår host. Dette gjøres ved å legge til den markerte koden etter `ConfigureWebHostBuilder` metoden:

{{< highlight csharp "linenos=false,hl_lines=4-9" >}}

ConfigureWebHostBuilder(IWebHostBuilder builder);

// Add Azure KV provider for TT02 & Prod environments
if (!builder.Environment.IsDevelopment())
{
    builder.AddAzureKeyVaultAsConfigProvider();
}

{{< / highlight >}}
