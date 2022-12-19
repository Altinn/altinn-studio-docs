---
title: Planer for migrering av tjenester i Altinn
linktitle: Plan tjenestemigrering
description: Her finner du foreløpig plan for migrering av tjenester, i hvilken rekkefølge dette skal skje og når de enkelte tjenestetypene skal være flyttet fra Altinn 2 til Altinn 3. 
toc: true
tags: [architecture, plan, authorizaton]

---
## Skjema-, innsyns- og samhandlingstjenester
### Migreringsstrategi
Tjenesteeier er selv ansvarlig for å migrere disse tjenestene fra Altinn 2 til Altinn 3. Det innebærer at man må utvikle skjematjenesten på nytt som en 3.0 app.  
[Her finner du veiledning](/app/) for hvordan dette gjøres. 

### Tidsplan
- Oppstart utvikling: Påbegynt
- Migrering tjenester avsluttet: senest Q1 2025
  

## Delegerbare API ressurser
### Migreringsstrategi 
Alle tjenester av typen "Delegerbare api ressurser" vil bli flyttet fra Altinn 2 til Altinn 3 i en operasjon. 
Dette vil medføre en kort nedetid for disse tjenestene. Nedetid blir varslet på forhånd. 

Digdir vil ta ansvar for å flytte alle disse tjenestene. Tjenesteeier må i den forbindelse bidra med noe utfyllende informasjon om sine tjenester. Alle dette gjelder vil bli kontaktet særskilt.  

Alle delegeringer som finnes for disse tjenestene vil bli tatt vare på og flyttet samtidig med tjenesten fra Altinn 2 til Altinn 3. 
Det betyr at alle systemleverandører som i dag har rettighet til å bruke "Delegerbare API ressurser" på vegne av sine kunder vil beholde disse delegeringene etter at tjenestene er flyttet. 

### Ny brukerflate for administrering av Delegerbare API ressurser
I forbindelse med migrering av tjenestene så vil vi tilby en ny brukerflate for å administrere disse. 
![Skisseforslag på ny brukerflate for tilgangsstyring til Delegerbare API ressurser](new-dialoge-apiresource.jpg "Forslag til ny brukerflate for delegering av API ressurser")

### Konsekvenser for tilhørende API
Etter at tjenestene er flyttet vil det ikke være mulig for tjenesteeiere å opprette nye Delegerbare API ressurser via dagens grensesnitt. 
Tjenesteeiere som ønsker å opprette  nye tjenester av typen "Delegerbare API ressurser" må enten ta i bruk de nye APIene eller via epost be Digdir om å opprette disse på deres vegne. 

Det vil bli laget nye API for å hente ut informasjon om hvilke delegeringer som foreligger. Dette er API som i dag brukes av Maskinporten, Norsk Helsenett og SKatteetaten. 
Det vil i en overgangsfase være mulig å benytte de gamle API-ene. 

### Tidsplan
- Oppstart utvikling: Påbegynt
- Migrering tjenester avsluttet:  Q1 2023
- Frist for å ta i bruk nye API: ikke besluttet

## Lenketjenester
### Migreringsstrategi 
Alle tjenester av typen "Lenketjenester" flyttes èn og èn fra Altinn 2 til Altinn 3. Lenketjenester bytter navn i den forbindelse og vil i Altinn 3.0 bli kalt "eksterne tjenesteressurser".

Digdir vil ta ansvar for å flytte alle disse tjenestene. Tjenesteeier må i den forbindelse bidra med noe utfyllende informasjon om sine tjenester. Alle dette gjelder vil bli kontaktet særskilt.  

Alle delegeringer som finnes for disse tjenestene vil bli tatt vare på og flyttet samtidig med tjenesten fra Altinn 2 til Altinn 3. 
Det betyr at alle brukere som i dag har tilgang til en ekstern lenketjenester på vegne av en aktør vil beholde disse delegeringene etter at tjenestene er flyttet. 

### Konsekvenser for tilhørende API
Det vil bli laget nye API for å hente ut informasjon om brukers rettigheter på vegne av andre.
Dette er API som i dag brukes av alle tjenesteeiere som har opprettet lenketjenster og som bruker Altinn som tilgangsstyringsløsning på deres egen tjensteplattform. 
Det vil i en overgangsfase være mulig å benytte de gamle API-ene på REST og SOAP

### Tidsplan
- Oppstart utvikling: 01.01.2023
- Migrering avsluttet: Q3 2023
- Frist for å ta i bruk nye API: ikke besluttet

## Samtykketjenester
### Migreringsstrategi
Det er ikke bestemt om tjenester av typen "Samtykke" skal flyttes èn og èn fra Altinn 2 til Altinn 3 eller om det skal gjøres i èn operasjon.  

Digdir vil ta ansvar for å flytte alle disse tjenestene. 

Alle samtykker som finnes for disse tjenestene vil bli tatt vare på og flyttet samtidig med tjenesten fra Altinn 2 til Altinn 3. 
Det betyr at alle brukere som i dag har fått samtykke på vegne av en aktør vil beholde dette etter at tjenestene er flyttet. 

### Konsekvenser for tilhørende API
Det er fortsatt ikke utredet hvilke konsekvenser dette får for API som tilhører samtykketjenester. 
Det vil i en overgangsfase være mulig å benytte de gamle API-ene. 

### Tidsplan
- Oppstart utvikling: Q2 2023
- Migrering av tjenester avsluttet:  Q2 2024
- Frist for å ta i bruk nye API: ikke besluttet

## Formidlingstjenester
### Migreringsstrategi
Det er ikke bestemt om alle tjenester av typen "Formidlingstjenester" skal flyttes èn og èn fra Altinn 2 til Altinn 3 eller om det skal gjøres i èn operasjon.  
Digdir vil ta ansvar for å flytte alle disse tjenestene.  

### Konsekvenser for tilhørende API
Det er fortsatt ikke utredet hvilke konsekvenser dette får for API som tilhører formidlingstjenesten. 
Det vil i en overgangsfase være mulig å benytte de gamle API-ene. 

### Tidsplan
- Oppstart utvikling: ikke besluttet
- Migrering av tjenester avsluttet: ikke besluttet
- Frist for å ta i bruk nye API: ikke besluttet

## Meldingstjenester
### Migreringsstrategi
Det er ikke bestemt hvilken migreringsstrategi man skal ha for meldingstjenester (Correspondence). 

### Konsekvenser for tilhørende API
Det er ikke utredet hvilke konsekvenser dette har på tilhørende API

### Tidsplan
- Oppstart utvikling: ikke besluttet
- Migrering av tjenester avsluttet: ikke besluttet
- Frist for å ta i bruk nye API: ikke besluttet
