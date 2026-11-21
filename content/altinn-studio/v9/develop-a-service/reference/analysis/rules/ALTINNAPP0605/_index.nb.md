---
title: "ALTINNAPP0605: DataCreation med Instance blir aldri kalt"
description: "En klasse som implementerer IInstantiationProcessor, har DataCreation med Instance, som appen aldri kaller"
weight: 65
---

Denne diagnostikken melder fra når en klasse som implementerer `IInstantiationProcessor`, eller en
baseklasse til en slik klasse, har metoden
`DataCreation(Instance instance, object data, Dictionary<string, string>? prefill)`, og ingenting i
appen kaller den. Meldingen navngir klassen som har metoden.

Denne versjonen av app-backend kaller bare
`DataCreation(IInstanceDataMutator instanceDataMutator, object data, Dictionary<string, string>? prefill)`.
Koden i den gamle metoden kjører altså aldri, selv om appen bygger. Har klassen bare den gamle
metoden, bygger ikke appen i det hele tatt, og da melder kompilatoren fra med CS0535 i stedet.

Kategori `Deprecation`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Flytt koden inn i metoden som tar en `IInstanceDataMutator`, og bruk `instanceDataMutator.Instance`
der du brukte `instance`. Slett deretter den gamle metoden. Legger koden til eller endrer
dataelementer, gjør du det gjennom `instanceDataMutator` i stedet for `IDataClient`.
`studioctl app upgrade v9` gjør endringen for deg.

Kaller appen den gamle metoden selv, for eksempel fra den nye metoden, melder ikke regelen fra.

Se [veiledningen for oppgradering fra v8 til v9]({{< relref "/altinn-studio/v9/new-in-v9/upgrade" >}}).
