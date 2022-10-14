---
title: Terms
description: Description of the most common terms used in the documentation for Altinn Studio.
aliases:
 - /terms/
 - /teknologi/altinnstudio/terms/
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
[Read more on altinn.no](https://www.altinn.no/en/about-altinn/what-is-altinn/) 

## Altinn Apps

Altinn Apps is the infrastructures for running apps developed in Altinn Studio.
Each organisation that is using Altinn Studio will have their own Altinn Apps Kubernetes cluster, isolated from other organisations.

See Altinn Apps [application architecture](/technology/architecture/components/application/construction/altinn-apps) or [deployment architecture](/technology/architecture/capabilities/runtime/appdeploy).

## Altinn CLI

The command-line interface for the new APIs in Altinn.  
Is used by service owners for retrieving data submitted by users, for instantiating and for updating status.

https://github.com/altinn/altinn-cli/

## Altinn Platform

Altinn Platform contains reusable microservices with functionality that can be used by apps.
Platform can also be used directly by service owner systems using Altinn CLI and Maskinporten.

Currently these microservices are part of Platform: Authorization, Authentication, PDF, Profile, Register, and Storage.

Altinn Platform is running in its own Kubernetes cluster.

See Altinn Platform [solution architecture](../solutions/altinn-platform/)
and [deployment architecture]

## Altinn environment

An Altinn environment is a isolated group of several Altinn solutions functioning together.

- AT - Acceptance testing of Altinn Studio, Altinn Apps, Altinn Platform and SBL.
- TT02 - App/service test environment used by the app and service owners.
- Production - The production environment.

## Altinn Studio

Altinn Studio are our tools for app development.  
Consists of Altinn Studio Designer, Altinn Studio Repos and a local code editor / development tool (e.g. Visual Studio Code).

Lets the developers create, edit, test and deploy applications.
The apps are deployed as containers to a seperate infrastructure called Altinn Apps.

https://altinn.studio

## Altinn Studio Designer

Altinn Studio Designer is a web-based tool for creating, editing and deploying apps.  
In Designer, it should be easy to create apps by re-using and configuring pre-made components.

## Altinn Studio Repos

Altinn Studio Repos is the solution where each app is stored and versioned as a Git repository.  
No matter which tool is used for development (Designer, Code, or something else), the app is stored in Repos.

## Api

Application Programmers Interface.

## App

Short for Application. App is the name that is given for an app. It is used as repository name and as part of AppId and in different metadata. Inside an org the app needs to be a unique name. See also Application.

Deprecated terms: ~~AppName~~ ~~Service~~

## AppId

A AppId identifies a given application. It is has the following pattern [org]/[app-name].
The app-name is the same as the name of the name of the app repo.

## Application

An applications created in Altinn Studio is called an app, short for application.
Apps are deployed to a Altinn Apps environment.
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


## Kubernetes

A system for managing docker containers. See also: [Relevant definitions within Kubernetes](/technology/tools/kubernetes/)

## React

Teh framework used for developing UI components.

## PAP

Policy Administration Point.

## PDP 

Policy Administration Point.

## PEP

Policy Administration Point.

## PIP

Policy Information Point.

## PRP

Policy Retrieval Point.


## SBL

The Altinn 2 end user solution (SluttBrukerLøsning).

## SBL Bridge

Applicaton that exposes SBL components as REST interface to Altinn Platform components. 
[See all issues on GitHub related to SBL Bridge](https://github.com/Altinn/altinn-studio/labels/solution%2Fsbl-bridge).


## Statefull App
A statefull app uses Altinn Platform to store data


## Stateless App
A stateless app is a application where no data is store in in the platform. This could be a app acting like a proxy to some external APIS.
State could potensial be stored in the external API, so term statless is limited to how the App not use any state in Altinn Platform.


## Process

The set of tasks a certain app is made of, i.e. data, signing, payment etc. In Altinn Studio we use a *.bpmn file for the process.

deprecated term: ~~Workflow~~

## XACML

XACML stands for "eXtensible Access Control Markup Language". The standard defines a 
declarative fine-grained, attribute-based access control policy language,[2] an architecture, 
and a processing model describing how to evaluate access requests according to the rules defined in policies.

Altinn Studio Apps uses the XACML standard for defining Policies for apps, the authorization architecture, 
and the request and response between PEP and PDP.

{{% children description="true" depth="2" %}}
