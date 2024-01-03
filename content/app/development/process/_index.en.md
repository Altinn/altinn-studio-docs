---
title: Process handling
description: The Application template supports defining a business process for the digital service.
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

[Read our development handbook for details.](../../../../app/development/configuration/process/)