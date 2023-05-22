---
title: Kodelister (options)
linktitle: Kodelister
description: Hvordan konfigurere options/kodelister for en app.
toc: true
weight: 300
---

Altinn tilbyr to ulike måter en app kan eksponere kodelister - statisk og dynamisk. Dette gjøres gjennom et options-api som er eksponert av appen, og kodelisten vil være tilgjengelig på endepunktet `{org}/{app}/api/options/{optionsId}`.
Checkbox, Dropdown og RadioButton komponenter vil automatisk kunne hente ut en slik liste om man kobler denne komponenten til en slik options-id. Ikke alle dynamiske kodelister må gå via api'et - vi har også dynamiske kodelister som baserer seg på verdiene fra en repeterende struktur i datamodellen.

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