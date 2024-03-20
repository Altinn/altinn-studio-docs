---
title: Email
description: How to create custom email notifications for apps.
weight: 400
---

## Activate generation of email notifications in your application

The email client is automatically added to the application. To use it, inject the `IEmailNotificationClient`-interface. The interface defines a method used to order an email notification from the [Altinn Notifications](https://github.com/Altinn/altinn-notifications) API.

### Code example
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
