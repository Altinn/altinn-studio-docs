---
draft: true
title: "ALTINNAPP0702: mailbox answered twice"
description: "The same mailbox is answered by more than one handler"
weight: 72
---

This diagnostic is reported when a service task with several stages opens a mailbox, and the
same `MailboxHandle` is passed both to `HandleReplies` and to `ConcludeOnReplies`, or to one of
them twice. The message names the variable the mailbox was opened into.

Each mailbox must be answered exactly once: with `HandleReplies` to carry on afterwards, or with
`ConcludeOnReplies` to end there. A second handler would never run.

Category `Contracts`, severity **error**. The rule therefore fails the build.

Remove one of the handlers.

The rule only reports what it can prove: the handle is in the variable that the `out` parameter
of `Stage` declares, and both answers are certain to run. If you store the handle elsewhere or
pass it on, the app checks the same thing when it starts, and fails there instead.

See [Få svaret som en melding](/nb/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg/#få-svaret-som-en-melding) (documentation available in Norwegian only).
