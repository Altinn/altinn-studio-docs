---
draft: true
title: Nøkkeltall for publiserte apper
linktitle: Nøkkeltall
description: Hva tallene på siden Publiserte apper i Altinn Studio betyr, hvor de kommer fra, og hvem som ser dem.
toc: true
weight: 60
tags: [needsReview, translate]
---

Siden **Publiserte apper** i Altinn Studio viser hvordan appene dine blir brukt i hvert miljø: hvor mange instanser brukerne starter og fullfører, hvor lang tid de typisk bruker, og hvilke apper som trenger oppmerksomhet. Denne siden forklarer hva hvert tall betyr, hvor det kommer fra, og hvem som har tilgang.

Du finner siden under menypunktet **Publiserte apper** øverst i Altinn Studio, eller på
`https://altinn.studio/admin/{org}` (erstatt `{org}` med organisasjonskoden din).

## Hvem ser tallene

Du må være medlem av et team i organisasjonen din som heter `Admin-` etterfulgt av navnet på miljøet, for eksempel `Admin-Production` for produksjon og `Admin-TT02` for testmiljøet TT02. Teamet trenger ingen tilgang til repositorier; det er medlemskapet som gir tilgang til siden.

Eierne av organisasjonen oppretter teamet og legger til medlemmer. [Slik administrerer du team i Altinn Studio](/nb/altinn-studio/v9/manage-a-service/access-management/studio/).

## Hvor tallene kommer fra

Hver natt henter Altinn Studio tallene for gårsdagen fra lagringstjenesten i Altinn, app for app, og lagrer dem per dag. Siden summerer disse dagstallene når du åpner den. Derfor står det øverst på siden hvilken dag tallene gjelder til og med, og når de sist ble hentet, for eksempel «Tall per 10. november 2026, oppdatert 11.11.2026, 03:30».

Altinn Studio regner døgnet etter UTC, altså norsk tid minus én time om vinteren og to om sommeren. En instans som brukeren startet klokken 00:30 norsk tid 11. november, teller derfor på 10. november.

Feil er unntaket: dem henter siden direkte fra loggene hver gang du åpner den, og de dekker alltid de siste sju dagene.

Innsamlingen gjelder produksjon og TT02. Testmiljøene AT og YT har ingen nøkkeltall.

## Hva tallene betyr

### Periode

Velgeren **Periode** øverst styrer alle tallene på siden, både feltene og tabellen. Du kan velge siste 7, 30 eller 90 dager. Perioden slutter på den siste dagen det finnes tall for, ikke i dag. Hvis innsamlingen feilet en natt, blir perioden ikke kortere; den siste dagen med tall står i stempelet øverst.

### Feltene øverst

| Felt | Betyr |
|---|---|
| Apper i miljøet | Hvor mange apper som er publisert i miljøet, og hvor mange av dem som fikk minst én ny instans i perioden. |
| Instanser opprettet | Hvor mange instanser brukerne startet i perioden, med endring i prosent mot like mange dager rett før perioden. |
| Instanser fullført | Hvor mange instanser som ble fullført i perioden, og hvor stor andel det er av de opprettede i samme periode. En instans er fullført når prosessen er avsluttet og instansen er arkivert. |
| Apper med avvik | Hvor mange apper som har feil eller står uten bruk. Se [Avvik](#avvik). |

### Kolonnene i tabellen

| Kolonne | Betyr |
|---|---|
| Navn | Appens navn, med lenke til detaljsiden for appen. |
| Versjon | Versjonen av appen som er publisert i miljøet nå. |
| Instanser siste X d | Instanser brukerne startet i perioden. Under tallet står typisk tid til fullført for instansene som ble fullført i perioden. |
| Avvik | Feil og apper uten bruk. Tom når alt er i orden. |

Du kan sortere på alle kolonnene ved å klikke på overskriften. Som standard står appene med avvik øverst.

### Typisk tid til fullført

«Typisk tid» er medianen: halvparten av instansene ble fullført raskere, halvparten brukte lenger tid. Vi bruker medianen i stedet for gjennomsnittet fordi noen få instanser som ligger åpne i uker ellers ville dratt tallet langt opp.

Tiden går fra brukeren startet instansen til prosessen ble avsluttet. Altinn Studio regner medianen per dag og veier dagene etter hvor mange instanser som ble fullført, så en dag med mange fullførte teller mer enn en dag med få.

### Avvik

Kolonnen **Avvik** viser bare det du som tjenesteeier kan gjøre noe med selv:

- **Feil**: appen har hatt feil i løpet av de siste sju dagene, enten når brukere prøvde å starte en instans eller når de prøvde å gå videre i prosessen. Tallet er antall feilende kall, og lenken **Se logger her** tar deg til loggene.
- **Uten bruk**: ingen bruker har startet en instans i appen på over 90 dager. Tallet sier hvor mange måneder det er siden. En app uten bruk koster fortsatt drift, så vurder om du bør [avpublisere den](/nb/altinn-studio/v9/manage-a-service/undeploy/).

Hvis innsamlingen startet for mindre enn 90 dager siden, regner Altinn Studio fra den første dagen det finnes tall for. En app blir derfor ikke merket som uten bruk før det faktisk har gått 90 dager uten at vi kan ha sett en instans.

## Detaljsiden for en app

Når du klikker på en app, ser du i tillegg

- **typisk tid til fullført** for de siste 30 dagene, uavhengig av velgeren i kortet **Statistikk fra siste**, som går helt ned til fem minutter
- **utrullinger** tegnet inn i grafene over påbegynte og fullførte instanser: en stiplet strek med versjonsnummeret over for hver utrulling i perioden, grå strek for avpublisering, og en liste under grafen med tidspunkt, versjon og hvem som publiserte

Slik kan du se om en ny versjon endret hvor mange som starter eller fullfører.

## Hva tallene ikke viser

- **Åpne instanser**, altså instanser som ikke er fullført ennå, og hvilket steg de står på. Du finner dem i instanslisten på detaljsiden, med filteret for instanser eldre enn et visst antall dager.
- **Innsendinger tjenesteeieren ikke har bekreftet**. Bruk filteret **Bekreftet mottatt** i instanslisten.
- **Lagringsplass** per app.
- **Versjonen av app-biblioteket** i listen. Den står på detaljsiden under **Informasjon om appen**.

## For Altinn Studio-teamet: Plattform

Menypunktet **Plattform** viser de samme tallene for alle tjenesteeiere i ett miljø, samlet per tjenesteeier, og en liste over alle apper med filter for apper uten bruk. Her går grensen for uten bruk ved 180 dager.

Menypunktet vises bare for medlemmer av teamet `Studio-Platform` i organisasjonen `ttd`. Det er for dem som drifter Altinn Studio, ikke for tjenesteeiere.
