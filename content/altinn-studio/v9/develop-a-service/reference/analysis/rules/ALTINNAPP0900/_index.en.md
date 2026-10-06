---
draft: true
title: "ALTINNAPP0900: two fields share the same id"
description: "Two entries in presentationFields or dataFields have the same id for the same dataTypeId"
weight: 90
---

This diagnostic is reported when two entries in `presentationFields` or `dataFields` in
`applicationmetadata.json` have the same `id` and also point to the same `dataTypeId`. The
message names which of the two properties is affected, the id, the data type and both `path`
values.

The id is the key the value is stored under on the instance: `presentationTexts` for
presentation fields and `dataValues` for data fields. The values for one data type are computed
together, and the same key cannot be stored twice. The app therefore fails instead of computing
either of them, and both instantiation and saving of that data type stop.

Category `Metadata`, severity **error**. The rule therefore fails the build.

Give each entry its own `id`.

Using the same `id` on *different* data types is still allowed. The value from the data type
saved last then applies, and some apps use this deliberately to fill the same presentation field
from whichever model the instance has. The rule only reports entries that share both `id` and
`dataTypeId`.
