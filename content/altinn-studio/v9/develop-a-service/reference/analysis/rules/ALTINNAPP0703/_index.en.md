---
draft: true
title: "ALTINNAPP0703: mailbox never answered"
description: "A mailbox is opened, but no handler receives the replies"
weight: 73
---

This diagnostic is reported when a stage opens a mailbox with
`Stage(..., out MailboxHandle reply)`, but the handle is never used. The messages that come back
would then have no handler. The message names the variable the mailbox was opened into.

Category `Contracts`, severity **error**. The rule therefore fails the build.

Answer the mailbox before the pipeline ends: with `HandleReplies` to carry on afterwards, or with
`ConcludeOnReplies` to end there.

The rule only reports a handle that is not used at all. If you discard the handle with `out _`,
or use it without answering the mailbox, the rule reports nothing, but the app fails when it
starts.

See [Få svaret som en melding](/nb/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg/#få-svaret-som-en-melding) (documentation available in Norwegian only).
