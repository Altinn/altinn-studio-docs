---
title: End user functionality in Altinn 3
linktitle: End user
description: This is the functionality available for end users in Altinn 3, and some of the larger planned changes.
toc: true
tags: [translate-to-english]
---

## Lansert funksjonalitet

{{% panel %}}
For informasjon om **hvordan man bruker** funksjonalitetene som er beskrevet her, se [brukerdokumentasjonen for Altinn Studio](/docs/altinn-studio/).
{{% /panel %}}
### Skjemafunksjonalitet

Støtte for innsendingstjenester. Et utvalg standardkomponenter å bygge med (eks. tekstfelt, radioknapp, sjekkliste, datovelger, vedlegg), inkludert sidestilling av elementer (støtte for grid). Støtte for at skjemaet består av flere sider, men sluttbruker kan kun navigere framover/bakover mellom sidene (styrt navigasjon). Alle skjema og elementer har standardisert look and feel.

Støtte for å sette opp ulike regler, herunder kalkulering, validering og dynamikk på både element- og sidenivå (dvs. styre hva som vises ut fra hva bruker fyller inn i skjemaet.)

Elementene kobles med tekster og knyttes til datamodell. Mulighet til å koble på API-er som datakilder, samt å forhåndsutfylle med data fra Altinns kopier av Folkeregisteret og Enhetsregisteret.

### Arbeidsflyt i applikasjonen

Du kan kombinere flere ulike steg i den rekkefølgen som er relevant for tjenesten:

- Utfylling/melding (data) - eksponering av data fra tjenesteeier og/eller innhenting av data fra sluttbruker
- Bekreftelse (confirm) - bruker skal bekrefte at dette er dataene de ønsker å sende inn
- Vente på tilbakemelding (feedback) - prosessen er ikke fullført, men det er andre enn bruker (tjenesteeier eller tredjepart) som skal gjøre noe

I tillegg har alle en sluttstatus for at instanser er arkivert/fullført.

### Autentisering og autorisasjon

Det er støtte for å definere hvilke(n) rolle(r) som har tilgang til ulike operasjoner per steg i arbeidsflyten. Rollene kan enten være Altinn-roller, roller fra Enhetsregisteret eller at tjenesteeier selv har tilgang.

### Integrasjon med meldingsboksen i Altinn

Instanser av tjenester ligger i brukers meldingsboks på samme måte som i Altinn 2. Det er mulig å finne instansene ved bruk av søk (men med enkelte begrensninger).

Tjenesteeier har selv mulighet til å angi hvilken status som er relevant for den enkelte instans. Det er også mulig å definere opp at instanser av en app aldri skal legges i brukers arkiv.

### Integrasjon med sluttbrukersystemer

Tjenestene har standardiserte API-er som kan benyttes for innsending fra tredjepartssystemer. Hver app har sine egne endepunkter. Autentisering av bruker skjer med ID-porten.

## Kommende funksjonalitet

Altinn 3 er i stadig videreutvikling, og funksjonalitet lanseres løpende. Backlogg revideres åtte ganger i året, og mindre endringer kan også forekomme mellom revisjonene.
Generelt kan man si at jo lenger frem i tid leveranse er planlagt jo mer usikkert er angitt leveransetidspunkt.

Endringer beskrevet i _kursiv_ er å regne som på idéstadiet, og er ikke besluttet at skal utvikles.
Lenker i parentes er til beskrivelser i vår åpne backlog på Github.

### Skjemafunksjonalitet

Det skal være mulig å definere opp brukergrensesnitt som passer godt til den enkelte tjenestens behov. Eksempler på kommende funksjonaliteter:

- Fylle ut repeterende gruppe over flere sider (Q2 2021) ([#5176](https://github.com/Altinn/altinn-studio/issues/5176))
- Friere navigering mellom sider (Q3 2021) ([#5893](https://github.com/Altinn/altinn-studio/issues/5893))
- Utfyllbare tabeller (Q3 2021) ([#378](https://github.com/Altinn/altinn-studio/issues/378))
- Mulighet for å endre språk inne i applikasjonen (Q4 2021) ([#2055](https://github.com/Altinn/altinn-studio/issues/2055)). Denne endringen gjør det også mulig å tilby tjenester på andre språk enn bokmål/nynorsk/engelsk.
- _Ulike «tema» for brukergrensesnittet i portalen_ ([#2115](https://github.com/Altinn/altinn-studio/issues/2115))


### Arbeidsflyt i applikasjonen

Vi vil utvide biblioteket med tilgjengelige arbeidsflytsteg for å dekke stadig flere bruksområder. Eksempler på kommende funksjonaliteter:

- Funksjonell signering (Q3 2021) ([#5540](https://github.com/Altinn/altinn-studio/issues/5540))
- Teknisk signering (Q4 2021)
- Komplekse signeringsregler - f.eks. basert på hva som fylles ut i skjemaet og parallellsignering (x av y personer skal signere) (Q3 2021) ([#1324](https://github.com/Altinn/altinn-studio/issues/1324)) / ([#1325](https://github.com/Altinn/altinn-studio/issues/1325))
- Betaling (2022) ([#1320](https://github.com/Altinn/altinn-studio/issues/1320))
- Erstatning for innsynstjenester (Q2 2021) ([#1328](https://github.com/Altinn/altinn-studio/issues/1328))
- Friere navigering mellom stegene i prosessen (Q4 2021) ([#2743](https://github.com/Altinn/altinn-studio/issues/2743))
- _Innhenting av samtykke_

### Autentisering og autorisasjon

Vi skal tilby minst samme fleksibilitet for brukerne til å styre hvem som har tilgang til Altinn 3-tjenestene som finnes i Altinn II. Det innebærer f.eks. følgende endringer:

- Støtte for delegering på app-nivå (Q2 2021) ([#2731](https://github.com/Altinn/altinn-studio/issues/2731))
- Støtte for delegering på instansnivå (Q3 2021) ([#2732](https://github.com/Altinn/altinn-studio/issues/2732))
- _Tilgang til app med virksomhetsbruker_ ([#3743](https://github.com/Altinn/altinn-studio/issues/3743))
- _Whitelisting av aktuelle brukere for en app_ ([#5547](https://github.com/Altinn/altinn-studio/issues/5547))

### Hendelsesstyrte tjenester

For å bygge sammenhengende tjenestekjeder, uten at man må bygge kompleks orkestrering, er det nødvendig at en tjeneste skal kunne "reagere" på hendelser i en annen app, eller på eksterne hendelser.
Å legge til rette for denne måten å lage tjenestekjeder ligger i planene for 2022.

### Varslinger (e-post og sms)

Å sende ut varsler på e-post og/eller sms er en viktig del av flere tjenester. Inntil videre vil Altinn 3 bruke varslingsfunksjonaliteten i Altinn II. 

- Det skal være mulig å koble varslingene til ulike hendelser i appene (Q4 2021) ([#4275](https://github.com/Altinn/altinn-studio/issues/4275))
- Sluttbruker selv skal kunne sende e-post av kvitteringen (2022) ([#1902](https://github.com/Altinn/altinn-studio/issues/1902))

### Integrasjon med meldingsboksen i Altinn

Det skal være lett å finne riktig instans av en tjeneste i meldingsboksen. For å få til dette legger vi til:

- Presentasjonsfelter - mulighet for å skille instanser av samme app fra hverandre (Q2 2021) ([#594](https://github.com/Altinn/altinn-studio/issues/594))
- Støtte for å lage ny instans med utgangspunkt i en eksisterende - lag ny kopi (Q2 2021) ([#1566](https://github.com/Altinn/altinn-studio/issues/1566))
- Sjekk av om man allerede har en instans av app i meldingsboks, slik at man får velge mellom ny instans eller fortsette på eksisterende (Q2 2021) ([#1811](https://github.com/Altinn/altinn-studio/issues/1811))
- _Mulighet for å søke i innholdet i instansene_ ([#5450](https://github.com/Altinn/altinn-studio/issues/5450))
