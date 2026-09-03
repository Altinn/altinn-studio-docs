---
draft: true
title: Slik oppgraderer du appen fra v8 til v9
linktitle: Oppgradere fra v8
description: Slik oppgraderer du en Altinn-app fra v8 til v9 med studioctl.
weight: 10
toc: true
tags: [needsReview]
---

`studioctl app upgrade` gjør mesteparten av jobben for deg. Verktøyet går gjennom appen og endrer de filene som trenger det.

## Før du starter

- Commit alt du har jobbet med. Oppgraderingen stopper hvis repositoriet har endringer du ikke har committet.
- Lukk appen i editoren din, for eksempel Visual Studio eller Visual Studio Code.
- Lag en egen branch, slik at du har et punkt å gå tilbake til hvis du vil angre oppgraderingen.

## 1. Installer studioctl

På Mac og Linux:

```bash
curl -sSL https://altinn.studio/designer/api/v1/studioctl/install.sh | sh
```

I PowerShell på Windows:

```powershell
iwr https://altinn.studio/designer/api/v1/studioctl/install.ps1 -useb | iex
```

Trenger du flere installasjonsvalg, finner du dem i [dokumentasjonen for studioctl](https://github.com/Altinn/altinn-studio/tree/main/src/cli#quick-start-app-developers).

## 2. Kjør oppgraderingen

Gå til rotmappen i prosjektet ditt og kjør:

```bash
studioctl app upgrade v9
```

v9 er standardvalget, så `studioctl app upgrade` gjør det samme.

Verktøyet går gjennom appen steg for steg og skriver ut hva det endrer. Les gjennom utskriften. Der oppgraderingen ikke klarer å gjøre en endring selv, sier den fra om hva du må ordne manuelt.

## 3. Kontroller at appen fungerer

Start den lokale testplattformen og kjør appen:

```bash
studioctl env up
studioctl app run
```

Fyll ut skjemaet, gå gjennom hele prosessen og se at PDF-en og kvitteringen blir slik du forventer. Se [veiledningen for å jobbe med tjenesten lokalt på egen maskin]({{< relref "/altinn-studio/v9/getting-started/development/localtest" >}}) hvis du trenger hjelp til det lokale oppsettet.

## Dette endrer oppgraderingen i appen din

Oppgraderingen tar seg av endringene nedenfor. Noen av dem endrer hvordan appen ser ut eller oppfører seg, så les gjennom dem før du publiserer.

### UI-mappen følger nå prosessen

Tidligere hadde `App/ui` én mappe per layoutsett, med sidene i undermappen `layouts`. Filen `layout-sets.json` koblet layoutsettet til steget i prosessen. Den koblingen så du ellers bare igjen i URL-en:

```
https://ttd.apps.tt02.altinn.no/ttd/rbi-demo-v9/#/instance/51757388/769c64af-0c52-4db6-839c-36f8284ea1d6/Task_1/Side1
```

Etter oppgraderingen heter hver mappe under `App/ui` det samme som oppgaven i prosessen, og sidene ligger fortsatt under `layouts`:

```
App/
  ui/
    Task_1/
      layouts/
        Side1.json
        Side2.json
      Settings.json
    Task_2/
      layouts/
        Side1.json
      Settings.json
```

Mappestrukturen viser dermed selv hvilket skjema som hører til hvilket steg. Da trenger ikke appen `layout-sets.json` lenger, og oppgraderingen sletter filen.

### PDF-en har fått sitt eget steg i prosessen

Tidligere laget appen PDF-kvitteringen samtidig som brukeren gikk ut av et utfyllingssteg. PDF-en var altså en del av det steget. Feilet PDF-en, kunne hele innsendingen feile, og det var ikke lett å starte prosessen på nytt fra punktet som gikk galt.

Etter oppgraderingen har appen din en egen PDF-oppgave i prosessen. Det gjør både feilhåndtering og ny kjøring enklere, og du får flere valg:

- Du kan fjerne PDF-oppgaven hvis du ikke vil ha en PDF.
- Du kan flytte PDF-oppgaven helt bakerst i større prosesser, når PDF-en skal inneholde data fra flere steg.

Standardoppsettet lager en PDF som oppsummerer skjemautfyllingen, ut fra skjemaoppsettet ditt. Du kan overstyre dette og bestemme selv hvordan appen lager PDF-en. Se [veiledningen for å sette opp PDF-generering som systemoppgave]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).

{{% notice warning %}}
**PDF-en kan se annerledes ut etter oppgraderingen.** Tidligere kunne du sette funksjonsflagget `BetaPDFenabled` for å la `Summary2`-komponenten lage PDF-en automatisk. Dette er nå standardinnstillingen, og flagget forsvinner. Har du ikke tilpasset utseendet på PDF-en selv, kan den derfor se annerledes ut.

V9 støtter i tillegg egenskapen `pageBreak` på `Summary2`-komponenter. Det gjorde ikke app-frontend v4. Se etter om PDF-en har fått flere sideskift enn du ønsker.
{{% /notice %}}

### Regelfilene forsvinner

Vi har lenge anbefalt å sette opp dynamikk i skjemaer med dynamiske uttrykk i JSON-filene, men vi har fortsatt støttet de eldre reglene som er skrevet i JavaScript. Den støtten forsvinner i v9.

Oppgraderingen sletter regelfilene og forsøker samtidig å skrive reglene om til dynamiske uttrykk eller C#-kode. Noen ganger klarer den ikke å konvertere en regel automatisk. Da må du bygge dynamikken selv. Se [introduksjonen til uttrykksspråket]({{< relref "/altinn-studio/v9/develop-a-service/expressions" >}}) hvis du trenger å skrive om en regel.

{{% notice warning %}}
Gå gjennom uttrykkene oppgraderingen har laget, og test at dynamikken i skjemaet virker som den skal.
{{% /notice %}}

### Egendefinerte systemoppgaver trenger nye svarverdier

Har appen din en egen systemoppgave, altså en C#-klasse som implementerer `IServiceTask`, ordner oppgraderingen én del av jobben og lar deg gjøre resten selv.

Oppgraderingen bytter navnerommet for deg, fra `Altinn.App.Core.Internal.Process.ProcessTasks.ServiceTasks` til `Altinn.App.Core.Features.Process`.

Svarverdiene må du skrive om selv. `ServiceTaskErrorHandling` og `ServiceTaskErrorStrategy` forsvinner, sammen med `Failed(...)`, `FailedAbortProcessNext()` og `FailedContinueProcessNext(...)`. Oppgraderingen lister opp stedene i koden den fant, men lar valget stå til deg — hva en feil skal føre til, er et faglig spørsmål og ikke en mekanisk erstatning:

| Slik svarte oppgaven i v8 | Slik svarer den i v9 |
| --- | --- |
| `FailedAbortProcessNext()` | `FailedPermanent("melding")` når feilen ikke retter seg selv. Kan den gå bort av seg selv, for eksempel et system som er nede akkurat nå, bruker du `FailedRetryable("melding")`, så prøver plattformen på nytt før den gir opp. |
| `FailedContinueProcessNext("reject")` | `Success("reject")`. Oppgaven er ferdig, og prosessen går videre med handlingen du oppgir. |
| `Failed(new ServiceTaskErrorHandling(...))` | Velg blant svarene over, ut fra hva strategien din faktisk skulle oppnå. |

I tillegg kjører plattformen systemoppgaver på en ny måte i v9. I v8 kjørte oppgaven én gang, som en del av `process/next`. Nå kjører den for seg: plattformen prøver på nytt hvis noe utenfor appen svikter, og kan parkere prosessen mens oppgaven venter på svar. Det stiller et nytt krav til koden: oppgaven må tåle å kjøre flere ganger uten å sende samme melding eller opprette samme sak to ganger.

Se [Lage en egendefinert systemoppgave]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}) for hele oppsettet, og [Systemoppgaver med flere steg]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}) hvis oppgaven sender noe og venter på svar.

## Breaking changes

### Egendefinerte oppgave-hooker er flyttet og har fått ny funksjonsmåte

Har appen din en klasse som implementerer `IProcessTaskStart`, `IProcessTaskEnd` eller `IProcessTaskAbandon` — kode som kjører når en oppgave starter, avsluttes eller forlates — må den migreres for hånd. I motsetning til systemoppgavene over gjør ikke oppgraderingen noe av jobben her: grensesnittene er fjernet uten en overgangsperiode med kompileringsadvarsler, så koden slutter rett og slett å kompilere til du har gjort om den.

Bruk de nye grensesnittene i `Altinn.App.Core.Features.Process` i stedet:

| Gammelt grensesnitt | Nytt grensesnitt |
| -------------------- | ----------------------- |
| `IProcessTaskStart` | `IOnTaskStartingHandler` |
| `IProcessTaskEnd` | `IOnTaskEndingHandler` |
| `IProcessTaskAbandon` | `IOnTaskAbandonHandler` |

Utover navnet er det tre praktiske forskjeller å kode mot:

- **Hooken avgjør selv hvilken oppgave den gjelder for.** Før kjørte hver registrerte handler for *alle* oppgaver i prosessen, og koden måtte selv sjekke `taskId`. Nå implementerer hooken `ShouldRunForTask(string taskId)`, og bare handleren(e) som svarer `true` for gjeldende oppgave kjører.
- **Hooken kjører som et steg i arbeidsflytmotoren**, akkurat som systemoppgavene over, og kan derfor bli forsøkt på nytt automatisk ved feil — implementasjonen må altså være idempotent. I stedet for å kaste unntak ved feil returnerer du et `HookResult` (et eget resultat for hooker, ikke å forveksle med `ServiceTaskResult` som brukes av systemoppgaver): `HookResult.Success()`, `HookResult.FailedRetryable("melding")` for en forbigående feil, eller `HookResult.FailedPermanent("melding")` for en feil som trenger en rettelse.
- **Instansdata leses og endres via `IInstanceDataMutator`** i stedet for et rått `Instance`-objekt. Kontekstobjektet hooken mottar (`OnTaskStartingContext` og tilsvarende for de to andre) gir deg både instansen og en mutator — endringer du gjør gjennom den, lagres automatisk når hooken fullfører uten feil.

I tillegg mister start-hooken `prefill`-parameteren. Brukte du prefill-data i `IProcessTaskStart.Start`, flytt den logikken til `IInstantiationProcessor.DataCreation`, som fortsatt mottar prefill og er upåvirket av denne endringen.

```csharp
// Før (v8)
public class MyTaskStartHandler : IProcessTaskStart
{
    public Task Start(string taskId, Instance instance, Dictionary<string, string>? prefill)
    {
        if (taskId != "Task_1")
        {
            return Task.CompletedTask;
        }

        // Egendefinert logikk her

        return Task.CompletedTask;
    }
}

// Etter (v9)
public class MyTaskStartHandler : IOnTaskStartingHandler
{
    public bool ShouldRunForTask(string taskId) => taskId == "Task_1";

    public async Task<HookResult> Execute(OnTaskStartingContext context)
    {
        // Egendefinert logikk her, f.eks. context.InstanceDataMutator

        return HookResult.Success();
    }
}
```

`IOnTaskEndingHandler` og `IOnTaskAbandonHandler` følger samme mønster, med `Execute(OnTaskEndingContext)` og `Execute(OnTaskAbandonContext)`. Registrering i `Program.cs` er uendret bortsett fra grensesnittnavnet: `services.AddTransient<IOnTaskStartingHandler, MyTaskStartHandler>();`

De nye hookene lar deg i tillegg valgfritt overstyre arbeidsflytmotorens standard tidsavbrudd og gjenforsøksstrategi for steget, via egenskapen `StepOptions`. Det er en ny mulighet uten noe tilsvarende i v8, så ikke noe du trenger å sette for å migrere.

{{% notice warning %}}
Bare én matchende handler er tillatt per oppgave. Svarer to registrerte handlere av samme type (for eksempel to `IOnTaskStartingHandler`) `true` for samme oppgave, feiler prosessovergangen permanent. Hadde du før flere handler-klasser rettet mot ulike oppgaver, pass på at `ShouldRunForTask`-implementasjonene deres ikke overlapper — virket to av dine gamle handlere på samme oppgave, slå dem sammen til én.
{{% /notice %}}

### Mindre endringer

Oppgraderingen ordner disse endringene uten at du trenger å gjøre noe, men det er greit å kjenne til dem:

- Komponenten `NavigationButtons` viser nå tilbake-knappen som standard. Tidligere måtte du slå den på selv. Vil du skjule knappen, setter du `"showBackButton": false`.
- Komponenten `OrganisationLookup` heter nå `OrganizationLookup`.
- Komponenten `Header` heter nå `Heading`.

## Neste steg

Vil du vite mer om hva som ligger bak endringene, kan du lese [om bakgrunnen for v9]({{< relref "/altinn-studio/v9/new-in-v9" >}}).
