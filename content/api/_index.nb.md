---
title: Altinn 3 API
linktitle: API
description: Beskrivelse av Altinn API for sluttbrukere og applikasjonseiere.
toc: true
weight: 20
tags: [translate-to-norwegian]
---

## De to primære datastrukturene

Dette vil være en oversikt over primærmodellene som brukes i Altinn 3. Hovedhensikten med dette er å danne en grunnleggende forståelse av modellene før introduksjon av API'ene.

![Instans](instance.drawio.svg "En Instans kan inneholde mange dataelementer. Hvert dataelement må referere til en enkelt datafil.")

### Instans (Forekomst)

Instansmodellen er hovedmetadatadokumentet i Altinn 3. Den brukes av Altinn for å holde styr på tilstanden til en interaksjon mellom en sluttbruker og eieren av en app. En instans må være knyttet til en app og en rapportør som instans-eier.
 
Instanser er også litt som beholdere for alle andre dokumenter; skjemaer og ustrukturert data samlet inn under en interaksjon mellom en sluttbruker og applikasjonseieren. Antall dokumenter og filer som produseres vil avhenge av appen.

I en enkel app vil en sluttbruker fylle ut et skjema og sende det til applikasjonseieren. Dette vil typisk produsere en enveis interaksjon der bare ett eller to dokumenter samles inn i instansen. I mer avanserte apper vil antallet dokumenter og filer utvides til flere skjemaer, vedlegg og tilbakemeldinger eller valideringsmeldinger fra applikasjonseieren.

En instans kan ikke referere til data direkte, men vil inneholde en liste over dataelementer med mer informasjon om innsamlede data.

### DataElement

DataElement-modellen er et metadatadokument for et spesifikt skjema eller binær fil. De viktigste aspektene ved dette dokumentet er at det inneholder informasjon om hvor de faktiske dataene blir lagret, og hvordan dataene brukes av applikasjonen.

De fleste apper vil automatisk opprette et dataelement for å representere skjemaet som fylles ut av brukeren. Mer avanserte apper vil også kreve at brukeren laster opp vedlegg eller fyller ut flere skjemaer.

En instans kan ha mange dataelementer, men hvert dataelement kan ikke referere til mer enn én datafil.

### API'ene

Altinn 3-løsningen har flere API'er, men de kan deles i to grupper: App-API'ene og plattform-API'ene.

### App API

Applikasjons-API er et API som gir tilgang til spesifikke forekomster av en spesifikk app. API-en gir funksjoner for å jobbe med dataelementer mens metadatadokumentet for forekomsten og dens dataelementer holdes oppdatert. Instansnivå-endepunktene dreier seg om å flytte en instans gjennom dens definerte prosess og kontrollere noen instansnivå-innstillinger.

Metadata for en app er den andre jobben til app-API-en. Det finnes endepunkter som gir tilgang til metadataene til selve appen, dens datatyper og prosessbeskrivelse.

Hver app vil avsløre nesten identiske endepunkter og funksjonalitet. Eksterne parter skal bare trenge én klientimplementering på tvers av alle app-API-er, men det er mulig for applikasjonseieren å utvide app-API-en med flere endepunkter og til og med gjøre endringer i standardfunksjonaliteten. Dokumentasjon for appspesifikk API og funksjoner må hentes direkte fra appen eller fra appeieren.
```http
https://{org}.apps.altinn.no/{org}/{appname}
```

URL-en identifiserer appeierens spesifikke vertsnavn ved å bruke det korte navnet **org**, og identifikatoren til appen som består av både appeierens korte navn og navnet på appen. Å kombinere organisasjonen og appnavnet resulterer i det vi kaller app-ID-en **org/appnavn**.

### Plattform API

Plattform-API'ene er primært laget for å støtte applikasjonene som er vert på plattformen, men mange endepunkter kan brukes direkte av både applikasjonseiere og brukere. Primært på API-ene for autentisering, hendelser og lagring.

Storage API gir tilgang til alle instanser på tvers av alle applikasjoner. Den kan brukes til å få tilgang til metadata om applikasjoner, instanser, dataelementer og instansaktivitetslogg (hendelser), samt det faktiske datainnholdet. Denne API-en bør være den foretrukne metoden for appeiere for å laste ned data knyttet til instanser som er opprettet basert på deres apper. Applikasjonsbrukere kan bruke den hvis de trenger en form for meldingsboks eller ønsker å hente arkiverte instanser og deres data.

Autentiserings-API'et gir metoder for autentisering.

Events API gir tilgang til Events-komponentens endepunkt for oppføring av hendelser. Dette kan brukes sporadisk for å spørre Altinn etter hendelser som har oppstått i løsningen.

```http
https://platform.altinn.no
```

## API Brukergrupper

Det er primært to grupper brukere av Altinn API'er. Den første gruppen består av applikasjoner og systemer som brukes av eierne av appene som er vert for Altinn. Denne gruppen kalles *Application Owners*. Den andre gruppen består av organisasjoner og personer som bruker appene til å kommunisere med appeierne. Denne gruppen kalles *Applikasjonsbrukere*.

De to gruppene har mange like behov, men det er noen forskjeller i hva slags type oppgaver de skal utføre. Alle nye API-er er teknisk tilgjengelige for begge gruppene, men noen endepunkter har autorisasjon til å tillate bare én av gruppene.

### App-eiere

En liste over vanlige oppgaver for en app-eier:

- Søk instanser for en gitt applikasjon i henhold til status eller forekomsteiere.
- Opprett en applikasjons-instans.
- Last opp skjemadata og vedlegg.
- Last ned skjemadata.
- Endre prosesstilstand (arbeidsflyt).
- Bekreft instansen som komplett.

### Applikasjonsbrukere

En liste over vanlige oppgaver for en applikasjonsbruker:

- Søk instanser for seg selv eller en part de kan representere (instanseier).
- Opprett en applikasjons-instans.
- Last opp skjemadata og vedlegg.
- Last ned skjemadata.
- Endre prosesstilstand (arbeidsflyt).
- Se status for en instans.

{{<children>}}