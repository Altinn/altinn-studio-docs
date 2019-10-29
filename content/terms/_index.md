---
title: Terms
description: Description of the most common terms used in the documentation for Altinn Studio.
weight: 100
alwaysopen: false
---

## Actor 
A actor is organisation or person that a user/system is acting on behalf of. 
As an example User A can fill out a form on behalf of Organisation B. 

deprecated term: ~~Reportee~~

## Actor List
The Actor list is a list over person and organisation that a user can act on behalf of. 
This right is given through roles or rights delegations. 

deprecated term: ~~ReporteeList~~

## Actor Type
The type a Actor can be. Typical a person or organisation but also sub types of organisations.

deprecated term: ~~Reportee Type~~

## Actor Type Requirement
The requirent a app has for the Actor. Typical checked when a app is instantiated

deprecated term: ~~Reportee Type Requirement~~

## Altinn

Norways E-Governement plattform. Launched december 4. 2003. 
[Read more on Altinn.no](https://www.altinn.no/en/about-altinn/what-is-altinn/)

## Altinn Apps

Altinn Apps is the solution where the developed apps is deployed.
It consist of isolated organisation Kubernetes clusters and supporting functionality and infrastructure.
See Altinn Apps [application architecture](/architecture/application/altinn-apps/) or [deployment architecture](/architecture/deployment/altinn-apps/).

## Altinn Platform

Altinn Platform consist of supporting components to Altinn Apps.
Example services are Authorization, Authentication, Profile, Register, Storage, Intermediary.
The platform is based on microservices architecture and is highly scalable. 

See Altinn Platform [solution architecture](https://docs.altinn.studio/architecture/solution/altinn-platform/), [application architecture](https://docs.altinn.studio/architecture/application/altinn-platform/)
and [deployment architecture]

## Altinn Apps environment

A Altinn Apps environment is a isolated setup of an Altinn Studio Apps solution. There will be 3 environments created in 2019 for Tjenester 3.0 project.  AT: Testing of the platform, TT: Testing of apps created for the platform, Production: The production environment.

## Altinn Studio

The development environment for creating end user application. Consists of Altinn Studio Repos, Altinn Studio Designer and possibly Visual Studio Code.
Lets the application developer create apps that are deployed like a seperate application environment called Altinn Apps.

## Altinn Studio Designer

The GUI-tool do develop apps by configuring and composing reusable solutions.

## Altinn Studio Repos

Altinn Studio Repos is the Git source control solution for Altinn Studio. All apps developed in Altinn Studio is stored i repos.

## Api

Application Programmers Interface.

## App

Short for Application. App is the name that is given for an app. It is used as repository name and as part of AppId and in different metadata. Inside an org the app needs to be a unique name. See also Application.

Deprecated terms: ~~AppName~~ ~~Service~~

## AppId

A AppId identifies a given application. It is has the following pattern [org]/[app].

## Application

An end user application created in Altinn Studio is called an app, short for application.
The app is deployed to a Altinn Studio Apps environment.
The app provides two things:

- an interactive user interface for users wishing to submit data to an organisation, e.g. to fill out a form manually, to read information or to sign an agreement;
- an api that client applications can interact with.

The application also has a metadata representation in the application repository (platform storage), which defines the various element types that an instance of an application can have.

deprecated term: ~~Service~~

## Apps

Short for Altinn Apps. See Altinn Apps

## Application Developer

A user developing application in Altinn Studio.

## Org

Short for organisation. Organisation is the entity responsible for an app. Typically identified by an unique acronym, e.g. SKD, NAV, OSLK.

Deprecated terms: ~~Application Owner~~ ~~Service Owner~~

## Data

A representation of a data element which is stored in the Altinn Platform.

deprecated term: ~~FormElement?~~

## Event

A record of activites on a specific instance.

## Instance

An instance of an application for a specific instance owner is represented as an object. Is created by organisation or instance owner.
It contains information of the formdata and attachments stored associated with the instance.

deprecated term: ~~ReporteeElement~~

## Instance Owner

The person or entity that is responsible for submitting an instance of an application to an organisation.

deprecated term: ~~Reportee~~

## User

The user which is logged in in Altinn and performs actions for on behalf of an instance owner. A user and an instance owner can be the same entity.

## dot.net 

## Kubernetes

## React

## Kubernetes Service

## Kubernetes POD

## Kubernetes Deployment

## Kubernetes ReplicaSet

## PAP

Policy Administration Point. See [Authorization Architecture](/architecture/security/authorization/altinn-studio-apps/)

## PDP 

Policy Administration Point. See [Authorization Architecture](/architecture/security/authorization/altinn-studio-apps/)

## PEP

Policy Administration Point. See [Authorization Architecture](/architecture/security/authorization/altinn-studio-apps/)

## PIP

Policy Information Point. See [Authorization Architecture](/architecture/security/authorization/altinn-studio-apps/)

## PRP

Policy Retrieval Point. See [Authorization Architecture](/architecture/security/authorization/altinn-studio-apps/)


## SBL

The current Altinn end user solution (SluttBrukerLøsning). See [Solution Architecture](https://docs.altinn.studio/architecture/solution/) 

## SBL Bridge

Applicaton that exposes SBL components as REST interface to Altinn Platform components. 
[See all issues on GitHub related to SBL Bridge](https://github.com/Altinn/altinn-studio/labels/solution%2Fsbl-bridge).


## Statefull App
A statefull app uses Altinn Platform to store data


## Stateless App
A stateless app is a application where no data is store in in the platform. This could be a app acting like a proxy to som external APIS.
State could potensial be stored in the external API, so term statless is limited to how the App not use any state in Altinn Platform.


## Workflow

## XACML

XACML stands for "eXtensible Access Control Markup Language". The standard defines a 
declarative fine-grained, attribute-based access control policy language,[2] an architecture, 
and a processing model describing how to evaluate access requests according to the rules defined in policies.

Altinn Studio Apps uses the XACML standard for defining Policies for apps, the authorization architecture, 
and the request and response between PEP and PDP.

{{% children description="true" depth="2" %}}
