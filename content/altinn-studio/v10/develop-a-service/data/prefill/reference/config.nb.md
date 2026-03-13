---
draft: true
title: Felter i prefill.json-filen
linktitle: prefill.json-filen
description: Oversikt over felter i konfigurasjonsfil for forhåndsutfylling
tags: [needsReview, needsTranslation]
---

## `$schema`
`$schema` peker på [json schema-definisjonen](https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json) til filen. 
Nåværende versjon er v1. Visual Studio Code vil på grunn av denne validere og tilby intellisense/autocomplete når du 
redigerer filen lokalt.

## `allowOverwrite`
`allowOverwrite` avgjør om forhåndsutfylling definert i denne filen kan overskrive et felt i datamodellen hvis det 
allerede har en verdi.

## `ER`
`ER` - her legger du inn felter fra datamodellen som skal forhåndsutfylles med data fra Enhetsregisteret. Felter som 
forhåndsutfylles med ER-data får kun en verdi hvis du starter appen på vegne av en organisasjon. Det vil feile hvis du forsøker å forhåndsutfylle ER-data, men ikke har en organisasjon tilgjengelig.

## `DSF`
`DSF` - her legger du inn felter fra datamodellen som skal forhåndsutfylles med data fra Folkeregisteret. Felter som 
forhåndsutfylles med DSF-data får kun en verdi hvis du starter appen på vegne av en person. Det vil feile hvis du forsøker å forhåndsutfylle DSF-data, men ikke har en person tilgjengelig.

## `UserProfile`
`UserProfile` - her legger du inn felter fra datamodellen som skal forhåndsutfylles med data fra brukerens profil i 
 Altinn. Merk at det er den innloggede brukeren som starter appen, som du henter ut data for.
