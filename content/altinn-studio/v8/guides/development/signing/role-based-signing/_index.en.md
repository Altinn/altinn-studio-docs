---
title: Role and access package based signing
linktitle: Role and access package
description: Follow these steps to implement role based signing in your service.
tags: [role based, signing]
weight: 51
aliases:
  - /altinn-studio/guides/signing/role-based-signing
---

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/style.css.md" %}}

## What is role and access package based signing?

{{% insert "content/altinn-studio/v8/guides/development/signing/role-based-signing/intro.en.md" %}}

## Prerequisites

### Maskinporten
Maskinporten is required if you wish to use the [message service](#correspondence) and/or place [access restrictions](/en/altinn-studio/v8/guides/development/restricted-data/) on the signature objects.

If you need help setting up a Maskinporten integration for your app, you can find all the information you need in [this guide](/en/altinn-studio/v8/guides/integration/maskinporten/).

### Correspondence
If your app is [configured to send signature receipts](#extend-the-app-process-with-a-signing-task), the Altinn message service (Correspondence) must be enabled.

See how to get started in [this guide](/en/correspondence/getting-started/).

## 1. Add a signing task to the app process, with related configuration {#extend-the-app-process-with-a-signing-task}

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/role-based-signing/backend-manual/add-process-task.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/role-based-signing/studio/add-process-task.en.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 2. Add layout-set for signing

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/role-based-signing/backend-manual/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/role-based-signing/studio/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}
