---
title: Slik konfigurerer du betaling i din Altinn-app
linktitle: Betaling
description: Følg disse grunnleggende stegene for å komme i gang med å integrere betaling i din Altinn App.
tags: [betaling, needsReview, needsTranslation]
weight: 30
aliases:
- /nb/altinn-studio/v8/guides/payment/
---

<!-- Før du starter -->
## 1. Før du starter
Organisasjonen du lager appen for, må ha en Nets Easy-avtale.
Du finner informasjon om hvordan du oppretter avtalen her:
[payments.nets.eu](https://payments.nets.eu/nb-NO/checkout).


<!-- Legg til betalingsoppgave i appens prosess -->
## 2. Legge til en betalingsoppgave i appens prosess, med tilhørende konfigurasjon

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v10/develop-a-service/payment/studio/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v10/develop-a-service/payment/backend-manual/add-process-task.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!-- Gi tilganger til den som skal betale-->
## 3. Gi tilgang til den som skal betale
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v10/develop-a-service/payment/studio/access-rules.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v10/develop-a-service/payment/backend-manual/access-rules.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Konfigurer visning av betalingsinformasjon-->
## 4. Konfigurere visning for betalingsinformasjon
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v10/develop-a-service/payment/studio/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v10/develop-a-service/payment/backend-manual/configure-layouts.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Beregn hva som skal betales-->
## 5. Beregne hva som skal betales
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v10/develop-a-service/payment/studio/calculate-payment.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v10/develop-a-service/payment/backend-manual/calculate-payment.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Koble appen til NETS Easy avtalen-->
## 6. Koble appen til NETS Easy-avtalen
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v10/develop-a-service/payment/studio/configure-secrets.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v10/develop-a-service/payment/backend-manual/configure-secrets.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}
