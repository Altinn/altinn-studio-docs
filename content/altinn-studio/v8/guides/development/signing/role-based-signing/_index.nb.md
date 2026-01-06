---
title: Rolle- og tilgangspakkebasert signering
linktitle: Rolle/tilgangspakke
description: Følg disse stegene for å implementere rolle- og tilgangspakkebasert signering i din tjeneste.
tags: [rollebasert, signering]
weight: 51
aliases:
- /nb/altinn-studio/guides/signing/role-based-signing
---

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/style.css.md" %}}

## Hva betyr rolle- og tilgangspakkebasert signering?
{{% insert "content/altinn-studio/v8/guides/development/signing/role-based-signing/intro.nb.md" %}}

## Avhengigheter

### Maskinporten
Maskinporten er kreves hvis du ønsker å bruke [meldingstjenesten](#meldingstjenesten) og/eller legge [tilgangs­begrensninger](/nb/altinn-studio/v8/guides/development/restricted-data/) på signaturobjektene.

Hvis du trenger hjelp med oppsett av Maskinporten i din app, finner du all informasjonen du trenger i [denne guiden](/nb/altinn-studio/v8/guides/integration/maskinporten/).

### Meldingstjenesten
Hvis appen din er [konfigurert til å sende signaturkvitteringer](#utvid-app-prosessen-med-et-signeringssteg), må Altinns meldings­tjeneste (Correspondence) være aktivert.

[Slik kommer du i gang med meldingstjenesten](/nb/correspondence/getting-started/).

## 1. Legg til en signeringsoppgave i appens prosess, med tilhørende konfigurasjon {#utvid-app-prosessen-med-et-signeringssteg}

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/role-based-signing/backend-manual/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/role-based-signing/studio/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 2. Legg til layout-set for signering

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/role-based-signing/backend-manual/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/role-based-signing/studio/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}