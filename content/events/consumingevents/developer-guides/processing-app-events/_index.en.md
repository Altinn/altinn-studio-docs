---
title: Processing events from an Altinn App
linktitle: Processing Altinn App events
description: A description of a reference system for processing events from an Altinn App
weight: 50
---

Altinn Apps are per the exit of 2022 the event producers responsible for the majority of the events registered
in Altinn. Although the applications vary in implementation and purpose, the processing of the events
produces from an application tends to have a number of similarities. 


### Altinn Application Owner System

We have created a reference system for application owners to use when processing application instances.
Supported by Azure and the events capabilities of Altinn, the system is able to fetch data once an instance is completed and then update
the status of the instance. 

[Altinn Application Owner system is available on GitHub](https://github.com/Altinn/altinn-application-owner-system). 
We recommend that you clone the repository bewfore making any adaptions and deploying it in your Azure account. 