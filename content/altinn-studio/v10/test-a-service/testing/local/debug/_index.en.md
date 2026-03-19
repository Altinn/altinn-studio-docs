---
draft: true
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

Åpne et browservindu og gå til http://local.altinn.cloud (forutsetter at du har startet lokal utviklingsplattform).


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
frontend version using the link on the bottom when first visiting local.altinn.cloud:

![use-diff-frontend-version](use-diff-frontend-version.png "Functionality to change frontend version")

{{% panel info %}}
**NOTE:** This only works if you are using the default location for loading the frontend JavaScript file in your
`Index.cshtml` file. If you have altered your file to use another location, that will override whatever settings you
choose on local.altinn.cloud.
{{% /panel %}}
