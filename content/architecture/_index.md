---
title: Architecture
description: Description of the Altinn Studio architecture.
tags: ["architecture"]
weight: 100
alwaysopen: false
---
Altinn Studio, Altinn Apps and Altinn Platform has a modern architecture. 

## Architecture Goals & Guidelines
The following guidlines and goals have been important to define the architecture. 

### Free and open-source software
Guideline: Frameworks and applications used in Altinn Studio will need to be [Open Source](https://en.wikipedia.org/wiki/Free_and_open-source_software).  

Result: Possibility to share the platform as Open Source. The possibility to create a Open Source community around the platform.

### Web Standards & Modern frameworks
Guideline: Use [Web Standards](https://en.wikipedia.org/wiki/Web_standards) and modern frameworks

Result: Non proprietary standards will be used. Can use standard tools and developers does not need to have special skills.

### Cloud Native
Guideline: The architecture should follow cloud native principles

Result 

* Containers
* Isolations
* Microservices
* APIs
* Independent of operating system

## Architectural overview
The figure below shows the relation between the different types of architecture defined.

{{%excerpt%}}
<object data="/architecture/architectureoverview.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

{{% children description="true" depth="2" %}}




