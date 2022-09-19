---
title: Debugging of app
linktitle: Debugging
description: When running the apps locally one can debug using various tools.
toc: true
tags: [translate-to-english]
---

Følgende beskrivelse forutsetter at du har clonet applikasjonen fra Altinn Studio Repositories og har filene liggende på lokal harddisk. 

## Debugging i Visual Studio Code

For å debugge applikasjonen lokalt må du åpne applikasjonsprosjektet i Visual Studio Code.
Velg åpne folder og bla deg frem til hvor repostoriet er lagret på din maskin.

Velg debugging knappen til venstre i vertikal meny. 

![debug](debug1a.png "Starte debugging")

Det er to måter å starte debugging av en applikasjon lokalt:


### Starte appen fra Visual Studio Code (.NET Core Launch)

Denne metoden er den enkleste. Her vil Visual Studio Code starte applikasjonen og koble seg til i en og samme prosess

Velg .NET Core Launch og trykk på den grønne "play" knappen.

Applikasjonen vil da starte og han vil spørre om du skal starte en browser. Velg bare close.

![debug](debug1aa.png "Debugging startet")

Åpne et browservindu og gå til http://altinn3local.no (forutsetter at du har startet lokal utviklingsplattform).


### Starte appen fra commando vindu

Dette forutsetter at du har startet applikasjonen allerede. 
Gå til folderen hvor applikasjonen ligger og kjør kommando for å starte dotnet prosessen.

![debug](debug1.png "Starte .NET applikasjon")

I Visual Studio Code ha åpnet folderen med applikasjonsprosjektet. Attach deg til prosessen som heter Altinn.App.exe

![debug](debug2.png "Koble til applikasjonsprosess")


## Legg til Breakpoints og analysere kode

Sett breakpoints i code der du vil at debugger skal stoppe 

![debug](debug3.png "Legge til breakpoint")

Der debugger stopper kan du analysere lokale verdier på objekter for å finne ut hvordan kode fungerer og eventuelt finne feil.

![debug](debug4.png "Se på lokale verdier")

Les mer om debugging i Visual Studio Code i [dokumentasjonen til code](https://code.visualstudio.com/docs/editor/debugging).

## Using other frontend versions

If you have a development version of the [frontend application](https://github.com/Altinn/app-frontend-react/) running
locally, or you want to test specific/earlier versions of the frontend application, this can be done by switching the
frontend version using the link on the bottom when first visiting altinn3local.no:

![use-diff-frontend-version](use-diff-frontend-version.png "Functionality to change frontend version")

{{% panel info %}}
**NOTE:** This only works if you are using the default location for loading the frontend JavaScript file in your
`Index.cshtml` file. If you have altered your file to use another location, that will override whatever settings you
choose on altinn3local.no.
{{% /panel %}}

## Viewing and saving redux state history

The frontend application uses redux to store state changes. If you encounter a rare problem, we might ask you to record
your redux state history to aid in debugging the problem. Such a state history allows *time-travel debugging* by making
it possible to go back and forth through this history, and is very helpful in diagnosing otherwise hard-to-debug problems.

{{% panel info %}}
**NOTE:** This only works in frontend versions `3.50.5` and above, or local development versions.
{{% /panel %}}

{{% notice warning %}}
The state history includes every state change in the application (so everything you typed, every change
made). Do not export and send this history to anyone if you're working with sensitive information.
{{% /notice %}}

1. Start by installing the Redux Devtools extension in your browser ([Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) or [Firefox](https://addons.mozilla.org/nb-NO/firefox/addon/reduxdevtools/))
2. Use your application as normal. When the problem you want to record state history for occurs, open developer tools
    in your browser (press F12).
3. Go to the Redux tab in your developer tools. It should have auto-selected your application instance, and it should 
    look similar to this:

    ![redux-devtools](redux-devtools.png "Redux DevTools")

4. Click the export button in the lower left corner to save the history: ![export](redux-devtools-export.png)
5. Attach the file to your [bug report](https://github.com/Altinn/app-frontend-react/issues/new?assignees=&labels=kind%2Fbug%2Cstatus%2Ftriage&template=bug_report.yml) or send it to a developer