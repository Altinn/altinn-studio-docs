---
title: For deg som skal utvikle en app
linktitle: Lag en app
weight: 10
draft: true
marp: true
headingDivider: 4
style: |
  section {
    color: #393b51
  }
header: 'Lag en app'
footer: 'Altinn Studio - kom i gang'
---
---
Her finner du veiledninger som får deg i gang med å lage en tjeneste i Altinn Studio. Veiledningene er konkrete og 
bygger på hverandre. Trenger du mer informasjon om konseptene som brukes i disse veiledningene kan du lese mer
under [Utvikle tjenester]({{<relref "/altinn-studio/v9/develop-a-service">}}) i hovedmenyen på venstre side.

Veiledningene antar ingen tidligere kjennskap til Altinn Studio. Oppgavene du skal gjennom vil hjelpe deg raskt komme i gang med å lage en tjeneste i Altinn Studio, og ta deg gjennom en del grunnleggende konsepter som er sentrale i Altinn Studio.

Veiledningen er delt opp i flere moduler:
- [Lage skjema](./basic-form/) vil gi deg den grunnleggende kunnskapen du trenger for å lage et enkelt skjema.
- [Tilgangskontroll](./access-control/) vil hjelpe deg å forstå hvordan du kan styre tilgang til tjenesten din.
- [Publiser og test](./publish/) vil vise deg hvordan du tilgjengeliggjør tjenesten og tester den i et testmiljø.
  
## Hva skal vi lage?

Vi skal lage et enkelt skjema i Altinn Studio, der brukeren blir bedt om å fylle ut informasjon om seg selv og sende 
det inn. Vi baserer oss på et fiktivt case for Sogndal kommune, der kommunen ønsker å samle inn nyttig informasjon om nye
tilflyttere, for å kunne tilpasse tjenestetilbudet.

Når du er ferdig, vil du ha en fullstendig tjeneste kjørende i testmiljø, med et skjema som kan fylles ut og sendes inn.

## Før du starter
### Lag en bruker i Altinn Studio

Du trenger en bruker i Altinn Studio for å følge denne veiledningen. For å kunne følge alle stegene, må denne brukeren 
være en del av en organisasjon som har tilgang til et testmiljø. 
Om du ikke har tilgang til en slik organisasjon, kan du ikke følge den siste modulen ([Publiser og test](./publish/)).

[Følg oppskriften for å opprette en bruker i Altinn Studio](../create-user/).

{{<children />}}