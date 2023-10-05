# Instruksjoner

1. **Filnavn**: Kopier malen og gi den navn på formatet `{propName}.{languageCode}.md`. Opprett en fil for hvert språk. Alle filer skal ligge direkte under `_common-props-content`.
2. **Legg til innhold**: Legg til innhold mellom `begin`- og `end`-kommentarer. For å utelate seksjoner, la de være tomme. **NB! `begin`- og `end`-kommentarer må ikke endres eller slettes!**
3. **Bilder**: Bilder må ligge i mappen `/assets/images/component-settings/`. For å legge til bilder, bruk shortcode `image.html` med argument
    `file="component-settings/{image.png}"`.
4. **Legg til dokumentasjonen**: Bruk shortcode `property-docs` med hakeparenteser (`< >`) og argument `prop="{propName}"`. `propName` må samsvare med filnavn.

For mer veiledning, se [_INSTRUCTIONS.md](/app/development/ux/components/_common-props-content/_instructions).

# Innhold

<!-- begin intro -->
#### Kodeliste (`optionsId`)

En [kodeliste](/nb/app/development/data/options) er en forhåndsdefinert liste med alternativer.

<!-- end intro -->


<!-- begin asd -->

For å legge til alternativer fra en kodeliste, velg 'Kodeliste' og angi en kodeliste ID.
 For å bruke en egendefinert (dynamisk) kodeliste, klikk på "Bytt til egendefinert kodeliste".

{{% image file="component-settings/optionsId.png" %}}

<br>

Om du ønsker å [sikre dynamiske kodelister](/nb/app/development/data/options/dynamic-codelists/#sikrede-dynamiske-kodelister) kan du huke av for dette:

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