---
draft: true
title: Komponenter
description: Under arbeid - komponentoversikt basert på Altinn Studio GUI
weight: 85
tags: [needsReview, translate-to-english, under-construction]
---

{{< notice warning >}}
Denne siden er under arbeid. Komponentoversikten vil bli oppdatert basert på de 42 komponentene som er tilgjengelige i Altinn Studio GUI.
{{< /notice >}}

## Skjema

Komponenter for datainnsamling.

### Lite tekstfelt (Input)

_Innhold kommer._

---

### Stort tekstfelt (TextArea)

_Innhold kommer._

---

### Dato (Date)

`Date`-komponenten lar brukeren legge til strukturert formatert dato med eller uten ledetekst.

#### Utseende

1. **Horisontal**: Dato med ledetekst strukturert horisontalt
2. **Vertikal**: Dato med ledetekst strukturert vertikalt

#### Egenskaper

| **Egenskap**                 | **Type** | **Beskrivelse**                                                                                                                            |
|------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                         | string   | Unik Id streng for komponenten.                                                                                                             |
| `value`                      | string   | Datoen du vil vise frem. Må være en ISO6801 string.                                                                                        |
| `textResourceBindings.title` | string   | Ledeteksten til datoen du vil vise.                                                                                                         |
| `format`                     | string   | En formateringsstreng basert på [Unicode Teknisk standard](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).   |
| `direction`                  | string   | Setter den strukturerte retningen for ledetekst og verdi. <br/><br/>**Enum:** [horizontal, vertical] . <br/> <br/>**Default:** horizontal. |

---

### Finn virksomhet (OrganizationLookup)

`OrganizationLookup`-komponenten slår opp en organisasjon i Enhetsregisteret ved hjelp av organisasjonsnummer.

#### Bruk

Komponenten tar et organisasjonsnummer som inndata, verifiserer at organisasjonen eksisterer, og lagrer organisasjonsnummeret og organisasjonsnavnet ved hjelp av en datamodellbinding.

#### Utseende

Komponenten består av:

1. **Overskrift** – Hovedtittel
2. **Hjelpetekst** – Klikk for hjelpe-popup
3. **Vis beskrivelse** – Beskrivelse av komponenten
4. **Organisasjonsnummerfelt** – Inndatafelt for organisasjonsnummer
5. **Hent opplysninger** – Hent opplysninger basert på inndata

#### Egenskaper

| **Egenskap**                                   | **Type** | **Beskrivelse**                                                                                                      |
| ---------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `id`                                           | string   | Komponent-ID-en. Må være unik innenfor alle oppsett/sider i et oppsett-sett. Kan ikke slutte med <bindestrek><tall>. |
| `type`                                         | string   | "OrganisationLookup"                                                                                                 |
| `dataModelBindings.organisation_lookup_orgnr`  | string   | Hvor i datamodellen resultatet (orgnr) skal lagres                                                                  |
| `dataModelBindings.organisation_lookup_name`   | string   | Hvor i datamodellen resultatet (navn) skal lagres                                                                   |
| `textResourceBindings.title`                   | string   | Ledetekst (valgfritt)                                                                                               |
| `textResourceBindings.description`             | string   | Beskrivelse (valgfritt)                                                                                             |
| `textResourceBindings.help`                    | string   | Hjelpetekst (valgfritt)                                                                                             |

---

### Finn person (PersonLookup)

`PersonLookup`-komponenten søker i det nasjonale folkeregisteret basert på fødselsnummer og etternavn.

#### Bruk

Komponenten søker i det nasjonale folkeregisteret basert på brukerens oppgitte input for fødselsnummer og etternavn, og lagrer resultatet ved hjelp av en datamodellbinding.

#### Utseende

Komponenten består av:

1. **Overskrift** – Hovedtittel
2. **Hjelpetekst** – Klikk for hjelpe-popup
3. **Vis beskrivelse** – Beskrivelse av komponenten
4. **Personnummerfelt** – Inndatafelt for fødselsnummer
5. **Etternavn** – Inndatafelt for etternavn
6. **Hent opplysninger** – Hent opplysninger basert på inndata

#### Egenskaper

| **Egenskap**                           | **Type** | **Beskrivelse**                                                                                                      |
| -------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `id`                                   | string   | Komponent-ID-en. Må være unik innenfor alle oppsett/sider i et oppsett-sett. Kan ikke slutte med <bindestrek><tall>. |
| `type`                                 | string   | "PersonLookup"                                                                                                       |
| `dataModelBindings.person_lookup_ssn`  | string   | Hvor i datamodellen resultatet (fnr) skal lagres                                                                     |
| `dataModelBindings.person_lookup_name` | string   | Hvor i datamodellen resultatet (navn) skal lagres                                                                    |
| `textResourceBindings.title`           | string   | Ledetekst (valgfritt)                                                                                                |
| `textResourceBindings.description`     | string   | Beskrivelse (valgfritt)                                                                                              |
| `textResourceBindings.help`            | string   | Hjelpetekst (valgfritt)                                                                                              |

## Tekst

Komponenter for å vise tekst og informasjon.

### Tittel (Header)

_Innhold kommer._

---

### Avsnitt (Paragraph)

_Innhold kommer._

---

### Informativ melding (Panel)

`Panel`-komponenten viser viktig informasjon til brukeren.

#### Bruk

Panelkomponenten kan brukes til å vise viktig informasjon til brukeren i ulike varianter (info, success, warning).

#### Utseende

De forskjellige variantene av Panel-komponenten:

<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="350" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1-45612&viewport=328%2C-2644%2C0.41&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A45612&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>
<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="350" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1-45613&viewport=328%2C-2644%2C0.41&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A45613&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>
<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="350" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1-45614&viewport=328%2C-2644%2C0.41&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A45614&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>

#### Egenskaper

| **Egenskap** | **Type** | **Beskrivelse** |
|--------------|----------|-----------------|
| `id` | string | Unik ID for komponenten |
| `type` | string | "Panel" |
| `textResourceBindings.title` | string | Tittel på panelet |
| `textResourceBindings.body` | string | Innholdet i panelet |
| `variant` | string | Variant av panelet. **Enum:** `"info" \| "success" \| "warning"` |
| `showIcon` | boolean | Viser eller skjuler ikon. Standard: true |

---

### Varsel (Alert)

`Alert`-komponenten viser meldinger til brukerne med ulike alvorlighetsgrader.

#### Bruk

Bruk varsler når du vil vise viktig informasjon til brukerne.

#### Utseende

<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="300" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1-4276&viewport=854%2C1675%2C0.89&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A4276&show-proto-sidebar=0&embed-host=share&hide-ui=true" allowfullscreen></iframe>

Komponenten består av:

1. **Overskrift** – En kort beskrivende tittel
2. **Ikon** – Et grafisk symbol som viser hvor alvorlig varselet er
3. **Tekstinnhold** – En melding som forteller hva varselet dreier seg om

#### Egenskaper

| **Egenskap** | **Type** | **Beskrivelse** |
|--------------|----------|-----------------|
| `id` | string | Unik ID for komponenten |
| `type` | string | "Alert" |
| `textResourceBindings.title` | string | Overskriften til varselet |
| `textResourceBindings.body` | string | Innholdet i varselet |
| `severity` | string | Alvorlighetsgraden til varselet. **Enum:** `"success" \| "info" \| "danger" \| "warning"` |

---

### Delelinje (Divider)

_Innhold kommer._

---

### Tekst (Text)

`Text`-komponenten viser tekst med eller uten ledetekst.

#### Bruk

Tekstkomponenten lar brukeren legge til strukturert tekst med og uten ledetekst.

#### Utseende

1. **Horisontal**: En tekst med ledetekst strukturert horisontalt
2. **Vertikal**: En tekst med ledetekst strukturert vertikalt

_Visuelle eksempler må legges inn._

#### Egenskaper

| **Egenskap** | **Type** | **Beskrivelse** |
|--------------|----------|-----------------|
| `id` | string | Unik ID streng for komponenten |
| `type` | string | "Text" |
| `value` | string | Teksten du vil vise |
| `textResourceBindings.title` | string | Ledeteksten for teksten du vil vise |
| `direction` | string | Setter strukturell retning på ledetekst og verdi. **Enum:** `"horizontal" \| "vertical"` |

## Flervalg

Komponenter for valg fra forhåndsdefinerte alternativer.

### Avmerkingsbokser (Checkboxes)

### Radioknapper (RadioButtons)

### Nedtrekksliste (Dropdown)

### Nedtrekksliste med flere valg (MultipleSelect)

### Likert-skala (Likert)

## Informasjon

Komponenter for å vise tilleggsinformasjon.

### Informasjon om eksemplaret (InstanceInformation)

### Bilde (Image)

### Lenke (Link)

### IFrame (IFrame)

### Oppsummering (Summary)

## Knapper

Handlingsknapper og navigasjon.

### Send inn (Button)

### Egendefinert knapp (CustomButton)

### Navigasjonsknapp (NavigationButtons)

### Utskrift (PrintButton)

### Start eksemplar (InstantiationButton)

### Handlingsknapp (ActionButton)

## Vedlegg

Komponenter for filopplasting.

### Liste over vedlegg (AttachmentList)

### Vedlegg (FileUpload)

### Vedlegg med merking (FileUploadWithTag)

### Bildeopplaster (FileUpload)

## Gruppering

Komponenter for å strukturere skjemaet.

### Gruppe (Group)

### Rutenett (Grid)

### Trekkspilliste (Accordion)

### Nestet trekkspilliste (AccordionGroup)

### Knappegruppe (ButtonGroup)

### Liste (List)

### Repeterende gruppe (Group)

## Avansert

Spesialiserte komponenter for avanserte bruksområder.

### Adresse (Address)

### Stedfeste i kart (Map)

### Egendefinert (Custom)

### Tabell for underskjema (List)

## Midlertidig referanse

Inntil komponentoversikten er ferdig, kan du se [komponentene i v8-referansen](/nb/altinn-studio/v8/reference/ux/components/) for dokumentasjon. Merk at ikke alle komponenter fra v8 er tilgjengelige i dagens versjon av Altinn Studio.
