---
title: Add a new component in Studio
description: Add a new component from Apps to make it configurable in Studio
weight: 20
---

## Add a new component in Studio

If new components are introduced to the Apps, either by the Apps team or by external contributors, the component can be added as a configurable component in Studio. This means that the properties for the component when used in a form, can be edited directly in Studio, just as any other component. 

### Step-by-step guide

1. [Get json schema for the new component](#1-get-json-schema-for-the-new-component)
2. [Add an icon for the component](#2-add-an-icon-for-the-component)
3. [Add the new component in the list of Studio components](#3-add-the-new-component-in-the-list-of-studio-components)
4. [Ensure potential other component updates are supported*](#4-ensure-potential-other-component-updates-are-supported)

_*Only relevant if running the schema generation script in step 1._

### 1. Get json schema for the new component
In order to retrieve the json schemas that defines the component config there are different options:
- Manually write the json schema based on the `config.ts` in the apps repo for the component.
- Run the script in `frontend/scripts/`. The usage of the script is described in the README. In order for the script to work the component you wish to add must have been released by app-frontend.

### 2. Add an icon for the component
Either create an SVG for the component yourself or outsource this task to the designers in Altinn Studio by reaching out to them in GitHub[Link] or in Slack[Link]. When an SVG is created for the icon convert the SVG to JSX, e.g. using this [tool](https://svg2jsx.com/). Create a new file in `libs/studio-icons/src/react/icons/[YOUR_COMPONENT_NAME]Icon.tsx` and use the same format as for the other icons in the folder. The icon file must be added to the index file in the same folder.

### 3. Add the new component in the list of Studio components
For providing fully support for a new component in Studio, there are a few things to do. The order is arbitrary. 
- Adding the new schema
  - If you did run the script from step 1, the schema has been added for you in the correct folder.
  - If you did _**not**_ run the script, the json schema definition file must be placed in this folder: `packages/ux-editor/src/testing/schemas/component`
- Adding the component to the `ComponentType` enum, alphabetically, in this file: `packages/ux-editor/src/types/ComponentType.ts`
- Adding the component to the components list in the file: `packages/ux-editor/src/data/formItemConfig.ts` by 
  - first adding it, alphabetically, to the `formItemConfigs` object, with the appropriate default configs and an icon,
  - then adding it to an appropriate list in the same file; **schemaComponents**, **advancedItems** or **textComponents**
  // WHAT ABOUT **confOnScreenComponents** AND **paymentLayoutComponents** - SHOULD THEY BE MENTIONED HERE
- Adding texts for the new component in `nb.json`:
  - A title on the format **ux_editor.component_title.[COMPONENT_TYPE]** 
  - If the component has any new properties that does not exist from before, these must also be added on the format **ux_editor.component_properties.[PROPERTY_NAME]**
  - If the component has any new _**object**_ properties that does not exist from before, a description must also be added on the format **ux_editor.component_properties_description.[PROPERTY_NAME]**

### 4. Ensure potential other component updates are supported
Check if the script updated any other component schema configs and ensure stable (unchanged?) support.
- Ensure potential new added properties exists from before, or else add necessary texts for them
- Ensure ...?
