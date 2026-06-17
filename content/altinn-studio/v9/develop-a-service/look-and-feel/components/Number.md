---
title: Number
draft: true
---

## Properties

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `renderAsSummary` | Boolean value indicating if the component should be rendered as a summary. Defaults to false. |  |
| `forceShowInSummary` | Will force show the component in a summary even if hideEmptyFields is set to true in the summary component. |  |
| `type` | Required. | `"Number"` |
| `textResourceBindings` | See [Text resource bindings](#text-resource-bindings-textresourcebindings). |  |
| `formatting` | See [Formatting](#formatting-formatting). |  |
| `value` | Any expression returning a number Required. |  |
| `direction` |  | `"horizontal"`, `"vertical"` |
| `icon` |  |  |

## Text resource bindings (`textResourceBindings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `summaryTitle` | Title used in the summary view (overrides the default title) |  |
| `summaryAccessibleTitle` | Title used for aria-label on the edit button in the summary view (overrides the default and summary title) |  |
| `title` | Label text/title shown above the component |  |
| `description` | Label description shown above the component, below the title |  |
| `help` | Help text shown in a tooltip when clicking the help button |  |

## Formatting (`formatting`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `currency` | Enables currency to be language sensitive based on selected app language. Note: parts that already exist in number property are not overridden by this prop. | `"AED"`, `"AFN"`, `"ALL"`, `"AMD"`, `"ANG"`, `"AOA"`, `"ARS"`, `"AUD"`, `"AWG"`, `"AZN"`, `"BAM"`, `"BBD"`, `"BDT"`, `"BGN"`, `"BHD"`, `"BIF"`, `"BMD"`, `"BND"`, `"BOB"`, `"BOV"`, `"BRL"`, `"BSD"`, `"BTN"`, `"BWP"`, `"BYN"`, `"BZD"`, `"CAD"`, `"CDF"`, `"CHE"`, `"CHF"`, `"CHW"`, `"CLF"`, `"CLP"`, `"CNY"`, `"COP"`, `"COU"`, `"CRC"`, `"CUC"`, `"CUP"`, `"CVE"`, `"CZK"`, `"DJF"`, `"DKK"`, `"DOP"`, `"DZD"`, `"EGP"`, `"ERN"`, `"ETB"`, `"EUR"`, `"FJD"`, `"FKP"`, `"GBP"`, `"GEL"`, `"GHS"`, `"GIP"`, `"GMD"`, `"GNF"`, `"GTQ"`, `"GYD"`, `"HKD"`, `"HNL"`, `"HTG"`, `"HUF"`, `"IDR"`, `"ILS"`, `"INR"`, `"IQD"`, `"IRR"`, `"ISK"`, `"JMD"`, `"JOD"`, `"JPY"`, `"KES"`, `"KGS"`, `"KHR"`, `"KMF"`, `"KPW"`, `"KRW"`, `"KWD"`, `"KYD"`, `"KZT"`, `"LAK"`, `"LBP"`, `"LKR"`, `"LRD"`, `"LSL"`, `"LYD"`, `"MAD"`, `"MDL"`, `"MGA"`, `"MKD"`, `"MMK"`, `"MNT"`, `"MOP"`, `"MRU"`, `"MUR"`, `"MVR"`, `"MWK"`, `"MXN"`, `"MXV"`, `"MYR"`, `"MZN"`, `"NAD"`, `"NGN"`, `"NIO"`, `"NOK"`, `"NPR"`, `"NZD"`, `"OMR"`, `"PAB"`, `"PEN"`, `"PGK"`, `"PHP"`, `"PKR"`, `"PLN"`, `"PYG"`, `"QAR"`, `"RON"`, `"RSD"`, `"RUB"`, `"RWF"`, `"SAR"`, `"SBD"`, `"SCR"`, `"SDG"`, `"SEK"`, `"SGD"`, `"SHP"`, `"SLE"`, `"SLL"`, `"SOS"`, `"SRD"`, `"SSP"`, `"STN"`, `"SVC"`, `"SYP"`, `"SZL"`, `"THB"`, `"TJS"`, `"TMT"`, `"TND"`, `"TOP"`, `"TRY"`, `"TTD"`, `"TWD"`, `"TZS"`, `"UAH"`, `"UGX"`, `"USD"`, `"USN"`, `"UYI"`, `"UYU"`, `"UYW"`, `"UZS"`, `"VED"`, `"VES"`, `"VND"`, `"VUV"`, `"WST"`, `"XAF"`, `"XCD"`, `"XDR"`, `"XOF"`, `"XPF"`, `"XSU"`, `"XUA"`, `"YER"`, `"ZAR"`, `"ZMW"`, `"ZWL"` |
| `unit` | Enables unit along with thousand and decimal separators to be language sensitive based on selected app language. They are configured in number property. Note: parts that already exist in number property are not overridden by this prop. | `"celsius"`, `"centimeter"`, `"day"`, `"degree"`, `"foot"`, `"gram"`, `"hectare"`, `"hour"`, `"inch"`, `"kilogram"`, `"kilometer"`, `"liter"`, `"meter"`, `"milliliter"`, `"millimeter"`, `"millisecond"`, `"minute"`, `"month"`, `"percent"`, `"second"`, `"week"`, `"year"` |
| `position` | Display the unit as prefix or suffix. Default is prefix. (Use only when using currency or unit options) | `"prefix"`, `"suffix"` |
| `number` |  |  |
| `number.format` | Any expression returning string Required. |  |
| `number.mask` |  |  |
| `number.allowEmptyFormatting` |  |  |
| `number.patternChar` |  |  |
| `number.thousandSeparator` |  |  |
| `number.decimalSeparator` | Any expression returning string |  |
| `number.allowedDecimalSeparators` |  |  |
| `number.thousandsGroupStyle` |  | `"thousand"`, `"lakh"`, `"wan"`, `"none"` |
| `number.decimalScale` |  |  |
| `number.fixedDecimalScale` |  |  |
| `number.allowNegative` |  |  |
| `number.allowLeadingZeros` |  |  |
| `number.suffix` | Any expression returning string |  |
| `number.prefix` | Any expression returning string |  |
| `align` |  | `"right"`, `"center"`, `"left"` |

## Common properties

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `id` | The component ID. Must be unique within all layouts/pages in a layout-set. Cannot end with &lt;dash&gt;&lt;number&gt;. Required. |  |
| `hidden` | Boolean value or expression indicating if the component should be hidden. Defaults to false. |  |
| `grid` | Settings for the components grid. Used for controlling horizontal alignment |  |
| `grid.xs` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.sm` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.md` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.lg` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.xl` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid` |  |  |
| `grid.labelGrid.xs` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid.sm` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid.md` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid.lg` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid.xl` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid` |  |  |
| `grid.innerGrid.xs` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid.sm` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid.md` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid.lg` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid.xl` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `pageBreak` | Optionally insert page-break before/after component when rendered in PDF |  |
| `pageBreak.breakBefore` | PDF only: Value or expression indicating whether a page break should be added before the component. Can be either: 'auto' (default), 'always', or 'avoid'. |  |
| `pageBreak.breakAfter` | PDF only: Value or expression indicating whether a page break should be added after the component. Can be either: 'auto' (default), 'always', or 'avoid'. |  |
