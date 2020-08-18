---
title: Application architecture pdf component - Altinn Platform
linktitle: PDF
description: The PDF component is created as an Spring Boot (Java) web application hosted in Kubernetes as a Docker container. 
tags: [architecture, solution, pdf]
---

The PDF component is an Spring Boot java application exposing an api for triggering PDF-generation.

The pdf api is exposed at <http://platform.altinn.cloud/pdf/api/v1>.

The available endpoints can be seen in the [swagger definition.](https://platform.at21.altinn.cloud/pdf/swagger-ui.html).
