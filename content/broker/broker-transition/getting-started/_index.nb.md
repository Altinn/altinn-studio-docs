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
4. Be om et overgangsoppsett fra Altinn 2 tjenesten til Altinn 3 tjenesten. Bestem dato for når dette skal gå i live. (For å minimere risiko for foreldreløse data i Altinn 2)
5. Gå live med overgangsløsning mens du oppfordrer forbrukerne til å migrere til Altinn Formidling.
6. Når alle forbrukere har migrert til Altinn 3, må du dekommisjonere Altinn 2 Formidlingstjenesten.

### Konfigurer Ressurs til bruk i overgangsløsningen

For å konfigurere ressusen slik at den fungerer optimalt i overgangsløsningen, og at den oppfører seg mest mulig som en ALtinn 2 tjeneste, så bør du [sette følgende konfigurasjonverdier på ressursen](../../getting-started/developer-guides/service-owner/#operasjon-konfigurer-ressurs-i-formidling-api).
Ta utgangspunkt i den eksisterende Altinn 2 tjenesten din og sett verdiene like der det er aktuelt.

- MaxFileTransferSize = "1073741824" (1 GB - maksgrense i Altinn 2).
- FileTransferTimeToLive = Hvor lenge en fil er tilgengelig før den saneres uavhengig av nedlastningstatus. De fleste Altinn 2 tjenster bruker "30D" - 30 dager.
- PurgeFileTransferAfterAllRecipientsConfirmed = Om filer skal saneres umiddelbart etter at alle mottakere har bekreftet, de fleste bruker "true"
- PurgeFileTransferGracePeriod = "48H" - Filer slettes ikke før 48 timer har passert (var hard-kodet i Altinn 2).

Dersom du trenger å bruke[Manifest fil](../technical-overview/#manifest-fil), må også følgende verdier settes:

- UseManifestFileShim = true.
- ExternalServiceCodeLegacy = den eksterne tjenestekoden til Altinn 2-tjenesten.
- ExternalServiceEditionCodeLegacy = den eksterne tjenesteutgavekoden til Altinn 2-tjenesten.

Når du er ferdig med å overføre alle brukerene fra Altinn 2 til Altinn 3 API'ene, kan du endre konfigurasjonen til nye verdier etter din egen preferanse.
For de 3 siste verdiene som kun brukes for overgangsløsningen er det ryddig å sette til False/null.

### Tilleggsinformasjon

Etter at en tjenesteeier ber om at en Altinn 2 tjenesteovergang til en Altinn 3 tjeneste,
Altinn 2 tjenesten vil ikke lenger sende forespørsler til Altinn 2 Formidling lagring.
Dette betyr at eksisterende filer i Altinn 2 Formidling lagring vil bli utilgjengelig for sluttbrukere når tjenesten
er satt opp til overgang til Altinn 3.

## Sluttbrukere

For sluttbrukere er det veldig liten teknisk forskjell mellom å bruke en Altinn 2 Formidlingstjeneste og en formidlingstjeneste som er blitt overført til Altinn 3.
Men alle forbrukere bør få det tekniske teamet til å gå gjennom denne dokumentasjonen for å avgjøre om endringene i overgangsløsningen krever endringer i implementeringen eller koden.

Funksjonelt sett vil kvitteringer ikke lenger ha en kvitteringsid, og dersom skrudd på; vil ikke manifest filene ha en File List.

I tillegg, mens en vil ble virus-scannet under opplasting i Altinn 2, blir den i Altinn 3 gjort asynkront etter opplasting. Dette betyr at en opplastet fil i Altinn 3 ikke vil være umiddelbart tilgjengelig, i motsetning til i Altinn2.
Filen vil bli gjort tilgjengelig når den automatiske virus skanningen er fullført.

Samtaler for å få kvittering gjennom ekstern Receipt SOAP endepunkt støttes ikke. Hvis dette er et krav fra en tjenesteeier eller sluttbruker, kan du sende oss en endringsforespørsel.
