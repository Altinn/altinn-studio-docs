---
title: Guidelines for authorization rules 
linktitle: Guidelines
description: Authorization rules must be defined very carefully. These guidelines explain what the application owner must consider before authorization rules are set for an applicationn
toc: true
---


Authorization rules are defined in accordance to the XACML 3.0 standard. The rules will define the conditions that must be met in order to give
a certain user access to perform one or more steps of an application [defined workprosess](/app/development/configuration/process/). 

## Make sure you know what you are doing!
The owner of the service is responsible for creating authorization rules and choosing the right roles that grant access to protected information.
Although the XACML standard gives the developer great freedom to define rules and choose the roles they want, these guidelines must be followed to ensure that the particular
user access to the application is correct and works as intended.

In order to make the right choices for creating authorization rules for you app you need an overall understanding of how Altinn Authorization works and how it is used to control access. 
At this [page](https://altinn.github.io/docs/utviklingsguider/styring-av-tilgang/for-tjenesteeier/) you can read more about Altinn Authorization. 

## Roles must be chosen with care!
In the authorization configuration file, roles are used to define who is allowed to perform which actions.
Altinn offers a set of roles required as a condition to access a specific step in the workflow and information displayed.

Before choosing which role to use, make sure you have sufficient understanding of what these roles mean and what kind of services and information this role is expected to have access to.
It is important that authorization rules and the choice of roles match the intentions and expectations of the administrator for the party.
For example, the administrator probably expects that the role "Tax" gives access to services related to, for example, tax reporting, but simultaneously needs to avoid any role giving access to services within payroll and the personnel area.
Similarly, please be careful about using, for example, the role "Contact Person" from the Entity Register to grant access to services - unless the basis for using this role has been thoroughly assessed.

## Please do NOT change authorizaion rules after production launch
Changes to authorization rules after a production release will render existing users unable to access the service and must have the new role delegated and any previous role deleted.
This will impose an unexpected administrative burden on businesses that will use the service because they will then have to clean up delegations made based on the old policy. Such a practice will usually result in dissatisfied users of the application.

## Contact us - we will gladly provide assistance
As application owner you must allways consider if the intentions in the description of the role are consistent with the service or access to data that your application provides. 
{{%notice warning%}}
Giving wrong people access to data they shouldn't have is never good marketing for your service and we therefore strongly suggest you contact Altinn for guidance in choosing roles and setting up authorization rules if you have the slightest doubt.
{{% /notice%}}

## Authorization rules must be tested
Authorization rules, like everything else, must be tested before the application is launched to verify that the correct roles have access to the necessary data.

[Here](test_authorization_application) you can read our recommendations related to testing authorization rules.

## Be aware : Altinn can impose changes to the authorization rules
Although it is the application owner's responsibility to construct the correct authorization rule and select the correct roles, Altinn will supervise or carry out spot checks with the authorization rules for services that are put into production.
If we discover what we consider incorrect use of Altinn Authorization, we may choose to intervene and remove the service from production or impose changes in the authorization rules.

