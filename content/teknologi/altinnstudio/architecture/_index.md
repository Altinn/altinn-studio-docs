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

## Cloud Native
The solutions are designed and built using the ["Cloud Native"](https://github.com/cncf/toc/blob/master/DEFINITION.md) principles, meaning
it is built be scalable applications hosted in public cloud. 

Containers, microservices and declarative APIs exemplify this approach.

These techniques enable loosely coupled components that are resilient, manageable, and observable. 

Combined with robust automation, they allow the devops team to make changes frequently.

The Cloud Native blueprint below show the important aspect of a Cloud Native solution.

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/cloudnative.svg" type="image/svg+xml" style="width: 100%;";></object>
{{% /excerpt%}}

## Architecture Principles & Concerns

A good starting point to learn about our architecture is to read our [Architecture Principles](/teknologi/altinnstudio/architecture/principles/) and 
about our [Architecture Concerns](/teknologi/altinnstudio/architecture/concerns/)

## Architectural overview
The figure below shows the relation between the different types of architecture defined.

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/architectureoverview.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

{{% children description="true" depth="1" %}}
