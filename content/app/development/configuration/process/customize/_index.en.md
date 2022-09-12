---
title: Customize Views of Step
linktitle: Customize Views
description: How to customize views in different steps of a process.
tags: []
toc: true
---

An application wil have a process which the user of the application follows.
Depending of the type of step the user is in, different views are presented.
This page explains the different views and how they can be customized.

## Data 
In this process task a form which the user can fill in data.
The form can be edited using the [UI editor](../../../../getting-started/navigation/designer/ui-editor) or by changing `FormLayout.json` manually.

## Confirmation
In this process task some standard texts are presented and the user can choose to *confirm* to go forward.

These texts can be overridden by manually adding each defined text keys in the apps text resources. More information about how this is done can be found [here](../../../ux/texts).
In the following section we will present an overview of the different texts that can be customized.

![Confirm view](confirm-step.png "Texts that can be customized in the confirm view")

### Customize texts

| Text # (see image above)  | Text key            |
| ------------------------- | ------------------- |
| 1                         | confirm.title       |
| 2                         | confirm.sender      |
| 3                         | confirm.body        |
| 4                         | confirm.answers     |
| 5                         | confirm.attachments |
| 6                         | confirm.button_text |

Example of custom texts in the file  `resources.nb.json`:

```json
{
  "id": "confirm.title",
  "value": "Vennligst bekreft at du ønsker å sende inn"
},
{
  "id": "confirm.body",
  "value": "Du må kun trykke send inn om du er helt sikker på at du vil sende inn. <br/><br/>I det du trykker send inn kan du ikke gjøre endringer."
},
{
  "id": "confirm.attachments",
  "value": "Dokumenter med opplysninger"
},
{
  "id": "confirm.button_text",
  "value": "Lagre og fortsett"
}
```

Note that in the example we have used the html-tag `<br/>` to make a line shift.
For links and formatting [use markdown](../../../ux/texts#formatting-of-texts).

This results in the following view:

![Confirm view](confirm-step-custom.png "Overridden texts in the confirm view")

## Feedback
This is a process step where the application owner can validate the filled data to generate a feedback before the data is archived.

In the following section we will present an overview of the different texts that can be customized.

![Feedback view](feedback-default.png "Texts that can be customized in the feedback view")

### Customize texts

| Text # (see image above)  | Text key          |
| ------------------------- | ----------------- |
| 1                         | feedback.title    |
| 2                         | feedback.body     |

Example of custom texts in the file  `resources.nb.json`:

```json
{
  "id": "feedback.title",
  "value": "Vent på at tjenesteeier sjekker data"
},
{
  "id": "feedback.body",
  "value": "Når tjenesteier har sjekket at alle data er godkjent vil du bli automatisk sendt videre til siste steg i prosessen."
}
```
