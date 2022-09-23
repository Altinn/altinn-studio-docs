---
title: Guidelines authorizationrules 
linktitle: Guidelines
description: Defining authorizationrules must be done with care. These guidlines tell you what condiderations and choices the app-owner should do when defining good authorixationsrules for an application
toc: true
---


Authorizationrules are defined in accordance to the XACML 3.0 standard. The rules will define what conditions must be at place in order to give
a certain user access to perform one or more steps of an applications [defined workprosess](/app/development/configuration/process/). 

## Make sure you know what you are doing!
The application owner is responsible for setting rules and choosing correct roles that give access to information in accordance with the intentions and expectations of the company og person who admnister roles on their behalf.

So, even though the XACML standard gives the developer great freedom in defining rules, these guidelines must be considerd before making choses in order to ensure that 
access to the application is correct and work as intended. 

In order to make the right choices for creating authorixationrules for you app you need and overall understanding of how Altinn Authorization works and how its used to controll access. 
At this [page](https://altinn.github.io/docs/utviklingsguider/styring-av-tilgang/for-tjenesteeier/) you can read more about Altinn Authorization. 

## Roles must be chosen with care!
In the authorization config roles are used to define who is allowd to perform what actions. 
Altinn offers a set og roles that can be applied as condition to get access to a certain prosess step and information that is displayed. 
Before you choose whitch role to use be sure that you have a good understanding of what these roles mean and what kind of services and information that is expected that this role has access to. 

## Ask for help!
As application owner you must allways consider if the intentions in the description of the role are consistent with the service or acess to data that you application provides. 
To give wrong people access to data they shouldnt have is never good marketing for your service and we therefore strongly advise you to contact Altinn for guidence in choice of roles and setup of authorization rules.

## Be aware of...
Even though construkting the right aurthorizationrule and choosing the right roles is the responsibility of the applicationowne, Altinn will supervice the authorizationrules for services that are put in production.
If we detect what we consider to be a wrong use of Altinn Authorization we will, if nessesary take service out of production or impose changes of autorization rules. 


