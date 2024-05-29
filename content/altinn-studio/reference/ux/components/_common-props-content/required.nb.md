---
hidden: true
---

<!-- begin intro -->
### Feltet skal være påkrevd (`required`)

Krever at det gjøres et valg når aktivert (`true`), det vil da vises en stjerne ved overskriften.

<!-- end intro -->


<!-- begin asd -->

{{% image file="component-settings/required.png" %}}

<!-- end asd -->


<!-- begin code -->

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4"}
{
  "id": "komponent-id",
  ...
  "required": false
}
```

<!-- end code -->


<!-- begin more -->

<!-- end more -->