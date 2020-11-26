---
title: Application API
description: The API exposed by a standard App hosted by Altinn
toc: false
tags: [api]
weight: 30
---

## Overview

The features documented here are the default features of any App created based on the App template in Altinn Studio. Application owners are free to make changes to this, but it is probably safe to say that removal of features will be extremly rare. Any App with changes to its API should have its own documentation published by the application owner.

All App API endpoints have the same URL base path that will vary based on application owner and application name.

**Test environment (TT02)**
```http
https://{org}.apps.tt02.altinn.no/{org}/{appname}
```

**Production**
```http
https://{org}.apps.altinn.no/{org}/{appname}
```

The URL identifies the application owner specific hostname using the short name **org**, and the identificator of the App consisting of both the application owner short name and the name of the app; **org/appname**. 

{{% children description="true" depth="1" %}}
