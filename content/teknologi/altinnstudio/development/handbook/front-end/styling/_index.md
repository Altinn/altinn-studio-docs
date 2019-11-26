---
title: Styling (css)
description: Guidelines for styling components in Altinn Studio
tags: [development, front-end, styling]
weight: 100
---

## Summary

Styling in React is done per component using a combination of Material-UI and compatible JSS.

> Components shall not be styled with CSS classes in .CSS files.

Different component types should use different styling methods, or a combination.

### Proposed order of styling methods

The following order is proposed when considering styling methods:

- [Styled Components](https://material-ui.com/guides/interoperability/#styled-components) (Accepts props, logic, theming)
- [Material-UI's JSS](https://material-ui.com/customization/css-in-js/) (Accepts theming)
- [Inline Styling, the React way](https://reactjs.org/docs/dom-elements.html#style) (Accepts props, logic, theming. Not directly compatible with Material-UI)

### Shared Components

##### Shared components should utilize "[Styled Components](https://material-ui.com/guides/interoperability/#styled-components)" which can write Props directly in the CSS styling.

##### The alternative way is handling styling via props is leveraging "inline styling" combined with Material-UI's JSS. When using inline styling, the component's styling will be configured in two different places.

*Inline style example*

````tsx
<FormControl
  fullWidth={true}
  style={{
    width: this.props.width ? this.props.width : null,
  }}
>
````

*Styled Components example*

```tsx
const theme = createMuiTheme(altinnTheme);

const StyledPopper = styled(({ ...otherProps }) => (
  <Popper {...otherProps} />
))`
    color: ${theme.altinnPalette.primary.black};
    background: ${theme.altinnPalette.primary.redLight};
    border-radius: 0;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
    font-size: 16px;
    padding: 24px;
    max-width: 550px;
    margin-top: 10px;
    z-index: ${(props) => props.zIndex || 1}
`;

class AltinnPopper extends React.Component<IAltinnPopperComponentProvidedProps, IAltinnPopperComponentState> {
  public render() {
    const open = Boolean(this.props.anchorEl);
    return (
      <StyledPopper
        open={open}
        anchorEl={this.props.anchorEl}
        placement={'bottom-start'}
      >
        {this.props.message}
      </StyledPopper>
    );
  }
}

export default AltinnPopper;
```

#### Exception

There will be examples where "Styled Components" are hard to configure using some of Material-UI's components where "Props" with styling needs to be passed down to sub-components. Then the regular CreateStyles method from Material-UI needs to be leveraged and can be used in a combination with Styled Components.

*Styled object example*

```tsx
const styles = {
  searchBoxInput: {
    fontSize: '16px',
    color: '#000000',
    padding: '6px',
  },
  searchBoxIcon: {
    color: '#000000',
    fontSize: '30px',
    marginRight: '10px',
  },
};
```

*React component, with Styled Component AND 'classes.searchBoxInput' from Styled Object example above.*

```tsx
class AltinnSearchInput extends React.Component<IAltinnSearchInputComponentProvidedProps, IAltinnSearchInputComponentState> {
  public render() {
    const { classes } = this.props;
    return (
      <StyledFormControl
        id='StyledForm'
        fullWidth={true}
      >
        <TextField
          id={this.props.id}
          placeholder={this.props.placeholder}
          onChange={this.props.onChangeFunction}
          InputProps={{
            disableUnderline: true,
            startAdornment:
              <InputAdornment
                position={'end'}
                classes={{ root: classNames(classes.searchBoxIcon) }}
              >
                <i className={'ai ai-search'} />
              </InputAdornment>,
              classes: { root: classNames(classes.searchBoxInput) },
          }}
        />
      </StyledFormControl>
    );
  }
}

export default withStyles(styles)(AltinnSearchInput);
```

### Contained Components

Contained components are React components which are not shared in other parts of the React application. It's encouraged to consider the styling order above.
