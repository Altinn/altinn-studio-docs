---
headless: true
hidden: true
---

```csharp
// Minimal: notify by SMS and email using the default texts and the
// registered contact information of the signee.
var minimalSignee = new ProvidedPerson
{
    FullName = fullName,
    SocialSecurityNumber = socialSecurityNumber,
    CommunicationConfig = new CommunicationConfig
    {
        NotificationChoice = NotificationChoice.SmsAndEmail,
    },
};

// Full override of texts and contact information.
var personSignee = new ProvidedPerson
{
    FullName = fullName,
    SocialSecurityNumber = socialSecurityNumber,
    CommunicationConfig = new CommunicationConfig
    {
        InboxMessage = new InboxMessage
        {
            TitleTextResourceKey = "signing.correspondence_title_common",
            SummaryTextResourceKey = "signing.correspondence_summary_stifter_person",
            BodyTextResourceKey = "signing.correspondence_body_stifter_person",
        },
        Notification = new Notification
        {
            Email = new Email
            {
                EmailAddress = stifterPerson.Epost,
                SubjectTextResourceKey = "signing.email_subject",
                BodyTextResourceKey = "signing.notification_content",
            },
            Sms = new Sms
            {
                MobileNumber = stifterPerson.Mobiltelefon,
                BodyTextResourceKey = "signing.notification_content",
            },
        },
        // Optional: send a reminder if the signee has not acted. Uses the default reminder texts.
        ReminderNotification = new Notification(),
        NotificationChoice = NotificationChoice.EmailPreferred,
    },
};
```
