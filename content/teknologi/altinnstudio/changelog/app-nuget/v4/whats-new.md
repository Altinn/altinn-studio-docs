---
title: What's new
linktitle: What's new
description: Overview of changes introduced in version 4
toc: true
---

## 4.2.0 (2021-04-19) - Possible to integrate an app with eFormidling

Altinn Apps now support integration with eFormidling. 
Documentation on how to set up an application to use eFormidling will be published
once an integration point for eFormidling is set up in Altinn Platform. 

## 4.1.0 (2021-04-07) - Add new property with updated data to response for PUT to DataController

During PUT of data to DataController (`{org}/{app}/instances/{instanceOwnerPartyId:int}/{instanceGuid:guid}/data`), any calculations that are 
defined by the apps are run, and data is potentially updated before being saved.
Previously, the response returned only the metadata for the updated data element, and a GET to fetch the updated data was necessary.
In this version, a dictionary of all the fields that have updated data from calculations is returned as a new parameter
in the API response (in addition to the data element metadata), so that clients do not need to perform the additional GET request in order
to get the updated data.

This change is related to [this issue](https://github.com/Altinn/altinn-studio/issues/5754).

## 4.0.1 (2021-03-15) - Upgraded application to .Net 5 and grouped references of Altinn App and Altinn Platform services in Startup.cs

Altinn.App.* librarires target .Net 5 now, which requires that the application does the same.
In addition we have created two methods for referencing all app and platform sevices in Startup.cs 

See [breaking changes](../breaking-changes) for how to update you app to be compatible with this version.
