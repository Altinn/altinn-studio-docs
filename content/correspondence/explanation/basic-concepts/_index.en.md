---
title: Basic Concepts
linktitle: Basic Concepts
description: Altinn 3 Correspondence basic concepts.
tags: []
toc: true
weight: 13
---

## Context overview - actors and information flow

The following diagram gives a high level overview of Altinn 3 Correspondence actors and information flow.

![Altinn Correspondence Context Overview](./altinn3-correspondence-context-diagram.en.png "Altinn Correspondence Context Overview")

## Supported messaging patterns

The basic messaging pattern supported by Altinn Correspondence is one-to-one messaging from one sender to one recipient.

![One-to-one messaging](./altinn3-correspondence-pattern-1-1-messaging.en.png "One-to-one messaging")

Altinn 3 Correspondence also supports batch sending. This means sending the same correspondence to multiple recipients in a single request.
When using batch sending, the system creates and stores a separate correspondence for each recipient.
This allows correspondence statuses and events to be handled individually for each recipient.

Note: Specifying an IdempotentKey on the correspondences is not supported when using batch sending.