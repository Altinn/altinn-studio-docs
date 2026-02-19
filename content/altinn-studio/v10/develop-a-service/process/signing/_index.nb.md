---
draft: true
title: Signering
linktitle: Signering
description: Om signering i en Altinn-app
tags: [signering, needsReview, translate]

aliases:
- /nb/altinn-studio/guides/signing/
- /nb/altinn-studio/v8/concepts/signing/
---

Elektronisk signatur handler om sporbarhet. Det vil si at du i ettertid kan dokumentere at en bestemt person utførte en 
bestemt handling på et bestemt tidspunkt.

Altinn tilbyr **autentisert elektronisk signatur**. Dette gjør det mulig for deg som tjenesteeier å dokumentere at en 
identifisert person bekreftet noe på et bestemt tidspunkt. For eksempel kan sluttbruker signere for å bekrefte at opplysninger i et skjema er riktige.

Signeringsløsningen i Altinn støtter [sikkerhetsnivå](https://info.altinn.no/hjelp/innlogging/diverse-om-innlogging/hva-er-sikkerhetsniva/) 
3 eller 4. Du velger selv hvilket sikkerhetsnivå tjenesten din skal kreve. 
Du kan også velge lavere sikkerhetsnivå hvis du har behov for det.

Altinn tilbyr kun autentisert signatur. Trenger du avansert signatur (med sertifikat), må du bruke eksterne produkter som 
[eSignering fra Digdir](https://samarbeid.digdir.no/esignering/esignering/22).

## Slik fungerer signering i Altinn

### Hva signeres det på?

Du velger hvilke dataelementer sluttbruker skal signere på. Du velger også hvilket sikkerhetsnivå (identifikasjonsnivå) 
sluttbruker må bruke når de logger inn for å signere. Tjenesten din kan ha ett eller flere signeringssteg etter hverandre.

### Hva lagres ifm en signering?

Når en bruker signerer, oppretter Altinn et signaturobjekt. Signaturobjektet inneholder

- hvilke dataelementer som ble signert
- en hash-kode av dataene

### Signaturen kan verifiseres i ettertid
En hash-kode er en unik kode som beregnes ut fra innholdet i dataene. Hvis bare ett tegn i dataene endres, 
blir hash-koden en annen. Dette gjør at du kan oppdage om noen har endret dataene etter at de ble signert.

## Rolle-/tilgangspakkebasert signering
### Hva gjør denne funksjonen?
Med rolle- og tilgangspakkebasert signering kan personer signere fordi de har en bestemt rolle eller tilgangspakke. 
Du definerer hvilke roller eller tilgangspakker som skal ha rett til å lese og signere i tjenestens policy. 
Dette kan for eksempel være daglig leder, regnskapsfører eller revisor.

### Når bør jeg bruke dette?
Når det er definert hva slags rolle/tilgangspakke den som skal signere skal ha for avgiveren.

## Brukerstyrt signering
### Hva gjør denne funksjonen?
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/how-to/runtime-delegated-signing/intro.nb.md" %}}

### Når bør jeg bruke dette?
Når det er data fra utfyllingen (f.eks. fra brukeren selv) som bestemmer hvem som skal signere, heller enn en definert
rolle/tilgangspakke.

## Signering som del av utfylling
### Hva gjør denne funksjonen?
Dette er et scenario der brukeren som fyller ut skjemaet, også signerer det når skjemaet sendes inn. Brukeren signerer 
og sender inn med ett knappetrykk.

## API-basert signering

---

{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/_setup.nb.md" %}}
