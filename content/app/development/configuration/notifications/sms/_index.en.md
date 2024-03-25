---
title: SMS
description: How to create custom SMS notifications for apps.
weight: 400
---

## Activate generation of SMS notifications in your application

The SMS client is automatically added to the application. To use it, inject the `IEmailNotificationClient`-interface. 
The interface defines a method used to order an email notification from the [Altinn Notifications](https://github.com/Altinn/altinn-notifications) API.

### Code example

Below we see an example of trying to send a SMS notification when a user starts to fill out a form, by using the `IProcessTaskStart` interface.
The code for registration of `SmsOnStart` in `Program.cs` has been omitted for brevity.

```csharp
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
        if (taskId != "Task_1")
            return;

        try
        {
            var order = new SmsNotification
            {
                SenderNumber = "<sender>",
                Body = "You started filling out a form",
                SendersReference = "<my-schema-ref>",
                Recipients = [new("0047XXXXXXXX")],
            };
            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10));
            var orderResult = await smsNotificationClient.Order(order, default);
            logger.LogInformation(
                "Task started, SMS sent to {Number} - OrderId={OrderId}",
                order.Recipients[0].MobileNumber,
                orderResult.OrderId
            );
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error sending SMS on task start");
        }
    }
}
```