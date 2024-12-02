---
title: Date
linktitle: Date
description: En komponent som viser formatert dato med eller uten ledetekst.
schemaname: Date # Component schema name used to autogenerate list of properties from json schema (replace with appropriate component name)
weight: 10 # Do not change, the components will be sorted alphabetically
toc: true
---

## Bruk

`Date`-komponenten lar brukeren legge til strukturert formatert dato med eller uten ledetekst.

### Anatomi

1. **Horisontal**: Dato med ledetekst strukturert horisontalt
![Dato horisontal anatomi](date-horizontal.png "Dato Horisontal")
2. **Vertikal**: Dato med ledetekst strukturert vertikalt
![Dato vertikal anatomi](date-vertical.png "Dato vertikal")


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

- [`Number`](../number/)
- [`Text`](../text/)

## Egenskaper

{{% notice warning %}}
We are currently updating how we implement components, and the list of properties may not be entirely accurate.
{{% /notice %}}

| **Property**                 | **Type** | **Description**                                                                                                                            |
|------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                         | string   | Unik Id streng for komponenten.                                                                                                             |
| `value`                      | string   | Datoen du vil vise frem. Må være en ISO6801 string.                                                                                        |
| `textResourceBindings.title` | string   | Ledeteksten til datoen du vil vise.                                                                                                         |
| `format`                     | string   | En formateringsstreng basert på [Unicode Teknisk standard](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).   |
| `direction`                  | string   | Setter den strukturerte retningen for ledetekst og verdi. <br/><br/>**Enum:** [horizontal, vertical] . <br/> <br/>**Default:** horizontal. |

## Konfigurering

### Legg til komponent

```json{hl_lines="6-"}
{
  "id": "date",
  "type": "Date",
  "textResourceBindings": {
    "title": "Date"
  },
  "value": "2022-09-27 18:00:00.000",
  "format": "dd.MM.yyyy",
  "direction": "horizontal",
},
```

### Legg til tittel og elementer

<br>

#### `textResourceBindings.title`

Ledetekst for datoen. Denne kan legges til som en hardkodet streng eller som en referanse til en [tekstressurs](/nb/altinn-studio/reference/ux/texts/#legge-til-og-endre-tekster-i-en-app).

#### `value`

Verdien av datoen som skal vises. Kan legges til som en streng eller et uttrykk.

#### `format`

Setter formateringen for datoen gitt i `value` feltet. Dette er basert på [Unicode Teknisk standard](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).

#### `direction`

Bestemmer om teksten vises under eller ved siden av ledeteksten. `horizontal` for ved siden av og `vertical` for under. 

<br>

#### Eksempel

Dato med ledetekst og ikon.

```json{hl_lines=["9-12"]}
...
{
  "id": "date",
  "type": "Date",
  "textResourceBindings": {
    "title": "Date"
  },
  "value": "2022-09-27 18:00:00.000",
  "format": "dd.MM.yyyy",
  "direction": "horizontal",
},
```
<!-- 
![Dato eksempel](<date-example-with-icon.png> "Dato med ikon og ledetekst")
-->