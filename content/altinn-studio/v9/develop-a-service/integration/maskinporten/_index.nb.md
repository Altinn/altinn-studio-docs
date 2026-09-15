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

Appen har nøyaktig én identitet i Maskinporten: klienten Altinn Studio oppretter for den. Du bestemmer hvilke scopes klienten skal ha. Resten håndterer plattformen.

Slik henger det sammen:

- Du legger til scopene appen trenger i Altinn Studio, og publiserer appen.
- Altinn Studio oppretter Maskinporten-klienten i miljøet du publiserer til, og legger klient-ID og nøkkel inn i appen som filen `maskinporten-settings.json`.
- Plattformen rullerer nøkkelen. Appen tar i bruk den nye nøkkelen uten at du starter den på nytt.
- Appbibliotekene leser filen direkte, gjennom en konfigurasjonskilde som bare Maskinporten-klienten har tilgang til.

I et publisert miljø går legitimasjonen altså aldri gjennom konfigurasjonen til appen, og appen kan ikke peke den innebygde klienten mot en annen identitet. Det betyr tre ting i praksis:

- **En `MaskinportenSettings`-seksjon i `appsettings.json` har ingen virkning i et publisert miljø.** Appen leser den ikke. Slett den. Ligger det en privat nøkkel der, bør du fjerne den fra repositoriet uansett.
- **Du kan ikke konfigurere den innebygde klienten fra appkoden.** Metodene som gjorde det i v8, finnes ikke lenger. Se [Kommer du fra v8?](#fra-v8).
- **Filen kan ikke flyttes.** Appen leser den fra ett sted, og ingen konfigurasjonsnøkkel endrer det.

Det ene unntaket gjelder localtest. Der kan du la appen bruke din egen testklient, og den overstyrer alt annet. Se [Kjøre appen lokalt](#lokal-kjoring).

{{% notice info %}}
`studioctl app upgrade v9` sier fra om en `MaskinportenSettings`-seksjon som ikke lenger har noen virkning, og om kode som kaller metodene v9 har fjernet. Verktøyet endrer ikke filene for deg, fordi det du skal gjøre i stedet er et valg bare du kan ta.
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

Trenger du tokenet til noe annet enn en HTTP-klient, injiserer du `IMaskinportenClient` i tjenesten din.

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

## Kjøre appen lokalt {#lokal-kjoring}

Appen trenger ingen Maskinporten-klient for å kjøre lokalt. Tokenene appen bruker mot Altinn-plattformen, kommer fra tokengeneratoren i localtest, ikke fra Maskinporten. Egen legitimasjon trenger du bare hvis du skal prøve integrasjonen din mot et ekte Maskinporten-testmiljø, for eksempel en Fiks Arkiv-sending.

Da kan du la appen bruke en testklient du har laget selv: en app som kjører mot localtest, leser en `MaskinportenSettings`-seksjon fra sin egen konfigurasjon. Tre regler gjelder for den seksjonen:

- **Bare på localtest.** En publisert app leser den ikke i det hele tatt. Appen kjenner igjen localtest på vertsnavnet den kjører på.
- **Den overstyrer.** Har du lagt inn en seksjon, er det den appen bruker. Skulle det ligge en levert innstillingsfil der fra før, viker den. Du trenger ikke rydde bort noe først.
- **Hele settet eller ingenting.** Appen bruker den ene kilden eller den andre, aldri en blanding, så du kan ikke ende opp med klient-ID fra det ene settet og nøkkel fra det andre.

Den siste regelen er verdt en advarsel: en halv seksjon overstyrer like fullt. Oppgi alle verdiene klienten trenger, ellers stopper appen på at Maskinporten-konfigurasjonen er ugyldig.

Legger du ingen seksjon inn, bruker appen den leverte innstillingsfilen. Lokalt finnes den sjelden, og da sier appen fra at Maskinporten-konfigurasjonen mangler.

Du har to steder å legge legitimasjonen. Velg ett av dem.

### Bruke dotnet user-secrets

Dette er det tryggeste, siden den private nøkkelen aldri kommer i nærheten av repositoriet. Appmalen har ingen `UserSecretsId`, så du klargjør appen først:

```bash
cd App
dotnet user-secrets init

dotnet user-secrets set \
  "MaskinportenSettings:authority" \
  "https://test.maskinporten.no/"

dotnet user-secrets set \
  "MaskinportenSettings:clientId" "din-klient-id"

dotnet user-secrets set \
  "MaskinportenSettings:jwkBase64" "base64-kodet JWK"
```

Appen leser user secrets når den kjører i utviklingsmiljøet, og det er miljøet appmalen starter den i. Vil du heller oppgi JWK-en felt for felt enn som base64, setter du én verdi per felt: `MaskinportenSettings:jwk:kid`, `MaskinportenSettings:jwk:kty`, `MaskinportenSettings:jwk:n` og så videre.

### Bruke appsettings.Local.json

Appbibliotekene laster `App/appsettings.Local.json` hvis filen finnes. Legg seksjonen der:

{{< code-title >}}
App/appsettings.Local.json
{{< /code-title >}}

```json
{
  "MaskinportenSettings": {
    "authority": "https://test.maskinporten.no/",
    "clientId": "din-klient-id",
    "jwkBase64": "base64-kodet JWK"
  }
}
```

{{% notice warning %}}
**Merk stor L i `Local`.** Appen ser etter `appsettings.Local.json`. På Linux laster den ikke en fil som heter `appsettings.local.json`, og du får ingen feilmelding om det.
{{% /notice %}}

V9-appmalen har `appsettings.Local.json` i `.gitignore`, så filen holder seg utenfor repositoriet. Kontroller likevel at din egen app faktisk ignorerer den før du legger inn en privat nøkkel.

## Trenger du et scope appen ikke har? {#nytt-scope}

Legg scopet til på klienten Altinn Studio har opprettet for appen, og publiser appen på nytt. Det er den eneste veien: appen kan ikke bytte til en annen klient for å få et scope den mangler. Se [Legge til Maskinporten-scopes]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten/add-scopes" >}}).

Finner du ikke scopet i Altinn Studio, har virksomheten din ennå ikke fått tilgang til det hos den som eier scopet. Den tilgangen avklarer du med den som eier scopet, ikke i Altinn Studio.

## Trenger du en annen identitet? {#egen-klient}

Noen integrasjoner krever at appen opptrer som noe annet enn tjenesteeieren, med en egen klient og en egen nøkkel. Til det bruker du pakken [Altinn.ApiClients.Maskinporten](https://github.com/Altinn/altinn-apiclient-maskinporten). Det er den støttede måten å bruke egen legitimasjon på.

Pakken leser konfigurasjonen sin fra en seksjon du velger selv, og bruker `MaskinportenSettings` som standardnavn. I v9 er det navnet trygt å bruke igjen: den innebygde klienten leser ikke lenger appkonfigurasjonen, så de to kan ikke komme i veien for hverandre. `studioctl app upgrade v9` kjenner igjen en seksjon som hører til pakken, og lar den stå.

Slik går du frem:

1. Registrer en ny Maskinporten-integrasjon i Samarbeidsportalen. Se [Opprette Maskinporten-klient](/nb/authorization/getting-started/maskinportenclient/).
2. Legg klientdetaljene i Azure Key Vault i stedet for å sjekke dem inn. Se [secrets-dokumentasjonen](/nb/altinn-studio/v8/reference/configuration/secrets/) for hvordan appen leser fra Key Vault.
3. Sett opp pakken i appen. Dokumentasjonen til pakken beskriver hvordan.
{.floating-bullet-numbers}

Den innebygde klienten fortsetter å bruke identiteten Altinn Studio har opprettet. Prosessoverganger, meldinger og andre plattformkall i appen går fortsatt som tjenesteeier.

## Kommer du fra v8? {#fra-v8}

Dette er endret fra v8:

- **`ConfigureMaskinportenClient` finnes ikke lenger**, verken varianten som tar en konfigurasjonssti eller den som tar en delegat. Et kall til metoden gir byggefeil. Trenger du et annet scope, legger du det til på klienten Altinn Studio har opprettet. Trenger du en annen identitet, bruker du [en egen klient](#egen-klient).
- **`IFiksSetupBuilder.WithMaskinportenConfig` finnes ikke lenger.** Fiks IO-klienten bruker appens innebygde Maskinporten-klient og trenger ingen egen Maskinporten-konfigurasjon. Se [Fiks Arkiv]({{< relref "/altinn-studio/v9/receive-data/fiks-arkiv" >}}).
- **`MaskinportenSettings` og `JwkWrapper` er ikke lenger offentlige typer.** Verken `Configure<T>` eller `GetSection(...).Get<T>()` får tak i legitimasjonen.
- **En `MaskinportenSettings`-seksjon i `appsettings.json` er død konfigurasjon.** Slett den, og slett tilsvarende secrets i Azure Key Vault hvis de bare var der for den innebygde klienten.
- **`MaskinportenSettingsFilepath` finnes ikke lenger**, og `AppSettings:RuntimeSecretsDirectory` flytter heller ikke innstillingsfilen. En app som kunne flytte filen, kunne gi seg selv en annen identitet. Skal du teste mot Maskinporten lokalt, se [Kjøre appen lokalt](#lokal-kjoring).
- **Den andre, «interne» klientvarianten er borte.** Seksjonen `MaskinportenSettingsInternal` og filen `maskinporten-settings-internal.json` finnes ikke lenger.
- **Sporingsdataene fra appen har ikke lenger attributtet `maskinporten.variant`.** Pek om dashbord og søk som grupperer eller filtrerer på det.

Hadde appen sin egen Maskinporten-klient i v8, flytter du den slik:

1. Finn ut hvilke scopes den gamle klienten er satt opp med i Samarbeidsportalen, og hvilke scopes appkoden ber om.
2. Legg de samme scopene til på appen i Altinn Studio. Fjern `ConfigureMaskinportenClient`-kallet og en eventuell `MaskinportenSettings`-seksjon.
3. Publiser appen til TT02, og kontroller at den henter token, og at kall som krever innvekslet Altinn-token fortsatt virker.
4. Gjenta i produksjon. Vent med å slette den gamle klienten og de gamle Key Vault-hemmelighetene til du har kontrollert at ingen andre apper eller integrasjoner bruker dem.
{.floating-bullet-numbers}

Dette er uendret:

- Du bruker klienten på nøyaktig samme måte som før, med `IMaskinportenClient` eller med `UseMaskinportenAuthorization` på en HTTP-klient.
- Plattformen rullerer nøkkelen uten at appen må starte på nytt.
- Du kan fortsatt prøve din egen Maskinporten-integrasjon fra en lokal kjøring. Du oppgir testklienten på en annen måte enn før, men [muligheten er den samme](#lokal-kjoring).
