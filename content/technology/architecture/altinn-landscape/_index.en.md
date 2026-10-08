---
title: The Altinn landscape
linktitle: Altinn landscape
description: "Drawings of Altinn 3 at three levels: an explanation for newcomers, an overview and detailed drawings per product with links to the source code."
weight: 1
toc: true
aliases:
 - /authorization/reference/system/altinn-landscape/
---

The drawings on this page show Altinn 3 at three levels:

- [Altinn explained](#altinn-explained) is for newcomers. It shows who uses Altinn, what the services do and how they fit together, without technical detail.
- [The overview](#overview) shows one box per application, grouped by product.
- The detailed drawings show each product with its sub-modules, layers and datastores. Every box links to the file or folder it describes in the source code.

Click a drawing to open it in full size in a new tab. The links in a drawing only work when it is opened this way.

A script in this repository generates all the drawings from the source code on `main` in the Altinn repositories. The files are draw.io SVGs and can be opened in [draw.io](https://app.diagrams.net/), but the script overwrites changes made by hand the next time someone runs it. See the [README for the script](https://github.com/Altinn/altinn-studio-docs/blob/master/scripts/altinn-landscape/README.md) for how to regenerate the drawings.

## Altinn explained

Who uses Altinn, what do the services do, and how do they fit together? The drawing follows Kari, who applies for a licence to serve alcohol at her restaurant. The numbers in the drawing show which service does what along the way.

<a href="./altinn_explained_en.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_explained_en.drawio.svg" alt="Altinn 3 explained: the users, the services and the foundation" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Overview

One box per application with its main modules and datastores, grouped by product. The user-facing frontends are at the top, API Management in the middle and shared national services at the bottom. Click a product heading in the drawing to open that product's detailed drawing.

<a href="./altinn_overview.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_overview.drawio.svg" alt="Overview of Altinn 3" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Authorization

The Access Management frontend, API Management, Access Management, Authorization, the PEP package, Resource Registry, Authentication and Register, with the National Population Register, the Central Coordinating Register for Legal Entities, SIRE and Altinn 2 as external sources.

<a href="./altinn_authorization_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_authorization_detailed.drawio.svg" alt="The authorization product" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Dialogporten

Arbeidsflate (React app and BFF), API Management, Dialogporten and the adapter that synchronizes app instances from Storage to dialogs.

<a href="./altinn_dialogporten_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_dialogporten_detailed.drawio.svg" alt="The Dialogporten product" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Apps

The app frontend loaded from altinncdn.no, the app backend (app-lib, which now lives in the altinn-studio repository), API Management and Storage.

<a href="./altinn_apps_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_apps_detailed.drawio.svg" alt="The Apps product" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Events and Notifications

Events (API and Azure Functions), the Notifications API and the two services that send email and SMS, with Azure Communication Services and Link Mobility as external providers.

<a href="./altinn_events_notifications_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_events_notifications_detailed.drawio.svg" alt="The Events and Notifications product" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Correspondence and Broker

Correspondence and Broker, both with Hangfire jobs, blob storage per service owner and malware scanning.

<a href="./altinn_correspondence_broker_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_correspondence_broker_detailed.drawio.svg" alt="The Correspondence and Broker product" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Profile

Profile with user profiles, contact points, notification addresses and address verification, with the Contact and Reservation Register (KRR) and the Brønnøysund notification address register as external sources.

<a href="./altinn_profile_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_profile_detailed.drawio.svg" alt="The Profile product" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## Altinn Studio

Studio Designer (frontend and backend), the load balancer, Gitea and the AI agents, the runtime components in each service owner's cluster, and the local development tooling.

<a href="./altinn_studio_detailed.drawio.svg" target="_blank" rel="noopener"><img src="./altinn_studio_detailed.drawio.svg" alt="The Altinn Studio product" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>
