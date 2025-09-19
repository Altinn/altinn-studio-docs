---
hidden: true
---

<!-- begin intro -->
#### Kodeliste (`optionsId`)

En [kodeliste](/nb/altinn-studio/v8/guides/development/options) er en forhåndsdefinert liste med alternativer.

<!-- end intro -->


<!-- begin asd -->

For å legge til alternativer fra en kodeliste, velg 'Kodeliste' og angi en kodeliste ID.
 For å bruke en egendefinert (dynamisk) kodeliste, klikk på "Bytt til egendefinert kodeliste".

{{% image file="component-settings/optionsId.png" %}}

<br>

Om du ønsker å [sikre dynamiske kodelister](/nb/altinn-studio/v8/guides/development/options/sources/dynamic/#sikrede-kodelister) kan du huke av for dette:

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