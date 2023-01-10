---
title: Informasjonsbrev sendt tjenesteeier vedr API ressurser
linktitle: Infoskriv API ressurser
description: Her finner du brev som er sendt alle tjeneesteeiere vedrørende migrering av Delegerbare API ressurser
tags: [migration, plan, authorizaton]

---
Følgende brev er sendt tjenesteeiere som har tjenestetypen "Delegerbare API ressurser". Disse er: 
- Skatteetaten
- Statens vegvesen
- Mattilsynet
- Statens lånekasse for utdanning
- Norsk Helsenett
- NAV
- Digitalisteringsdirektoratet

## Viktig informasjon til tjenesteeiere av «Delegerbare API ressurser» i Altinn
Som vi tidligere har informert om så er vi nå i gang med dekomponering og migrering av Altinn Autorisasjon fra Altinn 2 platt til Altinn 3 formen. Se her for informasjon om fremdriftsplan. 

Vi begynner med å flytte funksjonalitet og tjenester av typen «Delegerbare API ressurser» og etter planen vil dette skje i slutten av januar/starten av februar. Se her for detaljert informasjon om flytting av tjenester.  

Alle tjenester av typen “Delegerbare API ressurser” vil bli flyttet fra Altinn 2 til Altinn 3 i ‘en operasjon. Det finnes i dag ca 82 tjenester av denne typen. Dette vil medføre en kort nedetid for disse tjenestene. Nedetid blir varslet på forhånd.

Digdir vil ta ansvar for å faktisk flytte tjenestene fra Altinn 2 til Altinn 3. Alle delegeringer som er gjort på tjenestene vil bli tatt vare på og flyttet sammen med tjenesten. Det betyr at alle systemleverandører som i dag har rettighet til å bruke deres APIer på vegne av sine kunder vil beholde disse delegeringene også etter at tjenestene er flyttet.

### Hva må tjenesteeier gjøre før tjenestene migreres 
Vedlagt finner dere en liste over alle Delegerbare API ressurser som din etat er tjenesteeier for og som i dag finnes i produksjon i Altinn. Vi ber om at dere går gjennom listen med disse og kontrollerer følgende:
1.	Er tjenesten fortsatt i bruk og skal flyttes fra Altinn 2 til Altinn 3? 
2.	Er tittel på tjenesten av god og brukervennlig kvalitet slik at det er enkelt for bruker å finne tjenesten? 
    a.	Tittel skal være oppgitt på alle tre språk (en, nb, nn) og er skilt ved hjelp av komma i filen. 
3.	Er delegeringsbeskrivelsen av god og brukervennlig kvalitet som forklarer bruker hvilke tjenester og informasjon man gir systemleverandør tilgang til? 
    a.	Delegeringsbeskrivelse skal være oppgitt på alle tre språk (en, nb, nn) og er skilt ved hjelp av komma i filen. 

*Vi ber om at dere gir oss skriftlig tilbakemelding på dette innen 15 januar. Tjenester vi ikke får tilbakemelding på vil ikke bli migrert og blir dermed tatt ut av produksjon og vil ikke fungere lengre.*  

### Konsekvenser for deg som tjenesteeier etter migrering
I dag opprettes nye tjenester av typen «Delegerbare API ressurser» via et REST grensesnittet «/maskinporten-api/delegationSchemes» i Altinn 2. Etter at tjenestene er flyttet vil ikke dette APIet være tilgjengelig lenger. 

Vi kommer til å lage nye API for å registrere tjenester av typen “Delegerbare API ressurser», men i en overgangsfase må de som ønsker å opprette nye tjenester gjøre dette ved å sende epost til Digdir slik at vi kan gjøre det for dere. 

Hvis dere har spørsmål så kan dere nå oss via altinn.slack.com eller ved å sende epost til tjenesteeier@altinn.no. 
