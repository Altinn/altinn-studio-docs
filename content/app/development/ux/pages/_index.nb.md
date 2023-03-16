---
title: Sider
description: Hvordan sette opp en app med flere sider, sporvalg, oppsummering eller flere skjema.
toc: false
weight: 10
---

{{%notice info%}}
Oppsett av flere sider kan gjøres enten manuelt (som beskrevet under) eller direkte i skjema-editoren i Altinn Studio.
Merk at siste side sluttbruker var innom nå caches slik at man kommer tilbake til denne siden når appen lastes inn på nytt.
{{%/notice%}}

## Oppsett
For å få funksjonalitet for flere sider i skjema, **må** nuget-versjon til pakkene app'en bruker oppgraderes til versjon `1.2.0-alpha` _eller nyere_.
Se instrukser for hvordan det gjøres [her](../../../maintainance/dependencies).

Flere sider i skjema (innenfor samme prosess-task) støttes ved å dele opp dagens layout-fil `App/ui/FormLayout.json` i en fil per side. Filene må legges i en mappe `App/ui/layouts`. Hver layout-fil må bruke samme format som den eksisterende `FormLayout.json` filen.  F.eks.:

```
|- App/
  |- ui/
    |- layouts/
      |- side1.json
      |- side2.json
      |- side3.json
```

Anbefalt fremgangsmåte så lenge det er behov for å sette det opp manuelt, er å bruke ui-editoren i Altinn Studio for å legge inn alle komponentene inn i `FormLayout.json`, for å så kopiere de ut i sine respektive layout-filer, en for hver side man ønsker. `FormLayout.json` kan enten få nytt navn under `layouts`-mappen, eller slettes. 

_Merk: `FormLayout.json` må enten flyttes (evt med nytt navn) inn i `layouts`-mappen, eller slettes. Dersom man har den gamle `FormLayout.json`-filen under `App/ui`-mappen som tidligere, vil kun denne brukes og alle filer under `App/ui/layouts`-mappen ignoreres._ 

{{<children />}}