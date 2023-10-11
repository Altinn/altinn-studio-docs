---
hidden: true
---

<!-- begin intro -->
### Automatisk fullføring (`autocomplete`)
Automatisk fullføring (`autocomplete`) lar deg spesifisere om, og i hvilken grad, brukeragenten har tillatelse til å gi automatisert hjelp med utfylling av verdier i skjemafelter, samt gi veiledning til nettleseren om hvilken type informasjon som forventes i feltet.
<!-- end intro -->


<!-- begin asd -->

{{% image file="component-settings/autocomplete.png" %}}

<!-- end asd -->


<!-- begin code -->

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4"}
{
  "id": "komponent-id",
  ...
  "autocomplete": "given-name"
  
}
```

<!-- end code -->


<!-- begin more -->


<!-- end more -->