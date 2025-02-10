---
title: Rate Limits
linktitle: Rate Limits
description: Altinn 3 Broker Capabilities and Features.
tags: []
toc: true
weight: 40
---

## Rate limits

Rate limit applies per subscription key (Ocp-Apim-Subscription-Key). Contact us for more capacity.

- `POST /broker/api/v1/filetransfer`
  - Description: Initialize a file transfer
  - Rate limit: 60 calls per minute
  
- `POST /broker/api/v1/filetransfer/{fileTransferId}/upload`
  - Description: Upload to an initialized file using a binary stream
  - Rate limit: 60 calls per minute

- `POST /broker/api/v1/filetransfer/upload`
  - Description: Initialize and upload a file using form-data
  - Rate limit: 60 calls per minute

- `GET /broker/api/v1/filetransfer/{fileTransferId}`
  - Description: Get information about the file and its current status
  - Rate limit: 60 calls per minute

- `GET /broker/api/v1/filetransfer/{fileTransferId}/details`
  - Description: Get more detailed information about the file upload for auditing and troubleshooting purposes
  - Rate limit: 10 calls per minute

- `GET /broker/api/v1/filetransfer`
  - Description: Search files that can be accessed by the caller according to specified filters
  - Rate limit: 10 calls per minute

- `GET /broker/api/v1/filetransfer/{fileTransferId}/download`
  - Description: Downloads the file
  - Rate limit: 60 calls per minute

- `POST /broker/api/v1/filetransfer/{fileTransferId}/confirmdownload`
  - Description: Confirms that the file has been downloaded
  - Rate limit: 60 calls per minute
