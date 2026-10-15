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

Under ser du et eksempel der appen sender en SMS-varsling når brukeren har begynt å fylle ut skjemaet. Eksempelet bruker en [prosess-hook](/nb/altinn-studio/v9/develop-a-service/reference/configuration/process/pre-post-hooks/) som implementerer `IOnTaskStartingHandler`.

Hooken kan bli kjørt på nytt hvis den feiler. Bestill derfor SMS-en som det siste hooken gjør, slik at et nytt forsøk ikke sender den samme SMS-en to ganger.

```csharp file=SmsOnStart.cs
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Features.Process;
using Altinn.App.Core.Models.Notifications.Sms;
using Microsoft.Extensions.Logging;

namespace Altinn.App;

public class SmsOnStart(ILogger<SmsOnStart> logger, ISmsNotificationClient smsNotificationClient)
    : IOnTaskStartingHandler
{
    // "Task_1" er id-en til skjemasteget i BPMN-prosessen
    public bool ShouldRunForTask(string taskId) => taskId == "Task_1";

    public async Task<HookResult> Execute(OnTaskStartingContext context)
    {
        var order = new SmsNotification
        {
            SenderNumber = "<sender>",
            Body = "Du har startet innfylling av skjema",
            SendersReference = "<min-skjema-ref>",
            Recipients = [new("0047XXXXXXXX")],
        };

        try
        {
            var orderResult = await smsNotificationClient.Order(order, context.CancellationToken);
            logger.LogInformation(
                "Task started, SMS sent to {MobileNumber} - OrderId={OrderId}",
                order.Recipients[0].MobileNumber,
                orderResult.OrderId
            );
        }
        catch (SmsNotificationException e)
        {
            // Prosessen går videre selv om SMS-en ikke ble sendt
            logger.LogError(e, "Error sending SMS on task start");
        }

        return HookResult.Success();
    }
}
```

I eksempelet går prosessen videre selv om bestillingen feiler. Skal prosessen heller vente og prøve på nytt, returnerer du `HookResult.FailedRetryable("melding")` i `catch`-blokken. Da venter prosessen til bestillingen lykkes, og den stopper hvis alle forsøkene feiler.

Deretter må du registrere klassen `SmsOnStart` som `IOnTaskStartingHandler` i `Program.cs`.

```csharp file=Program.cs
using Altinn.App;
using Altinn.App.Core.Features.Process;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddTransient<IOnTaskStartingHandler, SmsOnStart>();
}
```