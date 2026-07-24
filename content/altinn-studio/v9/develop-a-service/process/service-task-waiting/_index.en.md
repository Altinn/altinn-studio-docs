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

The app automatically shows a waiting page to the user for as long as the process stays on the service task.
You do not need to define a separate step in the process or create any pages — which is why we call it an
*implicit* waiting step.

See [task types]({{<relref "/altinn-studio/v9/develop-a-service/process/reference/task-types" >}}) for more
about service tasks in general.

## Putting the process on hold

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

- **Try again** re-runs the failed step via `POST .../process/resume`.
- **Go back** performs the `reject` action, if the process model defines one for the task.

## Releasing the process

The process advances on any *authorized* call to

```http
PUT /{org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/process/next
```

The typical integration is that the external system calls this endpoint from its callback handler, using a
Maskinporten token for the service owner.

## Authorization

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

See [Defining authorization policy]({{<relref "/altinn-studio/v9/develop-a-service/configuration/authorization" >}})
for more about the policy file.
