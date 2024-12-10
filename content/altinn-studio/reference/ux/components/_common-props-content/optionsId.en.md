---
hidden: true
---

<!-- begin intro -->
#### Code List (`optionsId`)

A [code list](/altinn-studio/guides/development/options) is a predefined list of options.

<!-- end intro -->


<!-- begin asd -->

To add options from a code list, select "Kodeliste" and enter a code list ID.
 To use a custom (dynamic) code list, click "Bytt til egendefinert kodeliste" (switch to custom code list).

{{% image file="component-settings/optionsId.png" %}}

<br>

If you wish to [secure dynamic code lists](/altinn-studio/guides/development/options/sources/dynamic/#secured-options), you can check this option:

{{% image file="component-settings/secure.png" %}}
<!-- end asd -->


<!-- begin code -->

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-5"}
{
  "id": "komponent-id",
  ...
  "optionsId": "land",
  "secure": true
}
```

<!-- end code -->


<!-- begin more -->


<!-- end more -->