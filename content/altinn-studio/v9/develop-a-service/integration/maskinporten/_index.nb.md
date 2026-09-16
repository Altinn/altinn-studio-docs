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

Legitimasjonen går altså aldri gjennom konfigurasjonen til appen, verken i et publisert miljø eller lokalt, og appen kan ikke peke den innebygde klienten mot en annen identitet. Det betyr tre ting i praksis:

- **En `MaskinportenSettings`-seksjon i `appsettings.json` har ingen virkning.** Appen leser den ikke, og den leser den heller ikke fra user secrets eller miljøvariabler. Slett seksjonen. Ligger det en privat nøkkel der, bør du fjerne den fra repositoriet uansett.
- **Du kan ikke konfigurere den innebygde klienten fra appkoden.** Metodene som gjorde det i v8, finnes ikke lenger. Se [Kommer du fra v8?](#fra-v8).
- **Appen bestemmer ikke hvor filen ligger.** Det gjør plattformen appen kjører på: `/mnt/app-secrets/maskinporten-settings.json` i et publisert miljø, og lokalt mappen studioctl legger filen i. Se [Kjøre appen lokalt](#lokal-kjoring).

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

Regelen er den samme lokalt som i et publisert miljø: appen leser aldri Maskinporten-legitimasjon fra sin egen konfigurasjon. I stedet leverer studioctl klienten til appen slik Altinn Studio gjør det når du publiserer, som en fil i en mappe studioctl peker appen til.

### Lagre klienten

Du lagrer testklienten én gang. Kjør kommandoen uten noe mer, så spør studioctl deg om de tre verdiene etter hverandre: Maskinporten-miljøet (`test` eller `prod`), klient-ID-en og den private nøkkelen som base64-kodet JWK. Nøkkelen vises ikke mens du skriver eller limer den inn, og du kan lime den inn slik Maskinporten viser den, også over flere linjer. Godtar studioctl ikke svaret, sier den hvorfor og spør igjen. Trykk Enter uten å skrive noe for å avbryte. Du trenger altså bare verdiene, ikke JSON-strukturen.

```bash
studioctl app maskinporten set
```

Har du klienten som JSON, gir du den med `--file` i stedet:

```bash
studioctl app maskinporten set --file klient.json
```

studioctl knytter klienten til app-ID-en i `App/config/applicationmetadata.json`, ikke til mappen du står i, så alle klonene dine av appen deler den samme klienten. studioctl tar vare på filen for deg, og bare du kan lese den. Du trenger ikke vite hvor den ligger: `show` viser klienten, `remove` fjerner den.

JSON-en du gir studioctl, kan ha fire former:

- **Den leverte innstillingsfilen**, altså legitimasjonen pakket i et `MaskinportenSettings`-objekt.
- **Bare legitimasjonen**: `authority`, `clientId` og enten `jwk` eller `jwkBase64`.
- **En seksjon skrevet for pakken `Altinn.ApiClients.Maskinporten`**, med `ClientId`, `Environment` og `EncodedJwk`. studioctl regner om `test` til `https://test.maskinporten.no/` og `prod` til `https://maskinporten.no/`.
- **En seksjon du har kopiert ut sammen med navnet sitt**, altså ett enkelt objekt med seksjonsnavnet ytterst, uansett hva seksjonen heter. Da slipper du å pakke om det du kopierte.

Store og små bokstaver i feltnavnene spiller ingen rolle. studioctl kontrollerer bare formen på klienten: at `authority` er en https-adresse, at klient-ID-en er der, at nøkkelen kommer i én av de to formene, og at den har en privat del. Kommandoen henter ikke noe token for å prøve klienten.

studioctl godtar ikke en klient som autentiserer med sertifikat (`EncodedX509`, `CertificatePkcs12Path` eller `CertificateStoreThumbprint`). Appbibliotekene signerer med en JWK, så du må registrere en JWK på klienten i Maskinporten og bruke den i stedet.

studioctl leser ikke JSON med kommentarer eller komma til slutt, og sier fra om det. Har appsettings-filen din kommentarer, tar du dem ikke med når du kopierer seksjonen.

Hadde v8-appen din legitimasjonen i en konfigurasjonsseksjon, limer du seksjonen inn i `set`. Se [Testklienten du hadde lokalt](#lokal-testklient).

### Send nøkkelen på standard inn

Den private nøkkelen skal aldri stå som et argument på kommandolinjen, der den havner i historikken til skallet. Vil du lime inn klienten som JSON i stedet for å svare på spørsmålene, ber du studioctl lese fra standard inn (`stdin`) med `--file -`. Da limer du inn JSON-en og avslutter inndataene med `Ctrl+D` (`Ctrl+Z` og Enter på Windows). Sender du JSON-en gjennom et rør, leser studioctl den fra standard inn uten `--file`.

```bash
studioctl app maskinporten set --file -
```

studioctl skriver aldri ut den private nøkkelen. `studioctl app maskinporten show` viser app-ID, klient-ID, Maskinporten-miljø og nøkkel-ID (`kid`), og sier fra hvis ingen klient er lagret. `studioctl app maskinporten remove` sletter klienten igjen.

### Appen henter klienten uten omstart

`studioctl app run` forteller alltid appen hvor mappen ligger, gjennom miljøvariabelen `STUDIOCTL_APP_SECRETS_DIR`, også før du har lagret noe. Lagrer du en klient mens appen kjører, tar appen den i bruk uten at du starter den på nytt. Det er den samme mekanismen som lar plattformen rullere nøkkelen på en app som kjører: appbibliotekene følger med på filen.

Starter du appen med `dotnet run` eller fra utviklingsverktøyet ditt, får den den samme variabelen. Appen kjører `studioctl app env --json` ved oppstart i utviklingsmiljøet, og variabelen er med der.

Kjører du appen i container med `studioctl app run --mode container`, monterer studioctl mappen skrivebeskyttet på `/mnt/app-secrets`, der en publisert app finner sin egen. Containeren trenger ingen variabel.

Har du lagret en klient, viser `studioctl app run` den i oppstartsmeldingen, som `Maskinporten: din-klient-id (test)`.

Appbibliotekene godtar `STUDIOCTL_APP_SECRETS_DIR` bare på localtest. En publisert app leser den ikke.

### Hvis ingen klient er lagret

Appen starter og kjører som før. Først når den faktisk ber om et Maskinporten-token, sier den fra:

```text
No Maskinporten client is stored for this local run: nothing was read from
'…/maskinporten-settings.json'. Store one with 'studioctl app maskinporten set';
a running app picks it up without a restart.
```

En app som aldri ber om et Maskinporten-token, ser aldri denne meldingen.

### Velg riktig Maskinporten-miljø

En klient virker bare i miljøet du registrerte den i. Fiks-testmiljøet godtar for eksempel bare klienter fra `test.maskinporten.no`. Derfor merker `show` klienten med `test` eller `prod`, ut fra verten i `authority`, slik at du ser hvilket miljø den hører til.

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
- **En `MaskinportenSettings`-seksjon i `appsettings.json` er død konfigurasjon.** Slett den, og slett tilsvarende secrets i Azure Key Vault hvis de bare var der for den innebygde klienten. Brukte du seksjonen til å teste lokalt, tar du legitimasjonen med deg først. Se [Testklienten du hadde lokalt](#lokal-testklient).
- **`MaskinportenSettingsFilepath` finnes ikke lenger**, og `AppSettings:RuntimeSecretsDirectory` flytter heller ikke innstillingsfilen. En app som kunne flytte filen, kunne gi seg selv en annen identitet. Hvor filen ligger, er nå plattformens avgjørelse: lokalt leverer studioctl den. Se [Kjøre appen lokalt](#lokal-kjoring).
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

### Testklienten du hadde lokalt {#lokal-testklient}

Hadde du testlegitimasjonen i en `MaskinportenSettings`-seksjon for å prøve integrasjonen din lokalt, flytter du den samme klienten over: kopier seksjonen, lim den inn i `set`, og slett den.

Ligger seksjonen i en appsettings-fil, kopierer du den derfra. Ligger den i user secrets, finner du verdiene med `dotnet user-secrets list` fra `App`-mappen.

Enklest er å kjøre `studioctl app maskinporten set` og svare på spørsmålene med verdiene fra seksjonen: `Environment` er miljøet, `ClientId` er klient-ID-en og `EncodedJwk` er nøkkelen.

Vil du heller lime inn hele seksjonen, tar studioctl den imot med navnet sitt, så du trenger ikke pakke den om:

```bash
studioctl app maskinporten set --file -
```

Lim inn seksjonen, og avslutt inndataene med `Ctrl+D` (`Ctrl+Z` og Enter på Windows):

```json
{
  "min-app--MaskinportenSettings": {
    "ClientId": "din-klient-id",
    "Environment": "test",
    "EncodedJwk": "base64-kodet JWK"
  }
}
```

Har du seksjonen i en fil fra før, peker du på den med `--file` i stedet. Til slutt sletter du seksjonen fra appen. Appen leser den ikke lenger, og studioctl leverer klienten til de lokale kjøringene dine i stedet. Se [Kjøre appen lokalt](#lokal-kjoring).

`studioctl app upgrade v9` navngir seksjonene appen har, både dem koden bandt med `ConfigureMaskinportenClient`, og den vanlige `MaskinportenSettings`-seksjonen, som konfigurasjon v9 aldri leser. Rapporten sier fra om at du bør lime seksjonen inn i `set` før du sletter den, og peker i tillegg ut objekter som ser ut som gjenglemt legitimasjon for den innebygde klienten.
