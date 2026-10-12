---
draft: true
headless: true
hidden: true
---

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=1 7-8" >}}
using Altinn.App.Core.Features.Process;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  services.AddTransient<IOnTaskStartingHandler, RestrictedDataOnTaskStart>();
  services.AddTransient<IDataWriteProcessor, DataWriteHandler>();
}
{{< /highlight >}}
