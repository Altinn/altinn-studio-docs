---
title: Avkrysningsbokser
linktitle: Avkrysningsbokser
description: Inndataelement som lar brukeren velge eller fjerne valg for ett eller flere alternativer.
schemaname: Checkboxes # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
aliases:
- checkboxes
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

Avkrysningsbokser brukes ofte i skjemaer for å samle input fra brukeren,
 slik at de kan velge ett eller flere alternativer fra en liste.
 
 #### Bruk avkrysningsbokser når:
 * Brukere kan velge flere alternativer fra en liste.
 * Det må gjøres et eksplisitt valg for å bruke innstillingene (f.eks. bekrefte at brukeren har lest et dokument).

### Anatomi

![Anatomi avkrysningsbokser](Checkboxes-anatomy.png)

{{% anatomy-list %}}
1. **Overskrift** - Spørsmål eller instruksjon.
2. **Avkrysningsboks** - Valgkontrollen.
3. **Etikett** - Tekstetikett knyttet til avkrysningsboksen.
4. **Beskrivelsestekst** - Valgfritt tekstfelt for ytterligere beskrivelse.
5. **Hjelpetekst** - Klikk på spørsmålstegnet for vise en pop-up med hjelpetekst.
{{% /anatomy-list %}} 

### Stil

* Avkrysningsbokser bør alltid ha en tilknyttet etikett på høyre side.

### Beste praksis

* Avkrysningsbokser med deaktivert valg bør unngås.
    Hvis et alternativ er utilgjengelig bør det fjernes og en forklaring gitt for hvorfor alternativet mangler.

 ### Veiledning for innhold

* Hold etikettene korte og beskrivende.
* Begynn alle etiketter med stor bokstav.
* Ikke inkluder tegnsetting etter etikettene.

### Relatert

* Hvis brukeren bare kan velge ett alternativ fra en liste, bruk [radioknapper](../radiobuttons).
* For en mer kompakt måte å vise flere alternativer med enkeltvalg, bruk en [rullegardinmeny](../dropdown).

## Egenskaper

Følgende er en liste over tilgjengelige egenskaper for {{% title %}}. Listen er automatisk generert basert på komponentens JSON schema (se link).

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter. Listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

<!-- Shortkoden `component-props` genererer automatisk en liste over komponentegenskaper fra komponentens JSON schema.
Komponentnavnet kan gis eksplisitt som argument (f.eks. `component-props "Grid"`).
Hvis ingen argument gis, henter shortkoden komponentnavnet fra 'schemaname' i frontmatter. -->

{{% component-props %}}

## Konfigurering

### Legg til komponent

Du kan legge til en komponent i [Altinn Studio Designer](/nb/app/getting-started/ui-editor/) ved å dra den fra venstre sidepanel til midten av siden.
Når du velger komponenten, vises et panel med innstillinger for den på høyre side.

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio med flere muligheter for innstillinger!
 Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her og noen innstillinger kan være i betaversjon.
{{% /notice %}}
<!-- ### Innstillinger i Altinn Studio Designer

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Innstillinger for egenskaper tilgjengelig i Altinn Studio Designer.

![Avkrysningsbokser innstillingspanel](Checkboxes-settings-panel.png "Innstillinger for avkrysningsbokser")


- **Komponent-ID** (`id`): Automatisk generert komponent-ID (kan redigeres).
- **[Lenke til datamodell](#lenke-til-datamodell)** (`dataModelBindings`): Koble komponenten til et felt i datamodellen.
- **[Ledetekst](#ledetekst-beskrivelse-og-hjelpetekst)** (`textResourceBindings.title`): Overskrift med spørsmål eller instruksjon.
- **[Beskrivelse](#ledetekst-beskrivelse-og-hjelpetekst)** (`textResourceBindings.description`): Tekst for ytterligere beskrivelse eller utdyping.
- **[Hjelpetekst](#ledetekst-beskrivelse-og-hjelpetekst)** (`textResourceBindings.help`): Tekst som vises ved å klikke på spørsmålstegn v/ledetekst.
- **Det skal ikke være mulig å svare (read only)** (`readOnly`): Når huket av deaktiveres avkrysningsboksen (ikke anbefalt, se [beste praksis](#beste-praksis)).
- **Det skal være påkrevd for brukeren å svare** (`required`) Når huket av kreves det at brukeren gjør et valg.
- **Hvordan vil du legge til avkrysningsbokser?**: Legg til avkrysningsbokser [manuelt](#manuelt) (`options`) eller ved hjelp av [kodelister](#kodelister) (`optionsId`).
- **Sett forhåndsvalgt avkrysningsboks** (`preselectedOptionIndex`): Indeks (heltall) for forhåndsvalgt avkrysningsboks. Indeks starter på `0`.

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Korresponderende innstillinger i sidens JSON-fil.

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="5-18"}
...
{
  "data": {
    "layout": [
      {
        "id": "Checkboxes-bnPrdi",
        "type": "Checkboxes",
        "dataModelBindings": {},
        "readOnly": false,
        "required": true,
        "textResourceBindings": {
          "title": "",
          "description": "",
          "help": ""
        },
        "options": [],
        "preselectedOptionIndex":
      },
    ]
  }
}
...
```

{{</content-version-container>}}
{{</content-version-selector>}} -->

### Tekst

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Du kan opprette en ny tekst ved å klikke på pluss-tegnet eller velge en eksisterende ved å klikke på forstørrelsesglasset. Se [Legge til og endre tekster i en app](/nb/app/development/ux/texts/#legge-til-og-endre-tekster-i-en-app) for mer info.

![Tekst innstillinger. Skjermbilde](Tekst-settings-all.png "Innstillinger for tekst")

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Tekst kan legges til direkte som en tekststreng eller ved å oppgi nøkkelen til en [tekstressurs](/nb/app/development/ux/texts/#legge-til-og-endre-tekster-i-en-app).

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="5-11"}
...
  "data": {
    "layout": [
      ...
      "textResourceBindings": {
          "title": "",
          "description": "",
          "help": "",
          "shortName": "",
          "tableTitle": ""
        }
    ]
  }
...
```
{{</content-version-container>}}
{{</content-version-selector>}}

- **Ledetekst** (`textResourceBindings.title`): Overskrift med spørsmål eller instruksjon.
- **Beskrivelse** (`textResourceBindings.description`): Tekst for ytterligere beskrivelse eller utdyping.
- **Hjelpetekst** (`textResourceBindings.help`): Når hjelpetekst er fylt ut vil et spørsmålstegn vises ved siden av ledeteksten. Klikk på spørsmålstegnet for å vise teksten som en popup.
Kan brukes til forklaring, eksempler, brukssituasjoner osv.
- **Kortnavn** (`textResourceBindings.shortName`):
- **Tittel i tabell** (`textResourceBindings.tableTitle`):

### Datamodell

For at det skal være mulig å lagre og manipulere informasjonen må komponenten kobles til et felt i en [datamodell](/nb/app/development/data/data-modeling/#datamodeller).
Verdien for avkrysningsboksen må samsvare med datatypen for feltet. 

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Velg feltet du ønsker å koble komponenten til fra nedtrekksmenyen.
 Hvis det ikke er noen felter tilgjengelig må du først [laste opp en datamodell](/nb/app/development/data/data-modeling/#laste-opp-og-vise-datamodell).

![Innstillinger datamodell. Skjermbilde](Datamodell-settings.png "Innstillinger for datamodell")

{{</content-version-container>}}

{{<content-version-container version-label="Kode">}}

Legg navnet på feltet du ønsker å koble komponenten til i krøllparenteser under `dataModelBindings`.

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=["7"]}
...
  "data": {
    "layout": [
      {
        "id": "checkbox-offentlig-transport",
        "type": "Checkboxes",
        "dataModelBindings": {"OffentligTransport.sisteMnd"},
        ...
      }
    ]
  }
...
```
{{</content-version-container>}}
{{</content-version-selector>}}

### Legge til avkrysningsbokser

Avkrysningsbokser kan legges til manuelt eller ved hjelp av forhåndsdefinerte [kodelister](/nb/app/development/data/options).

#### Manuelt

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
Velg "Manuelt" og klikk "Legg til flere" for å til en ny avkrysningsboks. Velg eller opprett ny tekst for å legge til etikett (`label`).

Avkrysningsboksen kommer med en forhåndsutfylt verdi (`value`), som er dataen som lagres når brukeren gjør et valg.
 Verdien kan endres etter ønske.
  Hvis komponenten er tilknyttet en datamodell, må verdiene tilsvare datatypen (for eksempel boolsk, streng, tall) som er angitt i modellen.

![Innstillinger for avkrysningsbokser lagt til manuelt](<Manuelt-settings.png> "Avkrysningsboks lagt til manuelt")

{{</content-version-container>}}

{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=["6-11"]}
...
"data": {
  "layout": [
    {
      ...
       "options": [
          {
            "label": "Alternativ 1",
            "value": "1"
          }
        ]
    }
  ]
}
...
```
{{</content-version-container>}}
{{</content-version-selector>}}

#### Kodeliste

En [kodeliste](/nb/app/development/data/options) er en forhåndsdefinert liste med alternativer.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

For å legge til avkrysningsbokser fra en kodeliste, velg 'Kodeliste' og angi en kodeliste ID (for å bruke en egendefinert (dynamisk) kodeliste, klikk på "Bytt til egendefinert kodeliste").

![Kodeliste innstillinger. Skjermbilde](Kodeliste-settings.png "Kodeliste")

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="8"}
...
"data": {
  "layout": [
      {
      "id": "checkbox-offentlig-transport",
      "type": "Checkboxes",
      ...
      "optionsID": "land"
    }
  ]
}
...
```

{{</content-version-container>}}
{{</content-version-selector>}}

For mer informasjon om kodelister, se
- [Koble en komponent til kodeliste](/nb/app/development/data/options/#koble-en-komponent-til-kodeliste)
- [Statiske kodelister](/nb/app/development/data/options/static-codelists/)
- [Dynamiske kodelister](/nb/app/development/data/options/dynamic-codelists/)

### Visning

Standard visning er kolonne (`column`), men du kan endre til rad (`row`) eller tabell (`table`) i nedtrekksmenyen.

![Eksempel visning column. Skjermbilde](checkboxes-column.png "Visning 'column'")

![Eksempel visning row. Skjermbilde](checkboxes-row.png "Visning 'row'")

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

![Innstilling visning. Skjermbilde](Visning-settings.png "Innstilling for visning")

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="8"}
...
  "data": {
    "layout": [
       {
        "id": "Checkboxes-kodeliste",
        "type": "Checkboxes",
        "optionsId": "land",
        "layout": "row"
      },
    ]
  }
...
```
{{</content-version-container>}}
{{</content-version-selector>}}