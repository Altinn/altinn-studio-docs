---
title: Checksum
linktitle: Checksum
description: Optional file checksum when you initialize a file transfer in Altinn Broker.
tags: []
toc: false
weight: 40
---

You can send an optional checksum when you [initialize](/en/broker/getting-started/developer-guides/send-files/#operation-initialize-filetransfer) the file transfer. Use the same fields for a form-data upload and a [TUS upload](/en/broker/reference/tus/). Set them on initialize, not on the TUS requests.

| JSON field | Required | Values |
| --- | --- | --- |
| `checksumAlgorithm` | No | `MD5` or `SHA256`. Omitted means `MD5`. |
| `checksum` | No | Lowercase hex digest of the file bytes. Empty or omitted means Broker calculates it after upload. |

For form-data, the fields are `Metadata.Checksum` and `Metadata.ChecksumAlgorithm`, next to the file part `FileTransfer`. 

You can leave the checksum out, or send one.

**Leave it out.** Omit `checksum`. After the upload, Broker calculates the digest and stores it on the file transfer. [Overview](/en/broker/getting-started/developer-guides/send-files/#operation-get-filetransfer-overview) and [details](/en/broker/getting-started/developer-guides/send-files/#operation-get-filetransfer-details) return `checksum` and `checksumAlgorithm`. The sender and the recipient can both read them. The [Bruno examples](https://github.com/Altinn/altinn-broker/blob/main/.bruno/collection.bru) `File Transfer\Initialize` and `File Transfer\Initialize and upload (form-data)` do this, and Broker calculates SHA256:

```json
{
  "checksumAlgorithm": "SHA256"
}
```

**Send one.** Include `checksum` for the file, together with the algorithm. Broker compares it with the uploaded file. If it does not match, the transfer fails and Broker deletes the file.
