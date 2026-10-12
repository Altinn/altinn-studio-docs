---
draft: true
title: "ALTINNAPP1019: exclusive gateway names an unknown data type"
description: "connectedDataTypeId on an exclusive gateway names a data type that applicationmetadata.json does not declare"
weight: 119
---

This diagnostic is reported when an exclusive gateway in `config/process/process.bpmn` names a
data type in `<altinn:gatewayExtension><altinn:connectedDataTypeId>` that is not among the
`dataTypes` in `config/applicationmetadata.json`. The message names the gateway and the data
type. An empty `connectedDataTypeId` is reported too, since the app reads it as an id rather
than as missing.

The connected data type is the data that the conditions on the gateway's sequence flows read.
With an unknown id they find no data element, so a condition that reads `["dataModel", ...]`
without naming a data type fails when an instance leaves the gateway. The rule is only a
warning, since the connected data type matters only to such conditions and to your own code for
the gateway.

Category `Process`, severity **warning**.

Correct the id, or add the data type.

See [how to control the process flow](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
