---
title: Access Packages
linktitle: Tilgangspakker
description: Tilgangspakker er samlinger av fullmakter til tjenester og ressurser innen ulike områder.
tags: [architecture, security, authorization, xacml]
weight: 99
---

{{<notice warning>}}
This is work in progress
{{</notice>}}


For å styre tilgang til tjenester og ressurser, skal tilgangspakker benyttes. De fleste tilgangpakkene er forhåndstildelt et utvalg av roller fra Enhetsregisteret, og kan deles videre til andre som faktisk skal benytte tjenestene på vegne av virksomheten. Rollene fra Enhetsregisteret som får tilgangspakkene forhåndstildelt, er de rollene som har fullmakter til å opptre på vegne av virksomheten etter selskapslovgivningen.    

Det finnes unntak på tilgangspakker som ingen har fått forhåndstildelt, for eksempel "Post til virksomheten med taushetsbelagt innhold". Tilgang til tjenester og ressurser som er knyttet til disse tilgangspakkene, må deles av Hovedadministrator i virksomheten, enten som enkeltrettigheter eller i tilgangspakken.

Tilgangspakkene er inndelt i fullmaktsområder, og inndelingen er inspirert og delvis basert på <a href="https://www.ssb.no/klass/klassifikasjoner/6"> SSB's kategorisering av virksomheter</a>. I hvert område finnes tilgangspakker som naturlig hører hjemmme under det området. 
Fullmaktsområdene er ment som hjelp til å finne riktig tilgangspakke, både for tjenesteeier/ressurseier som konfigurerer tilgangsreglene for tjenesten/ressursen, og for sluttbruker som skal dele tilgang med andre.



