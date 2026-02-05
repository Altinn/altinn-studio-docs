---
draft: true
title: Rolle- og tilgangspakkebasert signering
linktitle: Rolle/tilgangspakke
description: Slik setter du opp signering basert på rolle eller tilgangspakke.
tags: [rollebasert, signering, needsReview, translate, missingDesignerDocs]
weight: 51
aliases:
- /nb/altinn-studio/guides/signing/role-based-signing
---

{{% insert "content/altinn-studio/v10/develop-a-service/restricted-data/shared/style.css.md" %}}

## Hva er rolle- og tilgangspakkebasert signering?
{{% insert "content/altinn-studio/v10/develop-a-service/signing/role-based-signing/intro.nb.md" %}}

## Avhengigheter

### Maskinporten
Du trenger Maskinporten hvis du vil bruke [meldingstjenesten](#meldingstjenesten) og/eller begrense tilgangen på signaturobjektene.

Hvis du trenger hjelp med å sette opp Maskinporten i appen din, finner du det du trenger i [denne veiledningen](/nb/altinn-studio/v10/develop-a-service/reference/integration/maskinporten/).

### Meldingstjenesten
Hvis appen din er [konfigurert til å sende signaturkvitteringer](#legg-til-signeringsoppgave), må Altinns meldingstjeneste (Correspondence) være aktivert.

[Slik kommer du i gang med meldingstjenesten](/nb/correspondence/getting-started/).

## 1. Legg til en signeringsoppgave i appens prosess, med tilhørende konfigurasjon {#legg-til-signeringsoppgave}

{{% insert "content/altinn-studio/v10/develop-a-service/signing/role-based-signing/backend-manual/add-process-task.nb.md" %}}

## 2. Legg til layout-set for signering

{{% insert "content/altinn-studio/v10/develop-a-service/signing/role-based-signing/backend-manual/configure-layouts.nb.md" %}}
