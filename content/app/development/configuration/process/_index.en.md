---
title: Define application process
linktitle: Process
description: How to define the process of an app.
weight: 200
---

An application has defined a process that controls the flow.
The process is defined as [BPMN 2.0](https://en.wikipedia.org/wiki/Business_Process_Model_and_Notation).

## Supported Process Task Types

The current application template supports the following tasks:

- Data (Corresponds to fill-in steps in Altinn II)
- Confirmation
- Feedback

## Future process steps (tentative)

- Signing
- Payment
- Parallel signing
- User-controlled signing
- External validation

## Change the process

To change the process, you can manually edit the BPMN file with an text, XML or BPMN editor.
It is stored in the app repo as `App/config/process/process.bpmn`.

## Example Process Files

* [Data_Confirmation_Process.bpmn](Data_Confirmation_Process.bpmn)
* [Data_Data_Data_Process.bpmn](Data_Data_Data_Process.bpmn)
* [Data_Process.bpmn](Data_Process.bpmn)

{{<children>}}