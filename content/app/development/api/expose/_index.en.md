---
title: Exposing APIs from an app
linktitle: Expose
description: One can add more APIs than what is defined as the default API for applications developed in Altinn Studio.
toc: false
---


The applications that are developed in Altinn Studio are based on [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core) for back-end.
This provides a highly flexible environment to change and modify the applications.


## Adding an API-controller

To expose a new API to the application you have to add one or multiple API-controllers.

Below is an example from an API-controller which has been added to an app.
This is where the API path listener is set up along with API logic.


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

![Test of API in web browser](apiresponse1.png "API respons")

The code can be viewed in [This repository](https://altinn.studio/repos/ttd/mva/src/branch/master/App/controllers/CustomApiController.cs). 

You can read more details about [the possibilities for exposing an API](https://docs.microsoft.com/en-us/aspnet/core/web-api/) in the documentation for ASP.NET.
