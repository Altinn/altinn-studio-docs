---
title: Komponenter
description: Under arbeid - komponentoversikt basert på Altinn Studio GUI
tags: [needsReview, under-construction]
---

## Skjema

Komponenter for datainnsamling.

### Lite tekstfelt (`Input`)
`Input` gir brukere muligheten til å skrive fritekst eller tall.

![Input](./input/Input.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Input" >}})

---

### Stort tekstfelt (`TextArea`)

`TextArea` brukes når brukeren skal kunne skrive inn tekst som går over flere linjer.

![TextArea](./textarea/TextArea.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/TextArea" >}})

---

### Datovelger (`Datepicker`)

`Date`-komponenten lar brukeren legge til strukturert formatert dato.

![Datepicker](./datepicker/Datepicker.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Datepicker" >}})

---

### Tidsvelger (`TimePicker`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/TimePicker" >}})

---

### Finn virksomhet (`OrganizationLookup`)

`OrganizationLookup`-komponenten bruker organisasjonsnummer til å slå opp en organisasjon i Enhetsregisteret.

![OrganizationLookup](./organizationlookup/OrganizationLookup.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/OrganizationLookup" >}})

---

### Finn person (`PersonLookup`)

`PersonLookup`-komponenten søker i det nasjonale folkeregisteret basert på fødselsnummer og etternavn.

![PersonLookup](./personlookup/PersonLookup.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/PersonLookup" >}})

---


## Tekst

Komponenter for å vise tekst og informasjon.

### Tittel (`Heading`)

`Heading` brukes til å strukturere innhold og skape hierarki på siden.

![Heading](./heading/Heading.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Heading" >}})

---

### Avsnitt (`Paragraph`)

`Paragraph` brukes til løpende tekst og benyttes typisk i artikler, komponenter, hjelpetekster og lignende.

![Paragraph](./paragraph/Paragraph.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Paragraph" >}})

---

### Informativ melding (`Panel`)

`Panel` kan brukes til å vise viktig informasjon til brukeren i ulike varianter (info, success, warning). Komponenten
dekker hele bredden til siden.

![Panel](./panel/Panel.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Panel" >}})

---

### Varsel (`Alert`)

`Alert` gir brukeren informasjon som det er ekstra viktig at de ser og forstår. Komponenten er designet for å fange
brukernes oppmerksomhet. Teksten i varselet skal være kort og tydelig.

![Alert](./alert/Alert.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Alert" >}})

---

### Delelinje (`Divider`)

`Divider` brukes for å skape et visuelt skille mellom innhold. Det er en enkel horisontal linje som strekker seg over
tilgjengelig bredde.

![Divider](./divider/Divider.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Divider" >}})

---

### Tekst (`Text`)

`Text`-komponenten viser tekst med eller uten ledetekst. Tekstverdien som vises kan f.eks. settes dynamisk via uttrykk.

![Text](./text/Text.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Text" >}})

---

### Tall (`Number`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Number" >}})

---

### Dato (`Date`)

`Date` er en komponent som viser formatert dato med eller uten ledetekst.

![Date](./date/Date.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Date" >}})

---

## Flervalg

Komponenter for valg fra forhåndsdefinerte alternativer.

### Avmerkingsbokser (`Checkboxes`)
`Checkboxes` gir brukerne mulighet til å velge ett eller flere alternativer. Den kan også brukes i tilfeller der
brukeren skal bekrefte noe.

![Checkboxes](./checkboxes/Checkboxes.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Checkboxes" >}})

---

### Radioknapper (`RadioButtons`)
`RadioButtons` er er ett eller fleer alternativ brukeren kan velge. Brukeren kan bytte mellom alternativene, men kan
kun velge ett.

![RadioButtons](./radiobuttons/RadioButtons.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/RadioButtons" >}})

---

### Nedtrekksliste (`Dropdown`)
`Dropdown` lar brukeren velge ett alternativ fra en liste.

![Dropdown](./dropdown/Dropdown.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Dropdown" >}})

---

### Nedtrekksliste med flere valg (`MultipleSelect`)
`MultipleSelect` lar brukeren velge flere alternativer fra en liste.

![MultipleSelect](./dropdown/Dropdown.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/MultipleSelect" >}})

---

### Likert-skala (Likert)

[Detaljer om komponenten]()

---

## Informasjon

Komponenter for å vise tilleggsinformasjon.

### Informasjon om eksemplaret (InstanceInformation)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/InstanceInformation" >}})

---

### Bilde (`Image`)
`Image` viser et bilde som er lastet opp til appen eller lastet inn fra en URL.

![Image](./image/Image.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Image" >}})

---

### Lyd (`Audio`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Audio" >}})

---

### Video (`Video`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Video" >}})

---

### Lenke (Link)
`Link` er en lenke til annet innhold. Komponenten kan vises som en klassisk lenke, eller som en knapp.

![Link](./link/Link.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Link" >}})

---

### IFrame (IFrame)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/IFrame" >}})

---

### Oppsummering (`Summary2`)
`Summary2` lar deg vise en oppsummering av enten en komponent, side eller layoutSet, enten i nåværende eller tidligere oppgaver.

Den kan tilpasses for å dekke dine behov, og brukes også for å generere PDF.

![Summary2](./summary2/Summary2.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Summary" >}})

---

## Knapper

Handlingsknapper og navigasjon.

### Send inn (`Button`)
`Button` brukes til å sende inn data, og flytte brukeren videre i prosessen.

![Button](./button/Button.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Button" >}})

---

### Egendefinert knapp (`CustomButton`)
`CustomButton` brukes til å trigge egendefinerte handlinger på serveren.

![CustomButton](./button/Button.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/CustomButton" >}})

---

### Navigasjonslinje (`NavigationBar`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/NavigationBar" >}})

---

### Navigasjonsknapper (`NavigationButtons`)
`NavigationButtons` brukes til å navigere frem/tilbake mellom sider. Denne komponenten legges automatisk til når du
legger til en ny side i Altinn Studio verktøyet.

![NavigationButtons](./navigationbuttons/NavigationButtons.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/NavigationButtons" >}})

---

### Utskrift (`PrintButton`)
`PrintButton` brukes til å trigge utskriftsvisning av skjema.

![PrintButton](./printbutton/PrintButton.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/PrintButton" >}})

---

### Forhåndsvis PDF (`PDFPreviewButton`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/PDFPreviewButton" >}})

---

### Start eksemplar (`InstantiationButton`)
`InstantiationButton` brukes til å starte et eksemplar av en app ved bruk av
[stateless-oppsettet.]({{<relref "/altinn-studio/v9/develop-a-service/process/stateless">}})

![InstantiationButton](./button/Button.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/InstantiationButton" >}})

---

### Handlingsknapp (`ActionButton`)
`ActionButton` starter en bestemt handling knyttet til den oppgaven i prosessen som brukerne er på.
Oppgaven kan for eksempel være signering, bekreftelse eller avvisning.

![ActionButton](./button/Button.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/ActionButton" >}})

---

## Vedlegg

Komponenter for filopplasting.

### Liste over vedlegg (`AttachmentList`)
`AttachmentList` viser en liste over vedlegg som er lastet opp i skjemaet, for den oppgaven de jobber på. Velg om alle
vedlegg skal vises, eller kun et utvalg.

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/AttachmentList" >}})

---

### Vedlegg (`FileUpload`)
`FileUpload` lar brukeren laste opp vedlegg. Du kan styre hvilke filtyper som kan lastes opp, og legge til svaralternativer hvis brukeren skal merke hvert vedlegg med en forhåndsdefinert etikett.

![FileUpload](./fileupload/FileUpload.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/FileUpload" >}})

---

### Bildeopplaster (`ImageUpload`)
`ImageUpload` lar brukeren laste opp og ev. beskjære bilder.

![ImageUpload](./imageupload/ImageUpload.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/ImageUpload" >}})

---

## Betaling

Komponenter for betalingsflyt.

### Betaling (`Payment`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Payment" >}})

---

### Betalingsdetaljer (`PaymentDetails`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/PaymentDetails" >}})

---

## Signering

Komponenter for signeringsflyt.

### Signatarliste (`SigneeList`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/SigneeList" >}})

---

### Signeringshandlinger (`SigningActions`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/SigningActions" >}})

---

### Signeringsdokumenter (`SigningDocumentList`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/SigningDocumentList" >}})

---

## Gruppering

Komponenter for å strukturere skjemaet.

### Gruppe (Group)

`Group` brukes til å gruppere komponenter visuelt eller logisk.

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Group" >}})

---

### Rutenett (`Grid`)
`Grid` brukes til å visuelt oppstille komponenter i en tabellvisning.

![Grid](./grid/Grid.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Grid" >}})

---

### Trekkspilliste (`Accordion`)

`Accordion` er en sammenleggbar komponent som lar brukeren vise eller skjule innhold.

![Accordion](./accordion/Accordion.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Accordion" >}})

---

### Nestet trekkspilliste (`AccordionGroup`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/AccordionGroup" >}})

---

### Knappegruppe (`ButtonGroup`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/ButtonGroup" >}})

---

### Liste (`List`)

`List` brukes til å presentere innholdsrike data til bruker i tabellformat. Hver rad i tabellen er velgbar. Komponenten
støtter søk, sortering og paginering.

![List](./list/List.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/List" >}})

---

### Repeterende gruppe (`RepeatingGroup`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/RepeatingGroup" >}})

---

### Enkel tabell (`SimpleTable`)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/SimpleTable" >}})

---

### Cards (`Cards`)
`Cards` brukes til å vise ulike typer innhold (andre komponenter), i en kort-basert layout. Den kan brukes til å vise
informasjon, bilder, lydklipp, videoer, og skjemakomponenter.

![Cards](./cards/Cards.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Cards" >}})

---

### Faner (`Tabs`)
`Tabs` lar deg organisere og bytte mellom ulike innholdsseksjoner ved å klikke på overskriftene. Dette gir en
plasseffektiv og ryddig måte å presentere informasjon på.

![Tabs](./tabs/Tabs.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Tabs" >}})

---

## Avansert

Spesialiserte komponenter for avanserte bruksområder.

### Adresse (`Address`)

![Address](./address/Address.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Address" >}})

---

### Stedfeste i kart (`Map`)

![Map](./map/Map.png)

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Map" >}})

---

### Egendefinert (Custom)

[Detaljer om komponenten]()

---

### Tabell for underskjema (`Subform`)

`Subform` viser oppføringene i et underskjema som en tabell i hovedskjemaet. Brukeren kan legge til, endre og slette oppføringer. [Slik setter du opp et underskjema]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/subform" >}}).

[Detaljer om komponenten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Subform" >}})

---
