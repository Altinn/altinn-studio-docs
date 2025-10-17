---
title: Utvikle en flerappsløsning i Altinn
linktitle: Flerappsløsning
description: Slik vurderer du behov og går frem når du utvikler en flerappsløsning
weight: 250
tags: [needsReview]
aliases:
- /app/multi-app-solution/
- /altinn-studio/guides/multi-app-solution/
---

<!--
HUSK: Sjekk "hvordan"-formuleringer som er klare anglisismer (der "how to" er opprinnelsen).
Endre til "Slik gjør du..." i stedet for "Hvordan du gjør..." der det passer.
-->

## Forstå hva en flerappsløsning er

En flerappsløsning består av to eller flere applikasjoner som samarbeider.
Applikasjon A utløser opprettelsen av en ny instans av applikasjon B.
Du kan forhåndsfylle den nye instansen med data fra den pågående forekomsten av applikasjon A.

Denne guiden viser deg en flerappsløsning som består av to apper: _applikasjon A_ og _applikasjon B_.
Du kan utvide løsningen til å inneholde flere applikasjoner av type A eller type B, eller begge typer.

![Eksempelarkitektur for en flerapp-løsning](multi-app-architecture.drawio.svg)

### Terminologi

- **Instans:** Unike data som beskriver den spesifikke økten som pågår i applikasjonen.
  Dataene inkluderer informasjon om hvem som fyller ut og hva dataene inneholder.
- **Applikasjon A:** En vanlig Altinn-applikasjon som sluttbrukere samhandler med.
  Sluttbrukere jobber på sin egen private instans mens de fyller ut skjemaet.
  Du tilpasser denne applikasjonen til å opprette en ny instans av _applikasjon B_.
- **Applikasjon B:** En applikasjon som mottar og håndterer data fra _applikasjon A_.
  Den skiller seg fra andre Altinn-apper fordi en annen applikasjon oppretter instansene.

## Vurdere om du trenger en flerappsløsning

Altinn tilbyr API-er og eventstøtte for å behandle data fra Altinn-apper.
Vurder en flerappsløsning hvis disse alternativene ikke dekker dine behov.

### Brukstilfeller for flerappsløsning

En flerappsløsning kan passe hvis:

- Organisasjonen din har begrenset utviklingskapasitet eller ikke ønsker å utvikle og vedlikeholde
  et nytt system for å behandle data fra Altinn.
- Eksisterende oppsett i organisasjonen din for å behandle data fra Altinn ikke oppfyller kravene til sikkerhet.

Når du implementerer en flerappsløsning, kan organisasjonen din bruke Altinn-innboksen for å motta data.
I de fleste tilfeller har personene som trenger å behandle dataene allerede tilgang til organisasjonen i Altinn,
eller du kan gi dem denne tilgangen. Du kan angi autorisasjonsregler i den siste applikasjonen i dataflyten
(applikasjon B i vårt tilfelle) som krever en spesifikk rolle før du gir tilgang til dataene.
Dette gir begrenset tilgang til sensitive data for personer med et offisielt behov.

## Forstå hvordan en flerappsløsning fungerer

I en flerappsløsning konfigurerer du flere skjemaer til å kommunisere gjennom API-kall.
Denne veilederen viser deg hvordan du oppretter en ny instans av en applikasjon (B) som utløses av en annen applikasjon (A).

Et typisk scenario er at en sluttbruker fyller ut eller laster opp informasjon i en instans av applikasjon A.
Når sluttbrukeren trykker på knappen for å sende inn skjemaet, sender applikasjonen et API-kall til applikasjon B.
Dette oppretter en ny instans av applikasjon B, der svarene fra applikasjon A er en del av informasjonen.

### Integrere appen med Maskinporten

For at en applikasjon skal utføre handlinger på en annen applikasjon, for eksempel opprette en ny instans
på vegne av en sluttbruker eller organisasjon, må du autorisere den.

Forespørselen om å opprette instansen av applikasjon B inkluderer legitimasjonen til sluttbrukeren som fyller ut applikasjon A.
I de fleste tilfeller er ikke denne sluttbrukeren autorisert til å opprette nye instanser på vegne av organisasjonen
som eier applikasjon B, og dette vil feile.

For å sikre at applikasjonen er autorisert til å opprette instansen, bruker du applikasjoneierens
legitimasjon i stedet for sluttbrukerens legitimasjon.
Du gjør dette ved å bruke en Maskinporten-integrasjon som genererer et token som representerer organisasjonen.
Legg dette tokenet til i forespørslene som applikasjon A gjør mot applikasjon B.

{{<children description="true" />}}