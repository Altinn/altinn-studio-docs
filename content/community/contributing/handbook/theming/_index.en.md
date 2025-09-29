---
title: Theming and styling
description: Solution for theming and styling conventions.
---

Altinn Studio is based on [Material-UI](https://material-ui.com/), a UI components library that focus exclusively on the React library.
At this point the SBL-forms are based on Bootstrap. This might change in the future in order to support more sophisticated forms and
the possibilty to write forms in other languages than React + Bootstrap.

Both the forms that are produced and the editor will have the possibilty to change theme.
By default Altinn Studio will use the Altinn theme. The theme will at this point only change colors and fonts in Altinn Studio.
The colors are base on the [altinn color palette.](https://altinn.github.io/designsystem-styleguide/retningslinjer-altinn/farger.html)

## CSS

Components are devided into two groups. Shared components that is used several times and should be accessible for several apps. And
components that are specific for one app or view. CSS for a component is set in its representative tsx-file with paramethers linking
to the theme.

## How to change theme

Changing the theme without having to do alot of changes to the code is post-MVP.