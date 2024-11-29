---
title: Access Packages
linktitle: Tilgangspakker
description: Tilgangspakker er samlinger av fullmakter til tjenester og ressurser innen ulike områder.
tags: [architecture, security, authorization, xacml]
weight: 99
hidden: true
---

{{<notice warning>}}
This is work in progress
{{</notice>}}


For å styre tilgang til tjenester og ressurser, skal tilgangspakker benyttes. De fleste tilgangpakkene er forhåndstildelt et utvalg av roller fra Enhetsregisteret, og kan deles videre til andre som faktisk skal benytte tjenestene på vegne av virksomheten. Rollene fra Enhetsregisteret som får tilgangspakkene forhåndstildelt, er de rollene som har fullmakter til å opptre på vegne av virksomheten etter selskapslovgivningen.    

Det finnes unntak på tilgangspakker som ingen har fått forhåndstildelt, for eksempel "Post til virksomheten med taushetsbelagt innhold". Tilgang til tjenester og ressurser som er knyttet til disse tilgangspakkene, må deles av Hovedadministrator i virksomheten, enten som enkeltrettigheter eller i tilgangspakken.

Tilgangspakkene er inndelt i kategorier, og inndelingen er inspirert og delvis basert på <a href="https://www.ssb.no/klass/klassifikasjoner/6">SSB's kategorisering av virksomheter</a>. I hver kategori finnes tilgangspakker som naturlig hører hjemmme i kategorien. 
Kategoriene er ment som hjelp til å finne riktig tilgangspakke, både for tjenesteeier/ressurseier som konfigurerer tilgangsreglene for tjenesten/ressursen, og for sluttbruker som skal dele tilgang med andre.

| Hovedkategori| Beskrivelse|
|---|---|---|
|[Skatt, avgift, regnskap og toll](http://docs.altinn.studio/authorization/what-do-you-get/accessgroups/type-accessgroups/skattavgiftregnskaptoll/#skatt-avgift-regnskap-og-toll)| Omfatter tilgangspakker som gir fullmakter til tjenester og ressurser som omhandler skatt, avgift, regnskap og toll.|
| [Personale]| | |
| | Ansetttelsesforhold| |
| | Lønn| |
| | Pensjon| |
| | Permisjon og sykefravær| |
| | A-ordningen| |
| [Miljø, ulykke og sikkerhet]| | |
| | Renovasjon| |
| | Miljørydding, miljørensing og lignende| |
| | Bærekraft| |
| |Sikkerhet og internkontroll| |
| |Ulykke og yrkesskade| |
| [Post og arkiv]| | |
| | Ordinær post til virksomheten|||
| | Post til virksomheten med taushetsbelagt innhold| |
| [Forhold ved virksomheten]| | |
| | Generelle Helfo tjenester| |
| | Helfotjenester med personopplysninger av særøog kategori| |
| | Starte, endre og avvikle virksomhet| |
| | Aksjer og eierforhold| |
| | Attester | |
| | Dokumentbasert tilsyn| |
| | Infrastruktur| |
| | Patent, varemerke og design| |
| | Tilskudd, støtte og erstatning| |
| | Mine sider hos kommunen| |
| | Politi og domstol| |
| | Rapportering av statistikk| |
| | Forskning| |
| [Integrasjoner og API'er]| | |
| | Programmeringsgrensesnitt API| |
| | Opptre for virksomhetens kunder| |
| | Maskinlesbare hendelser| |
| [Jordbruk, skogbruk, jakt, fiske og akvakultur]| | |
| | Jordbruk| |
| | Dyrehold| |
| | Reindrift| |
| | Jakt og viltstell| |
| | Skogbruk| |
| | Fiske| |
| | Akvakultur| |
| [Bygg, anlegg og eiendom]| | |
| | Byggesøknad| |
| | Plansak| |
| | Motta nabo- og planvarsel| |
| | Oppføring av bygg og anlegg| |
| | Kjøp og salg av eiendom| |
| | Utleie av eiendom| |
| | Eiendomsmegler| |
| [Transport og lagring]| | |
| | Veitransport| |
| | Transport i rør| |
| | Sjøfart| |
| | Lufttransport| |
| | Jernbanetransport| |
| | Lagring og andre tjenester tilknyttet transport| |
| [Helse, pleie, omsrog og vern]| | |
| | Kommuneoverlege| |
| | Helsetjenester med personopplysninger av særlig kategori| |
| | Helsetjenester| |
| | Pleie- og omsorgstjenesteri i institusjon||
| | Sosiale omsorgstjenester uten botilbud, og flyktningemottak| |
| | Barnevern og familievern| |
| [Oppvekst og utdanning]| | |
| | Barnehageeier| |
| | Barnehageleder| |
| | Barnehagemyndighet| |
| | Statsforvalter - barnehage| |
| | Statsforvalter - skole og opplæring| |
| | Skoleeier| |
| | Skoleleder| |
| | Opplæringskontorleder| |
| | PPT-leder| |
| | SFO-leder| |
| | Høyere utdanning og høyere yrkesfaglig utdanning| |
| | Godkjenning av personell| |
| | Godkjenning av utdanningsvirksomhet| |
| [Energi, vann, avløp og avfall]| | |
| | Elektrisitet - produsere, overføre og distribuere| |
| | Damp- og varmtvann| |
| | Vann - ta ut fra kilde, rense og distribuere| |
| | Samle opp og behandle avløpsvann| |
| | Avfall - samle inn, behandle, bruke og gjenvinne| |
| | Miljørydding - rensing og lignende virksomhet| |
| | Utvinning avråolje, naturgass og kull| |


## Personale
## Miljø, ulykke og sikkerhet
## Post og arkiv
## Forhold ved virksomheten
## Integrasjoner og API'er
## Jordbruk, skogbruk, jakt, fiske og akvakultur
## Bygg, anlegg og eiendom
## Transport og lagring
## Helse, pleie, omsorg og vern
## Oppvekst og utdanning
## Energi, vann, avløp og avfall
## Administrere tilganger
## Industrier
## Kultur og frivillighet
## Handel, overnatting og servering
## Andre tjenesteytende næringer
## Fullmakter for regnskapsførere
## Fullmakter for revisorer
## Fullmakter for konkursbo
## Eksplisitt tjenestedelegering

