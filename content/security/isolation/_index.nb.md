---
title: Isolasjon
description: 
toc: true
weight: 9
---

For å hindre at en tjeneste hos en tjenesteeier kan påvirke andre tjenesteeiere blir isolasjon ilagt stor vekt i Altinn 3.

## Separasjon mellom test og produksjon

Tjenesteeiere utvikler og tester appene/tjenestene i et eget tjenesteutviklingsmiljø og produksjonssetter de i et produksjonsmiljø. 

## Tjenesteeier-miljø (kjøremiljø)

Appene til en tjenesteeier kjører i sitt eget kjøremiljø ([AKS](https://azure.microsoft.com/en-us/products/kubernetes-service)).
Dette medfører at kjøremiljø til en tjenesteeier ikke kan påvirke andre tjenesteeieres kjøremiljø hverken under test eller produksjon.

## Personopplysninger i innsendinger

Hver tjenesteeier har en egen lagringskonto der data lagres ved hjelp av Altinn-platform.
Her lagres skjemadata og filvedlegg. Metadata om instanser lagres i en felles database for raskere oppslag ved søk.

Merk at tjenesteeier ikke har tilgang til disse ressursene i Azure, men må benytte Altinn 3 APIene for uthenting av innsendte data.

## Beskyttelse av API-nøkler, sertifikater o.l.

Flere tjenester vil ha behov for å integrere mot andre løsninger der det benyttes en nøkkel eller virksomhetssertifikat for å autentisere seg.
Hver tjenesteeier har sitt eget nøkkelhvelv der man kan lagre disse hemmelighetene. 

{{%notice warning%}}
⚠ Tjenesteeiere har selv ansvar for å sikre at data ikke kommer på avveie ved bruk av eksterne APIer.
{{%/notice%}}
