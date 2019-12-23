---
title: Architecture
description: Altinn Studio, Altinn Apps and Altinn Platform has a modern architecture. This documentation describes everything from the requirements affecting the architecture to the defined capabilities and the components that support them.
tags: [architecture]
weight: 100
alwaysopen: false
aliases:
 - /architecture/
---

## Architecture decision tree
The [non functional and functional requirements](/teknologi/altinnstudio/architecture/requirements/) gives input to which capabilities 
for both devops and runtime that is needed in the solutions. It also gives input which type of components that is needed to implement the capabilties.
The [Architecture Principles](/teknologi/altinnstudio/architecture/principles/) and [Architecture Patterns](/teknologi/altinnstudio/architecture/patterns/) is affected by the 
architectural concerns and gives guidlines to which capabilities that is needed and how the components should implement the capabilities.

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/architecture_decision_relationship.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

## Capabilities and Components relationship
The figure below shows the relationship between the different capabilities and componentes in the techincal architecture.

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/architectureoverview.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

{{% children description="true" depth="1" %}}
