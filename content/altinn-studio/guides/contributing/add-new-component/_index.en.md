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
5. [Implement any potential custom config needed to support the component](#5-implement-any-potential-custom-config-needed-to-support-the-component)

_*Only relevant if running the schema generation script in step 1._

### 1. Get json schema for the new component
In order to retrieve the json schemas that defines the component config, there are different options:
- Manually write the json schema based on the `config.ts` in the apps repo for the component.
- Run the script in `frontend/scripts/` called `generate-json-schemas` for version 4 of app-frontend. The usage of the script is described in the README. In order for the script to work the component you wish to add must have been released by app-frontend.

### 2. Add an icon for the component

When adding an icon there are different approaches given that;

- Any of the existing ones from [Aksel Icons](https://aksel.nav.no/ikoner) can be used:

  Then you simply import the icon from `@studio/icons` in `formItemConfig.ts`.

- Or, if the component needs a new custom icon:

  Then you can either create an SVG for the component yourself or outsource this task to the designers in Altinn Studio by reaching out to them [in Slack](https://altinn.slack.com/) or [create an issue in Altinn Studio Github repository](https://github.com/Altinn/altinn-studio/issues/new/choose). When an SVG is created for the icon, convert the SVG to JSX, e.g. using [this tool](https://svg2jsx.com/). Create a new file in `libs/studio-icons/src/react/icons/[YOUR_COMPONENT_NAME]Icon.tsx` and use the same format as for the other icons in the folder. The icon file must be added to the index file in the same folder.

### 3. Add the new component in the list of Studio components
For providing fully support for a new component in Studio, there are a few things to do. The order is arbitrary. 
- Adding the new schema
  - If you did run the script from step 1, the schema has been added for you in the correct folder.
  - If you did _**not**_ run the script, the json schema definition file must be placed in this folder: `packages/ux-editor/src/testing/schemas/component`
- Adding the component to the `ComponentType` enum, alphabetically, in this file: `packages/ux-editor/src/types/ComponentType.ts`
- Adding the component to the components list in the file: `packages/ux-editor/src/data/formItemConfig.ts` by 
  - first adding it, alphabetically, to the `formItemConfigs` object, with the appropriate default configs and an icon,
  - then adding it to an appropriate list in the same file; **schemaComponents**, **advancedItems** or **textComponents**
- Adding texts for the new component in `nb.json`:
  - A title on the format **ux_editor.component_title.[COMPONENT_TYPE]** 
  - If the component has any new properties that does not exist from before, these must also be added on the format **ux_editor.component_properties.[PROPERTY_NAME]**
  - If the component has any new _**object**_ properties that does not exist from before, a description must also be added on the format **ux_editor.component_properties_description.[PROPERTY_NAME]**

### 4. Ensure potential other component updates are supported
Check if the script updated any other component schema configs and ensure stable (unchanged?) support.
- Ensure potential new added properties exists from before, or else add necessary texts for them

### 5. Implement any potential custom config needed to support the component
If the component has any properties that requires some special UI that is not delivered directly based on the type of the property (i.e. if it is string or an object etc.), implement support for this as a specific React component. The component can be utilized in the same way as the `grid`-property e.g. in `FormComponentConfig.tsx`.
```javascript
{grid && (
    <div>
      <Heading level={3} size='xxsmall'>
        {t('ux_editor.component_properties.grid')}
      </Heading>
      <EditGrid
        key={component.id}
        component={component}
        handleComponentChange={handleComponentUpdate}
      />
    </div>
 )}
```