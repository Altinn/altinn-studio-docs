---
title: 'Limits'
description: 'Reference information on query parameter limits'
weight: 60
---

## Introduction 

Some parameters in the search APIs are subject to limits which may change depending on server load or other dynamic circumstances. Dialogporten provides a open metadata-API that gives information on the current limits set in the system.

{{% notice warning %}}
The parameters provided in this endpoint are not cached, but due to propagation delays may brifely (a few seconds) after a configuration change return the previous value. Requests not withing the actual limits will result in 400 Bad Request. 
{{% /notice %}}

## Current limits

The current limits can be found at the follow locations:

| Environment | URL                                                                    |
| ----------- | ---------------------------------------------------------------------- |
| Test        | https://platform.at23.altinn.cloud/dialogporten/api/v1/metadata/limits |
| Staging     | https://platform.tt02.altinn.no/dialogporten/api/v1/metadata/limits    |
| Production  | https://platform.altinn.no/dialogporten/api/v1/metadata/limits         |