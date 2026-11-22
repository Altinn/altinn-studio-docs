---
draft: true
title: "ALTINNAPP1008: element has no outgoing sequence flow"
description: "A start event, task, service task or exclusive gateway in process.bpmn has no way on"
weight: 108
---

This diagnostic is reported when an element in `config/process/process.bpmn` has no way on. That
is the case when

- a start event, a task or a service task is not the `sourceRef` of any sequence flow
- an exclusive gateway neither lists a sequence flow in `<bpmn:outgoing>` nor is the `sourceRef`
  of one

The message names the element.

An instance that reaches the element can never move on. The rule checks only elements an
instance can reach from a start event, so it does not report an element you have added but not
yet connected.

Category `Process`, severity **error**. The rule therefore fails the build.

Connect the element to the next element of the process with a sequence flow.

See the [guide to flow control](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
