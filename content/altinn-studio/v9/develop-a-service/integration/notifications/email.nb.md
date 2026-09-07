---
title: E-post
description: Slik oppretter du egendefinerte e-postvarslinger for apper.
draft: true
weight: 10
tags: [needsReview]
---

## Aktivere e-postvarsling i appen din

Appen inkluderer automatisk e-postklienten. For å bruke den, sett inn grensesnittet `IEmailNotificationClient` i konstruktøren.
Grensesnittet definerer en metode du bruker til å bestille en e-postvarsling fra API-et til [Altinn Notifications](https://github.com/Altinn/altinn-notifications).

### Kodeeksempel

Under ser du et eksempel der du prøver å sende en e-postvarsling når brukeren har begynt å fylle ut skjemaet, ved hjelp av grensesnittet `IProcessTaskStart`.

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
        // "Task_1" er navnet på skjema-steget i bpmn-prosessen
        if (taskId != "Task_1")
            return;

        try
        {
            var order = new EmailNotification
            {
                Subject = "Skjema startet",
                Body = "Du har startet innfylling av skjema",
                SendersReference = "<min-skjema-ref>",
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

Deretter må du registrere klassen `EmailOnStart` som `IProcessTaskStart` i `Program.cs`.

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
