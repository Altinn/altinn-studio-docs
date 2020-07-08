---
title: ServiceImplementation.cs
description: Beskrivelse av format for tjenesteimplementasjonen.
tags: [app-structure, todo]
---

{{% notice warning %}}
Arbeidet med POC har føreløpig ikke konkludert angående bruk av denne filen. Vil jobbes
videre med i MVP.
{{% /notice %}}

## Overordnet

'ServiceImplementation.cs' er hovedgrensesnittet mellom Altinn Core runtime og 
foretningslogikken i tjenesten som kjører på server.

## Format

'ServiceImplementation.cs' implementerer grensesnittet IServiceImplementation som har følgende
metoder definert.

### object CreateNewServiceModel();

Metode som oppretter nytt datamodell objekt basert på den datamodellen som tjenesten definerer

### void SetServiceModel(object model);
Metode som gjør at plattformen kan tilgjengeliggjøre en populert datamodell til tjenesteimplementasjonen

### void SetContext(RequestContext requestContext, dynamic viewBag);
Metode som setter context informasjon til tjenesteimplementasjon

### void SetContext(RequestContext requestContext, dynamic viewBag, ServiceContext serviceContext, StartServiceModel startServiceModel, ModelStateDictionary modelState);
Metode som setter context informasjon til tjenesteimplementasjon

### Task<bool> RunServiceEvent(ServiceEventType serviceEvent);
Metode som trigger en tjeneste hendelse. Dette gjør plattformen ved spesielle tidspunkt
og tjenesteutvikler kan da velge å kjøre forretningslogikk under dise hendelsene. 

Hendelsene som er definert til nå er. 

- BeforeRender
- Calculation
- Instantiation
- ValidateInstantiation
- Validation
- DataRetrieval

### void SetPlatformServices(IPlatformServices platformServices);

Tilgjengeligjør plattformtjenester. 

### ViewMetadata GetView(string viewID, UserActionType userAction);

Henter view.
TODO: Vurder å fjerne dette når man har konkludert om MVC Razor views skal støttes av plattformen.

## Utvikling
Under opprettelse av en tjeneste vil en tom ServiceImplementasjonsklasse opprettes.

Hypotese: Tjenesteutvikler editerer på denne filen via Altinn Studio eller Visual Studio Code 

### Forretningslogikk
Foretningslogikk implementeres i denne klassen eller andre relatert klasser som denne referer til.
Det vil være opp til utvikler å eventuelt skille kode ut i flere andre klasser. 

Tjenester 3.0 oppretter egne klasser for forretningslogikk tilknyttet kalkuleringer, valideringer og instansiering.

Eksempel på forretningslogikk 