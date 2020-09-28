---
title: Data Storage in Altinn Studio
linktitle: Data Storage
description: Description of how the data is stored in Altinn Studio
tags: [altinn-studio,data]
--- 



## Designer


| Volume-navn       | Type          | Peristent Volume Claim                    |
|-------------------|---------------|-------------------------------------------|               
|altinn-repo-storage|azure-file     |altinn-storage-repo-premium-volume-claim   |

På `altinn-repo-storage` repo mellomlagres "lokale" kopier av repoene som blir jobbet på av apputviklere som arbeider i studio. Disse kan så bli pushet opp til repositories.

## Repos

| Volume-navn           | Type          | Peristent Volume Claim            |
|-----------------------|---------------|-----------------------------------|               
|altinn-gitea-storage   |azure-disk     |altinn-storage-gitea-volume-claim  |


I Repos brukes det foreløpig en azure-disk som storage volume. Ulempem her er at man kun har mulighet til å ha en attched pod. 

For repositories har man også knyttet til en PostgreSQL database. Credentials blir her lastet inn gjennom `gitea-db-secret`
- altinnstudio-db-prod-postgres
- altinnstudio-db-staging-postgres
- db-gitea-postgres
- t30-gitea-db