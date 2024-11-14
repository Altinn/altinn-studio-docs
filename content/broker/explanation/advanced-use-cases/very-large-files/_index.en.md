---
title: Large Files 
linktitle: Large Files 
description: How to enable files above 2GB 
tags: []
toc: true
weight: 10
---

Broker is restricted to files up to 2GB by default. This is due to restriction with the virus scan. You can still send files larger than this if the resource has disabled virus scan. To mitigate potential legal rise we require resources that disable virus scan get pre-approved by us. 

The theoretical maximum size is 1.6TB, but we only regularly benchmark it to 100GB. We can make changes to accomodate larger files than 1.6TB if needed.

# How to break the 2GB limit

1. Contact us [@Slack#team-formidling](https://altinn.slack.com/archives/C06982E0UGH) for pre-approval.
2. When sending large files without virus scan set the "DisableVirusScan" flag in the [initialize file transfer call](https://docs.altinn.studio/broker/getting-started/developer-guides/send-files/#operation-initialize-filetransfer) to true.
