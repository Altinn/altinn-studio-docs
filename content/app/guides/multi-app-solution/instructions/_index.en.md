---
title: Instructions for making a multi-app solution in Altinn
linktitle: Instructions
description: Explanations of how to go about when creating a general multi-app solution
weight: 20
aliases:

- /app/multi-app-solution/instructions/

---

## General Modifications

In general, there are a few things that one must remember to
do in the process of developing these applications.

1. Remember adding custom services to
   the `RegisterCustomAppServices` method in `program.cs`
2. If adding any values as prefill for the new instance of
   the receiving application, remember to add them to the
   data model of the receiving application

{{<children description="true" order="Trigger Application, Receiver Application"/>}}
