---
title: API Catalogue
linktitle: API Catalogue
description: Description of the API in Altinn Studio
tags: ["tjenester 3.0"]
weight: 100
---
{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}


The Altinn Studio Designer and Altinn Studio Repository exposes API.

## Designer API
The designer API is implemented as Controllers in the MVC 


### CodeList
This exposes functionality related to code lists

See [code](https://github.com/Altinn/altinn-studio/blob/master/src/AltinnCore/Designer/Controllers/CodelistController.cs)

Methods:

#### CodeLists
Returns a list over codelist in a service

#### Delete
Deletes a given codelist

#### Edit
Saves the codelist


### Config
This exposes functionality related to config

See [code](https://github.com/Altinn/altinn-studio/blob/master/src/AltinnCore/Designer/Controllers/ConfigController.cs)

#### SaveConfig
Saves configuration
TODO: Need to verify use and c

#### GetConfig

#### GetServiceConfig


####  SetServiceConfig

### DataSource
TODO: Should be deleted

### Deploy
Api responsible for deployment functionality
See [code](https://github.com/Altinn/altinn-studio/blob/master/src/AltinnCore/Designer/Controllers/DeployController.cs)

#### Start deployment
Starts a new deployment


#### FetchDeploymentStatus

Returns deployment status


### Model
API responsible for data model








