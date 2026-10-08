---
title: Altinn-landskapet
linktitle: Altinn-landskapet
description: Detaljerte arkitekturtegninger av Altinn 3, produkt for produkt, med lenker til kildekoden.
weight: 1
toc: true
aliases:
 - /authorization/reference/system/altinn-landscape/
---

Tegningene på denne siden viser hvordan Altinn 3 er bygd, produkt for produkt. Hver ramme er én applikasjon eller tjeneste. Kolonnene er delmodulene, og radene er lagene fra API ned til lagring. Under kolonnene ligger felt for integrasjonsklienter, bakgrunnsjobber, tverrgående funksjoner og datalagre.

Tegningene er laget fra kildekoden på `main` i de aktuelle repoene. Hver boks lenker til filen eller mappen den beskriver.

Klikk på en tegning for å åpne den i full størrelse i en ny fane. Lenkene i tegningen virker bare når den er åpnet på denne måten.

Filene er draw.io-SVG-er og kan åpnes i [draw.io](https://app.diagrams.net/). Et skript i dette repoet lager tegningene fra kildekoden, så skriptet overskriver endringer du gjør for hånd neste gang noen kjører det. Se [README for skriptet](https://github.com/Altinn/altinn-studio-docs/blob/master/scripts/altinn-landscape/README.md) for hvordan du lager tegningene på nytt.

## Oversikt

Én boks per applikasjon med de viktigste modulene og datalagrene, gruppert per produkt. Brukerflatene ligger øverst, API Management i midten og eksterne fellesløsninger nederst. Klikk på en produktoverskrift i tegningen for å åpne den detaljerte tegningen for produktet.

<a href="./altinn_overview.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_overview.drawio.svg" alt="Oversikt over Altinn 3" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Autorisasjon

Access Management-frontenden, API Management, Access Management, Authorization, PEP-pakken, Ressursregisteret, Authentication og Register, med Folkeregisteret, Enhetsregisteret, SIRE og Altinn 2 som eksterne kilder.

<a href="./altinn_authorization_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_authorization_detailed.drawio.svg" alt="Produktet autorisasjon" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Dialogporten

Arbeidsflate (React-app og BFF), API Management, Dialogporten og adapteren som synkroniserer app-instanser fra Storage til dialoger.

<a href="./altinn_dialogporten_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_dialogporten_detailed.drawio.svg" alt="Produktet Dialogporten" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Apps

App-frontenden som lastes fra altinncdn.no, app-backend (app-lib, som nå ligger i altinn-studio-repoet), API Management og Storage.

<a href="./altinn_apps_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_apps_detailed.drawio.svg" alt="Produktet Apps" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Events og Notifications

Events (API og Azure Functions), Notifications API og de to tjenestene som sender e-post og SMS, med Azure Communication Services og Link Mobility som eksterne leverandører.

<a href="./altinn_events_notifications_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_events_notifications_detailed.drawio.svg" alt="Produktet Events og Notifications" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Melding og formidling

Correspondence (melding) og Broker (formidling), begge med Hangfire-jobber, egen bloblagring per tjenesteeier og virusskanning.

<a href="./altinn_correspondence_broker_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_correspondence_broker_detailed.drawio.svg" alt="Produktet melding og formidling" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Profile

Profile med brukerprofil, kontaktpunkter, varslingsadresser og adresseverifisering, med KRR og Brønnøysundregistrenes register for varslingsadresser som eksterne kilder.

<a href="./altinn_profile_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_profile_detailed.drawio.svg" alt="Produktet Profile" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Altinn Studio

Studio Designer (frontend og backend), lastbalansereren, Gitea og AI-agentene, runtime-komponentene i klyngen til hver tjenesteeier, og verktøyene for lokal utvikling.

<a href="./altinn_studio_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_studio_detailed.drawio.svg" alt="Produktet Altinn Studio" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>
