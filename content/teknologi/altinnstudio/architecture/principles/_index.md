---
title: Architecture Principles
description: The following architecture principles has been defined for the solutions
tags: [architecture]
linktitle: Principles
weight: 5
alwaysopen: false
aliases:
 - /architecture/
---

### Free and open-source software

**Principle** 

The components and solutions are [Free and Open Source](https://en.wikipedia.org/wiki/Free_and_open-source_software).  

**Rationale**

Possibility to share the platform as Open Source. The possibility to create an Open Source community around the platform.

**Implications** 

- Can't use closed source products in the platform
- Can't use products with licensing limiting use and modifications
- Code developed is [shared on GitHub](https://github.com/Altinn/altinn-studio)
- Others can reuse our components and solutions

### Web Standards & Modern frameworks

**Principle** 

Use [Web Standards](https://en.wikipedia.org/wiki/Web_standards) and modern frameworks to build the solutions.

**Rationale**

Can use standard tools and developers does not need to have special skills to develop components in the platform or applications
to run on the platform.

**Implications** 

- We favor [React](https://reactjs.org/) over [Razor](https://docs.microsoft.com/en-us/aspnet/web-pages/overview/getting-started/introducing-razor-syntax-c)
- Formats and frameworks used need to follow standards
- We use [JWT](http://jwt.io/) in authentication cookies

### Favor standards over custom

**Principle**

Whenever we need to store information we favor standard formats for that information over creating a custom format for that

**Rationale**

Standard formats are documented and is some cases it exists 3. party tools to edit information

**Implications**

- We use [BPMN 2.0 to](https://www.omg.org/spec/BPMN/2.0/) define the process for applications
- We use [XACML 3.0](http://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html) to define authorization policies for applications
- We use [JSON](https://en.wikipedia.org/wiki/JSON) as general format.

### Build as microservices

**Principle**
The platform is built as microservices. Related functionality is grouped in to seperate applications and deployed as containers.
Apps created in Altinn Studio will be deployed as microservices/apps

**Rationale**

The different components can be scaled differently, it can be deployed independently. Reduced deploy time. 
Different teams can be responsible for different microservices/apps. 

**Implications**

- Functionality in Altinn Platform is seperated in Authentication, Authorization, Profile, Storage, Pdf and Register component
- Applications created in Altinn Studio is deployed as microapps to Altinn Apps

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

