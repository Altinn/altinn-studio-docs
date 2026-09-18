---
draft: true
title: Bunntekst
description: Slik konfigurerer du bunnteksten i appen
tags: [needsReview]
---

I bunnteksten kan du legge inn kontaktinformasjon, lenker og annen tekst. I nye apper inneholder bunnteksten som standard en lenke til tilgjengelighetserklæringen til Altinn 3.

Du definerer bunnteksten i `footer.json`-filen under `App/ui`. Denne filen ligner på andre layoutfiler, men er mye enklere. Standardbunnteksten ser slik ut:

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

Du kan legge til nye komponenter i `footer`-listen.

## Komponenter

{{% expandlarge id="email-component" header="E-post" %}}

### E-postegenskaper

| Egenskap | Verdi                                                                                                                        |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| type     | `Email`                                                                                                                      |
| title    | Tekstressursen du vil vise. Du kan ikke [formatere]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/tekster" >}}#formatere-tekster) denne teksten. |
| target   | E-postadressen lenken peker til.                                                                                             |

### E-posteksempel

```json
{
    "type": "Email",
    "title": "hjelp@etaten.no",
    "target": "hjelp@etaten.no"
}
```

{{% /expandlarge %}}

{{% expandlarge id="phone-component" header="Telefon" %}}

### Telefonegenskaper

| Egenskap | Verdi                                                                                                                        |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| type     | `Phone`                                                                                                                      |
| title    | Tekstressursen du vil vise. Du kan ikke [formatere]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/tekster" >}}#formatere-tekster) denne teksten. |
| target   | Telefonnummeret lenken peker til.                                                                                            |

### Telefoneksempel

```json
{
    "type": "Phone",
    "title": "+47 987 65 432",
    "target": "+4798765432"
}
```

{{% /expandlarge %}}

{{% expandlarge id="link-component" header="Lenke" %}}

### Lenkeegenskaper

| Egenskap | Verdi                                                                                                                        |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| type     | `Link`                                                                                                                       |
| title    | Tekstressursen du vil vise. Du kan ikke [formatere]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/tekster" >}}#formatere-tekster) denne teksten. |
| target   | URL-en lenken peker til.                                                                                                     |
| icon     | Ikonet ved siden av lenken. Enten `information`, `email` eller `phone`.                                                      |

### Lenkeeksempel

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

### Tekstegenskaper

| Egenskap | Verdi                                                                                                                |
| -------- | ----------------------------------------------------------------------------------------------------------------------- |
| type     | `Text`                                                                                                              |
| title    | Tekstressursen du vil vise. Du kan [formatere]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/tekster" >}}#formatere-tekster) denne teksten. |

### Teksteksempel

```json
{
    "type": "Text",
    "title": "footer.description"
}
```

{{% /expandlarge %}}
