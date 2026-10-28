---
title: Persistensarkitektur for Access Management
linktitle: Persistensarkitektur
description: Databaseskjemaer, tabeller, revisjonshistorikk og bloblagring i Access Management.
weight: 2
toc: true
---

Persistensarkitekturen viser både den nyere EF-baserte modellen og de eldre skjemaene som fortsatt brukes. Modellen bygger på [EF-snapshoten og SQL-migreringene i kildecommit `20fcb3f`](https://github.com/Altinn/altinn-authorization-tmp/tree/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src).

Klikk på et diagram for å åpne det i full størrelse i en ny fane.

## Lagringsoversikt

<a href="./storage-overview.svg" target="_blank" rel="noopener"><img src="./storage-overview.svg" alt="Lagringsoversikt for Access Management" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Skjemaet `dbo`

`dbo` er delt i to diagrammer fordi skjemaet har 34 tabeller.

### Katalog og metadata

<a href="./dbo-catalog-schema.svg" target="_blank" rel="noopener"><img src="./dbo-catalog-schema.svg" alt="Katalog- og metadatatabeller i dbo" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

Tabellene beskriver parter, tilbydere, ressurser, roller, områder og tilgangspakker. Koblingstabellene uttrykker hvilke roller som gir pakker og ressurser.

### Tilgangsforhold og drift

<a href="./dbo-access-schema.svg" target="_blank" rel="noopener"><img src="./dbo-access-schema.svg" alt="Tilgangs- og driftstabeller i dbo" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

Denne delen inneholder tildelinger, delegeringer, forespørsler, instans- og ressurskoblinger, utboks, feilkø og importfremdrift. Visningen `connections` projiserer forbindelser på tvers av tildelinger og delegeringer, men er ikke en tabell.

## Skjemaet `dbo_history`

<a href="./dbo-history-schema.svg" target="_blank" rel="noopener"><img src="./dbo-history-schema.svg" alt="Revisjonstabeller i dbo_history" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

De 27 revisjonstabellene lagrer gyldighetsperiode, endringsoperasjon og parten eller systemet som utførte endringen, sammen med en kopi av domenefeltene.

## Skjemaet `consent`

<a href="./consent-schema.svg" target="_blank" rel="noopener"><img src="./consent-schema.svg" alt="Samtykketabeller i consent" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

Skjemaet har seks tabeller for samtykkeforespørsler, rettigheter, hendelser, språkontekst, metadata og ressursattributter. Flere koblinger håndheves logisk og mangler fremmednøkler i baseline-skriptet.

## Eldre skjemaer

### `delegation`

<a href="./delegation-schema.svg" target="_blank" rel="noopener"><img src="./delegation-schema.svg" alt="Eldre delegeringstabeller" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

De tre endringstabellene peker til policyblobens sti og versjon og lagrer identitetene som inngår i delegeringen.

### `accessmanagement`

<a href="./accessmanagement-schema.svg" target="_blank" rel="noopener"><img src="./accessmanagement-schema.svg" alt="Eldre ressurstabell i accessmanagement" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

Skjemaet inneholder ressursoppslaget som `resourceregistrydelegationchanges` refererer til.

## Blobcontainer

`MetadataContainer` angir containeren for XACML-policyblobber. Standardkonfigurasjonen bruker `metadata`. PostgreSQL lagrer policyens sti og versjons-ID, mens blob leases samordner oppdateringer. Kontonavn og containernavn kan variere mellom miljøene.

## Avgrensning og vedlikehold

EF-diagrammene er generert fra `AppDbContextModelSnapshot` og viser sentrale kolonner. Revisjonsfelter er samlet som `Audit_*`. Indekser, kontrollregler, triggere, funksjoner og alle fremmednøklinavn er utelatt for lesbarhet. Oppdater diagrammene og kildecommitten når EF-snapshoten, SQL-migreringene eller blobkonfigurasjonen endres.