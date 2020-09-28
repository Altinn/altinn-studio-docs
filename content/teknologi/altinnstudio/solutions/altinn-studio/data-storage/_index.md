---
title: Data Storage in Altinn Studio
linktitle: Data Storage
description: Description of how the data is stored in Altinn Studio
tags: [altinn-studio,data]
--- 



## Designer


| Volume-name       | Type          | Peristent Volume Claim                    |
|-------------------|---------------|-------------------------------------------|               
|altinn-repo-storage|azure-file     |altinn-storage-repo-premium-volume-claim   |

In designer `altinn-repo-storage` is used as an intermediate storage of "local" copies that an app-developer is working on in altinn-studio. These changes can then be pushed to altinn-repositories.

Designer also stores some metadata about what releases and deployments have been made to the various app-owner environements in Azure Comos DB - `app-release-deployment`.
When designer either builds a release or deploys to en environment through an azure pipeline this triggers a [seperate pipeline](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=85) which in turn calls designer to update the CosmosDB.


## Repositories

| Volume-name           | Type          | Peristent Volume Claim            |
|-----------------------|---------------|-----------------------------------|               
|altinn-gitea-storage   |azure-disk     |altinn-storage-gitea-volume-claim  |


altinn-repositories uses an azure-disk as storage volume. One drawback to this is that we only have the possibility for one attached pod at the time, which could set constraints on scalability.

Repositories also is connected to a PostgreSQL database. The credentials for this database is read through the a secret called `gitea-db-secret`.
There currently exists four of these databases:
- altinnstudio-db-prod-postgres
- altinnstudio-db-staging-postgres
- db-gitea-postgres
- t30-gitea-db
