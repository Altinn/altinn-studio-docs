---
title: v3
description: Oversikt over endringer introdusert i v3 av Altinn.Platform.Storage.Interface.
toc: true
weight: 90
---

## 3.11.0 Utvidet modeller med støtte for automatisk sletting av data element
- `DataElement`-modellen har blitt utvidet med en ny egenskap _deleteStatus_.
- I tillegg er `ApplicationMetadata.AppLogic`  utvidet med en ny egenskap _autoDeleteOnProcessEnd_.


## 3.10.0 Utvidet ApplicationMetadata/AppLogic med _allowAnonymousOnStateless_ 
- `AppLogic` modellen har blitt utvidet med en ny egenskap `allowAnonymousOnStateless` som åpner for at en data type kan akksesseres anonymt når man kjører i stateless mode. Default er `false` som dagens funksjonalitet og du må eksplisitt sette den til `true` hvis du ønsker å tillatte annonym tilgang.

## 3.9.0 Utvidet EFormidlingContract med _DPFShipmentType_ 
- `EFormidlingContract` modellen har blitt utvidet med en ny egenskap `DPFShipmentType`. 
Verdien er en streng som representeres forsendelsestype hvis servicen er DPF.

## 3.8.0 Utvidet ProcessHistoryItem med _performedBy_ 
- `ProcessHistoryItem` modellen har blitt utvidet med en ny egenskap `performedBy`. 
Verdien er en streng og kan inneholde personnummer eller organisasjonsnummer som representerer
entiteten som trigget eventet.

## 3.7.0 Utvidet PlatformUser med `nationalIdentityNumber` egenskap
- `PlatformUser` modellen har blitt utvidet med en ny egenskap `nationalIdentityNumber`.

## 3.6.0 Utvidet InstanceOwner med `username` egenskap
- `InstanceOwner` modellen har blitt utvidet med en ny egenskap `username`.

## 3.5.0 Lagt til CopyInstanceSettings på modellen Application
- `Application` modellen har blitt utvidet med en ny egenskap for å holde på konfigurasjon knyttet til kopiering av instans.
  Egenskapen tillater å aktivere kopiering av instans, samt spesifisere ekskluderte datafelt og -typer.

## 3.4.0 Lagt til MessageBoxConfig på modellen Applicaton

- `Application` modellen har blitt utvidet med en ny egenskap for å holde på en meldingsbokskonfigurasjon.

## 3.3.0 Lagt til Tags på modellen DataElement

- `DataElement` modellen har blitt utvidet med en ny egenskap for å holde på en liste med stikkord (tags).

## 3.2.0 Innføring av ny modell OnEntryConfig

- Innføring av en ny model, `OnEntryConfig` for å støtte definering av hva som skal skje når en bruker åpner opp en applikasjon. Modellen er lagt inn som en egenskap på `Application`.

## 3.0.1 Innføring av ny modell DataValues

- Modellen `DataValues` er innført til å representere input til API endepunkt for registrering av tekster fra skjema direkte på en Instance.

## 3.0.0 Refactoring and model application/instance model changes

### Endringer som krever tilpassninger i app kode (breaking changes)

- Modellen `PresentationField` har endret navn til `DataField`.
  Dette gjøres slik at den kan benyttes i flere sammenhenger. Bruken av modellen er utvidet til å representere et element i egenskapen `DataFields` på `Application` i tillegg til at den fortsatt brukes for å representere elementer i egenskapen `PresentationFields`. Det er ingen andre endringer i modellen eller hvordan den blir brukt.

### Andre endringer

- `Application` modellen er utvidet med en ny egenskap kalt `DataFields` og `Instance` er utvidet med korresponderende egenskap kalt `DataValues` for å holde verdiene identifisert basert på `DataFields`.
