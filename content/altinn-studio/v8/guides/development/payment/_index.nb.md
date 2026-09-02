---
title: Hvordan konfigurere betaling i din Altinn-app 
linktitle: Betaling
description: Følg disse grunnleggende stegene for å komme i gang med å integrere betaling i din Altinn App.
tags: [betaling]
weight: 50
aliases:
- /nb/altinn-studio/v8/guides/payment/
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
{{% insert "content/altinn-studio/v8/guides/development/payment/studio/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v8/guides/development/payment/backend-manual/add-process-task.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!-- Gi tilganger til den som skal betale og tjenesteeieren -->
## 3. Gi tilganger til den som skal betale og tjenesteeieren
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/payment/studio/access-rules.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v8/guides/development/payment/backend-manual/access-rules.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}

Når Nets varsler appen om at betalingen er fullført, oppdaterer appen betalingsinformasjonen og fører prosessen videre på vegne av tjenesteeieren. I `App/config/authorization/policy.xml` må `[org]` derfor ha handlingene `read` og `write` for appen og `confirm` for betalingsoppgaven.

Appen må også ha standardscopene for tjenesteeier i Maskinporten. Se [hvordan du legger til Maskinporten-scopes](/nb/altinn-studio/v8/guides/integration/maskinporten/add-scopes/). Bygg og publiser appen på nytt etter at du har endret scopene eller autorisasjonspolicyen.


<!--Konfigurer visning av betalingsinformasjon-->
## 4. Konfigurer visning av betalingsinformasjon
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/payment/studio/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v8/guides/development/payment/backend-manual/configure-layouts.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Beregn hva som skal betales-->
## 5. Beregn hva som skal betales
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/payment/studio/calculate-payment.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v8/guides/development/payment/backend-manual/calculate-payment.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


<!--Koble appen til NETS Easy avtalen-->
## 6. Koble appen til NETS Easy avtalen
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/payment/studio/configure-secrets.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v8/guides/development/payment/backend-manual/configure-secrets.nb.md" %}}
{{</content-version-container>}}
{{</content-version-selector>}}


## 7. Automatisk videreføring etter fullført betaling

Fra og med Altinn.App 8.12.0 registrerer den innebygde Nets Easy-integrasjonen en webhook når den oppretter en betaling. Når Nets varsler om en fullført betaling, kontrollerer appen betalingsstatusen hos Nets, oppdaterer betalingsinformasjonen og fører betalingssteget videre hvis statusen er `Paid`. Dette skjer på serveren og er ikke avhengig av at brukeren returnerer til appen etter betalingen.

Det er betalingssteget som fullføres automatisk. Hvis neste steg i prosessen er en slutthendelse, blir også instansen fullført. Ellers går instansen videre til neste prosessteg.

For at automatisk videreføring skal fungere:

- Bruk Altinn.App 8.12.0 eller nyere. Vi anbefaler den nyeste tilgjengelige patch-versjonen.
- Sett opp Maskinporten og tilgangene for tjenesteeieren som beskrevet i [steg 3](#3-gi-tilganger-til-den-som-skal-betale-og-tjenesteeieren).
- Bygg og publiser appen på nytt etter konfigurasjonsendringer.
- Start en ny betaling etter publisering. Webhooken registreres når betalingen opprettes, så betalinger som ble opprettet før oppgraderingen, får ikke den nye callbacken.

Webhooken registreres ikke ved lokal utvikling. Test derfor denne flyten i et publisert testmiljø.
