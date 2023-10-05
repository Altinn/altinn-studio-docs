# Instruksjoner

1. **Filnavn**: Kopier malen og gi den navn på formatet `{propName}.{languageCode}.md`. Opprett en fil for hvert språk. Alle filer skal ligge direkte under `template-content`.
2. **Legg til innhold**: Legg til innhold mellom `begin`- og `end`-kommentarer. For å utelate seksjoner, la de være tomme. **NB! `begin`- og `end`-kommentarer må ikke endres eller slettes!**
3. **Bilder**: Bilder må ligge i mappen `/assets/images/component-settings/`. For å legge til bilder, bruk shortcode `image.html` med argument
    `file="component-settings/{image.png}"`.
4. **Legg til dokumentasjonen**: Bruk shortcode `property-docs` med hakeparenteser (`< >`) og argument `prop="{propName}"`. `propName` må samsvare med filnavn.

For mer veiledning, se [_INSTRUCTIONS.md](_INSTRUCTIONS.md).

# Innhold

<!-- begin intro -->
### Kilde (`source`)

En måte å legge til alternativer er å koble komponenten til en kodeliste basert på skjemadata lagret i selve appen.
 Dette gjør du ved å legge til en kilde (`source`); se [dokumentasjon](/nb/app/development/data/options/repeating-group-codelists/) for hvordan dette konfigureres.
<!-- end intro -->


<!-- begin asd -->
Innstillinger i Altinn Studio.

{{% image file="component-settings/source.png" %}}
<!-- end asd -->


<!-- begin code -->
{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-9"}
{
  "id": "komponent-id",
  ...
  "source": {
    "group": "some.group",
    "label": "dropdown.label",
    "value": "some.group[{0}].someField",
    "description": "",
    "helpText": ""
  }
}
...
```
<!-- end code -->


<!-- begin more -->

<!-- end more -->