# Instruksjoner

1. **Filnavn**: Kopier malen og gi den navn på formatet `{propName}.{languageCode}.md`. Opprett en fil for hvert språk. Alle filer skal ligge direkte under `_common-props-content`.
2. **Legg til innhold**: Legg til innhold mellom `begin`- og `end`-kommentarer. For å utelate seksjoner, la de være tomme. **NB! `begin`- og `end`-kommentarer må ikke endres eller slettes!**
3. **Bilder**: Bilder må ligge i mappen `/assets/images/component-settings/`. For å legge til bilder, bruk shortcode `image.html` med argument
    `file="component-settings/{image.png}"`.
4. **Legg til dokumentasjonen**: Bruk shortcode `property-docs` med hakeparenteser (`< >`) og argument `prop="{propName}"`. `propName` må samsvare med filnavn.

For mer veiledning, se [_INSTRUCTIONS.md](/app/development/ux/components/_common-props-content/_instructions).

# Innhold

<!-- begin intro -->
#### Manuelt (`options`)

<!-- end intro -->


<!-- begin asd -->

Velg "Manuelt" og klikk "Legg til flere" for å til en ny avkrysningsboks. Velg eller opprett ny tekst for å legge til etikett (`label`).

Avkrysningsboksen kommer med en forhåndsutfylt verdi (`value`), som er dataen som lagres når brukeren gjør et valg.
 Endre verdien til det som passer.

{{% image file="component-settings/options-checkboxes.png" %}}

<!-- end asd -->


<!-- begin code -->

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-9"}
{
  "id": "komponent-id",
  ...
  "options": [
          {
            "label": "Alternativ 1",
            "value": "1"
          }
        ]
}
```

<!-- end code -->


<!-- begin more -->


<!-- end more -->