---
title: Kilder
description: De ulike kildene Altinn Studio kan bruke for svaralternativer
weight: 10
---

Når du setter opp en komponent i Altinn Studio som skal ha svaralternativer, må den kobles til en kilde for svaralternativer. Det er tre forskjellige egenskaper i komponentkonfigurasjonen som kan brukes til dette, avhengig av bruksområdet:

| Egenskap    | Bruksområde                                                                                                                                                  |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `options`   | [Statiske svaralternativer definert per komponent](./static/#i-komponentkonfigurasjonen)                                                                     |
| `optionsId` | Enten [statiske svaralternativer fra json-filer](./static/#fra-json-filer), [dynamiske svaralternativer](./dynamic) eller [delte svaralternativer](./shared) |
| `source`    | [Svaralternativer fra datamodellen](./from-data-model)                                                                                                       |

Minst en slik egenskap må settes i komponentkonfigurasjonen. Hvis flere er satt, vil konfigurasjonsprioriteten være motsatt av tabellen ovenfor, slik at `source` vil ha forrang over `optionsId`, som vil ha forrang over `options`.

{{<children />}}
