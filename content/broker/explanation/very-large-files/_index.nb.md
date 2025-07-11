---
title: Store filer
linktitle: Store filer
description: Hvordan støtte filer over 2GB
tags: []
toc: true
weight: 10
---

Broker er i utgangspunktet begrenset til filer opp til 2GB. Dette skyldes begrensninger med viruskanningen. Du kan allikevel sende større filer hvis tjenesteressursen har deaktivert viruskanning. For å kontrollere potensielle juridiske risikoer krever vi at ressurser som deaktiverer viruskanning blir forhåndsgodkjent av oss.

Den teoretiske maksimale størrelsen er 1,6TB, men vi gjennomfører regelmessig testing kun opp til 100GB. Vi kan gjøre endringer for å håndtere filer større enn 1,6TB hvis nødvendig.

# Hvordan bryte 2GB-grensen

1. Kontakt oss på [@Slack#team-formidling](https://digdir-samarbeid.slack.com/archives/C06982E0UGH) for godkjenning.
2. Sett "DisableVirusScan" i [fileoverføringsinitialiseringskallet](https://docs.altinn.studio/broker/getting-started/developer-guides/send-files/#operation-initialize-filetransfer) til true.
