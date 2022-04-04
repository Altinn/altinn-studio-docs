---
title: Roadmap prosess
description: Hvordan jobber vi med vår roadmap
---
Dette dokumentet beskriver hvordan vi jobber med features for Altinn 3 plattformen.

## Artifakter
Arbeidet med Altinn 3 krever en del artifakter.

![Backlogs](roadmap.drawio.svg "Artifakter")
[Fullscreen](roadmap.drawio.svg)

### Feature request
En feature request er en forespørsel om ønsket funksjonalitet i Altinn 3 plattformen. Den opprettes enten av eksterne
som bruker plattformen, eller av andre som har identifsert et behov.

Feature request opprettes i de forsjellige produktbackloggene.
- [Altinn Apps](https://github.com/Altinn/apps-backlog/issues/issues?page=2&q=is%3Aissue+is%3Aopen)
- [Altinn Studio](https://github.com/Altinn/altinn-studio/labels/kind%2Ffeature-request)
- [Altinn Platform](https://github.com/Altinn/altinn-platform/labels/kind%2Ffeature-request)

### Product epic
Kilden til denne er typisk en feature request. 
Denne vil inneholde detaljert beskrivelse av feature samt referer til underoppgaver som f.eks
- Funksjonelle beskrivelser og tekniske analyser
- User Experience og Interaction design hensyn
- Juridiske vurderinger
- Sikkerhets vurderinger
- Kostnad/finansierings betraktninger
- (Oversikt over hvilke apper som har dette behovet?)

Det er produkteierne som i utgangspunktet eier denne, men får hjelp av teamarkitekter, utviklere, jurister og andre som trengs for å spesifisere disse
Denne featuren epic vil ligge i produktbackloggen hvor den mest naturlig hører hjemme. 
Det vil være naturlig at man itererer over denne mange ganger før den er klar til feature refinement.

[Eksempel 1 - funksjonel signering](https://github.com/Altinn/app-template-dotnet/issues/16)

Ansvarlig: Produkteiere

### Roadmap feature
Denne beskriver overordnet hvilken funksjonalitet feature dekker og egenskapene ved funksjonaliteten.
Først og fremst er målet at eksterne interessenter skal kunne lese denne uten å lese noe annet for å få en god forståelse hvilken funksjonalitet en slik feature dekker og når den kommer.

Denne opprettes av produkteierene basert på enkle feature request eller product epics etter en feature er nødvendig analysert til å kunne ta inn i roadmap.
Roadmap features finnes i [Roadmap repository](https://github.com/Altinn/altinn-roadmap/issues).
Vi ønsker å legge oss på detaljnivået til [Github Roadmap](https://github.com/orgs/github/projects/4247) for roadmap features

Ansvarlig: Produkteiere
Utførene: Alle

### Analyse tasks 
Analyse task er github issues som utføres i sammenheng med roadmap refinement prosessen hvor man prøver å analysere behovene i sammenheng med en feature request. 

Dette kan f.eks være

- Juridisk vurdering av feature
- UX analyse med prototype av feature Eksempel: [Tabell](https://github.com/Altinn/altinn-studio/issues/7750)
- POC av funksjonalitet for å verifisere et teknisk konsept

Ansvarlig: Produkteiere
Utførende: Alle

### Development task
Dette er detaljerte oppgaver som er knyttet til epic. Kan være analyse oppgaver eller rene implementasjonsoppgave.

Issue tilknyttet en produkt feature epic trenger ikke å ligge i samme backlog som epic. 

Disse tas inn i sprinter som del av sprint planning

Ansvarlig: Devops team
Utførende: Devops team

# Prosess
Følgende prosess følges med artifakten

![Backlogs](roadmapprocess.drawio.svg "Roadmap process")
[Fullscreen](roadmapprocess.drawio.svg)


## Roadmap refinement
Dette er arbeidet som produkteierne utfører for å skape elementer i roadmap backloggen. 

Arbeidet starter typisk basert på en feature request som eksterne, team aller produkteiere har identifisert.

Avhengig av feature kan dette arbeidet inkludere

- Analysere funksjonelle behov
- Analysere tekniske behov og muligheter
- Vurdere alternativ løsningsformer på funksjonelt behov
- UX Analyse og design

Dette arbeidet dokumenteres i baclog epics eller underliggende backlog issues og oppsummeres i selve roadmap features når løsning er definert.

Detaljeringsgraden på dette arbeidet må tilfredstille **Defintion of ready** for å kunne tas videre og man iterer over
artifaktene til dette er tilfelle.



## Feature refinement
Feature refinement er behandling av Backlog epic med underliggende issues.

Målet med feature refinement er å detaljere issue til et nivå at team kan ta oppgavene inn i sprinter. 

- Viktige teknologi valg må være analysert
- Bør være mulig å identifisere oppgaver å dele opp i egne issues
- Være detaljert nok til at man kan si noe om omfang. 

Resultatet av feature refinement kan være at produkteiere må tilbake til "tegnebordet" for finne ut av problemstillinger som ble identifisert av devopsteam.

For saker hvor produkteiere mener alt er avklart trenger man ikke å ta dette til feature refinement. Disse kan tas rett til planning.






{{<children>}}
