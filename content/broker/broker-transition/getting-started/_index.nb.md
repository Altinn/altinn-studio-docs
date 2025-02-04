---
Title: Komme i gang med Formidling Overgangsløsning
LinkTitle: Komme i gang
Descriptions: Hvordan komme i gang med å bruke Formidling overgangsløsningen fra Altinn 2 til Altinn 3
Tags: [Løsning, formidling, overgang, guide]
TOC: False
Weight: 1
---

## Tjenesteeiere

For å bruke Formidling overgangsløsning i Altinn for å opprette, laste opp og hente fil metadata, må en tjenesteeier fullføre følgende trinn.

1. Ha en eksisterende Altinn 2 Formidlingstjeneste.
2. Ha eller lage en tilsvarende tjeneste i Altinn 3. Se hvordan du kommer i gang med Altinn 3 Formidling [her](../../getting-started/).
For å konfigurere ressursen din korrekt for å bruke den i overgangsløsningen, [se under](#konfigurer-ressurs-til-bruk-i-overgangsløsningen).
3. Bestill et overgangsoppsett fra Altinn 2 tjenesten til Altinn 3 tjenesten, [se under](#bestill-overgangsoppsett) for detaljer.
4. Gå live med overgangsløsning mens du oppfordrer forbrukerne til å migrere til Altinn Formidling.
5. Når alle forbrukere har migrert til Altinn 3, må du dekommisjonere Altinn 2 Formidlingstjenesten.

### Konfigurer Ressurs til bruk i overgangsløsningen

For å konfigurere ressursen slik at den fungerer optimalt i overgangsløsningen, og at den oppfører seg mest mulig som en Altinn 2 tjeneste, så bør du [sette følgende konfigurasjonverdier på ressursen](../../getting-started/developer-guides/service-owner/#operation-configure-resource-in-broker-api).

Ta utgangspunkt i den eksisterende Altinn 2 tjenesten din og sett verdiene like der det er aktuelt.

- MaxFileTransferSize = "1073741824" (1 GB - maksgrense i Altinn 2).
- FileTransferTimeToLive = Hvor lenge en fil er tilgengelig før den saneres uavhengig av nedlastningsstatus. De fleste Altinn 2 tjenester bruker "30D" - 30 dager.
- PurgeFileTransferAfterAllRecipientsConfirmed = Om filer skal saneres umiddelbart etter at alle mottakere har bekreftet, de fleste bruker "true"
- PurgeFileTransferGracePeriod = "24H" - Filer slettes ikke før 24 timer har passert (var hard-kodet til 48 timer i Altinn 2). Må spesifiseres som [ISO8601 Duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) og 24 timer er maks.

Dersom du trenger å bruke[Manifest fil](../technical-overview/#manifest-fil), må også følgende verdier settes:

- UseManifestFileShim = true.
- ExternalServiceCodeLegacy = den eksterne tjenestekoden til Altinn 2-tjenesten.
- ExternalServiceEditionCodeLegacy = den eksterne tjenesteutgavekoden til Altinn 2-tjenesten.

Når du er ferdig med å overføre alle brukerne fra Altinn 2 til Altinn 3 API'ene, kan du endre konfigurasjonen til nye verdier etter din egen preferanse.
For de 3 siste verdiene som kun brukes for overgangsløsningen er det ryddig å sette til False/null.

### Bestill overgangsoppsett

Overgangsoppsettet er konfigurert i Altinn 2-kodebasen, og når det er satt, vil trafikken for den definerte tjenesten bli omdirigert til Altinn 3.
Vennligst oppgi følgende nødvendige detaljer, pass på at aktuelle verdier matcher det du [satte for ressursen](#konfigurer-ressurs-til-bruk-i-overgangsløsningen).

- ExternalServiceCode og ExternalServiceEditionCode for Altinn 2-tjenesten.
- ResourceId for Altinn 3-ressursen.
- Miljøene hvor endringen skal utføres.
  - Altinn 2 TT02 -> Altinn 3 TT02/Staging
  - Altinn 2 PROD -> Altinn 3 PROD
- Dato og klokkeslett for når endringen(e) skal tre i kraft.

Kontakt oss i den offentlige slack-kanalen [Altinn@Slack#produkt-formidling](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog), så vil vi utføre de nødvendige stegene.

Å utføre denne konfigurasjonsendringen skaper ikke nedetid i Altinn 2, men det vil være et kort tidsrom på <1 minutt hvor konfigurasjonen lastes inn på alle servere før overgangsløsningen er aktiv.

### Tilleggsinformasjon

Etter at overgangsoppsettet er aktivert, vil ikke Altinn 2 tjenesten lenger sende forespørsler til Altinn 2 Formidling sitt datalager, da disse forespørselene isteden går til Altinn 3.
Dette betyr at eksisterende filer i Altinn 2 Formidling sitt datalager blir utilgjengelig for sluttbrukere etter overgang.

Vi anbefaler derfor at dere planlegger en periode med nedetid for tjenesten der ingen nye filer opprettes, men alle mottakere kan laste ned filene sine før du utfører overgangen.
Nøyaktig hvor lang denne tiden bør være, varierer fra tjeneste til tjeneste, avhengig av hvor raskt mottakerne laster ned filene etter de er gjort tilgjengelig. Dersom dere ikke har innsikt i dette, ta kontakt med oss, så kan vi ta ut statistikk som kan hjelpe med å avklare dette.

En måte for å gjennomføre dette er å bruke Altinn 2 SRR for midlertidig å fjerne "write"-tilgangen for alle organisasjonene dere har godkjent som avsendere, men beholde "read"-tilgangen for alle mottakere.
Når overgangen er satt opp, kan dere gi "write"-tilgangen tilbake til alle avsenderne, og filene vil nå bli opprettet i Altinn 3.

{{% notice warning  %}}
Merk at det er en caching-tid på 10 minutter for SRR-rettigheter i Altinn 2 (SC+SEC+Orgnr), så pass på å ta hensyn til dette i planene.
{{% /notice %}}

## Sluttbrukere

For sluttbrukere er det veldig liten teknisk forskjell mellom å bruke en Altinn 2 Formidlingstjeneste og en formidlingstjeneste som er blitt overført til Altinn 3.
Men alle forbrukere bør få det tekniske teamet til å gå gjennom denne dokumentasjonen for å avgjøre om endringene i overgangsløsningen krever endringer i implementeringen eller koden.

Funksjonelt sett vil kvitteringer ikke lenger ha en kvitteringsid, og dersom skrudd på; vil ikke manifest filene ha en File List.

Mens en fil ble virus-scannet under opplasting i Altinn 2, blir dette gjort asynkront etter opplasting i Altinn 3. Dette betyr at en opplastet fil i Altinn 3 ikke vil være umiddelbart tilgjengelig, i motsetning til i Altinn2.
Filen vil bli gjort tilgjengelig når den automatiske virus skanningen er fullført.

Samtaler for å få kvittering gjennom ekstern Receipt SOAP endepunkt støttes ikke. Hvis dette er et krav fra en tjenesteeier eller sluttbruker, kan du sende oss en endringsforespørsel.
