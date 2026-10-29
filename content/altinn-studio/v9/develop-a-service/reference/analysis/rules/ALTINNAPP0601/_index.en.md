---
draft: true
title: "ALTINNAPP0601: legacy eFormidling configuration is not supported"
description: "The eFormidling block in applicationmetadata.json is no longer supported"
weight: 61
---

This diagnostic is reported when `applicationmetadata.json` contains an `eFormidling` block.
This version of the app backend no longer supports the block.

Category `Deprecation`, severity **error**. The rule therefore fails the build.

Configure eFormidling on an eFormidling service task instead.

Apps set up before version 8.9 must also remove the old configuration from `appsettings.json`,
not just from `applicationmetadata.json`.

See the [guide to the eFormidling service task]({{< relref "/altinn-studio/v9/receive-data/eFormidling" >}}).
