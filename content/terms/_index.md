---
title: Terms
description: Description of the most common terms used in the documentation
tags: ["concept", "wordlist", "term"]
weight: 100
alwaysopen: false
---

## Actor 
A actor is organization or person that a user/system is acting on behalf of. 
As an example User A can fill out a form on behalf of Organization B. 

deprecated term: ~~Reportee~~

## Actor List
The Actor list is a list over person and organization that a user can act on behalf of. 
This right is given through roles or rights delegations. 

deprecated term: ~~ReporteeList~~

## Actor Type
The type a Actor can be. Typical a person or organization but also sub types of organizations

deprecated term: ~~Reportee Type~~

## Actor Type Requirement
The requirent a app has for the Actor. Typical checked when a app is instansiated

deprecated term: ~~Reportee Type Requirement~~

## Altinn

Norways E-Governement plattform. Launched december 4. 2003. 
[Read more on Altinn.no](https://www.altinn.no/en/about-altinn/what-is-altinn/)

### Altinn Apps

Altinn Apps is the solution where the developed apps is deployed.
It consist of isolated organization Kubernetes clusters and supporting functionality and infrastructure.
See Altinn Apps [application architecture](/architecture/application/altinn-apps/) or [deployment architecture](/architecture/deployment/altinn-apps/).

### Altinn Platform

Altinn Platform consist of supporting components to Altinn Apps.
Example services are Authorization, Authentication, Profile, Register, Storage, Intermediary.
The platform is based on microservices architecture and is highly scalable. 

See Altinn Platform [solution architecture](https://docs.altinn.studio/architecture/solution/altinn-platform/), [application architecture](https://docs.altinn.studio/architecture/application/altinn-platform/)
and [deployment architecture]

### Altinn Studio

The web based development tool for creating end user application.
Lets the application developer create apps that are deployed like a seperate application environment called Altinn Apps. 

### Altinn Apps environment

A Altinn Apps environment is a isoleted setup of a Altinn Studio Apps solution. There will be 3 environments created
in 2019 for Tjenester 3.0 project.  AT: Testing of the platform, TT: Testing of apps created for the platform, Production: The production environment

### Altinn Studio Repositories

Altinn Studio Repos is the source control solution for Altinn Studio. All apps developed in Altinn Studio can

## Api

Application Programmers Interface.

## App

Short for Application. See Application

## AppId
A AppId identifies a given application. It is has the following pattern [org]/[appName]

## Appname
Appname is the name that is given for a app. It is used as repository name and as part of AppId and in different metadata.
Inside a org the Appname needs to be unique

## Application

An end user service created in Altinn Studio is called an app, short for application. 
The app is deployed to a Altinn Studio Apps environment.
The app provides two things: 

- an interactive user interface for users wishing to submitt data to an application owner, e.g. to fill out a form manually, to read information or to sign an agrement;
- an api that client applications can interact with.

The application also has a metadata representation in the application repository (platform storage), which defines the various element types that an instance of an application can have.

deprecated term: ~~Service~~


## Apps

Short for Altinn Apps. See Altinn Apps

### Application Developer

A user developing application in Altinn Studio. 

### Application Owner

The owner of the application. Typical identified by a unique acronoym representing the organization that owns the app, e.g. SKD, NAV, OSLK.

deprecated term: ~~Service Owner~~

## Data

A representation of a data element which is stored in the Altinn Platform.

deprecated term: ~~FormElement?~~

## Event

A record of activites on a specific instance.

## Instance

An instance of an application for a specific instance owner is represented as an object. Is created by application owner or instance owner. 
It contains information of the formdata and attachements stored associated with the instance.

deprecated term: ~~ReporteeElement~~

## Instance Owner

The person or entity that is responsible for submitting an instance of an application to an application owner. 

deprecated term: ~~Reportee~~

## User

The user which is logged in in Altinn and performs actions for on behalf of an instance owner. A user and an instance owner can be the same entity.

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

### Workflow

### XACML

XACML stands for "eXtensible Access Control Markup Language". The standard defines a 
declarative fine-grained, attribute-based access control policy language,[2] an architecture, 
and a processing model describing how to evaluate access requests according to the rules defined in policies.

Altinn Studio Apps uses the XACML standard for defining Policies for apps, the authorization architecture, 
and the request and response between PEP and PDP.

{{% children description="true" depth="2" %}}
