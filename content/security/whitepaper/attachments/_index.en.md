---
title: Appendix
description: 
toc: true
weight: 13
---

## Where are personal data processed and stored

| **Component**                                | **Data**                                                                                              | **Location**                                                                                                    |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------|
| **Altinn Studio**                            | Usernames, email addresses, affiliation with organization, passwords, GitHub integration, source code | North Europe (to be moved to West Europe). Not moved to Norway East due to lack of functionality in Norway East |
| **Service Owner Clusters**                   |                                                                       
| Application Insights                         | Logging from service owner applications                                                               | West Europe**                                                                                                   |
| Azure Key Vault                              | SAS definitions for Storage Account                                                                   | Norway East                                                                                                     |
| Azure Key Vault                              | API keys/certificates uploaded by service owner and used by the services                              | Norway East                                                                                                     |
| Azure Blob Storage                           | Form data (defined by service owner applications) and binary attachments                              | Norway East                                                                                                     |
| Azure Container Registry                     | Image files ("container images") of applications                                                      | West Europe*                                                                                                    |
| **Altinn Platform**                          |                                                                       
| Azure PostgreSQL                             | Metadata about submissions for all service owners and users, Events                                   | Norway East                                                                                                     |
| Azure Key Vault                              | Secrets used by the platform                                                                          | Norway East                                                                                                     |
| Altinn Storage Account                       | Policy files from all applications                                                                    | Norway East                                                                                                     |
| Log Analytics Workspace/Application insights | Logs from application, services, and clusters                                                         | West Europe**                                                                                                   |
| Microsoft Entra ID                           | Usernames, hashed passwords, phone numbers, names                                                     | Europe with [some exceptions](https://learn.microsoft.com/en-us/entra/fundamentals/data-storage-eu) such as SMS |

<small>*The service is not available in Norwegian data centers  
** The service is now available in Norway East, but has not yet been moved.</small>

## Azure regions

| **Region**   | **Location** |
| ------------ | ------------ |
| Norway West  | Norway       |
| Norway East  | Norway       |
| North-Europe | Ireland      |
| West-Europe  | Netherlands  |
