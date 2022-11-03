---
title: Guidelines for authorization rules 
linktitle: Guidelines
description: Authorization rules must be defined very carefully. These guidelines explain what the application owner must consider before authorization rules are set for an applicationn
toc: true
---


Authorization rules are defined in accordance to the XACML 3.0 standard. The rules will define the conditions that must be met in order to give
a certain user access to perform one or more steps of an application [defined workprosess](/app/development/configuration/process/). 

## Make sure you know what you are doing!
The application owner is responsible for setting rules and choosing correct roles that provide the enduser access to information in accordance with the intentions and expectations of the company og person who admnister roles on their behalf.

So, even though the XACML standard gives the developer great freedom in defining rules, these guidelines must be considerd before making choses in order to ensure that 
access to the application is correct and work as intended. 

In order to make the right choices for creating authorization rules for you app you need an overall understanding of how Altinn Authorization works and how it is used to control access. 
At this [page](https://altinn.github.io/docs/utviklingsguider/styring-av-tilgang/for-tjenesteeier/) you can read more about Altinn Authorization. 

## Roles must be chosen with care!
In the authorization configuration file, roles are used to define who is allowed to perform which actions.
Altinn offers a set of roles required as a condition to access a specific step in the workflow and information displayed.

Before choosing which role to use, make sure you have sufficient understanding of what these roles mean and what kind of services and information this role is expected to have access to.
It is important that authorization rules and the choice of roles match the intentions and expectations of the administrator for the party.
For example, the administrator probably expects that the role "Tax" gives access to services related to, for example, tax reporting, but simultaneously needs to avoid any role giving access to services within payroll and the personnel area.
Similarly, please be careful about using, for example, the role "Contact Person" from the Entity Register to grant access to services - unless the basis for using this role has been thoroughly assessed.

## Ask for help!
As application owner you must allways consider if the intentions in the description of the role are consistent with the service or acess to data that your application provides. 
{{%notice warning%}}
Giving wrong people access to data they shouldn't have is never good marketing for your service and we therefore strongly suggest you contact Altinn for guidance in choosing roles and setting up authorization rules if you have any doubts.
{{% /notice%}}

## Be aware : Altinn can impose changes to the authorization rules
Although it is the application owner's responsibility to construct the correct authorization rule and select the correct roles, Altinn will supervise or carry out spot checks with the authorization rules for services that are put into production.
If we discover what we consider incorrect use of Altinn Authorization, we may choose to intervene and remove the service from production or impose changes in the authorization rules.

