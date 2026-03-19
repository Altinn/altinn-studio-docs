---
draft: true
title: Kilder
description: De ulike kildene Altinn Studio kan bruke for svaralternativer
weight: 10
tags: [needsReview, translate]
---

Når du setter opp en komponent i Altinn Studio som skal ha svaralternativer, må du koble den til en kilde for svaralternativer. Det er tre forskjellige egenskaper i komponentkonfigurasjonen du kan bruke til dette, avhengig av bruksområdet:

| Egenskap    | Bruksområde                                                                                                                                          |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `options`   | [Statiske svaralternativer definert per komponent](./static/#i-komponentkonfigurasjonen-svaralternativer)                                            |
| `optionsId` | Enten [statiske kodelister fra json-filer](./static/#fra-json-filer-kodeliste), [dynamiske kodelister](./dynamic) eller [delte kodelister](./shared) |
| `source`    | [Kodelister fra datamodellen](./from-data-model)                                                                                                     |

Du må sette minst én slik egenskap i komponentkonfigurasjonen. Hvis du setter flere, vil `source` ha forrang over `optionsId`, som vil ha forrang over `options`.

{{<children />}}
