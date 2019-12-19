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

It is built to be cloud native and run in cloud-based infrastructure. 

## Architecture Principles
The following architecture principles has been defined

### Free and open-source software

**Principle** 

The project is [Free and Open Source](https://en.wikipedia.org/wiki/Free_and_open-source_software).  

**Rationale**

Possibility to share the platform as Open Source. The possibility to create an Open Source community around the platform.

**Implications** 

- Can't use closed source products in the platform
- Can't use products with licensing limiting use and modifications
- Code developed is [shared on GitHub](https://github.com/Altinn/altinn-studio)

### Web Standards & Modern frameworks

**Principle** 

Use [Web Standards](https://en.wikipedia.org/wiki/Web_standards) and modern frameworks

**Rationale**

Can use standard tools and developers does not need to have special skills.

**Implications** 

- Formats and frameworks used need to follow standards

### Design for automation

**Principle**

The component should be created in a way that they support automation in development, deployment and operations.

**Rational**

Reduce the required effort to develop and operate the platform. 

**Implications**

- We use [Continuous integration](https://en.wikipedia.org/wiki/Continuous_integration)
- We use [Continuous deployment](https://en.wikipedia.org/wiki/Continuous_deployment)
- We build [Infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_code)
- We use [Automatic scaling](https://en.wikipedia.org/wiki/Autoscaling)
- We monitor and do automatic recovery of components

### Public cloud

**Principle**

The solutions should be deployed to a public cloud solution

**Rationale**

Using public cloud infrastructure for one of the big vendors gives cost savings, the team can be more agile
and the solotions 

**Implications**

- Additional security measures
- Need to build knowledge about cloud solutions

### Favor managed services

**Principle**

We should use manages cloud services when possible

**Rationale**

Reduce effort needed to host the platform. 

**Implications**

- Use managed data services
- Use managed Kubernetes like Azure Kubernetes Services 

### Security in depth

**Principle** 

All components should authenticate and authorize requests.

**Rationale**

We can't trust other components. 

**Implications**

- Components in Altinn Platform authenticates and authorize end user even if the request comes throug a application that also require the same
- We use API management to controll traffic between Altinn Apps and Altinn Platform. 

### Cross platform

**Principle**

The components in the platform should be cross platform and can run on [Microsoft Windows](https://en.wikipedia.org/wiki/Microsoft_Windows), [Linux](https://en.wikipedia.org/wiki/Linux) and [MacOs](https://en.wikipedia.org/wiki/MacOS)

**Rationale**

Developers should be able to create applications on any platform. 

**Implications**

- We use .Net Core or Java to build components

### Container technology

**Principle**

Applications should be deployed as containers

**Rationale**
The rationale to use containers is that we get a consistent runtime environment
Isolate runtime environment. Consistency. 

**Implications**
- Deploy applications/components in docker containers.


## Architectural overview
The figure below shows the relation between the different types of architecture defined.

{{%excerpt%}}
<object data="/architecture/architectureoverview.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

{{% children description="true" depth="1" %}}
