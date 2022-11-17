---
title: Forslag tilgangsgupper i 3.0
linktitle: Tilgangsgrupper 3.0
description: Her finner du forslag til nye tilgangsgrupper for virksomheter. Disse skal erstatte Altinn rollene som i dag benyttes for å gi tilgang til en tjeneste
toc: true
 
---

*Denne siden er under arbeid.*

## Hva er tilgangsgruppe og hvordan skal de brukes

Den største forskjellen på dagens [2.0 roller](/app/development/configuration/authorization/guidelines_authorization/roles_and_rights/roles_altinn/altinn_roles_enterprices/) og tilgangsgrupper i 3.0 vil være: 
- tilgangsgruppene vil være flere, mer granulerte og inneholde tilgang til færre tjenester
- tilgangsgruppen vil grupperes i et hierarki slik at det blir lettere for administrator å finne frem til riktig tilgangsgruppe
- med mer granulerte tilgangsgrupper enn dagens 2.0 roller blir det enklere for tjenesteeiere å finne en tilgangsgruppe som bedre treffer målgruppen for sin tjeneste

Forslaget til inndeling i tilgangsgrupper har hentet inspirasjon til gruppering av virksomhetsområder og tjenester fra blandt annet [standarder for kategorisering av virksomheter hos SSB](https://www.ssb.no/klass/klassifikasjoner/6) og fra dagens struktur på [Altinns skjemakatalog](https://www.altinn.no/skjemaoversikt/?category=category)

Det vil kun være mulig å knytte tjenester til det "laveste" nivå i tilgangshierarkiet, også kalt løvnoden. 
Det betyr at en tjeneste f eks ikke kan knyttes til tilgangsgruppen "Skatt, avgift og regnskap" eller til undergruppen "Skatt", 
men må knyttes til løvnodene som er "Foretaksskatt" og/eller "Skattegrunnlag". De tilgangsgrupper som foreløpig er vurdert til *løvnoder* og er markert med * i oversikten. For noen løvnoder kan det bli aktuelt å granulere tilgangene mer, dersom det avdekkes behov for det.

Det vil være mulig å knytte en tjeneste til flere tilgangsgrupper hvis tjenesteeier mener dette er riktig i forhold til tjenestens innhold. 

Delegering utføres ved at en bruker legges til en tilgangsgruppe. En bruker kan kun legges til tilgangsgrupper på laveste nivå (løvnode). 
Årsaken til disse begrensningene er at det vil gi oss større frihet til å revidere tilgangsgrupper senere uten at det nødvendigvis betyr stor opprydding av delegeringer for sluttbruker eller tjenesteeier. 

Eksterne roller (fra f eks Enhetsregisteret) vil automatisk få tilgang til en tilgangsgruppe for en virksomhet. Altinn vil i samarbeid med Enhetsregisteret gjøre en ny vurdering av hvilke eksterne roller det er aktuelt å knytte til de ulike tilgangsgruppene.

### Tilgangsgrupper for digital post kommer senere
Virksomheter får i dag tilgang til sin digital post i Altinn gjennom roller rettet mot "post/arkiv" som settes på tjenestenivå. Det er pr i dag uklart om denne måten å styre tilgang til digital post skal videreføres når man migrerer digital post fra Altinn 2 til Altinn 3.

Det er derfor i første versjonen av nye tilgangsgrupper ikke foreslått tilgangsgrupper knyttet til mottak av digital post

### Høring
Forslag til nye tilgangsgrupper sendes ut på høring desember 2022.
Vi ønsker at dagens tjenesteeiere vurderer om foreslåtte tilgangsgrupper er hensiktsmessige for deres tjenester. Vi ønsker også tilbakemelding hvis man har forslag til bedre/annen navngivning på tilgangsgruppene enn de som foreligger.

Tilbakemelding kan gis på epost til servicedesk@altinn.no innen 31 januar 2023. 

# Forslag til tilgangsgrupper: 

## Skatt, avgift og regnskap
Tilgangsgruppene vil være aktuell for alle virksomheter som er "økonomisk aktive" (skatte- og regnskapspliktig)


Tilgangsgruppen har følgende undergrupper: 
- Skatt
  - *Foretaksskatt (tilsvarende som i Altinn skjemakatalog)
  - *Skattegrunnlag (tilsvarende som i Altinn skjemakatalog)
- Merverdiavgift
  - *Merverdiavgift (tilsvarende som i Altinn skjemakatalog)
  - *Reviorattesterer - MVA kompensasjon (usikker om denne skal beholdes?)
- Regnskap og øknomirapportering
  - *Regnskap og øknomirapportering (tilsvarende som i Altinn skjemakatalog)
- Toll 
  - *Toll (tilsvarende som i Altinn skjemakatalog)


Beslektet rolle i 2.0: "Regnskapsmedarbeider" og "Revisorattesterer - MVA kompensasjon"


## Lønn og personal 
Tilgangsgruppene vil være aktuell for alle virksomheter med ansatte

Tilgangsgruppen har følgende undergrupper: 
- *Ansettelsesforhold (tilsvarende som i Altinn skjemakatalog)
- *Lønn (tilsvarende som i Altinn skjemakatalog)
- *Pensjon (tilsvarende som i Altinn skjemakatalog)
- *Permisjon og sykefravær (tilsvarende som i Altinn skjemakatalog)
  
Beslektet rolle i 2.0: "Lønn og personalmedarbeider", 


## Miljø, ulykke og sikkerhet 
Tilgangsgruppene vil være aktuell for de mange virksomheter

Tilgangsgruppen har følgende undergrupper: 
- Miljø og klimarapportering
  - *Renovasjon
  - *Miljørydding, miljørensing og lignende (tilsvarende som i Altinn skjemakatalog)
- *Sikkerhet og internkontroll (tilsvarende som i Altinn skjemakatalog)
- *Ulykke og yrkesskade (tilsvarende som i Altinn skjemakatalog)

Beslektet rolle i 2.0:  "Energi, miljø og klima"
  

## Forhold ved virksomheten
Tilgangsgruppene vil være aktuell for alle virksomhter

Tilgangsgruppen har følgende undergrupper: 
- *Starte, endre og avvikle virksomhet (tilsvarende som i Altinn skjemakatalog)
- *Aksjer og eierforhold (tilsvarende som i Altinn skjemakatalog)
- *Attester (tilsvarende som i Altinn skjemakatalog)
- *Dokumentbasert tilsyn (tilsvarende som i Altinn skjemakatalog)
- *Infrastruktur (tilsvarende som i Altinn skjemakatalog)
- *Patent og varmerke (tilsvarende som i Altinn skjemakatalog)
- *Tilskudd, støtte og erstatning (tilsvarende som i Altinn skjemakatalog)

Beslektet rolle i 2.0: "Signerer av samordnet registermelding" og "Patent, varemerke og design", 


## Offentlige Digitale tjenester (tverrfaglig)
Tilgangsgruppene vil være aktuell for mange virksomheter

Tilgangsgruppen har følgende undergrupper: 
- *Mine sider hos kommunen
- Dataintegrasjoner
  - *Programmeringsgrensesnitt (API)
  - *Maskinlesbare hendelser
  
Beslektet rolle i 2.0:


## Tilgangsstyring og administrasjon
Tilgangsgruppene vil være aktuell for alle virksomheter

Tilgangsgruppen har følgende undergrupper: 
- *Klientadminstrasjon (REGN/REVI)
- *Tilgangsstyring
- *Hovedadministrator
- *Kundeadministrator (Kunde-leverandør)

Beslektet rolle i 2.0: Klientaadministrator, Tilgangsstyrer, Hovedadministrator 

## Jordbruk, skogbruk, fisk og akvakultur
Tilgangsgruppene er bransjespesifikk og vil være aktuell for virksomheter som bruker tjenester rettet mot disse bransjene

Tilgangsgruppen har følgende undergrupper: 
- *Planteproduksjon og dyrehold
- *Jakt og viltstell
- *Skogbruk 
- *Fiske og fangst
- *Akvakultur


## Bygg, anlegg og eiendom
Tilgangsgruppene er bransjespesifikk og vil være aktuell for virksomheter som bruker tjenester rettet mot disse bransjene

Tilgangsgruppen har følgende undergrupper: 
- Bygg og anlegg
  - *Plan og byggesaker
- Omsetning og drift av eiendom
  - *Kjøp og salg av eiendom
  - *Utleie av eiendom
  - *Eiendomsmegler


## Transport og lagring
Tilgangsgruppene er bransjespesifikk og vil være aktuell for virksomheter som bruker tjenester rettet mot disse bransjene


Tilgangsgruppen har følgende undergrupper: 
- *Landtransport og rørtransport
- *Sjøfart
- *Lufttransport
- *Lagring og andre tjenester tilknyttet transport


## Helse og sosial
Tilgangsgruppene er bransjespesifikk og vil være aktuell for virksomheter som bruker tjenester rettet mot disse bransjene


Tilgangsgruppen har følgende undergrupper: 
- *Helsetjenester
- *Pleie- og omsorgstjenester i institusjon
- *Sosiale omsorgstjenester uten botilbud
- *Barnevern og familievern


## Oppvekst og utdanning
Tilgangsgruppene er bransjespesifikk og vil være aktuell for virksomheter som bruker tjenester rettet mot disse bransjene

Tilgangsgruppen har følgende undergrupper: 
- Skole  (usikker på om det er behov for oppdeling av ulike nivå på utdanning/skole)
  - *Grunnskole
  - *Videregående utdanning
  - *Høyere utdanning
- *Barnehage 


## Energi, vann, olje og gass
Tilgangsgruppene er bransjespesifikk og vil være aktuell for virksomheter som bruker tjenester rettet mot disse bransjene

Tilgangsgruppen har følgende undergrupper: 
- *Produksjon, overføring og distribusjon av elektrisitet
- *Produksjon av gass og distribusjon av gass gjennom ledningsnett
- *Damp- og varmtvannsforsyning
- *Utakk fra kilde, rensing og distribusjon av vann
- *Oppsamling og behandling av avløpsvann
- *Innsamling, behandling, disponering og gjenvinning av avfall
- *Utvinning av råolje og naturgass


## Industri, næringsmidler og bergverk
Tilgangsgruppene er bransjespesifikk og vil være aktuell for virksomheter som bruker tjenester rettet mot disse bransjene

Tilgangsgruppen har følgende undergrupper: 
- *Næringsmidler, drikkevare og tobakk
- *Tekstil-, beklednings- og lærvareindustri
- *Trelast-, trevare- og papirvareindustri
- *Trykking og reproduksjon av innspilte opptak
- *Oljeraffinering, kjemisk og farmasøytisk industri
- *Gummivare- og plastindustri, mineralproduktindustri
- *Produksjon av metaller
- *Produksjon av metallvarer, elektrisk utstyr og maskiner
- *Verftsindustri og annen transportmiddelindustri
- *Produksjon av møbler og annen industriproduksjon
- *Reparasjon og installasjon av maskiner og utstyr
- *Bergverk


## Kultur og frivillighet
Tilgangsgruppene er bransjespesifikk og vil være aktuell for virksomheter som bruker tjenester rettet mot disse bransjene

Tilgangsgruppen har følgende undergrupper: 
- *Kunstnerisk virksomhet og underholdningsvirksomhet
- *Drift av biblioteker, arkiver, museer og annen kulturvirksomhet
- *Lotteri og spill
- *Sports- og fritidsaktiviteter 
- *Drift av fornøyelsesetablissementer
- *Politikk


## Varehandel, servering og overnatting
Tilgangsgruppene er bransjespesifikk og vil være aktuell for virksomheter som bruker tjenester rettet mot disse bransjene

Tilgangsgruppen har følgende undergrupper: 
- *Varehandel
- *Reparasjon av motorvogn
- *Overnattingsvirksomhet
- *Serveringsvirksomhet
 
 
## Tjenesteytende næringer
Tilgangsgruppene er bransjespesifikk og vil være aktuell for virksomheter som bruker tjenester rettet mot disse bransjene

Tilgangsgruppen har følgende undergrupper: 
- *Post og telekommunikasjon
- *Informasjon og kommunikasjon
- *Finansiering og forsikring
- *Omsetning og drift av eiendom
- *Annen tjenesteyting

## Regnskapsfører
Tilgjengelig kun for regnskapsfører og brukes for å gi egne ansatte tilgang til virksomheter/klienter de er registert som regnskapsførere for i Enhetsregisteret

Tilgangsgruppen har følgende undergrupper: 
- *Regnskapsfører med signeringsrettighet
- *Regnskapsfører uten signeringsrettighet
- *Regnskapsfører lønn

Disse tilgangsgruppen er videreføring av tilsvarende roller som finnes i dag for regnkspaførere

## Revisor
Tilgjengelig kun for revisor og brukes for å gi egne ansatte tilgang til virksomheter/klienter de er registert som revisor for  i Enhetsregisteret

Tilgangsgruppen har følgende undergrupper: 
- *Ansvarlig revisor
- *Revisormedarbeider

Disse tilgangsgruppen er videreføring av tilsvarende roller som finnes i dag for revisorer

## Konkursbo
Tilgjengelig kun for konkursbo og brukes for å gi kreditorer og andre tilgangt tilgang til opplysninger vedr et konkursbo

Tilgangsgruppen har følgende undergrupper: 
- *konkursbo tilgangsstyring
- *Konkursbo lesetilgang
- *Konkursbo skrivetilgang

Disse tilgangsgruppen er videreføring av tilsvarende roller som finnes i dag for konkursbo
