---
title: E-post
description: Hvordan opprette egendefinerte e-postvarslinger for apper.
weight: 400
---

## Aktiver generering av e-postvarslinger i applikasjonen din

E-postklienten legges automatisk til i applikasjonen. For å bruke den, injiser `IEmailNotificationClient`-interface. 
Interfacet definerer en metode som brukes til å bestille en e-postvarsling fra [Altinn Notifications](https://github.com/Altinn/altinn-notifications) API.

### Kodeeksempel

Under ser vi et eksempel hvor vi prøver å sende e-postvarsling når en bruker har startet utfylling av skjema, ved hjelp av `IProcessTaskStart`.
Koden for registrering av `EmailOnStart` i `Program.cs` er utelatt for korthets skyld.

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
                Subject = "Skjema startet",
                Body = "Du har startet innfylling av skjema",
                SendersReference = "<min-skjema-ref>",
                Recipients = [new("navn.navnesen@epost.no")],
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