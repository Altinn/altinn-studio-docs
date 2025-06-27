---
title: Virksomheters varslingsadresser
description: Dette API-et gir mulighet til å administrere virksomheters varslingsadresser
weight: 30
---

## Hva er varslingsadresser for virksomheter
For at virksomheter skal bli varslet om nye meldinger i altinn må de legge inn minst en varslingsadresse. Dette må være et mobilnummer eller en e-postadresse. 
Disse brukes også av Brønnøysundregistrene og holdes i synk gjennom jevnlige oppdateringer mellom systemene. 

En oppdatering kjøres vanligvis hvert tiende minutt. 


## Hvordan bruker man API-et?
For å bruke API-et må man være en innlogget sluttbruker. Det er viktig at tilgangs-token som brukes inneholder userId for å indikere hvem som er innlogget bruker. 
Sluttbrukeren må i tillegg ha en av et sett gyldige roller for å administrere virksomhetens varslingsadresse.

I sti for å administrere varslingsadresser må man ha med organisasjonsnummeret for virksomheten.