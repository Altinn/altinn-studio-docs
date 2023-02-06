---
title: Bunntekst
description: Hvordan konfigurere bunnteksten.
weight: 30
---

{{%notice info%}}

Bunntekst er kun tilgjengelig i versjon 7.x og nyere.

{{% /notice%}}

I bunnteksten kan du legge inn ting som kontaktinformasjon, lenger, og annen tekst. I nye applikasjoner inneholder bunnteksten en lenke til Altinn 3 sin tilgjengelighetserklæring.

Bunnteksten defineres i `footer.json` filen under `App/ui`. Denne filen ligner på andre layout filer, men er mye enklere. Standardbunnteksten er definert slik:

```json
{
  "$schema": "https://altinncdn.no/schemas/json/layout/footer.schema.v1.json",
  "footer": [
    {
      "type": "Link",
      "icon": "information",
      "title": "general.accessibility",
      "target": "https://www.altinn.no/om-altinn/tilgjengelighet/"
    }
  ]
}
```

Nye komponenter kan legges til i `footer`-listen.

## Komponenter

{{% expandlarge id="email-component" header="E-post" %}}

### Egenskaper

| Egenskap | Verdi                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------- |
| type     | `Email`                                                                                                              |
| title    | Tekstresursen som skal vises. Støtter **ikke** [formattering](/nb/app/development/ux/texts/#formatering-av-tekster). |
| target   | E-postaddressen som lenkes til.                                                                                      |

### Eksempel

```json
{
    "type": "Email",
    "title": "hjelp@etaten.no",
    "target": "hjelp@etaten.no"
}
```

{{% /expandlarge %}}

{{% expandlarge id="phone-component" header="Telefon" %}}

### Egenskaper

| Egenskap | Verdi                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------- |
| type     | `Phone`                                                                                                              |
| title    | Tekstresursen som skal vises. Støtter **ikke** [formattering](/nb/app/development/ux/texts/#formatering-av-tekster). |
| target   | Telefonnummeret som lenkes til.                                                                                      |

### Example

```json
{
    "type": "Phone",
    "title": "+47 987 65 432",
    "target": "+4798765432"
}
```

{{% /expandlarge %}}

{{% expandlarge id="link-component" header="Lenke" %}}

### Egenskaper

| Egenskap | Verdi                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------- |
| type     | `Link`                                                                                                               |
| title    | Tekstresursen som skal vises. Støtter **ikke** [formattering](/nb/app/development/ux/texts/#formatering-av-tekster). |
| target   | URLen som lenkes til                                                                                                 |
| icon     | Ikon som vises ved siden av lenken. Enten `information`, `email`, eller `phone`.                                     |

### Example

```json
{
    "type": "Link",
    "icon": "information",
    "title": "general.accessibility",
    "target": "https://www.altinn.no/om-altinn/tilgjengelighet/"
}
```

{{% /expandlarge %}}

{{% expandlarge id="text-component" header="Tekst" %}}

### Egenskaper

| Egenskap | Verdi                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| type     | `Text`                                                                                                      |
| title    | Tekstresursen som skal vises. Støtter [formattering](nb//app/development/ux/texts/#formatering-av-tekster). |

### Example

```json
{
    "type": "Text",
    "title": "footer.description"
}
```

{{% /expandlarge %}}
