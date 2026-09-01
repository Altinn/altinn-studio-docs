---
draft: true
title: Slik oppgraderer du appen fra v8 til v9
linktitle: Oppgradere fra v8
description: Slik oppgraderer du en Altinn-app fra v8 til v9 med studioctl.
weight: 10
toc: true
tags: [needsReview]
---

`studioctl app upgrade` gjør mesteparten av jobben for deg. Verktøyet går gjennom appen og endrer filene som trenger det.

## Før du starter

- Commit alt du har jobbet med. Oppgraderingen stopper hvis repositoriet har endringer du ikke har committet.
- Lukk appen i editoren din, for eksempel Visual Studio eller Visual Studio Code.
- Lag en egen branch, slik at du har et punkt å gå tilbake til hvis du vil forkaste oppgraderingen.

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

Tidligere laget appen PDF-kvitteringen idet brukeren gikk ut av et utfyllingssteg. PDF-en var altså en implisitt del av det steget. Feilet PDF-en, kunne hele innsendingen feile, og det var ikke lett å starte prosessen på nytt fra punktet som gikk galt.

Etter oppgraderingen har appen din en egen PDF-oppgave i prosessen. Det gjør både feilhåndtering og ny kjøring enklere, og du får flere valg:

- Du kan fjerne PDF-oppgaven hvis du ikke vil ha en PDF.
- Du kan flytte PDF-oppgaven helt bakerst i større prosesser, når PDF-en skal inneholde data fra flere steg.

Standardoppsettet lager en PDF som oppsummerer skjemautfyllingen, ut fra skjemaoppsettet ditt. Du kan overstyre dette og bestemme selv hvordan appen lager PDF-en. Se [veiledningen for å sette opp PDF-generering som systemoppgave]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).

{{% notice warning %}}
**PDF-en kan se annerledes ut etter oppgraderingen.** Tidligere kunne du sette funksjonsflagget `BetaPDFenabled` for å la `Summary2`-komponenten lage PDF-en automatisk. Dette er nå standardinnstillingen, og flagget forsvinner. Har du ikke tilpasset utseendet på PDF-en selv, kan den derfor se annerledes ut.

v9 støtter i tillegg egenskapen `pageBreak` på `Summary2`-komponenter. Det gjorde ikke app-frontend v4. Se etter om PDF-en har fått flere sideskift enn du ønsker.
{{% /notice %}}

### Regelfilene forsvinner

Vi har lenge anbefalt å sette opp dynamikk i skjemaer med dynamiske uttrykk i JSON-filene, men vi har fortsatt støttet de eldre reglene som er skrevet i JavaScript. Den støtten forsvinner i v9.

Oppgraderingen sletter regelfilene og forsøker samtidig å skrive reglene om til dynamiske uttrykk eller C#-kode. Noen ganger klarer den ikke å konvertere en regel automatisk. Da må du bygge dynamikken selv. Se [introduksjonen til uttrykksspråket]({{< relref "/altinn-studio/v9/develop-a-service/expressions" >}}) hvis du trenger å skrive om en regel.

{{% notice warning %}}
Gå gjennom uttrykkene oppgraderingen har laget, og test at dynamikken i skjemaet virker som den skal.
{{% /notice %}}

### Mindre endringer

Oppgraderingen ordner disse endringene uten at du trenger å gjøre noe, men det er greit å kjenne til dem:

- Komponenten `NavigationButtons` viser nå tilbake-knappen som standard. Tidligere måtte du slå den på selv. Vil du skjule knappen, setter du `"showBackButton": false`.
- Komponenten `OrganisationLookup` heter nå `OrganizationLookup`.
- Komponenten `Header` heter nå `Heading`.

## Neste steg

Vil du vite mer om hva som ligger bak endringene, kan du lese [om bakgrunnen for v9]({{< relref "/altinn-studio/v9/new-in-v9" >}}).
