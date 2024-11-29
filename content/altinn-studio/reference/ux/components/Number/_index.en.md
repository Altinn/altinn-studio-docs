---
title: Number
linktitle: Number
description: A component that allows you to display and format numbers with or without label.
schemaname: Number # Component schema name used to autogenerate list of properties from json schema (replace with appropriate component name)
weight: 10 # Do not change, the components will be sorted alphabetically
toc: true
---

## Usage

The `Number` component allows users to add formatted numbers, with or without label.

### Anatomy

1. **Horizontal**: A number with a label structured horizontally
![Text horizontal anatomy](number-horizontal.png "Text Horizontal")
2. **Vertical**: A number with a label structured vertically 
![Text vertical anatomy](number-vertical.png "Text vertical")


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
### Related

- [`Text`](../text/)
- [`Date`](../date/)

## Properties

{{% notice warning %}}
We are currently updating how we implement components, and the list of properties may not be entirely accurate.
{{% /notice %}}

| **Property**                 | **Type** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                         | string   | The component ID. Must be unique within all layouts/pages in a layout-set. Cannot end with <dash><number>. |
| `value`                      | number   | A hardcoded string or expression for resolving the number you want to display. |
| `textResourceBindings.title` | string   | A label for the date you want to display                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `formatting`                 | object   | Set of options for formatting the number.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `formatting.align`           | string   | string	The alignment for the number (e.g. right aligning a series of numbers).<br/><br/> **Enum:** [left, center, right]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `formatting.currency`        | string   | Enables currency formatting, including thousand and decimal separators, to adjust according to the selected app language. They are configured in number property. Note: parts that already exist in number property are not overridden by this prop.<br/><br/> **Enum:**: [AED, AFN, ALL, AMD, ANG, AOA, ARS, AUD, AWG, AZN, BAM, BBD, BDT, BGN, BHD, BIF, BMD, BND, BOB, BOV, BRL, BSD, BTN, BWP, BYN, BZD, CAD, CDF, CHE, CHF, CHW, CLF, CLP, CNY, COP, COU, CRC, CUC, CUP, CVE, CZK, DJF, DKK, DOP, DZD, EGP, ERN, ETB, EUR, FJD, FKP, GBP, GEL, GHS, GIP, GMD, GNF, GTQ, GYD, HKD, HNL, HTG, HUF, IDR, ILS, INR, IQD, IRR, ISK, JMD, JOD, JPY, KES, KGS, KHR, KMF, KPW, KRW, KWD, KYD, KZT, LAK, LBP, LKR, LRD, LSL, LYD, MAD, MDL, MGA, MKD, MMK, MNT, MOP, MRU, MUR, MVR, MWK, MXN, MXV, MYR, MZN, NAD, NGN, NIO, NOK, NPR, NZD, OMR, PAB, PEN, PGK, PHP, PKR, PLN, PYG, QAR, RON, RSD, RUB, RWF, SAR, SBD, SCR, SDG, SEK, SGD, SHP, SLE, SLL, SOS, SRD, SSP, STN, SVC, SYP, SZL, THB, TJS, TMT, TND, TOP, TRY, TTD, TWD, TZS, UAH, UGX, USD, USN, UYI, UYU, UYW, UZS, VED, VES, VND, VUV, WST, XAF, XCD, XDR, XOF, XPF, XSU, XUA, YER, ZAR, ZMW, ZWL] |
| `formatting.position`        | string   | Display the unit as prefix or suffix. <br/><br/> **Enum:**: [prefix, suffix] <br/><br/> **Default:** prefix.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `formatting.unit`            | string   | Enables unit along with thousand and decimal separators to be language sensitive based on selected app language. They are configured in number property. Note: parts that already exist in number property are not overridden by this prop.<br/><br/> **Enum:**: [celsius, centimeter, day, degree, foot, gram, hectare, hour, inch, kilogram, kilometer, liter, meter, milliliter, millimeter, millisecond, minute, month, percent, second, week, year]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `direction`                  | string   | Sets the structured direction of label and value.<br/><br/> **Enum:** [horizontal, vertical]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `icon`                       | string   | A URL path to the image/icon to be shown next to the label.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

## Configuration

### Add component

```json{hl_lines="6-"}
 {
        "id": "number1",
        "type": "Number",
        "textResourceBindings": {
          "title": "Amount"
        },
        "value": "100000",
        "direction": "vertical",
        "icon": "https://www.example.com/icon.png",
        "formatting": {
          "currency": "NOK",
          "position": "suffix",
          "number": {
            "thousandSeparator": " "
          }
        },
      },
```

### Add title and elements

<br>

#### `textResourceBindings.title`

Label for the number. This can be added as a hardcoded string or as a reference to a [text resource](/nb/altinn-studio/reference/ux/texts/#legge-til-og-endre-tekster-i-en-app).

#### `value`

The value of the number to be displayed. Can be added as a string or an expression.

#### `direction`

Decides if the number should be shown under or next to the label. `horizontal` for showing it next to the label and `vertical` for under. 

#### `formatting`

Set of options for formatting the number. Contains the properties align, currency, position and unit.

<!-- 
#### `icon`

If you want to show an icon before the label, you can add a URL path to the icon/image you want to be displayed.
-->

<br>

#### Example

Text with label and icon.

```json{hl_lines=["9-12"]}
...
{
  "id": "text",
  "type": "Text",
  "textResourceBindings": {
    "title": "Name"
  },
  "value": "My name",
  "direction": "horizontal",
  "icon": "https://www.example.com/icon.png"
},
```

<!-- 
![Number example](number-example-with-icon.png "Number with icon and label")
-->