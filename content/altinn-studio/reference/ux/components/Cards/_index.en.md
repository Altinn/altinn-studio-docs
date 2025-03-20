---
title: Cards
linktitle: Cards
description: A component that allows you to group content into card sections.
schemaname: Cards # Component schema name used to autogenerate list of properies from json schema (replace with appropriate component name)
weight: 10 # Do not change, the componets will be sorted alphabetically
toc: true
---

{{% notice warning %}}
🚧 This documentation is a work in progress.
{{% /notice %}}

---

## Usage

With Cards, we can highlight related information or tasks. The cards come in several variants and can contain text, images, text fields, radio buttons, and more.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Design">}}

![alt text](image.png)

{{</content-version-container>}}
{{<content-version-container version-label="Code">}}

```json
{
        "id": "subtle",
        "type": "Cards",
        "mediaPosition": "bottom",
        "minMediaHeight": "250px",
        "color": "subtle",
        "cards": [
          {
            "title": "Card subtle",
            "description": "bodyText",
            "children": [
              "RadiobuttondId",
              "TextAreaId"
            ]
          }
        ],
        "grid": {
          "md": 6
        }
      },
      {
        "id": "netural",
        "type": "Cards",
        "mediaPosition": "top",
        "minMediaHeight": "250px",
        "color": "neutral",
        "cards": [
          {
            "media": "imageId",
            "title": "Card neutral",
            "description": "bodyText"
          }
        ],
        "grid": {
          "md": 6
        }
      },
```

{{</content-version-container>}}
{{</content-version-selector>}}

## Properties

**Required properties:** `id`, `type`, `color`

| **Property**        | **Type** | **Description**                                                                                                                                 |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `mediaPosition`     | string   | Media position within the cards.<br/> **Enum:** [bottom, top] <br/> **Default:**[top]                                                           |
| `minMediaHeight`    | string   | Ensures the height of media, eg. "250px".                                                                                                       |
| `color`             | string   | Background color of the cards.<br/> **Enum:** [neutral, subtle]                                                                                 |
| `cards`             | array    | Array of card objects.                                                                                                                          |
| `cards.media`       | string   | Id of the media component.                                                                                                                      |
| `cards.title`       | string   | Title                                                                                                                                           |
| `cards.description` | string   | Body text                                                                                                                                       |
| `cards.footer`      | string   | Footer text                                                                                                                                     |
| `cards.children`    | array    | An array with the component ID of all components belonging to the specified card.<br>These will be placed between the body text and the footer. |

## Example multiple cards

When using multiple cards within a single card component, they automatically align within the container.

```json
{
    "id": "cardComponentId",
    "type": "Cards",
    "mediaPosition": "top",
    "minMediaHeight": "250px",
    "color": "subtle/neutral",
    "cards": [
        {
           "media": "componentIdToImage",
           "title": "TitleToImage",
           "description": "bodyText",
           "footer": "footerText",
        },
        {
           "title": "exampleTitle",
           "description": "exampleBody",
           "footer": "exampleFooter",
           "children": [
             "componentId1",
             "componentId2"
           ]
        }
    ]
},
```

## Accepted components for Cards

Currently accepted components in cards include:

- ActionButton
- Address
- Alert
- Audio
- Button
- ButtonGroup
- Checkboxes
- CustomButton
- Date
- Datepicker
- Dropdown
- Group
- Header
- IFrame
- Image
- Input
- InstantiationButton
- Link
- MultipleSelect
- Number
- Option
- Paragraph
- PaymentDetails
- PDFPreviewButton
- PrintButton
- Radiobuttons
- Summary
- Text
- TextArea
- Video
