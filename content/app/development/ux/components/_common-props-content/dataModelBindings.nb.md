# Innhold

<!-- begin intro -->
### Datamodell

For at det skal være mulig å lagre og manipulere informasjonen må komponenten kobles til et felt i en [datamodell](/nb/app/development/data/data-modeling/#datamodeller).
Verdiene til alternativene lagres som streng.

<!-- end intro -->


<!-- begin asd -->

Velg feltet du ønsker å koble komponenten til fra nedtrekksmenyen.
 Hvis det ikke er noen felter tilgjengelig må du først [laste opp en datamodell](/nb/app/development/data/data-modeling/#laste-opp-og-vise-datamodell).

<!-- Bilde må ligge i /assets/images/component-settings. Erstatt filnavn. -->
{{% image file="component-settings/dataModelBindings.png" %}}

<!-- end asd -->


<!-- begin code -->

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-6"}
{
  "id": "komponent-id",
  ...
  "dataModelBindings": {
    "simpleBinding": "MyDataModel.SomeField"
    }
}
```

<!-- end code -->


<!-- begin more -->


<!-- end more -->