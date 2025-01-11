---
hidden: true
---

<!-- begin intro -->
### Tekst (`textResourceBindings`)

<!-- end intro -->


<!-- begin asd -->

Du kan opprette en ny tekst ved å klikke på pluss-tegnet eller velge en eksisterende ved å klikke på forstørrelsesglasset.
 Se [Legge til og endre tekster i en app](../../../texts/#legge-til-og-endre-tekster-i-en-app) for mer info.

{{% image file="component-settings/textResourceBindings-all.png" %}}

<!-- end asd -->


<!-- begin code -->

Tekst kan legges til direkte som en tekststreng eller ved å oppgi nøkkelen til en [tekstressurs](../../../texts/#legge-til-og-endre-tekster-i-en-app).

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-10"}
{
  "id": "komponent-id",
  "type": "Checkboxes",
  "textResourceBindings": {
          "title": "",
          "description": "",
          "help": "",
          "shortName": "",
          "tableTitle": ""
        }
}
```

<!-- end code -->


<!-- begin more -->

{{% image file="component-settings/text-anatomy.png" %}}


{{% anatomy-list %}}
1. **Ledetekst** (`textResourceBindings.title`): Overskrift med spørsmål eller instruksjon.
2. **Beskrivelse** (`textResourceBindings.description`): Tekst for ytterligere beskrivelse eller utdyping.
3. **Hjelpetekst** (`textResourceBindings.help`): Når hjelpetekst er fylt ut vil et spørsmålstegn vises ved siden av ledeteksten. Klikk på spørsmålstegnet for å vise teksten som en popup.
Kan brukes til forklaring, eksempler, brukssituasjoner osv.

- **Kortnavn** (`textResourceBindings.shortName`): Overstyrer tittelen til komponenten som brukes i den standard `required` valideringsmeldingen.
- **Tittel i tabell** (`textResourceBindings.tableTitle`): Overstyrer tittelen til komponenten som blir brukt i kolonneheader når komponenten befinner seg i repeterende grupper.
{{% /anatomy-list %}}

<!-- end more -->