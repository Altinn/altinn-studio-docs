---
title: 'Oppdage endringer'
description: 'Hvordan bruke Altinn Events og GraphQL-varslinger for å oppdage endringer i Dialogporten'
weight: 40
---

## Introduksjon

Denne veiledningen viser deg hvordan du kan sette opp et system for å oppdage endringer som er gjort i dialoger.

For en funksjonell oversikt, se [komme i gang med hendelser]({{<relref "../../getting-started/events">}}).

Det er to forskjellige måter å oppdage endringer på; ved å bruke Altinn Events eller GraphQL-abonnementer.

### Når du bør bruke Altinn Events

* Du trenger å oppdage at nye dialoger opprettes
* Du trenger å kunne oppdage endringer i et hvilket som helst antall eksisterende dialoger
* Du er i stand til å enten levere et HTTPS-endepunkt som skal brukes som en webhook for hendelsespåtrykk, eller trenger å spørre en Event API for en liste over hendelser

### Når du bør bruke GraphQL-abonnementer

* Du trenger å kunne overvåke en enkelt (eller et lavt antall kjente) dialog(er)
* Du trenger bare å overvåke i en kort periode (vanligvis mens en sluttbruker er tilstede i GUI-en du bygger)
* Du trenger lav latens
* Du er i stand til å håndtere en websocket-tilkobling eller server-sent events via HTTP

Hvis du er usikker, vil du sannsynligvis bruke Altinn Events

## Hvordan abonnere på Altinn Events

Se [Altinn Event komponentdokumentasjonen]({{<relref "../../../../events/subscribe-to-events/_index.md">}}) for en generell veiledning om hvordan du kommer i gang enten ved å abonnere via webhook (anbefales) eller ved å spørre Event API-et for hendelser.

For teknisk informasjon om de forskjellige hendelsestypene og formatene som produseres av Dialogporten, se [teknisk referanse for hendelser]({{<relref "../../reference/events">}}).

## Hvordan bruke GraphQL-abonnementer

Denne veiledningen forutsetter at du har en grunnleggende forståelse av GraphQL-operasjoner og fokuserer på å sette opp og bruke abonnementer. Hvis du trenger mer detaljerte instruksjoner om hvordan du setter opp den første GraphQL-klienten, kan du se dokumentasjonen for ditt bibliotek/klient-SDK etter eget valg.

Før du kan sette opp et GraphQL-abonnement, må du hente dialogdetaljene for å få tak i den nødvendige dialogtokenen. Denne tokenen er avgjørende for autorisering når du setter opp abonnementet.

### Trinn-for-trinn-guide

1. **Hent dialogdetaljer**
   Skaff deg dialogen du vil overvåke. Dette kan vanligvis gjøres gjennom en GraphQL-spørring eller ved å bruke et REST API-endepunkt. For mer informasjon om hvordan du gjør dette, se vår veiledning om [hente dialogdetaljer]({{<relref "../getting-dialog-details">}}).

2. **Sett opp abonnementet**
   Når du har dialogtokenen, kan du sette opp abonnementet på `dialogEvents`. Bruk `dialogId`-en til dialogen du er interessert i for å abonnere på hendelser relatert til den. Slik kan du skrive abonnementsspørringen:

   ```graphql
   subscription {
     dialogEvents(dialogId: "your-dialog-id-here") {
       id
       type
     }
   }
   ```

   Sørg for å inkludere `Digdir-Dialog-Token` i HTTP-headerne for forespørselen:

   ```http
   "Digdir-Dialog-Token": "your-dialog-token-here"
   ```

3. **Håndter innkommende hendelser**
   Med abonnementet aktivt, vil serveren skyve oppdateringer til klienten din hver gang det er en endring knyttet til dialog-ID-en du abonnerte på. Hendelser kan enten være `DIALOG_DELETED` eller `DIALOG_UPDATED`. Du vil motta nyttelaster strukturert som følger:

   ```json
   {
     "data": {
       "dialogEvents": {
         "id": "uuid-of-the-dialog",
         "type": "DIALOG_DELETED"  // Or "DIALOG_UPDATED"
       }
     }
   }
   ```

{{<children />}}