---
draft: true
title: Slik setter du opp betaling i appen
linktitle: Betaling
description: Slik integrerer du betaling i Altinn-appen din.
tags: [betaling, needsReview, needsTranslation]

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
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/studio/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/backend-manual/add-process-task.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!-- Gi tilganger til den som skal betale og tjenesteeieren -->
## 3. Gi tilgang til den som skal betale og tjenesteeieren
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/studio/access-rules.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/backend-manual/access-rules.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}

Når Nets varsler appen om at betalingen er fullført, oppdaterer appen betalingsinformasjonen og fører prosessen videre på vegne av tjenesteeieren. I `App/config/authorization/policy.xml` må `[org]` derfor ha handlingene `read` og `write` for appen og `confirm` for betalingsoppgaven.

Altinn Studio legger automatisk til standardscopene for tjenesteeier i Maskinporten for apper som bruker Altinn App v9. Kontroller likevel at autorisasjonspolicyen gir tjenesteeieren de nødvendige handlingene. Se [integrasjon med Maskinporten](/nb/altinn-studio/v9/develop-a-service/integration/maskinporten/). Bygg og publiser appen på nytt etter at du har endret scopene eller autorisasjonspolicyen.


<!--Konfigurer visning av betalingsinformasjon-->
## 4. Konfigurere visning for betalingsinformasjon
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/studio/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/backend-manual/configure-layouts.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Beregn hva som skal betales-->
## 5. Beregne hva som skal betales
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/studio/calculate-payment.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/backend-manual/calculate-payment.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Koble appen til NETS Easy avtalen-->
## 6. Koble appen til NETS Easy-avtalen
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/studio/configure-secrets.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v9/develop-a-service/process/payment/backend-manual/configure-secrets.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


## 7. Automatisk videreføring etter fullført betaling

Den innebygde Nets Easy-integrasjonen registrerer en webhook når den oppretter en betaling. Når Nets varsler om en fullført betaling, kontrollerer appen betalingsstatusen hos Nets, oppdaterer betalingsinformasjonen og fører betalingssteget videre hvis statusen er `Paid`. Dette skjer på serveren og er ikke avhengig av at brukeren returnerer til appen etter betalingen.

Det er betalingssteget som fullføres automatisk. Hvis neste steg i prosessen er en slutthendelse, blir også instansen fullført. Ellers går instansen videre til neste prosessteg.

For at automatisk videreføring skal fungere:

- Sett opp tilgangene for tjenesteeieren som beskrevet i [steg 3](#3-gi-tilgang-til-den-som-skal-betale-og-tjenesteeieren).
- Bygg og publiser appen på nytt etter konfigurasjonsendringer.
- Start en ny betaling etter publisering. Webhooken registreres når betalingen opprettes, så betalinger som ble opprettet før endringen, får ikke den nye callbacken.

Webhooken registreres ikke ved lokal utvikling. Test derfor denne flyten i et publisert testmiljø.
