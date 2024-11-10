---
hidden: true
---

<!-- begin intro -->
### Horizontal alignment with `grid`

{{% notice info %}}
`grid` settings are not yet supported in the form editor but can be configured manually.
{{% /notice %}}

The `grid` property controls horizontal alignment based on a 12-column layout.
 Items are allocated fractions of 12 which sets their width relative to the screen width.
  In the example below, we set the component's width to 2/12 of the screen width for all screen sizes (from `xs` and up).

<!-- end intro -->


<!-- begin asd -->


<!-- end asd -->


<!-- begin code -->

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=["4-6"]}
{
  "id": "komponent-id",
  ...
  "grid": {
      "xs": 2,
    }
}
```

<!-- end code -->


<!-- begin more -->
You can also use `grid` to place items side by side.

See [Components placed side by side (grid)](/app/development/ux/styling/#components-placed-side-by-side-grid) for details and examples.

<!-- end more -->