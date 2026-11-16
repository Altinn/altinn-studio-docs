---
draft: true
title: "ALTINNAPP0501: async method returns void"
description: "Async methods in the app must return Task, not void"
weight: 51
---

This diagnostic is reported when an async method, local function or lambda in the app returns
`void`, that is `async void`.

Category `CodeSmells`, severity **error**. The rule therefore fails the build.

`async void` is dangerous in app code for two reasons:

- The code that calls the method cannot wait for it to finish. The app carries on before the work
  is done, for example to the next step in the process.
- You cannot catch exceptions from the method where you call it. An exception stops the whole app,
  not just the request, and affects everyone using the app at that moment.

Make the method return `Task` instead, and `await` it where you call it.

Incorrect:

```csharp
public async void SendReceipt(Instance instance)
{
    await _client.SendAsync(instance);
}
```

Correct:

```csharp
public async Task SendReceipt(Instance instance)
{
    await _client.SendAsync(instance);
}
```

Microsoft explains the technical details in
[Async/Await – Best Practices in Asynchronous Programming](https://learn.microsoft.com/en-us/archive/msdn-magazine/2013/march/async-await-best-practices-in-asynchronous-programming#avoid-async-void)
and in
[Async return types](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-return-types#void-return-type).
