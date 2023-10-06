---
title: Administer organisation
linktitle: Administer organisation
tags: [notifications, organisation, config]
description: "As an organisation using Altinn Notifications, there are a two data points that can be configures to 
support the notifications that are sent through Altinn on behalf of your organisation."
weight: 30
---

{{% notice info %}}
TODO: QA PO
{{% /notice %}}


## SMS sender
Default: _Altinn_.

If you wish to give the end user an impression that an SMS comes 
directly from your organization rather than via Altinn,
you can register a short name consisting of **maximum 10 characters**.

## Email sender

Default: _noreply@altinn.no_

{{% notice warning %}}
Using custom domains requires that the domain has been granted access to use it. 
Please reference the [Get started guide on domain access](get-started/domain-setup/) on how to achieve this.
{{% /notice %}}

If you want the emails sent through Altinn to appear to be sent from an email that the end user 
can continue sending emails to, or for the email to be perceived sent from a specific department or address 
you can register one or more e-mails to use as the from address when sending an email notification. 

