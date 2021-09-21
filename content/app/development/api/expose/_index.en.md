---
title: Exposing APIs from an app
linktitle: Expose
description: One can add more APIs than what is defined as the default API for applications developed in Altinn Studio.
toc: false
tags: [translate-to-english]
---


The applications that are developed in Altinn Studio are based on [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core) for back-end.
This provides high flexible to change and modify the applications.


## Legge til API kontroller

For å kunne eksponere et nytt API i applikasjonen må det legges til en eller flere API kontrollere. 


Nedenfor vises et eksempel fra en API controller som er lagt til i en gitt app. 
Her settes det opp hvilken path API skal lytte på og logikken. 


```C# {linenos=false,hl_lines=[8,11]}
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Altinn.App.Api.Controllers
{
    [ApiController]
    [Route("{org}/{app}/CustomApi")]
    public class CustomApiController : ControllerBase
    {
        [HttpGet("TimeInfo")]
        public async Task<ActionResult> Get()
        {
            return Ok(DateTime.Now);
        }
    }
}
```

![Test av API i nettleser](apiresponse1.png "API respons")

Koden kan ses i [dette repositoriet](https://altinn.studio/repos/ttd/mva/src/branch/master/App/controllers/CustomApiController.cs). 

I dokumentasjonen til ASP.NET kan du lese flere detaljer om [mulighetene for å eksponere API](https://docs.microsoft.com/en-us/aspnet/core/web-api/).
