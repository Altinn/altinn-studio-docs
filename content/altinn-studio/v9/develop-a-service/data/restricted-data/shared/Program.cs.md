---
draft: true
headless: true
hidden: true
---

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

{{< highlight csharp "linenos=false,hl_lines=5-6" >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
  // ...

  services.AddTransient<IOnTaskStartingHandler, RestrictedDataOnTaskStart>();
  services.AddTransient<IDataWriteProcessor, DataWriteHandler>();
}
{{< /highlight >}}
