---
draft: false
title: Rolle- og tilgangspakkebasert signering
linktitle: Rolle/tilgangspakke
description: Slik implementerer du rolle- og tilgangspakkebasert signering i tjenesten din.
tags: [rollebasert, signering, needsReview, translate]
weight: 51
aliases:
- /nb/altinn-studio/guides/signing/role-based-signing
---

{{% insert "content/altinn-studio/v10/develop-a-service/_temp/restricted-data/shared/style.css.md" %}}

## Hva er rolle- og tilgangspakkebasert signering?
{{% insert "content/altinn-studio/v10/develop-a-service/flow/signing/role-based-signing/intro.nb.md" %}}

## Avhengigheter

### Maskinporten
Maskinporten kreves hvis du vil bruke [meldingstjenesten](#meldingstjenesten) og/eller legge [tilgangsbegrensninger](/nb/altinn-studio/v10/develop-a-service/restricted-data/) på signaturobjektene.

Hvis du trenger hjelp med oppsett av Maskinporten i appen din, finner du all informasjonen du trenger i [denne veiledningen](/nb/altinn-studio/v10/develop-a-service/_temp/reference/integration/maskinporten/).

### Meldingstjenesten
Hvis appen din er [konfigurert til å sende signaturkvitteringer](#legg-til-signeringsoppgave), må Altinns meldingstjeneste (Correspondence) være aktivert.

[Slik kommer du i gang med meldingstjenesten](/nb/correspondence/getting-started/).

## 1. Legg til en signeringsoppgave i appens prosess, med tilhørende konfigurasjon {#legg-til-signeringsoppgave}

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v10/develop-a-service/flow/signing/role-based-signing/backend-manual/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v10/develop-a-service/flow/signing/role-based-signing/studio/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 2. Legg til layout-set for signering

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v10/develop-a-service/flow/signing/role-based-signing/backend-manual/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v10/develop-a-service/flow/signing/role-based-signing/studio/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}
