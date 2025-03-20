---
title: Audio
description: Display sound files using audio.
toc: true
schemaname: Audio
weight: 10
---

{{% notice warning %}}
🚧 This documentation is a work in progress.
{{% /notice %}}

---

## Usage

Use audios to emphasize points that are difficult to explain using text.

### Best practices

We recommend following the guidelines by [UUtilsynet](https://www.uutilsynet.no/veiledning/video-og-lydopptak/232#lydopptak).

- Add an alternative text which explains the Audio. The alt. text will be displayed if the Audio is unavailable and is used by screen readers.
- Avoid using Audio instead of text, as screen readers cannot read it.

## Properties

**Required properties:** `id`, `type`

| **Property**                   | **Type** | **Description**                                                                                        |
| ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------ |
| <b>audio</b>                   | object   |                                                                                                        |
| <b>audio.src</b>               | object   | Audio source.                                                                                          |
| `src.en`                       | object   | English                                                                                                |
| `src.nb`                       | object   | Bokmål                                                                                                 |
| `src.nn`                       | object   | Nynorsk                                                                                                |
| <b>textResourceBindings</b>    | object   | Text resource bindings for a component.                                                                |
| `textResourceBindings.altText` | string   | Alternate text is read aloud to someone using assistive technology, but is hidden from a sighted user. |

### Example

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Code">}}
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

### Alternativ text

Content guidelines for alternativ text:

- Keep alternative texts consistent
- Include information that is important for understanding the audio. This includes speech and dialogue with indications of who is speaking, as well as other important sounds such as sound effects, music, laughter, and similar elements.

### Source path

The default source is `nb`. Any language that does not define a separate audio source will use this source.
List another language code and audio source to add a source.

The audio source may be external or local to the app.

For external Audios, the source is the _Audio URL_ (e.g. `https://examples.com/myAudio.mp3`).

To host an audio in the application, place it in the folder `App/wwwroot` (if the folder does not exist, you can create it).

An audio placed in `App/wwwroot` can be referenced directly by the filename (e.g. `myAudio.mp3`)


