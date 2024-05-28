---
title: Bunntekst
description: Hvordan konfigurere bunnteksten.
weight: 30
---

{{%notice warning%}}

Bunntekst er kun tilgjengelig i versjon 7.7 og nyere.

{{% /notice%}}

I bunnteksten kan du legge inn ting som kontaktinformasjon, lenker, og annen tekst. I nye applikasjoner inneholder bunnteksten en lenke til Altinn 3 sin tilgjengelighetserklæring.

Bunnteksten defineres i `footer.json` filen under `App/ui`. Denne filen ligner på andre layout filer, men er mye enklere. Standardbunnteksten er definert slik:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/footer.schema.v1.json",
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
| title    | Tekstresursen som skal vises. Støtter **ikke** [formattering](/nb/altinn-studio/reference/ux/texts/#formatering-av-tekster). |
| target   | E-postadressen som lenkes til.                                                                                       |

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
| title    | Tekstresursen som skal vises. Støtter **ikke** [formattering](/nb/altinn-studio/reference/ux/texts/#formatering-av-tekster). |
| target   | Telefonnummeret som lenkes til.                                                                                      |

### Eksempel

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
| title    | Tekstresursen som skal vises. Støtter **ikke** [formattering](/nb/altinn-studio/reference/ux/texts/#formatering-av-tekster). |
| target   | URLen som lenkes til.                                                                                                |
| icon     | Ikon som vises ved siden av lenken. Enten `information`, `email`, eller `phone`.                                     |

### Eksempel

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
| title    | Tekstresursen som skal vises. Støtter [formattering](/nb/altinn-studio/reference/ux/texts/#formatering-av-tekster). |

### Eksempel

```json
{
    "type": "Text",
    "title": "footer.description"
}
```

{{% /expandlarge %}}
