---
title: Access Management 
linktitle: Access-Management 
description: Overview of Access Management for Altinn Correspondence.
tags: []
toc: true
weight: 14
---

## Access Management for Correspondence

The access management for a correspondence is defined by its resource. 
Resources belong to an organization and can be created and managed in [Altinn studio](https://altinn.studio/). 

On the resource you can set which access packages and roles a user needs in order to read the correspondence, and more.
Resources used for correspondences should use the resource type `correspondence service`.
You can read about resources and access management here: [Authorization](https://docs.altinn.studio/nb/authorization/)

## Access Management for attachments
Our solution allows you to control the access to attachments on a Correspondence. In some cases, the person responsible for distributing incoming mail within the organization should not be able to view the attachment. A typical example is when the Police send their Correspondence "Straffesaksforsendelse".

The organization can grant access to the Correspondence to the person responsible for distributing it to the appropriate caseworkers, but without giving them access to read the attachment.

### How to set the access management for an attachment

The access management for an attachment is controlled by the resource used when initializing the attachment.
When a correspondence with an attachment is initialized collectively using the initialize and upload endpoint, the created attachments will have the same resource as the correspondence.

To get unique access management for the correspondence and its attachments, they must be initialized separately using different resources:

- Initialize the attachments with their own resource that defines who is allowed to view or download those attachments.
- Initialize the correspondence with the attachments as existing attachments and with a resource that defines who is allowed to read the correspondence.

#### Contact information 

Do you have any suggestions that could be useful? Let us know — send us an email: [servicedesk@altinn.no](mailto:servicedesk@altinn.no)