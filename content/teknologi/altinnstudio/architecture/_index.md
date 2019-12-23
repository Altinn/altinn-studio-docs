---
title: Architecture
description: Altinn Studio, Altinn Apps and Altinn Platform has a modern architecture. 
tags: [architecture]
weight: 100
alwaysopen: false
aliases:
 - /architecture/
---
This documentation describes everything from the requirements affecting the architecture to the defined architecture. 

## Architecture decision tree
The [Architecture Concerns](/teknologi/altinnstudio/architecture/concerns/) like the non functional requirements and the functional requirements gives input to which capabilties
for both devops and runtime that is needed in the solutions. It also gives input what type of components that is needed.
The [Architecture Principles](/teknologi/altinnstudio/architecture/principles/) and [Architecture Patterns](/teknologi/altinnstudio/architecture/patterns/)is affected by the 
architectural concerns and gives input on how the capabilties and components should be built.

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/architecture_decision_relationship.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

## Architectural overview
The figure below shows the relation between the different types of architecture defined.

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/architectureoverview.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

{{% children description="true" depth="1" %}}
