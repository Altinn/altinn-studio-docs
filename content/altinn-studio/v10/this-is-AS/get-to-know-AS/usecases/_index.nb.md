---
draft: false
title: Hva kan du lage med Altinn Studio
description: En oversikt over de ulike bruksområdene for apper utviklet med Altinn Studio
weight: 30
tags: [needsReview]
---

Med Altinn Studio kan du lage mange ulike typer digitale tjenester. Her er en oversikt over hovedkategoriene, som kan brukes hver for seg eller kombineres:

## 1. Skjematjenester
Det klassiske: brukere fyller inn og sender inn data på vegne av seg selv, andre personer eller sin bedrift. Disse tjenestene støtter:
- Strukturert datainnsamling
- Automatisk validering og kontroll
- Forhåndsutfylte data fra offentlige registre
- Vedleggsopplasting med virusskanning
- PDF-kvittering som genereres automatisk

**Eksempler på skjematjenester:**
- Skattemeldingen
- Søknad om byggegodkjenning
- Søknad om adopsjon
- Registrering av fiskerinæring

## 2. Innsynstjenester
Tjenester som gir brukere tilgang til eksisterende data uten at de trenger å sende inn noe:
- Innsyn i skattedata
- Oversikt over tillatelser og rettigheter
- Status på saksbehandling
- Historikk over tidligere innsendte data

**Eksempler på innsynstjenester:**
- Dine roller og rettigheter
- Mine meldinger
- Mine tillatelser i landbruk
- Skatteoppgjør og betalingsoversikt

## 3. Veiledningstjenester
Interaktive tjenester som veileder brukeren gjennom prosesser for å gi skreddersydde svar eller anbefalinger. Disse tjenestene kan:
- Fungere uten pålogging for allmenne spørsmål
- Gi tilpassede svar basert på brukerens situasjon
- Lede brukeren til riktige tjenester eller ressurser
- Forenkle komplekse regelverk

**Eksempler på veiledningstjenester:**
- Veiviser for byggesøknader
- Guide for valg av riktig søknadsskjema
- Kalkulator for beregning av avgifter eller støtteordninger

## 4. Betalingstjenester
Apper som inkluderer betalingsfunksjonalitet for gebyrer, avgifter eller andre offentlige tjenester:
- Integrert betalingsløsning
- Automatisk beregning av beløp
- Kvittering og dokumentasjon
- Oppfølging av betalingsstatus

**Eksempler på betalingstjenester:**
- Betaling av gebyr for byggesøknad
- Betaling av årlig registreringsavgift
- Kjøp av offentlige dokumenter

## 5. Signeringstjenester
Tjenester som krever elektronisk signatur for juridisk gyldige dokumenter:
- Enkel signering av enkeltpersoner
- Flerpartssignering med definerte roller
- Delegering av signeringsrettigheter
- Sikker oppbevaring av signerte dokumenter

**Eksempler på signeringstjenester:**
- Signering av årsregnskap
- Underskrift på søknader med flere parter
- Godkjenning av juridiske avtaler

## 6. Sammenhengende tjenester
Komplekse tjenester som består av flere skjemaer, delprosesser og involverer flere brukere:
- Arbeidsflyt som spenner over flere steg
- Ulike brukerroller med forskjellige rettigheter
- Integrasjoner mellom etater
- Kompleks prosessstyring

**Eksempler på sammenhengende tjenester:**
- Søknader med saksbehandling hos flere etater
- Prosesser som krever godkjenning fra flere aktører
- Tjenester med automatisk videreformidling mellom myndigheter

## 7. API-baserte tjenester
Tjenester som tilbyr både brukergrensesnitt og programmatisk tilgang:
- REST API for maskin-til-maskin-kommunikasjon
- Støtte for store datamengder
- Samme datamodell og valideringer som webgrensesnitt
- Automatisert dataoverføring

**Eksempler på API-baserte tjenester:**
- Maskinell innrapportering av regnskapsdata
- Automatisk overføring av statistikk fra fagsystemer
- Integrasjon med eget saksbehandlingssystem

## 8. Rapporterings- og analysetjenester
Apper som samler inn data for statistikk og analyse:
- Periodiske rapporter
- Datainnsamling for forskning
- Kvalitetssikring og oppfølging
- Dashboards og visualiseringer

**Eksempler på rapporterings- og analysetjenester:**
- Innrapportering av miljødata
- Statistikkskjemaer for næringsliv
- Periodiske rapporter om virksomhetsaktivitet

## 9. Skreddersydde applikasjoner
Siden hver Altinn Studio-app er en fullverdig ASP.NET Core-applikasjon, kan den tilpasses for spesielle behov:
- Integrasjoner med organisasjonens egne systemer
- Spesialtilpasset brukergrensesnitt
- Avansert forretningslogikk
- Tilkobling til eksterne databaser og tjenester

**Eksempler på skreddersydde applikasjoner:**
- Portal med sanntidsdata fra eksterne kilder
- Komplekse kalkulatorer med spesialtilpasset logikk
- Tjenester med avansert tilgangsstyring og rollebasert funksjonalitet

## Tekniske muligheter

Alle disse bruksområdene drar nytte av Altinn Studios innebygde funksjoner:
- **Tilgjengelighet**: WCAG- og ELMER 3-standarder
- **Sikkerhet**: Integrert med ID-porten og Maskinporten
- **Integrasjoner**: eFormidling, nasjonale registre, data.altinn.no
- **Fleksibilitet**: Både lavkode og tradisjonell programmering
- **Skalerbarhet**: Skybasert infrastruktur med isolerte miljøer

Altinn Studio gjør det mulig å lage alt fra enkle skjemaer til komplekse tjenestekjeder, alt avhengig av organisasjonens behov og ambisjonsnivå.
