---
draft: true
title: Payment
linktitle: Payment
description: Follow these steps to implement Payment in your App
tags: [payment]

aliases:
- /altinn-studio/v8/guides/payment/
---

## 1. Before you begin
Create Nets Easy agreement here: [payments.nets.eu](https://payments.nets.eu/nb-NO/checkout).

<!-- Legg til betalingsoppgave i appens prosess -->
## 2. Add a payment task to the app process, with basic configuration

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/studio/add-process-task.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/backend-manual/add-process-task.en.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!-- Gi tilganger til den som skal betale og tjenesteeieren -->
## 3. Authorise the payer and the service owner
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/studio/access-rules.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/backend-manual/access-rules.en.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}

When Nets notifies the app that the payment is complete, the app updates the payment information and advances the process on behalf of the service owner. In `App/config/authorization/policy.xml`, `[org]` must therefore have the `read` and `write` actions for the app and the `confirm` action for the payment task.

Altinn Studio automatically adds the standard Maskinporten scopes for service owners to apps that use Altinn App v9. However, you must still verify that the authorisation policy grants the required actions to the service owner. See [integrating with Maskinporten](/en/altinn-studio/v9/develop-a-service/integration/maskinporten/). Build and deploy the app again after changing the scopes or the authorisation policy.


<!--Konfigurer visning av betalingsinformasjon-->
## 4. Configure display of payment information in form
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/studio/configure-layouts.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/backend-manual/configure-layouts.en.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Beregn hva som skal betales-->
## 5. Calculate amount to pay
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/studio/calculate-payment.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/backend-manual/calculate-payment.en.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Koble appen til NETS Easy avtalen-->
## 6. Connect the app to the NETS Easy agreement
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/studio/configure-secrets.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/backend-manual/configure-secrets.en.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


## 7. Automatically advance the process after payment

The built-in Nets Easy integration registers a webhook when it creates a payment. When Nets reports a completed payment, the app verifies the payment status with Nets, updates the payment information, and advances the payment task if the status is `Paid`. This happens on the server and does not depend on the user returning to the app after payment.

Only the payment task is completed automatically. If the next process element is an end event, the instance is also completed. Otherwise, the instance advances to the next process task.

For automatic advancement to work:

- Configure the service owner permissions described in [step 3](#3-authorise-the-payer-and-the-service-owner).
- Build and deploy the app again after changing the configuration.
- Start a new payment after deployment. The webhook is registered when the payment is created, so payments created before the change do not receive the new callback.

The webhook is not registered during local development. Test this flow in a deployed test environment.
