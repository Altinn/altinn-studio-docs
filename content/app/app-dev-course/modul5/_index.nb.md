---
title: Modul 5
description: Legge til bekreftelsessteg
linktitle: Modul 5
tags: [apps, training, process, policy, autorisasjon, confirmation, bekreftelsessteg, validering ]
weight: 20
---

I denne modulen skal du legge til et prosessteg i applikasjonen.

**Temaer som dekkes i denne modulen:**
- Prosess
- Bekreftelsessteg
- Autorisasjonsregler
- Validering
- Overstyre standardtekster

## Oppgaver

{{% expandlarge id="prosessbeskrivelse" header="Utvide prosess med et bekreftelsessteg" %}}

En Altinn-app har en prosessflyt som beskriver de ulike stegene i flyten.
Standardflyten for en nyopprettet applikasjon består av én oppgave og ett utfyllingssteg.

![Standard prosessflyt illustrert](/app/app-dev-course/modul5/default-process.png)

Din oppgave er å utvide standardprosessflyten med et bekreftelsessteg som illustrert nedenfor.
Bekreftelsessiden blir lagt til automatisk når man legger til dette i BPMN-filen.

![Oppdatert prosessflyt illustrert](/app/app-dev-course/modul5/updated-process.png)

{{% notice info %}}
[Standard prosessflyter er tilgjengelige på GitHub](https://github.com/Altinn/altinn-studio/tree/master/src/Altinn.Apps/AppTemplates/ProcessTemplates).
Finner du den som passer til flyten vi ønsker å oppnå her?

Har du lyst på en ekstra utfordring, kan du redigere prosessflyten manuelt eller i et BPMN-redigeringsverktøy,
og heller bruke [malen på prosessflyt med data og bekreftelsessteg](https://raw.githubusercontent.com/Altinn/altinn-studio/master/src/Altinn.Apps/AppTemplates/ProcessTemplates/Data_Confirmation_Process.bpmn) som fasit.
{{% /notice %}}

### Krav fra kommunen

På dette punktet i arbeidsflyten skal brukeren kunne:
1. Se over dataen som er utfylt
2. Avslutte arbeidsflyten uten å sende inn skjemaet
3. Avslutte arbeidsflyten og sende inn skjemaet

### Nyttig dokumentasjon

- [Tilgjengelige prosessteg i en Altinn App](/nb/app/development/configuration/process/#støttede-prosess-task-typer)
- [Hvordan endre prosessflyten til en applikasjon](/nb/app/development/configuration/process/#endre-prosessen)
- [Online BPMN editor](https://demo.bpmn.io/)
- [BPMN standard](https://en.wikipedia.org/wiki/Business_Process_Model_and_Notation)

### Forståelsessjekk
- Hvilke Altinn-spesifikke egenskaper er satt på hver prosessoppgave?
- Hvilke begrensninger vil et eksternt BPMN-redigeringsverktøy ha når man skal redigere prosessbeskrivelsen til en Altinn-app?
- Vil prosessflyten kunne gå begge veier? Fra utfylling til bekreftelse og fra bekreftelse til utfylling?
{{% /expandlarge %}}


{{% expandlarge id="autorisasjon" header="Legge til autorisasjonsregler for bekreftelsessteget" %}}

Policy-filen til applikasjonen din er tilpasset standard prosessflyt.
Oppdater policyfilen så den har autorisasjonsregler som dekker det nye prosessteget.

### Krav fra kommunen
- Det skal være samme rollekrav for å fylle ut og bekrefte en instans.

### Nyttig dokumentasjon
- [Regelbibliotek](/nb/app/development/configuration/authorization/rules/)
- [Alle roller i Altinn](https://www.altinn.no/hjelp/skjema/alle-altinn-roller/)

### Forståelsessjekk
- Hva vil skje når prosessflyten går videre til bekreftelsessteget uten at autoriasjonsreglene er blitt oppdatert?
- Hva skjer dersom du ikke spesifiserer hvilke roller som har lov til å utføre en aksjon i en autorisasjonsregel?
{{% /expandlarge %}}

{{% expandlarge id="validation" header="Validering av innsender" %}}

### Krav fra kommunen
- Det skal kun være mulig for brukeren som eier instansen å sende inn skjemaet, selv om andre måtte inneha de nødendige rollene

### Nyttig dokumentasjon
- [Egendefinert validering](/nb/app/development/logic/validation/#hvordan-legge-til-egendefinert-validering)

### Forståelsessjekk
- Hvilken endring ville du foreslått for kunden for å kunne oppfylle dette kravet uten å legge inn den egendefinerte valideringen på dette steget?
{{% /expandlarge %}}


{{% expandlarge id="confirmation" header="Overstyre standardtekster for bekreftelsesside" %}}

### Krav fra kommunen

Vi ønsker at brukeren skal presenteres med følgende tekst før innsending:

```rich
Du er nå klar for å sende inn melding om tilflytting til Sogndal kommune.

Ved å sende inn dette skjemaet samtykker du til at dataen du har fylt ut kan lagres og benyttes til å tilpasse kommunens tilbud til deg de neste 18 månedene.

Før du sender inn vil vi anbefale å se over svarene dine. Du kan ikke endre svarene etter at du har sendt inn.
```

### Nyttig dokumentasjon
- [Tilpasning av bekreftelsessiden](/nb/app/development/configuration/process/customize/#bekreftelse-confirmation)

{{% /expandlarge %}}


## Oppsummering

I denne modulen har du utvidet applikasjonen din med et bekreftelsessteg, tilpasset visningen, og lagt til validering og autorisasjonsregler knyttet til prosessteget.

Tjenesten skal kunne kjøres opp på din lokale maskin med lokal test
og du skal kunne teste det nye prosessteget og bekrefte at visningen ser ut som ønsket.

**Husk å _pushe_ de lokale endringene dine, så de blir tilgjengelige i Altinn Studio når du er fornøyd**

### Løsningsforslag
Dersom du ikke har fått til alle stegene, har vi et [løsningsforslag](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/5) som du kan hente inspirasjon fra.

![Skjermbilde av bekreftelsesside](/app/app-dev-course/modul5/bekreftelsesside-screenshot.png "Skjermbilde av bekreftelsesside")
