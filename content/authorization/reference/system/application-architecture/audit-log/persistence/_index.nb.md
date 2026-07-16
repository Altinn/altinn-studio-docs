---
title: Persistensarkitektur for Audit Log
linktitle: Persistensarkitektur
description: Databaseskjemaene, hendelseskøene og partisjonsmodellen i Audit Log.
weight: 2
toc: true
---

Audit Log lagrer autentiserings- og autorisasjonshendelser i PostgreSQL. Azure Storage-køer tar imot hendelsene før funksjoner sender dem til Audit Log-API-et. Modellen bygger på [kildecommit `c070a2c`](https://github.com/Altinn/altinn-auth-audit-log/tree/c070a2c4e18ee648ed9fb8a82dc53e2889ee235e).

Klikk på et diagram for å åpne det i full størrelse i en ny fane.

## Lagringsoversikt

<a href="./storage-overview.svg" target="_blank" rel="noopener"><img src="./storage-overview.svg" alt="Lagringsoversikt for Audit Log" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

Køen `eventlog` mottar autentiseringshendelser. Køen `authorizationeventlog` mottar autorisasjonshendelser, både i eldre JSON-format og i et versjonert, Brotli-komprimert format. Azure Functions leser køene og sender hendelsene til API-et, som skriver dem til PostgreSQL.

## Skjemaet `authentication`

<a href="./authentication-schema.svg" target="_blank" rel="noopener"><img src="./authentication-schema.svg" alt="Databasemodell for authentication-skjemaet i Audit Log" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

Den aktive `eventlogv1`-tabellen lagrer autentiseringshendelser og er partisjonert på `created`. Tre oppslagstabeller beskriver hendelsestype, autentiseringsmetode og sikkerhetsnivå. Fremmednøklene er opprettet som `NOT VALID`: PostgreSQL håndhever dem for nye og endrede rader, men migreringen kontrollerte ikke eldre rader.

Den eldre `eventlog`-tabellen har de samme feltene og er en TimescaleDB-hypertabell med ett års intervall. Den finnes fortsatt i migreringene, men det aktive repositoryet skriver til `eventlogv1`.

## Skjemaet `authz`

<a href="./authz-schema.svg" target="_blank" rel="noopener"><img src="./authz-schema.svg" alt="Databasemodell for authz-skjemaet i Audit Log" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

Den aktive `eventlogv1`-tabellen lagrer beslutningsgrunnlaget, ressursen, operasjonen og PDP-avgjørelsen. `decision` er en oppslagstabell med verdiene Permit, Deny, Indeterminate og NotApplicable. Feltet `subject_party_uuid` ble lagt til etter den opprinnelige tabellmigreringen.

Den eldre `eventlog`-tabellen er en TimescaleDB-hypertabell og mangler `subject_party_uuid`. Det aktive repositoryet skriver til `eventlogv1`.

## Månedspartisjoner og oppbevaringstid

<a href="./partition-model.svg" target="_blank" rel="noopener"><img src="./partition-model.svg" alt="Partisjons- og oppbevaringsmodell for Audit Log" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

En bakgrunnstjeneste oppretter partisjoner for forrige, gjeldende og neste måned i begge skjemaene. Navnet følger mønsteret `eventlogv1_yYYYYmMM`. Tjenesten kjører ved oppstart og deretter daglig.

Sletting av gamle partisjoner styres per miljø med `EnableOldPartitionDeletion` og `RetentionMonths`. Standardkonfigurasjonen deaktiverer sletting. Produksjonskonfigurasjonen angir 24 måneder, men har også sletting deaktivert i den analyserte committen. Dokumentasjonen beskriver konfigurasjonen, ikke en juridisk eller virksomhetsmessig oppbevaringsregel.

## Avgrensning og vedlikehold

Diagrammene viser tabeller, sentrale relasjoner, køer og partisjoner. Tilgangsrettigheter, alle oppslagsverdier og TimescaleDBs interne tabeller er utelatt. Det finnes ingen blobcontainere i den analyserte persistensimplementasjonen.
