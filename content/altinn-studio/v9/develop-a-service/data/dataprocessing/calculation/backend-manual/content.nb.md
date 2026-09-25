---
draft: true
headless: true
hidden: true
tags: [needsReview]
---
### Lage filen

Reglene ligger i en egen fil i mappen `App/models`, ved siden av datamodellen. Filen heter `[datatype-ID].calculation.json`, der `[datatype-ID]` er ID-en til datatypen i `applicationmetadata.json`. Datatypen beskriver hvilke data appen tar imot, og har som regel samme navn som datamodellen.

Heter datatypen `skjema`, har du som regel allerede filene `skjema.cs` og `skjema.schema.json` i `App/models`. Da lager du filen `App/models/skjema.calculation.json` og bruker dette som utgangspunkt:

{{< code-title >}}
App/models/skjema.calculation.json
{{< /code-title >}}
```json
{
  "calculations": {}
}
```

### Skrive en regel

Du legger reglene i objektet `calculations`. Nøkkelen er stien til feltet som skal få verdien, altså hvor feltet ligger i datamodellen, regnet fra toppen av modellen. Verdien er en regel med et `expression`.

Eksempelet under regner ut `regnskap.sum` som inntektene minus utgiftene:

{{< code-title >}}
App/models/skjema.calculation.json
{{< /code-title >}}
```json
{
  "calculations": {
    "regnskap.sum": {
      "expression": [
        "minus",
        ["dataModel", "regnskap.inntekter"],
        ["dataModel", "regnskap.utgifter"]
      ]
    }
  }
}
```

`expression` er et [dynamisk uttrykk]({{< relref "/altinn-studio/v9/develop-a-service/expressions" >}}) som gir et tall, en sannhetsverdi (`true` eller `false`) eller en tekst. Appen gjør om resultatet til typen feltet har i datamodellen. Går ikke det, lar appen feltet stå uendret og skriver en advarsel i loggen.

Hvert felt kan ha én regel. Trenger du flere betingelser, samler du dem i det samme uttrykket, for eksempel med `if`.

### Regne ut verdier i repeterende grupper

Ligger feltet i en repeterende gruppe, regner appen ut verdien for hver rad. Du skriver stien uten radnummer.

Eksempelet under gir hver rad i `varer` sin egen `sum`, ut fra prisen og antallet i den samme raden:

```json
{
  "calculations": {
    "varer.sum": {
      "expression": [
        "multiply",
        ["dataModel", "varer.pris"],
        ["dataModel", "varer.antall"]
      ]
    }
  }
}
```

### Teste reglene

Test reglene lokalt før du publiserer appen:

1. Fyll ut feltene som regelen bruker, og sjekk at feltet får riktig verdi.
2. Endre og tøm feltene, og sjekk at verdien blir oppdatert.
3. Har du regler i repeterende grupper, legger du til og sletter rader og sjekker at hver rad har riktig verdi.

Bruker et uttrykk en funksjon som ikke finnes, eller feiler uttrykket når appen regner det ut, klarer ikke appen å lagre. Er filen ikke gyldig JSON, eller mangler en regel `expression`, hopper appen over reglene og lagrer uten å si fra til brukeren. I begge tilfellene ser du feilen i loggen til appen.
