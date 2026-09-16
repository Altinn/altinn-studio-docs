---
title: SMS
description: How to create custom SMS notifications for apps.
draft: true
weight: 20
tags: [needsReview]
---

## Activate SMS notifications in your app

The app includes the SMS client automatically. To use it, inject the `ISmsNotificationClient` interface in the constructor.
The interface defines a method you use to order an SMS notification from the [Altinn Notifications](https://github.com/Altinn/altinn-notifications) API.

### Code example

Below is an example where you try to send an SMS notification once the end user has started filling in the form, using the `IProcessTaskStart` interface.

```csharp file=SmsOnStart.cs
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Internal.Notifications.Sms;
using Altinn.App.Core.Models.Notifications.Sms;
using Altinn.Platform.Storage.Interface.Models;
using Microsoft.Extensions.Logging;

namespace Altinn.App.Core;

public class SmsOnStart(ILogger<SmsOnStart> logger, ISmsNotificationClient smsNotificationClient)
    : IProcessTaskStart
{
    public async Task Start(string taskId, Instance instance, Dictionary<string, string> prefill)
    {
        // "Task_1" is the name of the form step in the bpmn process
        if (taskId != "Task_1")
            return;

        try
        {
            var order = new SmsNotification
            {
                SenderNumber = "<sender>",
                Body = "You have started filling in a form",
                SendersReference = "<my-form-ref>",
                Recipients = [new("0047XXXXXXXX")],
            };
            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10));
            var orderResult = await smsNotificationClient.Order(order, default);
            logger.LogInformation(
                "Task started, SMS sent to {MobileNumber} - OrderId={OrderId}",
                order.Recipients[0].MobileNumber,
                orderResult.OrderId
            );
        }
        catch (SmsNotificationException e)
        {
            logger.LogError(e, "Error sending SMS on task start");
        }
    }
}
```

You must then register the `SmsOnStart` class as `IProcessTaskStart` in `Program.cs`.

```csharp file=Program.cs
using Altinn.App.Core;
using Altinn.App.Core.Features;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddSingleton<IProcessTaskStart, SmsOnStart>();
}
```
