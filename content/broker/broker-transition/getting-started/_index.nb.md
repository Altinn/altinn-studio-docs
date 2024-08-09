---
Title: Komme i gang med Formidling Overgangsløsning
LinkTitle: Komme i gang
Descriptions: Hvordan komme i gang med å bruke Formidling overgangsløsningen fra Altinn 2 til Altinn 3
Tags: [Løsning, formidling, overgang, guide]
TOC: False
Weight: 1
---

## Tjenesteeiere
For å bruke Formidling overgangsløsningen i Altinn 2 for å opprette, laste opp og hente fil metadata, må en tjenesteeier fullføre følgende trinn.
1. Ha en eksisterende Altinn 2 Formidlingstjeneste.
2. Ha eller lag en tilsvarende tjeneste i Altinn 3. Se hvordan du kommer i gang med Altinn 3 Formidling [her](../../getting-started/).
3. Be om et overgangsoppsett fra Altinn 2 tjenesten til Altinn 3 tjenesten. Bestem dato for når dette skal gå i live. (For å minimere risiko for foreldreløse data i Altinn 2 lagring)
4. Gå live med overgangsløsning mens du oppfordrer forbrukerne til å migrere til Altinn Formidling.
5. Når alle forbrukere har migrert til Altinn 3, må du dekommisjonere Altinn 2 Formidlingstjenesten.


### Tilleggsinformasjon
Etter at en tjenesteeier ber om at en Altinn 2 tjenesteovergang til en Altinn 3 tjeneste,
Altinn 2 tjenesten vil ikke lenger sende forespørsler til Altinn 2 Formidling lagring.
Dette betyr at eksisterende Formidling filer i Altinn 2 Formidling lagring vil bli utilgjengelig for sluttbrukere når tjenesten
er satt opp til overgang til Altinn 3.

## Sluttbrukere
For sluttbrukere er det veldig liten teknisk forskjell mellom å bruke en Altinn 2 Formidlingstjeneste og en formidlingstjeneste som er blitt overført til Altinn 3.
Men alle forbrukere bør få det tekniske teamet til å gå gjennom denne dokumentasjonen for å avgjøre om endringene i overgangsløsningen krever endringer i implementeringen eller koden.

Funksjonelt sett vil filene som overføres ikke lenger inneholde en manifest, og kvitteringer vil ikke lenger ha en kvitteringsid.

I tillegg, mens en vil ble virus-scannet under opplasting i Altinn 2, blir den i Altinn 3 gjort asynkront etter opplasting. Dette betyr at en opplastet fil i Altinn 3 ikke vil være umiddelbart tilgjengelig, i motsetning til i Altinn2.
Filen vil bli gjort tilgjengelig når den automatiske virus skanningen er fullført.

Samtaler for å få kvittering gjennom ekstern Receipt SOAP endepunkt støttes ikke. Hvis dette er et krav fra en tjenesteeier eller sluttbruker, kan du sende oss en endringsforespørsel.