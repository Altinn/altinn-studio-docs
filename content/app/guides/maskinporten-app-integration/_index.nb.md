---
title: Integrasjon av Altinn-app med Maskinporten
linktitle: Maskinporten-App-integrasjon
description: Hvordan sette opp en integrasjon mellom en Altinn-app og Maskinporten.
weight: 100
toc: true
aliases:

- /app/maskinporten-app-integration/

---

Dette er en guide om hvordan du setter opp en Altinn-applikasjon for å opprette en klient som bruker en
Maskinporten-integrasjon for
sine forespørsler. Dette er relevant når applikasjonen skal utføre forespørsler som må
autentiseres på vegne av organisasjonen som eier applikasjonen, og ikke sluttbrukeren som eier instansen. Av naturen,
vil disse forespørslene ha legitimasjon fra den private brukeren som logget på applikasjonen og opprettet den nye
instansen. For å sende disse forespørslene på vegne av organisasjonen, må følgende gjøres;

1. Forsikre deg om at organisasjonen har tilgang til Azure Key Vault.
2. Opprett integrasjonen til Maskinporten
   på [Samarbeidsportalen](https://samarbeid.digdir.no/).
3. Lagre nøklene fra integrasjonen i Azure Key Vault for
   organisasjonen.
4. Sett opp applikasjonen til å bruke Maskinporten-klienten ved å hente hemmelighetene/nøklene fra Azure Key Vault.

## Tilgang til Azure Key Vault

Før du går videre i denne guiden, må du sørge for at du har tilgang
til Azure Key Vault for organisasjonen din, slik at nøklene
som opprettes senere i guiden, kan legges direkte inn i
hemmelighetene i Azure.

Hvis tilgang mangler, se [Tilgang til logger og hemmeligheter](/nb/altinn-studio/guides/administration/access-management/apps).

## Maskinporten-integrasjon

I denne delen blir Maskinporten-klienten satt opp. En del av oppsettet av klienten inkluderer opprettelse av nøkler som
skal lagres i Azure Key Vault senere i guiden. Hvis ulike personer i organisasjonen har tilgang til
forskjellige ressurser som trengs i denne prosessen, samarbeid og gjør de følgende trinnene på samme maskin. Dette er
anbefalt for å unngå å sende hemmeligheter mellom maskiner.

Når tilgang til å opprette hemmeligheter i Azure Key Vault er bekreftet, kan du fortsette med å opprette integrasjonen.

{{% expandlarge id="guide-mp-int-samarbeid" header="Guide om hvordan du registrerer en ny Maskinporten-integrasjon i Samarbeidsportalen" %}}

{{% insert "content/app/guides/shared/maskinporten-integration/maskinporten-integration-samarbeidsportal.md" %}}

{{% /expandlarge %}}

## Konfigurasjon av Azure Key Vault

Når applikasjonen forberedes på å bruke hemmelighetene fra Azure Key Vault, er det noen trinn som må gjøres:

1. Legg til hemmelighetene hentet under konfigurasjonen av Maskinporten-klienten i Azure Key Vault:
    - Base64-kodet JWT offentlig og privat nøkkelpar
    - Klient-ID for integrasjonen

   Det er viktig at navnet på disse hemmelighetene i Azure Key Vault samsvarer
   med navnet på seksjonen i appsettings-filen i
   applikasjonsrepositoryet. For eksempel, hvis appsettings-seksjonen for
   Maskinporten-integrasjonen ser slik ut:

   ```json
   {
     "MaskinportenSettings": {
       "Environment": "ver2",
       "ClientId": "",
       "Scope": "altinn:serviceowner/instances.read",
       "EncodedJwk": "",
       "ExhangeToAltinnToken": true,
       "EnableDebugLog": true
     }
   }
   ```

   Hemmelighetene i Azure Key Vault burde ha navn som dette:

   ```
   MaskinportenSettings--ClientId
   MaskinportenSettings--EncodedJwk
   ```

2. For at applikasjonen skal kunne lese hemmelighetene fra
   Azure Key Vault, må applikasjonen konfigureres til
   å gjøre dette. Se
   [seksjoner om hemmeligheter](../../development/configuration/secrets)
   for å oppnå dette.
3. Legg til eksempel på appsettings-seksjonen
   ovenfor i `appsettings.{env}.json`-filen.

_NB: Hemmelighetene leses av applikasjonen ved oppstart, så
hvis du endrer hemmelighetene etter at applikasjonen er publisert, må du
deploye applikasjonen på nytt._

## Sett opp applikasjonen til å bruke Maskinporten-integrasjonen

Når du endrer applikasjonen for å bruke Maskinporten-integrasjonen, må vi tilpasse filen `program.cs`.

For det første må vi legge til tjenesten MaskinportenHttpClient
med riktig konfigurasjon i funksjonen `RegisterCustomAppServices`:

```csharp
services.AddMaskinportenHttpClient<SettingsJwkClientDefinition, AppClient>(config.GetSection("MaskinportenSettings"));
```

Deretter må vi legge til følgende funksjon `ConnectToKeyVault` nederst i filen:

```csharp
static void ConnectToKeyVault(IConfigurationBuilder config)
{
    IConfiguration stageOneConfig = config.Build();
    KeyVaultSettings keyVaultSettings = new KeyVaultSettings();
    stageOneConfig.GetSection("kvSetting").Bind(keyVaultSettings);
    if (!string.IsNullOrEmpty(keyVaultSettings.ClientId) &&
        !string.IsNullOrEmpty(keyVaultSettings.TenantId) &&
        !string.IsNullOrEmpty(keyVaultSettings.ClientSecret) &&
        !string.IsNullOrEmpty(keyVaultSettings.SecretUri))
    {
        string connectionString = $"RunAs=App;AppId={keyVaultSettings.ClientId};" +
                                  $"TenantId={keyVaultSettings.TenantId};" +
                                  $"AppKey={keyVaultSettings.ClientSecret}";
        AzureServiceTokenProvider azureServiceTokenProvider = new AzureServiceTokenProvider(connectionString);
        KeyVaultClient keyVaultClient = new KeyVaultClient(
            new KeyVaultClient.AuthenticationCallback(
                azureServiceTokenProvider.KeyVaultTokenCallback));
        config.AddAzureKeyVault(
            keyVaultSettings.SecretUri, keyVaultClient, new DefaultKeyVaultSecretManager());
    }
}
```

Til slutt må denne funksjonen deretter kalles i
funksjonen `ConfigureWebHostBuilder`. Funksjonen finnes allerede,
så bare endre innholdet til følgende:

```csharp
void ConfigureWebHostBuilder(IWebHostBuilder builder)
{
    builder.ConfigureAppConfiguration((_, configBuilder) =>
    {
        configBuilder.LoadAppConfig(args);
        ConnectToKeyVault(configBuilder);
    });
}
```