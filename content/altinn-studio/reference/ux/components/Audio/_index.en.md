---
title: Audio
linktitle: Audio
description: Audio player component
weight: 10 # Do not change, the components will be sorted alphabetically
toc: true
hidden: true # Remove when creating new component page from template
---


{{% notice warning %}}
🚧 This documentation is a work in progress.
{{% /notice %}}

---

## Usage

The Audio component is used to display an audio player in your application. It can be used standalone or as a media
component within other components like [Cards](../cards).

When used within a Cards component, the Audio component can be referenced in the `media` property of a card to display
an audio player at the top or bottom of the card.

### Anatomy

A standard audio player typically includes:

1. Play/pause button
2. Progress bar
3. Current time and duration display
4. Volume control
5. Download button (optional)

### Related

- [Cards](../cards) - Can use Audio components as media content
- [Image](../image) - Another media component that can be used in Cards
- [Video](../video) - Video player component that can also be used in Cards

## Properties

The following is a list of the properties available for {{% title %}}.

{{% notice warning %}}
We are currently updating how we implement components, and the list of properties may not be entirely accurate.
{{% /notice %}}

[//]: # (TODO: Add these)

## Configuration

{{% notice warning %}}
We are currently updating Altinn Studio Designer with more configuration options!
The documentation is continuously updated, and there may be more settings available than what is described here, and
some settings may be in beta version.
{{% /notice %}}

### Add component

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

You can add a component in [Altinn Studio Designer](/altinn-studio/getting-started/) by dragging it from the list of
components to the page area.
Selecting the component brings up its configuration panel.

{{</content-version-container>}}
{{<content-version-container version-label="Code">}}

Basic component:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="6-"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  {
    "data": {
      "layout": [
        {
          "id": "myAudio",
          "type": "Audio",
          "source": "https://example.com/audio.mp3",
          "title": "Audio title",
          "description": "Audio description"
        }
      ]
    }
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}


## Examples

### Using Audio in a Cards component

The Audio component is commonly used as a media component within Cards. Here's an example of how to reference an Audio
component in a Cards component:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json
{
  "id": "myCards",
  "type": "Cards",
  "minWidth": "250px",
  "minMediaHeight": "150px",
  "mediaPosition": "top",
  "cards": [
    {
      "title": "Audio Example",
      "description": "This card displays an audio player",
      "media": "myAudio"
    }
  ]
}
```

In this example, the `media` property of the card references the ID of an Audio component (`myAudio`) defined elsewhere
in the layout.
