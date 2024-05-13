---
title: Modul 1
description: Opprette app og lage enkelt skjema
linktitle: Modul 1
tags: [apps, training, datamodel, texts]
weight: 10
---

I denne modulen skal du opprette selve tjenesten, sette opp noen enkle innstillinger, lage en datamodell og sette 
opp et enkelt skjema basert på kravene fra Sogndal kommune.

**Temaer som dekkes i denne modulen:**

- Opprette ny tjeneste
- Lage datamodell
- Legge til skjemakomponenter og koble dem til datamodell
- Redigering av tekster i skjema

## Oppgaver

{{% expandlarge id="opprette-ny-tjeneste" header="Opprette ny tjeneste" %}}

### Krav fra kommunen

Tjenesten må ha en beskrivende ID som gjør det enkelt å finne den igjen blant det store antallet
tjenesteer Sogndal kommune har i Altinn Studio.

{{% notice info %}}
Dersom du skal teste appen i et [testmiljø](/nb/app/testing/deploy/) (beskrevet i [Modul 5](/nb/altinn-studio/getting-started/app-dev-course-v2/modul5/)) må du velge en organisasjon som eier.
Du må ha [tilgang til organisasjonen](/nb/altinn-studio/getting-started/create-user/#bli-del-av-en-organisasjon) og organisasjonen må ha tilgang til et testmiljø.
 {{% /notice %}}

### Oppgaver

1. Opprett tjeneste i Altinn Studio

### Nyttig dokumentasjon

- [Brukerveiledning - lag en enkel tjeneste](/nb/altinn-studio/guides/basic-form)
- [Navigere Altinn Studio](/nb/altinn-studio/getting-started/navigation)
- [Altinn Studio Dashboard](/nb/altinn-studio/getting-started/navigation/dashboard/)

{{% /expandlarge %}}

{{% expandlarge id="oppdatere-app-tittel" header="Sett en tittel for tjenesten" %}}
Tjenesten har en id som identifiserer den, men mangler en beskrivende tittel. 
Tittel kan endres i "Innstillinger"-menyen til venstre i toppmenyen.

### Krav fra kommunen
- Det er viktig at tjenestens visningsnavn klinger godt og er beskrivende for tjenesten.

### Oppgaver

1. Endre visningstittel til tjenesten.
2. Last opp dine endringer til det sentrale filområdet til tjenesten ved å trykke på "Last opp 
dine endringer" til høyre i toppmenyen.
  a. Skriv inn en beskrivende melding om hva som er gjort, f.eks. "Opprettet tjeneste og endret tittel"

{{% notice info %}}
Det er lurt å laste opp endringer jevnlig. Når du jobber med en tjeneste i Altinn Studio jobber du med
en kopi som er tilgjengelig kun for din bruker. Ved å laste opp endringene lagres de sentralt og kan hentes
ut av andre.

Fordi du jobber på en egen kopi av tjenesten kan du prøve deg litt frem, det er ikke farlig å gjøre feil! 
Er du misfornøyd med de siste endringene kan du slette de og tilbakestille tjenesten til det som ligger i det
sentrale filområdet til tjenesten. Dette gjøres via menyen helt til høyre ved siden av 
"Last opp dine endringer". Velg så lokale endringer, og "slett lokale endringer".
{{% /notice %}}
 
### Nyttig dokumentasjon

- [Brukerveiledning - lag en enkel tjeneste](/nb/altinn-studio/guides/basic-form)
{{% /expandlarge %}}

{{% expandlarge id="legge-til-datamodell" header="Lage datamodell" %}}

Datamodellen definerer hvilke data man forventer å samle inn, og hvilket format disse skal være på. 
> _Man kan se på en datamodell som en innholdsfortegnelse for skjemaet._

Med Altinn Studios [verktøy for datamodellering](/nb/altinn-studio/reference/data/data-modeling/)
 kan du legge til en datamodell ved å [laste opp en ferdig datamodell i form av en _xsd_-fil](/nb/altinn-studio/reference/data/data-modeling/#laste-opp-og-vise-datamodell)
  eller [lage en ny datamodell](/nb/altinn-studio/reference/data/data-modeling/#lage-ny-datamodell) fra bunnen av.
I denne oppgaven skal du lage en enkel modell fra bunnen av.

Merk at en helt enkel datamodell med noen eksempel-felter nå er en del av malen som lastes inn når 
man oppretter en tjeneste.

### Krav fra kommunen

Kommunen ønsker i første omgang å samle inn følgende data om innflyttere:
- Personinformasjon
  - Fornavn
  - Mellomnavn (valgfritt)
  - Etternavn
  - Alder
- Adresse
  - Gateadresse
  - Postnummer
  - Poststed
- Kontaktinformasjon
  - Epost
  - Telefon

### Oppgaver

1. Naviger til Datamodell-verktøyet og se at det ligger en datamodell der som ble lastet inn da tjenesten
ble opprettet. Datamodellen inneholder 3 eksempel-felter.
2. Klikk på det første feltet, `property1`. Det dukker da opp en del redigeringsmuligheter i høyre-panelet.
3. Endre navnet på feltet `property1` til `fornavn`, og huk av for at det skal være påkrevd.
4. Endre navnet på feltet `property2` til `mellomnavn`, og pass på at det ikke er satt som påkrevd.
5. Endre navnet på feltet `property3` til `etternavn` og huk av for at det skal være påkrevd.
6. Nå er det på tide å legge til et nytt felt i datamodellen, ikke bare endre de som ligger der fra før. 
Ved siden av modell-navnet øverst på modellen er det en knapp som heter "+ Legg til..." - trykk på den.
_Velg "Heltall" fra menyen._
1. Se at et heltall-felt legges til i datamodellen. Endre navnet på dette feltet til `alder` og sett som påkrevd.
2. Legg til et nytt felt på samme måte som over, men av typen "Tekst". Endre navnet til `gateadresse` og sett som påkrevd.
3. Fortsett på denne måten til du har lagt til alle feltene som kommunen ber om. Du kan anta at alle felter skal være 
tekst-felter, og ev. bruke heltall der det gir mening. 
1.  Når alle feltene er lagt til, klikk på "Generer modeller" i menylinjen til datamodell-verktøyet.
  Dette sikrer at alle modell-filer som tjenesten lages ut fra modellen du har bygd opp.
1.  Pass på å _laste opp dine endringer_ når du er ferdig. 

### Nyttig dokumentasjon

- [Brukerveiledning - lag en enkel tjeneste](/nb/altinn-studio/guides/basic-form)

{{% /expandlarge %}}

{{% expandlarge id="legge-til-komponenter" header="Lage skjema" %}}

Du kan sette opp skjemaet fra "Lage"-siden. Naviger til denne via "Lage"-knappen i topp-menyen.

Der ser du at det er opprettet en tom første-side for skjemaet som utgangspunkt.

Skjemaet innhenter personlig informasjon om tilflytteren og skal ha følgende komponenter:
- Navn
  - Fornavn
  - Mellomnavn (valgfritt)
  - Etternavn
- Alder
- Adresse
  - Gateadresse
  - Postnummer
  - Poststed
- Kontaktinformasjon
  - Epost
  - Telefon

### Oppgaver

1. Sett opp skjemaet basert på kravene fra kommunen.
   - Pass på å legge inn ledetekster for alle skjemafelter.
   - For adresse kan du bruke Adresse-komponenten som ligger under "Avansert", eller 3 tekstfelter.
   - For at skjemaet skal kunne sendes inn må du legge til en "Knapp" på den siste siden.
   - Alle skjemafelter må knyttes til tilhørende felt i datamodellen - dette gjør du i "Datamodellknytninger"-seksjonen
      i høyre-panelet.

Husk å laste opp endringer når du jobber i Designer så de reflekteres i det sentrale filområdet til tjenesten.

### Nyttig dokumentasjon

- [Brukerveiledning - lag en enkel tjeneste](/nb/altinn-studio/guides/basic-form)
- [Tilgjengelige komponenter i Altinn Studio](/altinn-studio/designer/build-app/ui-designer/components/)
- [Retningslinjer for bruk av komponenter](/nb/altinn-studio/guides/design/guidelines/components/)

{{% /expandlarge %}}

## Oppsummering

I denne modulen har du opprettet en tjeneste i Altinn Studio,
lagd en datamodell og satt opp et skjema som kobler komponenter til feltene i datamodellen.

{{% center %}}
[Neste modul >>](../modul2/)
{{% /center %}}
