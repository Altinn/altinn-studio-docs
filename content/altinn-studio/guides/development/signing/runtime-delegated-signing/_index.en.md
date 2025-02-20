---
title: Runtime delegated signing
linktitle: Runtime delegated
description: Follow these steps to implement runtime delegated signing in your service
tags: [signing]
weight: 50
aliases:
- /altinn-studio/guides/signing/runtime-delegated-signing
---

## What does runetime delegated singing mean?

{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/intro.nb.md" %}}

## Prerequisites
Runtime deleaged singing depends on then message service (Correspondence) in Altinn, which requires separate configuration.

The message service is used to tell the signee that they have been asked to sign a form in Altinn, and to send them a receipt of what they signed when the signature has been submitted.

See [how](/nb/correspondence/getting-started/) to get started.

## Example Application

In the following [repository](https://altinn.studio/repos/ttd/signering-brukerstyrt), you can find an example of an application with user-driven signing.

The main flow is:
1. The form filler enters the personal identification number and last name of the individuals who need to sign, or alternatively, the organization number if it is a company.
2. Once the form is completed, the filler clicks a "Go to signing" button, which moves the process to the signing step.
3. During the signing stage, the application calls an implementation of the interface ```ISigneeProvider```, which you must implement, to determine who should be delegated access to sign.
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

## 3. Tell the app who the signees are

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/signee-provider.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/signee-provider.en.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## Testing

> **Note:** Fow now, delegation mocking is not implemented in local testing, so testing must be performed in the TT02 environment.

Authorization caching may cause delays in users seeing delegated forms in their Altinn inbox if they were logged in when delegation occurred. To avoid this, delegate access to a user not used in testing for the last hour.
