---
title: Tilgangsstyring
description: 
toc: false
weight: 7
---

Det er hovedsakelig to systemer som benyttes for tilgangsstyring for utvikling og drift.
Altinn Studio benytter Gitea sin interne autentiseringsløsning som også kontrollerer tilgangen til tjenestekoden.

Multifaktor-autentisering er støttet og brukere må selv konfigurere dette.

Azure AD brukes for å begrense tilgangen til utvikling og drift av Altinn Studio og Platform.
Det er kun drift og utviklere tilknyttet Altinn 3 som har tilgang til løsningen.

Tjenesteeieren kan bestille tilgang til brukere til tjenestetestutviklingsmiljø (TT02) og produksjonsmiljøet.
Dette står nærmere beskrevet [her](/nb/app/guides/access-management/apps/). 
Merk at tjenesteeiere må melde fra til DigDir når tilganger skal fjernes. 

Autentisering for sluttbrukere er nærmere forklart [her](/nb/api/authentication/).


Tjenesteeiere må selv spesifisere krav til autorisasjon i tjenestene de utvikler.
Mer informasjon finnes [her](/nb/app/development/configuration/authorization/).