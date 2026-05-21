---
headless: true
---

{{% expandlarge id="migrate-from-manual-maskinporten-setup" header="Migrer fra manuelt håndterte klientdetaljer" %}}

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
**Hvis appen allerede bruker `MaskinportenSettings` fra Azure Key Vault**

Etter publisering kan appen midlertidig ha to konfigurasjonskilder for de samme nøklene:

- konfigurasjonen Altinn Studio legger inn i appen ved publisering
- Azure Key Vault

Konfigurasjonsprovidere som legges til senere, overstyrer tidligere providere. Sørg for at Azure Key Vault-provideren registreres etter kallet til `ConfigureAppWebHost` mens appen fortsatt skal bruke de gamle Key Vault-verdiene.

Når appen skal bruke klientdetaljene håndtert av Altinn Studio:

- fjern eller gi nytt navn til de gamle `MaskinportenSettings--...`-hemmelighetene i Key Vault
- fjern Azure Key Vault-oppsettet helt hvis appen ikke bruker Azure Key Vault til noe annet
- publiser appen på nytt
{{% /notice %}}

{{% /expandlarge %}}
