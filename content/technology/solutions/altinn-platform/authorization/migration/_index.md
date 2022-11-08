---
title: Fremdriftplaner for modernisering av Altinn Autorisasjon
linktitle: Fremdriftsplan
description: Her finner du informasjon om hvordan vi har tenkt å migrere Altinn Autorisasjon fra Altinn 2 til Altinn 3 plattformen
tags: [architecture, plan, authorization]
---

Innen juni 2025 så skal dagens Altinn løsning være modernisert og migrert til skyen. Det innebærer at mye av dagens løsning må utvikles på nytt. 

## Overordnet målsetning for modernisering
- Autorisasjon skal være en selvstendig komponent og eget produkt 
- Sikre en robust og sikker drift samstundes som understøtter stor vekst i bruken av autorisasjon. 
- Øke endringstakten i Autorisasjon slik at veien fra behov til løsning blir raskere. 
- Forbedre og forenkle brukerflyten slik at det blir enklere å administrere tilganger 
- Tilby nye og moderne API som gjør det enklere å integrere mot og ta i bruk Altinn Autorisasjon som tilgangsstyringløsning for andre offentlige tjenester

## Hva skal gjøres? 

For å sikre fremtidige behov så tegnes det en ny arkitektur for Altinn Autorisasjon, [se ny løsningsarkitektur](../technology/solutions/altinn-platform/authorization/) 

### Plan for migrering av tjenester fra Altinn 2 til Altinn 3
Alle tjenester som i dag bruker Altinn som autorisasjonsløsning må flyttes fra Altinn 2 til Altinn 3 plattformen. Dette gjelder følgende tjenestetyper
- Delegerbare API ressurser
- Lenketjenester
- Samtykketjenester
- Formidlingstjenester
- Meldigstjenester
- Skjematjenester
- Innsynstjenester
- Samhandlingstjenester

Det er laget en foreløpig [plan](../migration/servicemigration/) for i hvilken rekkefølge dette skal skje og når de enkelte tjenestene skal være migrert.

### Plan for migrering av annen funksjon knyttet til Altinn Autorisasjon

