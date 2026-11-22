---
draft: true
title: "ALTINNAPP1019: exclusive gateway references an unknown data type"
description: "connectedDataTypeId on an exclusive gateway in process.bpmn is not a data type in applicationmetadata.json"
weight: 119
---

This diagnostic is reported when `<altinn:connectedDataTypeId>` in `<altinn:gatewayExtension>`
on an exclusive gateway in `config/process/process.bpmn` is not the id of a data type in
`applicationmetadata.json`. An empty id counts too. The message names the gateway and the data
type.

The gateway's conditions then find no data element. A condition that reads `["dataModel", ...]`
without naming a data type fails when an instance leaves the gateway. The rule checks only
gateways an instance can reach.

Category `Process`, severity **warning**. It is a warning because the data type matters only to
such conditions, and to the app's own code for the gateway.

Correct the id, or add the data type to `applicationmetadata.json`.

See the [guide to flow control](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
