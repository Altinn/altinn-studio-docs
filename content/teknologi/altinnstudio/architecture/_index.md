---
title: Architecture
description: Description of the Altinn Studio architecture.
tags: [architecture]
weight: 100
alwaysopen: false
aliases:
 - /architecture/
---
Altinn Studio, Altinn Apps and Altinn Platform has a modern architecture. 

## Architecture Principles
The following architecture principles has been defined

### Free and open-source software
Principle: 
The project needs to be [Free and Open Source](https://en.wikipedia.org/wiki/Free_and_open-source_software).  

Rationale: 
Possibility to share the platform as Open Source. The possibility to create a Open Source community around the platform.

Implications: 
- Can't use closed source products in the platform
- Can't use licenced products in the platform
- Can't use products with licensing limiting use and modifications
- Code developed is [shared on GitHub](https://github.com/Altinn/altinn-studio)

### Web Standards & Modern frameworks
Principle: 
Use [Web Standards](https://en.wikipedia.org/wiki/Web_standards) and modern frameworks

Rationale:
Can use standard tools and developers does not need to have special skills.

Implications: 
- Formats and frameworks used need to follow standards

### Design for automation
Principle:
The component should be created in a way that they support automation in development, deployment and operations.

Rationale:
Reduce the required effort to develop and operate the platform. 

Implications
- We use [Continuous integration](https://en.wikipedia.org/wiki/Continuous_integration)
- We use [Continuous deployment](https://en.wikipedia.org/wiki/Continuous_deployment)
- We build [Infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_code)
- We use [Automatic scaling](https://en.wikipedia.org/wiki/Autoscaling)
- We monitor and do automatic recovery of components

### Favore managed services
Principle:
We should use manages cloud services when possible

Rationale:
Reduce effort needed to host the platform. 

Implications:
- Use managed data services
- Use managed Kubernetes like Azure Kubernetes Services 

### Security in depth
Principle: 
All components should authenticate and authorize requests.

Rationale:
We can't trust other components. 

Implications
- 

### Cloud Native
Principle: 
The architecture should follow cloud native principles

Result 

* Containers - Isolation (resources, framework)
* Microservice architecture - Upgrade components seperate. 
* APIs - Reuse
* Independent of operating system - Can develop and run on any platform

## Architectural overview
The figure below shows the relation between the different types of architecture defined.

{{%excerpt%}}
<object data="/architecture/architectureoverview.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

{{% children description="true" depth="1" %}}
