---
draft: true
headless: true
hidden: true
---

```csharp
var personSignee = new ProvidedPerson
{
    CommunicationConfig = new CommunicationConfig
    {
        InboxMessage = new InboxMessage
        {
            TitleTextResourceKey = "signing.correspondence_title_common",
            SummaryTextResourceKey = "signing.correspondence_summary_stifter_organisasjon",
            BodyTextResourceKey = "signing.correspondence_body_stifter_organisasjon"
        },
        Notification = new Notification
        {
            Email = new Email
            {
                EmailAddress = stifterVirksomhet.Epost,
                SubjectTextResourceKey = "signing.email_subject",
                BodyTextResourceKey = "signing.notification_content".Replace(
                    "{0}",
                    stifterVirksomhet.Navn
                ),
            },
            Sms = new Sms
            {
                MobileNumber = stifterVirksomhet.Mobiltelefon,
                BodyTextResourceKey = "signing.notification_content".Replace(
                    "{0}",
                    stifterVirksomhet.Navn
                ),
            },
            NotificationChoice = NotificationChoice.EmailPreferred,
        }
    }
}
```
