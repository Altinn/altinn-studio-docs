---
title: Video
description: Display visual information using video.
toc: true
schemaname: Video
weight: 10
---

{{% notice warning %}}
🚧 This documentation is a work in progress.
{{% /notice %}}

---

## Usage

Use videos to emphasize points or illustrate concepts that are difficult to explain using text.

### Best practices

We recommend following the guidelines by [UUtilsynet](https://www.uutilsynet.no/veiledning/video-og-lydopptak/232#lydopptak).

- Add an alternative text which explains the video. The alt. text will be displayed if the video is unavailable and is used by screen readers.
- Don't use video for video's sake. Ask yourself if the video illustrates a point or increases the understanding of what you are trying to tell.
- Check if the video scales well on devices like mobile or tablet. An video which looks good on a PC can quickly fill a smaller screen.
- Avoid using video instead of text, as screen readers cannot read it.

## Properties

**Required properties:** `id`, `type`

| **Property**                   | **Type** | **Description**                                                                                        |
| ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------ |
| <b>video</b>                   | object   |                                                                                                        |
| <b>video.src</b>               | object   | Video source.                                                                                          |
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
{{<content-version-container version-label="Design">}}

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

### Alternativ text

Content guidelines for alternativ text:

- Keep alternative texts consistent
- Include information that is important for understanding the video. This includes speech and dialogue with indications of who is speaking, as well as other important sounds such as sound effects, music, laughter, and similar elements.

### Source path

The default source is `nb`. Any language that does not define a separate video source will use this source.
List another language code and video source to add a source.

The video source may be external or local to the app.

For external videos, the source is the _video URL_ (e.g. `https://examples.com/myVideo.mp4`).

To host an video in the application, place it in the folder `App/wwwroot` (if the folder does not exist, you can create it).

An video placed in `App/wwwroot` can be referenced directly by the filename (e.g. `myVideo.mp4`)


