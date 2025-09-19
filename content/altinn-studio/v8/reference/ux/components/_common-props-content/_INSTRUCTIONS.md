---
hidden: true
---

# Instruksjoner

Innholdet i malen brukes av en partial (`get-content.html`) via shortcoden `property-docs.html`.
* `get-content.html` finner seksjoner som starter med `<!-- begin * -->` og slutter med `<!-- end * -->`
 og henter ut innholdet mellom disse (`*` = seksjonsnavn).
* `property-docs.html` får innholdet fra `get-content.html` og viser det i riktig format. 
  * Shortcoden kalles med argumentet `prop="{propName}"`. `propName` må samsvare med filnavn (se under).

## Hvordan bruke malen
1. **Filnavn**: Kopier malen (denne eller [_TEMPLATE.md](/altinn-studio/reference/ux/components/_common-props-content/_template)) og gi den navn på formatet `{propName}.{languageCode}.md`. Opprett en fil for hvert språk. Alle filer skal ligge direkte under `_common-props-content`.
2. **Legg til innhold**: Legg til innhold mellom `begin`- og `end`-kommentarer. Se beskrivelse over hver seksjon. **NB! `begin`- og `end`-kommentarer må ikke endres eller slettes!**
3. **Bilder**: Bilder skal ligge i mappen `/assets/images/component-settings/`. For å legge til bilder, bruk shortcode `image.html` med argument
    `file="component-settings/{screenshot.png}"`.
4. **Legg til dokumentasjonen**: Bruk shortcode `property-docs` med hakeparenteser (`< >`) og argument `prop="{propName}"`. `propName` må samsvare med filnavn.

# Innhold

## Intro
Denne seksjonen skal inneholde en overskrift med navnet på egenskapen og kodenavnet i parentes
 etterfulgt av en beskrivelse av egenskapen.

---
<!-- begin intro -->
### Egenskap (`egenskap`)

<!-- end intro -->
---

## Innstillinger i Altinn Studio
Innholdet i denne seksjonen vises i tab-en "Altinn Studio Designer".
 Hvis det ikke er noe innhold vises ikke tab-en i det hele tatt (fjern i så fall eksempelinnhold).
 Merk at bilder må legges til med shortcode!

---
<!-- begin asd -->

Innstillinger i Altinn Studio.

<!-- Bilde må ligge i /assets/images/component-settings. Erstatt filnavn. -->
{{% image file="component-settings/screenshot.png" %}}

<!-- end asd -->
---

## Innstillinger i kode (JSON)
Innholdet i denne seksjonen vises i tab-en "Kode".
 Hvis det ikke er noe innhold vises ikke tab-en i det hele tatt (fjern i så fall eksempelinnhold).

---
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
---

## Mer
Innholdet i denne seksjonen vises etter tab-visning og kan brukes til å legge til forklaring av innstillinger,
 bildeeksempler eller utdypinger.

---
<!-- begin more -->


<!-- end more -->
---