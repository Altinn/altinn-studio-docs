---
title: Process
description: The application has a process that can be modified according to needs
tags: [altinn-apps, process, bpmn]
weight: 60
aliases:
- /app-template/processhandling
---

The template follows the [BPMN 2.0 standard.](https://www.bpmn.org/)

## Supported process elements


* [__Process tasks__](tasks) _tasks that require users or systems to perform actions before the process continues_


* [__Flow control__](flowcontrol) _controls navigation through a process with gateways_

## Process Examples

![Simple process](process1.drawio.svg "A process with data task")

![Simple process](process2.drawio.svg "A process with data and confirmation tasks")

![Simple process](process3.drawio.svg "A process with data, confirmation, and feedback task")

![Simple process](process4.drawio.svg "A process with data and confirmations and optional confirmation")

![Simple process](process5.drawio.svg "A process with data and confirmation and optional confirmation with options to go back to the data task")


## Process configuration

In Altinn Studio, the App developer can configure the process.

[Read our development handbook for details.](../../../../altinn-studio/reference/configuration/process/)