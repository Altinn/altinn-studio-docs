---
title: E-post
description: Slik sender du e-post til brukere fra appen din.
draft: true
weight: 10
tags: [Reviewed]
---

## Aktivere e-postvarsling i appen din

E-postklienten er allerede registrert i appen. Du bruker den ved å ta inn grensesnittet `IEmailNotificationClient` i konstruktøren til klassen din.
Grensesnittet definerer en metode du bruker til å bestille en e-postvarsling fra [Altinn Varslinger-API-et]({{< relref "/notifications" >}}).

### Kodeeksempel

Nedenfor ser du et eksempel der appen sender en e-postvarsling når brukeren har begynt å fylle ut skjemaet. Eksempelet bruker en [prosess-hook]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/process/pre-post-hooks" >}}) som implementerer `IOnTaskStartingHandler`.

Prosessen kan kjøre hooken på nytt hvis den feiler. Bestill derfor e-posten som det siste hooken gjør, slik at et nytt forsøk ikke sender den samme e-posten to ganger.

```csharp file=EmailOnStart.cs
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Features.Process;
using Altinn.App.Core.Models.Notifications.Email;
using Microsoft.Extensions.Logging;

namespace Altinn.App;

public class EmailOnStart(ILogger<EmailOnStart> logger, IEmailNotificationClient emailNotificationClient)
    : IOnTaskStartingHandler
{
    // "Task_1" er id-en til skjemasteget i BPMN-prosessen
    public bool ShouldRunForTask(string taskId) => taskId == "Task_1";

    public async Task<HookResult> Execute(OnTaskStartingContext context)
    {
        var order = new EmailNotification
        {
            Subject = "Skjema startet",
            Body = "Du har begynt å fylle ut skjemaet",
            SendersReference = "<min-skjema-ref>",
            Recipients = [new("navn.navnesen@epost.no")],
        };

        try
        {
            var orderResult = await emailNotificationClient.Order(order, context.CancellationToken);
            logger.LogInformation(
                "Task started, email sent to {EmailAddress} - OrderId={OrderId}",
                order.Recipients[0].EmailAddress,
                orderResult.OrderId
            );
        }
        catch (EmailNotificationException e)
        {
            // Prosessen går videre selv om e-posten ikke ble sendt
            logger.LogError(e, "Error sending email on task start");
        }

        return HookResult.Success();
    }
}
```

I eksempelet går prosessen videre selv om bestillingen feiler. Skal prosessen heller vente og prøve på nytt, returnerer du `HookResult.FailedRetryable("melding")` i `catch`-blokken. Da venter prosessen til bestillingen lykkes, og den stopper hvis alle forsøkene feiler.

Deretter må du registrere klassen `EmailOnStart` som `IOnTaskStartingHandler` i `Program.cs`.

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp file=Program.cs
using Altinn.App;
using Altinn.App.Core.Features.Process;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddTransient<IOnTaskStartingHandler, EmailOnStart>();
}
```