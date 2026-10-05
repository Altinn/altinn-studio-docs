---
draft: true
title: "ALTINNAPP0600: enablePdfCreation is not supported"
description: "enablePdfCreation on a dataType is no longer supported"
weight: 60
---

This diagnostic is reported when a `dataType` in `applicationmetadata.json` has
`enablePdfCreation` set to `true`. This version of the app backend no longer supports the
property. The message names the `dataType` concerned.

Category `Deprecation`, severity **error**. The rule therefore fails the build.

Generate the PDF with a PDF service task in the process instead.

See the [guide to PDFs in the app]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
