<!-- Maskinporten automation notice -->
{{<notice info>}}
**Maskinporten-automatisering i Altinn Studio**

- Apper som bruker Altinn App v8.3 eller nyere kan aktivere standardscopene for tjenesteeier, `altinn:serviceowner`, `altinn:serviceowner/instances.read` og `altinn:serviceowner/instances.write`, fra Altinn Studio. Bruk knappen i Maskinporten-fanen eller legg til scopene fra scope-visningen i appinnstillingene.
- `altinn:serviceowner` markerer at klienten er et tjenesteeiersystem, mens `altinn:serviceowner/instances.read` og `altinn:serviceowner/instances.write` gir tilgang til å lese og skrive instanser som tjenesteeier.
- Apper som bruker Altinn App v9 krever disse standardscopene. Altinn Studio legger dem automatisk til hvis de mangler.
- Nye apper som opprettes i Altinn Studio får disse standardscopene for tjenesteeier automatisk.
- Appen må også autorisere tjenesteeier i [`App/config/authorization/policy.xml`](/nb/altinn-studio/v8/reference/configuration/authorization/). Nye apper har denne regelen i appmalen. For eksisterende apper må du legge til eller oppdatere `[org]`-regelen slik at den gir `read` og `write`.
{{</notice>}}

Anbefalt oppsett er å legge til scopene appen trenger i Altinn Studio. Når appen bygges og publiseres, kan den innebygde Maskinporten-klienten i appen bruke de valgte scopene.

For å sette dette opp må du:

1. [Sørge for at brukeren din kan legge til Maskinporten-scopes for organisasjonen](#tilgang-til-maskinporten-scopes).
2. [Legge til nødvendige scopes i Altinn Studio](/nb/altinn-studio/v8/guides/integration/maskinporten/add-scopes/).
3. [Publisere appen slik at valgte scopes blir tilgjengelige for appen](#publisering-og-klientdetaljer).
4. [Bruke den innebygde Maskinporten-klienten i appkoden](#maskinporten-application-setup).

## Tilgang til Maskinporten-scopes

Altinn Studio bruker den innloggede Ansattporten-tilgangen din til å finne Maskinporten-scopene du kan legge til for tjenesteeierorganisasjonen.

Hvis du ikke ser noen scopes i Altinn Studio, kan brukeren din mangle tilgang til å administrere klienter for organisasjonen. Kontakt den som administrerer Maskinporten-tilganger for organisasjonen din, eller Altinn servicedesk.

## Legg til scopes i Altinn Studio

Se [steg-for-steg-veiledningen for å legge til Maskinporten-scopes i en app](/nb/altinn-studio/v8/guides/integration/maskinporten/add-scopes/) for skjermbilder av flyten i Altinn Studio.

Endringer i scopes trer i kraft neste gang appen bygges og publiseres.

## Publisering og klientdetaljer

Når en app med Maskinporten-scopes publiseres, legger Altinn Studio valgte scopes inn i appbygget. Etter publisering kan appen bruke den innebygde Maskinporten-klienten med scopene som er valgt i Altinn Studio.

Du trenger ikke å håndtere klientdetaljer, JWKS-generering, rotasjon eller appkonfigurasjon selv for standard oppsett av apper.

## Migrer fra manuelt håndterte klientdetaljer

Noen eksisterende apper bruker en Maskinporten-klient som er opprettet manuelt i Samarbeidsportalen, og leser klientdetaljene fra tjenesteeierens Azure Key Vault. Dette oppsettet bruker ofte appspesifikke prefikser på hemmeligheter fordi Key Vault er delt mellom flere apper, for eksempel `myapp--MaskinportenSettings--ClientId`, og appkoden kan binde den innebygde klienten til en egendefinert konfigurasjonssti som `myapp:MaskinportenSettings`.

For å flytte en slik app til klientdetaljer håndtert av Altinn Studio:

1. Kontroller hvilke scopes den eksisterende Maskinporten-klienten er konfigurert med i Samarbeidsportalen, og hvilke scopes appen ber om i kode.
2. Legg de samme scopene til appen i Altinn Studio. Hvis appen bare trenger tjenesteeiertilgang til Altinn-instanser, bruker du standardscopene for tjenesteeier.
3. Bygg og publiser appen til TT02. Den publiserte appen får klientdetaljer for valgte scopes på standardstien `MaskinportenSettings`.
4. Oppdater appkode som eksplisitt binder Maskinporten-konfigurasjon til en egendefinert sti. Fjern det egendefinerte `ConfigureMaskinportenClient("...")`-kallet, eller endre det til å bruke `MaskinportenSettings`, slik at appen bruker konfigurasjonen fra Altinn Studio.
5. Verifiser appen i TT02. Test at den kan hente Maskinporten-token, og at kall som krever innvekslede Altinn-token fortsatt fungerer hvis appen bruker `UseMaskinportenAltinnAuthorization` eller `GetAltinnExchangedToken`.
6. Gjenta publisering og verifisering i produksjon.
7. Når produksjon er verifisert, kan gamle appspesifikke Key Vault-hemmeligheter og egendefinert Key Vault-konfigurasjon fjernes hvis de ikke brukes lenger. Ikke slett den gamle Maskinporten-klienten før du har verifisert at ingen andre apper eller integrasjoner bruker den.
{.floating-bullet-numbers}

Behold Azure Key Vault-oppsett som appen bruker for andre hemmeligheter. Hvis Maskinporten-klientdetaljer var de eneste verdiene appen leste fra Azure Key Vault, kan Azure Key Vault-konfigurasjonsprovideren og tilhørende appinnstillinger fjernes etter at migreringen er verifisert.

{{% notice warning %}}
Hvis appen allerede bruker standardstien `MaskinportenSettings` og leser disse verdiene fra Azure Key Vault, vil appen midlertidig ha to konfigurasjonskilder for de samme nøklene etter at klientdetaljer håndtert av Studio er publisert: runtime secrets-filen som legges til av `ConfigureAppWebHost`, og Azure Key Vault.

Konfigurasjonsprovidere som legges til senere overstyrer tidligere providere. Sørg for at Azure Key Vault-provideren registreres etter kallet til `ConfigureAppWebHost`, slik at de eksisterende Key Vault-verdiene har forrang frem til du bevisst fjerner dem. Når appen skal bruke klientdetaljene håndtert av Studio, fjerner eller gir du nytt navn til de gamle `MaskinportenSettings--...`-hemmelighetene i Key Vault, eller fjerner Azure Key Vault-oppsettet helt hvis appen ikke bruker det til noe annet, og publiserer appen på nytt.
{{% /notice %}}

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
