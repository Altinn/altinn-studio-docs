---
title: React
description: Modulært rammeverk for å utvikle UI komponenter og SPA applikasjoner.
tags: [tech, frontend, react]
---

![React logo](react-logo.svg "React logo")

- Modulært rammeverk for å utvikle UI komponenter som kan gjenbrukes flere steder i løsningen.
- Hvert React komponent har en tilstand som gir den data i henhold til hvor i applikasjonen brukeren er og hvilke handlinger som foretas.
- Vedlikeholdt av Facebook, under MIT lisens.

## Slik React blir brukt

### Uten redux
- Ved bruk av higher order components kan tilstand sendes fra rot-komponenten nedover i komponent-hierarkiet.
- Rot-komponenten håndterer alt av state, og sender callbacks ned i komponentene, slik at det er mulig og legge til, fjerne og endre komponeter.

![Higher order component](higher-order-component.png "Higher order component")

### Med redux
- Ved bruk av redux vil vi ikke være like avhengig av higher order components, da alle komponenenter kan kobles til redux-state av appen,
  og kunne håndtere det å legge til, fjerne eller endre komponenter selv.
- Håndtering av state skjer igjennom Actions og Reducers, som Redux arkitektur anbefaler.

![Redux architecture](redux-architecture.png "Redux architecture")

## Links

- https://reactjs.org 
- https://github.com/facebook/react

{{<children />}}
