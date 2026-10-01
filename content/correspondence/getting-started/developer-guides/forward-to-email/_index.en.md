---
title: Forward correspondence to email
linktitle: Forward correspondence to email
description: How to allow end users to forward correspondences to an email address
tags: [Correspondence, forward, email, guide]
toc: true
weight: 40
---

{{<children />}}

## Forwarding an Altinn correspondence by email

Service owners can decide, per correspondence, whether end users should be able to forward it to an email address of their choice.

{{% notice note %}}
This functionality is under development and is not yet available to end users. Service owners can already mark new correspondences as eligible for forwarding, so they are ready when the feature is released.
{{% /notice %}}

### How to get started

When you initialize a correspondence you can include the field `allowForwarding`, which lets you mark a correspondence as safe to forward by email.
To enable forwarding by email, set `allowForwarding` to `true`:

```json
{
  "correspondence": {
    ...,
    "allowForwarding": true
  }
}
```

The field is optional and defaults to `false`. Forwarding is therefore only possible when you have explicitly enabled it.

### Constraints

- Correspondences can be forwarded by email both with and without attachments. However, the total size of all attachments must not exceed 10 MB. If it does, the user can still forward the correspondence itself, but the attachments will not be included because of limitations in the email service.
- Correspondences sent on services that use the access package *post-til-virksomhet-med-taushetsbelagt-innhold* cannot be forwarded by email.

### Security implications

{{% notice warning %}}
When a correspondence is forwarded by email, the security level normally enforced by Altinn no longer applies.
Service owners who enable forwarding are responsible for ensuring that the content of the correspondence is not confidential and is safe to send by email.
{{% /notice %}}