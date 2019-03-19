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

### Web Standards
Guideline: Use [Web Standards](https://en.wikipedia.org/wiki/Web_standards)

Result: Non proprietary standard will be used. Can use standard tools

### Isolated
Guideline: Apps should be isolated from eachother

Result: Apps will not affect other apps

### Cloud Native
Guideline: The architecture should follow cloud native principles

Result: 
- Containers
- Microservices
- APIs
- Independent of operating system

### Modern frameworks
Guidelines: We should use modern web frameworks

Result:



## Architectural overview
The figure below shows the relation between the different types of architecture defined.

{{%excerpt%}}
<object data="/architecture/architectureoverview.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}




{{% children description="true" depth="2" %}}




