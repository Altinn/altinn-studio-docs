# Instruksjoner

1. **Filnavn**: Kopier malen og gi den navn på formatet `{propName}.{languageCode}.md`. Opprett en fil for hvert språk. Alle filer skal ligge direkte under `_common-props-content`.
2. **Legg til innhold**: Legg til innhold mellom `begin`- og `end`-kommentarer. For å utelate seksjoner, la de være tomme. **NB! `begin`- og `end`-kommentarer må ikke endres eller slettes!**
3. **Bilder**: Bilder må ligge i mappen `/assets/images/component-settings/`. For å legge til bilder, bruk shortcode `image.html` med argument
    `file="component-settings/{image.png}"`.
4. **Legg til dokumentasjonen**: Bruk shortcode `property-docs` med hakeparenteser (`< >`) og argument `prop="{propName}"`. `propName` må samsvare med filnavn.

For mer veiledning, se [_INSTRUCTIONS.md](/app/development/ux/components/_common-props-content/_instructions).

# Innhold

<!-- begin intro -->
#### Code List (`optionsId`)

A [code list](/app/development/data/options) is a predefined list of options.

<!-- end intro -->


<!-- begin asd -->

To add options from a code list, select "Kodeliste" and enter a code list ID.
 To use a custom (dynamic) code list, click "Bytt til egendefinert kodeliste" (switch to custom code list).

{{% image file="component-settings/optionsId.png" %}}

<br>

If you wish to [secure dynamic code lists](/app/development/data/options/dynamic-codelists/#secured-dynamic-options), you can check this option:

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