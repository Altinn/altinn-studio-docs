---
title: SMS
description: Slik oppretter du egendefinerte SMS-varslinger for apper.
draft: true
weight: 20
tags: [needsReview]
---

## Aktivere SMS-varsling i appen din

Appen inkluderer automatisk SMS-klienten. For å bruke den, sett inn grensesnittet `ISmsNotificationClient` i konstruktøren.
Grensesnittet definerer en metode du bruker til å bestille en SMS-varsling fra API-et til [Altinn Notifications](https://github.com/Altinn/altinn-notifications).

### Kodeeksempel

Under ser du et eksempel der du prøver å sende en SMS-varsling når brukeren har begynt å fylle ut skjemaet, ved hjelp av grensesnittet `IProcessTaskStart`.

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
        // "Task_1" er navnet på skjema-steget i bpmn-prosessen
        if (taskId != "Task_1")
            return;

        try
        {
            var order = new SmsNotification
            {
                SenderNumber = "<sender>",
                Body = "Du har startet innfylling av skjema",
                SendersReference = "<min-skjema-ref>",
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

Deretter må du registrere klassen `SmsOnStart` som `IProcessTaskStart` i `Program.cs`.

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
