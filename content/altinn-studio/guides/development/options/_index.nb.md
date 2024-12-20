---
title: Kodelister og svaralternativer
linktitle: Svaralternativer
description: Hvordan konfigurere svaralternativer for en app
toc: true
weight: 40
aliases:
- /nb/altinn-studio/guides/options
- /nb/altinn-studio/reference/data/options
---

Flere av skjemakomponentene i Altinn 3 bruker svaralternativer. Med svaralternativer mener vi en liste med valg som
kan velges av brukeren. I de enkleste tilfellene kan du
[sette opp en liste med svaralternativer direkte i konfigurasjonen til komponenten](sources/static)
men ofte kommer svaralternativene til å hentes fra en _kodeliste_.

### Begreper

Det er noen små forskjeller mellom begrepene _svaralternativer_ og _kodelister_:

- **Svaralternativer**: En liste med valg som kan velges av brukeren. For eksempel, tenk på kontaktene i telefonen din. Når du bruker
  kontaktlisten din for å ringe noen, velger du fra en liste med svaralternativer, og telefonen din bruker den valgte verdien
  (telefonnummeret) for å ringe personen.
- **Kodeliste**: En liste med koder og deres tilhørende verdier og tekster. Som et eksempel, tenk på
  [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) landskoder. Denne listen inneholder koder (som `NO`
  eller `SE`) og deres tilhørende ledetekst (som `Norge` eller `Sverige`).

Når du velger en verdi fra (for eksempel) en nedtrekksliste, velger du fra en liste med _svaralternativer_, som
kan være hentet fra en _kodeliste_. I dette tilfellet er svaralternativer _hva de er_, og en kodeliste er _hvor de kommer fra_.

### Støttede komponenter

Følgende komponenter støtter svaralternativer:

| Komponent                                                               | Type             | Bruksområde                                                                                             |
|-------------------------------------------------------------------------|------------------|---------------------------------------------------------------------------------------------------------|
| [Dropdown](../../../reference/ux/components/dropdown)                   | Ett valg         | Brukes for å velge ett alternativ fra en nedtrekksliste.                                                |
| [RadioButtons](../../../reference/ux/components/radiobuttons)           | Ett valg         | Brukes for å velge ett alternativ fra en liste med radioknapper.                                        |
| [List](../../../reference/ux/components/listcomponent)                  | Ett valg         | Brukes for å velge ett alternativ fra en liste/tabell (med en radioknapp per rad).                      |
| [Likert](../../../reference/ux/components/likert)                       | Ett valg per rad | Brukes for å velge ett alternativ per rad i en tabell, vist som en skala. Vanlig i spørreundersøkelser. |
| [Checkboxes](../../../reference/ux/components/checkboxes)               | Flere valg       | Brukes for å velge ett eller flere alternativer fra en liste med avkrysningsbokser.                     |
| [MultipleSelect](../../../reference/ux/components/multipleselect)       | Flere valg       | Brukes for å velge ett eller flere alternativer fra en nedtrekksliste.                                  |
| [FileUploadWithTag](../../../reference/ux/components/fileuploadwithtag) | Ett valg         | Brukes for å laste opp en fil og knytte den til en 'tag'/merkelapp.                                     |

I kategoriene under kan du lære mer om hvordan du produserer en kodeliste, kobler den til en komponent for å vise
frem svaralternativer, samt om felles funksjonalitet som kan brukes på tvers av disse komponentene.

{{<children />}}
