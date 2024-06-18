---
title: Legg til en ny komponent i Studio
description: Legg til en ny komponent fra Apps slik at den kan konfigureres i Studio
weight: 20
---

## Legg til en ny komponent i Studio

Hvis nye komponenter blir introdusert i Appene, enten av Apps-teamet eller av eksterne bidragsytere, kan komponenten legges til som en konfigurerbar komponent i Studio. Dette betyr at egenskapene for komponenten når den brukes i et skjema, kan redigeres direkte i Studio, akkurat som enhver annen komponent.

### Steg-for-steg guide
1. [Få json-skjema for den nye komponenten](#1-få-json-skjema-for-den-nye-komponenten)
2. [Legg til et ikon for komponenten](#2-legg-til-et-ikon-for-komponenten)
3. [Legg til den nye komponenten i listen over Studio-komponenter](#3-legg-til-den-nye-komponenten-i-listen-over-studio-komponenter)
4. [Sørg for at potensielle andre komponentoppdateringer støttes*](#4-sørg-for-at-potensielle-andre-komponentoppdateringer-støttes)
5. [Implementer potensiell tilpasset konfigurasjon som trengs for å støtte komponenten](#5-implementer-potensiell-tilpasset-konfigurasjon-som-trengs-for-å-støtte-komponenten)

_*Bare relevant hvis du kjører skjema genereringsskriptet i steg 1._


### 1. Få json-skjema for den nye komponenten
For å hente json-skjemaene som definerer komponentkonfigurasjonen er det forskjellige alternativer:

- Skriv json-skjemaet manuelt basert på `config.ts` i apps repo for komponenten.
- Kjør skriptet, `generate-json-schemas`, i `frontend/scripts/` for versjon 4 av app-frontend. Bruken av skriptet er beskrevet i README. For at skriptet skal fungere må komponenten du ønsker å legge til ha blitt utgitt av app-frontend.

### 2. Legg til et ikon for komponenten
Når du legger til et ikon, er det forskjellige tilnærminger gitt at;
- Noen av de eksisterende ikonene fra [Aksel Icons](https://aksel.nav.no/ikoner) kan brukes:
  
  Da importerer du ikonet fra `@studio/icons` i `formItemConfig.ts`.

- Eller, hvis komponenten trenger et nytt tilpasset ikon:

  Da kan du enten lage en SVG for komponenten selv eller deleger denne oppgaven til designerne i Altinn Studio ved å kontakte dem [i Slack](https://altinn.slack.com/) eller [opprette et issue i Altinn Studio Github repository](https://github.com/Altinn/altinn-studio/issues/new/choose). Når en SVG er opprettet for ikonet, konverter SVG til JSX, f.eks. ved å bruke [dette verktøyet](https://svg2jsx.com/). Opprett en ny fil i `libs/studio-icons/src/react/icons/[NAVNET_PÅ_DIN_KOMPONENT]Icon.tsx` og bruk samme format som for de andre ikonene i mappen. Ikonfilen må legges til indeksfilen i samme mappe.

### 3. Legg til den nye komponenten i listen over Studio-komponenter
For å gi full støtte for en ny komponent i Studio, er det noen få ting å gjøre. Rekkefølgen er vilkårlig.

- Legg til det nye skjemaet
  - Hvis du kjørte skriptet fra steg 1, har skjemaet blitt lagt til for deg i riktig mappe.
  - Hvis du _**ikke**_ kjørte skriptet, må json-skjema definisjonsfilen plasseres i denne mappen: `packages/ux-editor/src/testing/schemas/component`
- Legge til komponenten i `ComponentType`-enumen, alfabetisk, i denne filen: `packages/ux-editor/src/types/ComponentType.ts`
- Legge til komponenten i komponentlisten i filen: `packages/ux-editor/src/data/formItemConfig.ts` ved å først legge den til, alfabetisk, i `formItemConfigs`-objektet, med passende standardkonfigurasjoner og et ikon,
deretter legge den til i en passende liste i samme fil; **schemaComponents**, **advancedItems** eller **textComponents**.
- Legge til tekster for den nye komponenten i `nb.json`:
  - En tittel i formatet **ux_editor.component_title.[COMPONENT_TYPE]**
  - Hvis komponenten har noen nye egenskaper som _ikke_ eksisterer fra før, må disse også legges til i formatet **ux_editor.component_properties.[PROPERTY_NAME]**
  - Hvis komponenten har noen nye objekt egenskaper som ikke eksisterer fra før, må en beskrivelse også legges til i formatet **ux_editor.component_properties_description.[PROPERTY_NAME]**

### 4. Sørg for at potensielle andre komponentoppdateringer støttes
Sjekk om skriptet oppdaterte andre komponentskjema konfigurasjoner og sørg for stabil (uendret?) støtte.

- Sørg for at potensielt nye lagt til egenskaper eksisterer fra før, ellers legg til nødvendige tekster for dem

### 5. Implementer potensiell tilpasset konfigurasjon som trengs for å støtte komponenten
Hvis komponenten har noen egenskaoer som krever spesielt grensesnitt utover det som leveres direkte basert på egenskapstypen (f.eks. om det er en streng eller et objekt el.), implementer støtte som en spesifikk React komponent. Komponenten kan tas i bruk på samme på som `grid`-egenskapen f.eks. i `FormComponentConfig.tsx`.
```javascript
{grid && (
    <div>
      <Heading level={3} size='xxsmall'>
        {t('ux_editor.component_properties.grid')}
      </Heading>
      <EditGrid
        key={component.id}
        component={component}
        handleComponentChange={handleComponentUpdate}
      />
    </div>
 )}
```