---
hidden: true
---

<!-- begin intro -->
### Feltet skal være skrivebeskyttet (`readOnly`)
Egenskapen `readOnly` deaktiverer komponenten når huket av (`true`).
<!-- end intro -->


<!-- begin asd -->

{{% image file="component-settings/readOnly.png" %}}

<!-- end asd -->


<!-- begin code -->

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4"}
{
  "id": "komponent-id",
  ...
  "readOnly": true
}
```

<!-- end code -->


<!-- begin more -->

{{% image file="component-settings/readOnly-example.png" %}}

*Eksempel skrivebeskyttet komponent*
<!-- end more -->