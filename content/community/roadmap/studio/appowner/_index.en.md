---
title: App owner functionality in Altinn 3
linktitle: App owner
description: This is the functionality available for app owners in Altinn 3, and some of the larger planned changes.
toc: true
---
## Launched functionality

{{% panel %}}
For information on **How to use** the functionalities described here, see the [Altinn Studio](../../../../app/) and [API](../../../../api/) user documentation.
{{% /panel %}}

### GUI based app development

In [the Altinn Studio GUI](https://altinn.studio) you can do the following:

- Create (and retrieve) an app
- Upload a data model
- Add and edit texts
- Create a simple form (one or more pages), which links elements, texts and data model
- Add and edit rules for dynamics (Note! Coded as JavaScript)
- Deploy app to test and production environments

### Code based app development

By downloading the app code (through Git) locally (or by editing the app files in the repository view) you can do a wide variety of changes to the app.
This includes standard functionality for:

- Making rules for validation and calculation
- Add prefill
- Add lookup to external APIs
- Edit the process/workflow of the app
- Edit the authorisation rules for the app, and make custom logic for instantiating
- Make custom events

### Test locally

Once you have your app code locally, you can also take advantage of [a local test enviroment for most types of app testing](../../../../app/testing/local/). 

### Integration with app owner

Altinn 3 has standardised APIs that the app owner can use to upload and download data.
For downloading Altinn 3 relies on the app owner polling for information and downloading data (pull). 
In addition app owner can use the app APIs to instantiate or change the data and/or status for instances.

You can reduce the amount of polling by using push events - where app owner can be notified when there is data available for download (Q2 2021) ([#4728](https://github.com/Altinn/altinn-studio/issues/4728)) :heavy_check_mark:

To use the APIs as an app owner, you need to authenticate using Maskinporten.

### Maintaining apps
App owners get [access to monitoring their apps](../../../../app/getting-started/access-management/apps/), so they can keep track of how they are functioning. 
See also [the pages about app maintenance](../../../../app/maintainance/).

- Let developers easily copy an old app into a new one (Q3 2021) ([#5923](https://github.com/Altinn/altinn-studio/issues/5923)) :heavy_check_mark:

## Upcoming functionality

Altinn 3 is in constant development, and functionality is released continuously. The backlog is revised eight times a year, and minor changes may occur between these revisions.
In general, the further into the future a functionality is planned, the less certain the time frame is for said functionality.

Changes described in _italic_ are regarded as ideas, and if they are to be developed has not yet been decided.

### GUI based app development

For all upcoming functionality, we assess if it's suitable for solving i the GUI. At some point (2023 or later) we will intensify the effort to make more functionality available through GUI.

- Support branching in Altinn Studio (Q4 2021) ([#985](https://github.com/Altinn/altinn-studio/issues/985))

### Data modelling

The dependency on data modelling having to be done in an external tool will be removed. Some highlights from the plans for data modelling in Altinn 3 is:

- To work with a data modeli in a GUI (Q4 2021) ([#5551](https://github.com/Altinn/altinn-studio/issues/5551))
- Integrations with Felles datakatalog (Q1 2022) ([#3811](https://github.com/Altinn/altinn-studio/issues/3811))
- _To get an auto-generated data model from the app GUI you build_
- _To get an auto-generated draft for an app GUI from the data model_

### Maintaining apps

We wish to make app owners able to maintain their apps themselves in Altinn 3. To achieve this we will (among other things):

- Make it possible to decomission an app (Q4 2021) ([#3717](https://github.com/Altinn/altinn-studio/issues/3717))
- _Add a Web analysis tool for the apps_

### Integration with app owner

Pull of data will stay as the main pattern for downloading data as an app owner, but a few exceptions will come:

- Possibility to use [eFormidling](https://samarbeid.digdir.no/eformidling/eformidling/20) as an interface to get data sent from Altinn to app owner (Q4 2021) ([#4788](https://github.com/Altinn/altinn-studio/issues/4788))
- Split of data - multiple app owners can receive data from the same app (Q3 2022) ([#4274](https://github.com/Altinn/altinn-studio/issues/4274))
