---
hidden: true
---

<!-- begin intro -->
#### Manuelt (`options`)

<!-- end intro -->


<!-- begin asd -->

Velg "Manuelt" og klikk "Legg til flere" for å til et nytt alternativ. Velg eller opprett ny tekst for å legge til etikett (`label`).

Alternativet kommer med en forhåndsutfylt verdi (`value`), som er dataen som lagres når brukeren gjør et valg.
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