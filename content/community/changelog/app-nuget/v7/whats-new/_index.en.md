---
title: What's new
description: Overview of changes introduced in version 7.
toc: true
---

{{% panel theme="warning" %}}
Only the major release is described here. After the version 7.0.0 release minor and patch releases are described in [GitHub releases](https://github.com/Altinn/app-lib-dotnet/releases) only.
{{% /panel %}}

## 7.0.0

### Features
- Simplified app template. Most of the code is removed from app template and into nugets. Dependencies reduced from
  three to two.
- Possible to write separate code for when a task is abandoned. This was previously handled in the same method as when a
  task was completed.
- Possible to write custom code for when a task i started. This code will be executed before Altinns standard code.

### Bugfixes
- PDF generation now supports dynamic options in repeating groups