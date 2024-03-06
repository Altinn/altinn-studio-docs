---
title: Modul 1
description: Opprette app og lage enkelt skjema
linktitle: Modul 1
tags: [apps, training, datamodel, texts]
weight: 20
---

I denne modulen skal du opprette selve applikasjonen, sette opp noen enkle innstillinger, lage en datamodell og sette 
opp et enkelt skjema basert på kravene fra Sogndal kommune.

**Temaer som dekkes i denne modulen:**

- Opprette ny applikasjon
- Lage datamodell
- Legge til skjemakomponenter og koble dem til datamodell
- Redigering av tekster i skjema

## Oppgaver

{{% expandlarge id="opprette-ny-applikasjon" header="Opprette ny applikasjon" %}}

Applikasjoner opprettes fra [Altinn Studio Dashboard](/nb/app/getting-started/navigation/dashboard/).

### Krav fra kommunen

Applikasjonen må ha en beskrivende ID som gjør det enkelt å finne den igjen blant det store antallet
applikasjoner Sogndal kommune har i Altinn Studio.

{{% notice info %}}
Dersom du skal teste appen i et [testmiljø](/nb/app/testing/deploy/) (beskrevet i [Modul 3](/nb/app/app-dev-course/modul3/)) må du velge en organisasjon som eier.
Du må ha [tilgang til organisasjonen](/nb/app/getting-started/create-user/#bli-del-av-en-organisasjon) og organisasjonen må ha tilgang til et testmiljø.
 {{% /notice %}}

### Oppgaver

1. [Opprett applikasjon i Altinn Studio](/nb/app/getting-started/create-app/)

### Nyttig dokumentasjon

- [Navigere Altinn Studio](/nb/app/getting-started/navigation)
- [Altinn Studio Dashboard](/nb/app/getting-started/navigation/dashboard/)

{{% /expandlarge %}}

{{% expandlarge id="oppdatere-app-tittel" header="Sett en tittel for tjenesten" %}}
Applikasjonen har en id som identifiserer den, men mangler en beskrivende tittel. 
Tittel kan endres i "Innstillinger"-menyen til venstre i toppmenyen.

### Krav fra kommunen
- Det er viktig at applikasjonens visningsnavn klinger godt og er beskrivende for tjenesten.

### Oppgaver

1. Endre visningstittel til applikasjonen.
2. Last opp dine endringer til det sentrale filområdet til applikasjonen ved å trykke på "Last opp 
dine endringer" til høyre i toppmenyen.
  a. Skriv inn en beskrivende melding om hva som er gjort, f.eks. "Opprettet applikasjon og endret tittel"

{{% notice info %}}
Det er lurt å laste opp endringer jevnlig. Når du jobber med en applikasjon i Altinn Studio jobber du med
en kopi som er tilgjengelig kun for din bruker. Ved å laste opp endringene lagres de sentralt og kan hentes
ut av andre.

Fordi du jobber på en egen kopi av applikasjonen kan du prøve deg litt frem, det er ikke farlig å gjøre feil! 
Er du misfornøyd med de siste endringene kan du slette de og tilbakestille applikasjonen til det som ligger i det
sentrale filområdet til applikasjonen. Dette gjøres via menyen helt til høyre ved siden av 
"Last opp dine endringer". Velg så lokale endringer, og "slett lokale endringer".
{{% /notice %}}
 
### Nyttig dokumentasjon

- [Innstillinger-menyen](/nb/app/getting-started/create-app/settings/#om-applikasjonen)
{{% /expandlarge %}}

{{% expandlarge id="legge-til-datamodell" header="Lage datamodell" %}}

Datamodellen definerer hvilke data man forventer å samle inn, og hvilket format disse skal være på. 
> _Man kan se på en datamodell som en innholdsfortegnelse for skjemaet._

Med Altinn Studios [verktøy for datamodellering](/nb/app/development/data/data-modeling/)
 kan du legge til en datamodell ved å [laste opp en ferdig datamodell i form av en _xsd_-fil](/nb/app/development/data/data-modeling/#laste-opp-og-vise-datamodell)
  eller [lage en ny datamodell](/nb/app/development/data/data-modeling/#lage-ny-datamodell) fra bunnen av.
I denne oppgaven skal du lage en enkel modell fra bunnen av.

Merk at en helt enkel datamodell med noen eksempel-felter nå er en del av malen som lastes inn når 
man oppretter en applikasjon.

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

1. Naviger til Datamodell-verktøyet og se at det ligger en datamodell der som ble lastet inn da applikasjonen
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
  Dette sikrer at alle modell-filer som applikasjonen lages ut fra modellen du har bygd opp.
1.  Pass på å _laste opp dine endringer_ når du er ferdig. 

### Nyttig dokumentasjon

- [Altinn Studio Datamodellering](/nb/app/getting-started/create-app/datamodel)

{{% /expandlarge %}}

{{% expandlarge id="legge-til-komponenter" header="Lage skjema" %}}

Du kan sette opp skjemaet fra "Lage"-siden. Naviger til denne via "Lage"-knappen i topp-menyen.

Der ser du at det er opprettet en tom første-side for skjemaet som utgangspunkt.

### Krav fra kommunen
{{% expandsmall id="m1-form-k1" header="Første side" %}}
Første side skal være en informasjonsside. Noen i kommunen har opprettet en skisse av informasjonssiden.

Følgende er det ønskelig at reflekteres i applikasjonen:
 - Plassering av bilder
 - Tekststørrelser
 - Formatering av tekst

[Skisse på informasjonsside](/app/app-dev-course/modul2/infoside_tilflyttere.pdf)

!["Sogndal kommunevåpen"](/app/app-dev-course/modul2/kommune-logo.png "Et bilde av Sogndals kommunevåpen som kan benyttes i applikasjonen" )
{{% /expandsmall %}}

{{% expandsmall id="m1-form-k2" header="Andre side" %}}
Andre skjemaside innhenter personlig informasjon om tilflytteren og skal ha følgende komponenter:
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

{{% /expandsmall %}}

### Oppgaver

1. Sett opp den første siden (informasjonssiden) basert på kravene fra kommunen.
   - Komponenter for tekster finner du under "Tekst"-seksjonen i komponentoversikten til venstre.
   - Komponenter dras inn i skjemasiden fra oversikten.
   - Klikk på en komponent på skjemasiden for å få opp redigeringsmuligheter i høyre-panelet.
   - Når komponenten har nødvendig konfigurasjon satt opp vil den dukke opp i forhåndsvisningen helt til høyre.
   - For å begrense bredden til en komponent brukes 
2. Legg til en ny side i skjemaet ved å trykke på "Legg til ny side".
   - Merk at navigasjonsknapper mellom sidene automatisk legges til på sidene. 
3. Sett opp den andre siden (skjemasiden) basert på kravene fra kommunen.
   - Pass på å legge inn ledetekster for alle skjemafelter.
   - For adresse kan du bruke Adresse-komponenten som ligger under "Avansert", eller 3 tekstfelter.
   - For at skjemaet skal kunne sendes inn må du legge til en "Knapp" på den siste siden.
   - Alle skjemafelter må knyttes til tilhørende felt i datamodellen - dette gjør du i "Datamodellknytninger"-seksjonen
      i høyre-panelet.

Husk å laste opp endringer når du jobber i Designer så de reflekteres i det sentrale filområdet til applikasjonen.

### Nyttig dokumentasjon

- [Hvordan bygge et skjema med UI editor i Altinn Studio](/nb/app/getting-started/)
- [Tilgjengelige komponenter i Altinn Studio](/altinn-studio/designer/build-app/ui-designer/components/)
- [Retningslinjer for bruk av komponenter](/nb/app/guides/design/guidelines/components/)

{{% /expandlarge %}}

## Oppsummering

I denne modulen har du opprettet en applikasjon i Altinn Studio,
lagd en datamodell og satt opp to skjemasider som kobler komponenter til noen av feltene i datamodellen.

## Løsningsforslag

[Kildekode Modul 1](https://altinn.studio/repos/testdep/flyttemelding-sogndal/src/branch/modul1)<br>

{{% notice info %}}
Løsningsforslag kommer
{{% /notice %}}


<br><br>

{{% center %}}
[Neste modul >>](../modul2/)
{{% /center %}}
