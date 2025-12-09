---
title: Tilgangspakker og roller
linktitle: Tilgangspakker og roller
description: Tilgangspakker samler tjenester og ressurser tematisk, basert på hva som ofte brukes eller løses sammen, slik at virksomheter kan gi nødvendige fullmakter til ansatte og systemer uten å måtte gi fullmakt til én og én tjeneste. I Altinn 3 fungerer tilgangspakkene erstatter i praksis de tidligere Altinn-rollene. 
tags: [architecture, security, authorization, xacml]
---

## Tilgangspakker bygges av tjenesteeiere – ikke av Digdir

Tilgangspakker i Altinn er ikke forhåndsdefinert av Digdir. De er et resultat av tjenesteeiernes egne valg om hvilke tjenester de mener hører hjemme innenfor et bestemt bransjeområde eller et funksjonelt tema – for eksempel lønn, regnskap, landbruk eller bygg og eiendom.

Dette betyr at:

> Det er tjenesteeierne selv som avgjør hvilke tjenester som skal inngå i en tilgangspakke. Digdir definerer kun den tekniske strukturen. Innholdet bestemmes i fellesskap av tjenesteeierne.


![Tilgangspakke](tilgangspakke.png "Sammenheng mellom regelbygging i Altinn Studio og tilgangsstyring i Altinn brukerflate")


## Tilgangspakker er et felles økosystem

Når flere tjenesteeiere legger tjenestene sine inn i samme tilgangspakke, bygger dere sammen et felles bransjeområde. Eksempel:

* Tjenesteeier A legger inn tjenesten “Lønnsrapportering” i pakken “Lønn”
* Tjenesteeier B legger inn tjenesten “Arbeidsgiveropplysninger” i pakken “Lønn”
* Tjenesteeier C legger inn API-et “Lønns-API” i pakken Lønn

Over tid blir tilgangspakken Lønn en samling av tjenester fra flere ulike etater, basert på tjenesteeiernes egne vurderinger av hvilke tjenester som hører hjemme i lønnsområdet.


## Når en bruker får tilgang til en tilgangspakke, får de alt i pakken

Hvis en virksomhet gir en ansatt tilgang til tilgangspakken “Lønn”, får vedkommende:

* tjenesten din som du har lagt inn i lønnspakken
* _og_ alle andre tjenester som andre tjenesteeiere har lagt inn i samme pakke


Det betyr at:
> Tilgangspakken er ikke en liste over dine tjenester – den er en samling tjenester som flere tjenesteeiere har vurdert som relevante for samme bransjeområde.


## Forhåndstildelte og ikke-forhåndstildelte tilgangspakker

Tilgangspakker skal brukes for å styre tilgang til tjenester og ressurser. De fleste er forhåndstildelt roller fra Enhetsregisteret som har fullmakt til å opptre på vegne av virksomheten og dermed kan dele tilgang videre. Noen pakker – særlig der innholdet er sensitivt – har ingen forhåndstildelte roller og må tildeles manuelt av virksomhetens hovedadministrator.


## Fullmaktsområder

Tilgangspakkene er inndelt i fullmaktsområder inspirert av SSBs kategorisering av virksomheter. Hvert område samler tilgangspakker som naturlig hører sammen, og gjør det enklere både for tjenesteeiere å plassere tjenester riktig og for virksomheter å delegere passende fullmakter.

 <a href="https://www.ssb.no/klass/klassifikasjoner/6"> SSB's kategorisering av virksomheter</a>. 
