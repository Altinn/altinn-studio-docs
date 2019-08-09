---
title: Component Library
description: Component documentation for altinn.studio
tags: [development]
weight: 100
---

{{% notice warning %}}
WARNING: Component library will be documented when the [task](https://github.com/Altinn/altinn-studio/issues/168) is done.
{{% /notice %}}

## Summary

All shared components are to be documented in Markdown with inline JSX.

* All shared components shall have a corresponding component.md file in the same directory.
* The shared component must hava a default export function AND also exporting the rendered function.
* [React Styleguidist](https://react-styleguidist.js.org) is used to build the documentation site.
* The Component Library is currently a local dev server

### Running dev server

> "npm run styleguide" from src\react-apps\applications\shared

### Inline comments on props

* Reacy Styleguidist supports inline comments. Props _should_ have inline comments.

```javascript
export interface IAltinnButtonComponentProvidedProps extends WithStyles<typeof styles> {
  /** Button ID */
  id?: any;
  /** @ignore */
  classes: any;
  /** Text shown on button */
  btnText: string;
  /** onClick function */
  onClickFunction?: any;
  /** Class objects created with Material-Ui's createStyle */
  className?: any;
  /** Secondary styling */
  secondaryButton?: boolean;
  /** Disabled styling */
  disabled?: boolean;
}
```

### Example markdown

~~~markdown
### Default button

```jsx
<AltinnButton
  btnText='Altinn button with some text'
/>
```

### Disabled button

```jsx
<AltinnButton
  btnText='Disabled button'
  disabled={true}
/>
```

### Secondary button

```jsx
<AltinnButton
  btnText='Secondary button'
  secondaryButton={true}
/>
```

### Click function

Altinn button supports onClickFunction via the onClickFunction prop.

```jsx
const myFunc = () => {
  console.log('My Function');
}
<AltinnButton
  btnText='Button with onClickFunction'
  onClickFunction={myFunc}
/>
```

### Styling

Altinn button also supports Material-UI class objects (classes.someObject) passed via the optional className prop.

```jsx static
<AltinnButton
  btnText='Secondary button'
  className={classes.someClassObject}
/>
```

~~~
