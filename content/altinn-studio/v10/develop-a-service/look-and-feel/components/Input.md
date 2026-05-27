---
title: Input
draft: true
---

## Properties

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `readOnly` | Boolean value or expression indicating if the component should be read only/disabled. Defaults to false. <br /> <i>Please note that even with read-only fields in components, it may currently be possible to update the field by modifying the request sent to the API or through a direct API call.</i> |  |
| `required` | Boolean value or expression indicating if the component should be required. Defaults to false. |  |
| `showValidations` | List of validation types to show |  |
| `renderAsSummary` | Boolean value indicating if the component should be rendered as a summary. Defaults to false. |  |
| `forceShowInSummary` | Will force show the component in a summary even if hideEmptyFields is set to true in the summary component. |  |
| `labelSettings` | See [Label settings](#label-settings-labelsettings). |  |
| `type` | Required. | `"Input"` |
| `textResourceBindings` | See [Text resource bindings](#text-resource-bindings-textresourcebindings). |  |
| `removeWhenHidden` | Override the logic cleaning data for hidden components at task end, if you want to keep data referenced in hidden components. Currently only has effect if AppSettings.RemoveHiddenData is enabled. |  |
| `dataModelBindings` | See [Data model bindings](#data-model-bindings-datamodelbindings). Required. |  |
| `saveWhileTyping` | Lets you control how long we wait before saving the value locally while typing. This value is usually also used to determine how long we wait before saving the value to the server. The default value is 400 milliseconds. |  |
| `formatting` | See [Formatting](#formatting-formatting). |  |
| `variant` | The variant of the input field (text or search). | `"text"`, `"search"` |
| `autocomplete` | The HTML autocomplete attribute helps browsers suggest or autofill input values based on the expected type of data. | `"on"`, `"off"`, `"name"`, `"honorific-prefix"`, `"given-name"`, `"additional-name"`, `"family-name"`, `"honorific-suffix"`, `"nickname"`, `"email"`, `"username"`, `"new-password"`, `"current-password"`, `"one-time-code"`, `"organization-title"`, `"organization"`, `"street-address"`, `"address-line1"`, `"address-line2"`, `"address-line3"`, `"address-level4"`, `"address-level3"`, `"address-level2"`, `"address-level1"`, `"country"`, `"country-name"`, `"postal-code"`, `"cc-name"`, `"cc-given-name"`, `"cc-additional-name"`, `"cc-family-name"`, `"cc-number"`, `"cc-exp"`, `"cc-exp-month"`, `"cc-exp-year"`, `"cc-csc"`, `"cc-type"`, `"transaction-currency"`, `"transaction-amount"`, `"language"`, `"bday"`, `"bday-day"`, `"bday-month"`, `"bday-year"`, `"sex"`, `"tel"`, `"tel-country-code"`, `"tel-national"`, `"tel-area-code"`, `"tel-local"`, `"tel-extension"`, `"url"`, `"photo"` |
| `maxLength` | Max length of the input field. Will add a counter to let the user know how many characters are left. |  |

## Label settings (`labelSettings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `optionalIndicator` | Show optional indicator on label |  |

## Text resource bindings (`textResourceBindings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `tableTitle` | Title used in the table view (overrides the default title) |  |
| `shortName` | Alternative name used for required validation messages (overrides the default title) |  |
| `requiredValidation` | Full validation message shown when the component is required and no value has been entered (overrides both the default and shortName) |  |
| `summaryTitle` | Title used in the summary view (overrides the default title) |  |
| `summaryAccessibleTitle` | Title used for aria-label on the edit button in the summary view (overrides the default and summary title) |  |
| `title` | Label text/title shown above the component |  |
| `description` | Label description shown above the component, below the title |  |
| `help` | Help text shown in a tooltip when clicking the help button |  |
| `prefix` | Prefix shown before the input field |  |
| `suffix` | Suffix shown after the input field |  |

## Data model bindings (`dataModelBindings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `simpleBinding` | Required. |  |
| `simpleBinding.dataType` | The name of the datamodel type to reference Required. |  |
| `simpleBinding.field` | The path to the property using dot-notation Required. |  |

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
