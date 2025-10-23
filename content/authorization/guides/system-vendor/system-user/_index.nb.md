---
title: Systembruker veiledning
linktitle: Systembruker
description: Veiledning for systemleverandører for å integrere mot og sette opp systembrukere i sitt sluttbrukersystem.
toc: false
aliases:
  - nb/authentication/guides/systemvendor/
---

En systembruker er en virtuell bruker som en virksomhet kan opprette i Altinn. Den gir systemer og programvare, for eksempel et regnskapsprogram, tilgang til å hente og sende inn data på vegne av virksomheten. Handlinger utført via systembruker registreres som gjort av systembrukeren, og kan derfor ikke knyttes til en navngitt person. Dersom det kreves personlig ansvar, må man logge inn med vanlig Altinn-innlogging.

## Før du setter i gang

Før du oppretter en systembruker for ditt sluttbrukersystem, må du ta stilling til hvordan systemet skal brukes av sluttbrukerne – altså om rapporteringen skal skje for egen virksomhet, eller på vegne av andre virksomheter. Dette valget avgjør hvordan integrasjonen mot tjenesteeierens API-er settes opp, og hvilke rettigheter systembrukeren får. Systemet kan også være bygget for å støtte begge typer rapportering. I slike tilfeller må du opprette to separate systembrukere: én for rapportering på vegne av egen virksomhet, og én for rapportering på vegne av klienter.

### Opprettelse av systembruker

Systembrukeren opprettes av virksomhet eller tjenestetilbyder som ønsker å bruke et sluttbrukersystem for integrasjon mot Altinn eller andre offentlige tjenester.
Opprettelse kan skje via sluttbrukerstyrt opprettelse eller leverandørstyrt opprettelse.

#### Brukerstyrt opprettelse

Ved en sluttbrukerstyrt opprettelse er det sluttbrukeren selv som initierer prosessen ved å logge inn i Altinn. Der velger brukeren hvilket system de ønsker å opprette en systembruker for.

Sluttbrukeren blir presentert for de forhåndsdefinerte tilgangene som systemet krever. Når disse aksepteres, godkjennes tilgangene direkte, og systembrukeren blir opprettet uten at det genereres en separat forespørsel. Denne prosessen forutsetter at sluttbrukeren har myndighet til å delegere alle tilgangene systemet ber om.

#### Leverandørstyrt opprettelse

Ved en leverandørstyrt opprettelse er det sluttbrukersystem-leverandøren (SBSL) som initierer prosessen. Dette skjer ved at leverandøren, ofte fra sitt eget fagsystem, sender en forespørsel til Altinn om å opprette en systembruker.

Forespørselen spesifiserer hvilke tilganger systembrukeren trenger. Denne forespørselen må deretter godkjennes av sluttbrukeren (kunden) i Altinn for at systembrukeren skal bli opprettet.

Denne metoden baserer seg på et "OG-forhold". Det innebærer at sluttbrukeren må ha myndighet til å delegere samtlige tilganger som leverandøren etterspør. Hvis brukeren mangler myndighet for selv én av tilgangene, kan ikke forespørselen godkjennes i sin helhet.

## Systembruker for eget system

Dette alternativet passer dersom systemet skal brukes til å hente eller sende data for egen virksomhet. 
![Leverandørstyrt opprettelse av kundestyrt system](eget_system.png)
*Figuren viser leverandørstyrt opprettelse for eget system*

**Typisk bruk for sluttbruker:**

- Sluttbrukeren er en ansatt i virksomheten.
- Systemet brukes kun til rapportering for eget organisasjonsnummer.
- Ingen andre virksomheter er involvert.

**Eksempel:** Et internt HR- eller regnskapssystem som sender A-meldinger eller MVA-meldinger for virksomheten.

**Konsekvens for sluttbruker:**

- Rapportering skjer kun for egen virksomhet.
- Det er ikke nødvendig med delegeringer fra andre virksomheter.
- Tilgangsstyringen er enkel og knyttet direkte til egen organisasjon.

> Systembruker for eget system kan opprettes ved enten [**brukerstyrt eller leverandørstyrt opprettelse.**](https://docs.altinn.studio/nb/authorization/guides/system-vendor/system-user/systemuserrequest/#1-opprette-systembruker-for-eget-system) 


## Systembruker for klientsystem

(tidligere agent-systembruker)

Dette alternativet passer dersom systemet ditt skal gjøre det mulig for sluttbrukere å rapportere for andre virksomheter – for eksempel kunder, klienter eller samarbeidspartnere.

Du kan få fullmakter for kunden på to måter:

1. **Via Enhetsregisteret:** Tjenestetilbyderen får rettigheter automatisk når det er registrert et forhold i Enhetsregisteret.
Dette gjelder for rollene Regnskapsfører (REGN), Revisor (REVI) og Forretningsfører (FFØR). 
Disse fullmaktene kan deretter klientdelegeres til en systembruker med tilsvarende rettigheter.

2. **Delegering fra virksomhet til virksomhet:** En tilgangsstyrer hos kunden gir fullmakt direkte til tjenesteleverandørens organisasjonsnummer. 
Dette skjer ved at kunden aktivt delegerer én eller flere tilgangspakker. 
Når tjenesteleverandøren har mottatt fullmakten, kan deres klientadministrator videredelegere denne til et klientsystem med tilsvarende fullmakter.

![Klientsystem](klient_system.png)
*Figur viser leverandørstyrt opprettelse for klientsystem*

**Typisk bruk for sluttbruker:**

- Sluttbrukeren er regnskapsfører, konsulent eller tjenesteyter.
- De logger inn i systemet og kan velge hvilken klient/virksomhet de skal rapportere for.
- Systemet må støtte flere organisasjonsnumre og håndtere delegeringer via Altinn eller tilsvarende løsning.

**Eksempel:** Et regnskapsbyrå som bruker et økonomisystem til å sende MVA-meldinger for sine kunder.

**Konsekvens for sluttbruker:**

- Brukeren kan rapportere på vegne av flere virksomheter.
- Klientene må ha gitt nødvendige rettigheter/delegeringer.
- Systemet må sikre korrekt tilgang og identifisering av hvem det rapporteres for.
- Dersom kundeforholdet fjernes/slettes fra Enhetsregisteret eller virksomhetsdelegeringen revokeres av kunden vil alle klientdelegeringer for den aktuelle fullmakten automatisk fjernes.
- Klientdelegering til systembruker kan gjøres via GUI eller eget API

> Systembruker for klientsystemer kan kun opprettes med [**leverandørstyrt opprettelse**](https://docs.altinn.studio/nb/authorization/guides/system-vendor/system-user/systemuserrequest/#2-opprette-systembruker-for-klientsystem).


{{<children />}}
