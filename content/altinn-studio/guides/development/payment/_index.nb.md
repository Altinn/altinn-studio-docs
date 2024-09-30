---
title: Hvordan konfigurere betaling i din Altinn-app 
linktitle: Betaling
description: Følg disse grunnleggende stegene for å komme i gang med å integrere betaling i din Altinn App.
tags: [betaling]
weight: 50
---

<!-- Før du starter -->
## 1. Før du starter
Organisasjonen du lager appen for må ha en Nets Easy avtale.
Du finner informasjon om hvordan du oppretter avtalen her:
[payments.nets.eu](https://payments.nets.eu/nb-NO/checkout).


<!-- Legg til betalingsoppgave i appens prosess -->
## 2. Legg til en betalingsoppgave i appens prosess, med tilhørende konfigurasjon

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/payment/studio/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/guides/payment/backend-manual/add-process-task.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!-- Gi tilganger til den som skal betale-->
## 3. Gi tilganger til den som skal betale
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/payment/studio/access-rules.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/guides/payment/backend-manual/access-rules.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Konfigurer visning av betalingsinformasjon-->
## 4. Konfigurer visning av betalingsinformasjon
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/payment/studio/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/guides/payment/backend-manual/configure-layouts.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Beregn hva som skal betales-->
## 5. Beregn hva som skal betales
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/payment/studio/calculate-payment.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/guides/payment/backend-manual/calculate-payment.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Koble appen til NETS Easy avtalen-->
## 6. Koble appen til NETS Easy avtalen
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/payment/studio/configure-secrets.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/guides/payment/backend-manual/configure-secrets.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}
