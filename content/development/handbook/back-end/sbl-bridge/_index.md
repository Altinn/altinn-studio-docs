---
title: SBL Bridge
description: Guidelines for development in SBL Bridge.
tags: ["development", "handbook", "back-end", "sbl-bridge"]
weight: 100
---

{{% notice info %}}
SBL Bridge guidelines will be updated with more guidelines as the development of the application progresses and the need of guidelines are identified and best practices defined.
{{% /notice %}}

### Description 
SBL Bridge is a ASP.NET MVC 5 application that runs on .NET Framework 4.5. 

SBL Bridge exsposes data from SBL by converting REST API requests from Altinn Platform to requests that are passed on to the internal WCF services.  

### Consuming data from ALtinn II SBL components
Where it is possible, the WCF proxies defined in each component's PnC class library is to be used when consuming data from Altinn II. 

### Exposing data from Altin II SBL components
All data exposure in SBL Bridge should be done through RESTful APIs. As are no guidelines for development of REST APIs in Altinn II is defined, best practice for ASP.NET and the [guidelines for Altinn Studio] (https://docs.altinn.studio/development/handbook/rest/) (as far as possible) should be followed.
Speficially, this means url definitions and versioning.  

### Entities
The models for various entities e.g. UserProfile or Organization differes between Altinn II and Altinn Platform. It is important that the entity exposed through the API is the shared model between the two platforms, and not the business entities defined in SBL.Common.
In cases where an entity that differes from the business enitty is required, one should be implemented in SBL Bridge along with methods for converting between the two entities. 

### Shared stuff (TODO; better title)
The goal is to be able to create methods and helper classes that can be shared where it is possible. For now, the generic classes that might help you in your development for SBL Bridgde are;
*Entity mapper* - A class for mapping between SBL.Common and Altinn Platform entities. Feel free to add methods for mapping between the entities that you need.
*AssertHelper* - A class for asserting if two entities are the same during unit testing. Feel free to add methods for asserting equality between instances of new entities.