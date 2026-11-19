---
draft: true
title: "ALTINNAPP1011: exclusive gateways form a loop"
description: "Exclusive gateways lead back to each other, or a gateway to itself, with no task in between"
weight: 111
---

This diagnostic is reported when exclusive gateways in `config/process/process.bpmn` lead back to
each other with no task in between, or a gateway leads back to itself. The message names the
gateways in the loop, and the rule reports each loop once.

When the app moves an instance, it follows the flows through gateways until it reaches a task or
an end event. It does not notice when the gateways go round in a circle, so when an instance
follows the loop, the app goes round and round until it crashes. The rule counts only the flows
each gateway lists in `<bpmn:outgoing>`, and checks only the gateways an instance can reach from
a start event. It is only a warning, since the conditions on the flows may keep every instance
out of the loop.

Category `Process`, severity **warning**.

Put a task in the loop, or remove one of its sequence flows.
