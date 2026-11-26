---
title: "ALTINNAPP0502: asynkron metode returnerer void"
description: "Asynkrone metoder i appen må returnere Task, ikke void"
weight: 52
---

Denne diagnostikken melder fra når en asynkron metode, lokal funksjon eller lambda i appen
returnerer `void`, altså `async void`.

Kategori `CodeSmells`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

`async void` er farlig i app-kode av to grunner:

- Koden som kaller metoden, kan ikke vente på at den blir ferdig. Appen går videre før arbeidet
  er gjort, for eksempel til neste steg i prosessen.
- Du kan ikke fange opp unntak fra metoden der du kaller den. Et unntak stopper hele appen,
  ikke bare forespørselen, og rammer alle som bruker appen akkurat da.

La metoden returnere `Task` i stedet, og vent på den med `await` der du kaller den.

Feil:

```csharp
public async void SendKvittering(Instance instance)
{
    await _client.SendAsync(instance);
}
```

Riktig:

```csharp
public async Task SendKvittering(Instance instance)
{
    await _client.SendAsync(instance);
}
```

En lambda du sender til `List.ForEach`, kan ikke returnere `Task`, fordi `ForEach` ikke venter
på den. Bruk en `foreach`-løkke i stedet, og vent på hvert kall med `await`.

Feil:

```csharp
instances.ForEach(async instance => await _client.SendAsync(instance));
```

Riktig:

```csharp
foreach (var instance in instances)
{
    await _client.SendAsync(instance);
}
```

Microsoft forklarer de tekniske detaljene i
[Async/Await – Best Practices in Asynchronous Programming](https://learn.microsoft.com/en-us/archive/msdn-magazine/2013/march/async-await-best-practices-in-asynchronous-programming#avoid-async-void)
og i
[Async return types](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-return-types#void-return-type).
