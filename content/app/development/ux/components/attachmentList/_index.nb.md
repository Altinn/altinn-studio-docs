---
title: AttachmentList
linktitle: AttachmentList
description: # Kort beskrivelse av komponenten
schemaname: AttachmentList # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
---

<!-- HVORDAN BRUKE DENNE MALEN
- Les kommentarer under hver seksjon for veiledning.
- Slett kommentarer og deler av innholdet som ikke er relevant.
- Gi norsk navn til title og linktitle i frontmatter
- Når dokumentasjonen er klar til å publiseres, fjern "hidden: true" fra frontmatter
- Hvis dokumentasjonen er fullstendig, fjern advarsel om at den er under oppdatering.

FELLES EGENSKAPER
Dokumentasjon for egenskaper som er felles for flere komponenter oppdateres i egne filer og legges til via shortcode.
Legg til dokumentasjon: Bruk shortcode `property-docs` med hakeparenteser (`< >`) og argument `prop="{propName}"`. `propName` må samsvare med filnavn (som bør samsvare med JSON-skjema-navn).
Oppdatere/opprette dokumentasjon:
- Filer, maler og instruksjoner ligger under components/_common-props-content
- Bilder legges i /assets/images/component-settings og legges til via egen shortcode (`image.html`)

EKSEMPLER
- Se Image, Checkboxes, RadioButtons og Dropdown. for eksempler.

-->

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

Komponenten {{% title %}} brukes til å vise en liste med vedlegg for en gitt oppgave.
Denne kan brukes til å vise vedlegg som er lastet opp av brukeren, og/eller for å vise pdf-vedlegg som er generert av systemet.
Egenskapen `dataTypeIds` lar deg filtrere og vise vedlegg basert på spesifiserte datatyper.
Nedenfor i eksempel-seksjonen kan du se hvordan du kan vise vedlegg for spesifikke datatyper, eller for alle datatyper.

## Egenskaper

Følgende er en liste over tilgjengelige egenskaper for {{% title %}}. Listen er automatisk generert basert på komponentens JSON schema (se link).

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter. Listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

<!-- Shortkoden `component-props` genererer automatisk en liste over komponentegenskaper fra komponentens JSON schema.
Komponentnavnet kan gis eksplisitt som argument (f.eks. `component-props "Grid"`).
Hvis ingen argument gis, henter shortkoden komponentnavnet fra 'schemaname' i frontmatter.
Hvis komponenten ikke har JSON schema, kommenter ut tekst og shortcode i denne delen og lag evt. tabell manuelt med de viktigste egenskapene (kolonner: Egenskap, Type, Beskrivelse).
 -->

{{% component-props %}}


## Eksempler

### Eksempel 1: Viser Vedlegg for Spesifikke Datatyper

Dette eksemplet viser vedlegg for spesifikke datatyper. 
I dette tilfellet vises vedlegg for datatyper med ID-ene "attachment1" og "attachment2".


```json
{
  "component": "AttachmentList",
  "dataTypeIds": ["attachment1", "attachment2"]
}
```

### Eksempel 2: Viser Vedlegg for Alle Datatyper (Unntatt PDF-systemgenererte Vedlegg)

Dette eksemplet fremhever standardoppførselen, som er å vise vedlegg for alle datatyper, 
mens PDF-systemgenererte vedlegg utelates. Egenskapen `dataTypeIds` er ikke spesifisert i dette tilfellet.

```json
{
  "component": "AttachmentList"
}
```

### Eksempel 3: Viser Vedlegg for Alle Datatyper (Inkludert PDF-systemgenererte Vedlegg)

Dette eksemplet viser hvordan du kan vise vedlegg for alle datatyper, inkludert PDF-systemgenererte vedlegg.
Egenskapen `dataTypeIds` er satt til "include-all".

```json
{
  "component": "AttachmentList",
  "dataTypeIds": ["include-all"]
}
```

### Eksempel 4: Viser Vedlegg for Spesifikke Datatyper (Inkludert PDF-systemgenererte Vedlegg)

Dette eksemplet viser hvordan du kan vise vedlegg for spesifikke datatyper, inkludert PDF-systemgenererte vedlegg.

```json
{
  "component": "AttachmentList",
  "dataTypeIds": ["attachment1", "attachment2", "ref-data-as-pdf"]
}
```