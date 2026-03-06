---
draft: true
title: Komponenter
description: Under arbeid - komponentoversikt basert på Altinn Studio GUI
tags: [needsReview, translate-to-english, under-construction]
---

## Skjema

Komponenter for datainnsamling.

### Lite tekstfelt (`Input`)
`Input` gir brukere muligheten til å skrive fritekst eller tall.

![Input](./Input.png)

[Detaljer om komponenten](./Input)

---

### Stort tekstfelt (`TextArea`)

`TextArea` brukes når brukeren skal kunne skrive inn tekst som går over flere linjer.

![TextArea](./TextArea.png)

[Detaljer om komponenten](./TextArea.md)

---

### Datovelger (`Datepicker`)

`Date`-komponenten lar brukeren legge til strukturert formatert dato.

![Datepicker](./Datepicker.png)

[Detaljer om komponenten](./Datepicker.md)

---

### Finn virksomhet (OrganizationLookup)

`OrganizationLookup`-komponenten slår opp en organisasjon i Enhetsregisteret ved hjelp av organisasjonsnummer.

[Detaljer om komponenten]()

---

---

### Finn person (PersonLookup)

`PersonLookup`-komponenten søker i det nasjonale folkeregisteret basert på fødselsnummer og etternavn.

[Detaljer om komponenten]()

---


## Tekst

Komponenter for å vise tekst og informasjon.

### Tittel (`Header`)

`Header` brukes til å strukturere innhold og skape hierarki på siden.

![Header](./Header.png)

[Detaljer om komponenten](./Header)

---

### Avsnitt (`Paragraph`)

`Paragraph` brukes til løpende tekst og benyttes typisk i artikler, komponenter, hjelpetekster og lignende.

![Paragraph](./Paragraph.png)

[Detaljer om komponenten](./Paragraph)

---

### Informativ melding (`Panel`)

`Panel` kan brukes til å vise viktig informasjon til brukeren i ulike varianter (info, success, warning). Komponenten
dekker hele bredden til siden. 

![Panel](./Panel.png)

[Detaljer om komponenten](./Panel)

---

### Varsel (`Alert`)

`Alert` gir brukeren informasjon som det er ekstra viktig at de ser og forstår. Komponenten er designet for å fange 
brukernes oppmerksomhet. Teksten i varselet skal være kort og tydelig.

![Alert](./Alert.png)

[Detaljer om komponenten](./Alert)

---

### Delelinje (`Divider`)

`Divider` brukes for å skape et visuelt skille mellom innhold. Det er en enkel horisontal linje som strekker seg over 
tilgjengelig bredde.

![Divider](./Divider.png)

[Detaljer om komponenten](./Divider)

---

### Tekst (`Text`)

`Text`-komponenten viser tekst med eller uten ledetekst.

[Detaljer om komponenten](./Text)

---

### Dato (`Date`)

`Date` er en komponent som viser formatert dato med eller uten ledetekst.

[Detaljer om komponenten](./Date)

---

## Flervalg

Komponenter for valg fra forhåndsdefinerte alternativer.

### Avmerkingsbokser (`Checkboxes`)
`Checkboxes` gir brukerne mulighet til å velge ett eller flere alternativer. Den kan også brukes i tilfeller der 
brukeren skal bekrefte noe.

![Checkboxes](./Checkboxes.png)

[Detaljer om komponenten](./Checkboxes)

---

### Radioknapper (`RadioButtons`)
`RadioButtons` er er ett eller fleer alternativ brukeren kan velge. Brukeren kan bytte mellom alternativene, men kan 
kun velge ett.

![RadioButtons](./RadioButtons.png)

[Detaljer om komponenten](./RadioButtons)

---

### Nedtrekksliste (`Dropdown`)
`Dropdown` lar brukeren velge ett alternativ fra en liste.

![Dropdown](./Dropdown.png)

[Detaljer om komponenten](./Dropdown)

---

### Nedtrekksliste med flere valg (`MultipleSelect`)
`MultipleSelect` lar brukeren velge flere alternativer fra en liste.

![MultipleSelect](./Dropdown.png)

[Detaljer om komponenten](./MultipleSelect)

---

### Likert-skala (Likert)

[Detaljer om komponenten]()

---

## Informasjon

Komponenter for å vise tilleggsinformasjon.

### Informasjon om eksemplaret (InstanceInformation)

[Detaljer om komponenten](./InstanceInformation)

---

### Bilde (`Image`)
`Image` viser et bilde som er lastet opp til appen eller lastet inn fra en URL.

![Image](./Image.png)

[Detaljer om komponenten](./Image)

---

### Lenke (Link)

[Detaljer om komponenten](./Link)

---

### IFrame (IFrame)

[Detaljer om komponenten](./IFrame)

---

### Oppsummering (`Summary2`)
`Summary2` lar deg vise en oppsummering av enten en komponent, side eller layoutSet, enten i nåværende eller tidligere oppgaver.

Den kan tilpasses for å dekke dine behov, og brukes også for å generere PDF.

![Summary2](./Summary2.png)

[Detaljer om komponenten](./Summary)

---

## Knapper

Handlingsknapper og navigasjon.

### Send inn (`Button`)
`Button` brukes til å sende inn data, og flytte brukeren videre i prosessen.

![Button](./Button.png)

[Detaljer om komponenten](./Button)

---

### Egendefinert knapp (`CustomButton`)
`CustomButton` brukes til å trigge egendefinerte handlinger på serveren.

![CustomButton](./Button.png)

[Detaljer om komponenten](./CustomButton)

---

### Navigasjonsknapper (`NavigationButtons`)
`NavigationButtons` brukes til å navigere frem/tilbake mellom sider. Denne komponenten legges automatisk til når du 
legger til en ny side i Altinn Studio verktøyet.

![NavigationButtons](./NavigationButtons.png)

[Detaljer om komponenten](./NavigationButtons)

---

### Utskrift (`PrintButton`)
`PrintButton` brukes til å trigge utskriftsvisning av skjema.

![PrintButton](./PrintButton.png)

[Detaljer om komponenten](./PrintButton)

---

### Start eksemplar (`InstantiationButton`)
`InstantiationButton` brukes til å starte et eksemplar av en app ved bruk av 
[stateless-oppsettet.]({{<relref "/altinn-studio/v10/develop-a-service/process/stateless">}})

![InstantiationButton](./Button.png)

[Detaljer om komponenten](./InstantiationButton)

---

### Handlingsknapp (`ActionButton`)
`ActionButton` starter en bestemt handling knyttet til den oppgaven i arbeidsflyten som brukerne er på. 
Oppgaven kan for eksempel være signering, bekreftelse eller avvisning.

![ActionButton](./Button.png)

[Detaljer om komponenten](./ActionButton)

---

## Vedlegg

Komponenter for filopplasting.

### Liste over vedlegg (`AttachmentList`)
`AttachmentList` viser en liste over vedlegg som er lastet opp i skjemaet, for den oppgaven de jobber på. Velg om alle
vedlegg skal vises, eller kun et utvalg.

[Detaljer om komponenten](./AttachmentList)

---

### Vedlegg (`FileUpload`)
`FileUpload` lar brukeren laste opp vedlegg. Du kan styre hva slags filtyper som kan lastes opp.

![FileUpload](./FileUpload.png)

[Detaljer om komponenten](./FileUpload)

---

### Vedlegg med merking (`FileUploadWithTag`)
`FileUploadWithTag` lar brukeren laste opp vedlegg og merke vedlegg med forhåndsdefinerte tagger. Du kan styre hva slags 
filtyper som kan lastes opp.

![FileUploadWithTag](./FileUpload.png)

[Detaljer om komponenten](./FileUploadWithTag)

---

### Bildeopplaster (`ImageUpload`)
`ImageUpload` lar brukeren laste opp og ev. beskjære bilder.

![ImageUpload](./ImageUpload.png)

[Detaljer om komponenten](./ImageUpload)

---

## Gruppering

Komponenter for å strukturere skjemaet.

### Gruppe (Group)

[Detaljer om komponenten]()

---

### Rutenett (Grid)

[Detaljer om komponenten]()

---

### Trekkspilliste (Accordion)

[Detaljer om komponenten]()

---

### Nestet trekkspilliste (AccordionGroup)

[Detaljer om komponenten]()

---

### Knappegruppe (ButtonGroup)

[Detaljer om komponenten]()

---

### Liste (List)

[Detaljer om komponenten]()

---

### Repeterende gruppe (Group)

[Detaljer om komponenten]()

---

## Avansert

Spesialiserte komponenter for avanserte bruksområder.

### Adresse (Address)

[Detaljer om komponenten]()

---

### Stedfeste i kart (Map)

[Detaljer om komponenten]()

---

### Egendefinert (Custom)

[Detaljer om komponenten]()

---

### Tabell for underskjema (List)

[Detaljer om komponenten]()

---