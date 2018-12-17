---
title: Theming and styling
linktitle: Theming and styling
description: Solution for theming and styling conventions ++
tags: ["tjenester 3.0"]
weight: 107
---

### Theming and styling 

Altinn studio is based on [Material-UI](https://material-ui.com/), a UI components library that focus exclusively on the React library.
At this point the SBL-schemas are based on Bootstrap. This might change in the future in order to support more sophisticated schemas and
the possibilty to write schemas in other languages than React + Bootstrap.</br>
Both the schemas that are produced and the editor will have the possibilty to change theme.
By default altinn studio uses the altinn theme. The theme will at this point only change colors and fonts in Altinn studio.
The colors are base on the [altinn color palette.](https://altinn.github.io/designsystem-styleguide/retningslinjer-altinn/farger.html)

**CSS**

Components are devided into two groups. Shared components that is used several times and should be accessible for several apps. And
components that are specific for one app or view. CSS for a component is set in its representative tsx-file with paramethers linking
to the theme.

**How to change theme**

Changing the theme without having to do alot of changes to the code is post-MVP.