---
draft: true
title: "ALTINNAPP0901: field points to an unknown data type"
description: "An entry in presentationFields or dataFields has a dataTypeId the app has not declared"
weight: 91
---

This diagnostic is reported when an entry in `presentationFields` or `dataFields` in
`applicationmetadata.json` has a `dataTypeId` that is not among the `dataTypes` in the same
file. The message names the property, the id of the entry and the data type it points to.

The app only computes the field for the data type the entry names. If it points to a data type
that does not exist, the value is never computed, and the field stays empty on the instance. The
app runs as normal, but the field can never get a value. The most common cause is a typo in
`dataTypeId`.

Category `Metadata`, severity **error**. The rule therefore fails the build.

Correct `dataTypeId` to a data type the app declares, or remove the entry.
