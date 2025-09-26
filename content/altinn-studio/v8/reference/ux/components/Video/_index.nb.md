---
title: Video
linktitle: Video
description: Videospillerkomponent
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
---

## Bruk

`Video` brukes til å vise en videospiller i applikasjonen din. Den kan brukes frittstående eller som en
mediekomponent i [Cards-komponenten]({{< relref "/altinn-studio/v8/reference/ux/components/cards" >}}).

### Anatomi

![Video-komponent](./video-component.png)

En standard videospiller inkluderer vanligvis:

1. Videovisningsområde
2. Spill/pause-kontroller
3. Fremdriftsindikator
4. Volumkontroll
5. Fullskjermknapp

Videokomponenten er en enkel innpakning rundt [Videoelementet i HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video),
og det visuelle utseendet vil variere avhengig av nettleser, operativsystem og andre faktorer.
Skjermbildet ovenfor ble tatt fra Chrome-nettleseren.

### Relatert

- [Cards]({{< relref "/altinn-studio/v8/reference/ux/components/cards" >}}) - Kan bruke Videokomponenten som medieinnhold
- [Image]({{< relref "/altinn-studio/v8/reference/ux/components/image" >}}) - Bildekomponent
- [Audio]({{< relref "/altinn-studio/v8/reference/ux/components/audio" >}}) - Lydspillerkomponent

## Egenskaper

Følgende er en liste over tilgjengelige egenskaper for {{% title %}}.

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter. Listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

| **Egenskap**                   | **Type** | **Beskrivelse**                                                                                                         |
|--------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------|
| `textResourceBindings.altText` | string   | Alternativ tekst som vises for skjermlesere                                                                             |
| `video.src`                    | object   | Et objekt som inneholder videofilene som skal spilles. Nøkkelen er språkkoden, og verdien er URL-en til videofilen.     |

## Konfigurering

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio med flere muligheter for innstillinger!
 Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her
og noen innstillinger kan være i betaversjon.
{{% /notice %}}

### Legg til komponent

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Du kan legge til en komponent i [Altinn Studio Designer]({{< relref "/altinn-studio/v8/getting-started/" >}}) ved å dra den fra
komponent-listen til sideområdet.
Når du velger komponenten, vises innstillingspanelet for den.

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Grunnleggende komponent:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="6-"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "myVideo",
        "type": "Video",
        "textResourceBindings": {
          "altText": "Alternativ tekst for videoen (for skjermlesere)"
        },
        "video": {
          "src": {
            "en": "https://example.com/video.mp4",
            "nb": "/org/app/assets/video.mp4"
          }
        }
      }
    ]
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

