---
title: Administer organisation
linktitle: Administer organisation
tags: [notifications, organisation, config]
description: "The sender that appears on notifications sent from your organisation through Altinn 
can be configures as to not reference Altinn."
weight: 30
---

{{% notice info %}}
TODO: QA PO
{{% /notice %}}

### SMS sender
Default: _Altinn_.

One or more names consisting of **maximum 10 characters** can be registered 
to use as the sender of an SMS. 

### Email sender

{{% notice warning %}}
Note! Using custom e-mail domains requires that the domain has been granted access to use it. 
Please reference the [Get started guide on domain access](get-started/domain-setup/) on how to achieve this.
{{% /notice %}}

Default: _noreply@altinn.no_

One or more e-mails in your organisation's domain can be registered 
to use as the from address of e-mail notifications. 

