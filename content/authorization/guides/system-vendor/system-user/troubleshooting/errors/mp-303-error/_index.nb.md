---
title: Feilsøking
linktitle: Feilsøking
description: En feilsøkingsguide for systembrukerintegrasjonen.
toc: true
---

## Introduksjon
Feilmeldingen `invalid_altinn_customer_configuration (MP-303)` indikerer et konfigurasjonsproblem i Altinns Systemregister for den angitte systembrukeren. Denne feilen oppstår vanligvis under en Maskinporten-token request når Altinn ikke kan finne eller validere systembrukerens registrering basert på leverandørens innkommende token-forespørsel. Denne guiden beskriver vanlige årsaker og gir en systematisk tilnærming for leverandører for å diagnostisere og løse disse konfigurasjonsproblemene.

## Vanlige årsaker og løsninger
Rotårsaken er nesten alltid et avvik mellom informasjonen som gis i token-forespørselen og dataene som er lagret i Altinn. De hyppigste feilkonfigurasjonene er beskrevet nedenfor.

### Manglende `ClientId` for systembrukeren
Selv om et system kan registreres uten en `ClientId`, **må** en systembruker som autentiserer seg via Maskinporten være tilknyttet en. Denne `ClientId`-en er den unike identifikatoren for Maskinporten-klienten som utfører autentiseringen.

#### Løsning:
Verifiser at systemregistreringen i Systemregisteret inkluderer korrekt `ClientId`. Denne `ClientId`-en må samsvare med den fra Maskinporten-klientkonfigurasjonen som brukes for token-forespørselen. Hvis den mangler eller ikke samsvarer, må leverandøren oppdatere systemregistreringen.