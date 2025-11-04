---
title: Klientdelegering
description:
linktitle: Klientdelegering
weight: 2
---

# Tildeling av klienter til systemtilgang

Dersom du oppretter en systemtilgang for klientsystemer, kan klienter tildeles enten i Altinn-portalen. Dette steget gjelder ikke dersom du oppretter en systemtilgang for eget system.
Om du utøver tjenester på vegne av en annen virksomhet og dette skal gjøres ved hjelp av Systemtilgang må klient-virksomheten gi fullmakt til dette til din virksomhet. Hvordan disse forholdene oppstår kan du lese mer om her: [Systemtilgang for klientsystem](/nb/authorization/guides/system-vendor/system-user/#systembruker-for-klientsystem).

## I Altinn-portalen

1. Gå til oversikten over systemtilganger
2. Velg en eksisterende systemtilgang for kunder
   ![klientdelegering steg 1](delegate_clients_1.png)
3. Trykk **"Legg til kunder"**  
   ![klientdelegering steg 2](delegate_clients_2.png)
4. Velg klienter (én, flere eller alle). Hvis du ikke ser noen klienter i denne modalen, er ikke klientforholdet satt opp. Se [guide for å sette opp dette under](nb/authorization/guides/end-user/system-user/delegate-clients/#klientdelegering-der-klientforhold-ikke-eksisterer-fra-før)
   ![klientdelegering steg 3](delegate_clients_3.png)
5. Trykk **Bekreft og lukk** etter klienter er lagt til 


## Klientdelegering der klientforhold ikke eksisterer fra før

Dersom du trenger å delegere klienter, men det ikke finnes et eksisterende klientforhold fra før, må dette forholdet etableres før du kan fortsette med delegeringsprosessen. 
Dette gjelder tilfeller der det ikke finnes et etablert klientforhold i Brønnøysundregistrene. Det er kundene selv som gir denne fullmakten til virksomhetenen som eier systembrukeren.

### Forutsetninger

- Du må ha tilgang til Altinn som **Klientadministrator** eller **Daglig leder**.

### Prosess

1. Logg på som daglig leder i virksomheten som skal legges til som kunde i systemtilgang for kunder (trenger eksempeldata!)
2. Gå til "Brukere" i menyen
3. Trykk på "+ Ny bruker" for å etablere et klientforhold.
4. Skriv inn organisasjonsnummeret til virksomheten du ønsker å gi fullmakt til
5. Trykk på "Gi fullmakt +"
   ![Steg 1 - Gi fullmakt](add_user1.png)
6. Gi fullmakt til alle tilgangspakken(e) som systemtilgangen er satt opp med (eksempeldata). Klientforhold for tilgangspakkene for regnskapsfører, revisor og forretningsfører er etablert gjennom Brønnøysundregistrene, og fullmakt kan ikke gis i dette skjermbildet.
   ![Steg 2 - Deleger tilgangspakke](add_user2.png)
   Du har nå etablert et klientforhold som kan brukes for systemtilgangen. 
7. Logg inn igjen som **Klientadministrator** eller **Daglig leder** i virksomheten som eier systemtilgangen (Varm Økonomisk Ape). Du skal nå kunne legge til klienten (EKSEMPEL)
   ![Steg 3 - Legg til klient](add_user3.png)

Etter at du har etablert klientforholdet gjennom disse stegene, kan du fortsette med prosessen beskrevet over der du kan legge til kunder.
