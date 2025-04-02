---
title: Video
description: Vise visuelt innehold som video.
toc: true
schemaname: Video
weight: 10
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

Bruk videoer for å fremheve poeng eller illustrere begreper som er vanskelige å forklare med tekst.

### Beste praksis

Vi anbefaler å følge retningslinjene fra [UUtilsynet](https://www.uutilsynet.no/veiledning/video-og-lydopptak/232#lydopptak).

- Legg til en alternativ tekst som forklarer videoen. Alt. tekst vil vises hvis videoen ikke er tilgjengelig og brukes av skjermlesere.
- Ikke bruk video for videoen skyld. Spør deg selv om videoen illustrerer et poeng eller øker forståelsen av det du prøver å fortelle.
- Sjekk om videoen skalerer godt på enheter som mobil eller nettbrett. En video som ser bra ut på en PC kan raskt fylle en mindre skjerm. 
- Unngå å bruke video i stedet for tekst, da skjermlesere ikke kan lese det.

## Egenskaper

**Påkrevde egenskaper:** `id`, `type`

| **Egenskaper**                 | **Type** | **Beskrivelse**                                                                                            |
| ------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| <b>video</b>                   | object   |                                                                                                            |
| <b>video.src</b>               | object   | Video kilde.                                                                                               |
| `src.en`                       | object   | Engelsk                                                                                                    |
| `src.nb`                       | object   | Bokmål                                                                                                     |
| `src.nn`                       | object   | Nynorsk                                                                                                    |
| <b>textResourceBindings</b>    | object   | Tekstresursbindningen for komponenten.                                                                     |
| `textResourceBindings.altText` | string   | Alternativ tekst leses høyt for noen som bruker hjelpemiddelsteknologi, men er skjult for en seende bruker |

### Eksempel

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Kode">}}

```json
{
  "id": "komponent-id",
  "type": "Video",
  "textResourceBindings": {
    "altText": ""
  },
  "video": {
    "src": {
      "nb": "videoFileNB.mp4",
      "nn": "videoFileNN.mp4"
    }
  }
}
```

{{</content-version-container>}}
{{<content-version-container version-label="Utseende">}}

<video
      controls
      id={id}
    >
      <source src={videoSrc} />
      <track
        kind='captions'
        src={videoSrc}
        srcLang={languageKey}
        label={altText}
      />
    </video>

{{</content-version-container>}}
{{</content-version-selector>}}

### Alternativ tekst

Retningslinjer for alternativ tekst:

- Hold alternative tekster konsistente
- Inneholde informasjon som er viktig for å forstå videoen. Dette omfatter tale og dialog med markering av hvem som snakker, i tillegg til annen viktig lyd som for eksempel lydeffekter, musikk, latter og lignende.


### Kildesti

Standardkilden er nb. Ethvert språk som ikke definerer en egen videokilde vil bruke denne kilden. Oppgi en annen språkreferanse og videokilde for å legge til en kilde.

Videokilden kan være ekstern eller lokal til appen.

For eksterne videoer er kilden video-URL (f.eks. `https://examples.com/myVideo.mp4`).

For å legge til en video i applikasjonen, plasser den i mappen `App/wwwroot` (hvis mappen ikke eksisterer, kan du opprette den).

En video plassert i `App/wwwroot` kan refereres direkte ved filnavnet (f.eks. `myVideo.mp4`).
