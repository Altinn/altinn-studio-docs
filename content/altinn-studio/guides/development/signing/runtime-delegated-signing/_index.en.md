---
title: Runtime delegated signing
linktitle: Runtime delegated
description: Follow these steps to implement runtime delegated signing in your service
tags: [signing]
weight: 50
aliases:
  - /altinn-studio/guides/signing/runtime-delegated-signing
---

## What does runtime delegated signing mean?

{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/intro.en.md" %}}

## Prerequisites

Runtime delegated signing depends on then message service (Correspondence) in Altinn, which requires separate configuration.

The message service is used to tell the signee that they have been asked to sign a form in Altinn, and to send them a receipt of what they signed when the signature has been submitted.

See how to get started in [this guide](/nb/correspondence/getting-started/).

## Example Application

In the following [repository](https://altinn.studio/repos/ttd/signering-brukerstyrt), you can find an example of an application with user-driven signing.

The main flow is:

1. The form filler enters the personal identification number and last name of the individuals who need to sign, or alternatively, the organization number if it is a company.
2. Once the form is completed, the filler clicks a "Go to signing" button, which moves the process to the signing step.
3. During the signing step, the application calls an implementation of the interface `ISigneeProvider`, which you must implement, to determine who should be delegated access to sign.
4. The signers are delegated rights and receive a notification that they have a signing task.
5. The signers find the form in their inbox, open it, review the data, and click "Sign."
6. The submitter also signs if the app is configured this way and then submits the form. Automatic submission is currently not supported.

Below are the key configuration steps for setting up such an application.

## 1. Add and configure a singing task in the app process

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/add-process-task.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/add-process-task.en.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 2. Add a singing layout set

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/configure-layouts.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/configure-layouts.en.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 3. Optional - Custom validation

{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/custom-validation.en.md" %}}

## 4. Optional - Setup text resources

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
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/setup-text-resources.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/setup-text-resources.en.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 5. Tell the app who the signees are

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/signee-provider.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/signee-provider.en.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 6. Testing

{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/test.en.md" %}}