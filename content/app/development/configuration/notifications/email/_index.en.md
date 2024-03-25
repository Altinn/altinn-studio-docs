---
title: Email
description: How to create custom email notifications for apps.
weight: 400
---

## Activate generation of email notifications in your application

The email client is automatically added to the application. To use it, inject the `IEmailNotificationClient`-interface. 
The interface defines a method used to order an email notification from the [Altinn Notifications](https://github.com/Altinn/altinn-notifications) API.

### Code example

Below we see an example of trying to send an email notification when a user starts to fill out a form, by using the `IProcessTaskStart` interface.
The code for registration of `EmailOnStart` in `Program.cs` has been omitted for brevity.

```csharp
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
        if (taskId != "Task_1")
            return;

        try
        {
            var order = new EmailNotification
            {
                Subject = "Form started",
                Body = "You started filling out a form",
                SendersReference = "<my-schema-ref>",
                Recipients = [new("firstname.lastname@email.com")],
            };
            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10));
            var orderResult = await emailNotificationClient.Order(order, cts.Token);
            logger.LogInformation(
                "Task started, email sent to {Number} - OrderId={OrderId}",
                order.Recipients[0].EmailAddress,
                orderResult.OrderId
            );
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error sending email on task start");
        }
    }
}
```