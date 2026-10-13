---
draft: true
title: Felter i prefill.json-filen
linktitle: prefill.json-filen
description: Oversikt over felter i konfigurasjonsfil for forhåndsutfylling
tags: [needsReview]
---

## `$schema`
`$schema` peker på [json schema-definisjonen](https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json) til filen. 
Nåværende versjon er v1. Visual Studio Code vil på grunn av denne validere og tilby intellisense/autocomplete når du 
redigerer filen lokalt.

## `allowOverwrite`
`allowOverwrite` avgjør om forhåndsutfylling definert i denne filen kan overskrive et felt i datamodellen hvis det 
allerede har en verdi. Standardverdien er `false`, så appen overskriver ikke felt som har en verdi hvis du ikke setter den til `true`.

## `ER`
`ER` - her legger du inn felter fra datamodellen som skal forhåndsutfylles med data fra Enhetsregisteret. Felter som 
forhåndsutfylles med ER-data får kun en verdi hvis du starter appen på vegne av en organisasjon. Starter du appen på vegne av en person, hopper appen over feltene fra ER og skriver en feilmelding i loggen.

## `DSF`
`DSF` - her legger du inn felter fra datamodellen som skal forhåndsutfylles med data fra Folkeregisteret. Felter som 
forhåndsutfylles med DSF-data får kun en verdi hvis du starter appen på vegne av en person. Starter du appen på vegne av en organisasjon, hopper appen over feltene fra DSF og skriver en feilmelding i loggen.

## `UserProfile`
`UserProfile` - her legger du inn felter fra datamodellen som skal forhåndsutfylles med data fra brukerens profil i 
 Altinn. Merk at det er den innloggede brukeren som starter appen, som du henter ut data for.
