---
title: Generell fremgangsmåte for å utvikle en flerappsløsning i Altinn
linktitle: Flerappsløsning
description: Vurderinger som burde gjøres og forklaringer på hvordan å gå frem når man utvikler en flerappsløsning
weight: 250
aliases:
- /app/multi-app-solution/
- /altinn-studio/guides/multi-app-solution/
---

## Hva er en flerappsløsning?

En flerappsløsning er en løsning som består av to eller flere
samarbeidende applikasjoner, der applikasjon A typisk vil utløse
opprettelsen av en ny
instans av applikasjon B. Som en del av
opprettelsen av applikasjon B er det mulig å
forhåndsfylle instansen med spesifikke data fra den pågående
forekomsten av applikasjon A.

Denne guiden tar deg gjennom en flerappsløsning som består av to
apper; _applikasjon A_ og _applikasjon B_,
men konseptet kan utvides til å inneholde flere applikasjoner av
type A eller type B, eller begge typer.

![Eksempelarkitektur for en flerapp-løsning](multi-app-architecture.drawio.svg)

### Terminologi

- **En instans:** Når vi snakker om instanser i en
  applikasjonskontekst, refererer dette til unik data som beskriver
  detaljer om den spesifikke økten som pågår i applikasjonen.
  Dataene inkluderer informasjon om hvem som fyller ut
  dataene og hva dataene inneholder.
- **Applikasjon A:** Dette vil være en applikasjon som fungerer som en vanlig
  Altinn-applikasjon, noe som betyr at
  sluttbrukere vil samhandle med den. Mens de fyller ut skjemaet, vil de
  jobbe på sin egen private instans. Imidlertid
  vil den skille seg fra andre Altinn-apper siden tjeneste-eieren
  har tilpasset den for å inkludere handlinger som
  vil opprette en ny instans av _applikasjon B_.
- **Applikasjon B:** Dette vil være en applikasjon som kan ha flere
  formål, men hovedformålet vil være
  å motta og håndtere data fra _applikasjon A_.
  Denne applikasjonen vil skille seg fra
  andre Altinn-apper siden instanser opprettes av
  utløsere i en annen applikasjon.

## Trenger jeg en flerappsløsning?

Altinn tilbyr et robust sett med API-er og eventstøtte for behandling av data fra Altinn-apper. Hvis disse
alternativene ikke
samsvarer med dine behov, kan du vurdere en flerappsløsning.

### Brukstilfeller der du kan vurdere å bruke en flerappsløsning:

Vi har skissert noen vanlige brukstilfeller hvor en flerappsløsning kan være hensiktsmessig.

- Organisasjonen har begrenset utviklingskapasitet eller ønsker ikke
  å utvikle og vedlikeholde et nytt system for behandling av data fra
  Altinn.
- Eksisterende oppsett i organisasjonen for behandling av data fra
  Altinn oppfyller ikke kravene til sikkerhet.

Ved å implementere en flerappsløsning kan en organisasjon bruke Altinn-innboksen for å motta data. I
de fleste tilfeller vil personene som trenger å behandle dataene allerede ha tilgang til organisasjonen i Altinn eller
kan
tildeles denne tilgangen. Den siste applikasjonen i dataflyten (applikasjon B i vårt tilfelle) kan angi
autorisasjonsregler
som krever en spesifikk rolle før tilgang til dataene gis, og dermed støtte begrenset tilgang til sensitive data til
personer med et offisielt behov.

## Hvordan fungerer egentlig flerappsløsning?

En flerappsløsning er en måte å konfigurere flere skjemaer for å kommunisere gjennom API-kall. Den spesifikke
kommunikasjonen
vi vil beskrive i denne veilederen er opprettelsen av en ny instans av en applikasjon (B) utløst av en annen
applikasjon
(A). Et typisk scenario ville være at en sluttbruker fyller ut eller laster opp informasjon i en instans av
applikasjon A. Når sluttbruker trykker
på knappen for å sende inn skjemaet, sendes et API-kall til en annen applikasjon (B), og det opprettes en ny instans
av denne applikasjonen hvor
svarene fra applikasjon A er en del av informasjonen.

### En integrasjon mellom appen og Maskinporten kan være nødvendig

For at en applikasjon skal utføre handlinger på en annen applikasjon, for eksempel opprette en ny instans på vegne av
en sluttbruker eller organisasjon, må den være autorisert.
Av natur vil forespørselen om å opprette instansen av applikasjon B inkludere legitimasjonen til sluttbrukeren
som fyller ut applikasjon A.
I de fleste tilfeller vil ikke denne sluttbrukeren være autorisert til å instansiere nye instanser på vegne av
organisasjonen som eier applikasjon B, og dette vil derfor feile.
En måte å sikre at applikasjonen er autorisert til å utføre instansieringshandlingen på, er å bruke
applikasjoneierens legitimasjon i stedet for sluttbrukerens legitimasjon.
Dette oppnås ved å bruke en Maskinporten-integrasjon for å generere en token som representerer organisasjonen
og legge dette tokenet til i forespørslene som applikasjon A gjør mot applikasjon B.

{{<children description="true" />}}