---
hidden: true
---

<!-- begin intro -->
### Sideskift (`pageBreak`)

Indikerer om en sideskift skal legges til før eller etter komponenten. Kan være enten: `auto` (standard), `always` (alltid) eller `avoid` (unngå).

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