---
hidden: true
---

<!-- begin intro -->
### Text (`textResourceBindings`)

<!-- end intro -->


<!-- begin asd -->

You can create a new text by clicking on the plus sign or select an existing one by clicking on the magnifying glass.
 See [Adding and Editing Texts in an App](/app/development/ux/texts/#add-and-change-texts-in-an-application) for more information.

{{% image file="component-settings/textResourceBindings-all.png" %}}

<!-- end asd -->


<!-- begin code -->

Text can be added directly as a text string or by providing the key to a [text resource].(/app/development/ux/texts/#add-and-change-texts-in-an-application).

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
1. **Ledetekst** (`textResourceBindings.title`): A heading with a question or instruction.
2. **Beskrivelse** (`textResourceBindings.description`): Description. Text for further description or elaboration.
3. **Hjelpetekst** (`textResourceBindings.help`): Help text. When help text is filled out, a question mark will appear next to the heading. Click on the question mark to display the text as a popup. Can be used for explanations, examples, use cases, etc.

- **Kortnavn** (`textResourceBindings.shortName`): Short name. Overrides the title of the component used in the default `required` validation message.
- **Tittel i tabell** (`textResourceBindings.tableTitle`): Table title. Overrides the title of the component used in column headers when the component is within repeating groups.
{{% /anatomy-list %}}

<!-- end more -->