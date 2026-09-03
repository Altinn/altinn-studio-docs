---
draft: true
title: Systemoppgaver
linktitle: Systemoppgaver
description: Slik bruker du systemoppgaver til arbeid appen gjør selv
tags: [altinn-apps, process, bpmn, task, service task, systemoppgave, needsReview, translate-to-english]
---

En systemoppgave er et steg i prosessen som appen kjører selv, uten at brukeren gjør noe. Plattformen har noen ferdige systemoppgaver du bare konfigurerer, og utviklerne dine kan skrive egne.

## Ferdige systemoppgaver

Disse systemoppgavene følger med plattformen:

- [PDF-generering]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}) lager en PDF av det brukeren har fylt ut.
- [eFormidling]({{< relref "/altinn-studio/v9/receive-data/eFormidling" >}}) sender data videre til arkivet eller en annen mottaker.
- Fiks Arkiv sender data til arkiv gjennom KS Fiks.

Du finner hele oversikten over oppgavetyper under [📚 Referanse]({{< relref "/altinn-studio/v9/develop-a-service/process/reference/task-types" >}}).

## Egne systemoppgaver

Skal tjenesten din gjøre noe plattformen ikke har en ferdig oppgave for, kan utviklerne skrive en egen systemoppgave. Typiske eksempler er å melde saken inn i fagsystemet deres, hente en bekreftelse fra et register eller bestille noe hos en annen virksomhet før prosessen går videre.

Se [Lage en egendefinert systemoppgave]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}).

## Slik kjører appen en systemoppgave

Plattformen kjører oppgaven på serveren når prosessen kommer til steget, og prosessen går som hovedregel videre av seg selv når oppgaven er ferdig. Tre ting bør du vite:

- **Plattformen prøver på nytt.** Feiler oppgaven fordi noe utenfor appen er nede, kjører plattformen den på nytt med økende pause mellom forsøkene. Oppgaven må derfor tåle å kjøre flere ganger uten å gjøre samme arbeid to ganger.
- **Oppgaven kan vente.** Venter oppgaven på svar fra et annet system, parkerer plattformen prosessen i steget og sjekker på nytt til svaret kommer. Brukeren ser at appen venter. Oppgaven har en ventefrist, og plattformen stopper oppgaven når fristen er ute.
- **Noen feil stopper prosessen.** Gir oppgaven opp, står instansen i steget til noen retter årsaken og starter oppgaven på nytt. Da trenger dere en rutine for å følge opp slike instanser.

Nyttige spørsmål til utviklerne:

- Hva skjer hvis oppgaven kjører to ganger — kan brukeren få dobbelt vedtak, dobbel faktura eller dobbel arkivering?
- Hvor lenge venter oppgaven på svar fra andre, og hva skjer når ventetiden er ute?
- Hvem hos oss oppdager og følger opp en instans der oppgaven har gitt opp?

{{<children />}}
