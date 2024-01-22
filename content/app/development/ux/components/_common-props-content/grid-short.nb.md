---
hidden: true
---

<!-- begin intro -->
### Horisontal justering med `grid`

{{% notice info %}}
Innstillinger for komponenten er ikke støttet i skjemaeditor ennå, men kan konfigureres manuelt.
{{% /notice %}}

`grid`-egenskapen kontrollerer horisontal justering av komponenten basert på en layout med 12 kolonner.
 Elementer tildeles brøkdeler av 12 som bestemmer deres bredde i forhold til skjermbredden.
  I eksemplet nedenfor setter vi komponentens bredde til 2/12 av skjermbredden for alle skjermstørrelser (fra `xs` og opp).

<!-- end intro -->


<!-- begin asd -->


<!-- end asd -->


<!-- begin code -->

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=["4-6"]}
{
  "id": "komponent-id",
  ...
  "grid": {
      "xs": 2,
    }
}
```

<!-- end code -->


<!-- begin more -->
Du kan også bruke `grid` for å sidestille komponenter.

Se [Sidestilte komponenter (grid)](/nb/app/development/ux/styling/#sidestilte-komponenter-grid) for detaljer og eksempler.

<!-- end more -->