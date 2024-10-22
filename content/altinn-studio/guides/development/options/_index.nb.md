---
title: Kodelister (svaralternativer)
linktitle: Kodelister
description: Hvordan konfigurere svaralternativer/kodelister for en app?
toc: true
weight: 40
aliases:
- /nb/altinn-studio/guides/options
---

Altinn tilbyr to ulike måter en app kan eksponere kodelister på: Statisk og dynamisk. Disse eksponeres primært fra endepunktet som er tilgjengelig på `{org}/{app}/api/options/{optionsId}`, hvor `optionsId` er ID-en til listen.
Komponenter som avkrysningsbokser, radioknapper og nedtrekkslister vil automatisk kunne hente ut en slik liste om man kobler dem til en kodeliste-ID. Men ikke alle dynamiske kodelister må gå via API'et – vi har også dynamiske kodelister som baserer seg på verdiene fra en repeterende struktur i datamodellen.

## Koble en komponent til en kodeliste

En komponent kobles til en kodeliste ved å legge til feltet `optionsId`, som refererer til kodelistens ID. Eksempel:

```json
{
  "id": "dropdown-komponent",
  "type": "Dropdown",
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype"
  },
  "optionsId": "biler"
}
```

### Lagre visningsverdi i datamodellen
Noen ganger ønsker man å lagre den viste verdien på brukerens språk i datamodellen for enklere å kunne bruke de lagrede dataene til å lagre enkle visninger uten å være avhengig av å gjøre et nytt oppslag for å få en visningsvennlig verdi. Det kan også brukes for å huske hva brukeren faktisk har sett når han valgte i tilfelle man endrer ordlyd for en verdi og vil ha logg for hva brukeren har sett.

Dette gjøres ved å ha en egen ``dataModelBindings`` med navnet ``"label":`` i tillegg til en ``"simpleBinding":``.

```json
{
  "id": "dropdown-komponent",
  "type": "Dropdown",
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype",
    "label":"soknad.nyGaranti.loyvetypeLabel"
  },
  "optionsId": "biler"
}
```

## Sende med spørringsparametere ved henting av en kodeliste

Kodelisteendepunktet støtter spørringsparametre. Parameteren `language` sendes med automatisk.

### Sende med statiske parametre

Man kan legge til statiske parametre ved å sette opp `queryParameters` på den aktuelle komponenten:

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
}
```

I eksempelet over vil parameteren `?loyvetype=garanti` bli sendt med i kallet.

### Sende med dynamiske parametre basert på datamodellen

Man kan legge til dynamiske parametre ved å sette opp `mapping` på den aktuelle komponenten:

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
}
```

I eksempelet over vil parameteren `orgnummer={nr}` bli sendt med. `{nr}` er verdien på feltet `soknad.transportorOrgnummer`.
Om man setter opp en kobling til et datafelt og dette feltet endrer seg, så vil appen hente kodelisten på nytt. På denne måten kan man dynamisk styre hvilke valg som vises basert på informasjon gitt av sluttbruker.

Å sende med parametere fra repeterende grupper gjøres ved å legge ved en indeks-indikator for de relevante gruppene. Eksempel:

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
}
```

For nøstede repeterende grupper vil man følge det samme mønsteret, men med en ekstra indikator for den nøstede gruppa:

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
}
```

For et komplett eksempel kan du se vår [demo app.](https://altinn.studio/repos/ttd/dynamic-options-rep)

{{%notice warning%}}
**Gjelder applikasjoner som benytter versjon 7.4.0 eller eldre av nuget pakkene** - se https://github.com/Altinn/app-lib-dotnet/release

<br>

Under PDF-generering vil appen prøve å kalle det samme options-endepunktet som app-frontend gjør.
Vi har foreløpig en svakhet ved at eventuelle `mapping`-parametere ikke blir inkludert i denne forespørselen, se [sak #7903](https://github.com/Altinn/altinn-studio/issues/7903).

En mulig workaround her er å returnere en tom array i det PDF-generatoren spør om options med tomme query-parametere, eksempel:

```c#
string someArg = keyValuePairs.GetValueOrDefault("someArg");
string someOtherArg = keyValuePairs.GetValueOrDefault("someOtherArg");

if (string.IsNullOrEmpty(someArg) || string.IsNullOrEmpty(someOtherArg)) {
    return await Task.FromResult(new List<AppOption>());
}
```

Merk at dette vil resultere i at PDF-filen vil vise kodeverdien og ikke visningsverdien som sluttbrukers svar.
{{% /notice%}}

### Lagre metadata for parametrene som ble brukt til å hente options

Du kan lagre metadata for parameterene som ble brukt til å hente kodeliste i datamodellen ved å sette egenskapen `metadata`
på komponentens `dataModelBinding`-egenskap:

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
}
```

Denne konfigurasjonen vil lagre metadata for parameterene som ble brukt til å hente kodelisten som en kommaseparert
streng i feltet `soknad.transportorOrgnummer` i datamodellen.

## Beskrivelse og hjelpetekst

`description` og `helpText` støttes av kodelister i apper som bruker versjon 7.8.0 eller høyere. Beskrivelse og
hjelpetekst kan vises av komponentene `RadioButtons` og `Checkboxes` ved å sette attributtene i en `option` som
brukes av komponenten.

Beskrivelser og hjelpetekster kan gis til `options` på samme måte som en `label` er gitt, enten i statiske eller
dynamiske kodelister. Man kan også bruke dem i kodelister basert på repeterende grupper i `source`-attributten.

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

Beskrivelser og hjelpetekster som brukes i kodelister basert på repeterende grupper kan settes opp med dynamiske
tekstressurser på samme måte som `label`, som beskrevet i
[kodelister fra repeterende grupper](repeating-group-codelists).

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
}
```

{{<children />}}
