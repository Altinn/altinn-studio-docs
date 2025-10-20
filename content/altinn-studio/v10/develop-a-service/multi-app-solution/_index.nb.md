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

En flerappsløsning består av to eller flere apper som samarbeider.
App A utløser opprettelsen av en ny instans av app B.
Du kan forhåndsfylle den nye instansen med data fra den pågående forekomsten av app A.

Denne guiden viser deg en flerappsløsning som består av to apper: _app A_ og _app B_.
Du kan utvide løsningen til å inneholde flere apper av type A eller type B, eller begge typer.

![Eksempelarkitektur for en flerapp-løsning](multi-app-architecture.drawio.svg)

### Terminologi

- **Instans:** Unike data som beskriver den spesifikke økten som pågår i appen.
  Dataene inkluderer informasjon om hvem som fyller ut og hva dataene inneholder.
- **App A:** En vanlig Altinn-app som sluttbrukere samhandler med.
  Sluttbrukere jobber på sin egen private instans mens de fyller ut skjemaet.
  Du tilpasser denne appen til å opprette en ny instans av _app B_.
- **App B:** En app som mottar og håndterer data fra _app A_.
  Den skiller seg fra andre Altinn-apper fordi en annen app oppretter instansene.

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
eller du kan gi dem denne tilgangen. Du kan angi autorisasjonsregler i den siste appen i dataflyten
(app B i vårt tilfelle) som krever en spesifikk rolle før du gir tilgang til dataene.
Dette gir begrenset tilgang til sensitive data for personer med et offisielt behov.

## Forstå hvordan en flerappsløsning fungerer

I en flerappsløsning konfigurerer du flere skjemaer til å kommunisere gjennom API-kall.
Denne veilederen viser deg hvordan du oppretter en ny instans av en app (B) som utløses av en annen app (A).

Et typisk scenario er at en sluttbruker fyller ut eller laster opp informasjon i en instans av app A.
Når sluttbrukeren trykker på knappen for å sende inn skjemaet, sender appen et API-kall til app B.
Dette oppretter en ny instans av app B, der svarene fra app A er en del av informasjonen.

### Integrere appen med Maskinporten

For at en app skal utføre handlinger på en annen app, for eksempel opprette en ny instans
på vegne av en sluttbruker eller organisasjon, må du autorisere den.

Forespørselen om å opprette instansen av app B inkluderer legitimasjonen til sluttbrukeren som fyller ut app A.
I de fleste tilfeller er ikke denne sluttbrukeren autorisert til å opprette nye instanser på vegne av organisasjonen
som eier app B, og dette vil feile.

For å sikre at appen er autorisert til å opprette instansen, bruker du appeierens
legitimasjon i stedet for sluttbrukerens legitimasjon.
Du gjør dette ved å bruke en Maskinporten-integrasjon som genererer et token som representerer organisasjonen.
Legg dette tokenet til i forespørslene som app A gjør mot app B.

{{<children description="true" />}}