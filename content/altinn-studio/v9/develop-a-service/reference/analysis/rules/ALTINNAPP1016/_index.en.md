---
draft: true
title: "ALTINNAPP1016: data type must be app-owned"
description: "A data type for signatures, signee states or payment information is not limited to app:owned"
weight: 116
---

This diagnostic is reported when a `signing` task keeps its signatures (`signatureDataType`) or
signee states (`signeeStatesDataTypeId`), or a `payment` task keeps its payment information
(`paymentDataType`), in a data type whose `allowedContributors` is not exactly
`["app:owned"]`. The message names the task, what it keeps there and the data type.

In the Development environment, the app checks this when it starts, and does not start. In
other environments it runs, but parties other than the app may be able to change the data
through the app's API: anyone, if the list is missing or empty, and otherwise the service
owners it names.

Category `Process`, severity **warning**.

Set `allowedContributors` to `["app:owned"]`. If the data type also has the old spelling
`allowedContributers`, the app reads that one first, so correct or remove it as well.

See how to set up
[signing]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}})
and [payment]({{< relref "/altinn-studio/v9/develop-a-service/process/payment" >}}).
