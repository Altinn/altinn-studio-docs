---
title: Terms
description: Description of the most common terms used in the documentation
tags: ["architecture", "term"]
weight: 100
alwaysopen: false
---

## Application

An application is developed in Altinn studio and is deployed to a kubernetes cluster. The application provides two tings: 

- an interactive user interface for users wishing to submitt data to an application owner, e.g. to fill out a form manually, to read information or to sign an agrement;
- an api that client applications can use to fill out a form automatically.

The application also has a metadata representation in the application repository (platform storage).

deprecated term: ~~Service~~

## Instance

An instance of an application for a specific instance owner is represented as an object. Is created by application owner or instance owner. 
It contains information of the formdata and attachements stored associated with the instance.

deprecated term: ~~ReporteeElement~~

## Event

Data elements that contain information about activites on a specific instance.

## Data

A representation of a data element which is stored.

deprecated term: ~~FormElement?~~

## Instance Owner

The person or entity that is responsible for submitting an instance of an application to an application owner. 

deprecated term: ~~Reportee~~

## Application Owner

The owner of the application. 

deprecated term: ~~Service Owner~~

## User

The user which is logged in and performs actions for a instance owner. 

{{% children description="true" depth="2" %}}
