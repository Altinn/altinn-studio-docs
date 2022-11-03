---
title: Process handling
description: The Application template supports defining a business process for the digital service.
tags: [altinn-apps, process, bpmn]
weight: 2
---

The template follows the [BPMN 2.0 standard.](https://www.bpmn.org/)

## Supported process elements

### Data Task

A data task is where the user/system accessing the digital service through UI or API can read, write and modify data related to a digital service.

A data task requires that all data for a given process task is valid and that the user/system has added all the necessary data.

The data validation is part of the standard logic in the template. Application developers can add custom validation for each data element and task.

The application developer defines the authorization requirements for this task as XCAML rules.

### Confirmation Task

A confirmation task is where the end user accessing the application through the browser or system through API can confirm data that is part of the process.

### Feedback Task

A feedback task allows the service owner or others to give feedback to the entity reporting data.

It allows uploading data and moving the process forward.

### Exclusive Gateways

Exclusive gateways allow a different path in the process based on direct user input, data, or other aspects available from code.

## Process Examples

![Simple process](process1.drawio.svg "A process with data task")

![Simple process](process2.drawio.svg "A process with data and confirmation tasks")

![Simple process](process3.drawio.svg "A process with data, confirmation, and feedback task")

![Simple process](process4.drawio.svg "A process with data and confirmations and optional confirmation")

![Simple process](process5.drawio.svg "A process with data and confirmation and optional confirmation with options to go back to the data task")


## Process configuration

In Altinn Studio, the App developer can configure the process.

[Read our development handbook for details.](../../../../app/development/configuration/process/)