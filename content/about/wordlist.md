---
title: Wordlist
description: A wordlist for Altinn Studio
tags: ["wordlist"]
weight: 100
alwaysopen: false
---

### Altinn
Norways E-Governement plattform. Launched december 4. 2003. 
[Read more on Altinn.no](https://www.altinn.no/en/about-altinn/what-is-altinn/)

### Altinn Apps
Altinn Apps is the solution where the developed apps is deployed.
It consist of isolated organization Kubernetes clusters and supporting functionality and infrastructure.
See Altinn Apps [application architecture](/architecture/application/altinn-apps/) or [deployment architecture](/architecture/deployment/altinn-apps/).

### Altinn Platform
Altinn Platform consist of supporting components to Altinn Apps.
Example services are Authorization, Authentication, Profile, Register, Intermediary
The platform is based on microservices architecture and is highly scalable. 

See Altinn Platform [solution architecture](https://docs.altinn.studio/architecture/solution/altinn-platform/), [application architecture](https://docs.altinn.studio/architecture/application/altinn-platform/)
and [deployment architecture]

### Altinn Studio
The web based development tool for end user services. 
Lets the service developer create services that are deployed like a seperate application (app). 

### Altinn Apps environment
A Altinn Apps environment is a isoleted setup of a Altinn Studio Apps solution. There will be 3 environments created
in 2019 for Tjenester 3.0 project.  AT: Testing of the platform, TT: Testing of apps created for the platform, Production: The production environment

### Altinn Studio Repos
Altinn Studio Repos is the source control solution for Altinn Studio. All apps developed in Altinn Studio can 

### Api

### App
A end user service created in Altinn Studio is a seperate application (app). 
The app is deployed to a Altinn Studio Apps environment.

### dot.net 

### Kubernetes

### React

### Kubernetes Service

### Kubernetes POD

### Kubernetes Deployment

### Kubernetes ReplicaSet

### PAP
Policy Administration Point. See [Authorization Architecture](/architecture/security/authorization/altinn-studio-apps/)

### PDP 
Policy Administration Point. See [Authorization Architecture](/architecture/security/authorization/altinn-studio-apps/)

### PEP
Policy Administration Point. See [Authorization Architecture](/architecture/security/authorization/altinn-studio-apps/)

### PIP
Policy Information Point. See [Authorization Architecture](/architecture/security/authorization/altinn-studio-apps/)

### PRP
Policy Retrieval Point. See [Authorization Architecture](/architecture/security/authorization/altinn-studio-apps/)


### SBL
The current Altinn end user solution (SluttBrukerLøsning). See [Solution Architecture](https://docs.altinn.studio/architecture/solution/) 

### SBL Bridge
Applicaton that exposes SBL components as REST interface to Altinn Platform components. 
[See Git Issues](https://github.com/Altinn/altinn-studio/labels/sbl-bridge)

### Service App
The Service App is the application created in Altinn Studio by the service
developer. It consist of platform code (AltinnCore Runtime) and code and 
configuration created in Altinn Studio. 
See Application architecture for details. 

### App Developer
A user developing apps in Altinn Studio. 


### Workflow


### XACML
XACML stands for "eXtensible Access Control Markup Language". The standard defines a 
declarative fine-grained, attribute-based access control policy language,[2] an architecture, 
and a processing model describing how to evaluate access requests according to the rules defined in policies.

Altinn Studio Apps uses the XACML standard for defining Policies for apps, the authorization architecture, 
and the request and response between PEP and PDP.