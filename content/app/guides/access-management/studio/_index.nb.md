---
title: Altinn Studio tilganger
linktitle: Studio
description: Hvordan konfigurere tilganger for team i Altinn Studio.
toc: true
weight: 200
---

## Tilgangsstyring for organisasjonen

Som eier av en organisasjon i Altinn Studio har man mulighet til å konfigurere tilgangene til de øvrige brukerne knyttet
til organisasjonen. Dette gjøres via Gitea på følgende lenke:
https://altinn.studio/repos/org/{org}/teams/ Husk å bytte ut `{org}`.

Det er definert fire standard team som legger føringer for hva en bruker har tillatelse til å gjøre innad i en
organisasjon i Altinn Studio. Ved behov kan man som eier kan man legge til/fjerne brukere i team, opprette nye team og
endre konfigurasjon på eksisterende team.

### Owners
Medlemmer i dette teamet kan tenkes på som administrator for organisasjonen. 
De vil kunne administrere tilgangsstyringen for alle team og repositories knyttet til organisasjonen.

Som medlem i dette teamet kan man blant annet:

- opprette/slette team 
- legge til og fjerne brukere i ulike team
- endre konfigurasjon for team

#### Konfigurasjon
Dette teamet ligger inne som standard i alle organisasjoner og det er ikke mulig å endre konfigurasjonen for dette teamet.

### Deploy-Production
Medlemmer i dette teamet kan deploye applikasjoner til produksjonsmiljøet.

Øvrige rettigheter kan defineres fritt av owners.
Default konfigurasjon inkluderer rettigheter for:

- Lesetilgang i samtlige repositories
- Kan _ikke_ opprette nye repositories 
- Full tilgang til alle områder i Gitea

#### Konfigurasjon
Konfigurasjonen av dette teamet kan justeres av owners etter behov, 
muligheten til å deploye til produksjonsmiljø er ikke avhengig av øvrig config. 

Standard konfigurasjon for teamet inkluderer rettigheter til å

- Lese samtlige repositories
- Aksessere alle områder i Gitea

### Deploy-TT02
Medlemmer i dette teamet kan deploye applikasjoner til testmiljøet.

Øvrige rettigheter kan defineres fritt av owners.
Default konfigurasjon inkluderer rettigheter for:

- Lesetilgang i samtlige repositories
- Kan _ikke_ opprette nye repositories 
- Full tilgang til alle områder i Gitea

#### Konfigurasjon

  Konfigurasjonen av dette teamet kan justeres av owners etter behov, 
  muligheten til å deploye til testmiljø er ikke avhengig av øvrig config. 
  
  Standard konfigurasjon for teamet inkluderer rettigheter til å
  - Lese samtlige repositories
  - Aksessere alle områder i Gitea

### Devs
Medlemmer i dette teamet jobber med å utvikle applikasjoner og har tilgang til samtlige repositories.

#### Konfigurasjon
Konfigurasjonen av dette teamet kan justeres av owners etter behov,
avhengig av hvor mye frihet man ønsker at apputvikleren skal ha.
Merk at det blant annet er mulig å spesifisere hvilke(t) repository teamet skal ha tilgang til.

Standard konfigurasjon for teamet inkluderer rettigheter til å

- Opprette nye repositories
- Skrive til samtlige repositories
- Aksessere alle områder i Gitea

## Tilgangsstyring for repository

En administrator for organisasjonen kan også styre hvem som har tilgang til det enkelte repository.
Det gjøres ved at man går til repositoryet i Gitea, og går til fanen `Collaboration` under `Innstillinger`.
Tilgang kan gis både til team og enkeltbrukere. For å holde oversikt anbefaler vi primært å sette opp
team for tilgangsstyring. For å gi et team tilgang, søk det fram og klikk `Add Team`.

![Styre tilgang på repository](access-management-repository.png "Styre tilgang til et enkelt repository")
