---
title: Resumable uploads (TUS)
linktitle: TUS uploads
description: Upload large files to Altinn Broker using the TUS resumable upload protocol.
tags: []
toc: true
weight: 35
---

Altinn Broker supports [TUS](https://tus.io/) resumable uploads for large files. TUS splits an upload into many short HTTP requests. If a connection drops, the client can resume from the last successful offset instead of starting over.

For smaller files and simple integrations, the [streaming upload](/en/broker/getting-started/developer-guides/send-files/#operation-uploadStreamed) endpoint remains the better choice.

## When to use TUS

Use TUS when you need to

- upload files that take a long time to transfer
- survive dropped connections, proxy timeouts, or other network interruptions
- avoid keeping a single HTTP connection open for hours

The streaming endpoint sends the entire file in one request. That works well for smaller files, but long-lived connections are often terminated by load balancers or reverse proxies.

See also [Large files](/en/broker/explanation/very-large-files/) for size limits and virus-scan options above 50 GB.

## Prerequisites

TUS upload uses the same authorization as other sender operations. You need a Maskinporten token with the `altinn:broker.write` scope.

Before you upload, [initialize the file transfer](/en/broker/getting-started/developer-guides/send-files/#operation-initialize-filetransfer). Set file size, checksum, recipients, and other metadata in that call — the same as for a streaming upload.

## Upload flow

1. **Initialize** — `POST /broker/api/v1/filetransfer` returns a `fileTransferId`.
2. **Create TUS upload** — `POST /broker/api/v1/filetransfer/upload/tus/{fileTransferId}` with the `Upload-Length` header and `Tus-Resumable: 1.0.0`.
3. **Upload chunks** — send `PATCH` requests to the same URL until the full file is uploaded. Use `HEAD` to read the current offset when resuming.
4. **Wait for processing** — poll `GET /broker/api/v1/filetransfer/{fileTransferId}` or subscribe to [events](/en/broker/getting-started/developer-guides/events/) until status is `Published` (or `UploadProcessing` if virus scan is enabled).

Status transitions:

| Step | Status |
|------|--------|
| After initialize | `Initialized` |
| After TUS create (`POST`) | `UploadStarted` |
| While uploading (`PATCH`) | `UploadStarted` |
| After upload completes | `Published` or `UploadProcessing` |
| On failure | `Failed` |

Incomplete uploads expire after 24 hours of inactivity.

## Endpoints

All TUS operations use the same base URL. Replace `{fileTransferId}` with the ID from initialize.

```
OPTIONS /broker/api/v1/filetransfer/upload/tus/{fileTransferId}
POST    /broker/api/v1/filetransfer/upload/tus/{fileTransferId}
HEAD    /broker/api/v1/filetransfer/upload/tus/{fileTransferId}
PATCH   /broker/api/v1/filetransfer/upload/tus/{fileTransferId}
DELETE  /broker/api/v1/filetransfer/upload/tus/{fileTransferId}
```

| Method | Purpose |
|--------|---------|
| `OPTIONS` | Discover supported TUS extensions |
| `POST` | Create the upload (requires `Upload-Length`) |
| `HEAD` | Read current upload offset (for resume) |
| `PATCH` | Send the next chunk of file data |
| `DELETE` | Terminate an incomplete upload |

**TUS version:** `1.0.0` (send `Tus-Resumable: 1.0.0` on every request)

**Authorization:** Bearer token with `altinn:broker.write`

## Client libraries

Implementing the TUS protocol by hand is error-prone. Use a TUS client library instead, for example:

- [tus-js-client](https://github.com/tus/tus-js-client) (JavaScript)
- [Reference implementation](https://github.com/Altinn/altinn-broker/blob/main/tests/Altinn.Broker.Tests.LargeFile/TusUploader.cs) (.NET)
- [tus-java-client](https://github.com/tus/tus-java-client) (Java)

Point the client at `/broker/api/v1/filetransfer/upload/tus/{fileTransferId}` and pass the same Bearer token you use for other Broker API calls.

## Limitations

- **Upload-Length is required at create time.** Deferred length (`Upload-Defer-Length`) is not supported.
- **Per-chunk checksums** are not enabled. End-to-end MD5 checksum validation runs when the upload completes (set at initialize).
- **Downloads** are not available via TUS. Recipients download files through the [standard download endpoint](/en/broker/getting-started/developer-guides/receive-files/).
- **Incomplete uploads** are removed after 24 hours without activity.

## Related documentation

- [Guide for sender — initialize and upload](/en/broker/getting-started/developer-guides/send-files/)
- [Large files](/en/broker/explanation/very-large-files/)
- [OpenAPI specification](/en/api/broker/spec/)
