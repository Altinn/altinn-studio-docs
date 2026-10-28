---
title: "ALTINNAPP0002: error in applicationmetadata.json"
description: "applicationmetadata.json is missing, duplicated or cannot be read"
weight: 2
---

This diagnostic is reported when `applicationmetadata.json` cannot be read the way the analysis
needs. The message contains the cause. The cases reported are:

- the file does not exist (`No applicationmetadata.json file found`)
- there is more than one copy of the file (`Multiple applicationmetadata.json file found`)
- the data model class named in the file does not exist in the compilation
  (`Could not find class ... in the compilation`)

Category `Metadata`, severity **warning**.

Fix the file so that there is exactly one `applicationmetadata.json`, that it is valid JSON, and
that the class it refers to exists in the project.
