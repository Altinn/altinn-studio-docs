---
title: Dynamiske kodelister fra repeterede grupper i datamodellen
linktitle: Dynamiske kodelister fra repeterende grupper i datamodellen
description: Hvordan konfigurere kodelister som får verdiene sine basert på verdier hentet fra en repeterende gruppe i datamodellen?
toc: true
weight: 150
---

Tradisjonelle options baserer seg på ressurser hentet fra backend.
Denne måten å gjøre ting på endrer seg litt på dette, da det muliggjør å sette opp en direkte kobling fra komponent til skjemadata som ligger lagret i app frontend.
Et typisk bruksområde for dette er om brukeren fyller ut en liste med data som man senere i skjema ønsker å kunne velge mellom i en nedtrekksliste eller liknende.

### Konfigurasjon

For å sette opp options fra datamodellen har vi laget en nytt objekt som kan brukes på komponentene `RadioButtons`, `Checkboxes` og `Dropdown` som vi har kalt `source`.
Dette nye objektet inneholder feltene `group`, `label` og `value`. Eksempel:

```json {hl_lines=["5-9"]}
      {
        "id": "dropdown-component-id",
        "type": "Dropdown",
        ...
        "source": {
          "group": "some.group",
          "label": "dropdown.label",
          "value": "some.group[{0}].someField"
        }
      },
```

Forklaring:

- **group** - gruppen i datamodellen man baserer options på.
- **label** - en referanse til en text id som brukes som label for hver iterasjon av gruppen. Se mer under.
- **value** - en referanse til det feltet i gruppen som skal bruke som option verdi. Legg merke til `[{0}]` syntaxen. Her vil `{0}` bli erstattet med den aktuelle indeksen for hvert element i gruppen.

Merk at **value** feltet må være unikt for hvert element. Om man ikke har et felt som er unik anbefales det å legge på et ekstra felt i datamodellen som kan benyttes som identifikator f.eks en GUID eller liknende.

For **label** feltet må vi definere en tekst ressurs som kan bli brukt som label for hver repetisjon av gruppen.
Dette følger samme syntax som **value**, og vil være kjent for deg om du har brukt [variabler i tekst](../../../ux/texts).

Eksempel:

```json
{
  "language": "nb",
  "resources": [
    {
      "id": "dropdown.label",
      "value": "Person: {0}, Age: {1}",
      "variables": [
        {
          "key": "some.group[{0}].name",
          "dataSource": "dataModel.default"
        },
        {
          "key": "some.group[{0}].age",
          "dataSource": "dataModel.default"
        }
      ]
    }
  ]
}
```

I dette eksempelet har vi satt opp to parametere i teksten som refererer til felter i gruppen.
Vi kjenner også igjen `[{0}]` syntaksen i `key` feltet som muliggjør gjenbruk av labelen for hver index i gruppen.

{{%notice warning%}}
Beskrivelse og hjelpetekst er ennå ikke kompatible med alternativer fra gjentakende grupper siden source ikke støtter
tillegg av hjelpetekst og beskrivelse.
{{% /notice%}}