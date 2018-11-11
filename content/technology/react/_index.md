---
title: React
description: React
weight: 100
tags: ["tjenester 3.0"]
---

- Modulært rammeverk som lager komponenter som kan gjennbrukes flere steder i løsningen.
- Hvert React komponent har en tilstand som gir den data i henhold til hvor i applikasjonen brukeren er og hvilke handlinger som foretas.
- Vedlikeholdt av Facebook, under MIT lisens.

### Slik react blir brukt i Tjeneste 3.0
#### Uten redux
- Ved bruk av higher order components kan tilstand sendes fra rot-komponenten nedover i komponent-hierarkiet.
- Rot-komponenten håndterer alt av state, og sender callbacks ned i komponentene, slik at det er mulig og legge til, fjerne og endre komponeter.
![Arkitektur](https://blog.pixelingene.com/images/2016-07-13-patterns-of-higher-order-components-in-react/hoc.png)

#### Med redux
- Ved bruk av redux vil vi ikke være like avhengig av higher order components, da alle komponenenter kan kobles til redux-state av appen, og kunne håndtere det å legge til, fjerne eller endre komponenter selv.
- Håndtering av state skjer igjennom Actions og Reducers, som Redux arkitektur anbefaler.
![Arkitektur](https://d2yei5s1by8ykd.cloudfront.net/wp-content/uploads/2017/03/07151912/a962595e-6313-423c-b45f-b7db5b6af1f4_Screenshot202017-03-072013.20.36.png)

#### Lenker
- [Offisiell nettside](https://reactjs.org/)  
- [Github](https://github.com/facebook/react)  
