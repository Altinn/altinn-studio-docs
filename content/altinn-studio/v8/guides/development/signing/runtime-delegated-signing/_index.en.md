---
title: Runtime delegated signing
linktitle: Runtime delegated
description: Follow these steps to implement runtime delegated signing in your service
tags: [signing]
weight: 50
aliases:
  - /altinn-studio/guides/signing/runtime-delegated-signing
---

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/style.css.md" %}}

{{%notice info%}}
Available from [v8.6.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.6.0)
{{%/notice%}}

## What is runtime delegated signing?
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/intro.en.md" %}}

## Prerequisites

### Maskinporten
Maskinporten is required both for the [messaging service](#correspondence) and the interaction with [restricted data](/en/altinn-studio/v8/guides/development/restricted-data/).

If you need help setting up a Maskinporten integration for your app, you can find all the information you need in [this guide](/en/altinn-studio/v8/guides/integration/maskinporten/).

### Correspondence
Runtime delegated signing depends on the messaging service ([Correspondence](/en/correspondence/)) in Altinn, which requires separate configuration.

The message service is used to tell the signee that they have been asked to sign a form in Altinn, and to send them a receipt of what they signed when the signature has been submitted.

See how to get started in [this guide](/en/correspondence/getting-started/).

## Example Application
In the following [repository](https://altinn.studio/repos/ttd/signering-brukerstyrt), you can find an example of an application with runtime delegated signing.

The main flow is: 

1. The form filler enters the personal identification number and last name of the individuals who need to sign, or alternatively, the organization number if it is a company.
2. Once the form is completed, the filler clicks a "Go to signing" button, which moves the process to the signing step.
3. During the signing step, the application calls an implementation of the interface `ISigneeProvider` to determine who should be delegated access to sign.
4. The signers are delegated rights and receive a notification that they have a signing task.
5. The signers find the form in their inbox, open it, review the data, and click "Sign."
6. The submitter also signs if the app is configured this way and then submits the form.

Below are the key configuration steps for setting up such an application.

## 1. Add and configure a signing task in the app process

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/add-process-task.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/studio/add-process-task.en.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 2. Add a signing layout set

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}} 
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/configure-layouts.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/studio/configure-layouts.en.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 3. Optional - Custom validation

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/custom-validation.en.md" %}}

## 4. Tell the app who the signees are

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/signee-provider.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/studio/signee-provider.en.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 5. Optional - Setup text resources

This section is only relevant for those who want to override the standard texts in the communication with the signees.

The standard values for the communication texts are as follows:

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Standard texts - english">}}
| Tekst                                    | StandardVerdi |
| ---------------------------------------- | ------------- |
| Inbox message to signee - title     | "{appName}: Task for signing" |
| Inbox message to signee - summary | "Your signature is requested for {appName}." |
| Inbox message to signee - content    | "You have a task waiting for your signature. <a href=\"{instanceUrl}\">Click here to open the application</a>.<br /><br />If you have any questions, you can contact {appOwner}." |
| Sms to signee - content               | "Your signature is requested for {appName}. Open your Altinn inbox to proceed." |
| Email to signee - emne               | "{appName}: Task for signing" |
| Email to signee - content            | "Your signature is requested for {appName}. Open your Altinn inbox to proceed.<br /><br />If you have any questions, you can contact {appOwner}." |
| Receipt to signee - title         | "{appName}: Signature confirmed" |
| Receipt to signee - summary     | "Your signature has been registered for {appName}." |
| Receipt to signee - content        | "The signed documents are attached. They may be downloaded. <br /><br />If you have any questions, you can contact {appOwner}." |
{{</content-version-container>}}
{{<content-version-container version-label="Standard texts - bokmål">}}
| Tekst                                    | StandardVerdi |
| ---------------------------------------- | ------------- |
| Inbox message to signee - title     | "{appName}: Oppgave til signering" |
| Inbox message to signee - summary | "Din signatur ventes for {appName}." |
| Inbox message to signee - content    | "Du har en oppgave som venter på din signatur. <a href=\"{instanceUrl}\">Klikk her for å åpne applikasjonen</a>.<br /><br />Hvis du lurer på noe, kan du kontakte {appOwner}." |
| Sms to signee - content               | "Din signatur ventes for {appName}. Åpne Altinn-innboksen din for å fortsette." |
| Email to signee - emne               | "{appName}: Oppgave til signering" |
| Email to signee - content            | "Din signatur ventes for {appName}. Åpne Altinn-innboksen din for å fortsette.<br /><br />Hvis du lurer på noe, kan du kontakte {appOwner}." |
| Receipt to signee - title         | "{appName}: Signeringen er bekreftet" |
| Receipt to signee - summary     | "Du har signert for {appName}." |
| Receipt to signee - content        | "Dokumentene du har signert er vedlagt. Disse kan lastes ned om ønskelig. <br /><br />Hvis du lurer på noe, kan du kontakte {appOwner}." |
{{</content-version-container>}}
{{<content-version-container version-label="Standard texts - nynorsk">}}
| Tekst                                    | StandardVerdi |
| ---------------------------------------- | ------------- |
| Inbox message to signee - title     | "{appName}: Oppgåve til signering" |
| Inbox message to signee - summary | "Signaturen din vert venta for {appName}." |
| Inbox message to signee - content    | "Du har ei oppgåve som ventar på signaturen din. <a href=\"{instanceUrl}\">Klikk her for å opne applikasjonen</a>.<br /><br />Om du lurer på noko, kan du kontakte {appOwner}." |
| Sms to signee - content               | "Signaturen din vert venta for {appName}. Opne Altinn-innboksen din for å gå vidare." |
| Email to signee - emne               | "{appName}: Oppgåve til signering" |
| Email to signee - content            | "Signaturen din vert venta for {appName}. Opne Altinn-innboksen din for å gå vidare.<br /><br />Om du lurer på noko, kan du kontakte {appOwner}." |
| Receipt to signee - title         | "{appName}: Signeringa er stadfesta" |
| Receipt to signee - summary     | "Du har signert for {appName}." |
| Receipt to signee - content        | "Dokumenta du har signert er vedlagde. Dei kan lastast ned om ønskeleg. <br /><br />Om du lurer på noko, kan du kontakte {appOwner}." |
{{</content-version-container>}}
{{</content-version-selector>}}

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/setup-text-resources.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/studio/setup-text-resources.en.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 6. Optional - Customize how to notify the signees

Note that `CommunicationConfig` is optional. Here you may override the standard texts used in communication with the signees,
as explained in the previous section. You may also override the email address and phone number for the signees. 

{{% notice info %}}
By default, a message 
will be sent to the signees altinn inbox with a link to the relevant application instance and a notification
will be sent via email. The default texts described in the previous section will be used.
{{% /notice %}}

If not overridden, the email addresses and the phone numbers used are populated as described in [Recipient lookup](/en/notifications/explanation/recipient-lookup/) 
and [Address lookup](/en/notifications/explanation/address-lookup/).

These are the possible override configurations for the signee communication:

| Property                                                      | Description                                         | Type                              |
| ------------------------------------------------------------- | --------------------------------------------------- | --------------------------------- |
| CommunicationConfig                                           | The object for communication configuration          | Object                            |
| CommunicationConfig.InboxMessage                              | The object for inbox message configuration          | Object                            |
| CommunicationConfig.InboxMessage.TitleTextResourceKey         | The text resource key for the inbox message title   | String                            |
| CommunicationConfig.InboxMessage.SummaryTextResourceKey       | The text resource key for the inbox message summary | String                            |
| CommunicationConfig.InboxMessage.BodyTextResourceKey          | The text resource key for the inbox message body    | String                            |
| CommunicationConfig.Notification                              | The object for notification configuration           | Object                            |
| CommunicationConfig.Notification.Email                        | The object for email notification configuration     | Object                            |
| CommunicationConfig.Notification.Email.EmailAddress           | The text resource key for the email address         | String                            |
| CommunicationConfig.Notification.Email.SubjectTextResourceKey | The text resource key for the email subject         | String                            |
| CommunicationConfig.Notification.Email.BodyTextResourceKey    | The text resource key for the email body            | String                            |
| CommunicationConfig.Notification.Sms                          | The object for sms notification configuration       | Object                            |
| CommunicationConfig.Notification.Sms.MobileNumber             | The text resource key for the mobile number         | String                            |
| CommunicationConfig.Notification.Sms.BodyTextResourceKey      | The text resource key for the sms body              | String                            |
| CommunicationConfig.Notification.NotificationChoice           | The notification preferrence choice                 | NotificationChoice enum (String)  |

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/communication-config.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/studio/communication-config.en.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 7. Testing
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/test.en.md" %}}