---
title: Components
description: Components are the building blocks of applications.
weight: 10
---

Components can be added and edited in the UI editor, see [Altinn Studio Designer](/app/getting-started/ui-editor/).
 Available settings are described for each component below.

When building an application, the layout of each page is described by a `<pageName>.json` file located in `<applicationRepo>/App/ui/layouts/`.
Components added to the page are listed in the `layout` subsection in the file.

Available components and their respective properties are defined in each component's JSON schema file.
 
Properties common to multiple components are described in a separate file and referenced by the component files.
 These properties are described separately in [Common Component Properties](./commondefs/) below.

{{<children />}}
