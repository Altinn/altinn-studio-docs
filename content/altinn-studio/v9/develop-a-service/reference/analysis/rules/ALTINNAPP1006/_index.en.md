---
draft: true
title: "ALTINNAPP1006: exclusive gateway's default is not one of the flows it lists"
description: "The default of an exclusive gateway is a sequence flow the gateway does not list"
weight: 106
---

This diagnostic is reported when the `default` attribute of an exclusive gateway names a
sequence flow that the gateway does not list in `<bpmn:outgoing>`. The message names the gateway
and the default.

The app looks for the default only among the flows the gateway lists, so it ignores this one.
That matters when nothing else picks a single flow: when none of the conditions on the gateway's
flows holds, when an `IProcessExclusiveGateway` chooses none of them, or when the gateway lists
more than one flow and has neither conditions nor such an `IProcessExclusiveGateway`. Leaving
the gateway then fails. The rule checks only the gateways an instance can reach from a
start event.

Category `Process`, severity **warning**.

Set `default` to one of the flows the gateway lists, or remove it. If the default starts at the
gateway but is missing from `<bpmn:outgoing>`, ALTINNAPP1005 reports it too, and listing the flow
fixes both.
