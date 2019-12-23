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
The [Architecture Concerns](/teknologi/altinnstudio/architecture/concerns/) like the non functional requirements and the functional requirements 
gives input to which capabilities for both devops and runtime that is needed in the solutions. It also gives input which type of components that is needed.
The [Architecture Principles](/teknologi/altinnstudio/architecture/principles/) and [Architecture Patterns](/teknologi/altinnstudio/architecture/patterns/)is affected by the 
architectural concerns and gives input on how the capabilities and components should be built.

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/architecture_decision_relationship.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

## Capabilties and Components relationship
The figure below shows the relationship between the different capabilties and componentes.

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/architectureoverview.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

{{% children description="true" depth="1" %}}
