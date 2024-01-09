---
title: Autentisere med virksomhetsbruker
linktitle: Virksomhetsbruker
description: Beskrivelse hvordan man kan benytte virksomhetsbrukere i Altinn 3
toc: true
weight: 100
---

## Overordne beskrivelse

Virksomhetsbrukere er et konsept hvor man kan benytte et virksomhetssertifikat i 
kombinasjon med et brukernavn/passord.

Virksomhetsbrukere må bli tildelt roller og/eller rettigheter 
fra virksomheten de tillhører, men brukeren kan så bruke disse 
rettighetene i maskin til maskin kommunikasjon med Altinn uten at 
noen person i virksomheten må involveres i autorisasjon.

## Virksomhetsbrukere i Altinn 3

Virksomhetbrukere i Altinn 3 kan benyttes via vanlig virksomhetsbrukerinnlogging på 
Altinn.no med sertifikat lagret i nettleser, men er mest relevant i sammenheng med 
API bruk.

Dette gjøres ved å kombinere maskinporten for selve autentisering av sertifikatet, 
samt en innveksling av maskinportentoken sammen med brukernavn og passord.

Administrasjon av virksomhetsbrukere er dokumentert [her](https://altinn.github.io/docs/api/rest/kom-i-gang/virksomhetsbrukere/).

Pålogging og veksling av token er dokumenter her [her](https://altinn.github.io/docs/api/rest/kom-i-gang/virksomhet/#autentisering-med-virksomhetsbruker-og-maskinporten)

Postman eksempel finnes [her](https://github.com/Altinn/altinn-studio/blob/master/src/test/Postman/collections/Organization.postman_collection.json).

Videre bruk mot Altinn App API og Platform API er tilsvarende som man har et 
Altinn token basert på en ID-porten sesjon.



