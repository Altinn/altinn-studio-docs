Denne siden gir en oversikt over alle tilgjengelige grensesnitt (interfaces) som kan implementeres for å legge til egendefinert kode i Altinn 3-apper. Grensesnittene er organisert etter funksjonsområde og inkluderer kun interface som er markert med `[ImplementableByApps]` attributtet.

**Se også:** [Hvordan implementere egendefinert kode](/nb/altinn-studio/guides/development/custom-code/) - steg-for-steg guide for å komme i gang.

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

### ITaskValidator
Implementer dette grensesnittet for å validere spesifikke oppgaver i prosessen.

**Bruksområder:**
- Oppgave-spesifikk validering
- Validering av tilstander ved oppgaveskift
- Betinget validering basert på oppgavetype

**Dokumentasjon:** [Validering](/nb/altinn-studio/reference/logic/validation/)

### IDataElementValidator
Implementer dette grensesnittet for å validere enkelte dataelementer.

**Bruksområder:**
- Spesialisert validering av spesifikke datatyper
- Validering av vedlegg eller filer
- Elementspesifikke forretningsregler

**Dokumentasjon:** [Validering](/nb/altinn-studio/reference/logic/validation/)

### IFormDataValidator
Implementer dette grensesnittet for å validere skjemadata.

**Bruksområder:**
- Kompleks validering av skjemainnhold
- Tverrgående feltvalidering
- Dynamisk validering basert på skjemastatus

**Dokumentasjon:** [Validering](/nb/altinn-studio/reference/logic/validation/)

### IInstantiationValidator
Implementer dette grensesnittet for å validere om en bruker kan starte en ny instans.

**Bruksområder:**
- Tilgangskontroll utover standard autorisering
- Tidsbaserte begrensninger
- Validering mot eksterne systemer ved oppstart

**Dokumentasjon:** [Instansiering](/nb/altinn-studio/reference/logic/instantiation/)

### IValidateQueryParamPrefill
Implementer dette grensesnittet for å validere preutfylling via spørringsparametre.

**Bruksområder:**
- Validering av data som sendes inn via URL-parametre
- Sikring av preutfyllingdata
- Kontroll av tillatte verdier fra eksterne kilder

## Prosessering og livssyklus

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

### IProcessTaskAbandon
Implementer dette grensesnittet for å håndtere avbrudde oppgaver.

**Bruksområder:**
- Opprydding ved oppgaveavbrudd
- Logging av avbrutte prosesser
- Håndtering av delvis fullførte oppgaver

### IProcessExclusiveGateway
{{<notice warning>}}
OBS! En av metodene i dette grensesnittet er avviklet. Bruk den nyere versjonen av `FilterAsync` som inkluderer `IInstanceDataAccessor` parameter.
{{</notice>}}

Implementer dette grensesnittet for å håndtere betingede prosessoverganger.

**Bruksområder:**
- Dynamisk prosessflyt basert på data
- Forgrening i prosessen basert på forretningslogikk
- Betinget routing mellom oppgaver

## Brukerhandlinger

### IUserAction
Implementer dette grensesnittet for å definere egendefinerte brukerhandlinger.

**Bruksområder:**
- Egendefinerte knapper i brukergrensesnittet
- Spesialiserte handlinger som ikke dekkes av standardfunksjonalitet
- Integrasjon med externe tjenester fra brukergrensesnitt

**Dokumentasjon:** [Serverhandlinger](/nb/altinn-studio/reference/process/actions/serveraction/)

### IUserActionAuthorizer
Implementer dette grensesnittet for å autorisere brukerhandlinger.

**Bruksområder:**
- Tilgangskontroll for egendefinerte handlinger
- Betinget tilgang basert på brukerroller
- Dynamisk autorisering basert på data eller tilstand

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

**Bruksområder:**
- Basis for spesialiserte validatorer
- Generell validering som ikke passer andre kategorier
- Fleksibel validering med tilpassede regler

---

## Utdaterte grensesnitt (avviklet)

Følgende grensesnitt er markert som avviklet og bør ikke brukes i nye implementasjoner:

### IInstanceValidator [AVVIKLET]

Implementer dette grensesnittet for å validere hele appinstanser.

**Erstatning:** Bruk `ITaskValidator` for oppgavevalidering, `IDataElementValidator` for dataelementer eller `IFormDataValidator` for skjemadata.

### IPageOrder [AVVIKLET]

Implementer dette grensesnittet for å styre rekkefølgen på sider i skjemaet.

**Erstatning:** Bruk [dynamiske uttrykk](../logic/expressions/) for betinget visning av sider.

### IPdfFormatter [AVVIKLET]

Implementer dette grensesnittet for å tilpasse PDF-generering.

**Erstatning:** Opprett tilpassede PDF-layouter i stedet for å bruke dette grensesnittet.

