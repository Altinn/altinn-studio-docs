---
title: Application API
description: The API exposed by a standard App hosted by Altinn
toc: false
tags: [api]
weight: 30
---

## Overview

The features documented here is the default features of any App created based on the App template made by the Altinn 3 Team. Application owners are free to make changes to this, but it is probably safe to say that removal of features will be extremly rare. Any App with changes to its API should have its own documentation published by the application owner.

All App API endpoints have the same URL base path that will vary based on application owner and application name.

**Test environment (TT02)**
```http
https://{org}.apps.tt02.altinn.no/{org}/{appname}
```

**Production**
```http
https://{org}.apps.altinn.no/{org}/{appname}
```

{{% children description="true" depth="1" %}}
