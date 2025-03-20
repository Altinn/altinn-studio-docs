---
title: Audio
description: Vise lydfiler ved hjelp av lyd.
toc: true
schemaname: Audio
weight: 10
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

 Bruk audio for å fremheve et poeng som er vanskelig at forklare med tekst. 

### Beste praksis

Vi anbefaler å følge retningslinjene fra [UUtilsynet](https://www.uutilsynet.no/veiledning/video-og-lydopptak/232#lydopptak).

- Legg til en alternativ tekst som forklarer lyden. Den alternative teksten vises hvis lyden er utilgjengelig og brukes av skjermlesere.
- Unngå å bruke lyd i stedet for tekst, da skjermlesere ikke kan lese den.

## Egenskaper

**Påkrevde egenskaper:** `id`, `type`

| **Egenskap**                   | **Type** | **Beskrivelse**                                                                                           |
| ------------------------------ | -------- | --------------------------------------------------------------------------------------------------------- |
| <b>audio</b>                   | objekt   |                                                                                                           |
| <b>audio.src</b>               | objekt   | Lydkilde.                                                                                                 |
| `src.en`                       | objekt   | Engelsk                                                                                                   |
| `src.nb`                       | objekt   | Bokmål                                                                                                    |
| `src.nn`                       | objekt   | Nynorsk                                                                                                   |
| <b>textResourceBindings</b>    | objekt   | Tekstressursbindinger for en komponent.                                                                   |
| `textResourceBindings.altText` | streng   | Alternativ tekst leses opp for noen som bruker hjelpemiddelteknologi, men er skjult for en seende bruker. |

### Eksempel

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Kode">}}

```json
{
  "id": "komponent-id",
  "type": "Audio",
  "textResourceBindings": {
    "altText": ""
  },
  "Audio": {
    "src": {
      "nb": "AudioFileNB.mp4",
      "nn": "AudioFileNN.mp4"
    }
  }
}
```

{{</content-version-container>}}
{{<content-version-container version-label="Design">}}

<audio
      controls
      id={id}
    >
      <source src={audioSrc} />
      <track
        kind='captions'
        src={audioSrc}
        srcLang={languageKey}
        label={altText}
      />
</audio>

{{</content-version-container>}}
{{</content-version-selector>}}

### Alternativ tekst

Retningslinjer for alternativ tekst:

- Hold alternative tekster konsistente
- Inkluder informasjon som er viktig for å forstå lyden. Dette inkluderer tale og dialog med indikasjoner på hvem som snakker, samt andre viktige lyder som lydeffekter, musikk, latter og lignende elementer.

### Kildesti

Standardkilden er `nb`. Ethvert språk som ikke definerer en egen lydkilde vil bruke denne kilden.
List opp en annen språkreferanse og lydkilde for å legge til en kilde.

Lydkilden kan være ekstern eller lokal til appen.

For eksterne lyder er kilden _lyd-URL_ (f.eks. `https://examples.com/myAudio.mp3`).

For å legge til en lydfil i applikasjonen, plasser den i mappen `App/wwwroot` (hvis mappen ikke eksisterer, kan du opprette den).

En lyd plassert i `App/wwwroot` kan refereres direkte ved filnavnet (f.eks. `myAudio.mp3`).
