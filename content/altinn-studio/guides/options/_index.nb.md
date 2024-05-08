---
title: Kodelister (options)
linktitle: Kodelister
description: Hvordan konfigurere options/kodelister for en app?
toc: true
weight: 40
---

Altinn tilbyr to ulike måter en app kan eksponere kodelister - statisk og dynamisk. Disse eksponeres primært fra options endepunktet i appen, og er tilgjengelig på `{org}/{app}/api/options/{optionsId}`.
Checkbox, Dropdown og RadioButton komponenter vil automatisk kunne hente ut en slik liste om man kobler denne komponenten til en slik options-id. Men ikke alle dynamiske kodelister må gå via api'et - vi har også dynamiske kodelister som baserer seg på verdiene fra en repeterende struktur i datamodellen.

## Koble en komponent til kodeliste

Dette gjøres ved å legge til feltet optionsId som referer til hvilken option (kodeliste) man ønsker refere til. Eksempel:

```json
{
  "id": "dropdown-komponent",
  "type": "Dropdown",
  "optionsId": "biler"
}
```

## Sende med query parametere ved henting av options

Options støtter query parametre når det gjøres api kall; parameteren `language` sendes med automatisk.

### Sende med statiske query parametre

Man kan legge til statiske query parametre ved å sette opp `queryParameters` på den aktuelle komponenten:

```json
{
  "id": "dropdown-komponent",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "NyGarantiLoyvetype"
  },
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype"
  },
  "required": true,
  "optionsId": "loyvetyper",
  "queryParameters": {
    "loyvetype": "garanti"
  }
},
```

I eksempelet over vil parameteren `?loyvetype=garanti` bli sendt med i api kallet.

### Sende med dynamiske query parametre basert på datamodellen

Man kan legge til dynamiske query parametre ved å sette opp `mapping` på den aktuelle komponenten:

```json
{
  "id": "dropdown-komponent",
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
**Gjelder applikasjoner som benytter versjon 7.4.0 eller eldre av nuget pakkene** - se https://github.com/Altinn/app-lib-dotnet/release

<br>

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

### Lagre metadata for parametrene som ble brukt til å hente options

Du kan lagre metadata for parameterene som ble brukt til å hente options i datamodellen ved å sette `metadata` property
på komponentens `dataModelBinding` property:

```json
{
  "id": "some-dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "NyGarantiLoyvetype"
  },
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype",
    "metadata":  "soknad.transportorOrgnummer"
  },
  "required": true,
  "optionsId": "loyvetyper",
  "mapping": {
    "soknad.transportorOrgnummer": "orgnummer"
  }
},
```

Denne konfigurasjonen vil lagre metadata for parameterene som ble brukt til å hente options som en kommaseparert
streng i feltet `soknad.transportorOrgnummer` i datamodellen.

## Beskrivelse og Hjelpetekst

`description` og `helpText` støttes av options i apper som bruker versjon v7.8.0 eller høyere. Beskrivlese og
hjelpetekst kan vises av komponentene `RadioButtons` og `Checkboxes` ved å sette attributtene i en `option` som
brukes av komponenten.

Beskrivelser og hjelpetekster kan gis til `options` på samme måte som en `label` er gitt, enten i statiske eller
dynamiske kodelister. Man kan også bruke dem i options basert på repeterende grupper i `source` attributten.

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

Beskrivelser og hjelpetekster som brukes i options basert på repeterende grupper kan settes opp med dynamiske
text-ressurser på samme måte som `label`, som er beskrevet i
[options basert på repeterende grupper](repeating-group-codelists).

```json
{
  "id": "checkboxes-component-id",
  "type": "Checkboxes",
  ...
  "source": {
    "group": "some.group",
    "label": "checkboxes.label",
    "description": "checkboxes.descripiton",
    "helpText": "checkboxes.helpText",
    "value": "some.group[{0}].someField"
  }
},
```

{{<children />}}
