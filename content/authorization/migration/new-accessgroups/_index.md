---
title: Innføring av nye fullmaktsgrupper som erstatning for dagens Altinn 2 roller
linktitle: Nye fullmaktsgrupper
description: Siden er under konstruksjon 
toc: true
weight: 200
tags: [architecture, plan, authorizaton]

---
*Siden er under konstruksjon*

Altinn skal erstatte rollene som gir tilgang til tjenester i Altinn 2 når vi flytter Altinn Autorisasjon til Altinn 3. I stedet for roller vil det i Altinn 3 være ulike fullmaktsgrupper som består av tjenester som hører til et ansvarsområde. 

## Tidsplan for arbeidet
Foreløpig tidsplan for arbeidet ser slik ut: 

1. Foreslå nye fullmaktsgrupper (Q1 2023)
2. Gjennomføre høring av versjon 1 av forslag til fullmaktsgrupper (Q2/Q3 2023). Se [høringsbrev](https://docs.altinn.studio/authorization/migration/informasjon-sent/letter-accessgroupes/) sendt ut i starten av juni. Frist 1.8.2023
3. Etablere nye fullmaktsgrupper versjon 2 (Q3 2023)
4. Gjennomføre hørring av versjon 2 av forslag til fullmaktsgrupper (Q3/Q4 2023).Høring er ennå ikke sendt ut men forslaget utvikles [her](). Antatt høringsfrist blir slutten av okotber 2023.
5. Etablere endelig versjon av fullmaktsgrupper  
6. Innhente og registrere nye policyer for alle tjenester i Altinn 2 og Altinn 3 (Q4 2023/Q1 2024)
   - Policyen for tjenesten vil på dette tidpunktet henvise til både gamle Altinn 2 roller OG nye Altinn 3 fullmaktsgrupper
   - Vi antar at det i denne runden også vil være behov for justeringer av fullmaktsgruppene for å tilfredsstille behov hos tjenesteeiere som dukker opp. Dette gjøres fortløpende etterhvert som tjenesteeiere oppdager nye utfordringer. 
7. Lansere [ny brukerflate](/authorization/migration/#nye-tilgangsgrupper-og-ny-brukerflate-for-tilgangsstyring-for-virksomheter) for fullmaktstyring for virksomheter (Q1 2024)
   - Hver gang administrator logger på Altinn vil vedkommende få beskjed om at virksomheten har ansatte med tilgang til tjenester gjennom roller som skal fases ut innen en bestemt dato. De vil oppfordres til å rydde opp i god tid før fristen. Vi vil levere en veiviser som vil gjøre jobben enklere for administrator. 
   - Administrator for virksomheten vil fra dette tidspunktet kun få lov å gi ansatte de nye fullmaktsgruppene for sin virksomhet. Det gamle Altinn 2 rollene vil ikke lenger kunne delegeres til nye brukere, kun slettes
8. Avvikle Altinn 2 roller i løsningen (Q1 2025)
   - Policyen for tjenesten vil på dette tidpunktet endres til å henvise til bare nye Altinn 3 fullmaktsgrupper
   - Fra dette tidspunktet mister ansatte tilgang til tjenester gjennom de gamle Altinn 2 rollene

 Det er ikke før vi lanserer ny brukeflate for de som er administratorer for virksomhetene at de nye fullmaktsgruppene faktisk blir tatt i bruk og det vil være mulig å gi disse til ansatte. 
 I en overgangsfase (mellom pkt 5 og 6) må de tjenesteeierne som bruker Altinn-roller til å bestemme om noen har tilgang eller ikke til en tjeneste slå opp på om bruker enten har gammel Altinn 2 rolle eller de har fått en ny fullmaktsgruppe. 

 Vi har laget denne [overordnede issuen](https://github.com/Altinn/altinn-access-groups/issues/6) for innføring av nye fullmaktsgrupper hvor tidsplan holdes oppdatert. 


## Spørsmål og svar: 
1.	*Av dagens Altinn-roller, er det kun rollene Utfyller/innsender og Begrenset signeringsrett som ønskes fjernet?*
     
      Nei, alle gamle Altinn2 roller vil fjernes, men noen får fullmaktsgrupper som er ganske like, f eks rollen "patent og varemerke"
2. *Vil gamle Altinn-roller inngå i ny modell på nivå 3? 
      
      Etter en overgangsfase så vil alle eksisterende altinnroller fases ut og tjenester kun være tilgjengelig gjennom direkte delegering av tjeneste eller via en av de nye fullmaktsgruppene. 
3. *Vil koblingen mellom ER-roller og Altinn-roller bestå som i dag?*
      
      Roller i Enhetsreisteret vil knyttes til de nye fullmaktsgruppene. Når man har avsluttet høring vil vi starte arbeidet med å bestemme hvilke ER roller skal få hvilke fullmaktsgruppene. I dette arbeidet vil vi innvolvere en vurdring av Enhetsregister-rollens lovmessige fullmakt til å opptre på vegne av virksomheten. 
4. *Planlegges det ingen endring på Altinn-rollene for privatpersoner, kun virksomheter?* 
     
      Jo, dette vil gjøres i fase to. Da innføres nye fullmaktsgruppene for innbyggere som erstatter dagens Altinn2 roller. Intensjonen er at disse fullmaktsgruppene skal bygge på den granulering av fullmakter som er gjort for vergemål. 
5. *Vil rollene på nivå 1 være tjenesteeierspesifikke?*
      
    Ingen av fullmaktsgruppene er i utgangspunktet "tjenesterierspesifikke" - men noen av de vil kanskje være i bruk av kun en, eller veldig få tjenesteeiere. 
6. *Vi har veldig mange tjenester i Altinn. Er tidsplan for å innføre nye fullmaktsgrupper i løpet av Q12024 for disse realistisk?* 
      
      Ja det mener vi. 
      Vi ser ikke for oss at alle tjenesteeiere selv skal inn i TUL å redigere policyer for alle tjenester og sørge for at de blir produksjonssatt  – det er det rolleadministrator hos Altinn som gjør. 
      Det vi trenger fra dere er at dere angir hvilke nye fullmaktsgrupper som skal knyttes til eksisterende tjenester, resten av jobben gjør vi ved hjelp av scripting o.l.
      Vi vil lage veiledning for dette slik at det skal være enkelt for dere å samle inn data og sende til oss.

      Å utvide policy for tjeneste med å legge til en ny fullmaktsgruppe vil ikke påvirke tjenestens funksjonalitet, så det vil svært sannsynlig ikke være behov for testing utover den verifiseringen som gjøres av Altinn. 
7. *Når tenker dere å slette dagens Altinn-roller og når vil de nye rollene være klare til å tas i bruk?*
      
      Se pkt 6 i tidsplan øvers på denne siden. 
 
 8. *Hva må vi i praksis gjøre med de appene vi har kjørende på Altinn 3 før/når endringen iverksettes?*

      De må. på samme måte som tjenester i Altinn 2, oppdateres med nye Policyer som inkluderer nye fullmaktsgrupper i tillegg til de rollene som er definert der i dag. Dette gjøres i forkant av at nye fullmaktsgrupper tas i bruk
 9. *Vil enkeltrettighet forsvinne?*

      Nei, at en tjeneste endrer policy har ingen betydning for enkeltrettigehter som er delegert direkte på tjenesten. Alle enkeltrettigheter som en virksomhet har gitt til en ansatt i Altinn 2 vil flyttes sammen med lenketjenesten til Altinn 3 plattformen. 

 10. *Mange av våre skjemaer dekker flere ulike tema og går ut til mange ulike næringer ? Hvordan tenker dere at vi best håndterer slike?*

      Det vil være mulig å knytte tjenester til flere ulike fullmaktsgrupper samtidig. I tilfeller hvor tjenester omfatter flere tema bør man knytte tjenesten til alle fullmaktsområdene som passer.

11. *Når ny tjeneste for fullmaktsgrupper er satt i produksjon i Q1 2024 vil da ikke være mulig lenger å delegere rettigheter på eksisterende måte?*

       Også etter at nye fullmaktsgrupper er satt i produksjon så vil det fortsatt være mulig å deleger rettigheter til bare tjenesten/enkeltrettighet, på samme måte som i dag. 
       Men de gamle Altinn 2 rollene vil det da ikke være mulig å gi videre til andre, selv om man i en overgangsperiode fortsatt vil få utført tjenesten med denne rollen. 

