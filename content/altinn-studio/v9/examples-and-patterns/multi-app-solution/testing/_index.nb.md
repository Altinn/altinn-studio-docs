---
draft: true
title: Teste en flerappsløsning i Altinn
linktitle: Testing
description: Slik tester du flerappsløsningen under utvikling
weight: 50
toc: true
tags: [needsReview]
aliases:

- /app/multi-app-solution/testing/

---

## Forstå testing med Maskinporten

Dette bør du vite når du samhandler med Maskinporten i en app.

Legg til nødvendige Maskinporten-scopes for appen i Altinn Studio før den publiseres til et runtime-miljø. Altinn Studio oppretter Maskinporten-klienten for miljøet under publisering og monterer genererte klientdetaljer i appen.

Brukeren som legger til scopes i Altinn Studio må ha tilgang til å administrere Maskinporten-klienter for tjenesteeierorganisasjonen. Se [veiledningen for Maskinporten-integrasjon](/nb/altinn-studio/v9/develop-a-service/integration/maskinporten/) for detaljer.

## Teste i Studio

Støtten for utvikling av flerappsløsninger i Studio er for øyeblikket svært begrenset.
Studio kan bare hjelpe med allerede støttede konfigurasjoner for enkeltapper.
Dette betyr at du bare kan bygge de individuelle appene og se utseendet deres i forhåndsvisningsverktøyet.

## Teste i app-localtest

Når du tester lokalt via `studioctl` må du huske å starte begge appene og at app A er konfigurert riktig slik at den forstår app B sin addresse ved lokal kjøring.

Med mindre du vil injisere testdata fra app B i organisasjonens Altinn-innboks, bør du justere mottakeren av instansen som skal opprettes i instansetemplatet i app A.
Du gjør dette ved å bruke `PersonNumber` i stedet for `OrganisationNumber` i `InstanceOwner`-delen av malobjektet i `ProcessTaskEnd.End()`-metoden.
Vi anbefaler å bruke et personnummer for en testbruker fra Tenor-testdatabasen.
Når du tester om skjemaet fra app B har kommet gjennom, må du logge inn på
[tt02.altinn.no](https://tt02.altinn.no/)
med samme testbruker fra Tenor.

## Teste i tt02

Før du ruller ut appene i produksjon, bør du ha testet skjemaene fullt ut i tt02 med publisert Maskinporten-oppsett og riktig variabel for envUrl.
Dette betyr at du bør teste begge appene mens de kjører i tt02.
Du kan fortsatt teste med en testbruker fra Tenor som mottaker av instansen, men et alternativ er å be om en testorganisasjon som kan motta disse skjemaene.
Du gjør dette ved å sende en forespørsel til servicedesk@altinn.no.
