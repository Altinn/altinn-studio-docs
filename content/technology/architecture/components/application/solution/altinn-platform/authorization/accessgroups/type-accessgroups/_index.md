---
title: Forslag tilgangsgupper i 3.0
linktitle: Tilgangsgrupper 3.0
description: 0.6 versjon av tilgangsgruppehierarki som skal benyttes for tjenester i Altinn autorisasjon 3.0
toc: true
 
---

Tilgangsgrupper **for virksomheter** skal erstatte 2.0 rollene som i dag benyttes til å gi tilgang til en tjeneste, se [Altinn roller brukt av virksomheter.](/app/development/configuration/authorization/guidelines_authorization/roles_and_rights/roles_altinn/altinn_roles_enterprices/)

Den største forskjellen på dagens 2.0 roller og tilgangsgrupper i 3.0 vil være: 
- tilgangsgruppene vil være flere, mer granulerte og inneholde tilgang til færre tjenester
- tilgangsgruppen vil grupperes i et hierarki slik at det blir lettere for administrator å finne frem til riktig tilgangsgruppe
- med mer granulerte tilgangsgrupper enn dagens 2.0 roller blir det enklere for tjenesteeiere å finne en tilgangsgruppe som treffer målgruppen for sin tjeneste


Forslaget til inndeling i tilgangsgrupper har hentet inspirasjon til gruppering av tilganger blandt annet fra [standarder for kategorisering av virksomheter hos SSB](https://www.ssb.no/klass/klassifikasjoner/6) og fra struktur på [Altinns skjemakatalog](https://www.altinn.no/skjemaoversikt/?category=category)

Det vil kun være mulig å knytte tjenester til det "laveste" nivå i tilgangshierarkiet, også kalt løvnoden. 
Det betyr at en tjeneste f eks ikke kan knyttes til tilgangsgruppen "Skatt, avgift og regnskap" eller til undergruppen "Skatt", 
men må knyttes til løvnodene som er "Foretaksskatt" og/eller "Skattegrunnlag". De tilgangsgrupper som er *løvnoder* og er markert med * i oversikten. 

Det vil være mulig å knytte en tjeneste til flere tilgangsgrupper hvis tjenesteeier mener dette er riktig i forhold til tjenestens innhold. 

Delegering av tilgangsgruppe til en bruker vil kun registreres på laveste nivå (løvnode). 
Årsaken til disse begrensningene er at det vil gi oss større frithet til sener å revidere tilgangsgrupper senere uten at det nødvendigvis betyr stor opprydding av delegeringer for sluttbruker eller tjenesteeier. 

Eksterne roller (fra f eks Enhetsregisteret) vil automatisk få tilgang til en tilgangsgruppe for en virksomhet. Altinn vil i samarbeid med Enhetsregisteret gjøre en ny vurdering av hvilke eksterne roller det er nø

Forslag til nye tilgangsgrupper sendes ut på høring september 2022. 


## Skatt, avgift og regnskap
Aktuell for alle virksomheter som er "økonomisk aktive" (skatte- og regnskapspliktig)

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
Aktuell for alle virksomheter med ansatte

Tilgangsgruppen har følgende undergrupper: 
- *Ansettelsesforhold (tilsvarende som i Altinn skjemakatalog)
- *Lønn (tilsvarende som i Altinn skjemakatalog)
- *Pensjon (tilsvarende som i Altinn skjemakatalog)
- *Permisjon og sykefravær (tilsvarende som i Altinn skjemakatalog)
  
Beslektet rolle i 2.0: "Lønn og personalmedarbeider", 

## Miljø, ulykke og sikkerhet 
Aktuell for de mange virksomheter

Tilgangsgruppen har følgende undergrupper: 
- Miljø og klimarapportering
  - Renovasjon
  - Miljørydding, miljørensing og lignende (tilsvarende som i Altinn skjemakatalog)
- Sikkerhet og internkontroll (tilsvarende som i Altinn skjemakatalog)
- Ulykke og yrkesskade (tilsvarende som i Altinn skjemakatalog)

Beslektet rolle i 2.0:  "Energi, miljø og klima"
- 
## Forhold ved virksomheten
Aktuell for alle virksomhter

Tilgangsgruppen har følgende undergrupper: 
- Starte, endre og avvikle virksomhet (tilsvarende som i Altinn skjemakatalog)
- Aksjer og eierforhold (tilsvarende som i Altinn skjemakatalog)
- Attester (tilsvarende som i Altinn skjemakatalog)
- Dokumentbasert tilsyn (tilsvarende som i Altinn skjemakatalog)
- Infrastruktur (tilsvarende som i Altinn skjemakatalog)
- Patent og varmerke (tilsvarende som i Altinn skjemakatalog)
- Tilskudd, støtte og erstatning (tilsvarende som i Altinn skjemakatalog)

Beslektet rolle i 2.0: "Signerer av samordnet registermelding" og "Patent, varemerke og design", 

## Postmottak
Aktuell for alle virksomheter

Tilgangsgruppen har følgende undergrupper: 
- Innenfor Administrasjon
- Plan, bygg og geodata
- Helse, sosial og omsorg
- Oppvekst og utdanning
- Kultur, idrett og fritid
- Trafikk, reiser og samferdesl
- Natur og miljø
- Næringsutvikling
- Skatter og avgifter
- Tekniske tjenester

Beslektet rolle i 2.0: "Post/arkiv"

## Taushetsbelagt post (?)
Aktuell for mange virksomheter

Tilgangsgruppen har følgende undergrupper: 
- Innenfor administrasjon
- Helse, sosial og omsorg
- Oppvekst og utdanning

Beslektet rolle i 2.0: "Taushetsbelagt post"

## Offentlige Digitale tjenester (tverrfaglig)
Aktuell for mange virksomheter

Tilgangsgruppen har følgende undergrupper: 
- Mine sider hos kommunen
- Dataintegrasjoner
  - Maskinportautorisasjon
  - Hendelser
  
Beslektet rolle i 2.0:

## Tilgangsstyring og administrasjon
Aktuell for alle virksomheter

Tilgangsgruppen har følgende undergrupper: 
- Klientadminstrasjon (REGN/REVI)
- Tilgangsstyring
- Hovedadministrator
- Kundeadministrator (Kunde-leverandør)

## Jordbruk, skogbruk, fisk og akvakultur
Bransjespesifikk

Tilgangsgruppen har følgende undergrupper: 
- Planteproduksjon og dyrehold
- Jakt og viltstell
- Skogbruk 
- Fiske og fangst
- Akvakultur


## Bygg, anlegg og eiendom
Bransjespesifikk

Tilgangsgruppen har følgende undergrupper: 
- Bygg og anlegg
  - Plan og byggesaker
- Omsetning og drift av eiendom
  - Kjøp og salg av eiendom
  - Utleie av eiendom
  - Eiendomsmegler


## Transport og lagring
Bransjespesifikk

Tilgangsgruppen har følgende undergrupper: 
- Landtransport og rørtransport
- Sjøfart
- Lufttransport
- Lagring og andre tjenester tilknyttet transport


## Helse og sosial
Bransjespesifikk

Tilgangsgruppen har følgende undergrupper: 
- Helsetjenester
- Pleie- og omsorgstjenester i institusjon
- Sosiale omsorgstjenester uten botilbud


## Oppvekst og utdanning
Bransjespesifikk

Tilgangsgruppen har følgende undergrupper: 
- ?
- ? 


## Energi, vann, olje og gass
Bransjespesifikk

Tilgangsgruppen har følgende undergrupper: 
- Produksjon, overføring og distribusjon av elektrisitet
- Produksjon av gass og distribusjon av gass gjennom ledningsnett
- Damp- og varmtvannsforsyning
- Utakk fra kilde, rensing og distribusjon av vann
- Oppsamling og behandling av avløpsvann
- Innsamling, behandling, disponering og gjenvinning av avfall
- Utvinning av råolje og naturgass


## Industri, næringsmidler og bergverk
Bransjespesifikk

Tilgangsgruppen har følgende undergrupper: 
- Næringsmidler, drikkevare og tobakk
- Tekstil-, beklednings- og lærvareindustri
- Trelast-, trevare- og papirvareindustri
- Trykking og reproduksjon av innspilte opptak
- Oljeraffinering, kjemisk og farmasøytisk industri
- Gummivare- og plastindustri, mineralproduktindustri
- Produksjon av metaller
- Produksjon av metallvarer, elektrisk utstyr og maskiner
- Verftsindustri og annen transportmiddelindustri
- Produksjon av møbler og annen industriproduksjon
- Reparasjon og installasjon av maskiner og utstyr
- Bergverk


## Kultur og frivillighet
Bransjespesifikk

Tilgangsgruppen har følgende undergrupper: 
- Kunstnerisk virksomhet og underholdningsvirksomhet
- Drift av biblioteker, arkiver, museer og annen kulturvirksomhet
- Lotteri og spill
- Sports- og fritidsaktiviteter 
- Drift av fornøyelsesetablissementer
- Politikk


## Varehandel, servering og overnatting
Bransjespesifikk

Tilgangsgruppen har følgende undergrupper: 
- Varehandel
- Reparasjon av motorvogn
- Overnattingsvirksomhet
- Serveringsvirksomhet
## Tjenesteytende næringer
Bransjespesifikk

Tilgangsgruppen har følgende undergrupper: 
- Post og telekommunikasjon
- Informasjon og kommunikasjon
- Finansiering og forsikring
- Omsetning og drift av eiendom
- Annen tjenesteyting

## Regnskapsfører
Brukes for klientdelegering hos regnskapsfører

Tilgangsgruppen har følgende undergrupper: 
- Regnskapsfører med signeringsrettighet
- Regnskapsfører uten signeringsrettighet
- Regnskapsfører lønn
## Revisor
Brukes ved klientdelegering hos revisor

Tilgangsgruppen har følgende undergrupper: 
- Ansvarlig revisor
- Revisormedarbeider

## Konkursbo
Brukes for tilgangsstyring til konkursbo

Tilgangsgruppen har følgende undergrupper: 
- ?
