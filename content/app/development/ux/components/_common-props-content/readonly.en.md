# Innhold

<!-- begin intro -->
### Field is read-only (`readOnly`)
Disables the component when checked (`true`).
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

*Example read-only component*
<!-- end more -->