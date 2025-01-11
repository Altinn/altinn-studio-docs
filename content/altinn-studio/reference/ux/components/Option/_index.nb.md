---
title: Option
description: Komponent som lar deg vise et valg fra en kodeliste
schemaname: Option # Component schema name used to autogenerate list of properties from json schema (replace with appropriate component name)
weight: 10 # Do not change, the components will be sorted alphabetically
toc: true
---

## Bruk

`Option`-komponenten lar deg vise frem et valg fra en kodeliste. Dette kan være nyttig dersom du har en _verdi_ fra en kodeliste,
men ønsker å vise frem dette til brukeren uten at brukeren skal kunne endre denne verdien. Med andre ord, `Option`-komponenten
er en _read-only_ komponent, også kjent som en _visningskomponent_ eller _presentasjonskomponent_.

Et eksempel på bruk kan være at kommunen brukeren tilhører er
[hentet inn fra folkeregisteret og lagret i datamodellen vha. forhåndsutfylling](../../../data/prefill).
Selv om brukeren ikke skal endre denne verdien bør den vises frem til informasjon, da alle deler av
datamodellen er en del av den endelige innsendingen. Man kan hente inn listen over
kommuner fra [felles standard kodelister](../../../../guides/development/options/sources/shared) for å slå opp
kommunenummeret og vise frem kommunenavnet.

### Anatomi

[//]: # (TODO: Add screenshots of the component and describe the anatomy)


<!-- 
Add the following sections if relevant:

### Behavior

(How the component behaves in different contexts)

### Style

(Visual styling (e.g. alignment, padding, dos and don'ts))

### Best Practices

(Industry standards, dos and don'ts)

### Content guidelines

(E.g. punctuation rules, standard labels, etc.)

### Accessibility

(Component-specific best practices for accessibility.)

### Mobile

(How to apply component in mobile environments.)

-->
### Relatert

- [`Text`](../text/)
- [`Date`](../date/)
- [`Number`](../number/)

## Egenskaper

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan egenskaper for komponenter dokumenteres. Listen over egenskaper kan derfor være unøyaktig.
{{% /notice %}}

| **Egenskap**                       | **Type** | **Beskrivelse**                                                                                                                                                 |
|------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                               | string   | Komponent-ID-en. Må være unik innenfor alle oppsett/sider i et oppsett-sett. Kan ikke slutte med <bindestrek><tall>.                                            |
| `value`                            | number   | En verdi som finnes i kodelisten. Denne egenskapen kan være et [dynamisk uttrykk](../../../logic/expressions) som henter denne verdien fra f.eks. datamodellen. |
| `textResourceBindings.title`       | string   | Ledetekst (valgfritt)                                                                                                                                           |
| `textResourceBindings.description` | string   | Beskrivelse (valgfritt)                                                                                                                                         |
| `textResourceBindings.help`        | string   | Hjelpetekst (valgfritt)                                                                                                                                         |
| `direction`                        | string   | Setter den strukturerte retningen av ledetekst og verdi.<br/><br/> **Enum:** [horizontal, vertical] <br/><br/>**Default:** horizontal                           |
| `icon`                             | string   | Stien til et ikon som skal vises i forbindelse med valget (valgfritt)                                                                                           |

I tilegg støttes alle egenskaper for [kobling mot kodelister](../../../../guides/development/options/sources/).


## Konfigurering

### Legg til komponent

```json
{
  "id": "municipality",
  "type": "Option",
  "textResourceBindings": {
    "title": "Kommune"
  },
  "value": ["dataModel", "Prefill.MunicipalityNumber"],
  "direction": "vertical",
  "optionsId": "kommuner"
}
```

### Legg til tittel og elementer

<br>

#### `textResourceBindings.title`

Ledetekst for valget. Denne kan legges til som en hardkodet streng eller som en referanse til en [tekstressurs](../../../ux/texts/#legge-til-og-endre-tekster-i-en-app). Denne egenskapen brukes for å vise til
brukeren hva valget gjelder, ikke hva valget er. Skal man vise frem valgt kommune, kan denne
være f.eks. "Kommune" eller "Din kommune". Selve valget (verdien) hentes fra kodelisten, og vises da som f.eks. "Oslo".

#### `textResourceBindings.description`

Beskrivelse for valget. Denne kan legges til som en hardkodet streng eller som en referanse til en [tekstressurs](../../../ux/texts/#legge-til-og-endre-tekster-i-en-app).

#### `textResourceBindings.help`

Hjelpetekst for valget. Denne kan legges til som en hardkodet streng eller som en referanse til en [tekstressurs](../../../ux/texts/#legge-til-og-endre-tekster-i-en-app).

#### `value`

Her spesifiserer man verdien som skal vises frem. Denne må stemme overens med en verdi i kodelisten. Verdien kan også
bestemmes ut ifra et [dynamisk uttrykk](../../../logic/expressions).

#### `direction`

Bestemmer om valget vises under eller ved siden av ledeteksten. `horizontal` for ved siden av og `vertical` for under. 
