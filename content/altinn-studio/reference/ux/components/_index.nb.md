---
title: Komponenter
description: Komponenter er byggeklossene i applikasjoner.
weight: 10
---

Nedenfor er en tabell med layout-egenskaper for komponenter.
Mer spesifikke egenskaper og definisjoner finner du i beskrivelsen for hver komponent og i filen [layout JSON schema](https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json).


{{% expandlarge id="layout-komponent-egenskaper" header="Layout-egenskaper for komponenter" %}}

| **Egenskap**           | **Tittel**                | **Type**      | **Beskrivelse**                                                                                                        |
| ---------------------- | ------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `id`                   | id                        | string        | Komponentens ID. Må være unik innenfor alle layouts/sider i et layout-set. Kan ikke ende med `<bindestrek><nummer>`.   |
| `type`                 | Type                      | string (enum) | Komponenttype.                                                                                                         |
| `required`             | Påkrevd                   | boolean       | Boolsk verdi eller uttrykk som indikerer om komponenten er påkrevd når man fyller ut skjemaet. Standardverdi: `false`. |
| `readOnly`             | Kun lese                  | boolean       | Boolsk verdi eller uttrykk som indikerer om komponenten skal presenteres som kun lese. Standardverdi: `false`.<br /> <i>Merk at selv med read-only felt i komponenter, kan det for øyeblikket være mulig å oppdatere feltet ved å endre requesten som går til APIet eller ved et direkte API kall<i/>        |
| `renderAsSummary`      | Vis som sammendrag        | boolean       | Boolsk verdi eller uttrykk som indikerer om komponenten skal vises som et sammendrag. Standardverdi: `false`.          |
| `hidden`               | Skjult                    | boolean       | Boolsk verdi eller uttrykk som indikerer om komponenten skal skjules. Standardverdi: `false`.                          |
| `textResourceBindings` | Tekstressursbindinger     | object        | Tekstressursbindinger for en komponent.                                                                                |
| `dataModelBindings`    | Datamodellbindinger       | object        | Datamodellbindinger for en komponent                                                                                   |
| `triggers`             | Triggere                  | array         | En array med handlinger som skal utløses når data tilknyttet denne komponenten endres.                                 |
| `labelSettings`        | Innstillinger for etikett | object        | En samling med innstillinger for hvordan komponentetiketten skal vises.                                                |
| `grid`                 | Grid                      | object        | Innstillinger for komponentens rutenett (grid). Brukes til å kontrollere horisontal justering.                         |
| `pageBreak`            | Sideskift                 | object        | Kun PDF: Verdi eller uttrykk som indikerer om et sideskift skal legges til før eller etter komponenten.                |


{{% /expandlarge %}}

{{<children />}}
