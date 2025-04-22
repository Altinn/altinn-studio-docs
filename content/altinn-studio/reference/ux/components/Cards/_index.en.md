---
title: Cards
linktitle: Cards
description: Displays content structured as one or more cards.
weight: 10 # Do not change, the components will be sorted alphabetically
toc: true
---

## Usage

The Cards component can be used to display various types of content (other components) in a card-based layout.
It can be used to display information, images, videos, and/or form components.

### Anatomy

![Cards component](./CardsComponent.png)

In the screenshot above, we see a Cards component with 4 cards.

- The first card has a **title**, **description**, and uses an [**Image component**](../image) to display an image as media.
- The second card has a **title**, **description**, and uses an [**Audio component**](../audio) to display an audio clip as media.
- The third card has a **title**, **description**, and uses a [**Video component**](../video) to display a video as media.
- The fourth card has a **title**, **description**, and uses a [**Checkboxes component**](../checkboxes) to display a confirmation checkbox below the description.

Visually, a card will typically display content in this order:

- **At the top**, a `media` component (e.g., image, video, audio clip) is displayed if specified (in `cards[0].media`). You can also **change** the media position to be displayed at the bottom by setting `mediaPosition` to `bottom` on the component.
- **Below the media**, the title is displayed if specified (in `cards[0].title`).
- **Below the title**, the description is displayed if specified (in `cards[0].description`).
- **Below the description**, the content of the card is displayed if specified (in `cards[0].children`).
- **Below the content**, any text specified in `cards[0].footer` is displayed.
- **At the bottom**, any `media` component is displayed if specified and `mediaPosition` is set to `bottom`.

### Style

This component has several properties to control its appearance. It may be worth experimenting with the different properties 
to achieve the desired look and something that works well with the form components and any media components 
used in the cards.

- `color` can be set on the component to control the background color of the cards. You can choose between `neutral` and `subtle`.
- `minWidth` is used to determine the minimum width of each card. The default value if not specified is `250px`, and this will determine how many cards can be on a row. In addition to `px`, you can also use `rem` and `%` to specify the width.
- `minMediaHeight` is used to determine the minimum height of components specified in `media` (e.g., image, video, audio clip). The default value is `150px`. Here too, you can use `px`, `rem`, and `%` to specify the height.

## Properties

The following is a list of available properties for {{% title %}}.

{{% notice warning %}}
We are currently updating how we implement components. The list of properties may therefore be somewhat inaccurate.
{{% /notice %}}

## Configuration

{{% notice warning %}}
We are currently updating Altinn Studio with more configuration options!
 The documentation is updated continuously, but there may be more settings available than described here and some settings may be in beta.
{{% /notice %}}

### Add component

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

You can add a component in [Altinn Studio Designer](/nb/altinn-studio/getting-started/) by dragging it from the component list to the page area.
When you select the component, the settings panel for it will be displayed.

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
          "id": "myCards",
          "type": "Cards",
          "minWidth": "250px",
          "minMediaHeight": "150px",
          "mediaPosition": "top",
          "color": "subtle",
          "cards": [
            {
              "title": "Audio file",
              "description": "This can also be an ID for a text resource",
              "media": "myAudio"
            },
            {
              "title": "cards.video.title",
              "description": "cards.video.description",
              "media": "myVideo"
            },
            {
              "title": "With components and footer, but without media",
              "description": "Example text",
              "children": ["myCheckboxes"],
              "footer": "Example text",
            }
          ]
        }
      ]
    }
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}
