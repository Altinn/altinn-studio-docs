---
title: E-post
description: Hvordan opprette egendefinerte e-postvarslinger for apper.
weight: 400
---

## Aktiver generering av e-postvarslinger i applikasjonen din

E-postklienten legges automatisk til i applikasjonen. For å bruke den, injiser `IEmailNotificationClient`-interface. IEmailNotificationClient definerer en metode som brukes til å bestille en e-postvarsling fra [Altinn Notifications](https://github.com/Altinn/altinn-notifications) API.

### Kodeeksempel
```csharp
using Altinn.App.Core.Internal.Email;
using Altinn.App.Core.Models.Email;
using Altinn.Platform.Storage.Interface.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Altinn.App.Custom;

public class CustomEmailClass(IEmailNotificationClient emailNotificationClient)
{
    private readonly IEmailNotificationClient _emailNotificationClient = emailNotificationClient;

    public async Task OrderEmail(string subject, string body, List<EmailRecipient> emailRecipients, string sendersReference)
    {
        var emailNotification = new EmailNotification(subject, body, emailRecipients, sendersReference);
        var emailOrderResponse = await _emailNotificationClient.Order(emailNotification, new System.Threading.CancellationToken());
        ...
    }
}
```
