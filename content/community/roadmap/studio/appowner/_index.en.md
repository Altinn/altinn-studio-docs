---
title: App owner functionality in Altinn 3
linktitle: App owner
description: This is the functionality available for app owners in Altinn 3, and some of the larger planned changes.
toc: true
tags: [translate-to-english]
---
## Lansert funksjonalitet

{{% panel %}}
For informasjon om **hvordan man bruker** funksjonalitetene som er beskrevet her, se brukerdokumentasjonen for [Altinn Studio](/app/) og [API](/api/).
{{% /panel %}}

### Tjenesteutvikling i GUI

I [brukergrensesnittet til Altinn Studio](https://altinn.studio) kan du gjøre følgende:

- Opprette (og finne igjen) en app
- Laste opp datamodell
- Legge inn tekster
- Lage et enkelt skjema (en eller flere sider), med kobling mellom elementer, tekster og datamodell
- Legge inn dynamikkregler (NB! Kodes i JavaScript)
- Deploye app til test- og produksjonsmiljø

### Tjenesteutvikling via kode

Ved å hente ned applikasjonskoden (via Git) lokalt (eller ved å redigere på app-filene i repository-visning) kan du gjøre alle mulige endringer av appen. Dette inkluderer blant annet standardfunksjonalitet for å:

- Lage kalkulerings- og valideringsregler
- Koble på forhåndsutfylling
- Legge inn API-oppslag
- Redigere på prosessen/arbeidsflyten i appen
- Redigere på autorisasjonsreglene for appen, samt lage egendefinert instansieringslogikk
- Lage egendefinerte hendelser/events

### Teste lokalt

Når du har applikasjonskoden lokalt, kan du også benytte deg av muligheten til å ha [et lokalt testmiljø for å gjøre de fleste typer testing](/app/testing/local/). 

### Integrasjon med tjenesteeier

Altinn 3 har standardiserte API-er som tjenesteeier kan bruke for å hente og laste opp data. For nedlasting bygger Altinn 3 på at tjenesteeier gjør spørringer og laster ned data (pull). I tillegg kan tjenesteeier benytte app-enes API-er for å instansiere eller gjøre endringer på instanser.

For å benytte API-ene som tjenesteeier må man autentisere seg med Maskinporten.

### Forvaltning av apper
Det er lagt opp til [tilgang til overvåking av egne applikasjoner](/app/getting-started/access-management/apps/), slik at man kan ha oversikt over hvordan appene fungerer. Se også [sidene om vedlikehold av apps](/app/maintainance/).

## Kommende funksjonalitet

Altinn 3 er i stadig videreutvikling, og funksjonalitet lanseres løpende. Backlogg revideres åtte ganger i året, og mindre endringer kan også forekomme mellom revisjonene.
Generelt kan man si at jo lenger frem i tid leveranse er planlagt jo mer usikkert er angitt leveransetidspunkt.

Endringer beskrevet i _kursiv_ er å regne som på idéstadiet, og er ikke besluttet at skal utvikles.

### Tjenesteutvikling i GUI

For all kommende funksjonalitet gjør vi vurderinger av om det er egnet å løse det i GUI. På et senere tidspunkt (2023 eller senere) vil vi gjøre et løft for at mer funksjonalitet skal være tilgjengelig via GUI.

- Støtte for branching i Altinn Studio (Q2 2021) ([#985](https://github.com/Altinn/altinn-studio/issues/985))

### Datamodellering

Den avhengigheten vi i dag har til at datamodellering skal gjøres i et eksternt system vil forsvinne. Noen høydepunkter i planene for datamodellering i Altinn 3 er:

- Å kunne jobbe med en datamodell i et GUI (Q2 2021) ([#5551](https://github.com/Altinn/altinn-studio/issues/5551))
- Integrasjoner med Felles datakatalog (Q3 2021) ([#3811](https://github.com/Altinn/altinn-studio/issues/3811))
- _Å kunne få automatisk generert datamodell fra det man bygger av brukergrensesnitt_
- _Å kunne få automatisk generert forslag til brukergrensesnitt ut fra datamodellen_

### Forvaltning av tjenester

Vi ønsker å gjøre tjenesteeiere i stand til å selv forvalte sine applikasjoner i Altinn 3. For å få til dette kommer blant annet:

- Mulighet for å avpublisere en applikasjon (Q2 2021) ([#3717](https://github.com/Altinn/altinn-studio/issues/3717))
- Mulighet for å lage en ny app som kopi av en tidligere (Q2 2021) ([#5923](https://github.com/Altinn/altinn-studio/issues/5923))
- _Webanalyse for applikasjonene_

### Integrasjon med tjenesteeier

Pull av data vil fortsatt være grunnmønsteret for at tjenesteeier får tilgang til data, men det kommer et par unntak:

- Mulighet for å bruke [eFormidling](https://samarbeid.digdir.no/eformidling/eformidling/20) som grensesnitt for å få data direkte fra en Altinn 3-app til tjenesteeiers systemer (Q2 2021) ([#4788](https://github.com/Altinn/altinn-studio/issues/4788))
- Push av events - at tjenesteeier varsles når det er data til nedlasting (Q2 2021) ([#4728](https://github.com/Altinn/altinn-studio/issues/4728))
- Splitt av data - flere tjenesteeiere kan motta data fra samme tjeneste (2022) ([#4274](https://github.com/Altinn/altinn-studio/issues/4274))
