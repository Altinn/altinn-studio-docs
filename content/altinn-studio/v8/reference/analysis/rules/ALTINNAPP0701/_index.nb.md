---
title: "ALTINNAPP0701: ufullstendig registrering forkastes"
description: "Resultatet av et builder-kall forkastes, men er ikke en brukbar registrering alene"
weight: 71
---

Denne diagnostikken meldes når resultatet av et kall forkastes, og returtypen er et
builder-trinn som ikke er en fullstendig registrering i seg selv. Et eksempel er
`services.AddEFormidling();`, som registrerer alt bortsett fra den ene implementasjonen
appen selv må levere.

Regelen ser kun på kall der resultatet forkastes helt — der kallet utgjør hele setningen.
Et builder-objekt som lagres i en variabel eller sendes videre, rapporteres ikke.

Kategori `Contracts`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Fullfør registreringen, for eksempel med `.WithMetadata<T>()`. Ønsker du bevisst kun det
inngangspunktet registrerer, skriv en eksplisitt forkastning — `_ = services.AddEFormidling();`
— som ikke rapporteres.
