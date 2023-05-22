---
title: Kodelister (options)
linktitle: Kodelister
description: Hvordan konfigurere options/kodelister for en app.
toc: true
weight: 300
---

Altinn tilbyr i dag to ulike måter en app kan eksponere kodelister - statisk og dynamisk. Dette gjøres gjennom et options-api som er eksponert av appen, og kodelisten vil være tilgjengelig på endepunktet `{org}/{app}/api/options/{optionsId}`.
Checkbox, Dropdown og RadioButton komponenter vil automatisk kunne hente ut en slik liste om man kobler denne komponenten til en slik options-id.

## Koble en komponent til kodeliste

Dette gjøres ved å legge til feltet optionsId som referer til hvilken option (kodeliste) man ønsker refere til. Eksempel:

```json
{
    "id": "8e6f7b2f-fcf0-438d-8336-c1a8e1e03f44",
    "type": "Dropdown",
    "componentType": 4,
    "textResourceBindings": {},
    "dataModelBindings": {},
    "optionsId": "biler",
}
```

## Sende med query parametere ved henting av options

Options støtter query parameters når det gjøres api kall. `language` er satt opp automatisk, men man kan også legge til egendefinerte parametere ved å sette opp `mapping` på den aktuelle komponenten.

```json
{
    "id": "c66d7b69-2e18-4786-af44-1fa913853618",
    "type": "Dropdown",
    "textResourceBindings": {
        "title": "NyGarantiLoyvetype"
    },
    "dataModelBindings": {
        "simpleBinding": "soknad.nyGaranti.loyvetype"
    },
    "required": true,
    "optionsId": "loyvetyper",
    "mapping": {
        "soknad.transportorOrgnummer": "orgnummer"
    }
},
```

I eksempelet over vil det bli satt på et query parameter `orgnummer={nr}`, hvor `{nr}` er verdien på feltet `soknad.transportorOrgnummer`.
Om man setter opp en kobling til et datafelt og dette feltet endrer seg så vil app-frontend hente options på nytt. På denne måten kan man dynamisk styre hvilke valg som vises basert på informasjon gitt av sluttbruker.

 Å sende med query parametere fra repeterende grupper er også støttet ved å legge ved en indeks-indikator for de relevante gruppene. Eksempel:

```json
      {
        "id": "dropdown-group",
        "type": "Dropdown",
        "textResourceBindings": {
          "title": "Select city"
        },
        "dataModelBindings": {
          "simpleBinding": "Group.City"
        },
        "required": true,
        "optionsId": "cities",
        "mapping": {
          "Group[{0}].Country": "country"
        }
      },
```

For nøsta repeterende grupper vil man følge det samme mønsteret, men med en ekstra indikator for den nøsta gruppa:

```json
      {
        "id": "dropdown-nested-group",
        "type": "Dropdown",
        "textResourceBindings": {
          "title": "Select city"
        },
        "dataModelBindings": {
          "simpleBinding": "Group.SubGroup.City"
        },
        "required": true,
        "optionsId": "cities",
        "mapping": {
          "Group[{0}].SubGroup[{1}].Country": "country"
        }
      },
```

For et komplett eksempel kan du se vår [demo app.](https://altinn.studio/repos/ttd/dynamic-options-rep)

{{%notice warning%}}
Under PDF-generering vil appen prøve å kalle det samme options-endepunktet som app-frontend gjør.
Vi har foreløpig en svakhet ved at eventuelle mapping-parametere ikke blir inkludert i denne forespørselen, se issue [#7903.](https://github.com/Altinn/altinn-studio/issues/7903)

En mulig workaround her er å returnere en tom array i det PDF-generatoren spør om options med tomme query-parametere, eksempel:

```c#
            string someArg = keyValuePairs.GetValueOrDefault("someArg");
            string someOtherArg = keyValuePairs.GetValueOrDefault("someOtherArg");

            if (string.IsNullOrEmpty(someArg) || string.IsNullOrEmpty(someOtherArg)) {
                return await Task.FromResult(new List<AppOption>());
            }
```

Merk at dette vil resultere i at PDF vil vise verdien valgt og ikke label som sluttbrukers svar.
{{% /notice%}}

## Options basert på repeterende grupper i datamodellen

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
Dette følger samme syntax som **value**, og vil være kjent for deg om du har brukt [variabler i tekst](../../ux/texts).

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

## Beskrivelse og Hjelpetekst
`description` og hjelpetekst støttes av alternativene i apper som bruker versjon v7.8.0 eller høyere. `description` og
hjelpetekst kan vises av komponentene `RadioButtons` og `Checkboxes` ved å gi et option de nevnte egenskapene.

Beskrivelser og hjelpetekster kan gis til `optons` på samme måte som en `label` er gitt, enten i statiske eller
dynamiske kodelister.

```json
[
    {
        "value": "norway",
        "label": "Norge",
        "description": "This is a description",
        "helpText": "This is a help text"
    },
    {
        "value": "denmark",
        "label": "Danmark"
    }
]
```

```cs
var options = new AppOptions
{
  Options = new List<AppOption>
    {
      new AppOption
      {
          Label = "Ole",
          Value = "1",
          Description = "This is a description",
          HelpText  = "This is a help text"
      },
      new AppOption
      {
          Label = "Dole",
          Value = "2"
      }
    }
};
```

{{%notice warning%}}
Beskrivelse og hjelpetekst er ennå ikke kompatible med alternativer fra gjentakende grupper siden source ikke støtter
tillegg av hjelpetekst og beskrivelse.
{{% /notice%}}

{{<children />}}