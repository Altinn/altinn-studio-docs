---
draft: true
title: "ALTINNAPP1011: exclusive gateways form a loop"
description: "Exclusive gateways in process.bpmn lead back to each other with no task in between"
weight: 111
---

This diagnostic is reported when an exclusive gateway in `config/process/process.bpmn` leads
back to itself, directly or through other exclusive gateways, with no task in between. The
message names the gateways in the loop.

The app goes straight from one gateway into the next without stopping. If an instance follows
the loop, the app goes round in circles until the process crashes. The rule checks only gateways
an instance can reach.

Category `Process`, severity **warning**. It is a warning because the conditions on the sequence
flows may keep every instance out of the loop.

Put a task in the loop, or remove one of its sequence flows.

See the [guide to flow control](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
