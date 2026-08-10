---
draft: true
title: Waiting step for service tasks
linktitle: Waiting step
description: A service task can put the process on hold until an external system responds. The app then shows a built-in waiting step to the user.
tags: [altinn-apps, process, bpmn, service task]
toc: true
---

A service task runs automatically on the server, and the process normally moves on to the next step when the
task completes. Sometimes the result is not ready right away — for example when the app has sent a request to
another system and is waiting for a response. The service task can then put the process on hold.

The app automatically shows a built-in page to the user for as long as the process stays on the service task.
You do not need to define a separate step in the process or create any pages — which is why we call it an
*implicit* waiting step.

See [task types](/nb/altinn-studio/v9/develop-a-service/process/reference/task-types/) for more
about service tasks in general (documentation available in Norwegian only).

## Putting the process on hold

There are two ways for a service task to wait. Which one fits depends on how the outcome reaches you: whether
the external system can call back, or whether the task has to go and look for itself.

### Park the process until something releases it

Return `ServiceTaskResult.SuccessWithoutAutoAdvance()` from the service task's `Execute` method. The task is
considered successful, but the process does not advance by itself. It stays on the service task until someone
moves it forward with an authorized call to `process/next`.

```C#
public async Task<ServiceTaskResult> Execute(ServiceTaskContext context)
{
    await SendRequestToExternalSystem(...);
    // The external system will call back later and advance the process itself.
    return ServiceTaskResult.SuccessWithoutAutoAdvance();
}
```

The state is stored on the server. The wait therefore survives page refreshes, and a user who returns later
lands on the same waiting page until the process moves on.

Nothing brings the process forward on its own here, so a callback that never arrives leaves the instance
sitting on the task indefinitely.

### Check again yourself until the outcome arrives

Return `ServiceTaskResult.Defer(delay, reason)` when there is nothing that can call you back and the task has
to find out for itself. The process is put on hold, the worker is released, and the task runs again after
`delay` — as many times as it needs to, until it returns a result that concludes it. No error is recorded
along the way; a deferral is a wait, not a failed attempt.

```C#
public async Task<ServiceTaskResult> Execute(ServiceTaskContext context)
{
    var status = await CheckExternalSystem(...);
    if (status.IsFinished)
    {
        return ServiceTaskResult.Success();
    }

    return ServiceTaskResult.Defer(TimeSpan.FromMinutes(5), "Waiting for the external system to finish");
}
```

Pick each `delay` to match how fast the outcome can realistically arrive — checking eagerly at first and
backing off is usually the right shape, and it is the task's own choice every time it defers.

A deferral saves nothing. The task is re-run from the start, so anything it must remember between checks —
that a request has already been sent, above all — cannot be kept in the deferral. Give that work its own
pipeline step that completes instead of deferring, so it is not repeated on every re-check.

`context.Wait` tells the task how long it has been waiting and how many checks it has made. Use
`context.Wait.IsFinalCheck` to recognise the last check before the allowance runs out, so the task can fail
with its own explanation of what never arrived rather than a generic timeout.

The wait is bounded, which is the other difference from a parked process: the total time a task may spend
deferring is capped by `WaitBudget`, and the engine fails the step when it is spent. Set it from how long the
outcome can legitimately take:

```C#
public ProcessStepOptions? StepOptions => new() { WaitBudget = TimeSpan.FromHours(2) };
```

The eFormidling service task is the built-in example: it sends the shipment, then defers until the
integrasjonspunkt confirms delivery.

## What the user sees

The waiting page is a calm page with a spinner and no buttons:

- Title: "We are processing your request"
- Body: "This may take a little while. You do not need to do anything, we will continue automatically once
  everything is ready."

Both texts are text resources the app can override — for example to explain that an external system is known
to be slow:

| Key                          | Default text (English)                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| `service_task.waiting_title` | We are processing your request                                                                           |
| `service_task.waiting_body`  | This may take a little while. You do not need to do anything, we will continue automatically once everything is ready. |

The app polls the process state while the user waits, starting at one-second intervals and gradually backing
off to a maximum of 30 seconds. The moment the process advances, the user is automatically navigated to the
next step.

### While a deferring task waits

The page above is what a *parked* process shows. A task that defers is still in the middle of a process
transition, so the user sees the app's built-in processing page instead — the same one any slow transition
shows. Its texts are separate resources you can override:

| Key                                 | Default text (English)                                                                                                                                     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `process_workflow.advancing_title`  | We're working on your form                                                                                                                                 |
| `process_workflow.advancing_body`   | You don't need to do anything. We'll take you to the next step as soon as everything is ready.                                                              |
| `process_workflow.still_working`    | This is taking longer than usual. Your information is saved, and we'll continue automatically — you can safely close this page and come back later.         |

`process_workflow.still_working` appears after 30 seconds, which makes it the text that carries a long wait:
it is worth adjusting if your task can legitimately keep the user waiting for hours. Here too the user is
carried to the next step automatically once the process advances.

## Custom layout instead of the waiting page

If the app has a layout folder for the service task (`App/ui/<taskId>/`), that layout is rendered instead of
the built-in waiting page. This lets you build your own view for the wait, for example with more information
about what is happening.

The app still follows the process the same way: it polls the state and navigates the user onward
automatically when the process advances.

## Failures are always shown

If the service task fails terminally, the app always renders the failure page — even when the task has a
custom layout. A custom layout can never hide a failure.

The failure page gives the user two options:

- **Try again** re-runs the failed step via `POST .../process/resume`. It requires `write` access.
- **Go back** performs the `reject` action. The button is only shown when the user is authorized for
  `reject`, which takes both the action on the task in the process model and a policy rule granting it.

## Releasing the process

The process advances on any *authorized* call to

```http
PUT /{org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/process/next
```

The typical integration is that the external system calls this endpoint from its callback handler, using a
Maskinporten token for the service owner.

## Authorization

This section is about a parked process. A deferring task does not depend on a `process/next` call at all — it
concludes itself — so none of the below applies to it.

{{% notice warning %}}
A waiting service task is gated by authorization **only**. Nothing else stops a `process/next` call from
moving the process forward. If the wait must not be skippable by the end user, use a custom task type and
grant access only to the service owner in the policy. Do not rely on the waiting page itself as a gate — it
is only a user interface.
{{% /notice %}}

The action required for `process/next` is derived from the task type:

| Task type                                                            | Required action                    |
| -------------------------------------------------------------------- | ---------------------------------- |
| `data`, `feedback`, `pdf`, `eFormidling`, `fiksArkiv`, `subformPdf`  | `write`                            |
| `payment`                                                             | `pay` or `write`                   |
| `signing`                                                             | `sign` or `write`                  |
| `confirmation`                                                        | `confirm`                          |
| Custom task type                                                      | Action with the same name as the task type |

This mapping is enforced identically in the app and in the Altinn platform. It has two important
consequences:

1. **Known task types are a soft gate.** Any end user with `write` access can drive the process past a
   waiting service task of type `data`, `feedback`, `pdf` and similar with a bare `process/next` call. The
   user's own token is enough.
2. **Custom task types are closed by default.** The default policy (`policy.xml` from the app template)
   grants *no one* access to the action named after the task type — not even the service owner. The callback
   from the external system therefore gets 403 until you add a policy rule for the action.

A custom `IServiceTask` always uses a custom task type. Add a rule to `policy.xml` that grants the service
owner (the `urn:altinn:org` subject) access to the action — not end users, unless you deliberately want them
to be able to release the process themselves:

```xml
<xacml:Rule RuleId="urn:altinn:example:ruleid:[RULE_ID]" Effect="Permit">
  <xacml:Description>The service owner can drive the process past the service task [TASK_TYPE].</xacml:Description>
  <xacml:Target>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[org]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[TASK_TYPE]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
  </xacml:Target>
</xacml:Rule>
```

Replace `[org]`/`[ORG]`, `[APP]`, `[RULE_ID]` and `[TASK_TYPE]` with the values for your app. `[TASK_TYPE]`
must equal the `Type` property on the `IServiceTask` implementation.

See [Defining authorization policy](/nb/altinn-studio/v9/develop-a-service/configuration/authorization/)
for more about the policy file (documentation available in Norwegian only).
