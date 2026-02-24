---
title: Innføring av nye tilgangspakker som erstatning for dagens Altinn 2 roller
linktitle: Nye tilgangspakker
description: Her finner dere tidsplan for innføring av nye tilgangspakker
toc: true
tags: [architecture, plan, authorization]
aliases:
- /authorization/migration/new-accessgroups
---

Altinn skal **erstatte rollene** som gir tilgang til tjenester i **Altinn 2** når vi flytter Altinn Autorisasjon til Altinn 3. 

I stedet for **roller vil det i Altinn 3 være ulike tilgangspakker** som består av tjenester som hører til et ansvarsområde.

## Tidsplan for arbeidet

![Plan for innføring av tilgangspakker](Tidsplan.jpg "Plan for innføring av tilgangspakker og aktiviteter knyttet til dette")
**Utførte aktiviteter**

1. Foreslå nye tilgangspakker (Q1 2023)
2. Gjennomføre høring av versjon 1 av forslag til tilgangspakker (Q2/Q3 2023). Se [høringsbrev](/nb/authorization/migration/informasjon-sent/letter-accessgroupes) sendt ut i starten av juni. Frist 1.8.2023
3. Etablere nye tilgangspakker versjon 2 (Q3 2023)
4. Gjennomføre hørring av versjon 2 av forslag til tilgangspakker (Q3/Q4 2023).Høring er ennå ikke sendt ut men forslaget utvikles [her](). Antatt høringsfrist blir slutten av okotber 2023.
5. Etablere endelig versjon av tilgangspakker

**Pågående og planlagte aktiviteter**

6. Tjenesteeiere kan begynne å sette tilgangspakker på apper og ressurser. Q4-24
   Fullstendig GUI og komplett liste over tilgangspakker vil bli tilgjengelig i Ressursregisteret/Altinn Studio i løpet av Q4-24. Tjenesteeiere som har behov for å knytte tilgangspakke til tjeneste før, kan be om å få aktuell(e) tilgangspakke(r) tilgjengelig manuelt.
7. Lansere [ny brukerflate](/nb/authorization/migration/#nye-tilgangspakker-og-ny-brukerflate-for-tilgangsstyring-for-virksomheter) for fullmaktstyring for virksomheter (Q1 2025)  
   På ny brukerflate for tilgangsstyring, vil det være mulig å delegere roller, tilgangspakker og enkeltrettigheter, samt få oversikt over mottatte og gitte fullmakter. Det skal også være mulig å trekke tilbake gitte fullmakter og slette fullmakter man har fått.
8. Avvikle Altinn 2 roller i løsningen (Q2 2026)
   - Altinn 2-rollene fases ut samtidig som hele Altinn 2 slås av i juni 2026.
     - Policyen for tjenesten vil på dette tidpunktet endres til å henvise til bare nye Altinn 3 tilgangspakker
     - Fra dette tidspunktet mister ansatte tilgang til tjenester gjennom de gamle Altinn 2 rollene

Det er ikke før vi lanserer ny brukeflate for de som er administratorer for virksomhetene at de nye tilgangspakkene faktisk blir tatt i bruk og det vil være mulig å gi disse til ansatte.


