---
draft: true
title: Ordliste for tjenesteutvikling
linktitle: Ordliste
description: Forklaringer av tekniske ord og begreper som brukes i dokumentasjonen om tjenesteutvikling i Altinn Studio.
weight: 999
tags: [needsReview, needsTranslation]
---

Denne siden inneholder forklaringer av tekniske ord og begreper som vi bruker i dokumentasjonen om tjenesteutvikling i Altinn Studio. Ordene er sortert alfabetisk.

## A

### App
En tjeneste eller applikasjon utviklet i Altinn Studio. Vi bruker dette begrepet konsekvent i stedet for "applikasjon" i dokumentasjonen.

**Eksempel:** Du kan konfigurere appen til å sende e-postvarslinger.

### Autorisasjonspolicy
Regler som styrer hvem som har tilgang til å gjøre hva i en app.

**Eksempel:** Du må oppdatere autorisasjonspolicyen for å gi tjenesteeier tilgang til beskyttede data.

## B

### Beskyttede data
Data som krever ekstra tilgangskontroll utover vanlig autorisasjon.

**Eksempel:** Du bør konfigurere personopplysninger og klassifisert informasjon som beskyttede data.

### Betaling
Funksjonalitet for å integrere betalingsløsninger i en app.

### Bruker
Person som bruker eller fyller ut en app. Tidligere kalt "sluttbruker", men vi bruker nå det enklere "bruker".

## D

### Datamodell
Strukturen som definerer hvilke data som kan lagres og behandles i en app.

### Dataprosessering
Automatisk behandling av data på serveren, for eksempel kalkuleringer eller validering.

### Dynamikk
Funksjonalitet som gjør at elementer i et skjema endres basert på brukerens input, for eksempel at felt skjules eller vises.

## F

### Filtrering
Funksjonalitet for å fjerne eller skjule visse svaralternativer basert på betingelser eller dynamiske uttrykk.

**Eksempel:** Du kan filtrere bort kommuner som ikke ligger i det valgte fylket.

### Forhåndsutfylling
Automatisk utfylling av skjemafelt med data fra registre eller andre kilder før brukeren begynner å fylle ut.

**Også kjent som:** Prefill (teknisk term)

### Forhåndsvalg
Et svaralternativ som velges automatisk når komponenten vises for første gang.

**Eksempel:** I en liste med leveringsalternativer kan "Hjemlevering" være forhåndsvalgt.

### Frontend
Den delen av appen som brukeren ser og samhandler med i nettleseren.

## H

### Hemmelighet
Sensitiv konfigurasjonsinformasjon (som passord eller API-nøkler) som lagres sikkert i Azure Key Vault.

**Eksempel:** Du må lagre Maskinporten-nøklene som hemmeligheter i Azure Key Vault.

## I

### Instans
Et konkret eksempel av en app som opprettes for en spesifikk bruker eller organisasjon.

## K

### Kodeliste
En liste med koder og tilhørende verdier som du bruker som kilde til svaralternativer. Kan være statiske (fra JSON-fil), dynamiske (genereres fra C#-kode), fra repeterende strukturer i datamodellen, eller felles standard kodelister (som land, fylker, kommuner).

**Eksempel:** Du kan hente kommunekodelisten fra SSB og bruke den i en nedtrekksliste.

**Se også:** Svaralternativer

## L

### Layout
Visningen og plasseringen av komponenter på en side i appen.

### Ledetekst
Teksten som du viser til brukeren for et felt, en komponent eller et svaralternativ. Også kalt "label" i kode og konfigurasjon.

**Eksempel:** For et svaralternativ med verdi "NO" kan ledeteksten være "Norge".

## M

### Maskinporten
Digdirs autentiseringstjeneste for maskin-til-maskin-kommunikasjon.

**Eksempel:** Du må konfigurere Maskinporten for at appen skal kunne utføre handlinger på vegne av tjenesteeier.

## O

### Oppsummering
En oversiktsside som viser all informasjon brukeren har fylt ut før innsending.

## R

### Repeterende gruppe
En gruppe felt som du kan gjenta flere ganger i et skjema, for eksempel for å legge til flere familiemedlemmer. Du kan også bruke den repeterende strukturen i datamodellen som kilde til svaralternativer.

**Eksempel:** Du kan bruke en repeterende gruppe med kjæledyr som kodeliste for å velge hvilket kjæledyr som skal vaksineres.

## S

### Signering
Funksjonalitet for elektronisk signering av data i en app.

### Stateless app
En app som ikke lagrer data permanent, typisk brukt for innsynstjenester.

**Også kjent som:** Tilstandsløs app, innsynstjeneste

### Svaralternativer
Valgmuligheter brukeren kan velge fra, for eksempel i en nedtrekksliste eller radioknapper. Du kan sette dem direkte i komponentkonfigurasjonen eller hente dem fra en kodeliste. Hvert svaralternativ består av en verdi (som du lagrer i datamodellen) og en ledetekst (som du viser til brukeren).

**Eksempel:** En nedtrekksliste med fylker har svaralternativer der hver verdi er fylkesnummeret og ledeteksten er fylkesnavnet.

**Se også:** Kodeliste

### Spørringsparametre
Verdier som du sender med når appen henter en kodeliste. Du bruker dem for å filtrere eller tilpasse innholdet i kodelisten basert på kontekst eller brukerens valg.

**Eksempel:** Du kan sende fylkesnummer som spørringsparameter for å få bare kommunene i det valgte fylket.

## T

### Tjenesteeier
Organisasjonen som eier og drifter en app i Altinn.

**Eksempel:** Tjenesteeier kan gi tilgang til logger og hemmeligheter for sine ansatte.

## U

### Underskjema
Et mindre skjema som du kan gjenbruke i flere apper eller flere steder i samme app.

### Utforming
GUI-fanen i Altinn Studio der du designer og konfigurerer skjemaet.

**Tidligere kjent som:** "Lage"-fanen

## V

### Validering
Kontroll av at data brukeren har fylt inn er korrekte og følger reglene du har satt opp.
