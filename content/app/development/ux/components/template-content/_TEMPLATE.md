# Instruksjoner

1. **Filnavn**: Kopier malen og gi den navn på formatet `{propName}.{languageCode}.md`. Opprett en fil for hvert språk. Alle filer skal ligge direkte under `template-content`.
2. **Legg til innhold**: Legg til innhold mellom `begin`- og `end`-kommentarer. For å utelate seksjoner, la de være tomme. **NB! `begin`- og `end`-kommentarer må ikke endres eller slettes!**
3. **Bilder**: Bilder må ligge i mappen `/assets/images/component-settings/`. For å legge til bilder, bruk shortcode `image.html` med argument
    `file="component-settings/{image.png}"`.
4. **Legg til dokumentasjonen**: Bruk shortcode `property-docs` med hakeparenteser (`< >`) og argument `prop="{propName}"`. `propName` må samsvare med filnavn.

For mer veiledning, se [_INSTRUCTIONS.md](_INSTRUCTIONS.md).

# Innhold

<!-- begin intro -->
### Egenskap (`egenskap`)

<!-- end intro -->


<!-- begin asd -->

Innstillinger i Altinn Studio.

<!-- Bilde må ligge i /assets/images/component-settings. Erstatt filnavn. -->
{{% image file="component-settings/image.png" %}}

<!-- end asd -->


<!-- begin code -->

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=""}
{
  "id": "komponent-id",
  // property code
  
}
```

<!-- end code -->


<!-- begin more -->


<!-- end more -->