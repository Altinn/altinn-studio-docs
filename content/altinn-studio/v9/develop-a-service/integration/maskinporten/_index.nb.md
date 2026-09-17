---
draft: true
title: Integrere Altinn-app med Maskinporten
linktitle: Maskinporten
description: Slik setter du opp en integrasjon mellom en Altinn-app og Maskinporten.
tags: [needsReview]
toc: true
---

En Altinn-app kan gjøre autoriserte kall på vegne av virksomheten som eier appen, i stedet for på vegne av brukeren som er logget inn. Til det bruker appen Maskinporten. Denne veiledningen viser hvordan du setter det opp.

## Appen har én Maskinporten-identitet {#en-identitet}

Appen har nøyaktig én identitet i Maskinporten, som opprettes og vedlikeholdes av Altinn Studio. Du bestemmer hvilke scopes klienten skal ha. Resten håndterer plattformen.

Slik henger det sammen:

- Du legger til scopene appen trenger i Altinn Studio, og publiserer appen.
- Altinn Studio oppretter Maskinporten-klienten i miljøet du publiserer til, og leverer klient-ID og nøkkel til appen som en hemmelighet plattformen klargjør.
- Plattformen rullerer nøkkelen. Appen tar i bruk den nye nøkkelen uten at du starter den på nytt.

Provisjonerte hemmeligheter går aldri gjennom konfigurasjonen til appen, verken i et publisert miljø eller lokalt, og appen kan ikke peke den innebygde klienten mot en annen identitet. Det betyr i praksis:

- **En `MaskinportenSettings`-seksjon i `appsettings.json` har ingen virkning.** Appen leser den ikke, og den leser den heller ikke fra user secrets eller miljøvariabler. Slett seksjonen. Ligger det en privat nøkkel der, bør du fjerne den fra repositoriet uansett.
- **Du kan ikke konfigurere den innebygde klienten fra appkoden.** Metodene som gjorde det i v8, finnes ikke lenger. Se [Kommer du fra v8?](#fra-v8).
- **Appen bestemmer ikke hvor legitimasjonen ligger.** Det gjør plattformen appen kjører på: Altinn Studio klargjør den for en publisert app, og studioctl for en lokal kjøring. Se [Kjøre appen lokalt](#lokal-kjoring).

{{% notice info %}}
`studioctl app upgrade v9` sier fra om en `MaskinportenSettings`-seksjon som ikke lenger har noen virkning, og om kode som kaller metodene v9 har fjernet. Verktøyet endrer ikke filene for deg, fordi det du skal gjøre i stedet er et valg bare du kan ta. Brukte du seksjonen til å teste lokalt, minner rapporten deg om å ta legitimasjonen med videre først.
{{% /notice %}}

## Sett opp integrasjonen {#oppsett}

1. **Legg til scopene i Altinn Studio.** Se [Legge til Maskinporten-scopes]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten/add-scopes" >}}) for fremgangsmåten. Standardscopene for tjenesteeier, `altinn:serviceowner`, `altinn:serviceowner/instances.read` og `altinn:serviceowner/instances.write`, får alle v9-apper automatisk. Dem trenger du ikke legge til selv.
2. **Gi tjenesteeieren rettigheter i autorisasjonspolicyen.** `App/config/authorization/policy.xml` må ha en regel som gir `[org]` rettighetene `read` og `write`. Appmalen har denne regelen. Se [Autorisasjon]({{< relref "/altinn-studio/v9/develop-a-service/configuration/authorization" >}}).
3. **Bygg og publiser appen.** Endringer i scopes trer i kraft neste gang du publiserer.
4. **Ta klienten i bruk i appkoden.** Se [Bruke Maskinporten i appkoden](#appkode).
{.floating-bullet-numbers}

Du håndterer verken klientdetaljer, nøkler eller nøkkelrotasjon selv.

{{% notice info %}}
Brukeren som legger til scopes, må ha tilgang til å administrere klienter i ID-porten og Maskinporten på vegne av virksomheten. Mangler tilgangen, viser Altinn Studio en melding om det. Se [Hvis du ikke har tilgang]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten/add-scopes" >}}#hvis-du-ikke-har-tilgang).
{{% /notice %}}

## Bruke Maskinporten i appkoden {#appkode}

Appen får den innebygde `IMaskinportenClient` automatisk. Du verken registrerer eller konfigurerer noe.

### Autorisere en HTTP-klient

Den enkleste måten å bruke Maskinporten på er å knytte autorisasjonen til en HTTP-klient. Da legger appen et gyldig token på hver forespørsel klienten sender.

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=7-8 10-11" >}}
void RegisterCustomAppServices(
  IServiceCollection services,
  IConfiguration config,
  IWebHostEnvironment env
)
{
  services.AddHttpClient<Klient1>()
    .UseMaskinportenAuthorization("scope1", "scope2");

  services.AddHttpClient<Klient2>()
    .UseMaskinportenAltinnAuthorization("scope1");
}
{{< / highlight >}}

Bruk `UseMaskinportenAuthorization` mot API-er som tar imot Maskinporten-token direkte, og `UseMaskinportenAltinnAuthorization` mot Altinn-API-er. Den siste veksler Maskinporten-tokenet inn til et Altinn-token først. Begge virker også på navngitte klienter, for eksempel `services.AddHttpClient("navn")`.

### Hente et token selv

Trenger du tokenet til noe annet enn en HTTP-klient, kan du bruke `IMaskinportenClient` fra [dependency injection](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection) direkte i tjenesten din.

{{< highlight csharp "linenos=false,hl_lines=7-8" >}}
public class Eksempel(IMaskinportenClient maskinporten)
  : IProcessTaskEnd
{
  public async Task End(string taskId, Instance instance)
  {
    string[] scopes = ["scope1", "scope2"];
    var token = await maskinporten.GetAccessToken(scopes);
    var altinnToken = await maskinporten
      .GetAltinnExchangedToken(scopes);

    // ...
  }
}
{{< / highlight >}}

## Trenger du et scope appen ikke har? {#nytt-scope}

Legg scopet du trenger i Altinn Studio og publiser appen på nytt. Hvis du trenger hjelp kan du referere til veiledningen [Legge til Maskinporten-scopes]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten/add-scopes" >}}).

Finner du ikke scopet i Altinn Studio, har virksomheten din ennå ikke fått tilgang til det hos den som eier scopet. Den tilgangen avklarer du med den som eier scopet, ikke i Altinn Studio.

## Kommunikasjon mellom lokal app og eksternt API {#lokal-kjoring}

Hvis du kjører en lokal app som har behov for å snakke med et eksternt API, enten i _testmiljø_ eller _produksjon_, må du inntil videre provisjonere en Maskinporten-klient manuelt.

Eksempler på når dette behovet oppstår kan være ved testing av en integrasjon mot [Meldingstjenesten]({{< relref "/altinn-studio/v9/develop-a-service/integration/correspondence" >}}) eller [Varsling]({{< relref "/altinn-studio/v9/develop-a-service/integration/notifications" >}}).

Oppsettet av en lokal Maskinporten-klient styres via kommandolinjeverktøyet `studioctl app maskinporten`. Her kan du vise, opprette og slette lokale klienter. Informasjonen lagres utenfor repositoriet til appen din, sammen med resten av konfigurasjonen til `studioctl`.


{{% notice info %}}
Alle kommandoene som omfatter `studioctl app` må kjøres fra repositoriet eller mappen der kildekoden til appen din ligger.
{{% /notice %}}

### Vise gjeldende klient

Hvis du ønsker å vise hvilke Maskinporten-innstillinger som gjelder for appen din, kan du bruke følgende kommando:

```bash
studioctl app maskinporten show
```

### Lagre ny klient {#lokal-klient}

For å lagre en ny Maskinporten-klient som skal brukes av appen din, kan du bruke følgende kommando:

```bash
studioctl app maskinporten set
```

Du vil da bli tatt gjennom en veiledning der du kan skrive inn verdiene for _miljø_, _klient ID_ og _JWK-nøkkel_. Hvis du ønsker å heller lime inn en fil eller et JSON-objekt, kan du få vist alle alternativene slik:

```bash
studioctl app maskinporten set --help
```

### Velg riktig Maskinporten-miljø

En klient virker bare i miljøet du registrerte den i. API-tilbydere i _testmiljø_ godtar for eksempel bare klienter fra `test.maskinporten.no`. Derfor merker `show` klienten med `test` eller `prod`, ut fra verten i `authority`, slik at du ser hvilket miljø den hører til.

## Kommer du fra v8? {#fra-v8}

Dette er endret fra v8:

- **`ConfigureMaskinportenClient` finnes ikke lenger**, verken varianten som tar en konfigurasjonssti eller den som tar en delegat. Et kall til metoden gir byggefeil. Trenger du et annet scope, legger du det til på klienten Altinn Studio har opprettet. Trenger du en annen identitet, bruker du [en egen klient](#skreddersydd).
- **`IFiksSetupBuilder.WithMaskinportenConfig` finnes ikke lenger.** Fiks IO-klienten bruker appens innebygde Maskinporten-klient og trenger ingen egen Maskinporten-konfigurasjon. Se [Fiks Arkiv]({{< relref "/altinn-studio/v9/receive-data/fiks-arkiv" >}}).
- **`MaskinportenSettings` og `JwkWrapper` er ikke lenger offentlige typer.** Verken `Configure<T>` eller `GetSection(...).Get<T>()` får tak i disse innstillingene.
- **En `MaskinportenSettings`-seksjon i `appsettings.json` er død konfigurasjon.** Slett den, og slett tilsvarende secrets i Azure Key Vault hvis de bare var der for den innebygde klienten. Brukte du seksjonen til å teste lokalt, kan du sette opp tilsvarende konfigurasjon med `studioctl`-verktøyet. Se [Lagre ny klient](#lokal-klient).
- **`MaskinportenSettingsFilepath` finnes ikke lenger**, og `AppSettings:RuntimeSecretsDirectory` flytter heller ikke innstillingsfilen.

Hadde appen sin egen Maskinporten-klient i v8, flytter du den slik:

1. Finn ut hvilke scopes den gamle klienten er satt opp med i Samarbeidsportalen, og hvilke scopes appkoden ber om.
2. Legg de samme scopene til på appen i Altinn Studio. Fjern `ConfigureMaskinportenClient`-kallet og en eventuell `MaskinportenSettings`-seksjon.
3. Publiser appen til TT02, og kontroller at den henter token, og at kall som krever innvekslet Altinn-token fortsatt virker.
4. Gjenta i produksjon. Vent med å slette den gamle klienten og de gamle Key Vault-hemmelighetene til du har kontrollert at ingen andre apper eller integrasjoner bruker dem.
{.floating-bullet-numbers}

Dette er uendret:

- Du bruker klienten på nøyaktig samme måte som før, med `IMaskinportenClient` eller med `UseMaskinportenAuthorization` på en HTTP-klient.
- Plattformen rullerer nøkkelen uten at appen må starte på nytt.
- Du kan fortsatt prøve din egen Maskinporten-klient for lokal kjøring. Du oppgir testklienten på en annen måte enn før, men [muligheten er den samme](#lokal-kjoring).

## Trenger du noe skreddersydd? {#skreddersydd}

Den innebygde Maskinporten-klienten dekker et bredt behov og bør være tilstrekkelig for de fleste, men om du har krav til funksjonalitet som ikke støttes, kan du også fint benytte en tredjepartsløsning. For eksempel [Altinn.ApiClients.Maskinporten](https://github.com/Altinn/altinn-apiclient-maskinporten).