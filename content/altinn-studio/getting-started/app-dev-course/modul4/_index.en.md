---
title: Create Info Page
description: Create an info page that is shown to the user when they start the service
tags: [apps, training, form, pages]
weight: 40
toc: true
---

In this module, we will add a new page to the form that will display information about the service to users when they start the service.

### Topics covered in this module
- Multiple pages in the form
- Texts
- Image component
- Adjusting component width in the form

### Requirements from Sogndal Municipality
Since Sogndal Municipality will collect personal data in this service, they need to clarify who the form is intended for and how they will use the data. Someone in the municipality has created [a draft information page for this purpose](../resources/infopage_new_residents.pdf).

The information page should reflect the following elements:
- Placement of images
- Text sizes
- Text formatting

You can use the following image of Sogndal's coat of arms in the service:

!["Sogndal coat of arms"](../resources/kommune-logo.png )

## Add a New Page
1. Add a new page to the form by clicking the "Add New Page" button.
2. Note that a "Navigation Buttons" component is automatically added to both pages. It is used to navigate back and forth between the pages.
3. Rename the new page by clicking on the page's ID in the configuration column, and enter the name `infopage`.
    - Navigation buttons have automatically appeared on the new page. Open the first page, and you will see that navigation buttons have also appeared there. Open `infopage` again to continue.
4. Click on the menu icon (three dots) next to the page name `infopage` and select "Move Up".
    - Notice that the new page now moves to the top of the form overview.
5. Add an Image component from the component overview on the left by dragging it into `infopage`. This is located under the "Standard" list of components.
6. Note that you can move the image component up and down the page by dragging and dropping it to the desired position. Ensure that the image component is at the top of the page.
7. Open the "Content" section in the configuration column.
8. At the top of the "Content" section, there is a setting called "Grid". The "Use Default Setting" option is on - turn this option off.
9. Set the width to 3. Make sure the selected screen size is "Mobile".
10. Under "Image Settings" (at the bottom of the "Content" section), in the "Source" field, paste [the link to the image](../resources/kommune-logo.png).
11. Add a title component to the form. It can be found under the "Text" section in the left panel. Place it directly below the image component.
12. Open the "Text" section in the configuration column (in the middle).
13. Click on "Label" and enter the text:
    ```text
    Form for information collection for future residents
    ```
14. Open the "Content" section in the configuration column.
15. At the top of the "Content" section, there is a setting called "Grid". The "Use Default Setting" option is on - turn this option off.
16. Set the width to 9. Make sure the selected screen size is "Mobile".
17. Add a new component to the form: a Paragraph component from the component overview (under the "Text" section in the left panel).
18. Open the "Text" section in the configuration column (in the middle).
19. Click on "Label" and enter the text:
    ```text
    The information you provide in this form will be used to tailor a package of municipal services for you and anyone you may be moving to the municipality with.
    ```
20. Add a new component to the form: a Paragraph component. Add prompt text (copy and paste):
    ```text
    Do not use this form if:
    - You are already residing in Sogndal Municipality
    - You live in another municipality and have no plans to move
    - You plan to move to Sogndal, but **not** within the next 12 months.
    ```
    Note the use of `-` to format the text as a bullet list, and `**` to emphasize text.

### Useful Documentation
- [Formatting Texts](/altinn-studio/reference/ux/texts/#formatting-of-texts)
- [Side-by-side Components](/altinn-studio/reference/ux/styling/#components-placed-side-by-side-grid)

## Summary
In this module, we added a new page to the form. We included information components in the form, such as images and texts. We set the width of the image and text, and added simple text formatting.

{{<navigation-buttons
urlBack="../modul3"
textBack="<< Previous Module"
urlNext="../modul5"
textNext="Next Module >>"
>}}