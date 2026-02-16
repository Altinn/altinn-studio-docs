---
draft: true
title: Filtrering
description: Slik fjerner du noen alternativer fra listen
weight: 200
tags: [needsReview, translate]
---

Filtrering gjør det mulig å fjerne noen av svaralternativene fra listen. Dette kan være nyttig hvis du vil begrense hvilke alternativer brukeren kan velge mellom.

Legg merke til at det allerede finnes flere måter å gjøre svaralternativene dynamiske på:

- Ved å bruke [dynamikk]({{< relref "../../../dynamics" >}}) for å skjule og vise helt forskjellige komponenter basert på en betingelse. Disse komponentene kan være bundet til samme sted i datamodellen, men ha forskjellige svaralternativer. Merk at [automatisk opprydding](../automatic-cleanup/) kan fjerne verdier fra datamodellen når du bruker denne metoden.
- Ved å bruke [dynamiske alternativer](../../sources/dynamic/) og sende spørringsparametre til backenden, kan du skrive kode for å generere et annet sett med alternativer basert på disse spørringsparametrene. Dette kan være nyttig, men kan føre til mye nettverkstrafikk hvis alternativene og spørringsparametrene endres ofte.
- Ved å bruke [svaralternativer fra en repeterende struktur i datamodellen](../../sources/from-data-model/). I kombinasjon med dataprosessering på backenden kan dette være en kraftig måte å lage egendefinerte svaralternativer på, selv når dynamiske alternativer basert på spørringsparametre ville være problematiske.

Filtrering av svaralternativer via `optionFilter`-egenskapen fungerer med alle de nevnte metodene, inkludert [statiske svaralternativer](../../../sources/static/). Dette gjør det mulig å bruke et [dynamisk uttrykk]({{< relref "../../../dynamics" >}}) for å filtrere ut svaralternativer basert på den nåværende tilstanden i skjemaet.

### Konfigurasjon

I eksempelet under er `optionFilter`-egenskapen satt til et dynamisk uttrykk som filtrerer ut alternativet `should-be-removed`. Merk at `optionFilter`-egenskapen bruker et uttrykk for å bestemme hvilke alternativer som skal beholdes. Hvis du vil fjerne alternativer, må du snu om logikken. Du kan for eksempel pakke inn hele uttrykket i en `not`-funksjon.

Uttrykket evalueres for hvert svaralternativ, og hvis det returnerer `true`, beholdes alternativet. Systemet fjerner alle andre alternativer.

```json {hl_lines=["10"]}
{
  "id": "dropdown-component-id",
  "type": "Dropdown",
  ...
  "options": [
    { "value": "should-be-removed", "label": "Systemet fjerner denne" },
    { "value": "red", "label": "Rød" },
    { "value": "blue", "label": "Blå" }
  ],
  "optionFilter": ["notEquals", ["value"], "should-be-removed"]
}
```

Resultatet av konfigurasjonen over vil være en nedtrekksliste med to alternativer: "Rød" og "Blå".

### `value`-funksjonen

I eksempelet over bruker du `value`-funksjonen til å få tilgang til verdien av det nåværende alternativet. Du kan bruke denne funksjonen med argumenter for å få tilgang til andre verdier i svaralternativet også.

- `["value"]` og `["value", "value"]` er like, og vil returnere verdien av det nåværende alternativet.
- `["value", "label"]` vil returnere ledeteksten til det nåværende alternativet. Denne teksten er teksten som er gitt i `label`-egenskapen til alternativet, før noen teksteressurser slås opp.
- `["value", "description"]` vil returnere [beskrivelsen av det nåværende alternativet](../texts/), hvis satt.
- `["value", "helpText"]` vil returnere [hjelpeteksten til det nåværende alternativet](../texts/), hvis satt.

### Sammen med kodelister fra repeterende strukturer

Hvis du bruker [kodelister fra en repeterende struktur i datamodellen](../../sources/from-data-model/), evaluerer systemet uttrykket i `optionFilter`-egenskapen for hver _rad_ i den repeterende strukturen. Det betyr at hvis du gjør oppslag i datamodellen (via `dataModel`-funksjonen) i uttrykket, får du tilgang til data fra den nåværende raden som kodeliste-elementet kommer fra.

Hvis det finnes en `RepeatingGroup`-komponent knyttet til denne repeterende strukturen, kan `optionFilter`-egenskapen også slå opp verdier fra `component`-funksjonen for å få tilgang til data fra komponenter inne i den repeterende gruppen. Returverdien fra denne funksjonen er alltid `null` hvis raden er skjult via [dynamikk i `hiddenRow`-egenskapen](/nb/altinn-studio/v8/reference/ux/fields/grouping/repeating/dynamics/), selv om et oppslag med `dataModel`-funksjonen ville returnert data fra den skjulte raden.

Et eksempel på denne kombinasjonen:

```json {hl_lines=["10-15"]}
{
   "id": "choose-pet",
   "type": "Dropdown",
   ...
   "source": {
      "group": "MyPets",
      "label": ["dataModel", "MyPets.Name"],
      "value": "MyPets[{0}].Id"
   },
   "optionFilter": [
      "and",
      ["notEquals", ["dataModel", "MyPets.Name"], null],
      ["notEquals", ["component", "pet-owned-by-someone-else"], true],
      ["notEquals", ["value"], "example-cat-id"]
   ]
}
```

I dette eksempelet vil `optionFilter`-egenskapen filtrere ut alle kjæledyr som:

- Ikke har et navn (stien `MyPets.Name` er `null` eller en tom streng).
- Noen andre eier (verdien i `pet-owned-by-someone-else`-komponenten er `true`). I dette eksempelet antar vi at denne komponenten er satt opp inne i en `RepeatingGroup`-komponent som er knyttet til `MyPets`-strukturen.
- Har ID-en `example-cat-id`. Siden systemet henter `value`-feltet fra stien `MyPets[{0}].Id`, vil resultatet være det samme som om man skrev `["notEquals", ["dataModel", "MyPets.Id"], "example-cat-id"]`.

### Eksempel: Filtrere duplikate alternativer i en repeterende gruppe

I animasjonen under er en `RepeatingGroup`-komponent satt opp med en `Dropdown`-komponent inni. Denne `Dropdown`-komponenten har en `optionFilter`-egenskap som fjerner svaralternativer som allerede er brukt i andre rader i den repeterende gruppen.

![Filtrering av alternativer i en repeterende gruppe](filtering.gif)

Konfigurasjonen for dette eksempelet er som følger:

```json {hl_lines=["11-17"]}
{
   "id": "ingredientType",
   "type": "Dropdown",
   "textResourceBindings": {
      "title": "Ingrediens"
   },
   "dataModelBindings": {
      "simpleBinding": "Ingredients.Type"
   },
   "optionsId": "foods",
   "optionFilter": [
      "or",
      // Fjern de som systemet allerede har brukt andre steder
      ["not", ["commaContains", ["dataModel", "UsedTypes"], ["value"]]],
      // Men ikke hvis det er den valgte ingrediensen her
      ["equals", ["component", "ingredientType"], ["value"]]
   ]
}
```

Noen ting å merke seg om konfigurasjonen:

- Systemet lagrer de allerede brukte ingredienstypene i en kommaseparert liste i feltet `UsedTypes` i datamodellen. Dataprosessering oppdaterer dette feltet og finner alle unike ingredienstyper i `Ingredients`-lista. Se [dataprosessering]({{< relref "/altinn-studio/v10/develop-a-service/data/dataprocessing" >}}).
- Hvis vi bare sjekket `UsedTypes`-feltet mot `value`-verdien til den nåværende `Dropdown`-komponenten, ville systemet fjerne alternativet fra listen med en gang en ingrediens ble valgt, og systemet ville da [rydde opp verdien i datamodellen automatisk](../automatic-cleanup/). Av denne grunn sjekker vi også at `value` ikke er lik verdien til den nåværende `Dropdown`-komponenten.

{{% notice warning %}}
Eksempelet ovenfor er avhengig av å lagre skjemadata til backenden og kjøre dataprosessering for å oppdatere `UsedTypes`-feltet. Av denne grunn er det fortsatt fullt mulig å velge den samme ingrediensen i flere rader i den repeterende gruppen hvis du er rask nok. Når du bruker en metode som dette bør du også [sette opp validering]({{< relref "/altinn-studio/v10/develop-a-service/data/validation" >}}) for å fange opp eventuelle duplikate verdier.
{{% /notice %}}
