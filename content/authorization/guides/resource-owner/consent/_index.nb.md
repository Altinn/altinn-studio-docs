---
title: Samtykke for tjenesteeier
linktitle: Samtykke
description: Oversikt og innledning til veiledningene om Altinn Samtykke for tjenesteeiere.
toc: false
---

Altinn Samtykke lar en tjenesteeier be andre parter om et eksplisitt samtykke før data deles eller prosesser settes i gang.  
Som tjenesteeier må du både kunne etablere selve samtykkeressursen i Altinn og sikre at tjenesten din klarer å lese og verifisere samtykket som utstedes via Maskinporten.

Denne siden gir deg en overordnet introduksjon til veiledningene i denne seksjonen og hjelper deg å velge riktig løype.

## Veiledninger i denne seksjonen

### Opprett og konfigurer en samtykkeressurs

- **Målgruppe:** Ressursadministratorer og tjenesteeiere som skal beskrive hvilke data som omfattes av samtykket.
- **Innhold:** Viser hvordan du navngir ressursen, velger samtykkemal, konfigurerer metadata, tilgangsregler og delegering.
- **Lenke:** [Gå til veiledningen for å opprette samtykkeressurs](./create-resource/).

### Valider samtykker i tjenesten din

- **Målgruppe:** Utviklere og integrasjonsteam som bruker Maskinporten-tokenet i egen løsning.
- **Innhold:** Forklarer hvordan `authorization_details` og `consentRights` tolkes, samt hvordan du bekrefter at riktige rettigheter er lagt ved et token.
- **Lenke:** [Gå til veiledningen for å validere samtykker](./validate-concent/).

## Før du starter

Du må ha tilgang til ressursadministrasjon for din virksomhet i Altinn Studio. Dersom du mangler dette, følger du stegene i [Kom i gang-veiledningen](/nb/authorization/getting-started/resourceadministration/).

### Anbefalt arbeidsrekkefølge

1. Les veiledningen om å [opprette samtykkeressurs](./create-resource/) og konfigurer ressursen i testmiljø (TT02).
2. Implementer og [valider samtykket i tjenesten](./validate-concent/) før du går videre til produksjon.
3. Gjør en ende-til-ende-test med både ressursadministrator og tjenesteintegrasjon for å verifisere at samtykket dekker riktig datasett og at tokenet tolkes korrekt.

Når begge veiledningene er fulgt, er du klar til å publisere samtykkeressursen og begynne å motta samtykkeforespørsler fra sluttbrukere.
