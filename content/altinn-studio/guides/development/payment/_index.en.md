---
title: Payment
linktitle: Payment
description: Follow these steps to implement Payment in your App
tags: [payment]
weight: 50
aliases:
- /altinn-studio/guides/payment/
---

## 1. Before you begin
1. Create Nets Easy agreement here: [payments.nets.eu](https://payments.nets.eu/nb-NO/checkout).

<!-- Legg til betalingsoppgave i appens prosess -->
## 2. Add a payment task to the app process, with basic configuration

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/payment/studio/add-process-task.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/payment/backend-manual/add-process-task.en.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!-- Gi tilganger til den som skal betale-->
## 3. Ensure correct authorization for payment task
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/payment/studio/access-rules.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/payment/backend-manual/access-rules.en.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Konfigurer visning av betalingsinformasjon-->
## 4. Configure display of payment information in form
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/payment/studio/configure-layouts.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/payment/backend-manual/configure-layouts.en.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Beregn hva som skal betales-->
## 5. Calculate amount to pay
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/payment/studio/calculate-payment.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/payment/backend-manual/calculate-payment.en.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Koble appen til NETS Easy avtalen-->
## 6. Connect the app to the NETS Easy agreement
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/payment/studio/configure-secrets.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/payment/backend-manual/configure-secrets.en.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}
