---
title: Isolation
description: 
toc: true
weight: 9
---

To prevent a service from one service owner from affecting other service owners, isolation is heavily emphasized in Altinn 3.

## Separation between test and production

Service owners develop and test their apps/services in a separate service development environment and deploy them in a production environment.

## Service owner environment (runtime environment)

The apps of a service owner run in their own runtime environment ([AKS](https://azure.microsoft.com/en-us/products/kubernetes-service)).
This means that the runtime environment of one service owner
cannot affect the runtime environment of other service owners, neither during testing nor production.

## Personal data in submissions

Each service owner has their own storage account where data is stored using the Altinn platform.
This is where form data and file attachments are stored.
Metadata about instances are stored in a shared database for faster lookups when searching.

Note that service owners do not have access to these resources in Azure but must use Altinn 3 APIs to retrieve submitted data.

## Protection of API keys, certificates, etc

Several services will need to integrate with other solutions where a key or business certificate is used for authentication.
Each service owner has their own key vault where they can store these secrets.

{{%notice warning%}}
⚠ Service owners are responsible for ensuring that data does not leak when using external APIs.
{{%/notice%}}
