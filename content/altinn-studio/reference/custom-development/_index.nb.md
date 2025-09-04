---
title: Tilgjengelige grensesnitt
description: Oversikt over tilgjengelige grensesnitt (interfaces) for egendefinert kode
weight: 25
---

Denne siden gir en oversikt over alle tilgjengelige grensesnitt (interfaces) som kan implementeres for å legge til egendefinert kode i Altinn 3-apper. Grensesnittene er organisert etter funksjonsområde.

## Kodelister og alternativer

### IAppOptionsProvider
Implementer dette grensesnittet for å lage åpne kodelister som genereres dynamisk ved kjøring.

**Bruksområder:**
- Kodelister som hentes fra eksterne kilder
- Kodelister som ikke inneholder sensitive data
- Statiske kodelister som genereres programmatisk

**Dokumentasjon:** [Dynamiske kodelister](/nb/altinn-studio/guides/development/options/sources/dynamic/)

### IInstanceAppOptionsProvider
Implementer dette grensesnittet for å lage sikrede kodelister som krever tilgang til instansen.

**Bruksområder:**
- Kodelister med sensitive eller personlige data
- Kodelister som varierer basert på brukerens tilganger
- Kodelister som krever instans-kontekst

**Dokumentasjon:** [Dynamiske kodelister](/nb/altinn-studio/guides/development/options/sources/dynamic/)

## Datahåndtering

### IDataProcessor
Implementer dette grensesnittet for å prosessere data ved lagring og innlasting.

**Bruksområder:**
- Automatiske kalkulasjoner når data lagres
- Kopiering av verdier mellom felter
- Formatering og transformering av data
- Kall til eksterne tjenester ved dataendring

**Dokumentasjon:** [Dataprosessering](/nb/altinn-studio/reference/logic/dataprocessing/)

### IDataWriteProcessor
Implementer dette grensesnittet for spesialisert håndtering av dataskriving.

**Bruksområder:**
- Tilpasset logikk for lagring av data
- Integrasjon med eksterne lagringssystemer
- Kompleks datavalidering før lagring

## Validering

### IInstanceValidator [AVVIKLET]
{{<notice warning>}}
OBS! Dette grensesnittet er avviklet. Bruk heller `ITaskValidator`, `IDataElementValidator` eller `IFormDataValidator` for spesifikk validering.
{{</notice>}}

Implementer dette grensesnittet for å validere hele appinstanser.

**Bruksområder:**
- Validering av komplekse forretningsregler
- Tverrgående validering mellom dataelementer
- Validering ved prosessovergang

**Dokumentasjon:** [Validering](/nb/altinn-studio/reference/logic/validation/)

### IInstantiationValidator
Implementer dette grensesnittet for å validere om en bruker kan starte en ny instans.

**Bruksområder:**
- Tilgangskontroll utover standard autorisering
- Tidsbaserte begrensninger
- Validering mot eksterne systemer ved oppstart

**Dokumentasjon:** [Instansiering](/nb/altinn-studio/reference/logic/instantiation/)

### ITaskValidator
Implementer dette grensesnittet for å validere spesifikke oppgaver i prosessen.

**Bruksområder:**
- Oppgave-spesifikk validering
- Validering av tilstander ved oppgaveskift
- Betinget validering basert på oppgavetype

### IDataElementValidator
Implementer dette grensesnittet for å validere enkelte dataelementer.

**Bruksområder:**
- Spesialisert validering av spesifikke datatyper
- Validering av vedlegg eller filer
- Elementspesifikke forretningsregler

### IFormDataValidator
Implementer dette grensesnittet for å validere skjemadata.

**Bruksområder:**
- Kompleks validering av skjemainnhold
- Tverrgående feltvalidering
- Dynamisk validering basert på skjemastatus

## Instansiering og prosessering

### IInstantiationProcessor
Implementer dette grensesnittet for å håndtere prosessering ved instansiering.

**Bruksområder:**
- Preutfylling av data ved oppstart
- Initialisering av eksterne systemer
- Oppsett av instans-spesifikke konfigurasjoner

**Dokumentasjon:** [Instansiering](/nb/altinn-studio/reference/logic/instantiation/)

### IProcessTaskStart
Implementer dette grensesnittet for å håndtere start av prosessoppgaver.

**Bruksområder:**
- Logikk som skal kjøres når en oppgave starter
- Initialisering av oppgave-spesifikk tilstand
- Integrasjon med eksterne systemer ved oppgavestart

### IProcessTaskEnd
Implementer dette grensesnittet for å håndtere avslutning av prosessoppgaver.

**Bruksområder:**
- Oppryddingslogikk ved oppgaveavslutning
- Lagring av mellomresultater
- Rapportering til eksterne systemer

### IProcessEnd
Implementer dette grensesnittet for å håndtere avslutning av hele prosessen.

**Bruksområder:**
- Sluttbehandling av data
- Arkivering og rapportering
- Opprydding av ressurser

## Brukerhandlinger

### IUserAction
Implementer dette grensesnittet for å definere egendefinerte brukerhandlinger.

**Bruksområder:**
- Egendefinerte knapper i brukergrensesnittet
- Spesialiserte handlinger som ikke dekkes av standardfunksjonalitet
- Integrasjon med eksterne tjenester fra brukergrensesnitt

**Dokumentasjon:** [Serverhandlinger](/nb/altinn-studio/reference/process/actions/serveraction/)

### IUserActionAuthorizer
Implementer dette grensesnittet for å autorisere brukerhandlinger.

**Bruksområder:**
- Tilgangskontroll for egendefinerte handlinger
- Betinget tilgang basert på brukerroller
- Dynamisk autorisering basert på data eller tilstand

## Prosessflyt

### IProcessExclusiveGateway
{{<notice warning>}}
OBS! En av metodene i dette grensesnittet er avviklet. Bruk den nyere versjonen av `FilterAsync` som inkluderer `IInstanceDataAccessor` parameter.
{{</notice>}}

Implementer dette grensesnittet for å håndtere betingede prosessoverganger.

**Bruksområder:**
- Dinamisk prosessflyt basert på data
- Forgrening i prosessen basert på forretningslogikk
- Betinget routing mellom oppgaver

### IPageOrder [AVVIKLET]
{{<notice warning>}}
OBS! Dette grensesnittet er avviklet f.o.m. versjon 4 av frontend. Bruk heller 
[dynamiske uttrykk](../logic/expressions/) for å styre om sider vises/skjules.
{{</notice>}}

Implementer dette grensesnittet for å styre rekkefølgen på sider i skjemaet.

**Bruksområder:**
- Dynamisk siderekkefølge basert på brukerens valg
- Hopping over sider basert på forretningslogikk
- Betinget visning av sider

## Varslinger

### IEmailNotificationClient
Implementer dette grensesnittet for egendefinert e-postvarsling.

**Bruksområder:**
- Tilpassede e-postmaler
- Integrasjon med eksterne e-posttjenester
- Betinget utsending av e-post

**Dokumentasjon:** [E-postvarslinger](/nb/altinn-studio/reference/logic/notifications/email/)

### ISmsNotificationClient
Implementer dette grensesnittet for egendefinert SMS-varsling.

**Bruksområder:**
- Tilpassede SMS-meldinger
- Integrasjon med eksterne SMS-tjenester  
- Betinget utsending av SMS

**Dokumentasjon:** [SMS-varslinger](/nb/altinn-studio/reference/logic/notifications/sms/)

## Dataadgang og manipulering

### IInstanceDataAccessor
Implementer dette grensesnittet for å få tilgang til instansdata.

**Bruksområder:**
- Lesing av instansmetadata
- Tilgang til tverrgående instansinformasjon
- Inspeksjon av instanstilstand

### IInstanceDataMutator
Implementer dette grensesnittet for å modifisere instansdata.

**Bruksområder:**
- Programmatisk endring av instansdata
- Oppdatering av metadata
- Manipulering av instanstilstand

## PDF og presentasjon

### IPdfFormatter [AVVIKLET]
{{<notice warning>}}
OBS! Dette grensesnittet er avviklet og vil bli fjernet i fremtidige versjoner. Det ble brukt for den gamle PDF-generatoren og brukes nå bare for bakoverkompatibilitet. Lag heller en tilpasset PDF-layout.
{{</notice>}}

Implementer dette grensesnittet for å tilpasse PDF-generering.

**Bruksområder:**
- Egendefinerte PDF-layouter
- Tillegg av vannmerker eller headere/footers
- Spesialisert formatering av PDF-innhold

## Hendelser

### IEventHandler
Implementer dette grensesnittet for å håndtere applikasjonshendelser.

**Bruksområder:**
- Respons på system- eller brukerhandlinger
- Integrasjon med hendelsesdrevne arkitekturer
- Logging og overvåking av applikasjonsaktivitet

**Dokumentasjon:** [Hendelser](/nb/altinn-studio/reference/logic/events/)

## Andre grensesnitt

### IValidator
Generelt valideringsgrensesnitt for tilpassede valideringer.

### IValidateQueryParamPrefill
Implementer dette grensesnittet for å validere preutfylling via spørringsparametre.

### IProcessTaskAbandon
Implementer dette grensesnittet for å håndtere avbrudde oppgaver.

### IDataListProvider og IInstanceDataListProvider
Grensesnitt for å tilby datalistefunksjonalitet.

## Kom i gang

For å implementere et av disse grensesnittene:

1. Opprett en ny klasse i din app som implementerer det ønskede grensesnittet
2. Registrer implementasjonen i `Program.cs` med dependency injection
3. Test implementasjonen lokalt før deployment

**Eksempel:**
```csharp
services.AddTransient<IDataProcessor, MyDataProcessor>();
```

For detaljerte implementeringseksempler, se den tilknyttede dokumentasjonen for hvert grensesnitt.