---
title: Role and access package based signing
linktitle: Role and access package
description: Follow these steps to implement role based signing in your service.
tags: [role based, signing]
weight: 50
aliases:
- /altinn-studio/guides/signing/role-based-signing
---

## What does role/access package-based signing mean?
{{% insert "content/altinn-studio/guides/development/signing/role-based-signing/intro.en.md" %}}

## Prerequisites
If the service should send a signature receipt to the inbox of the signee, the altinn message service (Correspondence) must be enabled.

See [how](/en/correspondence/getting-started/) to get started.

## 1. Add a signing task to the app process, with related configuration

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/signing/role-based-signing/backend-manual/add-process-task.en.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/role-based-signing/studio/add-process-task.en.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 2. Add layout-set for signing

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/signing/role-based-signing/backend-manual/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/role-based-signing/studio/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}