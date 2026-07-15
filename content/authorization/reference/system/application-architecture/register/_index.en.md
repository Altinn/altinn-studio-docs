---
title: Register
linktitle: Register
description: Application architecture and main APIs in Altinn Register.
weight: 2
toc: true
---

Register manages parties and representation. The diagram shows its main API surfaces, domain core, integrations and persistence layer.

Select a box to open the corresponding file or directory on GitHub.

<object data="register-application.svg" type="image/svg+xml" aria-label="Register application architecture with links to source code" style="width:100%;height:auto;min-height:680px;display:block;"></object>

Consumer-specific APIs build on the internal Party API. Import integrations update register data, while published contracts and messages make the data available to other components.
