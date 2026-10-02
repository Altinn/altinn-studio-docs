---
title: Email
description: How to create custom email notifications for apps.
draft: true
weight: 10
tags: [needsReview]
---

## Activate email notifications in your app

The app includes the email client automatically. To use it, inject the `IEmailNotificationClient` interface in the constructor.
The interface defines a method you use to order an email notification from the [Altinn Notifications](https://github.com/Altinn/altinn-notifications) API.

### Code example

Below is an example where you try to send an email notification once the end user has started filling in the form, using the `IProcessTaskStart` interface.

```csharp file=EmailOnStart.cs
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Internal.Notifications.Email;
using Altinn.App.Core.Models.Notifications.Email;
using Altinn.Platform.Storage.Interface.Models;
using Microsoft.Extensions.Logging;

namespace Altinn.App.Core;

public class EmailOnStart(ILogger<EmailOnStart> logger, IEmailNotificationClient emailNotificationClient)
    : IProcessTaskStart
{
    public async Task Start(string taskId, Instance instance, Dictionary<string, string> prefill)
    {
        // "Task_1" is the name of the form step in the bpmn process
        if (taskId != "Task_1")
            return;

        try
        {
            var order = new EmailNotification
            {
                Subject = "Form started",
                Body = "You have started filling in a form",
                SendersReference = "<my-form-ref>",
                Recipients = [new("navn.navnesen@epost.no")],
            };
            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10));
            var orderResult = await emailNotificationClient.Order(order, cts.Token);
            logger.LogInformation(
                "Task started, email sent to {EmailAddress} - OrderId={OrderId}",
                order.Recipients[0].EmailAddress,
                orderResult.OrderId
            );
        }
        catch (EmailNotificationException e)
        {
            logger.LogError(e, "Error sending email on task start");
        }
    }
}
```

You must then register the `EmailOnStart` class as `IProcessTaskStart` in `Program.cs`.

```csharp file=Program.cs
using Altinn.App.Core;
using Altinn.App.Core.Features;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddSingleton<IProcessTaskStart, EmailOnStart>();
}
```
