---
draft: true
title: "ALTINNAPP1016: data type must be app-owned"
description: "A data type for signatures, signee states or payment information does not have allowedContributors set to app:owned"
weight: 116
---

This diagnostic is reported when a signing task or a payment task in
`config/process/process.bpmn` keeps data in a data type whose `allowedContributors` is not
exactly `["app:owned"]`. That applies to the data types in

- `signatureDataType` and `signeeStatesDataTypeId` in `<altinn:signatureConfig>`
- `paymentDataType` in `<altinn:paymentConfig>`

The message names the task and the data type.

The app checks this when it starts in the Development environment, and does not start there. In
other environments the app starts, but parties other than the app may then be able to change the
data through the app's API: anyone if the list is empty, otherwise the service owners it names.

Category `Process`, severity **warning**.

Set `allowedContributors` to `["app:owned"]`. If the data type also has the legacy field
`allowedContributers` with values, remove it or set it to `["app:owned"]` too.

See the [signing task reference]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}})
and the [guide to payment in the app]({{< relref "/altinn-studio/v9/develop-a-service/process/payment" >}}).
