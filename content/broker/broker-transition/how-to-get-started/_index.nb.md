---
Title: Hvordan komme i gang
LinkTitle: Hvordan komme i gang
Descriptions: Hvordan komme i gang med å bruke Formidling overgangsløsningen fra Altinn 2 til Altinn 3
Tags: [Løsning, formidling, overgang, guide]
TOC: False
Weight: 1
---

## Tjenesteeiere
For å bruke Formidling overgangsløsningen i Altinn 2 for å opprette, laste opp og hente fil metadata, må en tjenesteeier fullføre følgende trinn.
1. Ha en eksisterende Altinn 2 Formidlingstjeneste.
2. Ha eller lag en tilsvarende Altinn 3 Formidlingsressurs.
Se hvordan du kommer i gang med Altinn Formidling her: TODO: Legg til lenke for å komme i gang
3. <!-- TODO: Oppsett av rettigheter for Altinn 3-ressursen-->
<!-- TODO: Bør vi ha lenker her til de forskjellige tjenestene som brukes av tjenesteeiere for å lage de forskjellige tjenestene?-->
4. Be om et overgangsoppsett fra Altinn 2 tjenesten til Altinn 3 ressursen. Bestem dato for når dette skal gå i live. (For å minimere risiko for foreldreløse data i Altinn 2 lagring)
5. Gå live med overgangsløsning mens du oppfordrer forbrukerne til å migrere til Altinn Formidling.
6. Når alle forbrukere har migrert til Altinn 3 formidlingsressursen, må du dekommisjonere Altinn 2 Formidling tjenesten.


### Tilleggsinformasjon
Etter at en tjenesteeier ber om at en Altinn 2 tjenesteovergang til en Altinn 3 ressurs,
Altinn 2 tjenesten vil ikke lenger sende forespørsler til Altinn 2 Formidling lagring.
Dette betyr at eksisterende Formidling filer i Altinn 2 Formidling lagring vil bli utilgjengelig for sluttbrukere når tjenesten
er satt opp til overgang til Altinn 3.

## Sluttbrukere
For sluttbrukere er det veldig liten teknisk forskjell mellom å bruke en Altinn 2 Formidlingstjeneste og en Formidlingstjeneste som er blitt overført til Altinn 3.
Men alle forbrukere bør få det tekniske teamet til å gå gjennom denne dokumentasjonen for å avgjøre om endringene i overgangsløsningen krever endringer i implementeringen eller koden.

Funksjonelt sett vil filene som overføres ikke lenger inneholde en manifest, og kvitteringer vil ikke lenger ha en kvitteringsid.

I tillegg, mens en vil ble virus-scannet under opplasting i Altinn 2, blir den i Altinn 3 gjort asynkront etter opplasting. Dette betyr at en opplastet fil i Altinn 3 ikke vil være umiddelbart tilgjengelig, i motsetning til i Altinn2.
Filen vil bli gjort tilgjengelig når den automatiske virus skanningen er fullført.

Samtaler for å få kvittering gjennom ekstern Receipt SOAP endepunkt støttes ikke. Hvis dette er et krav fra en tjenesteeier eller sluttbruker, kan du sende oss en endringsforespørsel.