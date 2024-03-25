---
title: SMS
description: Hvordan opprette egendefinerte SMS-varslinger for apper.
weight: 400
---

## Aktiver generering av SMS-varslinger i applikasjonen din

SMS-klienten legges automatisk til i applikasjonen. For å bruke den, injiser `ISmsNotificationClient`-interface. 
Interfacet definerer en metode som brukes til å bestille en SMS-varsling fra [Altinn Notifications](https://github.com/Altinn/altinn-notifications) API.

### Kodeeksempel

Under ser vi et eksempel hvor vi prøver å sende SMS-varsling når en bruker har startet utfylling av skjema, ved hjelp av `IProcessTaskStart`.

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
                Body = "Du har started innfylling av skjema",
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

Deretter må vi registrere klassen `SmsOnStart` som `IProcessTaskStart` i `Program.cs`.

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
