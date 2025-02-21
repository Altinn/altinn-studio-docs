---
title: Rolle/tilgangspakke-basert signering
linktitle: Rolle/Tilgangspakke
description: Følg disse stegene for å implementere rolle/tilgangspakke-basert signering i din tjeneste.
tags: [rollebasert, signering]
weight: 50
aliases:
- /nb/altinn-studio/guides/signing/role-based-signing
---

## Hva betyr rolle/tilgangspakke-basert signering?
{{% insert "content/altinn-studio/guides/development/signing/role-based-signing/intro.nb.md" %}}

## Avhengigheter
Dersom appen skal kunne sende signeringskvittering til innboksen til den som signerer så må oppsett for bruk av meldingstjenesten i Altinn være satt opp.

Se [hvordan](/nb/correspondence/getting-started/) du kommer i gang med det.

## 1. Legg til en signeringsoppgave i appens prosess, med tilhørende konfigurasjon

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/signing/role-based-signing/backend-manual/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/role-based-signing/studio/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 2. Legg til layout-set for signering

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/signing/role-based-signing/backend-manual/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/role-based-signing/studio/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}