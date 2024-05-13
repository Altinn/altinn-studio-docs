---
hidden: true
---

<!-- begin intro -->
### Page Break (`pageBreak`)

Indicates whether a page break should be added before or after the component. Can be either: `auto` (default), `always`, or `avoid`.
<!-- end intro -->


<!-- begin asd -->

<!-- Bilde må ligge i /assets/images/component-settings. Erstatt filnavn. -->
{{% image file="component-settings/pagebreak.png" %}}

<!-- end asd -->


<!-- begin code -->

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-7"}
{
  "id": "komponent-id",
  ...
  "pageBreak": {
    "breakBefore": "auto",
    "breakAfter": "auto"
  }
}
```

<!-- end code -->


<!-- begin more -->


<!-- end more -->