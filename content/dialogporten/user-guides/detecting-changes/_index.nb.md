---
title: 'Oppdage endringer'
description: 'Hvordan bruke Altinn Events og GraphQL-varslinger for å oppdage endringer i Dialogporten'
weight: 40
---

## Introduksjon

Denne veiledningen viser hvordan du kan sette opp et system for å oppdage endringer som gjøres i dialoger.

For en funksjonell oversikt, se [komme i gang med hendelser](/nb/dialogporten/getting-started/events/).

Det finnes to forskjellige måter å oppdage endringer på: ved å bruke Altinn Events eller GraphQL-abonnementer.

### Når du bør bruke Altinn Events

* Du må kunne oppdage at nye dialoger opprettes
* Du må kunne oppdage endringer på et vilkårlig antall eksisterende dialoger
* Du kan enten oppgi et HTTPS-endepunkt som skal brukes som webhook for pushed hendelser, eller du trenger å polle et Event API for en liste over hendelser

### Når du bør bruke GraphQL-abonnementer

* Du må kunne overvåke én enkelt dialog, eller et lavt antall kjente dialoger
* Du trenger bare å overvåke i en kort periode, vanligvis mens en bruker er til stede i GUI-et du bygger
* Du trenger lav latens
* Du kan håndtere en websocket-tilkobling eller server-sent events via HTTP

Hvis du er usikker, ønsker du sannsynligvis Altinn Events.

## Hvordan abonnere på Altinn Events

Se [dokumentasjonen for Altinn Event-komponenten](/nb/events/subscribe-to-events/) for en generell veiledning om hvordan du kommer i gang med enten abonnement via webhook, anbefalt, eller polling av Event API-et etter hendelser.

For teknisk informasjon om de ulike hendelsestypene og formatene som produseres av Dialogporten, se [teknisk referanse for hendelser](/nb/dialogporten/reference/events/).

## Hvordan bruke GraphQL-abonnementer

Denne veiledningen forutsetter at du har grunnleggende forståelse av GraphQL-operasjoner og fokuserer på oppsett og bruk av abonnementer. Hvis du trenger mer detaljerte instruksjoner om hvordan du setter opp den første GraphQL-klienten, se dokumentasjonen for biblioteket, klienten eller SDK-en du har valgt.

Før du kan sette opp et GraphQL-abonnement, må du hente dialogdetaljene for å få tak i nødvendig dialogtoken. Dette tokenet er avgjørende for autorisasjon når abonnementet settes opp.

### Steg-for-steg-veiledning

1. **Hent dialogdetaljer**  
   Hent dialogen du vil overvåke. Dette kan vanligvis gjøres gjennom en GraphQL-query eller ved å bruke et REST-endepunkt. Se veiledningen om [å hente dialogdetaljer](/nb/dialogporten/user-guides/getting-dialog-details/) for mer informasjon.

2. **Sett opp abonnementet**  
   Når du har dialogtokenet, kan du sette opp abonnement på `dialogEvents`. Bruk `dialogId` for dialogen du er interessert i for å abonnere på hendelser knyttet til den. Slik kan abonnementsqueryen se ut:
   
   ```graphql
   subscription {
     dialogEvents(dialogId: "your-dialog-id-here") {
       id
       type
     }
   }
   ```

   Sørg for å inkludere dialogtokenet i `Authorization`-headeren for forespørselen:
   
   ```http
   "Authorization": "Bearer your-dialog-token-here"
   ```

3. **Håndter innkommende hendelser**  
   Når abonnementet er aktivt, vil serveren pushe oppdateringer til klienten hver gang det skjer en endring knyttet til dialog-ID-en du abonnerte på. Hendelser kan være enten `DIALOG_DELETED` eller `DIALOG_UPDATED`. Du vil motta payloads strukturert slik:

   ```json
   {
     "data": {
       "dialogEvents": {
         "id": "uuid-of-the-dialog",
         "type": "DIALOG_DELETED"  // Eller "DIALOG_UPDATED"
       }
     }
   }
   ```

{{<children />}}
