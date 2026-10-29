---
title: Teste en flerappsløsning i Altinn
linktitle: Testing
description: Slik tester du flerappsløsningen under utvikling
weight: 50
toc: true
tags: [needsReview]
aliases:

- /app/multi-app-solution/testing/

---

## Teste med Maskinporten

Dette bør du vite når du samhandler med Maskinporten i en app.

Legg til Maskinporten-scopene appen trenger i Altinn Studio før du publiserer den til et runtime-miljø. Altinn Studio oppretter Maskinporten-klienten for miljøet under publisering og monterer genererte klientdetaljer i appen.

Brukeren som legger til scopes i Altinn Studio må ha tilgang til å administrere Maskinporten-klienter for tjenesteeierorganisasjonen. Les mer i [veiledningen for Maskinporten-integrasjon]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten" >}}).

## Teste i Altinn Studio

Altinn Studio har foreløpig lite støtte for å utvikle flerappsløsninger.
Du kan bare bygge hver app for seg og se hvordan de ser ut i forhåndsvisningen.

## Teste lokalt

Når du tester lokalt med `studioctl`, må du starte begge appene. App A må også vite hvilken adresse app B har når de kjører lokalt.

Hvis du ikke vil at testdata fra app B skal havne i Altinn-innboksen til organisasjonen, bør du endre mottakeren i instansmalen i app A.
Du gjør dette ved å bruke `PersonNumber` i stedet for `OrganisationNumber` i `InstanceOwner`-delen av instansmalen i hooken som oppretter instansen (`OpprettInstansIAppB`).
Vi anbefaler å bruke et personnummer for en testbruker fra Tenor-testdatabasen.
Når du tester om skjemaet fra app B har kommet gjennom, må du logge inn på
[tt02.altinn.no](https://tt02.altinn.no/)
med samme testbruker fra Tenor.

## Teste i tt02

Før du ruller ut appene i produksjon, bør du ha testet skjemaene fullt ut i tt02 med publisert Maskinporten-oppsett.
Dette betyr at du bør teste begge appene mens de kjører i tt02.
Du kan fortsatt teste med en testbruker fra Tenor som mottaker av instansen, men et alternativ er å be om en testorganisasjon som kan motta disse skjemaene.
Du gjør dette ved å sende en forespørsel til servicedesk@altinn.no.
