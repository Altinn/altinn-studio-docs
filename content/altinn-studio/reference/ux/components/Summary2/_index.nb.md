---

title: Summary2  
linktitle: Summary2  
description: Lar deg vise oppsumemeringer av komponenter, sider og layoutSets  
schemaname: Summary2  
weight: 10   
toc: true
---

## Bruk

Summary2-komponenten lar deg vise en oppsummering av enten en komponent, side eller layoutSet, enten i nåværende eller tidligere oppgaver.

Den kan tilpasses for å dekke dine behov, og brukes også for å generere PDF.

### Oppbygning

![Summary2](./summary2.png "Eksempel på Summary2-komponenter inne i grupper")

For eksempler på hvordan Summary2 ser ut i forskjellige komponenter, [se dette eksempelprogrammet](https://ttd.apps.tt02.altinn.no/ttd/component-library).

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="450" src="https://embed.figma.com/design/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?node-id=1994-9298&embed-host=share" allowfullscreen></iframe>
Dette eksemplet er hentet fra <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Merk at eksempelet ikke er identisk med den faktiske koden, men er tilpasset for å lage prototyper i Figma.

## Konfigurasjon

### Komponentoppsummering

Den mest grunnleggende måten å bruke Summary2 på er å vise en oppsummering av en enkelt komponent.

For eksempel, hvis jeg vil vise en oppsummering av et enkelt inputfelt konfigurert slik:

```json{hl_lines="6-"}
{
  "id": "MyInputFieldID",
  "type": "Input",
}
```

vil min Summary2 konfigurasjon se slik ut:

```json{hl_lines="6-"}
{
        "id": "MySummary2ID",
        "type": "Summary2",
        "target": {
          "type": "component",
          "id": "MyInputFieldID"
        }
}
```

Det resulterer i en oppsummering som ser slikt ut:

![Summary2](./examplesummary.png "Eksempel på Summary2-komponenter inne i grupper")

### Sideoppsummering

Hvis du vil vise en oppsummering av en hel side, kan du sette ```target.type``` egenskapen til ```"page"``` slik:

```json{hl_lines="6-"}
{
        "id": "MySummary2ID",
        "type": "Summary2",
        "target": {
          "type": "page",
          "id": "MyLayoutFilename"
        }
}
```

I dette tilfellet er ```target.id``` satt til navnet på layout-siden du vil vise. Det vil si at du må ha en fil kalt ```MyLayoutFilename.json``` i prosjektet ditt.

### Layoutsett-oppsummering

Det er også mulig å vise en oppsummering av et helt layoutSet. I dette tilfellet vil du sette ```target.type``` egenskapen til ```"layoutSet"``` slik:

```json{hl_lines="6-"}
{
        "id": "MySummary2ID",
        "type": "Summary2",
        "target": {
          "type": "layoutSet",
          "id": "MyLayoutSet"
        }
}
```

I dette tilfellet må du ha et layoutSet kalt ```MyLayoutSet``` i prosjektet ditt. Dette vil vise en oppsummering av alle sidene og komponentene i  layoutSet-et du peker på.

### Vise oppsummeringer av tidligere oppgaver

Du kan også vise oppsummeringer av komponenter, sider og layoutSet som eksisterer i tidligere oppgaver.

For å gjøre dette, spesifiserer du ganske enkelt ```target.taskId``` slik:

```json{hl_lines="6-"}
{
  "id": "Summary2-previous-page",
  "type": "Summary2",
  "target": {
    "type": "page",
    "taskId": "Task_1",
    "id": "AddressPage"
 }
}
```

Konfigurasjonen er nøyaktig som før med hensyn til ```target.type``` og ```target.id```, bortsett fra at du i tillegg spesifiserer ```taskId```.

## Overstyringer

For hver komponent i oppsummeringen din kan du konfigurere forskjellige overstyringer for å passe dine behov.

For å konfigurere en overstyring, bruk ```overrides```-feltet til Summary2-komponenten slik:

```json{hl_lines="6-"}
{
        "id": "MySummary2ID",
        "type": "Summary2",
        "target": {
          "type": "component",
          "id": "MyComponentID"
        },
         "overrides": [
           {
             "componentId": "MyComponentID",
             "displayType": "string"
           }
         ]
}
```

Her er overstyringene som er felles for alle komponenter:

| Parameter       | Type    | Påkrevd | Beskrivelse                                                                                                            |
|-----------------|---------|---------|------------------------------------------------------------------------------------------------------------------------|
| componentId     | string  | ja      | ID-en til komponenten du overstyrer                                                                                    |
| hidden          | boolean | nei     | Ekskluder komponenten fra oppsummeringen                                                                               |
| forceShowInSummary       | boolean | nei     | Vil tvangsvise komponenten i en oppsummering selv om hideEmptyFields er satt til true i oppsummeringskomponenten.      |
| emptyFieldText  | string  | nei     | Egendefinert tekst som skal vises for tomme felt.                                                                       |
| hideEmptyFields | boolean | nei     | Ekskluder tomme felt fra oppsummeringen. Fungerer bare hvis feltet ikke er påkrevd.                                    |
| isCompact       | boolean | nei     | Mulighet for å vise en kompakt versjon. (Map, Paragraph og Header har ikke støtte for dette)                           |

I tillegg støtter noen komponenter komponentspesifikke overstyringer:

### Checkbox og MultipleSelect

| Parameter       | Type                       | Påkrevd | Beskrivelse                                  |
|-----------------|----------------------------|---------|----------------------------------------------|
| displayType     | enum: ```list \| string``` | nei     | Vis oppsummeringen som en liste eller streng |

### RepeatingGroup og Subform

| Parameter       | Type                       | Påkrevd | Beskrivelse                                                                             |
|-----------------|----------------------------|---------|-----------------------------------------------------------------------------------------|
| display         | enum: ```table \| full```  | nei     | Vis oppsummeringen som en tabell eller vis alle feltene gruppert under hverandre        |
